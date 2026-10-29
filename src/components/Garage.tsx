"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/data/site";
import { units } from "@/data/units";
import { CheckIcon, ChevronIcon, MessengerIcon, PhoneIcon } from "./icons";
import Lightbox from "./Lightbox";

const peso = (n: number) =>
  "₱" + n.toLocaleString("en-PH", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });

const clamp = (n: number) => Math.max(0.08, Math.min(1, n));

const types = ["All", ...Array.from(new Set(units.map((u) => u.type)))];

// "Need for Speed" style car select: big stage, animated stat bars, thumbnail strip
export default function Garage() {
  const [type, setType] = useState("All");
  const list = useMemo(() => (type === "All" ? units : units.filter((u) => u.type === type)), [type]);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [gallery, setGallery] = useState(false);
  const [photo, setPhoto] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null); // under the stage (desktop)
  const mobileStripRef = useRef<HTMLDivElement>(null); // top of the details screen (phones/tablets)
  const inView = useRef(false);
  const touchX = useRef<number | null>(null);

  const car = list[index] ?? list[0];

  const step = useCallback(
    (d: 1 | -1) => {
      setDir(d);
      setPhoto(0);
      setIndex((i) => (i + d + list.length) % list.length);
    },
    [list.length],
  );

  const select = (i: number) => {
    if (i === index) return;
    setDir(i > index ? 1 : -1);
    setPhoto(0);
    setIndex(i);
  };

  // Arrow keys work while the garage is on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (inView.current = e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    const onKey = (e: KeyboardEvent) => {
      if (!inView.current || gallery) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [step, gallery]);

  // Keep the active thumbnail centered in the strips (without scrolling the page)
  useEffect(() => {
    for (const strip of [stripRef.current, mobileStripRef.current]) {
      const thumb = strip?.children[index] as HTMLElement | undefined;
      if (!strip || !thumb) continue;
      strip.scrollTo({
        left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, [index, type]);

  const renderStrip = (ref: React.RefObject<HTMLDivElement | null>, className: string) => (
    <div ref={ref} className={`no-scrollbar relative snap-x gap-3 overflow-x-auto px-1 py-2 ${className}`}>
      {list.map((u, i) => (
        <button
          key={u.id}
          onClick={() => select(i)}
          className={`group w-24 shrink-0 snap-center text-left transition duration-300 md:w-28 ${
            i === index ? "scale-105" : "opacity-50 grayscale hover:opacity-90 hover:grayscale-0"
          }`}
        >
          <div
            className={`skeleton relative aspect-[4/3] overflow-hidden rounded-lg ring-2 transition ${
              i === index ? "shadow-lg shadow-brand/30 ring-brand" : "ring-transparent"
            }`}
          >
            <Image src={u.photos[0]} alt="" fill sizes="112px" loading="lazy" className="object-cover" />
          </div>
          <p className="mt-1.5 truncate font-display text-[11px] font-bold tracking-wider uppercase md:mt-2 md:text-xs">
            {u.year} {u.name}
          </p>
        </button>
      ))}
    </div>
  );

  const bars = [
    { label: "Model Year", value: clamp((car.year - 2008) / (2025 - 2008)), text: String(car.year) },
    { label: "Low Mileage", value: clamp(1 - car.mileageKm / 150000), text: `${car.mileageKm.toLocaleString()} km` },
    { label: "Engine", value: clamp(car.engineLiters / 3), text: car.engine },
  ];

  const inquire = site.messenger;

  return (
    <section
      ref={sectionRef}
      id="units"
      aria-label="Available units"
      // Below lg the garage is two lock screens (heading+photo, then details) instead of one
      // tall snap area, because browsers scroll freely inside snap areas taller than the screen.
      // overflow-clip (not hidden) so the inner snap points still belong to the page scroller.
      className="relative overflow-clip border-t border-line py-20 sm:py-28 lg:snap-start lg:pt-24 lg:pb-10"
    >
      {/* Garage backdrop: floor grid + spotlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_55%,rgba(242,193,3,0.14),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_top,black,transparent)] [transform:perspective(600px)_rotateX(55deg)] origin-bottom" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading + filters */}
        <div className="flex flex-col gap-5 max-lg:snap-start max-lg:scroll-mt-20 sm:max-lg:scroll-mt-28 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-display text-sm font-semibold tracking-[0.35em] text-brand uppercase">
              The Garage
            </p>
            <h2 className="mt-2 font-display text-4xl leading-none font-bold uppercase sm:text-6xl">
              Select Your Ride
            </h2>
          </div>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setType(t);
                  setIndex(0);
                  setPhoto(0);
                }}
                className={`min-h-11 shrink-0 rounded-full border px-5 font-display text-sm font-bold tracking-[0.15em] uppercase transition ${
                  type === t
                    ? "border-brand bg-brand text-black"
                    : "border-white/20 text-white/70 hover:border-white/60 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
          {/* Stage — on phones/tablets it fills at least the first screen, so the details
              screen (with its car pictures) always starts below the fold */}
          <div className="max-lg:min-h-[calc(100svh-230px)]">
            <div
              className="relative mx-auto aspect-[4/5] w-full max-w-md select-none lg:h-[clamp(300px,calc(100svh-440px),560px)] lg:w-auto lg:max-w-none"
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
                touchX.current = null;
              }}
            >
              {/* Big outlined counter behind the car */}
              <span className="pointer-events-none absolute -top-8 -left-4 z-0 font-display text-[9rem] leading-none font-bold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)] sm:-left-16 sm:text-[12rem]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div
                key={car.id}
                className={`relative z-10 h-full w-full ${
                  dir > 0 ? "animate-drive-in-right" : "animate-drive-in-left"
                }`}
              >
                <button
                  onClick={() => setGallery(true)}
                  aria-label={`View photos of ${car.name}`}
                  className="skeleton group relative block h-full w-full overflow-hidden rounded-2xl ring-1 ring-white/10 [clip-path:polygon(0_0,92%_0,100%_6%,100%_100%,8%_100%,0_94%)]"
                >
                  <Image
                    src={car.photos[photo]}
                    alt={`${car.year} ${car.name}`}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 448px, 90vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 font-display text-xs font-bold tracking-[0.2em] uppercase backdrop-blur">
                    Tap for {car.photos.length} photos
                  </span>
                </button>
              </div>

              {/* Speed lines flash on change */}
              <div
                key={`lines-${car.id}`}
                className="pointer-events-none absolute inset-0 z-20 animate-speed-lines [background:repeating-linear-gradient(0deg,transparent_0_14px,rgba(242,193,3,0.35)_14px_15px)] [mask-image:linear-gradient(90deg,transparent,black_40%,transparent)]"
              />

              {/* Floor glow */}
              <div className="absolute -bottom-6 left-1/2 z-0 h-10 w-4/5 -translate-x-1/2 rounded-[50%] bg-brand/40 blur-2xl" />

              {/* Prev / next */}
              <button
                onClick={() => step(-1)}
                aria-label="Previous car"
                className="absolute top-1/2 -left-3 z-30 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/70 backdrop-blur transition hover:border-brand hover:bg-brand hover:text-black sm:-left-6"
              >
                <ChevronIcon dir="left" />
              </button>
              <button
                onClick={() => step(1)}
                aria-label="Next car"
                className="absolute top-1/2 -right-3 z-30 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/70 backdrop-blur transition hover:border-brand hover:bg-brand hover:text-black sm:-right-6"
              >
                <ChevronIcon />
              </button>
            </div>

            {/* Photo dots for current car */}
            <div className="mt-8 flex justify-center gap-2 lg:mt-5">
              {car.photos.map((p, n) => (
                <button
                  key={p}
                  onClick={() => setPhoto(n)}
                  aria-label={`Show photo ${n + 1}`}
                  className="grid h-6 place-items-center px-1"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all ${
                      n === photo ? "w-8 bg-brand" : "w-3 bg-white/30"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Car strip under the stage on desktop; phones/tablets get it on the details screen */}
            {renderStrip(stripRef, "mt-3 hidden lg:flex")}
          </div>

          {/* Spec panel — on phones/tablets this is its own scroll-lock screen, sized to fit */}
          <div key={`info-${car.id}`} className="animate-fade scroll-mt-16 max-lg:snap-start max-lg:scroll-mt-4 max-lg:pt-14">
            {renderStrip(mobileStripRef, "-mx-1 mb-3 flex lg:hidden")}

            <div className="flex items-center gap-3">
              <span className="rounded-sm bg-brand px-2 py-0.5 font-display text-xs font-bold tracking-[0.2em] text-black uppercase">
                {car.type}
              </span>
              <span className="font-display text-sm tracking-[0.2em] text-white/60 uppercase">
                {String(index + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
              </span>
            </div>

            <h3 className="mt-2 font-display text-3xl leading-none font-bold uppercase roomy:text-5xl roomy:mt-3">
              <span className="text-brand">{car.year}</span> {car.name}
            </h3>

            <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-1 roomy:mt-5 roomy:gap-x-6 roomy:gap-y-2">
              <p className="font-display text-3xl font-bold text-brand roomy:text-5xl">{peso(car.price)}</p>
              <p className="pb-1 text-xs text-white/70 roomy:text-sm">
                Cash price · <span className="text-white">Negotiable for cash buyer</span>
              </p>
            </div>

            {/* Stat bars */}
            <div className="mt-4 space-y-2.5 roomy:mt-8 roomy:space-y-4">
              {bars.map((b, n) => (
                <div key={b.label}>
                  <div className="mb-1 flex justify-between font-display text-xs font-semibold tracking-[0.15em] uppercase roomy:mb-1.5 roomy:text-sm">
                    <span className="text-white/70">{b.label}</span>
                    <span>{b.text}</span>
                  </div>
                  <div className="h-2 overflow-hidden roomy:h-2.5 rounded-sm bg-white/10 [clip-path:polygon(0_0,100%_0,98%_100%,0_100%)]">
                    <div
                      className="h-full origin-left animate-bar bg-gradient-to-r from-brand/70 to-brand"
                      style={{ width: `${b.value * 100}%`, animationDelay: `${150 + n * 120}ms` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick specs */}
            <dl className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-line text-center roomy:mt-8">
              {[
                ["Trans", car.transmission],
                ["Fuel", car.fuel],
                ["DP", peso(car.downpayment)],
              ].map(([k, v]) => (
                <div key={k} className="bg-panel px-2 py-2 roomy:py-3">
                  <dt className="font-display text-[11px] tracking-[0.2em] text-white/50 uppercase roomy:text-xs">{k}</dt>
                  <dd className="mt-0.5 font-display text-sm font-bold roomy:text-lg roomy:mt-1">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-3 text-xs text-white/70 roomy:mt-4 roomy:text-sm">
              Financing:{" "}
              {car.terms.map((t, n) => (
                <span key={t.years}>
                  {n > 0 && " · "}
                  <span className="font-semibold text-white">{peso(t.monthly)}</span>/mo for {t.years} yrs
                </span>
              ))}
            </p>

            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs roomy:mt-6 roomy:gap-y-2 roomy:text-sm">
              {car.highlights.map((h) => (
                <li key={h} className="flex items-center gap-1.5 text-white/85 roomy:gap-2">
                  <CheckIcon className="size-3.5 shrink-0 text-brand roomy:size-4" />
                  {h}
                </li>
              ))}
            </ul>

            {/* Side by side on phones too, to save height */}
            <div className="mt-4 flex gap-2 roomy:mt-8 roomy:gap-3">
              <a
                href={inquire}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand px-3 font-display text-sm font-bold tracking-[0.12em] text-black uppercase shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-soft roomy:px-6 roomy:text-base roomy:tracking-[0.15em]"
              >
                <MessengerIcon /> Inquire<span className="hidden sm:inline"> Now</span>
              </a>
              <a
                href={`tel:${site.phone}`}
                className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/30 px-3 font-display text-sm font-bold tracking-[0.12em] uppercase transition hover:border-white hover:bg-white/10 roomy:px-6 roomy:text-base roomy:tracking-[0.15em]"
              >
                <PhoneIcon /> Call {site.contactName}
              </a>
            </div>
            <p className="mt-3 text-[11px] text-white/50 roomy:mt-4 roomy:text-xs">
              Free transfer of ownership · Mechanic inspected · LTO verified · Comprehensive insurance not included
            </p>
          </div>
        </div>
      </div>

      {gallery && (
        <Lightbox
          photos={car.photos}
          start={photo}
          title={`${car.year} ${car.name}`}
          onClose={() => setGallery(false)}
        />
      )}
    </section>
  );
}
