import Image from "next/image";

// The logo with its car animated: the car races in from the left, screeches to a stop
// (nose dip + tire smoke), parks ~5s, then races off to the right — on repeat.
// Built from two layers cut from logo-wide.png: the logo without the car, and the car.
// The car only shows inside the icon area (left 29.4% of the logo), so it never crosses the text.
// Clipping uses overflow-hidden (not clip-path) and no filters on ancestors, because
// mobile Safari can stop repainting moving content inside clip-path/filter elements.
export default function AnimatedLogo({ priority = false }: { priority?: boolean }) {
  return (
    <div className="relative aspect-[450/145] w-full">
      <Image
        src="/brand/logo-base.png"
        alt="Negros Preowned Car Trading"
        fill
        priority={priority}
        sizes="520px"
        className="object-contain"
      />
      {/* Icon-area window (29.4% wide) */}
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-[29.4%] overflow-hidden">
        {/* Full-logo-width layer so the car keeps its exact position inside the window */}
        <div className="absolute inset-y-0 left-0 w-[340.14%]">
          {/* Tire smoke from the rear wheel at the screech */}
          {[0, 0.12, 0.24].map((delay, i) => (
            <span
              key={i}
              className="car-anim absolute size-[7%] animate-car-smoke rounded-full bg-white/70"
              style={{ left: `${5 + i * 2}%`, top: `${52 + (i % 2) * 6}%`, animationDelay: `${delay}s` }}
            />
          ))}
          <Image
            src="/brand/logo-car.png"
            alt=""
            fill
            priority={priority}
            sizes="520px"
            className="car-anim animate-car-drive origin-[23%_72%] object-contain will-change-transform"
          />
        </div>
      </div>
    </div>
  );
}
