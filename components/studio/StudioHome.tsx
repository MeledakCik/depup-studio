"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, Plus } from "lucide-react";
import { ACCENT_HEX, CATEGORIES, NOTES, PRINCIPLES, SYSTEMS, UPDATES, type Category } from "@/components/obsidian/data";
import "./studio.css";

const CONTACT = "mailto:depupdev@gmail.com";
const EASE_DELAY = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/* ---------- helpers ---------- */

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Internal links that pointed at the old system modal now land on the ecosystem grid. */
const safeHref = (href?: string) => {
  if (!href) return "#ecosystem";
  if (href.startsWith("#system")) return "#ecosystem";
  return href;
};
const isExternal = (href: string) => href.startsWith("http");
const hrefForSystem = (id: string) => safeHref(SYSTEMS.find((s) => s.id === id)?.href);

function SmartLink({
  href,
  className,
  children,
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
  "aria-label"?: string;
}) {
  if (isExternal(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  if (href.startsWith("#") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

function useReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".st-root .st-reveal:not(.is-in)"));
    if (reduced() || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -60px 0px", threshold: 0.1 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Words({ text, start = 0, step = 70 }: { text: string; start?: number; step?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="st-word" style={EASE_DELAY(start + i * step)}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

const eyebrow = "font-obs-mono text-[12px] uppercase tracking-[0.1em]";
const h2 = "font-display text-[clamp(36px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.035em]";
const wrap = "mx-auto max-w-[1240px] px-6 md:px-10";

/* ---------- nav ---------- */

const NAV = [
  { label: "Spotlight", href: "#spotlight" },
  { label: "depup Office", href: "/office" },
  { label: "Updates", href: "#updates" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Engineering", href: "#engineering" },
  { label: "Mission", href: "#mission" },
];

function StudioNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("spotlight");
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const ids = ["spotlight", "ecosystem", "engineering", "updates", "notes", "mission"];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open ? "border-b border-black/[0.06] bg-[#FAFAF8]/80 backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent"
      }`}
    >
      <nav className={`${wrap} flex h-14 items-center justify-between gap-6`}>
        <a href="#spotlight" className="flex items-center gap-2.5 font-display text-[16px] font-semibold tracking-[-0.01em]">
          <span aria-hidden className="grid h-7 w-7 place-items-center rounded-[8px] bg-[#0B0B0C] text-[13px] text-[#FAFAF8]">
            D
          </span>
          Depup Studio
        </a>
        <div className="hidden items-center gap-7 text-[13px] lg:flex">
          {NAV.map((n) => {
            const on = n.href === `#${active}`;
            return (
              <SmartLink
                key={n.href}
                href={n.href}
                className={`relative py-1 transition-colors duration-300 ${on ? "text-[#0B0B0C]" : "text-[#5C5C62] hover:text-[#0B0B0C]"}`}
              >
                {n.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-[#0B0B0C] transition-transform duration-500 ${on ? "scale-x-100" : "scale-x-0"}`}
                />
              </SmartLink>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://depup.cloud"
            target="_blank"
            rel="noreferrer"
            className="group hidden items-center gap-1.5 rounded-full bg-[#0B0B0C] px-4 py-2 text-[13px] font-medium text-[#FAFAF8] transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
          >
            Launch Cloud
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-[1.5px] w-5 bg-[#0B0B0C] transition-all duration-500 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-5 bg-[#0B0B0C] transition-all duration-500 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px">
        <div ref={barRef} className="h-full origin-left bg-[#0B0B0C]/60" style={{ transform: "scaleX(0)" }} />
      </div>
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-700 lg:hidden ${open ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0"}`}
        style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
      >
        <div className={`${wrap} flex min-h-[calc(100vh-56px)] flex-col bg-[#FAFAF8] pb-10 pt-4`}>
          {NAV.map((n, i) => (
            <SmartLink
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
              className={`border-b border-black/[0.06] py-4 font-display text-[28px] font-semibold tracking-[-0.02em] transition-all duration-700 ${
                open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
              }`}
            >
              {n.label}
            </SmartLink>
          ))}
          <a href="https://depup.cloud" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#0B0B0C] px-5 py-3 text-[15px] font-medium text-[#FAFAF8]">
            Launch Cloud <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- spotlight (hero + product stories) ---------- */

const byId = (id: string) => SYSTEMS.find((s) => s.id === id)!;

const STORIES = [
  {
    key: "Studio",
    label: "Depup Studio",
    title: "Nine systems. One studio.",
    body: "Software, infrastructure and useful tools — designed, built and run in-house.",
    specs: [
      ["Systems", String(SYSTEMS.length)],
      ["Platforms", "Cloud · Web · Android · Windows"],
      ["Base", "Jakarta"],
      ["Model", "Founder-led"],
    ] as [string, string][],
    href: "#ecosystem",
    cta: "Explore our systems",
    color: "#F2F2EF",
  },
  ...(["cloud", "office", "sentinel"] as const).map((id) => {
    const s = byId(id);
    return {
      key: id === "cloud" ? "Cloud" : id === "office" ? "Office" : "Sentinel",
      label: s.badge,
      title: s.name,
      body: s.detail,
      specs: s.specs.slice(0, 4),
      href: safeHref(s.href),
      cta: s.cta,
      color: ACCENT_HEX[s.accent],
    };
  }),
];

const STORY_MS = 6500;

function Spotlight() {
  const [ready, setReady] = useState(false);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const go = useCallback((d: number) => setIdx((i) => (i + d + STORIES.length) % STORIES.length), []);

  useEffect(() => {
    if (paused || hover || reduced()) return;
    const t = window.setTimeout(() => go(1), STORY_MS);
    return () => window.clearTimeout(t);
  }, [idx, paused, hover, go]);

  // Apple-style scroll: the stage grows to full width while the headline drifts back.
  useEffect(() => {
    if (reduced()) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        const stage = stageRef.current;
        if (stage) {
          const r = stage.getBoundingClientRect();
          const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.9)));
          stage.style.transform = `scale(${0.9 + 0.1 * p})`;
          stage.style.borderRadius = `${36 - 12 * p}px`;
        }
        if (copyRef.current) {
          const y = Math.min(window.scrollY, vh);
          copyRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
          copyRef.current.style.opacity = String(1 - Math.min(0.7, y / (vh * 1.1)));
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const s = STORIES[idx];

  return (
    <section id="spotlight" className={`pb-20 pt-32 md:pb-28 md:pt-40 ${ready ? "st-ready" : ""}`}>
      <div ref={copyRef} className={`${wrap} text-center will-change-transform`}>
        <p className={`${eyebrow} text-[#5C5C62]`}>
          <Words text="Independent systems studio · Jakarta" step={40} />
        </p>
        <h1 className="mx-auto mt-6 max-w-[1000px] font-display text-[clamp(52px,9vw,128px)] font-semibold leading-[0.98] tracking-[-0.045em]">
          <Words text="One studio." start={150} />
          <br />
          <Words text="Made to move." start={400} />
        </h1>
        <p className="st-rise mx-auto mt-8 max-w-[620px] text-[19px] leading-[1.55] text-[#3C3C42] md:text-[21px]" style={EASE_DELAY(750)}>
          Software, infrastructure, and useful tools designed around the way people get things done.
        </p>
        <div className="st-rise mt-10 flex flex-wrap justify-center gap-3" style={EASE_DELAY(880)}>
          <a
            href="#ecosystem"
            className="group inline-flex items-center gap-2 rounded-full bg-[#0B0B0C] px-6 py-3.5 text-[15px] font-medium text-[#FAFAF8] transition-transform duration-300 hover:scale-[1.03]"
          >
            Explore our systems
            <ArrowRight className="st-arrow h-4 w-4" />
          </a>
          <a
            href="#mission"
            className="inline-flex items-center rounded-full border border-black/15 px-6 py-3.5 text-[15px] font-medium transition-colors duration-300 hover:border-black/40"
          >
            Meet the studio
          </a>
        </div>
      </div>

      <div className="mt-16 px-3 md:mt-24 md:px-6">
        <div
          ref={stageRef}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative mx-auto max-w-[1400px] origin-top overflow-hidden bg-[#0B0B0C] text-[#F2F2EF] will-change-transform"
          style={{ transform: "scale(0.9)", borderRadius: 36 }}
        >
          <div
            aria-hidden
            className="st-glow pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(60% 70% at 75% 30%, ${s.color}33, transparent 70%)` }}
          />
          <div className="relative grid min-h-[560px] gap-12 px-7 py-12 md:grid-cols-[1.1fr_1fr] md:px-16 md:py-20">
            <div key={`c-${idx}`} className="flex flex-col justify-center gap-5">
              <span className="st-swap font-obs-mono text-[12px] uppercase tracking-[0.1em]" style={{ color: s.color }}>
                {String(idx + 1).padStart(2, "0")} · {s.label}
              </span>
              <h2 className="st-swap font-display text-[clamp(36px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.035em]" style={EASE_DELAY(60)}>
                {s.title}
              </h2>
              <p className="st-swap max-w-[480px] text-[17px] leading-[1.6] text-[#C7C7CC]" style={EASE_DELAY(120)}>
                {s.body}
              </p>
              <SmartLink href={s.href} className="st-swap group mt-2 inline-flex w-fit items-center gap-2 text-[15px] font-medium">
                <span style={EASE_DELAY(180)}>{s.cta}</span>
                <ArrowRight className="st-arrow h-4 w-4" />
              </SmartLink>
            </div>
            <dl key={`d-${idx}`} className="grid grid-cols-2 content-center gap-px self-center overflow-hidden rounded-[20px] bg-white/10">
              {s.specs.map(([k, v], i) => (
                <div key={k} className="st-swap bg-[#111113] p-6 md:p-7" style={EASE_DELAY(140 + i * 70)}>
                  <dt className="text-[13px] text-[#A1A1A6]">{k}</dt>
                  <dd className="mt-2 font-display text-[19px] font-medium tracking-[-0.01em] md:text-[22px]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={`relative flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-7 py-5 md:px-16 ${paused || hover ? "st-paused" : ""}`}>
            <div role="group" aria-label="Choose product story" className="flex flex-1 gap-5">
              {STORIES.map((st, i) => (
                <button
                  key={st.key}
                  type="button"
                  aria-pressed={i === idx}
                  onClick={() => setIdx(i)}
                  className="group flex min-w-[64px] flex-1 flex-col gap-2.5 py-2 text-left"
                >
                  <span className={`text-[13px] transition-colors duration-300 ${i === idx ? "text-[#F2F2EF]" : "text-[#8A8A90] group-hover:text-[#C7C7CC]"}`}>
                    <span className="font-obs-mono text-[11px] opacity-60">0{i + 1}</span> {st.key}
                  </span>
                  <span className="relative h-[2px] overflow-hidden rounded-full bg-white/15">
                    {i === idx && (
                      <span
                        key={`p-${idx}`}
                        className="st-progress absolute inset-0 rounded-full bg-[#F2F2EF]"
                        style={{ "--dur": `${STORY_MS}ms` } as CSSProperties}
                      />
                    )}
                    {i < idx && <span className="absolute inset-0 rounded-full bg-white/40" />}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Previous product story" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-white/40">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button type="button" aria-label="Next product story" onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-white/40">
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label={paused ? "Play product story" : "Pause product story"}
                onClick={() => setPaused((v) => !v)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-white/40"
              >
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- ecosystem ---------- */

function Ecosystem() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const rowRef = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState({ x: 0, w: 0 });

  const measure = useCallback(() => {
    const btn = rowRef.current?.querySelector<HTMLButtonElement>(`[data-cat="${filter}"]`);
    if (btn) setInd({ x: btn.offsetLeft, w: btn.offsetWidth });
  }, [filter]);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const list = filter === "all" ? SYSTEMS : SYSTEMS.filter((s) => s.category === filter);

  return (
    <section id="ecosystem" className="scroll-mt-14 py-24 md:py-36">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className={`${eyebrow} st-reveal mb-5 text-[#5C5C62]`}>One studio · Many systems</p>
            <h2 className={`${h2} st-reveal max-w-[760px]`} style={EASE_DELAY(80)}>
              A system for every kind of work.
            </h2>
          </div>
          <p className="st-reveal max-w-[380px] text-[17px] leading-[1.6] text-[#5C5C62]" style={EASE_DELAY(160)}>
            The products and platforms we build across cloud, productivity, security and creative tools.
          </p>
        </div>

        <div className="st-reveal mt-12 flex flex-wrap items-center justify-between gap-4" style={EASE_DELAY(200)}>
          <div className="st-snap -mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
            <div ref={rowRef} role="group" aria-label="Filter systems by category" className="relative flex w-max gap-1 rounded-full bg-black/[0.05] p-1">
              <span
                aria-hidden
                className="st-indicator absolute bottom-1 left-0 top-1 rounded-full bg-[#0B0B0C] shadow-sm"
                style={{ transform: `translateX(${ind.x}px)`, width: ind.w }}
              />
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  data-cat={c.id}
                  aria-pressed={filter === c.id}
                  onClick={() => setFilter(c.id)}
                  className={`relative z-10 min-h-11 rounded-full px-4 text-[13px] font-medium transition-colors duration-500 ${
                    filter === c.id ? "text-[#FAFAF8]" : "text-[#3C3C42] hover:text-[#0B0B0C]"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <span className="font-obs-mono text-[12px] text-[#5C5C62]">
            {list.length} {list.length === 1 ? "system" : "systems"}
          </span>
        </div>

        <div key={filter} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <article
              key={s.id}
              className="st-swap st-lift group flex flex-col rounded-[24px] border border-black/[0.07] bg-white p-7"
              style={EASE_DELAY(i * 55)}
            >
              <div className="flex items-center justify-between">
                <span className="font-obs-mono text-[12px] text-[#8A8A90]">DEPUP / {s.num}</span>
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: ACCENT_HEX[s.accent] === "#e2e2e6" ? "#0B0B0C" : ACCENT_HEX[s.accent] }} />
              </div>
              <p className="mt-10 text-[13px] text-[#5C5C62]">{s.badge}</p>
              <h3 className="mt-1.5 font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.02em]">{s.name}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-[#3C3C42]">{s.description}</p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {s.tags.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[12px] text-[#3C3C42]">
                    {t}
                  </span>
                ))}
              </div>
              <SmartLink href={safeHref(s.href)} className="mt-7 inline-flex min-h-11 items-center gap-1.5 border-t border-black/[0.07] pt-5 text-[14px] font-medium">
                {s.cta}
                <ArrowRight className="st-arrow h-4 w-4" />
              </SmartLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- engineering ---------- */

function Engineering() {
  const [idx, setIdx] = useState(0);
  const p = PRINCIPLES[idx];
  const links = p.links.filter((l) => !l.href.includes("github.com"));

  return (
    <section id="engineering" className="scroll-mt-14 bg-[#0B0B0C] py-24 text-[#F2F2EF] md:py-36">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className={`${eyebrow} st-reveal mb-5 text-[#A1A1A6]`}>Engineering foundations</p>
            <h2 className={`${h2} st-reveal max-w-[820px]`} style={EASE_DELAY(80)}>
              Thoughtful by design.
              <br />
              <span className="text-[#8A8A90]">Reliable by engineering.</span>
            </h2>
          </div>
          <a href="#mission" className="st-reveal group inline-flex items-center gap-2 text-[15px] font-medium">
            Our mission <ArrowRight className="st-arrow h-4 w-4" />
          </a>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
          <div role="group" aria-label="Engineering principles" className="st-reveal border-t border-white/10">
            {PRINCIPLES.map((pr, i) => (
              <button
                key={pr.id}
                type="button"
                aria-pressed={i === idx}
                onClick={() => setIdx(i)}
                className="group relative flex w-full items-center justify-between gap-4 border-b border-white/10 py-5 text-left"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-full origin-left bg-white/[0.04] transition-transform duration-700"
                  style={{ transform: `scaleX(${i === idx ? 1 : 0})`, transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
                />
                <span className="relative flex flex-col gap-1 pl-4">
                  <span className="font-obs-mono text-[11px] uppercase tracking-[0.1em]" style={{ color: i === idx ? pr.color : "#8A8A90" }}>
                    {pr.tag}
                  </span>
                  <span className={`font-display text-[20px] font-semibold tracking-[-0.01em] transition-colors duration-300 ${i === idx ? "text-[#F2F2EF]" : "text-[#8A8A90] group-hover:text-[#C7C7CC]"}`}>
                    {pr.shortTitle}
                  </span>
                </span>
                <ArrowRight className={`relative mr-4 h-4 w-4 transition-all duration-500 ${i === idx ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`} />
              </button>
            ))}
          </div>

          <div className="st-reveal relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111113]" style={EASE_DELAY(120)}>
            <div aria-hidden className="st-glow pointer-events-none absolute inset-0" style={{ background: `radial-gradient(70% 60% at 85% 0%, ${p.glow}, transparent 70%)` }} />
            <div key={p.id} className="relative flex h-full flex-col gap-6 p-8 md:p-12">
              <span className="st-swap font-obs-mono text-[12px] uppercase tracking-[0.1em]" style={{ color: p.color }}>
                {p.badge}
              </span>
              <h3 className="st-swap font-display text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.05] tracking-[-0.03em]" style={EASE_DELAY(60)}>
                {p.title}
              </h3>
              <p className="st-swap max-w-[560px] text-[17px] leading-[1.6] text-[#C7C7CC]" style={EASE_DELAY(120)}>
                {p.desc}
              </p>
              <dl className="mt-2 grid grid-cols-1 gap-px overflow-hidden rounded-[16px] bg-white/10 sm:grid-cols-3">
                {p.metrics.map(([k, v], i) => (
                  <div key={k} className="st-swap bg-[#141416] p-5" style={EASE_DELAY(180 + i * 70)}>
                    <dt className="text-[12px] text-[#A1A1A6]">{k}</dt>
                    <dd className="mt-1.5 font-display text-[22px] font-semibold tracking-[-0.01em]">{v}</dd>
                  </div>
                ))}
              </dl>
              {links.length > 0 && (
                <div className="st-swap mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-[14px]" style={EASE_DELAY(300)}>
                  <span className="text-[#8A8A90]">{p.linksHeading}</span>
                  {links.map((l) => (
                    <SmartLink key={l.label} href={safeHref(l.href)} className="inline-flex items-center gap-1 text-[#F2F2EF] underline-offset-4 hover:underline">
                      {l.label}
                      {isExternal(l.href) && <ArrowUpRight className="h-3.5 w-3.5" />}
                    </SmartLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- updates ---------- */

function Updates() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0);

  const scrollBy = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("article");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 360) + 20), behavior: reduced() ? "auto" : "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => setPos(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="updates" className="scroll-mt-14 overflow-hidden py-24 md:py-36">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className={`${eyebrow} st-reveal mb-5 text-[#5C5C62]`}>Studio updates / 2026</p>
            <h2 className={`${h2} st-reveal`} style={EASE_DELAY(80)}>
              New work.
              <br />
              <span className="text-[#8A8A90]">New momentum.</span>
            </h2>
          </div>
          <div className="st-reveal flex items-center gap-2" style={EASE_DELAY(160)}>
            <button type="button" aria-label="Previous release" onClick={() => scrollBy(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-black/15 transition-colors hover:border-black/40">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button type="button" aria-label="Next release" onClick={() => scrollBy(1)} className="grid h-11 w-11 place-items-center rounded-full border border-black/15 transition-colors hover:border-black/40">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="st-snap st-track st-reveal mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        style={EASE_DELAY(200)}
      >
        {UPDATES.map((u) => {
          const color = ACCENT_HEX[u.accent];
          return (
            <article key={u.num} className="st-lift group flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-[24px] border border-black/[0.07] bg-white sm:w-[380px]">
              <div className="relative h-[200px] overflow-hidden bg-[#0B0B0C] text-[#F2F2EF]">
                <div
                  aria-hidden
                  className="absolute inset-0 transition-transform duration-[1200ms] group-hover:scale-110"
                  style={{ background: `radial-gradient(80% 90% at 80% 20%, ${color}55, transparent 65%)`, transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
                />
                <span className="absolute bottom-5 left-6 font-display text-[64px] font-semibold leading-none tracking-[-0.04em]">{u.num}</span>
                <span className="absolute right-6 top-5 font-obs-mono text-[11px] uppercase tracking-[0.1em] text-[#C7C7CC]">{u.area}</span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <span className="text-[13px] text-[#5C5C62]">{u.month} 2026 · Release note</span>
                <h3 className="font-display text-[21px] font-semibold leading-[1.25] tracking-[-0.015em]">{u.title}</h3>
                <p className="flex-1 text-[14px] leading-[1.6] text-[#5C5C62]">{u.body}</p>
                <SmartLink href={hrefForSystem(u.systemId)} className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-[14px] font-medium">
                  Explore update <ArrowRight className="st-arrow h-4 w-4" />
                </SmartLink>
              </div>
            </article>
          );
        })}
        <div aria-hidden className="w-1 shrink-0" />
      </div>

      <div className={`${wrap} mt-6`}>
        <div className="h-[2px] overflow-hidden rounded-full bg-black/[0.07]">
          <div className="h-full w-1/3 rounded-full bg-[#0B0B0C] transition-transform duration-300" style={{ transform: `translateX(${pos * 200}%)` }} />
        </div>
      </div>
    </section>
  );
}

/* ---------- field notes ---------- */

function FieldNotes() {
  const [open, setOpen] = useState(0);
  return (
    <section id="notes" className="scroll-mt-14 border-t border-black/[0.07] py-24 md:py-36">
      <div className={`${wrap} grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]`}>
        <div>
          <p className={`${eyebrow} st-reveal mb-5 text-[#5C5C62]`}>Notes from the studio</p>
          <h2 className={`${h2} st-reveal`} style={EASE_DELAY(80)}>
            Ideas into
            <br />
            working systems.
          </h2>
          <p className="st-reveal mt-6 text-[17px] text-[#5C5C62]" style={EASE_DELAY(160)}>
            A closer look at the choices behind the tools.
          </p>
        </div>
        <div className="st-reveal border-t border-black/10" style={EASE_DELAY(120)}>
          {NOTES.map((n, i) => {
            const on = open === i;
            return (
              <div key={n.num} className="border-b border-black/10">
                <button
                  type="button"
                  aria-expanded={on}
                  onClick={() => setOpen(on ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className="flex flex-col gap-1.5">
                    <span className="font-obs-mono text-[11px] uppercase tracking-[0.1em] text-[#5C5C62]">
                      Field note / {n.num} / {n.area}
                    </span>
                    <span className="font-display text-[22px] font-semibold tracking-[-0.015em] md:text-[26px]">{n.title}</span>
                  </span>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/15 transition-transform duration-500 ${on ? "rotate-45 bg-[#0B0B0C] text-[#FAFAF8]" : ""}`}>
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div className={`st-acc ${on ? "is-open" : ""}`}>
                  <div>
                    <div className="max-w-[620px] pb-8">
                      <p className="text-[17px] leading-[1.6] text-[#3C3C42]">{n.body}</p>
                      <p className="mt-4 text-[15px] leading-[1.65] text-[#5C5C62]">{n.more}</p>
                      <SmartLink href={hrefForSystem(n.systemId)} className="group mt-5 inline-flex min-h-11 items-center gap-1.5 text-[14px] font-medium">
                        Explore this system <ArrowRight className="st-arrow h-4 w-4" />
                      </SmartLink>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- mission ---------- */

function Mission() {
  return (
    <section id="mission" className="scroll-mt-14 px-3 pb-3 md:px-6 md:pb-6">
      <div className="relative overflow-hidden rounded-[32px] bg-[#0B0B0C] text-[#F2F2EF]">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(50% 60% at 50% 110%, rgba(143,176,255,0.28), transparent 70%)" }} />
        <div className="relative mx-auto flex max-w-[1000px] flex-col items-center px-6 py-28 text-center md:py-40">
          <p className={`${eyebrow} st-reveal text-[#A1A1A6]`}>Independent software studio · Indonesia</p>
          <h2 className="st-reveal mt-7 font-display text-[clamp(44px,7.5vw,104px)] font-semibold leading-[0.98] tracking-[-0.045em]" style={EASE_DELAY(80)}>
            Built to move
            <br />
            real work forward.
          </h2>
          <p className="st-reveal mt-8 max-w-[600px] text-[19px] leading-[1.55] text-[#C7C7CC]" style={EASE_DELAY(160)}>
            We make thoughtful software, useful infrastructure, and connected tools for the people who put them to work.
          </p>
          <div className="st-reveal mt-11 flex flex-wrap justify-center gap-3" style={EASE_DELAY(240)}>
            <a href="#ecosystem" className="group inline-flex items-center gap-2 rounded-full bg-[#F2F2EF] px-6 py-3.5 text-[15px] font-medium text-[#0B0B0C] transition-transform duration-300 hover:scale-[1.03]">
              Explore the ecosystem <ArrowRight className="st-arrow h-4 w-4" />
            </a>
            <a href={CONTACT} className="inline-flex items-center rounded-full border border-white/20 px-6 py-3.5 text-[15px] font-medium transition-colors hover:border-white/50">
              Contact the studio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */

const FOOTER: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Platforms",
    links: [
      { label: "depup.cloud", href: "https://depup.cloud" },
      { label: "depup.web.id", href: "https://depup.web.id" },
      { label: "Depup Code", href: "#ecosystem" },
      { label: "CikAi Gateway", href: "#ecosystem" },
    ],
  },
  {
    title: "Productivity",
    links: [
      { label: "depup Office", href: "/office" },
      { label: "MotionKu", href: "#ecosystem" },
      { label: "DVibes", href: "#ecosystem" },
    ],
  },
  {
    title: "Security",
    links: [
      { label: "Sentinel-ID", href: "/sentinel" },
      { label: "sentinel-id.net", href: "https://sentinel-id.net" },
      { label: "Safety approach", href: "/sentinel#safety" },
    ],
  },
  {
    title: "Infrastructure",
    links: [
      { label: "Kasyaf Redis Cloud", href: "#ecosystem" },
      { label: "Depup OS Dev", href: "#ecosystem" },
      { label: "API Status", href: "/api/status" },
    ],
  },
];

function StudioFooter() {
  return (
    <footer className={`${wrap} pb-12 pt-20`}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="flex flex-col gap-5">
          <a href="#spotlight" className="flex items-center gap-2.5 font-display text-[16px] font-semibold">
            <span aria-hidden className="grid h-7 w-7 place-items-center rounded-[8px] bg-[#0B0B0C] text-[13px] text-[#FAFAF8]">
              D
            </span>
            Depup Studio
          </a>
          <p className="font-display text-[22px] font-semibold leading-[1.25] tracking-[-0.015em]">
            Independent by nature.
            <br />
            <span className="text-[#8A8A90]">Connected by design.</span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {FOOTER.map((col) => (
            <div key={col.title} className="flex flex-col gap-3 text-[14px]">
              <h3 className="text-[13px] font-semibold">{col.title}</h3>
              {col.links.map((l) => (
                <SmartLink key={l.label} href={l.href} className="w-fit text-[#5C5C62] transition-colors hover:text-[#0B0B0C]">
                  {l.label}
                </SmartLink>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.07] pt-6 text-[13px] text-[#5C5C62]">
        <span>© 2026 Depup Studio. Made with intent.</span>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-[#0B0B0C]">
            Privacy
          </Link>
          <a href={CONTACT} className="hover:text-[#0B0B0C]">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- page ---------- */

export function StudioHome() {
  useReveal();
  return (
    <div className="st-root min-h-screen bg-[#FAFAF8] font-sans text-[#0B0B0C] antialiased selection:bg-[#0B0B0C] selection:text-[#FAFAF8]">
      <StudioNav />
      <main>
        <Spotlight />
        <Ecosystem />
        <Engineering />
        <Updates />
        <FieldNotes />
        <Mission />
      </main>
      <StudioFooter />
    </div>
  );
}
