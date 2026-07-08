import * as React from "react";
import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import { getGoogleReviews } from "@/lib/api/googleReviews.functions";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./shared/SectionHeading";

// If you know the exact Google Place ID, paste it here.
const PLACE_ID = "ChIJeX4B2pHnfYERMl8xVZ9N0dk";

// Fallback query for finding your business in Google Places.
// Update this if the address or name changes.
const PLACE_QUERY = "CodeXmattriX Academy, Dharamshala, Himachal Pradesh";


function renderStars(rating: number) {
  const rounded = Math.round(rating);
  return Array.from({ length: 5 }).map((_, index) => (
    <Star
      key={index}
      className={cn(
        "size-4",
        index < rounded ? "text-yellow-400" : "text-slate-500/50",
      )}
    />
  ));
}

export function GoogleReviews() {
  const [reviews, setReviews] = React.useState<Array<{ authorName: string; rating: number; text: string; relativeTimeDescription: string; profilePhotoUrl?: string }>>([]);
  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = React.useState<string | null>(null);
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    let active = true;

    getGoogleReviews({ data: { placeId: PLACE_ID || undefined, query: PLACE_QUERY } })
      .then((result) => {
        if (!active) return;

        if (!result) {
          setMessage("Unable to load reviews.");
          setReviews([]);
          return;
        }

        if ("error" in result && typeof result.error === "string" && result.error) {
          setMessage(result.error);
          setReviews([]);
          return;
        }

        if (!result.reviews || result.reviews.length === 0) {
          setMessage("No reviews found for the resolved Google place.");
          setReviews([]);
          return;
        }

        setReviews(result.reviews);
        setMessage(null);
      })
      .catch((err) => {
        console.error(err);
        if (!active) return;
        setMessage("Unable to load reviews.");
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  React.useEffect(() => {
    if (!carouselApi || reviews.length <= 1) return;

    const timer = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 3500);

    return () => {
      window.clearInterval(timer);
    };
  }, [carouselApi, reviews.length]);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center">
            <SectionHeading
                      eyebrow="Google reviews"
                      title={<> What our  <span className="text-gradient">learners say</span></>}
                      subtitle="Real feedback from students and alumni on our training and placement support."
                    />
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-10 text-center text-sm text-slate-400">
            Loading reviews...
          </div>
        ) : message ? (
          <div className="rounded-3xl border border-rose-500/20 bg-rose-500/5 p-10 text-center text-sm text-rose-200">
            {message}
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-10 text-center text-sm text-slate-400">
            No reviews found.
          </div>
        ) : (
          <Carousel
            className="relative"
            setApi={setCarouselApi}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
          >
            <CarouselContent>
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="h-full rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.9)]">
                    <div className="flex items-center gap-4">
                      <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-slate-800">
                        {review.profilePhotoUrl ? (
                          <img
                            src={review.profilePhotoUrl}
                            alt={review.authorName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-semibold text-slate-200">
                            {review.authorName.slice(0, 1).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{review.authorName}</p>
                        <p className="text-xs text-slate-400">{review.relativeTimeDescription}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-1">{renderStars(review.rating)}</div>
                    <p className="mt-4 text-sm leading-6 text-slate-300">{review.text}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </section>
  );
}
