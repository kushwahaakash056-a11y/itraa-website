import { useEffect, useRef, useState } from "react";
import { Camera, Heart, MessageCircle, Send } from "lucide-react";
import { images } from "@/lib/itraa-data";

export function InstagramGallery() {
  const mobileTrack = useRef<HTMLDivElement>(null);
  const [activePost, setActivePost] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    if (!media.matches || images.instagram.length < 2) return;

    const timer = window.setInterval(() => {
      setActivePost((current) => {
        const next = (current + 1) % images.instagram.length;
        const track = mobileTrack.current;
        const slide = track?.children.item(next) as HTMLElement | null;
        if (track && slide) {
          track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
        }
        return next;
      });
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  const syncActivePost = () => {
    const track = mobileTrack.current;
    if (!track) return;

    const slides = Array.from(track.children) as HTMLElement[];
    const closest = slides.reduce(
      (best, slide, index) => {
        const distance = Math.abs(slide.offsetLeft - track.offsetLeft - track.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    );
    setActivePost(closest.index);
  };

  return (
    <section className="overflow-hidden py-24 lg:py-32">
      <div>
        <div className="shell flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">@itraa.parfums</p>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.05]">
              Life, <span className="italic text-gold">scented</span>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/itraa_perfumery"
            target="_blank"
            rel="noreferrer noopener"
            className="btn-ghost-luxe"
          >
            <Camera className="h-4 w-4" strokeWidth={1.2} />
            Follow
          </a>
        </div>

        <div
          ref={mobileTrack}
          onScroll={syncActivePost}
          className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1.25rem,calc((100vw-80rem)/2))] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0"
        >
          {images.instagram.map((src, index) => (
            <a
              key={src}
              href="https://www.instagram.com/itraa_perfumery"
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open ITRAA Instagram post ${index + 1}`}
              className="group w-[84vw] max-w-[23rem] shrink-0 snap-center overflow-hidden rounded-[24px] border border-border bg-card shadow-soft transition-transform duration-500 hover:-translate-y-1 md:w-auto md:max-w-none"
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground font-display text-xs tracking-[0.12em] text-background">
                  IT
                </span>
                <div>
                  <p className="font-button text-[10px] font-medium tracking-[0.12em]">
                    itraa_perfumery
                  </p>
                  <p className="text-[10px] text-muted-foreground">ITRAA Parfums</p>
                </div>
                <span className="ml-auto text-lg leading-none text-muted-foreground">•••</span>
              </div>
              <div className="overflow-hidden">
                <img
                  src={src}
                  alt={`ITRAA Instagram post ${index + 1}`}
                  loading="lazy"
                  width={1000}
                  height={1000}
                  className="aspect-square w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-center gap-4 px-4 py-4 text-foreground">
                <Heart className="h-5 w-5" strokeWidth={1.3} />
                <MessageCircle className="h-5 w-5" strokeWidth={1.3} />
                <Send className="h-5 w-5" strokeWidth={1.3} />
                <Camera className="ml-auto h-5 w-5 text-gold" strokeWidth={1.3} />
              </div>
            </a>
          ))}
        </div>
        <div
          className="mt-5 flex justify-center gap-2 md:hidden"
          aria-label="Instagram post position"
        >
          {images.instagram.map((src, index) => (
            <button
              key={src}
              type="button"
              aria-label={`Show Instagram post ${index + 1}`}
              onClick={() => {
                const track = mobileTrack.current;
                const slide = track?.children.item(index) as HTMLElement | null;
                if (track && slide) {
                  track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
                }
                setActivePost(index);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activePost === index ? "w-8 bg-gold" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
