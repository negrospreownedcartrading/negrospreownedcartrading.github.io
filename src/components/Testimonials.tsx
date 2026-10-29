"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { reviews } from "@/data/reviews";
import { site } from "@/data/site";
import { ChevronIcon } from "./icons";
import Reveal from "./Reveal";

// Full-screen review carousel: the active card sits in the center (phones),
// auto-advances, and can be swiped or moved with the arrows / dots.
export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const n = (i + reviews.length) % reviews.length;
    const card = track.children[n] as HTMLElement | undefined;
    if (!card) return;
    // Phones: center the card. Wider screens: line it up with the left edge.
    const centered = !window.matchMedia("(min-width: 640px)").matches;
    const left = centered
      ? card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2
      : card.offsetLeft - track.offsetLeft;
    track.scrollTo({ left, behavior: "smooth" });
  }, []);

  const pause = () => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 8000);
  };

  // Track which card is in the middle of the strip
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(track.children).forEach((el, i) => {
        const c = el as HTMLElement;
        const dist = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };
    onScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-next every 5s until the visitor interacts
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => goTo(active + 1), 5000);
    return () => clearInterval(id);
  }, [paused, active, goTo]);

  useEffect(
    () => () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    },
    [],
  );

  const arrow = (d: 1 | -1) => (
    <button
      onClick={() => {
        pause();
        goTo(active + d);
      }}
      aria-label={d < 0 ? "Previous review" : "Next review"}
      className="grid size-12 shrink-0 place-items-center rounded-full border border-white/20 transition hover:border-brand hover:bg-brand hover:text-black active:scale-95"
    >
      <ChevronIcon dir={d < 0 ? "left" : "right"} />
    </button>
  );

  return (
    <section
      id="reviews"
      aria-label="Customer reviews"
      className="relative flex min-h-[100svh] snap-start flex-col justify-center border-t border-line pt-24 pb-12 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center sm:text-left">
          <p className="font-display text-sm font-semibold tracking-[0.35em] text-brand uppercase">Testimonies</p>
          <h2 className="mt-2 font-display text-4xl leading-none font-bold uppercase sm:text-6xl">
            What Our <span className="text-brand">Clients</span> Say
          </h2>
          <p className="mt-3 flex items-center justify-center gap-2 text-sm text-white/70 sm:justify-start sm:text-base">
            <span className="tracking-wider text-brand">★★★★★</span>
            100% recommend · 34 reviews
          </p>
        </Reveal>

        <div
          ref={trackRef}
          onPointerDown={pause}
          onTouchStart={pause}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[9%] py-4 sm:mx-0 sm:mt-10 sm:px-0"
        >
          {reviews.map((r, i) => (
            <figure
              key={r.name}
              className={`relative flex w-[82%] shrink-0 snap-center flex-col rounded-2xl border bg-panel p-5 transition sm:p-6 duration-500 sm:w-[46%] sm:snap-start lg:w-[31.5%] ${
                i === active
                  ? "border-brand/60 shadow-xl shadow-brand/10"
                  : "scale-[0.94] border-line opacity-50 sm:scale-100 sm:opacity-100"
              }`}
            >
              <span className="absolute -top-2 right-6 font-display text-7xl leading-none text-brand/30">“</span>
              <blockquote className="flex-1 text-sm leading-relaxed text-white/85 sm:text-[15px]">{r.text}</blockquote>
              <figcaption className="mt-4 flex items-center gap-3 sm:mt-6">
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

        {/* Arrows + dots (all screen sizes) */}
        <div className="mt-4 flex items-center justify-center gap-4 sm:justify-start">
          {arrow(-1)}
          {/* Phones: compact counter (keeps the arrows clear of the floating call buttons) */}
          <span className="min-w-16 text-center font-display text-sm font-bold tracking-[0.2em] sm:hidden">
            <span className="text-brand">{String(active + 1).padStart(2, "0")}</span>
            <span className="text-white/40"> / {String(reviews.length).padStart(2, "0")}</span>
          </span>
          <div className="hidden items-center gap-1.5 sm:flex">
            {reviews.map((r, i) => (
              <button
                key={r.name}
                onClick={() => {
                  pause();
                  goTo(i);
                }}
                aria-label={`Show review ${i + 1}`}
                className="grid h-6 place-items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-brand" : "w-1.5 bg-white/30"
                  }`}
                />
              </button>
            ))}
          </div>
          {arrow(1)}
        </div>

        <div className="mt-4 text-center sm:mt-6 sm:text-left">
          <a
            href={`${site.facebook}/reviews`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-display text-sm font-bold tracking-[0.2em] text-brand uppercase underline-offset-4 hover:underline"
          >
            Read all reviews on Facebook →
          </a>
        </div>
      </div>
    </section>
  );
}
