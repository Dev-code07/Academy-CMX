import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const reviewSchema = z.object({
  authorAttribution: z
    .object({
      displayName: z.string().optional(),
      photoUri: z.string().optional(),
    })
    .optional(),
  rating: z.number().optional(),
  text: z
    .object({
      text: z.string().optional(),
    })
    .optional(),
  relativePublishTimeDescription: z.string().optional(),
});

const responseSchema = z.object({
  reviews: z.array(reviewSchema).optional(),
});

const textSearchResponseSchema = z.object({
  places: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
      }),
    )
    .optional(),
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
    const searchResponse = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.id,places.name",
      },
      body: JSON.stringify({ textQuery: candidate }),
    });

    if (!searchResponse.ok) {
      const text = await searchResponse.text();
      lastError = text;
      continue;
    }

    const searchJson = await searchResponse.json();
    const searchParsed = textSearchResponseSchema.safeParse(searchJson);
    if (searchParsed.success && searchParsed.data.places?.length) {
      const first = searchParsed.data.places[0];
      if (first.id) {
        return first.id;
      }
      if (first.name?.startsWith("places/")) {
        return first.name.slice("places/".length);
      }
    }

    lastError = buildErrorContext({
      label: "Places API searchText",
      query: candidate,
    });
  }

  throw new Error(`Unable to resolve placeId from query. originalQuery=${query}. lastError=${String(lastError)}`);
}
async function fetchPlaceDetails(apiKey: string, placeId: string) {
  const normalizedPlaceId = placeId.startsWith("places/") ? placeId.slice("places/".length) : placeId;
  const response = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(normalizedPlaceId)}`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "reviews",
      },
    },
  );

  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(`Places API place details request failed: ${responseText}`);
  }

  let json;
  try {
    json = JSON.parse(responseText);
  } catch (err) {
    throw new Error(`Failed to parse Places API place details response: ${err}`);
  }

  const parsed = responseSchema.safeParse(json);
  if (!parsed.success) {
    throw new Error(`Invalid Places API place details response: ${JSON.stringify(parsed.error.format())}`);
  }

  return parsed.data.reviews ?? [];
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
        authorName: review.authorAttribution?.displayName ?? "Anonymous",
        rating: review.rating ?? 0,
        text: review.text?.text ?? "",
        relativeTimeDescription: review.relativePublishTimeDescription ?? "",
        profilePhotoUrl: review.authorAttribution?.photoUri,
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
              authorName: review.authorAttribution?.displayName ?? "Anonymous",
              rating: review.rating ?? 0,
              text: review.text?.text ?? "",
              relativeTimeDescription: review.relativePublishTimeDescription ?? "",
              profilePhotoUrl: review.authorAttribution?.photoUri,
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
