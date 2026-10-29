"use client";

import Image from "next/image";
import { useState } from "react";
import { units } from "@/data/units";

// A car photo shows only inside the moving light beam; each pass reveals the next unit.
// The masked layer is full-size like the glow layer so both beams line up exactly.
export default function HeroReveal() {
  const [i, setI] = useState(0);

  return (
    <div
      aria-hidden="true"
      className="sweep-mask absolute inset-0 animate-sweep opacity-75"
      // The beam is off-screen at the loop point, so swapping cars here is invisible
      onAnimationIteration={() => setI((n) => (n + 1) % units.length)}
    >
      {/* On desktop the car sits on the right, away from the headline; its left edge fades out */}
      <div className="absolute inset-0 lg:left-[35%] lg:[-webkit-mask-image:linear-gradient(to_right,transparent,black_40%)] lg:[mask-image:linear-gradient(to_right,transparent,black_40%)]">
        {units.map((u, n) => (
          <Image
            key={u.id}
            src={u.photos[0]}
            alt=""
            fill
            priority={n === 0}
            sizes="(min-width: 1024px) 65vw, 100vw"
            className={`object-cover object-[50%_65%] ${n === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
    </div>
  );
}
