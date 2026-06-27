import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const reviewSchema = z.object({
  author_name: z.string().optional(),
  rating: z.number().optional(),
  text: z.string().optional(),
  relative_time_description: z.string().optional(),
  profile_photo_url: z.string().optional(),
});

const responseSchema = z.object({
  status: z.string(),
  error_message: z.string().optional(),
  result: z.object({
    reviews: z.array(reviewSchema).optional(),
  }).optional(),
});

const findPlaceResponseSchema = z.object({
  candidates: z.array(z.object({ place_id: z.string() })).optional(),
});

const textSearchResponseSchema = z.object({
  results: z.array(z.object({ place_id: z.string() })).optional(),
});

function buildErrorContext({ label, status, errorMessage, query }: { label: string; status?: string; errorMessage?: string; query: string }) {
  return `${label} failed. status=${status ?? "unknown"}${errorMessage ? `, error_message=${errorMessage}` : ""}; query=${query}`;
}


async function resolvePlaceId(apiKey: string, query: string) {
  const candidateQueries = Array.from(
    new Set([
      query,
      // Try a shorter form (often resolves better than a full address string).
      query.replace(/\b\d{6}\b.*$/u, "").replace(/,\s*near\s+[^,]+/iu, ""),
      query.split(",")[0]?.trim() ? query.split(",")[0].trim() : query,
      query.split(",").slice(0, 2).join(", ").trim(),
    ]),
  ).filter(Boolean);

  let lastError: unknown = null;

  for (const candidate of candidateQueries) {
    // 1) findplacefromtext (fast if it matches)
    const findResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
        candidate,
      )}&inputtype=textquery&fields=place_id&key=${encodeURIComponent(apiKey)}`,
    );

    if (findResponse.ok) {
      const findJson = await findResponse.json();
      const findParsed = findPlaceResponseSchema.safeParse(findJson);
      if (findParsed.success && findParsed.data.candidates?.length) {
        return findParsed.data.candidates[0].place_id;
      }
      lastError = findParsed.success ? findJson : findParsed.error;
    } else {
      const text = await findResponse.text();
      lastError = text;
    }

    // 2) textsearch (works when findplacefromtext fails)
    const searchResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        candidate,
      )}&key=${encodeURIComponent(apiKey)}`,
    );

    if (!searchResponse.ok) {
      const text = await searchResponse.text();
      lastError = text;
      continue;
    }

    const searchJson = await searchResponse.json();
    const searchParsed = textSearchResponseSchema.safeParse(searchJson);
    const status = (searchJson as any)?.status;
    const errorMessage = (searchJson as any)?.error_message;

    if (searchParsed.success && searchParsed.data.results?.length) {
      return searchParsed.data.results[0].place_id;
    }

    lastError = buildErrorContext({
      label: "Google Places textsearch",
      status,
      errorMessage,
      query: candidate,
    });
  }

  throw new Error(`Unable to resolve placeId from query. originalQuery=${query}. lastError=${String(lastError)}`);
}


async function fetchPlaceDetails(apiKey: string, placeId: string) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      placeId,
    )}&fields=reviews&key=${encodeURIComponent(apiKey)}`,
  );

  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(`Google Places details request failed: ${responseText}`);
  }

  let json;
  try {
    json = JSON.parse(responseText);
  } catch (err) {
    throw new Error(`Failed to parse Google Places details response: ${err}`);
  }

  const parsed = responseSchema.safeParse(json);
  if (!parsed.success) {
    throw new Error(`Invalid Google Places details response: ${JSON.stringify(parsed.error.format())}`);
  }

  if (parsed.data.status !== "OK") {
    throw new Error(
      `Google Places details API returned status=${parsed.data.status}${parsed.data.error_message ? `: ${parsed.data.error_message}` : ""}`,
    );
  }


  if (!parsed.data.result) {
    throw new Error(`Google Places details response is missing result object`);
  }

  return parsed.data.result.reviews ?? [];
}

const GOOGLE_REVIEWS_CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24h

type CachedReviews = {
  cachedAt: number;
  reviews: Array<{
    authorName: string;
    rating: number;
    text: string;
    relativeTimeDescription: string;
    profilePhotoUrl?: string;
  }>;
  error?: string;
};

const googleReviewsCache = new Map<string, CachedReviews>();

export const getGoogleReviews = createServerFn({ method: "POST" })
  .inputValidator(
    z
      .object({
        placeId: z.string().optional(),
        query: z.string().optional(),
      })
      .refine((value) => !!value.placeId || !!value.query, {
        message: "placeId or query is required",
      }),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      const error = "Missing GOOGLE_MAPS_API_KEY in environment.";
      console.error(error);
      return { reviews: [], error };
    }

    const cacheKey = `${data.placeId ?? ""}::${data.query ?? ""}`;
    const cached = googleReviewsCache.get(cacheKey);
    const now = Date.now();
    if (cached && now - cached.cachedAt < GOOGLE_REVIEWS_CACHE_TTL_MS) {
      if (cached.error) {
        return { reviews: [], error: cached.error };
      }
      return { reviews: cached.reviews };
    }

    let placeId = data.placeId;

    if (!placeId) {
      placeId = await resolvePlaceId(apiKey, data.query!);
    }

    try {
      const reviews = await fetchPlaceDetails(apiKey, placeId);
      const mapped = reviews.map((review) => ({
        authorName: review.author_name ?? "Anonymous",
        rating: review.rating ?? 0,
        text: review.text ?? "",
        relativeTimeDescription: review.relative_time_description ?? "",
        profilePhotoUrl: review.profile_photo_url,
      }));

      const cachedValue: CachedReviews = {
        cachedAt: now,
        reviews: mapped,
      };
      googleReviewsCache.set(cacheKey, cachedValue);

      return {
        reviews: mapped,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(message);

      if (data.query && data.placeId) {
        // If the hardcoded placeId fails, retry with the query fallback.
        try {
          const fallbackPlaceId = await resolvePlaceId(apiKey, data.query);
          const reviews = await fetchPlaceDetails(apiKey, fallbackPlaceId);
          return {
            reviews: reviews.map((review) => ({
              authorName: review.author_name ?? "Anonymous",
              rating: review.rating ?? 0,
              text: review.text ?? "",
              relativeTimeDescription: review.relative_time_description ?? "",
              profilePhotoUrl: review.profile_photo_url,
            })),
          };
        } catch (fallbackError) {
          const fallbackMessage = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
          console.error("Fallback query-based place lookup failed", fallbackMessage);
          return { reviews: [], error: fallbackMessage };
        }
      }

      return { reviews: [], error: message };
    }
  });
