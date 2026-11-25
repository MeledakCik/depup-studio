"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Cloud,
  Code,
  Cpu,
  Database,
  FileText,
  Layers,
  Music,
  Pause,
  Play,
  Plus,
  ShieldCheck,
  Sparkles,
  Terminal,
  type LucideIcon,
} from "lucide-react";
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
        scrolled || open ? "border-b border-black/[0.06] bg-[#F6F8FC]/80 backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent"
      }`}
    >
      <nav className={`${wrap} flex h-14 items-center justify-between gap-6`}>
        <a href="#spotlight" className="flex items-center gap-2.5 font-display text-[16px] font-semibold tracking-[-0.01em]">
          <span aria-hidden className="grid h-7 w-7 place-items-center rounded-[8px] bg-[#0057C3] text-[13px] text-[#F6F8FC]">
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
                className={`relative py-1 transition-colors duration-300 ${on ? "text-[#0A1428]" : "text-[#4F5B70] hover:text-[#0A1428]"}`}
              >
                {n.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-[#0057C3] transition-transform duration-500 ${on ? "scale-x-100" : "scale-x-0"}`}
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
            className="group hidden items-center gap-1.5 rounded-full bg-[#0057C3] px-4 py-2 text-[13px] font-medium text-[#F6F8FC] transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
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
              <span className={`absolute left-0 h-[1.5px] w-5 bg-[#0A1428] transition-all duration-500 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-5 bg-[#0A1428] transition-all duration-500 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px">
        <div ref={barRef} className="h-full origin-left bg-[#0057C3]" style={{ transform: "scaleX(0)" }} />
      </div>
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-700 lg:hidden ${open ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0"}`}
        style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
      >
        <div className={`${wrap} flex min-h-[calc(100vh-56px)] flex-col bg-[#F6F8FC] pb-10 pt-4`}>
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
          <a href="https://depup.cloud" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#0057C3] px-5 py-3 text-[15px] font-medium text-[#F6F8FC]">
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
    color: "#8AB4FF",
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
        <p className={`${eyebrow} text-[#0057C3]`}>
          <Words text="Independent systems studio · Jakarta" step={40} />
        </p>
        <h1 className="mx-auto mt-6 max-w-[1000px] font-display text-[clamp(52px,9vw,128px)] font-semibold leading-[0.98] tracking-[-0.045em]">
          <Words text="One studio." start={150} />
          <br />
          <span className="text-[#0057C3]"><Words text="Made to move." start={400} /></span>
        </h1>
        <p className="st-rise mx-auto mt-8 max-w-[620px] text-[19px] leading-[1.55] text-[#2E3A50] md:text-[21px]" style={EASE_DELAY(750)}>
          Software, infrastructure, and useful tools designed around the way people get things done.
        </p>
        <div className="st-rise mt-10 flex flex-wrap justify-center gap-3" style={EASE_DELAY(880)}>
          <a
            href="#ecosystem"
            className="group inline-flex items-center gap-2 rounded-full bg-[#0057C3] px-6 py-3.5 text-[15px] font-medium text-[#F6F8FC] transition-transform duration-300 hover:scale-[1.03]"
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
          className="relative mx-auto max-w-[1400px] origin-top overflow-hidden bg-[#061634] text-[#F3F6FC] will-change-transform"
          style={{ transform: "scale(0.9)", borderRadius: 36, background: "linear-gradient(155deg, #0B3A8C 0%, #0A2463 42%, #061634 100%)" }}
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
              <p className="st-swap max-w-[480px] text-[17px] leading-[1.6] text-[#C9D5EC]" style={EASE_DELAY(120)}>
                {s.body}
              </p>
              <SmartLink href={s.href} className="st-swap group mt-2 inline-flex w-fit items-center gap-2 text-[15px] font-medium">
                <span style={EASE_DELAY(180)}>{s.cta}</span>
                <ArrowRight className="st-arrow h-4 w-4" />
              </SmartLink>
            </div>
            <dl key={`d-${idx}`} className="grid grid-cols-2 content-center gap-px self-center overflow-hidden rounded-[20px] bg-white/10">
              {s.specs.map(([k, v], i) => (
                <div key={k} className="st-swap bg-[#0B2150] p-6 md:p-7" style={EASE_DELAY(140 + i * 70)}>
                  <dt className="text-[13px] text-[#A9B8D6]">{k}</dt>
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
                  <span className={`text-[13px] transition-colors duration-300 ${i === idx ? "text-[#F3F6FC]" : "text-[#8FA3C7] group-hover:text-[#C9D5EC]"}`}>
                    <span className="font-obs-mono text-[11px] opacity-60">0{i + 1}</span> {st.key}
                  </span>
                  <span className="relative h-[2px] overflow-hidden rounded-full bg-white/15">
                    {i === idx && (
                      <span
                        key={`p-${idx}`}
                        className="st-progress absolute inset-0 rounded-full bg-[#F3F6FC]"
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

/* ---------- constellation (scroll-driven motion graphic) ---------- */

const ECO_PREVIEW = 6;

const SYSTEM_ICON: Record<string, LucideIcon> = {
  cloud: Cloud,
  office: FileText,
  sentinel: ShieldCheck,
  motionku: Sparkles,
  dvibes: Music,
  kasyaf: Database,
  code: Code,
  cikai: Cpu,
  os: Terminal,
};
const CATEGORY_ICON: Record<Category, LucideIcon> = {
  cloud: Cloud,
  productivity: FileText,
  security: ShieldCheck,
  creative: Sparkles,
  developer: Code,
};
/** New systems get an icon from their category, so the constellation keeps working as the list grows. */
const iconFor = (id: string, category: Category) => SYSTEM_ICON[id] ?? CATEGORY_ICON[category] ?? Layers;
const shortName = (name: string) => name.split(" & ")[0].replace(/ Dev Edition$/, "");

const tileColor = (hex: string) => (hex.toLowerCase() === "#e2e2e6" ? "#8AB4FF" : hex);

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

function Constellation() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const coreRef = useRef<HTMLDivElement>(null);
  const copyA = useRef<HTMLDivElement>(null);
  const copyB = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const n = SYSTEMS.length;

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    const still = reduced();
    let raf = 0;
    let layout: { sx: number; sy: number; ss: number; ex: number; ey: number }[] = [];
    let half = { w: 0, h: 0 };

    const computeLayout = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      half = { w: w / 2, h: h / 2 };
      const small = w < 640;
      const tile = small ? 60 : 76;
      const gap = small ? 26 : 40;
      const cols = Math.min(n, small ? 3 : Math.min(6, Math.ceil(Math.sqrt(n * 1.8))));
      const rows = Math.ceil(n / cols);
      const cell = tile + gap;
      const rx = Math.min(w * 0.42, 520);
      const ry = Math.min(h * 0.3, 260);
      const golden = Math.PI * (3 - Math.sqrt(5));
      layout = SYSTEMS.map((_, i) => {
        const a = i * golden + 0.6;
        const r = 0.55 + 0.45 * (((i * 7) % n) / Math.max(1, n - 1));
        const row = Math.floor(i / cols);
        const inRow = row === rows - 1 ? n - row * cols : cols;
        const col = i % cols;
        return {
          sx: Math.cos(a) * rx * r,
          sy: Math.sin(a) * ry * r,
          ss: 0.7 + 0.45 * r,
          ex: (col - (inRow - 1) / 2) * cell,
          ey: (row - (rows - 1) / 2) * (cell + (small ? 14 : 18)) + (small ? 40 : 56),
        };
      });
    };

    const frame = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = section.offsetHeight - vh;
      const p = still ? 1 : clamp01(-rect.top / Math.max(1, total));
      const appear = range(p, 0, 0.12);
      const gather = easeInOut(range(p, 0.18, 0.72));
      const settle = range(p, 0.7, 0.86);
      const spin = (1 - gather) * p * 1.4;

      layout.forEach((L, i) => {
        const cos = Math.cos(spin);
        const sin = Math.sin(spin);
        const ox = L.sx * cos - L.sy * sin * 0.6;
        const oy = L.sx * sin * 0.6 + L.sy * cos;
        const x = ox + (L.ex - ox) * gather;
        const y = oy + (L.ey - oy) * gather;
        const sc = (L.ss + (1 - L.ss) * gather) * (0.6 + 0.4 * appear);
        const el = tileRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${sc})`;
          el.style.opacity = String(Math.min(1, appear * 1.2) * (0.55 + 0.45 * Math.max(gather, L.ss - 0.5)));
        }
        const lb = labelRefs.current[i];
        if (lb) lb.style.opacity = String(settle);
        const ln = lineRefs.current[i];
        if (ln) {
          ln.setAttribute("x2", String(half.w + x));
          ln.setAttribute("y2", String(half.h + y));
          ln.style.opacity = String(appear * (1 - gather) * 0.5);
        }
      });
      if (coreRef.current) {
        const c = 1 - easeInOut(range(p, 0.3, 0.62));
        coreRef.current.style.opacity = String(c * Math.max(appear, 0.4));
        coreRef.current.style.transform = `translate(-50%, -50%) scale(${0.7 + 0.3 * c + 0.08 * appear})`;
      }
      const t = range(p, 0.38, 0.5);
      if (copyA.current) {
        copyA.current.style.opacity = String(1 - t);
        copyA.current.style.transform = `translate3d(0, ${-16 * t}px, 0)`;
      }
      if (copyB.current) {
        copyB.current.style.opacity = String(t);
        copyB.current.style.transform = `translate3d(0, ${16 * (1 - t)}px, 0)`;
      }
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };
    const onResize = () => {
      computeLayout();
      onScroll();
    };
    computeLayout();
    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [n]);

  return (
    <section ref={sectionRef} aria-label="The Depup ecosystem" className="relative h-[230vh] bg-[#061634] text-[#F3F6FC] md:h-[260vh]">
      <div ref={stageRef} className="sticky top-0 h-[100svh] overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(55% 50% at 50% 55%, rgba(31,111,235,0.35), transparent 70%)" }} />
        <div aria-hidden className="st-grid pointer-events-none absolute inset-0 opacity-[0.07]" />

        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full">
          {SYSTEMS.map((s, i) => (
            <line
              key={s.id}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              x1="50%"
              y1="50%"
              x2="50%"
              y2="50%"
              stroke="#8AB4FF"
              strokeWidth="1"
              strokeDasharray="2 6"
              style={{ opacity: 0 }}
            />
          ))}
        </svg>

        <div
          ref={coreRef}
          aria-hidden
          className="absolute left-1/2 top-1/2 grid h-24 w-24 place-items-center rounded-[28px] bg-[#0057C3] font-display text-[40px] font-semibold text-white shadow-[0_0_80px_rgba(31,111,235,0.6)] md:h-28 md:w-28"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <span className="st-pulse absolute inset-0 rounded-[28px] border border-[#8AB4FF]/50" />
          D
        </div>

        {SYSTEMS.map((s, i) => {
          const color = tileColor(ACCENT_HEX[s.accent]);
          const Icon = iconFor(s.id, s.category);
          return (
            <a
              key={s.id}
              href={safeHref(s.href) === "#ecosystem" ? "#ecosystem" : safeHref(s.href)}
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
              aria-label={s.name}
              className="group absolute left-1/2 top-1/2 flex flex-col items-center will-change-transform"
              style={{ opacity: 0 }}
            >
              <span className="st-float block" style={{ animationDelay: `${(i % 5) * -1.3}s` }}>
                <span
                  className="grid h-[60px] w-[60px] place-items-center rounded-[18px] border border-white/15 bg-white/[0.06] font-display text-[20px] font-semibold backdrop-blur-md transition-all duration-500 group-hover:-translate-y-1 group-hover:border-white/40 group-hover:bg-white/[0.12] sm:h-[76px] sm:w-[76px] sm:rounded-[22px] sm:text-[24px]"
                  style={{ color, boxShadow: `0 10px 40px -12px ${color}66` }}
                >
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} aria-hidden />
                </span>
              </span>
              <span
                ref={(el) => {
                  labelRefs.current[i] = el;
                }}
                className="mt-3 w-[80px] truncate text-center text-[11px] text-[#C9D5EC] sm:w-[108px] sm:text-[13px]"
                style={{ opacity: 0 }}
              >
                {shortName(s.name)}
              </span>
            </a>
          );
        })}

        <div className={`${wrap} pointer-events-none absolute inset-x-0 top-[13vh] text-center md:top-[11vh]`}>
          <div ref={copyA} className="absolute inset-x-0">
            <p className={`${eyebrow} text-[#8AB4FF]`}>The Depup ecosystem</p>
            <h2 className="mx-auto mt-4 max-w-[760px] font-display text-[clamp(30px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Every project starts as its own idea.
            </h2>
          </div>
          <div ref={copyB} className="absolute inset-x-0" style={{ opacity: 0 }}>
            <p className={`${eyebrow} text-[#8AB4FF]`}>{n} systems · and counting</p>
            <h2 className="mx-auto mt-4 max-w-[760px] font-display text-[clamp(30px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Then they move as one studio.
            </h2>
          </div>
        </div>

        <div className={`${wrap} absolute inset-x-0 bottom-8 flex items-center gap-4`}>
          <span className="font-obs-mono text-[11px] uppercase tracking-[0.1em] text-[#8FA3C7]">Scroll</span>
          <div className="h-px flex-1 overflow-hidden bg-white/15">
            <div ref={barRef} className="h-full origin-left bg-[#8AB4FF]" style={{ transform: "scaleX(0)" }} />
          </div>
          <a href="#ecosystem" className="pointer-events-auto font-obs-mono text-[11px] uppercase tracking-[0.1em] text-[#C9D5EC] hover:text-white">
            Skip to systems
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- ecosystem ---------- */

function Ecosystem() {
  const [filter, setFilterRaw] = useState<"all" | Category>("all");
  const [expanded, setExpanded] = useState(false);
  const setFilter = (f: "all" | Category) => {
    setFilterRaw(f);
    setExpanded(false);
  };
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
  const collapsible = list.length > ECO_PREVIEW;
  const shown = collapsible && !expanded ? list.slice(0, ECO_PREVIEW) : list;

  return (
    <section id="ecosystem" className="scroll-mt-14 py-24 md:py-36">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className={`${eyebrow} st-reveal mb-5 text-[#0057C3]`}>One studio · Many systems</p>
            <h2 className={`${h2} st-reveal max-w-[760px]`} style={EASE_DELAY(80)}>
              A system for every kind of work.
            </h2>
          </div>
          <p className="st-reveal max-w-[380px] text-[17px] leading-[1.6] text-[#4F5B70]" style={EASE_DELAY(160)}>
            The products and platforms we build across cloud, productivity, security and creative tools.
          </p>
        </div>

        <div className="st-reveal mt-12 flex flex-wrap items-center justify-between gap-4" style={EASE_DELAY(200)}>
          <div className="st-snap -mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
            <div ref={rowRef} role="group" aria-label="Filter systems by category" className="relative flex w-max gap-1 rounded-full bg-black/[0.05] p-1">
              <span
                aria-hidden
                className="st-indicator absolute bottom-1 left-0 top-1 rounded-full bg-[#0057C3] shadow-sm"
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
                    filter === c.id ? "text-[#F6F8FC]" : "text-[#2E3A50] hover:text-[#0A1428]"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <span className="font-obs-mono text-[12px] text-[#4F5B70]">
            {list.length} {list.length === 1 ? "system" : "systems"}
          </span>
        </div>

        <div key={filter} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((s, i) => (
            <article
              key={s.id}
              className="st-swap st-lift group flex flex-col rounded-[24px] border border-black/[0.07] bg-white p-7"
              style={EASE_DELAY((i >= ECO_PREVIEW && expanded ? i - ECO_PREVIEW : i) * 55)}
            >
              <div className="flex items-center justify-between">
                <span className="font-obs-mono text-[12px] text-[#5E6A80]">DEPUP / {s.num}</span>
                {(() => {
                  const Icon = iconFor(s.id, s.category);
                  return (
                    <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-[#0057C3]/[0.07] text-[#0057C3] transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                  );
                })()}
              </div>
              <p className="mt-8 text-[13px] text-[#4F5B70]">{s.badge}</p>
              <h3 className="mt-1.5 font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.02em]">{s.name}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-[#2E3A50]">{s.description}</p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {s.tags.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[12px] text-[#2E3A50]">
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
        {collapsible && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => {
                if (expanded) document.getElementById("ecosystem")?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
                setExpanded((v) => !v);
              }}
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-[#0057C3]/25 px-6 py-3 text-[15px] font-medium text-[#0057C3] transition-all duration-300 hover:border-[#0057C3] hover:bg-[#0057C3] hover:text-white"
            >
              {expanded ? "Show fewer" : `Show all ${list.length} systems`}
              <Plus className={`h-4 w-4 transition-transform duration-500 ${expanded ? "rotate-45" : "group-hover:rotate-90"}`} />
            </button>
          </div>
        )}
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
    <section id="engineering" className="scroll-mt-14 bg-[#061634] py-24 text-[#F3F6FC] md:py-36">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className={`${eyebrow} st-reveal mb-5 text-[#8AB4FF]`}>Engineering foundations</p>
            <h2 className={`${h2} st-reveal max-w-[820px]`} style={EASE_DELAY(80)}>
              Thoughtful by design.
              <br />
              <span className="text-[#8FA3C7]">Reliable by engineering.</span>
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
                  <span className="font-obs-mono text-[11px] uppercase tracking-[0.1em]" style={{ color: i === idx ? pr.color : "#8FA3C7" }}>
                    {pr.tag}
                  </span>
                  <span className={`font-display text-[20px] font-semibold tracking-[-0.01em] transition-colors duration-300 ${i === idx ? "text-[#F3F6FC]" : "text-[#8FA3C7] group-hover:text-[#C9D5EC]"}`}>
                    {pr.shortTitle}
                  </span>
                </span>
                <ArrowRight className={`relative mr-4 h-4 w-4 transition-all duration-500 ${i === idx ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`} />
              </button>
            ))}
          </div>

          <div className="st-reveal relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0B2150]" style={EASE_DELAY(120)}>
            <div aria-hidden className="st-glow pointer-events-none absolute inset-0" style={{ background: `radial-gradient(70% 60% at 85% 0%, ${p.glow}, transparent 70%)` }} />
            <div key={p.id} className="relative flex h-full flex-col gap-6 p-8 md:p-12">
              <span className="st-swap font-obs-mono text-[12px] uppercase tracking-[0.1em]" style={{ color: p.color }}>
                {p.badge}
              </span>
              <h3 className="st-swap font-display text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.05] tracking-[-0.03em]" style={EASE_DELAY(60)}>
                {p.title}
              </h3>
              <p className="st-swap max-w-[560px] text-[17px] leading-[1.6] text-[#C9D5EC]" style={EASE_DELAY(120)}>
                {p.desc}
              </p>
              <dl className="mt-2 grid grid-cols-1 gap-px overflow-hidden rounded-[16px] bg-white/10 sm:grid-cols-3">
                {p.metrics.map(([k, v], i) => (
                  <div key={k} className="st-swap bg-[#0E2759] p-5" style={EASE_DELAY(180 + i * 70)}>
                    <dt className="text-[12px] text-[#A9B8D6]">{k}</dt>
                    <dd className="mt-1.5 font-display text-[22px] font-semibold tracking-[-0.01em]">{v}</dd>
                  </div>
                ))}
              </dl>
              {links.length > 0 && (
                <div className="st-swap mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-[14px]" style={EASE_DELAY(300)}>
                  <span className="text-[#8FA3C7]">{p.linksHeading}</span>
                  {links.map((l) => (
                    <SmartLink key={l.label} href={safeHref(l.href)} className="inline-flex items-center gap-1 text-[#F3F6FC] underline-offset-4 hover:underline">
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
  const [view, setView] = useState({ left: 0, ratio: 1 / 3, atStart: true, atEnd: false });

  const scrollBy = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("article");
    const gap = parseFloat(getComputedStyle(el).columnGap || "20") || 20;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 360) + gap), behavior: reduced() ? "auto" : "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setView({
        left: el.scrollLeft / Math.max(1, el.scrollWidth),
        ratio: el.clientWidth / Math.max(1, el.scrollWidth),
        atStart: el.scrollLeft <= 2,
        atEnd: el.scrollLeft >= max - 2,
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const navBtn =
    "grid h-11 w-11 place-items-center rounded-full border border-black/15 transition-all duration-300 hover:border-[#0057C3] hover:text-[#0057C3] disabled:pointer-events-none disabled:opacity-30";

  return (
    <section id="updates" className="scroll-mt-14 py-24 md:py-36">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className={`${eyebrow} st-reveal mb-5 text-[#0057C3]`}>Studio updates / 2026</p>
            <h2 className={`${h2} st-reveal`} style={EASE_DELAY(80)}>
              New work.
              <br />
              <span className="text-[#7B879C]">New momentum.</span>
            </h2>
          </div>
          <div className="st-reveal flex items-center gap-2" style={EASE_DELAY(160)}>
            <button type="button" aria-label="Previous release" disabled={view.atStart} onClick={() => scrollBy(-1)} className={navBtn}>
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button type="button" aria-label="Next release" disabled={view.atEnd} onClick={() => scrollBy(1)} className={navBtn}>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="st-snap st-reveal mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 pt-2"
          style={EASE_DELAY(200)}
        >
          {UPDATES.map((u) => {
            const color = ACCENT_HEX[u.accent];
            return (
              <article
                key={u.num}
                className="group flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-[24px] border border-black/[0.07] bg-white transition-[border-color,transform] duration-500 hover:border-[#0057C3]/30 sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)]"
              >
                <div className="relative h-[190px] overflow-hidden bg-[#061634] text-[#F3F6FC]">
                  <div
                    aria-hidden
                    className="absolute inset-0 transition-transform duration-[1200ms] group-hover:scale-110"
                    style={{ background: `radial-gradient(80% 90% at 80% 20%, ${color}55, transparent 65%)`, transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
                  />
                  <span className="absolute bottom-5 left-6 font-display text-[60px] font-semibold leading-none tracking-[-0.04em]">{u.num}</span>
                  <span className="absolute right-6 top-5 font-obs-mono text-[11px] uppercase tracking-[0.1em] text-[#C9D5EC]">{u.area}</span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <span className="text-[13px] text-[#4F5B70]">{u.month} 2026 · Release note</span>
                  <h3 className="font-display text-[20px] font-semibold leading-[1.25] tracking-[-0.015em]">{u.title}</h3>
                  <p className="flex-1 text-[14px] leading-[1.6] text-[#4F5B70]">{u.body}</p>
                  <SmartLink href={hrefForSystem(u.systemId)} className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-[14px] font-medium text-[#0057C3]">
                    Explore update <ArrowRight className="st-arrow h-4 w-4" />
                  </SmartLink>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-4 h-[2px] overflow-hidden rounded-full bg-black/[0.07]">
          <div
            className="h-full rounded-full bg-[#0057C3] transition-[transform,width] duration-300"
            style={{ width: `${view.ratio * 100}%`, transform: `translateX(${(view.left / Math.max(0.0001, view.ratio)) * 100}%)` }}
          />
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
          <p className={`${eyebrow} st-reveal mb-5 text-[#0057C3]`}>Notes from the studio</p>
          <h2 className={`${h2} st-reveal`} style={EASE_DELAY(80)}>
            Ideas into
            <br />
            working systems.
          </h2>
          <p className="st-reveal mt-6 text-[17px] text-[#4F5B70]" style={EASE_DELAY(160)}>
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
                    <span className="font-obs-mono text-[11px] uppercase tracking-[0.1em] text-[#4F5B70]">
                      Field note / {n.num} / {n.area}
                    </span>
                    <span className="font-display text-[22px] font-semibold tracking-[-0.015em] md:text-[26px]">{n.title}</span>
                  </span>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/15 transition-transform duration-500 ${on ? "rotate-45 border-transparent bg-[#0057C3] text-white" : ""}`}>
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div className={`st-acc ${on ? "is-open" : ""}`}>
                  <div>
                    <div className="max-w-[620px] pb-8">
                      <p className="text-[17px] leading-[1.6] text-[#2E3A50]">{n.body}</p>
                      <p className="mt-4 text-[15px] leading-[1.65] text-[#4F5B70]">{n.more}</p>
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
      <div className="relative overflow-hidden rounded-[32px] bg-[#061634] text-[#F3F6FC]" style={{ background: "linear-gradient(160deg, #0B3A8C 0%, #0A2463 45%, #061634 100%)" }}>
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(50% 60% at 50% 110%, rgba(31,111,235,0.45), transparent 70%)" }} />
        <div className="relative mx-auto flex max-w-[1000px] flex-col items-center px-6 py-28 text-center md:py-40">
          <p className={`${eyebrow} st-reveal text-[#8AB4FF]`}>Independent software studio · Indonesia</p>
          <h2 className="st-reveal mt-7 font-display text-[clamp(44px,7.5vw,104px)] font-semibold leading-[0.98] tracking-[-0.045em]" style={EASE_DELAY(80)}>
            Built to move
            <br />
            real work forward.
          </h2>
          <p className="st-reveal mt-8 max-w-[600px] text-[19px] leading-[1.55] text-[#C9D5EC]" style={EASE_DELAY(160)}>
            We make thoughtful software, useful infrastructure, and connected tools for the people who put them to work.
          </p>
          <div className="st-reveal mt-11 flex flex-wrap justify-center gap-3" style={EASE_DELAY(240)}>
            <a href="#ecosystem" className="group inline-flex items-center gap-2 rounded-full bg-[#F3F6FC] px-6 py-3.5 text-[15px] font-medium text-[#0A1428] transition-transform duration-300 hover:scale-[1.03]">
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
            <span aria-hidden className="grid h-7 w-7 place-items-center rounded-[8px] bg-[#0057C3] text-[13px] text-[#F6F8FC]">
              D
            </span>
            Depup Studio
          </a>
          <p className="font-display text-[22px] font-semibold leading-[1.25] tracking-[-0.015em]">
            Independent by nature.
            <br />
            <span className="text-[#7B879C]">Connected by design.</span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {FOOTER.map((col) => (
            <div key={col.title} className="flex flex-col gap-3 text-[14px]">
              <h3 className="text-[13px] font-semibold">{col.title}</h3>
              {col.links.map((l) => (
                <SmartLink key={l.label} href={l.href} className="w-fit text-[#4F5B70] transition-colors hover:text-[#0A1428]">
                  {l.label}
                </SmartLink>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.07] pt-6 text-[13px] text-[#4F5B70]">
        <span>© 2026 Depup Studio. Made with intent.</span>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-[#0A1428]">
            Privacy
          </Link>
          <a href={CONTACT} className="hover:text-[#0A1428]">
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
    <div className="st-root min-h-screen bg-[#F6F8FC] font-sans text-[#0A1428] antialiased selection:bg-[#0057C3] selection:text-[#F6F8FC]">
      <StudioNav />
      <main>
        <Spotlight />
        <Constellation />
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
