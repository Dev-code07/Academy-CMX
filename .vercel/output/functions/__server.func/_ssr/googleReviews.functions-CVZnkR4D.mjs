import { c as createServerRpc } from "./createServerRpc-Bcuu05LQ.mjs";
import { a as createServerFn } from "./server-R7QUSnGq.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as object, s as string, n as number, a as array } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "../_libs/dotenv.mjs";
import "fs";
import "path";
import "os";
import "crypto";
import "../_libs/isbot.mjs";
const reviewSchema = object({
  author_name: string().optional(),
  rating: number().optional(),
  text: string().optional(),
  relative_time_description: string().optional(),
  profile_photo_url: string().optional()
});
const responseSchema = object({
  status: string(),
  error_message: string().optional(),
  result: object({
    reviews: array(reviewSchema).optional()
  }).optional()
});
const findPlaceResponseSchema = object({
  candidates: array(object({
    place_id: string()
  })).optional()
});
const textSearchResponseSchema = object({
  results: array(object({
    place_id: string()
  })).optional()
});
function buildErrorContext({
  label,
  status,
  errorMessage,
  query
}) {
  return `${label} failed. status=${status ?? "unknown"}${errorMessage ? `, error_message=${errorMessage}` : ""}; query=${query}`;
}
async function resolvePlaceId(apiKey, query) {
  const candidateQueries = Array.from(/* @__PURE__ */ new Set([
    query,
    // Try a shorter form (often resolves better than a full address string).
    query.replace(/\b\d{6}\b.*$/u, "").replace(/,\s*near\s+[^,]+/iu, ""),
    query.split(",")[0]?.trim() ? query.split(",")[0].trim() : query,
    query.split(",").slice(0, 2).join(", ").trim()
  ])).filter(Boolean);
  let lastError = null;
  for (const candidate of candidateQueries) {
    const findResponse = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(candidate)}&inputtype=textquery&fields=place_id&key=${encodeURIComponent(apiKey)}`);
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
    const searchResponse = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(candidate)}&key=${encodeURIComponent(apiKey)}`);
    if (!searchResponse.ok) {
      const text = await searchResponse.text();
      lastError = text;
      continue;
    }
    const searchJson = await searchResponse.json();
    const searchParsed = textSearchResponseSchema.safeParse(searchJson);
    const status = searchJson?.status;
    const errorMessage = searchJson?.error_message;
    if (searchParsed.success && searchParsed.data.results?.length) {
      return searchParsed.data.results[0].place_id;
    }
    lastError = buildErrorContext({
      label: "Google Places textsearch",
      status,
      errorMessage,
      query: candidate
    });
  }
  throw new Error(`Unable to resolve placeId from query. originalQuery=${query}. lastError=${String(lastError)}`);
}
async function fetchPlaceDetails(apiKey, placeId) {
  const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=reviews&key=${encodeURIComponent(apiKey)}`);
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
    throw new Error(`Google Places details API returned status=${parsed.data.status}${parsed.data.error_message ? `: ${parsed.data.error_message}` : ""}`);
  }
  if (!parsed.data.result) {
    throw new Error(`Google Places details response is missing result object`);
  }
  return parsed.data.result.reviews ?? [];
}
const GOOGLE_REVIEWS_CACHE_TTL_MS = 1e3 * 60 * 60 * 24;
const googleReviewsCache = /* @__PURE__ */ new Map();
const getGoogleReviews_createServerFn_handler = createServerRpc({
  id: "fe2455a015e9c9ea23d912b9f2e8a2b2c1305013b80335029412b839fc500aeb",
  name: "getGoogleReviews",
  filename: "src/lib/api/googleReviews.functions.ts"
}, (opts) => getGoogleReviews.__executeServer(opts));
const getGoogleReviews = createServerFn({
  method: "POST"
}).inputValidator(object({
  placeId: string().optional(),
  query: string().optional()
}).refine((value) => !!value.placeId || !!value.query, {
  message: "placeId or query is required"
})).handler(getGoogleReviews_createServerFn_handler, async ({
  data
}) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    const error = "Missing GOOGLE_MAPS_API_KEY in environment.";
    console.error(error);
    return {
      reviews: [],
      error
    };
  }
  const cacheKey = `${data.placeId ?? ""}::${data.query ?? ""}`;
  const cached = googleReviewsCache.get(cacheKey);
  const now = Date.now();
  if (cached && now - cached.cachedAt < GOOGLE_REVIEWS_CACHE_TTL_MS) {
    if (cached.error) {
      return {
        reviews: [],
        error: cached.error
      };
    }
    return {
      reviews: cached.reviews
    };
  }
  let placeId = data.placeId;
  if (!placeId) {
    placeId = await resolvePlaceId(apiKey, data.query);
  }
  try {
    const reviews = await fetchPlaceDetails(apiKey, placeId);
    const mapped = reviews.map((review) => ({
      authorName: review.author_name ?? "Anonymous",
      rating: review.rating ?? 0,
      text: review.text ?? "",
      relativeTimeDescription: review.relative_time_description ?? "",
      profilePhotoUrl: review.profile_photo_url
    }));
    const cachedValue = {
      cachedAt: now,
      reviews: mapped
    };
    googleReviewsCache.set(cacheKey, cachedValue);
    return {
      reviews: mapped
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    if (data.query && data.placeId) {
      try {
        const fallbackPlaceId = await resolvePlaceId(apiKey, data.query);
        const reviews = await fetchPlaceDetails(apiKey, fallbackPlaceId);
        return {
          reviews: reviews.map((review) => ({
            authorName: review.author_name ?? "Anonymous",
            rating: review.rating ?? 0,
            text: review.text ?? "",
            relativeTimeDescription: review.relative_time_description ?? "",
            profilePhotoUrl: review.profile_photo_url
          }))
        };
      } catch (fallbackError) {
        const fallbackMessage = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
        console.error("Fallback query-based place lookup failed", fallbackMessage);
        return {
          reviews: [],
          error: fallbackMessage
        };
      }
    }
    return {
      reviews: [],
      error: message
    };
  }
});
export {
  getGoogleReviews_createServerFn_handler
};
