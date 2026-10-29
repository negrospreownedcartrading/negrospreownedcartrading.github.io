import Image from "next/image";
import { site, smsLink } from "@/data/site";
import { MessengerIcon, PhoneIcon, PinIcon, SmsIcon } from "./icons";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <>
      <section id="contact" aria-label="Contact" className="relative snap-start overflow-hidden border-t border-line py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(242,193,3,0.18),transparent_60%)]" />
        <Reveal className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="font-display text-sm font-semibold tracking-[0.35em] text-brand uppercase">Contact Us</p>
          <h2 className="mt-2 font-display text-4xl leading-none font-bold uppercase sm:text-6xl">
            Ready For Your <span className="text-brand">Next Ride?</span>
          </h2>
          <p className="mt-4 text-white/70">
            Schedule a test drive and bring your best mechanic. Message {site.contactName} anytime — we reply fast.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={site.messenger}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-brand px-8 font-display text-lg font-bold tracking-[0.12em] text-black uppercase shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-soft"
            >
              <MessengerIcon className="size-6" /> Messenger
            </a>
            <a
              href={`tel:${site.phone}`}
              className="flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/30 px-8 font-display text-lg font-bold tracking-[0.12em] uppercase transition hover:border-white hover:bg-white/10"
            >
              <PhoneIcon /> Call
            </a>
            <a
              href={smsLink()}
              className="flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/30 px-8 font-display text-lg font-bold tracking-[0.12em] uppercase transition hover:border-white hover:bg-white/10"
            >
              <SmsIcon /> Text
            </a>
          </div>

          <div className="mt-8 flex flex-col items-center gap-2 text-sm text-white/70">
            <p className="font-display text-lg font-bold tracking-wider text-white">
              {site.contactName} · {site.phoneDisplay}
            </p>
            <p className="flex items-center gap-1.5">
              <PinIcon className="size-4 text-brand" /> {site.address}
            </p>
          </div>
        </Reveal>
      </section>

      <footer className="snap-end border-t border-line py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
          <Image src="/brand/logo-wide.png" alt={site.name} width={180} height={58} className="h-12 w-auto" />
          <p className="text-xs text-white/50">
            {site.tagline}
            <br />
            Financing partner: {site.financingPartner} · © {new Date().getFullYear()} {site.name}
          </p>
          <a
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-sm font-bold tracking-[0.2em] text-brand uppercase hover:underline"
          >
            Facebook Page →
          </a>
        </div>

        {/* Developer credit */}
        <div className="mx-auto mt-8 max-w-7xl border-t border-line px-4 pt-6 text-center sm:px-6">
          <a
            href="https://jstudio11sys.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.15em] text-white/40 uppercase transition hover:text-brand"
          >
            Developed by JStudio11sys
          </a>
        </div>
      </footer>

      {/* Mobile quick contact */}
      <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3 md:hidden">
        <a
          href={`tel:${site.phone}`}
          aria-label={`Call ${site.contactName}`}
          className="grid size-14 place-items-center rounded-full border border-white/20 bg-black/80 shadow-lg backdrop-blur"
        >
          <PhoneIcon className="size-6" />
        </a>
        <a
          href={site.messenger}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message us on Messenger"
          className="grid size-14 place-items-center rounded-full bg-brand text-black shadow-lg shadow-brand/40"
        >
          <MessengerIcon className="size-7" />
        </a>
      </div>
    </>
  );
}
