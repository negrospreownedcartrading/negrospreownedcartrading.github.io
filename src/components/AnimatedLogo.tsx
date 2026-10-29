import Image from "next/image";

// The logo with its car animated: the car races in from the left, screeches to a stop
// (nose dip + tire smoke), parks for ~15s, then races off to the right — on repeat.
// Built from two layers cut from logo-wide.png: the logo without the car, and the car.
// The car only shows inside the icon area (left 29% of the logo), so it never crosses the text.
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
      <div aria-hidden="true" className="absolute inset-0 [clip-path:inset(0_70.6%_0_0)]">
        {/* Tire smoke from the rear wheel at the screech */}
        {[0, 0.12, 0.24].map((delay, i) => (
          <span
            key={i}
            className="car-anim absolute size-[7%] animate-car-smoke rounded-full bg-white/70 blur-[2px]"
            style={{ left: `${5 + i * 2}%`, top: `${52 + (i % 2) * 6}%`, animationDelay: `${delay}s` }}
          />
        ))}
        <Image
          src="/brand/logo-car.png"
          alt=""
          fill
          priority={priority}
          sizes="520px"
          className="car-anim animate-car-drive origin-[23%_72%] object-contain"
        />
      </div>
    </div>
  );
}
