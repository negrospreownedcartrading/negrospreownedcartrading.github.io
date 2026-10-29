"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import AnimatedLogo from "./AnimatedLogo";
import { MessengerIcon, PhoneIcon } from "./icons";

const links = [
  { href: "#units", label: "Units", hint: "Browse available cars" },
  { href: "#sold", label: "Sold", hint: "Happy owners, real deals" },
  { href: "#reviews", label: "Reviews", hint: "What our clients say" },
];

const menuLinks = [...links, { href: "#contact", label: "Contact", hint: `Call or message ${site.contactName}` }];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // A big centered logo in the banner that glides into the header slot as you scroll
  const [floating, setFloating] = useState(false);
  const slotRef = useRef<HTMLAnchorElement>(null);
  const floatRef = useRef<HTMLAnchorElement>(null);

  // Turned on after the page loads (all screen sizes), so the first render matches the server
  useEffect(() => setFloating(true), []);

  useEffect(() => {
    const el = floatRef.current;
    const slot = slotRef.current;
    if (!floating || !el || !slot) return;
    let raf = 0;
    const frame = () => {
      raf = 0;
      const end = slot.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const startW = Math.min(vw * 0.8, 520);
      const startH = (startW * 145) / 450;
      // Start position: left-aligned, sitting just above the "Silay City · Negros Occidental" line.
      // offsetTop/Left (not getBoundingClientRect) so the text's entrance animation doesn't shift it.
      let ax = (vw - startW) / 2;
      let ay = vh * 0.3;
      const anchor = document.querySelector<HTMLElement>("[data-logo-anchor]");
      if (anchor) {
        ax = 0;
        ay = 0;
        for (let n: HTMLElement | null = anchor; n; n = n.offsetParent as HTMLElement | null) {
          ax += n.offsetLeft;
          ay += n.offsetTop;
        }
      }
      const startX = ax;
      const startY = ay - startH - 12;
      // 0 at the top of the page → 1 once scrolled ~90% of a screen (or menu open)
      const p = open ? 1 : Math.min(1, Math.max(0, window.scrollY / (vh * 0.9)));
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const x = startX + (end.left - startX) * e;
      const y = startY + (end.top - startY) * e;
      const w = startW + (end.width - startW) * e;
      el.style.width = `${startW}px`;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${w / startW})`;
      el.style.filter = `drop-shadow(0 0 ${28 * (1 - e)}px rgba(242,193,3,${0.35 * (1 - e)}))`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    frame();
    // After placing it, ease every move so the logo glides behind the scroll instead of
    // snapping (set after the first frame so it doesn't fly in from the corner on load)
    const easeIn = requestAnimationFrame(() => {
      el.style.transition = "transform 0.9s cubic-bezier(0.22, 0.8, 0.25, 1), filter 0.9s ease";
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(easeIn);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [floating, open]);

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

  // Close the menu first, then scroll once the scroll lock is released
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", href);
    }, 60);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          open
            ? "bg-ink py-3"
            : scrolled
              ? "bg-ink/85 py-3 shadow-lg shadow-black/40 backdrop-blur-md"
              : floating
                ? "bg-transparent py-3"
                : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Header logo. While the big floating logo is active it stays invisible and
              just marks the spot the floating logo lands on. */}
          <a
            ref={slotRef}
            href="#top"
            aria-label="Negros Preowned Car Trading home"
            aria-hidden={floating}
            tabIndex={floating ? -1 : undefined}
            onClick={() => setOpen(false)}
            className={floating ? "invisible" : ""}
          >
            <Image
              src="/brand/logo-wide.png"
              alt="Negros Preowned Car Trading"
              width={450}
              height={145}
              priority
              className={`w-auto transition-all duration-300 ${floating || scrolled || open ? "h-10" : "h-12"}`}
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
              className="rounded-full bg-brand px-5 py-2 font-display text-sm font-bold tracking-[0.15em] text-black uppercase transition hover:bg-brand-soft"
            >
              Contact
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className={`relative grid size-11 place-items-center rounded-full transition md:hidden ${
              open ? "bg-brand text-black" : "text-white"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`absolute h-0.5 w-5 bg-current transition ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute h-0.5 w-5 bg-current transition ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </header>

      {floating && (
        <a
          ref={floatRef}
          href="#top"
          aria-label="Negros Preowned Car Trading home"
          onClick={() => setOpen(false)}
          className="fixed top-0 left-0 z-[51] origin-top-left will-change-transform"
        >
          <div className="animate-logo-in">
            <AnimatedLogo priority />
          </div>
        </a>
      )}

      {/* Mobile menu — outside the header so it covers the whole screen (the header's
          blur effect would otherwise shrink a fixed child to the header strip) */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[45] flex flex-col bg-ink px-4 pt-20 pb-8 transition-all duration-300 md:hidden ${
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(242,193,3,0.12),transparent_55%)]" />

        <nav className="relative flex-1">
          {menuLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => goTo(e, l.href)}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
              className={`group flex items-center gap-4 border-b border-white/10 py-5 transition-all duration-300 active:bg-white/5 ${
                open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
              }`}
            >
              <span className="w-7 font-display text-sm font-bold text-brand">0{i + 1}</span>
              <span className="flex-1">
                <span className="block font-display text-3xl leading-none font-bold tracking-wide text-white uppercase group-active:text-brand">
                  {l.label}
                </span>
                <span className="mt-1 block text-sm text-white/60">{l.hint}</span>
              </span>
              <span className="text-2xl text-brand transition group-active:translate-x-1">→</span>
            </a>
          ))}
        </nav>

        {/* Quick contact */}
        <div
          className={`relative grid grid-cols-2 gap-3 transition-all delay-300 duration-300 ${
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <a
            href={`tel:${site.phone}`}
            className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 font-display text-sm font-bold tracking-[0.15em] uppercase"
          >
            <PhoneIcon /> Call
          </a>
          <a
            href={site.messenger}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand font-display text-sm font-bold tracking-[0.15em] text-black uppercase"
          >
            <MessengerIcon /> Message
          </a>
          <p className="col-span-2 mt-1 text-center text-xs text-white/50">
            {site.contactName} · {site.phoneDisplay} · Silay City
          </p>
        </div>
      </div>
    </>
  );
}
