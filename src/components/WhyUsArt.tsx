"use client";

import { useEffect, useState } from "react";

// Animated illustrations for the Why Us cards. Every animated element has the
// `wu` class so it stays paused until its card scrolls into view (see globals.css).

const loop = (name: string, delay = 0, extra = "") =>
  ({ animation: `${name} 4s ${extra || "cubic-bezier(0.3,0.7,0.3,1)"} ${delay}s infinite both` }) as const;

const Check = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="var(--color-brand)" />
    <path d="m7 12.5 3.2 3.2L17 9" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* 01 — Mechanic inspected */
export function MechanicArt() {
  const ticks = [
    { left: "22%", top: "70%", delay: 0.9 },
    { left: "52%", top: "28%", delay: 1.7 },
    { left: "77%", top: "70%", delay: 2.3 },
  ];
  return (
    <div className="relative h-full w-full">
      {/* Car side outline */}
      <svg viewBox="0 0 160 80" className="absolute inset-x-[6%] top-[18%] w-[88%]" aria-hidden="true">
        <path
          d="M8 58 L14 42 Q18 36 28 34 L50 31 L66 18 Q72 13 82 13 L108 13 Q116 13 122 19 L134 31 L146 34 Q154 36 154 44 L154 58 Z"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M70 31 L80 19 L104 19 L104 31 Z M110 31 L110 19 L118 19 L128 31 Z" fill="rgba(255,255,255,0.15)" />
        <circle cx="40" cy="60" r="11" fill="#000" stroke="rgba(255,255,255,0.8)" strokeWidth="3" />
        <circle cx="124" cy="60" r="11" fill="#000" stroke="rgba(255,255,255,0.8)" strokeWidth="3" />
        <circle cx="40" cy="60" r="3.5" fill="var(--color-brand)" />
        <circle cx="124" cy="60" r="3.5" fill="var(--color-brand)" />
      </svg>

      {/* Scanner beam */}
      <div className="wu absolute top-[8%] bottom-[8%] w-[3px] -translate-x-1/2" style={loop("wu-scan", 0, "ease-in-out")}>
        <div className="h-full w-full rounded-full bg-brand shadow-[0_0_16px_4px_rgba(242,193,3,0.7)]" />
        <div className="absolute inset-y-0 -left-6 w-6 bg-gradient-to-l from-brand/25 to-transparent" />
      </div>

      {ticks.map((t) => (
        <span
          key={t.left}
          className="wu absolute size-5 -translate-x-1/2 -translate-y-1/2 sm:size-6"
          style={{ left: t.left, top: t.top, ...loop("wu-tick", t.delay) }}
        >
          <Check className="size-full drop-shadow-[0_0_6px_rgba(242,193,3,0.8)]" />
        </span>
      ))}

      {/* Wrench */}
      <svg
        viewBox="0 0 24 24"
        className="wu absolute top-[4%] left-[6%] size-6 origin-bottom-left text-brand"
        style={loop("wu-wiggle", 0, "ease-in-out")}
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M22.7 19 13.6 9.9c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4Z"
        />
      </svg>
    </div>
  );
}

/* LTO-style seal. Uses public/brand/lto.png if present, otherwise a drawn seal. */
function LtoSeal() {
  // Start with the drawn seal; switch to the real logo only once it has actually loaded
  const [useImage, setUseImage] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => setUseImage(true);
    img.src = "/brand/lto.png";
  }, []);
  if (useImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/brand/lto.png" alt="LTO" className="size-full rounded-full bg-white object-contain" />
    );
  }
  return (
    <svg viewBox="0 0 100 100" className="size-full" aria-label="LTO">
      <defs>
        <path id="lto-arc-top" d="M 16 50 A 34 34 0 0 1 84 50" />
        <path id="lto-arc-bottom" d="M 18 54 A 32 32 0 0 0 82 54" />
      </defs>
      <circle cx="50" cy="50" r="48" fill="#1d4fa3" />
      <circle cx="50" cy="50" r="30" fill="#fff" />
      <text fontSize="9" fontWeight="700" fill="#fff" letterSpacing="0.5">
        <textPath href="#lto-arc-top" startOffset="50%" textAnchor="middle">
          LAND TRANSPORTATION
        </textPath>
      </text>
      <text fontSize="8" fontWeight="700" fill="#fff">
        <textPath href="#lto-arc-bottom" startOffset="50%" textAnchor="middle">
          ★ OFFICE ★
        </textPath>
      </text>
      <path d="M50 26 L72 64 L28 64 Z" fill="none" stroke="#d6262f" strokeWidth="4" strokeLinejoin="round" />
      <ellipse cx="50" cy="51" rx="17" ry="11" fill="#fff" stroke="#d6262f" strokeWidth="3" />
      <text x="50" y="55.5" fontSize="12" fontWeight="900" fill="#d6262f" textAnchor="middle" fontFamily="Georgia, serif">
        LTO
      </text>
    </svg>
  );
}

/* 02 — LTO verified papers */
export function LtoArt() {
  return (
    <div className="relative h-full w-full">
      {/* Registration paper */}
      <div
        className="wu absolute top-[6%] left-1/2 -ml-[34px] h-[86%] w-[68px] rounded-[3px] bg-[#f5f1e6] p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.6)] sm:-ml-[42px] sm:w-[84px] sm:p-2"
        style={loop("wu-paper")}
      >
        <div className="h-1.5 rounded-sm bg-[#1d4fa3]" />
        <p className="mt-1 text-center font-display text-[5.5px] leading-tight font-bold tracking-wide text-black/80 uppercase sm:text-[7px]">
          Certificate of
          <br />
          Registration
        </p>
        <div className="mt-1 space-y-[3px]">
          {[100, 80, 92, 64, 86, 70].map((w, i) => (
            <div
              key={i}
              className="wu h-[3px] origin-left rounded-full bg-black/25"
              style={{ width: `${w}%`, ...loop("wu-line", 0.08 * i) }}
            />
          ))}
        </div>
        <div className="mt-1.5 flex items-end justify-between">
          <div className="h-3 w-4 rounded-[1px] bg-black/15" />
          <div className="h-[2px] w-6 bg-black/40" />
        </div>
      </div>

      {/* Ink burst + seal stamp */}
      <div className="absolute right-[14%] bottom-[8%] size-12 sm:right-[18%] sm:size-14">
        <span className="wu absolute inset-0 rounded-full border-4 border-[#1d4fa3]" style={loop("wu-ink")} />
        <div className="wu absolute inset-0 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.6)]" style={loop("wu-stamp")}>
          <LtoSeal />
        </div>
      </div>

      <span
        className="wu absolute top-[34%] left-1/2 -ml-[30px] rounded-sm border-2 border-[#d6262f] px-1 font-display text-[10px] font-bold tracking-[0.15em] text-[#d6262f] uppercase sm:text-xs"
        style={loop("wu-verified")}
      >
        Verified
      </span>
    </div>
  );
}

/* 03 — Easy financing */
export function FinancingArt() {
  const bars = [32, 48, 64, 86];
  return (
    <div className="relative h-full w-full">
      {/* Growing payment bars */}
      <div className="absolute bottom-[10%] left-[8%] flex h-[70%] items-end gap-1.5">
        {bars.map((h, i) => (
          <div
            key={h}
            className="wu w-3 origin-bottom rounded-t-sm bg-gradient-to-t from-white/20 to-white/60 sm:w-4"
            style={{ height: `${h}%`, ...loop("wu-grow", 0.12 * i) }}
          />
        ))}
      </div>

      {/* Coins dropping onto a stack */}
      <div className="absolute right-[12%] bottom-[10%] w-12 sm:w-14">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="wu absolute left-0 grid h-4 w-full place-items-center rounded-[50%] border-2 border-[#9c7a00] bg-brand font-display text-[10px] font-bold text-black shadow-[0_2px_0_#9c7a00] sm:h-5"
            style={{ bottom: `${i * 12}px`, ...loop("wu-drop", 0.25 * i) }}
          >
            ₱
          </div>
        ))}
      </div>

      {/* Low DP badge */}
      <span
        className="wu absolute top-[4%] left-[8%] rounded-full bg-brand px-2 py-0.5 font-display text-[10px] font-bold tracking-wider text-black uppercase sm:text-xs"
        style={loop("wu-pop")}
      >
        Low DP
      </span>
    </div>
  );
}

/* 04 — Hand-over ready: polish wipes the dirt away, sparkles pop, the key swings in */
export function HandoverArt() {
  const dirt = [
    { left: "26%", top: "44%", size: 10, delay: 0.2 },
    { left: "48%", top: "34%", size: 8, delay: 0.55 },
    { left: "62%", top: "50%", size: 12, delay: 0.8 },
    { left: "80%", top: "42%", size: 7, delay: 1.05 },
  ];
  const sparkles = [
    { left: "20%", top: "18%", delay: 0 },
    { left: "56%", top: "12%", delay: 0.15 },
    { left: "84%", top: "26%", delay: 0.3 },
  ];
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      {/* Car (same outline as the inspection card, shinier) */}
      <svg viewBox="0 0 160 80" className="absolute inset-x-[6%] top-[22%] w-[88%]" aria-hidden="true">
        <path
          d="M8 58 L14 42 Q18 36 28 34 L50 31 L66 18 Q72 13 82 13 L108 13 Q116 13 122 19 L134 31 L146 34 Q154 36 154 44 L154 58 Z"
          fill="rgba(242,193,3,0.12)"
          stroke="var(--color-brand)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M70 31 L80 19 L104 19 L104 31 Z M110 31 L110 19 L118 19 L128 31 Z" fill="rgba(255,255,255,0.18)" />
        <circle cx="40" cy="60" r="11" fill="#000" stroke="rgba(255,255,255,0.8)" strokeWidth="3" />
        <circle cx="124" cy="60" r="11" fill="#000" stroke="rgba(255,255,255,0.8)" strokeWidth="3" />
      </svg>

      {/* Dirt spots that vanish as the polish passes */}
      {dirt.map((d) => (
        <span
          key={d.left}
          className="wu absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6b5a3a] blur-[1px]"
          style={{ left: d.left, top: d.top, width: d.size, height: d.size, ...loop("wu-dirt", d.delay, "ease-out") }}
        />
      ))}

      {/* Polish swipe with a shine trail */}
      <div className="wu absolute top-[14%] bottom-[18%] w-10 -translate-x-1/2" style={loop("wu-wipe", 0, "ease-in-out")}>
        <div className="absolute inset-y-0 right-0 w-2 rounded-full bg-white shadow-[0_0_14px_4px_rgba(255,255,255,0.7)]" />
        <div className="absolute inset-y-0 right-2 left-0 bg-gradient-to-r from-transparent to-white/30" />
      </div>

      {/* Sparkles once it is clean */}
      {sparkles.map((s) => (
        <svg
          key={s.left}
          viewBox="0 0 24 24"
          className="wu absolute size-4 -translate-x-1/2 text-white sm:size-5"
          style={{ left: s.left, top: s.top, ...loop("wu-sparkle", s.delay, "ease-out") }}
          aria-hidden="true"
        >
          <path fill="currentColor" d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
        </svg>
      ))}

      {/* Car key with a yellow tag swings in */}
      <div className="wu absolute top-[2%] right-[22%] origin-top" style={loop("wu-key", 0, "ease-out")}>
        <div className="mx-auto h-3 w-px bg-white/60" />
        <div className="flex items-center gap-0.5">
          <div className="grid h-6 w-4 place-items-center rounded-md bg-white/90 shadow-md">
            <span className="size-1.5 rounded-full bg-black/60" />
          </div>
          <div className="rounded-sm bg-brand px-1 font-display text-[8px] font-bold text-black uppercase sm:text-[9px]">
            Yours
          </div>
        </div>
      </div>
    </div>
  );
}
