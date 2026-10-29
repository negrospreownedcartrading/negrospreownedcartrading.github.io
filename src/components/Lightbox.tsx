"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronIcon } from "./icons";

// Fullscreen photo viewer: swipe, arrow keys, Esc to close
export default function Lightbox({
  photos,
  start = 0,
  title,
  onClose,
}: {
  photos: string[];
  start?: number;
  title: string;
  onClose: () => void;
}) {
  const [i, setI] = useState(start);
  const touchX = useRef<number | null>(null);

  const step = useCallback(
    (d: number) => setI((n) => (n + d + photos.length) % photos.length),
    [photos.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, step]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} photos`}
      className="fixed inset-0 z-[60] flex animate-fade flex-col bg-black/95"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <p className="font-display text-lg font-bold uppercase">
          {title}{" "}
          <span className="text-brand">
            {i + 1}/{photos.length}
          </span>
        </p>
        <button
          onClick={onClose}
          aria-label="Close photos"
          className="grid size-11 place-items-center rounded-full bg-white/10 text-2xl transition hover:bg-white/20"
        >
          ×
        </button>
      </div>

      <div className="relative flex-1">
        <Image
          key={photos[i]}
          src={photos[i]}
          alt={`${title} photo ${i + 1}`}
          fill
          sizes="100vw"
          className="animate-fade object-contain"
        />
        <button
          onClick={() => step(-1)}
          aria-label="Previous photo"
          className="absolute top-1/2 left-2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-black/60 transition hover:bg-brand hover:text-black sm:grid"
        >
          <ChevronIcon dir="left" />
        </button>
        <button
          onClick={() => step(1)}
          aria-label="Next photo"
          className="absolute top-1/2 right-2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-black/60 transition hover:bg-brand hover:text-black sm:grid"
        >
          <ChevronIcon />
        </button>
      </div>

      <div className="no-scrollbar flex justify-center gap-2 overflow-x-auto px-4 py-4">
        {photos.map((p, n) => (
          <button
            key={p}
            onClick={() => setI(n)}
            aria-label={`Show photo ${n + 1}`}
            className={`relative h-16 w-12 shrink-0 overflow-hidden rounded-md transition ${
              n === i ? "ring-2 ring-brand" : "opacity-40 hover:opacity-80"
            }`}
          >
            <Image src={p} alt="" fill sizes="48px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
