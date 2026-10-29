import { perks } from "@/data/site";
import Reveal from "./Reveal";

export default function WhyUs() {
  return (
    <section aria-label="Why choose us" className="snap-start border-t border-line bg-panel/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="font-display text-sm font-semibold tracking-[0.35em] text-brand uppercase">Why Us</p>
          <h2 className="mt-2 font-display text-4xl leading-none font-bold uppercase sm:text-6xl">
            Buy With <span className="text-brand">Peace of Mind</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="group h-full rounded-2xl border border-line bg-ink p-6 transition duration-300 hover:-translate-y-1 hover:border-brand/60">
                <span className="font-display text-5xl font-bold text-transparent [-webkit-text-stroke:1px_var(--color-brand)]">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold uppercase">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
