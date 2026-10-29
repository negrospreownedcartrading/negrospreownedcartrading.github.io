"use client";

import { useEffect, useRef, useState } from "react";
import { reviews } from "@/data/reviews";
import { site } from "@/data/site";
import { ChevronIcon } from "./icons";
import Reveal from "./Reveal";

// Swipeable review cards that auto-advance until the visitor interacts
export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollByCard = (d: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const gap = 16;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    if (d > 0 && atEnd) track.scrollTo({ left: 0, behavior: "smooth" });
    else track.scrollBy({ left: d * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const pause = () => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 8000);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => scrollByCard(1), 5000);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  return (
    <section id="reviews" aria-label="Customer reviews" className="relative snap-start border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-sm font-semibold tracking-[0.35em] text-brand uppercase">
              Testimonies
            </p>
            <h2 className="mt-2 font-display text-4xl leading-none font-bold uppercase sm:text-6xl">
              What Our <span className="text-brand">Clients</span> Say
            </h2>
            <p className="mt-4 flex items-center gap-2 text-white/70">
              <span className="text-lg tracking-wider text-brand">★★★★★</span>
              100% recommend · 34 reviews on Facebook
            </p>
          </div>
          <div className="hidden gap-2 sm:flex">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                onClick={() => {
                  pause();
                  scrollByCard(d);
                }}
                aria-label={d < 0 ? "Previous review" : "Next review"}
                className="grid size-12 place-items-center rounded-full border border-white/20 transition hover:border-brand hover:bg-brand hover:text-black"
              >
                <ChevronIcon dir={d < 0 ? "left" : "right"} />
              </button>
            ))}
          </div>
        </Reveal>

        <div
          ref={trackRef}
          onPointerDown={pause}
          onTouchStart={pause}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 sm:mx-0 sm:scroll-px-0 sm:px-0"
        >
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="relative flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border border-line bg-panel p-6 sm:w-[46%] lg:w-[31.5%]"
            >
              <span className="absolute -top-2 right-6 font-display text-7xl leading-none text-brand/30">“</span>
              <blockquote className="flex-1 text-[15px] leading-relaxed text-white/85">{r.text}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand font-display text-lg font-bold text-black">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-semibold">{r.name}</span>
                  <span className="text-xs text-white/50">recommends {site.name}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <a
          href={`${site.facebook}/reviews`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block font-display text-sm font-bold tracking-[0.2em] text-brand uppercase underline-offset-4 hover:underline"
        >
          Read all reviews on Facebook →
        </a>
      </div>
    </section>
  );
}
