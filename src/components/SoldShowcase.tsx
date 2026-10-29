import Image from "next/image";
import { sold } from "@/data/sold";
import { stats } from "@/data/site";
import CountUp from "./CountUp";
import Reveal from "./Reveal";

export default function SoldShowcase() {
  return (
    <section id="sold" aria-label="Sold units" className="snap-start border-t border-line bg-panel/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="font-display text-sm font-semibold tracking-[0.35em] text-brand uppercase">
            Sold Showcase
          </p>
          <h2 className="mt-2 font-display text-4xl leading-none font-bold uppercase sm:text-6xl">
            Happy Owners, <span className="text-brand">Real Deals</span>
          </h2>
          <p className="mt-4 max-w-xl text-white/70">
            Every photo is a real hand-over — clients from Silay, Bacolod, Sagay, Iloilo and even OFWs who bought
            without seeing the unit.
          </p>
        </Reveal>

        {/* Stats */}
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink px-4 py-6 text-center">
              <dd className="font-display text-4xl font-bold text-brand sm:text-5xl">
                <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </dd>
              <dt className="mt-1 font-display text-xs tracking-[0.2em] text-white/60 uppercase">{s.label}</dt>
            </div>
          ))}
        </dl>

        {/* Photo grid */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {sold.map((s, i) => (
            <Reveal key={s.photo} delay={(i % 4) * 80}>
              <figure className="skeleton group relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={s.photo}
                  alt={`${s.car} sold${s.location ? ` to client from ${s.location}` : ""}`}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                <span className="absolute top-3 right-3 rotate-6 rounded-sm border-2 border-brand px-2 py-0.5 font-display text-xs font-bold tracking-[0.25em] text-brand uppercase backdrop-blur-sm sm:text-sm">
                  Sold
                </span>
                <figcaption className="absolute inset-x-0 bottom-0 p-3 transition duration-500 sm:translate-y-2 sm:group-hover:translate-y-0">
                  <p className="font-display text-base leading-tight font-bold uppercase sm:text-lg">{s.car}</p>
                  {s.location && <p className="text-xs text-white/70">{s.location}</p>}
                  {s.note && (
                    <p className="mt-1 text-xs text-brand sm:opacity-0 sm:transition sm:group-hover:opacity-100">
                      {s.note}
                    </p>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
