import HeroReveal from "./HeroReveal";

export default function Hero() {
  return (
    <section
      id="top"
      aria-label="Welcome"
      className="relative flex min-h-[100svh] snap-start items-end overflow-hidden pt-28 pb-24 sm:pb-20"
    >
      {/* Background: drop a photo at public/brand/hero.jpg to replace the gradient */}
      <div
        className="absolute inset-0 animate-slow-zoom bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/brand/hero.jpg'), radial-gradient(ellipse at 70% 40%, #3a2e00 0%, #000000 60%)",
        }}
      />
      {/* Cars revealed inside the passing light beam */}
      <HeroReveal />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />

      {/* The light beam itself (same animation as the reveal, so they move together) */}
      <div className="sweep-glow pointer-events-none absolute inset-0 animate-sweep" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <p data-logo-anchor className="animate-rise font-display text-sm font-semibold tracking-[0.35em] text-brand-soft uppercase [animation-delay:150ms]">
          Silay City · Negros Occidental
        </p>
        <h1 className="mt-3 animate-rise font-display text-[clamp(2.1rem,10.4vw,3rem)] leading-[0.95] font-bold uppercase sm:text-7xl lg:text-8xl [animation-delay:300ms]">
          Drive Home
          <br />
          <span className="text-brand">Your Dream Ride</span>
        </h1>
        <div className="mt-8 flex animate-rise flex-col gap-3 sm:flex-row [animation-delay:450ms]">
          <a
            href="#units"
            className="rounded-full bg-brand px-8 py-4 text-center font-display text-black text-base font-bold tracking-[0.15em] uppercase shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-soft"
          >
            Browse Units
          </a>
          <a
            href="#sold"
            className="rounded-full border border-white/30 px-8 py-4 text-center font-display text-base font-bold tracking-[0.15em] uppercase transition hover:border-white hover:bg-white/10"
          >
            See Sold Cars
          </a>
        </div>
      </div>

      <a
        href="#units"
        aria-label="Scroll to units"
        className="absolute bottom-6 left-1/2 hidden h-10 w-6 -translate-x-1/2 justify-center rounded-full border-2 border-white/40 pt-2 sm:flex"
      >
        <span className="size-1.5 animate-scroll-dot rounded-full bg-white" />
      </a>
    </section>
  );
}
