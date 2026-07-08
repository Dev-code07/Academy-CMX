import { c as createServerRpc } from "./createServerRpc-UK3Z2BL9.mjs";
import { a as createServerFn } from "./server-CQgTzQcz.mjs";
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
  authorAttribution: object({
    displayName: string().optional(),
    photoUri: string().optional()
  }).optional(),
  rating: number().optional(),
  text: object({
    text: string().optional()
  }).optional(),
  relativePublishTimeDescription: string().optional()
});
const responseSchema = object({
  reviews: array(reviewSchema).optional()
});
const textSearchResponseSchema = object({
  places: array(object({
    id: string().optional(),
    name: string().optional()
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
    const searchResponse = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.id,places.name"
      },
      body: JSON.stringify({
        textQuery: candidate
      })
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
      query: candidate
    });
  }
  throw new Error(`Unable to resolve placeId from query. originalQuery=${query}. lastError=${String(lastError)}`);
}
async function fetchPlaceDetails(apiKey, placeId) {
  const normalizedPlaceId = placeId.startsWith("places/") ? placeId.slice("places/".length) : placeId;
  const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(normalizedPlaceId)}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "reviews"
    }
  });
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
      authorName: review.authorAttribution?.displayName ?? "Anonymous",
      rating: review.rating ?? 0,
      text: review.text?.text ?? "",
      relativeTimeDescription: review.relativePublishTimeDescription ?? "",
      profilePhotoUrl: review.authorAttribution?.photoUri
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
            authorName: review.authorAttribution?.displayName ?? "Anonymous",
            rating: review.rating ?? 0,
            text: review.text?.text ?? "",
            relativeTimeDescription: review.relativePublishTimeDescription ?? "",
            profilePhotoUrl: review.authorAttribution?.photoUri
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
