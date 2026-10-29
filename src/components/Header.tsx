"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "#units", label: "Units" },
  { href: "#sold", label: "Sold" },
  { href: "#reviews", label: "Reviews" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-ink/85 py-3 shadow-lg shadow-black/40 backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" aria-label="Negros Preowned Car Trading home">
          <Image
            src="/brand/logo-wide.png"
            alt="Negros Preowned Car Trading"
            width={450}
            height={145}
            priority
            className={`w-auto transition-all duration-300 ${scrolled || open ? "h-10" : "h-12"}`}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-sm font-semibold tracking-[0.2em] text-white/80 uppercase transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-brand px-5 py-2 font-display text-black text-sm font-bold tracking-[0.15em] uppercase transition hover:bg-brand-soft"
          >
            Contact
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="relative grid size-11 place-items-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`absolute h-0.5 w-6 bg-white transition ${open ? "rotate-45" : "-translate-y-2"}`}
          />
          <span className={`absolute h-0.5 w-6 bg-white transition ${open ? "opacity-0" : ""}`} />
          <span
            className={`absolute h-0.5 w-6 bg-white transition ${open ? "-rotate-45" : "translate-y-2"}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <nav
        className={`fixed inset-x-0 top-16 bottom-0 flex flex-col gap-2 bg-ink px-4 pt-6 transition-all duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible -translate-y-4 opacity-0"
        }`}
      >
        {[...links, { href: "#contact", label: "Contact" }].map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
            className={`border-b border-line py-4 font-display text-3xl font-bold tracking-wide uppercase transition-all duration-300 ${
              open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
            }`}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
