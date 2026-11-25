"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SYSTEMS } from "@/components/obsidian/data";
import { useRevealAll } from "@/components/obsidian/primitives";

const CONTACT = "mailto:depupdev@gmail.com";

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Approach", href: "#approach" },
  { label: "Notes", href: "#notes" },
];

const FACTS = [
  { value: String(SYSTEMS.length), label: "Systems built and run in-house" },
  { value: "4", label: "Platforms: Cloud, Web, Android, Windows" },
  { value: "1", label: "Accountable owner per engagement" },
];

const CAPABILITIES = [
  {
    tag: "01 / Build",
    title: "Product engineering",
    body: "Native Android in Kotlin, Windows on .NET 8, web on Next.js and desktop shells on Tauri — shipped to the store, not left in a repo.",
  },
  {
    tag: "02 / Connect",
    title: "Cloud & AI infrastructure",
    body: "Remote MCP gateways and model routing that keep credentials in one vault and fail over predictably when a provider goes down.",
  },
  {
    tag: "03 / Protect",
    title: "Security review",
    body: "Passive, owner-led audits: GET-only, same-origin, with a hard request ceiling. Findings arrive as evidence for you to judge.",
  },
];

const STEPS = [
  { title: "Scope", body: "A written brief with the decision, the constraints and what “done” means — before any code." },
  { title: "Build in the open", body: "Working builds you can run every week. Progress is something you click, not a status slide." },
  { title: "Ship & hand over", body: "Released to your store, server or domain, with source, docs and credentials in your name." },
];

const NOTES = [
  {
    meta: "Infrastructure · November",
    title: "A clearer path between tools and teams",
    body: "Why every agent shouldn’t hold its own keys, and what a brokered gateway changes.",
    href: "/cloud",
  },
  {
    meta: "Security · November",
    title: "Security reviews built for careful decisions",
    body: "A scan that can’t write, can’t leave the origin and stops at a ceiling is one an owner can run without worry.",
    href: "/sentinel",
  },
  {
    meta: "Productivity · October",
    title: "Document work that follows you",
    body: "Capture on the phone, continue on Windows — no cloud step in between.",
    href: "/office",
  },
];

const eyebrow = "font-obs-mono text-[12px] uppercase tracking-[0.08em]";
const h2 = "font-display text-[clamp(32px,4.2vw,54px)] font-semibold leading-[1.06] tracking-[-0.03em]";

function StudioNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled ? "border-b border-[#E4E4E0] bg-[#FAFAF8]/85 backdrop-blur-xl" : "border-b border-transparent bg-[#FAFAF8]"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-6 md:px-8">
        <a href="#top" className="flex items-center gap-2.5 font-display text-[17px] font-semibold tracking-[-0.01em]">
          <span aria-hidden className="h-[22px] w-[22px] rounded-[6px] bg-[#0B0B0C]" />
          Depup Studio
        </a>
        <div className="hidden items-center gap-8 text-[14px] text-[#3C3C42] md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="transition-colors hover:text-[#0B0B0C]">
              {n.label}
            </a>
          ))}
          <a
            href={CONTACT}
            className="rounded-full bg-[#0B0B0C] px-4 py-2.5 font-medium text-[#FAFAF8] transition-opacity hover:opacity-85"
          >
            Start a project
          </a>
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-full md:hidden"
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 h-[1.5px] w-5 bg-[#0B0B0C] transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-[1.5px] w-5 bg-[#0B0B0C] transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </nav>
      {open && (
        <div className="border-t border-[#E4E4E0] bg-[#FAFAF8] px-6 pb-8 pt-4 md:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block border-b border-[#E4E4E0] py-4 font-display text-[24px] font-semibold tracking-[-0.02em]"
            >
              {n.label}
            </a>
          ))}
          <a href={CONTACT} className="mt-6 inline-flex rounded-full bg-[#0B0B0C] px-5 py-3 text-[15px] font-medium text-[#FAFAF8]">
            Start a project
          </a>
        </div>
      )}
    </header>
  );
}

export function StudioHome() {
  useRevealAll(".studio-root");
  const [featured, ...rest] = SYSTEMS;

  return (
    <div className="studio-root min-h-screen bg-[#FAFAF8] font-sans text-[#0B0B0C] antialiased selection:bg-[#0B0B0C] selection:text-[#FAFAF8]">
      <StudioNav />
      <main>
        {/* Hero */}
        <section id="top" className="mx-auto max-w-[1200px] px-6 pb-24 pt-24 md:px-8 md:pb-28 md:pt-32">
          <p className={`${eyebrow} obs-reveal mb-7 text-[#5C5C62]`}>Independent engineering studio · Founder-led</p>
          <h1
            className="obs-reveal max-w-[1040px] font-display text-[clamp(44px,7vw,96px)] font-semibold leading-[1.02] tracking-[-0.035em]"
            style={{ "--d": "80ms" } as React.CSSProperties}
          >
            We design and build the systems behind serious products.
          </h1>
          <p
            className="obs-reveal mt-9 max-w-[640px] text-[19px] leading-[1.6] text-[#3C3C42] md:text-[20px]"
            style={{ "--d": "160ms" } as React.CSSProperties}
          >
            Depup Studio ships software end to end — cloud infrastructure, security tooling, desktop and mobile apps. The
            founder stays on every engagement, from the first call to the release.
          </p>
          <div className="obs-reveal mt-11 flex flex-wrap gap-3" style={{ "--d": "240ms" } as React.CSSProperties}>
            <a
              href={CONTACT}
              className="group inline-flex items-center gap-2 rounded-full bg-[#0B0B0C] px-6 py-3.5 text-[15px] font-medium text-[#FAFAF8] transition-opacity hover:opacity-85"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center rounded-full border border-[#CFCFCA] px-6 py-3.5 text-[15px] font-medium transition-colors hover:border-[#0B0B0C]"
            >
              See the work
            </a>
          </div>
        </section>

        {/* Facts */}
        <section className="border-y border-[#E4E4E0]">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 px-6 sm:grid-cols-3 md:px-8">
            {FACTS.map((f, i) => (
              <div
                key={f.label}
                className={`py-8 ${i > 0 ? "border-t border-[#E4E4E0] sm:border-l sm:border-t-0 sm:pl-6" : "sm:pr-6"}`}
              >
                <div className="font-display text-[36px] font-semibold tracking-[-0.02em]">{f.value}</div>
                <div className="mt-1.5 text-[14px] text-[#5C5C62]">{f.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="mx-auto max-w-[1200px] scroll-mt-16 px-6 py-24 md:px-8 md:py-32">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
            <h2 className={`${h2} obs-reveal max-w-[620px]`}>Three disciplines, one team that owns the result.</h2>
            <p className="obs-reveal max-w-[380px] text-[16px] leading-[1.6] text-[#5C5C62]">
              Every capability below is something we run for ourselves first. Clients get what has already held up in
              production.
            </p>
          </div>
          <div className="obs-reveal grid gap-px overflow-hidden rounded-[20px] border border-[#E4E4E0] bg-[#E4E4E0] md:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <div key={c.tag} className="flex flex-col gap-4 bg-white px-8 pb-11 pt-10 transition-colors hover:bg-[#FCFCFA]">
                <span className={`${eyebrow} text-[#5C5C62]`}>{c.tag}</span>
                <h3 className="font-display text-[26px] font-semibold tracking-[-0.02em]">{c.title}</h3>
                <p className="text-[15px] leading-[1.6] text-[#3C3C42]">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Work */}
        <section id="work" className="scroll-mt-16 bg-[#0B0B0C] text-[#F2F2EF]">
          <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32">
            <p className={`${eyebrow} obs-reveal mb-5 text-[#A1A1A6]`}>Selected work</p>
            <h2 className={`${h2} obs-reveal mb-14 max-w-[760px]`}>Built, shipped and maintained by the studio.</h2>

            <Link
              href={featured.href ?? "#work"}
              className="obs-reveal group mb-12 grid gap-10 rounded-[20px] border border-[#2A2A2E] bg-[#141416] p-8 transition-colors hover:border-[#3A3A3F] md:grid-cols-2 md:p-11"
            >
              <div className="flex flex-col gap-4">
                <span className="font-obs-mono text-[12px] uppercase tracking-[0.08em] text-[#8FB0FF]">Featured · Cloud</span>
                <h3 className="font-display text-[40px] font-semibold tracking-[-0.025em]">{featured.name}</h3>
                <p className="max-w-[460px] text-[17px] leading-[1.6] text-[#C7C7CC]">{featured.detail}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-[15px] font-medium">
                  Explore {featured.name}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              <dl className="grid grid-cols-2 gap-px self-center overflow-hidden rounded-[14px] bg-[#2A2A2E]">
                {featured.specs.slice(0, 4).map(([k, v]) => (
                  <div key={k} className="bg-[#141416] p-5">
                    <dt className="text-[13px] text-[#A1A1A6]">{k}</dt>
                    <dd className="mt-1.5 text-[17px]">{v}</dd>
                  </div>
                ))}
              </dl>
            </Link>

            <ul className="border-t border-[#2A2A2E]">
              {rest.map((s) => {
                const inner = (
                  <>
                    <span className="font-obs-mono text-[13px] text-[#8A8A90]">{s.num}</span>
                    <span className="font-display text-[22px] font-semibold tracking-[-0.015em]">{s.name}</span>
                    <span className="text-[15px] leading-[1.55] text-[#C7C7CC]">{s.description}</span>
                    <span className="flex items-center justify-between gap-3 font-obs-mono text-[12px] uppercase text-[#A1A1A6] md:justify-end">
                      {s.tags.slice(0, 2).join(" · ")}
                      {s.href && (
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-[#F2F2EF] opacity-0 transition-opacity group-hover:opacity-100" />
                      )}
                    </span>
                  </>
                );
                const cls =
                  "group grid gap-2 py-6 md:grid-cols-[56px_minmax(180px,1.1fr)_minmax(0,2fr)_minmax(160px,1fr)] md:items-baseline md:gap-6 md:py-7";
                return (
                  <li key={s.id} className="obs-reveal border-b border-[#2A2A2E]">
                    {s.href ? (
                      <Link href={s.href} className={`${cls} transition-colors hover:bg-white/[0.03]`}>
                        {inner}
                      </Link>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Approach */}
        <section id="approach" className="mx-auto max-w-[1200px] scroll-mt-16 px-6 py-24 md:px-8 md:py-32">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <p className={`${eyebrow} obs-reveal mb-5 text-[#5C5C62]`}>How we work</p>
              <h2 className={`${h2} obs-reveal`}>Small team. Clear scope. Nothing handed off.</h2>
              <p className="obs-reveal mt-7 max-w-[460px] text-[17px] leading-[1.6] text-[#3C3C42]">
                You talk to the person writing the architecture. No account managers, no hand-off to a team you never met.
              </p>
            </div>
            <ol className="border-b border-[#E4E4E0]">
              {STEPS.map((s, i) => (
                <li key={s.title} className="obs-reveal flex gap-7 border-t border-[#E4E4E0] py-7">
                  <span className="min-w-7 font-obs-mono text-[13px] text-[#2B5CE6]">0{i + 1}</span>
                  <div>
                    <h3 className="mb-2 text-[19px] font-semibold">{s.title}</h3>
                    <p className="text-[15px] leading-[1.6] text-[#5C5C62]">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Statement */}
        <section className="border-y border-[#E4E4E0] bg-[#F1F1EC]">
          <div className="mx-auto max-w-[900px] px-6 py-24 text-center md:px-8 md:py-32">
            <p className={`${eyebrow} obs-reveal mb-8 text-[#5C5C62]`}>Our position</p>
            <p className="obs-reveal font-display text-[clamp(26px,3vw,38px)] font-medium leading-[1.3] tracking-[-0.02em]">
              Software built the careful way — bounded by default, local-first where it matters, and owned by the people
              who use it.
            </p>
            <p className="obs-reveal mt-8 text-[15px] text-[#5C5C62]">— Depup Studio</p>
          </div>
        </section>

        {/* Notes */}
        <section id="notes" className="mx-auto max-w-[1200px] scroll-mt-16 px-6 py-24 md:px-8 md:py-32">
          <h2 className={`${h2} obs-reveal mb-12`}>Field notes</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {NOTES.map((n) => (
              <Link
                key={n.title}
                href={n.href}
                className="obs-reveal group flex flex-col gap-3.5 border-t border-[#0B0B0C] pt-6"
              >
                <span className={`${eyebrow} text-[#5C5C62]`}>{n.meta}</span>
                <h3 className="text-[22px] font-semibold leading-[1.3] tracking-[-0.015em] underline-offset-4 group-hover:underline">
                  {n.title}
                </h3>
                <p className="text-[15px] leading-[1.6] text-[#5C5C62]">{n.body}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-16 bg-[#0B0B0C] text-[#F2F2EF]">
          <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-8 px-6 py-28 md:px-8 md:py-36">
            <h2 className="obs-reveal max-w-[900px] font-display text-[clamp(40px,6vw,80px)] font-semibold leading-[1.02] tracking-[-0.035em]">
              Have a system worth building properly?
            </h2>
            <p className="obs-reveal max-w-[560px] text-[19px] leading-[1.55] text-[#C7C7CC]">
              Tell us what you’re trying to ship. The founder replies to every brief personally.
            </p>
            <a
              href={CONTACT}
              className="obs-reveal group inline-flex items-center gap-2 rounded-full bg-[#F2F2EF] px-6 py-3.5 text-[15px] font-medium text-[#0B0B0C] transition-opacity hover:opacity-90"
            >
              depupdev@gmail.com
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 pb-12 pt-14 md:px-8">
        <div className="grid grid-cols-2 gap-8 text-[14px] md:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-2.5 md:col-span-1">
            <span className="font-display text-[17px] font-semibold">Depup Studio</span>
            <span className="leading-[1.55] text-[#5C5C62]">Founder-led engineering studio.</span>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="font-semibold">Products</span>
            <Link href="/cloud" className="text-[#5C5C62] hover:text-[#0B0B0C]">depup.cloud</Link>
            <Link href="/office" className="text-[#5C5C62] hover:text-[#0B0B0C]">depup Office</Link>
            <Link href="/sentinel" className="text-[#5C5C62] hover:text-[#0B0B0C]">Sentinel-ID</Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="font-semibold">Studio</span>
            <a href="#approach" className="text-[#5C5C62] hover:text-[#0B0B0C]">Approach</a>
            <a href="#notes" className="text-[#5C5C62] hover:text-[#0B0B0C]">Field notes</a>
            <a href={CONTACT} className="text-[#5C5C62] hover:text-[#0B0B0C]">Contact</a>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="font-semibold">Legal</span>
            <Link href="/privacy" className="text-[#5C5C62] hover:text-[#0B0B0C]">Privacy</Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-[#E4E4E0] pt-6 text-[13px] text-[#5C5C62]">
          <span>© 2026 Depup Studio</span>
          <span>depupstudio.com</span>
        </div>
      </footer>
    </div>
  );
}
