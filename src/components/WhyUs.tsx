import { perks } from "@/data/site";
import Reveal from "./Reveal";
import { FinancingArt, HandoverArt, LtoArt, MechanicArt } from "./WhyUsArt";

const art = [MechanicArt, LtoArt, FinancingArt, HandoverArt];

// One full screen: 2x2 on phones, 4 across on desktop. Each card has a looping illustration.
export default function WhyUs() {
  return (
    <section
      aria-label="Why choose us"
      className="flex min-h-[100svh] snap-start flex-col justify-center border-t border-line bg-panel/40 pt-20 pb-8 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center sm:text-left">
          <p className="font-display text-sm font-semibold tracking-[0.35em] text-brand uppercase">Why Us</p>
          <h2 className="mt-2 font-display text-4xl leading-none font-bold uppercase sm:text-6xl">
            Buy With <span className="text-brand">Peace of Mind</span>
          </h2>
        </Reveal>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4">
          {perks.map((p, i) => {
            const Art = art[i];
            return (
              <Reveal key={p.title} delay={i * 120} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-ink p-3 transition duration-300 hover:-translate-y-1 hover:border-brand/60 sm:p-5">
                  <span className="absolute top-2 right-3 font-display text-2xl font-bold text-transparent [-webkit-text-stroke:1px_var(--color-brand)] sm:text-4xl">
                    0{i + 1}
                  </span>
                  <div className="h-24 rounded-xl bg-[radial-gradient(ellipse_at_center,rgba(242,193,3,0.08),transparent_70%)] sm:h-36">
                    <Art />
                  </div>
                  <h3 className="mt-3 font-display text-base leading-tight font-bold uppercase sm:mt-4 sm:text-xl">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-xs leading-snug text-white/70 sm:mt-2 sm:text-sm sm:leading-relaxed">{p.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
