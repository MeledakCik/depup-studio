"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowBigUp,
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
  Shield,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  ACCENT_HEX,
  CATEGORIES as ALL_CATEGORIES,
  NOTES,
  PRINCIPLES as ALL_PRINCIPLES,
  SYSTEMS as ALL_SYSTEMS,
  UPDATES as ALL_UPDATES,
  type Category,
  type Principle,
} from "@/components/obsidian/data";
import { STUDIO } from "@/lib/products";
import "./studio.css";

const CONTACT = `mailto:${STUDIO.email}`;

/**
 * Only products the public can actually use today are shown on the homepage (checked 25 Nov 2026):
 * - depup.cloud: live web app at depup.cloud (depup.web.id redirects there)
 * - Sentinel-ID: live web app at sentinel-id.net
 * - depup Office: Android APK published as GitHub release v4.4.2
 * Other systems stay in data.ts; add an id here once it has a public site, store listing or release.
 */
const RELEASED = ["cloud", "office", "sentinel"];
/* Office ships on Android today (iOS, macOS and Windows are "soon" in lib/products.ts), so its copy says only that. */
const SYSTEM_FACTS: Record<string, Partial<(typeof ALL_SYSTEMS)[number]>> = {
  sentinel: {
    description: "Passive security audits for domains you own. GET-only, same-origin and capped at 100 requests per scan.",
  },
  office: {
    description: "Documents, spreadsheets, presentations, PDF and scanning — offline on your Android device. iOS, macOS and Windows are on the way.",
    detail: "Documents, spreadsheets, presentations, PDF and a scanner in one app. Everything runs on the device, so it works without a connection.",
    tags: ["Android", "Offline", "iOS · macOS · Windows soon"],
    specs: [
      ["Platform", "Android"],
      ["Processing", "On-device"],
      ["Download", "APK release"],
      ["Coming", "iOS · macOS · Windows"],
    ],
  },
};
const SYSTEMS = ALL_SYSTEMS.filter((s) => RELEASED.includes(s.id)).map((s) => ({ ...s, ...SYSTEM_FACTS[s.id] }));
const CATEGORIES = ALL_CATEGORIES.filter((c) => c.id === "all" || SYSTEMS.some((s) => s.category === c.id));
// The Office "brings document work to Windows" note is left out: the Windows build is not released yet.
type Update = (typeof ALL_UPDATES)[number];
const OFFICE_RELEASE: Update = {
    num: "03",
    area: "Android",
    month: "November",
    title: "depup Office 4.4.2 for Android",
    body: "Protected documents you can share, encrypted with AES-256-GCM, plus PDF, photo, Excel and Word tools — available as an APK release.",
    accent: "titanium",
    systemId: "office",
};
const UPDATES: (Update & { image: string })[] = [
  ...ALL_UPDATES.filter((u) => RELEASED.includes(u.systemId) && !/windows/i.test(u.title)),
  OFFICE_RELEASE,
].map((u) => ({ ...u, image: `/updates/${u.systemId}.webp` }));
const NOTE_FACTS: Record<string, { more: string }> = {
  office: { more: "Capture happens on the device, so a scan works on a plane or in a basement, with no account and no upload." },
};
const LIVE_NOTES = NOTES.filter((n) => RELEASED.includes(n.systemId)).map((n) => ({ ...n, ...NOTE_FACTS[n.systemId] }));
const NUMBER_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const countWord = (n: number) => NUMBER_WORDS[n] ?? String(n);

/* Principles tied to released products only, with facts that can be checked on each product's site. */
const PRINCIPLE_FACTS: Record<string, Partial<Principle>> = {
  "01": {
    desc: "One dashboard to check a repo and deploy it to Vercel, Cloudflare Pages or Railway, with an MCP connector so AI assistants can work with your projects.",
    links: [{ label: "depup.cloud", href: "https://depup.cloud", external: true }],
    metrics: [
      ["Targets", "Vercel · Cloudflare · Railway"],
      ["Sign-in", "Google"],
      ["AI", "MCP connector"],
    ],
  },
  "02": {
    metrics: [
      ["Method", "GET / HEAD only"],
      ["Request ceiling", "100 per scan"],
      ["Exploits run", "0"],
    ],
  },
  "05": {
    shortDesc: "Documents, scanning and PDF tools that keep working without a connection.",
    title: "Offline-First Tooling",
    desc: "Documents, spreadsheets, presentations, PDF and scanning run on the device, so work continues without a connection.",
    linksHeading: "Built into",
    links: [{ label: "depup Office", href: "/office" }],
    metrics: [
      ["Network needed", "None"],
      ["Processing", "On-device"],
      ["Platform", "Android"],
    ],
  },
};
const PRINCIPLES: Principle[] = ALL_PRINCIPLES.filter((p) => p.id in PRINCIPLE_FACTS).map((p) => ({ ...p, ...PRINCIPLE_FACTS[p.id] }));
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

function Words({ text, start = 0, step = 70, wordClass = "" }: { text: string; start?: number; step?: number; wordClass?: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span
          key={i}
          className={`st-word ${wordClass}`}
          style={{ ...EASE_DELAY(start + i * step), backgroundPosition: wordClass ? `${-i * 34}% 50%` : undefined }}
        >
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

/* ---------- hero background: Gemini-style flowing light ---------- */

const SPARKS = [
  { x: 9, y: 26, s: 22, d: 0 },
  { x: 90, y: 20, s: 16, d: -1.6 },
  { x: 86, y: 66, s: 26, d: -3.1 },
  { x: 13, y: 72, s: 14, d: -2.2 },
  { x: 72, y: 9, s: 12, d: -4 },
];

/* A sea of clouds at dawn: three parallax layers of soft cumulus lit from behind in Depup blue. */
const CLOUD_LAYERS = [
  { count: 8, scale: 0.55, y: 0.8, speed: 7, alpha: 0.6, tint: "150,160,255", blur: 6, par: 6 },
  { count: 7, scale: 0.85, y: 0.88, speed: 12, alpha: 0.82, tint: "110,170,255", blur: 2, par: 12 },
  { count: 6, scale: 1.25, y: 0.98, speed: 18, alpha: 0.97, tint: "80,190,255", blur: 1.5, par: 22 },
];

function makeCloudSprite(seed: number, tint: string) {
  const w = 520;
  const h = 260;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  const rnd = seeded(seed);
  const puff = (x: number, y: number, r: number, a: number) => {
    const gr = g.createRadialGradient(x, y - r * 0.25, 0, x, y, r);
    gr.addColorStop(0, `rgba(255,255,255,${a})`);
    gr.addColorStop(0.55, `rgba(255,255,255,${a * 0.6})`);
    gr.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = gr;
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  };
  g.filter = "blur(5px)";
  // body: many overlapping soft puffs, taller toward the middle, flat underneath
  for (let i = 0; i < 70; i++) {
    const u = 0.08 + 0.84 * rnd();
    const bump = Math.pow(Math.sin(u * Math.PI), 1.3);
    const r = h * (0.07 + 0.17 * bump) * (0.6 + 0.6 * rnd());
    const y = h * 0.72 - bump * h * 0.38 * Math.pow(rnd(), 0.7);
    puff(u * w, Math.min(y, h * 0.74), r, 0.55 + 0.35 * rnd());
  }
  // wispy edges
  for (let i = 0; i < 24; i++) {
    const u = rnd() < 0.5 ? 0.02 + 0.2 * rnd() : 0.78 + 0.2 * rnd();
    puff(u * w, h * (0.62 + 0.1 * rnd()), h * (0.05 + 0.07 * rnd()), 0.35);
  }
  g.filter = "none";
  // light from above, shade underneath in the layer tint
  g.globalCompositeOperation = "source-atop";
  const shade = g.createLinearGradient(0, h * 0.3, 0, h * 0.85);
  shade.addColorStop(0, "rgba(255,255,255,0)");
  shade.addColorStop(0.55, `rgba(${tint},0.18)`);
  shade.addColorStop(1, `rgba(${tint},0.5)`);
  g.fillStyle = shade;
  g.fillRect(0, 0, w, h);
  const sunlit = g.createRadialGradient(w * 0.5, h * 0.15, 0, w * 0.5, h * 0.15, w * 0.45);
  sunlit.addColorStop(0, "rgba(255,255,255,0.55)");
  sunlit.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = sunlit;
  g.fillRect(0, 0, w, h);
  return c;
}

function GeminiSpark({ size, className, style }: { size: number; className?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className={className} style={style}>
      <defs>
        <linearGradient id="st-spark" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5CE1FF" />
          <stop offset="0.5" stopColor="#1F6FEB" />
          <stop offset="1" stopColor="#7C4DFF" />
        </linearGradient>
      </defs>
      <path d="M12 0C12 6.6 17.4 12 24 12C17.4 12 12 17.4 12 24C12 17.4 6.6 12 0 12C6.6 12 12 6.6 12 0Z" fill="url(#st-spark)" />
    </svg>
  );
}

function HeroAurora() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!host || !canvas || !ctx) return;
    const still = reduced();
    let W = 0;
    let H = 0;
    let DPR = 1;
    let raf = 0;
    let running = false;
    let last = 0;
    let time = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, px: -999, py: -999, tpx: -999, tpy: -999 };

    const size = () => {
      W = host.clientWidth;
      H = host.clientHeight;
      DPR = 1; // clouds are soft; full-resolution canvas costs more than it shows
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
    };

    // Bake each layer's blur into its sprites once, so drawing a frame is just a few image copies.
    const bake = (src: HTMLCanvasElement, blur: number) => {
      if (!blur) return src;
      const pad = blur * 3;
      const c = document.createElement("canvas");
      c.width = src.width + pad * 2;
      c.height = src.height + pad * 2;
      const g = c.getContext("2d")!;
      g.filter = `blur(${blur * 1.6}px)`;
      g.drawImage(src, pad, pad);
      const out = document.createElement("canvas");
      out.width = src.width;
      out.height = src.height;
      out.getContext("2d")!.drawImage(c, pad, pad, src.width, src.height, 0, 0, src.width, src.height);
      return out;
    };
    const sprites = CLOUD_LAYERS.map((L, li) => [0, 1, 2, 3].map((k) => bake(makeCloudSprite(900 + li * 31 + k * 7, L.tint), L.blur)));
    const rndC = seeded(31337);
    const clouds = CLOUD_LAYERS.map((L, li) =>
      Array.from({ length: L.count }, (_, k) => ({
        x: (k + rndC() * 0.6) / L.count,
        dy: (rndC() - 0.5) * 0.05,
        s: 0.8 + rndC() * 0.5,
        img: sprites[li][Math.floor(rndC() * 4)],
        flip: rndC() < 0.5,
      }))
    );

    const draw = () => {
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const small = W < 640;

      CLOUD_LAYERS.forEach((L, li) => {
        const cw = (small ? W * 0.75 : W * 0.32) * L.scale;
        const ch = cw / 2;
        const span = W + cw * 1.2;
        ctx.globalAlpha = L.alpha;
        for (const cl of clouds[li]) {
          const w = cw * cl.s;
          const h = ch * cl.s;
          const x = ((((cl.x * span + (time / 1000) * L.speed) % span) + span) % span) - cw * 0.6 + mouse.x * -L.par;
          const y = (L.y + cl.dy) * H - h * 0.7 + mouse.y * -L.par * 0.4 + Math.sin(time * 0.0004 + cl.x * 9) * 3;
          if (cl.flip) {
            ctx.save();
            ctx.translate(x + w, y);
            ctx.scale(-1, 1);
            ctx.drawImage(cl.img, 0, 0, w, h);
            ctx.restore();
          } else {
            ctx.drawImage(cl.img, x, y, w, h);
          }
        }
      });
      ctx.filter = "none";
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      time += dt;
      const ease = 1 - Math.exp(-dt / 400);
      mouse.x += (mouse.tx - mouse.x) * ease;
      mouse.y += (mouse.ty - mouse.y) * ease;
      const ease2 = 1 - Math.exp(-dt / 160);
      mouse.px += (mouse.tpx - mouse.px) * ease2;
      mouse.py += (mouse.tpy - mouse.py) * ease2;
      if (blobsRef.current) blobsRef.current.style.transform = `translate3d(${mouse.x * -24}px, ${mouse.y * -18}px, 0)`;
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${mouse.px - 260}px, ${mouse.py - 260}px, 0)`;
      draw();
      if (running) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
      const r = host.getBoundingClientRect();
      mouse.tpx = e.clientX - r.left;
      mouse.tpy = e.clientY - r.top;
      if (mouse.px < -900) {
        mouse.px = mouse.tpx;
        mouse.py = mouse.tpy;
      }
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
    };

    size();
    draw();
    const io = new IntersectionObserver(([e]) => {
      if (still) return;
      if (e.isIntersecting && !running) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(tick);
      } else if (!e.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(host);
    window.addEventListener("resize", size);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", size);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[100svh] min-h-[640px] overflow-hidden"
      style={{ maskImage: "linear-gradient(to bottom, #000 90%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, #000 90%, transparent)" }}
    >
      <div ref={blobsRef} className="absolute inset-0 will-change-transform">
        <span className="st-blob st-blob-a" />
        <span className="st-blob st-blob-b" />
        <span className="st-blob st-blob-c" />
        <span className="st-blob st-blob-d" />
      </div>
      <div
        ref={cursorRef}
        className="absolute left-0 top-0 h-[520px] w-[520px] rounded-full opacity-0 transition-opacity duration-700"
        style={{ background: "radial-gradient(closest-side, rgba(92,225,255,0.28), rgba(31,111,235,0.12) 45%, rgba(31,111,235,0) 75%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(60% 55% at 50% 98%, rgba(255,255,255,0.95) 0%, rgba(170,225,255,0.6) 18%, rgba(92,150,255,0.22) 45%, rgba(92,120,255,0) 100%)" }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
      {SPARKS.map((sp, i) => (
        <GeminiSpark
          key={i}
          size={sp.s}
          className="st-spark absolute"
          style={{ left: `${sp.x}%`, top: `${sp.y}%`, animationDelay: `${sp.d}s` }}
        />
      ))}
      <div className="absolute inset-0" style={{ background: "radial-gradient(50% 42% at 50% 42%, rgba(246,248,252,0.78), rgba(246,248,252,0) 78%)" }} />
    </div>
  );
}

/* ---------- spotlight (hero + product stories) ---------- */

const byId = (id: string) => SYSTEMS.find((s) => s.id === id)!;

const STORIES = [
  {
    key: "Studio",
    label: "Depup Studio",
    title: `${countWord(SYSTEMS.length)} live products. One studio.`,
    body: "Software, infrastructure and useful tools — designed, built and run in-house.",
    specs: [
      ["Live products", String(SYSTEMS.length)],
      ["Available on", "Web · Android"],
      ["Base", STUDIO.city.split(",")[0]],
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
  const idxRef = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const go = useCallback((d: number) => setIdx((i) => (i + d + STORIES.length) % STORIES.length), []);
  idxRef.current = idx;

  // One clock drives both the progress bar and the story change, so they can never drift apart.
  // Hovering, the pause button, leaving the viewport or a hidden tab all freeze it in place.
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const elapsed = useRef(0);
  const holdRef = useRef(false);
  const visibleRef = useRef(true);
  const [onScreen, setOnScreen] = useState(true);
  holdRef.current = paused || hover || !onScreen;

  useEffect(() => {
    elapsed.current = 0;
    barRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.transition = i === idx ? "none" : "transform 600ms cubic-bezier(.22,1,.36,1)";
      el.style.transform = `scaleX(${i < idx ? 1 : 0})`;
    });
    if (reduced()) {
      const el = barRefs.current[idx];
      if (el) el.style.transform = "scaleX(1)";
    }
  }, [idx]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced()) return;
    let raf = 0;
    let last = 0;
    const onVis = () => (visibleRef.current = document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    const tick = (now: number) => {
      const dt = last ? Math.min(1000, now - last) : 0;
      last = now;
      if (!holdRef.current && visibleRef.current) elapsed.current += dt;
      const p = Math.min(1, elapsed.current / STORY_MS);
      const el = barRefs.current[idxRef.current];
      if (el) el.style.transform = `scaleX(${p})`;
      if (p >= 1) {
        elapsed.current = 0;
        go(1);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [go]);

  // Apple-style scroll: the stage grows to full width while the headline drifts back.
  // Values ease toward the scroll position (no jumps between wheel steps) and only
  // transform/opacity change, so the browser never has to repaint the large stage.
  useEffect(() => {
    if (reduced()) return;
    const stage = stageRef.current;
    const anchor = stage?.parentElement;
    if (!stage || !anchor) return;
    let raf = 0;
    let running = false;
    let last = 0;
    let anchorTop = 0;
    let vh = window.innerHeight;
    const cur = { p: 0, y: 0 };
    const measure = () => {
      vh = window.innerHeight;
      anchorTop = anchor.getBoundingClientRect().top + window.scrollY;
    };
    const target = () => {
      const sy = window.scrollY;
      return { p: Math.min(1, Math.max(0, (vh - (anchorTop - sy)) / (vh * 0.9))), y: Math.min(sy, vh) };
    };
    const apply = () => {
      stage.style.transform = `translate3d(0,0,0) scale(${0.9 + 0.1 * cur.p})`;
      if (copyRef.current) {
        copyRef.current.style.transform = `translate3d(0, ${cur.y * 0.18}px, 0)`;
        copyRef.current.style.opacity = String(1 - Math.min(0.7, cur.y / (vh * 1.1)));
      }
    };
    const tick = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      const t = target();
      const k = 1 - Math.exp(-dt / 110);
      cur.p += (t.p - cur.p) * k;
      cur.y += (t.y - cur.y) * k;
      apply();
      if (Math.abs(t.p - cur.p) < 0.0004 && Math.abs(t.y - cur.y) < 0.3) {
        cur.p = t.p;
        cur.y = t.y;
        apply();
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      measure();
      kick();
    };
    measure();
    Object.assign(cur, target());
    apply();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const s = STORIES[idx];

  return (
    <section id="spotlight" className={`relative pb-20 pt-32 md:pb-28 md:pt-40 ${ready ? "st-ready" : ""}`}>
      <HeroAurora />
      <div ref={copyRef} className={`${wrap} relative z-10 text-center will-change-transform`}>
        <p className={`${eyebrow} text-[#0057C3]`}>
          <Words text={`Independent systems studio · ${STUDIO.city.split(",")[0]}`} step={40} />
        </p>
        <h1 className="mx-auto mt-6 max-w-[1000px] font-display text-[clamp(52px,9vw,128px)] font-semibold leading-[0.98] tracking-[-0.045em]">
          <Words text="One studio." start={150} />
          <br />
          <span className="text-[#0057C3]"><Words text="Made to move." start={400} wordClass="st-shimmer" /></span>
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
            className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-6 py-3.5 text-[15px] font-medium backdrop-blur-md transition-colors duration-300 hover:border-black/30 hover:bg-white"
          >
            Meet the studio
          </a>
        </div>
      </div>

      <div className="relative z-10 mt-16 px-3 md:mt-24 md:px-6">
        <div
          ref={stageRef}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative mx-auto max-w-[1400px] origin-top overflow-hidden bg-[#061634] text-[#F3F6FC] will-change-transform"
          style={{ transform: "scale(0.9)", borderRadius: 32, background: "linear-gradient(155deg, #0B3A8C 0%, #0A2463 42%, #061634 100%)", backfaceVisibility: "hidden" }}
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

          <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-7 py-5 md:px-16">
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
                  <span className="relative h-[3px] overflow-hidden rounded-full bg-white/15">
                    <span
                      ref={(el) => {
                        barRefs.current[i] = el;
                      }}
                      className={`absolute inset-0 origin-left rounded-full will-change-transform ${
                        i === idx ? "bg-gradient-to-r from-[#8AB4FF] to-[#F3F6FC] shadow-[0_0_10px_rgba(138,180,255,0.7)]" : "bg-white/45"
                      }`}
                      style={{ transform: `scaleX(${i < idx ? 1 : 0})` }}
                    />
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
/**
 * Real app icons. Add a file to /public/logos/<id>.svg (or .png) and list it here
 * with `src` to show the actual logo; `bg` + `glyph` recreates a simple mark.
 * Systems without an entry fall back to a category icon.
 */
const APP_LOGOS: Record<string, { src?: string; bg?: string; glyph?: LucideIcon }> = {
  office: { src: "/office-logo.svg" },
  cloud: { bg: "#7C4DFF", glyph: ArrowBigUp },
  sentinel: { bg: "#8B6CF6", glyph: Shield },
};

function AppIcon({
  id,
  category,
  tone,
  className,
  glyphClass,
}: {
  id: string;
  category: Category;
  tone: "dark" | "light";
  className: string;
  glyphClass: string;
}) {
  const logo = APP_LOGOS[id];
  if (logo?.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logo.src} alt="" aria-hidden className={`${className} object-cover`} draggable={false} />;
  }
  if (logo?.bg && logo.glyph) {
    const G = logo.glyph;
    return (
      <span className={`${className} grid place-items-center text-white`} style={{ background: logo.bg }}>
        <G className={glyphClass} strokeWidth={2} aria-hidden />
      </span>
    );
  }
  const Icon = iconFor(id, category);
  return (
    <span
      className={`${className} grid place-items-center ${
        tone === "dark" ? "border border-white/15 bg-white/[0.08] text-[#8AB4FF] backdrop-blur-md" : "bg-[#0057C3]/[0.08] text-[#0057C3]"
      }`}
    >
      <Icon className={glyphClass} strokeWidth={1.75} aria-hidden />
    </span>
  );
}

const shortName = (name: string) => name.split(" & ")[0].replace(/ Dev Edition$/, "");

const tileColor = (hex: string) => (hex.toLowerCase() === "#e2e2e6" ? "#8AB4FF" : hex);

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

const HOLO = "#5CE1FF";

/* Galaxy: stars in spiral arms, an accretion disk and nebula clouds, drawn on one canvas. */
type Star = { r: number; a: number; y: number; size: number; tw: number };
const STAR_COLORS = ["#FFF6E6", "#BFE6FF", "#7FA8FF", "#B59BFF"];
const DISK_COLORS = ["#FFFFFF", "#CDEFFF", "#8FD3FF", "#C9B5FF"];
const NEBULA = [
  { c: "31,111,235", x: -0.35, y: -0.1, r: 0.9 },
  { c: "124,77,255", x: 0.4, y: 0.12, r: 0.8 },
  { c: "92,225,255", x: 0.05, y: 0.25, r: 0.6 },
  { c: "11,58,140", x: -0.1, y: -0.35, r: 1.1 },
  { c: "160,120,255", x: -0.55, y: 0.3, r: 0.55 },
  { c: "60,150,255", x: 0.6, y: -0.3, r: 0.6 },
];

const gauss = (rnd: () => number) => {
  const u = rnd() || 1e-6;
  const v = rnd();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};
const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

function makeGalaxy(count: number, diskCount: number) {
  const rnd = seeded(20261125);
  const arms = 3;
  const groups: Star[][] = STAR_COLORS.map(() => []);
  for (let i = 0; i < count; i++) {
    const t = Math.pow(rnd(), 0.7);
    const r = 0.1 + 0.9 * t;
    const arm = i % arms;
    const a = (arm * Math.PI * 2) / arms + r * 4.4 + gauss(rnd) * 0.32 * (1 - 0.35 * t);
    const ci = t < 0.18 ? 0 : t < 0.5 ? (rnd() < 0.6 ? 1 : 0) : t < 0.8 ? (rnd() < 0.6 ? 2 : 1) : rnd() < 0.55 ? 3 : 2;
    groups[ci].push({ r, a, y: gauss(rnd) * 0.03 * (1 - 0.5 * t), size: rnd() < 0.05 ? 2 : 0.7 + rnd() * 0.9, tw: rnd() * Math.PI * 2 });
  }
  const disk: Star[][] = DISK_COLORS.map(() => []);
  for (let i = 0; i < diskCount; i++) {
    const r = 1.2 + Math.pow(rnd(), 2.2) * 2.2; // in black-hole radii, dense near the hole
    disk[Math.floor(rnd() * DISK_COLORS.length)].push({ r, a: rnd() * Math.PI * 2, y: gauss(rnd) * 0.04, size: 0.8 + rnd() * 1.2, tw: rnd() * Math.PI * 2 });
  }
  const dust: (Star & { c: number })[] = [];
  for (let i = 0; i < 260; i++) {
    const t = Math.pow(rnd(), 0.85);
    const r = 0.12 + 0.85 * t;
    const arm = i % arms;
    dust.push({
      r,
      a: (arm * Math.PI * 2) / arms + r * 4.4 + gauss(rnd) * 0.22,
      y: gauss(rnd) * 0.02,
      size: 0.05 + rnd() * 0.09,
      tw: rnd() * Math.PI * 2,
      c: t < 0.3 ? 0 : t < 0.65 ? 1 : 2,
    });
  }
  return { groups, disk, dust };
}

function makeBlob(rgb: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, `rgba(${rgb},0.55)`);
  grad.addColorStop(0.45, `rgba(${rgb},0.18)`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  return c;
}

function Constellation() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tileRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const orbRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const glassRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const copyA = useRef<HTMLDivElement>(null);
  const copyB = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const n = SYSTEMS.length;
  const [selected, setSelected] = useState<number | null>(null);
  const selectedRef = useRef<number | null>(null);
  const fx = useRef<{ wave: (x: number, y: number, power?: number, color?: string) => void }>({ wave: () => {} });
  useEffect(() => {
    selectedRef.current = selected;
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!section || !stage || !canvas || !ctx) return;
    const still = reduced();

    let raf = 0;
    let running = false;
    let last = 0;
    let cur = 0;
    let yawT = 0;
    let time = 0;
    let W = 0;
    let H = 0;
    let CY = 0;
    let R = 300; // app orbit radius
    let G = 500; // galaxy radius
    let BH = 60; // black-hole radius
    let DPR = 1;
    let orbitScale = 1;
    const F = 900;
    let nodes: { a: number; r: number; ex: number; ey: number }[] = [];
    let galaxy = makeGalaxy(2600, 0);
    const dustImgs = ["120,200,255", "60,120,255", "150,110,255"].map(makeBlob);
    const blobs = NEBULA.map((b) => ({ ...b, img: makeBlob(b.c) }));

    // Click effects: shockwaves that push stars, spark bursts and a black-hole flare.
    type Puff = { a: number; d: number; s: number; o: number; c: number };
    const waves: { x: number; y: number; t: number; power: number; color: string; puffs: Puff[] }[] = [];
    const clickImgs = ["160,225,255", "90,150,255", "170,140,255"].map(makeBlob);
    const WAVE_MS = 1500;
    let clickR = 170;
    const waveRadius = (age: number, power: number) => clickR * power * (1 - Math.pow(1 - Math.min(1, age / WAVE_MS), 3));
    const makePuffs = (count: number): Puff[] =>
      Array.from({ length: count }, () => ({
        a: Math.random() * Math.PI * 2,
        d: 0.25 + Math.random() * 0.75,
        s: 0.5 + Math.random() * 0.7,
        o: 0.5 + Math.random() * 0.5,
        c: Math.floor(Math.random() * 3),
      }));
    let sparks: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = [];
    let flare = 0;
    fx.current.wave = (x, y, power = 1, color = HOLO) => {
      waves.push({ x, y, t: time, power, color, puffs: makePuffs(9) });
      if (waves.length > 5) waves.shift();
      const count = Math.round(18 * power);
      for (let k = 0; k < count; k++) {
        const a = Math.random() * Math.PI * 2;
        const v = (0.03 + Math.random() * 0.13) * power;
        sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, color: Math.random() < 0.45 ? "#FFFFFF" : color });
      }
      if (Math.hypot(x - W / 2, y - CY) < BH * 2.4) {
        flare = 1;
        waves.push({ x: W / 2, y: CY, t: time + 120, power: 1.3, color: "#BFE6FF", puffs: makePuffs(12) });
      }
    };

    const computeLayout = () => {
      W = stage.clientWidth;
      H = stage.clientHeight;
      const small = W < 640;
      orbitScale = small ? 0.7 : 1;
      CY = H * 0.57;
      R = small ? Math.min(W * 0.4, 165) : Math.min(W * 0.3, 400);
      G = small ? Math.max(W, H) * 0.55 : Math.max(W * 0.5, 620);
      BH = small ? 28 : 52;
      clickR = small ? 110 : 170;
      DPR = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      if (small && galaxy.groups.flat().length > 1500) galaxy = makeGalaxy(1300, 0);
      const tile = small ? 60 : 76;
      const gap = small ? 26 : 40;
      const cols = Math.min(n, small ? 3 : Math.min(6, Math.ceil(Math.sqrt(n * 1.8))));
      const rows = Math.ceil(n / cols);
      const cell = tile + gap;
      const outer = n <= 4 ? n : Math.ceil(n * 0.6);
      nodes = SYSTEMS.map((_, i) => {
        const onOuter = i < outer;
        const k = onOuter ? i : i - outer;
        const count = onOuter ? outer : Math.max(1, n - outer);
        const row = Math.floor(i / cols);
        const inRow = row === rows - 1 ? n - row * cols : cols;
        return {
          a: (k / count) * Math.PI * 2 + (onOuter ? 0 : Math.PI / count),
          r: onOuter ? 1 : 0.62,
          ex: ((i % cols) - (inRow - 1) / 2) * cell,
          ey: (row - (rows - 1) / 2) * (cell + (small ? 14 : 18)) + (small ? -10 : 0),
        };
      });
    };

    const targetProgress = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      return clamp01(-rect.top / Math.max(1, total));
    };

    // Accretion disk rings: random dash pattern per ring gives moving streaks.
    const diskRings = Array.from({ length: 52 }, (_, k) => {
      const rnd = seeded(7 + k * 13);
      return { u: k / 51, dash: 1.2 + rnd() * 2.2, gap: 0.02 + rnd() * 0.12, phase: rnd() * 1000 };
    });
    const haloRings = Array.from({ length: 22 }, (_, k) => {
      const rnd = seeded(101 + k * 7);
      return { u: k / 21, dash: 1.4 + rnd() * 2.4, gap: 0.02 + rnd() * 0.1, phase: rnd() * 1000 };
    });
    const tone = (u: number) => {
      // white-hot inside, Depup blue and violet toward the edge
      const stops: [number, number, number][] = [
        [255, 255, 255],
        [214, 238, 255],
        [140, 196, 255],
        [92, 124, 255],
        [124, 77, 255],
      ];
      const x = Math.min(0.999, Math.max(0, u)) * (stops.length - 1);
      const i = Math.floor(x);
      const f = x - i;
      const A = stops[i];
      const B = stops[i + 1];
      return [A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f, A[2] + (B[2] - A[2]) * f].map(Math.round).join(",");
    };

    const drawBlackHole = (x: number, y: number, bh: number, alpha: number) => {
      const INNER = 1.5;
      const OUTER = 5.8;
      const FLAT = 0.13;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-0.09);
      ctx.globalCompositeOperation = "lighter";

      const glow = ctx.createRadialGradient(0, 0, bh * 0.95, 0, 0, bh * 6.5);
      glow.addColorStop(0, "rgba(220,240,255,0.22)");
      glow.addColorStop(0.25, "rgba(110,160,255,0.16)");
      glow.addColorStop(1, "rgba(60,80,255,0)");
      ctx.globalAlpha = alpha;
      ctx.fillStyle = glow;
      ctx.fillRect(-bh * 6.5, -bh * 6.5, bh * 13, bh * 13);

      const strokeRing = (r: number, ry: number, from: number, to: number, u: number, a: number, seed: { dash: number; gap: number; phase: number }, width: number) => {
        const col = tone(u);
        // Doppler beaming: the side moving toward us (left) is brighter.
        const g = ctx.createLinearGradient(-r, 0, r, 0);
        g.addColorStop(0, `rgba(${col},${Math.min(1, a * 1.4)})`);
        g.addColorStop(0.5, `rgba(${col},${a})`);
        g.addColorStop(1, `rgba(${col},${a * 0.35})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = width;
        ctx.setLineDash([r * seed.dash, r * seed.gap]);
        ctx.lineDashOffset = -(time * 0.05 * Math.sqrt((bh * 2) / r) + seed.phase);
        ctx.beginPath();
        ctx.ellipse(0, 0, r, ry, 0, from, to);
        ctx.stroke();
      };

      const step = ((OUTER - INNER) * bh) / diskRings.length;
      const disk = (front: boolean) => {
        for (const ring of diskRings) {
          const r = bh * (INNER + (OUTER - INNER) * Math.pow(ring.u, 1.35));
          const a = alpha * (0.03 + 0.3 * Math.pow(1 - ring.u, 1.8));
          strokeRing(r, r * FLAT, front ? 0 : Math.PI, front ? Math.PI : Math.PI * 2, ring.u * 0.95, a, ring, Math.max(1, step * 1.1));
        }
      };

      // 1. far side of the disk, behind the hole
      disk(false);
      // 2. lensed image of the far side, bent up over the top of the shadow
      for (const ring of haloRings) {
        const r = bh * (1.05 + 0.75 * Math.pow(ring.u, 1.15));
        const a = alpha * (0.1 + 0.75 * Math.pow(1 - ring.u, 1.3));
        strokeRing(r, r * 0.98, Math.PI - 0.28, Math.PI * 2 + 0.28, ring.u * 0.8, a, ring, Math.max(1.2, bh * 0.075));
      }
      // soft glow behind the lensed arc
      const arcGlow = ctx.createRadialGradient(0, 0, bh * 1.02, 0, 0, bh * 1.9);
      arcGlow.addColorStop(0, "rgba(225,242,255,0.5)");
      arcGlow.addColorStop(1, "rgba(120,170,255,0)");
      ctx.globalAlpha = alpha;
      ctx.fillStyle = arcGlow;
      ctx.beginPath();
      ctx.arc(0, 0, bh * 1.9, Math.PI, Math.PI * 2);
      ctx.fill();
      // 3. fainter secondary image under the bottom
      for (let k = 0; k < 6; k++) {
        const r = bh * (1.05 + 0.05 * k);
        strokeRing(r, r * 0.97, 0.15, Math.PI - 0.15, 0.1 + k * 0.08, alpha * (0.28 - k * 0.04), haloRings[k], bh * 0.05);
      }
      ctx.setLineDash([]);

      // 4. the shadow itself
      ctx.globalCompositeOperation = "source-over";
      const shade = ctx.createRadialGradient(0, 0, bh * 0.7, 0, 0, bh * 1.02);
      shade.addColorStop(0, "rgba(0,0,0,1)");
      shade.addColorStop(0.92, "rgba(0,0,0,1)");
      shade.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.globalAlpha = Math.min(1, alpha * 1.2);
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.arc(0, 0, bh * 1.02, 0, Math.PI * 2);
      ctx.fill();

      // 5. photon ring hugging the shadow
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = alpha;
      ctx.shadowColor = "rgba(190,230,255,0.9)";
      ctx.shadowBlur = bh * 0.35;
      ctx.strokeStyle = "rgba(240,250,255,0.95)";
      ctx.lineWidth = Math.max(1, bh * 0.035);
      ctx.beginPath();
      ctx.arc(0, 0, bh * 1.03, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 6. near side of the disk, crossing in front of the hole
      disk(true);
      ctx.setLineDash([]);
      ctx.restore();
      ctx.globalCompositeOperation = "lighter";
    };

    const drawGalaxy = (p: number, tilt: number, boot: number, gather: number, flash: number) => {
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);
      const cx = W / 2;
      const spin = time * 0.00009 + p * 0.9;
      const gScale = (0.55 + 0.45 * boot) * (1 + 0.35 * gather);
      const gAlpha = boot * (1 - 0.6 * gather);

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      // Nebula clouds drift slowly.
      blobs.forEach((b, i) => {
        const dx = Math.sin(time * 0.00006 + i * 1.7) * 30;
        const dy = Math.cos(time * 0.00005 + i) * 20;
        const size = b.r * G * 1.6 * gScale;
        ctx.globalAlpha = (0.25 + 0.2 * boot) * (1 - 0.3 * gather);
        ctx.drawImage(b.img, cx + b.x * G * gScale - size / 2 + dx, CY + b.y * G * 0.6 * gScale - size / 2 + dy, size, size);
      });

      const project = (ox: number, oy: number, oz: number) => {
        const y1 = oy * cosT + oz * sinT;
        const zz = -oy * sinT + oz * cosT;
        const s = F / (F + zz);
        return { x: cx + ox * s, y: CY + y1 * s, s, zz };
      };

      // Soft dust clouds trace the arms.
      for (const d of galaxy.dust) {
        const ang = d.a + spin / (0.25 + d.r);
        const rr = d.r * G * gScale;
        const P = project(Math.cos(ang) * rr, Math.sin(ang) * rr, d.y * G);
        const size = d.size * G * gScale * P.s * 2;
        ctx.globalAlpha = gAlpha * 0.22 * (0.7 + 0.3 * Math.sin(time * 0.0007 + d.tw));
        ctx.drawImage(dustImgs[d.c], P.x - size / 2, P.y - size * 0.35, size, size * 0.7);
      }

      // Spiral arms: inner stars orbit faster (differential rotation).
      galaxy.groups.forEach((group, gi) => {
        ctx.fillStyle = STAR_COLORS[gi];
        for (const st of group) {
          const ang = st.a + spin / (0.25 + st.r);
          const rr = st.r * G * gScale;
          const P = project(Math.cos(ang) * rr, Math.sin(ang) * rr, st.y * G);
          let sx = P.x;
          let sy = P.y;
          for (const w of waves) {
            const age = time - w.t;
            if (age < 0) continue;
            const dx = sx - w.x;
            const dy = sy - w.y;
            const d = Math.hypot(dx, dy) || 1;
            const band = Math.exp(-((d - waveRadius(age, w.power)) ** 2) / 1600);
            const push = band * Math.max(0, 1 - age / WAVE_MS) * 12 * w.power;
            sx += (dx / d) * push;
            sy += (dy / d) * push;
          }
          const tw = 0.65 + 0.35 * Math.sin(time * 0.003 + st.tw);
          ctx.globalAlpha = Math.min(1, gAlpha * tw * Math.min(1, 0.5 + 0.6 * P.s) * (0.75 + 0.6 * (1 - st.r)));
          const sz = st.size * P.s;
          ctx.fillRect(sx - sz / 2, sy - sz / 2, sz, sz);
        }
      });

      // Gargantua-style black hole: lensed disk around a dark shadow.
      const bh = BH * (1 - gather) * (0.55 + 0.45 * boot);
      if (bh > 0.5) drawBlackHole(cx, CY, bh * (1 + 0.1 * flare), boot * (1 - 0.4 * gather));
      if (flare > 0.01 && bh > 0.5) {
        const fg = ctx.createRadialGradient(cx, CY, bh, cx, CY, bh * 7);
        fg.addColorStop(0, `rgba(230,245,255,${0.55 * flare})`);
        fg.addColorStop(0.3, `rgba(92,160,255,${0.25 * flare})`);
        fg.addColorStop(1, "rgba(60,80,255,0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = fg;
        ctx.fillRect(cx - bh * 7, CY - bh * 7, bh * 14, bh * 14);
      }

      // Click puffs: soft nebula clouds that bloom in the galaxy plane and fade.
      for (const w of waves) {
        const age = time - w.t;
        const k = age / WAVE_MS;
        if (age < 0 || k >= 1) continue;
        const r = waveRadius(age, w.power);
        const fade = Math.pow(1 - k, 1.5);
        const flat = Math.max(0.4, cosT);
        const core = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, Math.max(1, r * 0.9));
        core.addColorStop(0, `rgba(235,248,255,${0.65 * fade})`);
        core.addColorStop(0.4, `rgba(120,190,255,${0.2 * fade})`);
        core.addColorStop(1, "rgba(80,120,255,0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = core;
        ctx.save();
        ctx.translate(w.x, w.y);
        ctx.scale(1, flat);
        ctx.translate(-w.x, -w.y);
        ctx.beginPath();
        ctx.arc(w.x, w.y, Math.max(1, r * 0.9), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        for (const pf of w.puffs) {
          const dist = r * pf.d;
          const px = w.x + Math.cos(pf.a + k * 0.6) * dist;
          const py = w.y + Math.sin(pf.a + k * 0.6) * dist * flat;
          const size = 30 + r * pf.s;
          ctx.globalAlpha = Math.min(1, fade * 0.85 * pf.o * w.power);
          ctx.drawImage(clickImgs[pf.c], px - size / 2, py - (size * flat) / 2, size, size * flat);
        }
      }
      ctx.shadowBlur = 0;
      for (const sp of sparks) {
        ctx.globalAlpha = sp.life;
        ctx.fillStyle = sp.color;
        const z = 1.2 + 2.4 * sp.life;
        ctx.fillRect(sp.x - z / 2, sp.y - z / 2, z, z);
      }

      if (flash > 0.01) {
        const f = ctx.createRadialGradient(cx, CY, 0, cx, CY, Math.max(W, H) * 0.6);
        f.addColorStop(0, `rgba(200,235,255,${0.55 * flash})`);
        f.addColorStop(0.25, `rgba(92,160,255,${0.22 * flash})`);
        f.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = f;
        ctx.fillRect(0, 0, W, H);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const render = () => {
      const p = cur;
      const boot = easeInOut(range(p, 0, 0.16));
      const rise = easeInOut(range(p, 0.38, 0.64));
      const gather = easeInOut(range(p, 0.6, 0.88));
      const material = easeInOut(range(p, 0.68, 0.9));
      const settle = range(p, 0.84, 0.96);
      const spin = 1 - easeInOut(range(p, 0.5, 0.78));
      const flashT = range(p, 0.58, 0.76);
      const flash = Math.sin(flashT * Math.PI) * 0.9;
      const tilt = 1.2 - 0.78 * rise; // ~69deg -> ~24deg: the galaxy turns toward you
      const yaw = yawT + p * 2.4;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);

      drawGalaxy(p, tilt, boot, gather, flash);

      nodes.forEach((N, i) => {
        const a = N.a + yaw;
        const ox = Math.cos(a) * R * N.r;
        const oy = Math.sin(a) * R * N.r;
        const bob = Math.sin(time * 0.0011 + i * 1.3) * 6 * spin;
        const zz = -oy * sinT;
        const s = F / (F + zz);
        const px = ox * s;
        const py = oy * cosT * s + bob;
        const x = px + (N.ex - px) * gather;
        const y = py + (N.ey - py) * gather;
        const front = (Math.sin(a) * N.r + 1) / 2;
        const sc = (s * orbitScale * (0.78 + 0.22 * front) * (1 - gather) + gather) * (0.3 + 0.7 * boot);
        const sel = selectedRef.current;
        const op = boot * ((1 - gather) * (0.3 + 0.7 * front) + gather) * (sel !== null && sel !== i ? 0.35 : 1);
        const el = tileRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${sc * (sel === i ? 1.22 : 1)})`;
          el.style.opacity = String(op);
          el.style.zIndex = String(Math.round(100 + front * 100));
        }
        const orb = orbRefs.current[i];
        if (orb) orb.style.borderRadius = `${50 - 21 * material}%`;
        const ic = iconRefs.current[i];
        if (ic) ic.style.opacity = String(0.55 + 0.45 * material);
        const gl = glassRefs.current[i];
        if (gl) gl.style.opacity = String(1 - material);
        const lb = labelRefs.current[i];
        if (lb) lb.style.opacity = String(settle);
      });

      const tOut = easeInOut(range(p, 0.43, 0.5));
      const tIn = easeInOut(range(p, 0.5, 0.58));
      if (copyA.current) {
        copyA.current.style.opacity = String(1 - tOut);
        copyA.current.style.transform = `translate3d(0, ${-22 * tOut}px, 0)`;
        copyA.current.style.filter = `blur(${6 * tOut}px)`;
      }
      if (copyB.current) {
        copyB.current.style.opacity = String(tIn);
        copyB.current.style.transform = `translate3d(0, ${22 * (1 - tIn)}px, 0)`;
        copyB.current.style.filter = `blur(${6 * (1 - tIn)}px)`;
      }
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      time += dt;
      const target = targetProgress();
      // Damped follow keeps motion smooth even when the wheel jumps.
      cur += (target - cur) * (1 - Math.exp(-dt / 150));
      if (Math.abs(target - cur) < 0.0005) cur = target;
      yawT += dt * 0.0002 * (1 - easeInOut(range(cur, 0.5, 0.78))) * (selectedRef.current === null ? 1 : 0.15);
      flare *= Math.exp(-dt / 520);
      for (let k = waves.length - 1; k >= 0; k--) if (time - waves[k].t > WAVE_MS + 200) waves.splice(k, 1);
      const drag = Math.pow(0.93, dt / 16);
      for (const sp of sparks) {
        sp.x += sp.vx * dt;
        sp.y += sp.vy * dt;
        sp.vx *= drag;
        sp.vy *= drag;
        sp.life -= dt / 950;
      }
      sparks = sparks.filter((sp) => sp.life > 0);
      render();
      if (running) raf = requestAnimationFrame(tick);
    };

    computeLayout();
    cur = still ? 1 : targetProgress();
    render();

    const io = new IntersectionObserver(
      ([e]) => {
        if (still) return;
        if (e.isIntersecting && !running) {
          running = true;
          last = 0;
          raf = requestAnimationFrame(tick);
        } else if (!e.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(section);
    const onResize = () => {
      computeLayout();
      render();
    };
    window.addEventListener("resize", onResize);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [n]);

  return (
    <section ref={sectionRef} aria-label="The Depup ecosystem" className="relative h-[280vh] bg-[#02060F] text-[#F3F6FC] md:h-[330vh]">
      <div
        ref={stageRef}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest("[data-orb],[data-card],a,button")) return;
          const r = e.currentTarget.getBoundingClientRect();
          fx.current.wave(e.clientX - r.left, e.clientY - r.top, 1);
          setSelected(null);
        }}
        className="sticky top-0 h-[100svh] cursor-crosshair select-none overflow-hidden"
      >
        <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% 50%, transparent 55%, rgba(2,6,15,0.85) 100%)" }} />

        <div className="absolute left-1/2" style={{ top: "57%" }}>
          {SYSTEMS.map((s, i) => {
            const color = tileColor(ACCENT_HEX[s.accent]);
            const glow = APP_LOGOS[s.id]?.bg ?? (APP_LOGOS[s.id]?.src ? "#0037FF" : color);
            return (
              <a
                key={s.id}
                href={safeHref(s.href)}
                ref={(el) => {
                  tileRefs.current[i] = el;
                }}
                aria-label={`About ${s.name}`}
                data-orb
                onClick={(e) => {
                  e.preventDefault();
                  const st = stageRef.current?.getBoundingClientRect();
                  const o = orbRefs.current[i]?.getBoundingClientRect();
                  if (st && o) fx.current.wave(o.left + o.width / 2 - st.left, o.top + o.height / 2 - st.top, 0.8, glow);
                  setSelected((v) => (v === i ? null : i));
                }}
                className="group absolute left-0 top-0 flex cursor-pointer flex-col items-center will-change-transform"
                style={{ opacity: 0 }}
              >
                <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[12px] text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100">
                  {shortName(s.name)}
                </span>
                {selected === i && (
                  <span aria-hidden className="st-select pointer-events-none absolute left-1/2 top-0 h-[60px] w-[60px] -translate-x-1/2 rounded-full sm:h-[76px] sm:w-[76px]" style={{ color: glow }} />
                )}
                <span
                  ref={(el) => {
                    orbRefs.current[i] = el;
                  }}
                  className="relative block h-[60px] w-[60px] overflow-hidden transition-transform duration-500 group-hover:scale-110 sm:h-[76px] sm:w-[76px]"
                  style={{ borderRadius: "50%", boxShadow: `0 0 40px -6px ${glow}cc, 0 0 90px -20px ${HOLO}88` }}
                >
                  <span
                    ref={(el) => {
                      iconRefs.current[i] = el;
                    }}
                    className="block h-full w-full"
                  >
                    <AppIcon id={s.id} category={s.category} tone="dark" className="block h-full w-full" glyphClass="h-7 w-7 sm:h-9 sm:w-9" />
                  </span>
                  <span
                    ref={(el) => {
                      glassRefs.current[i] = el;
                    }}
                    aria-hidden
                    className="st-orb pointer-events-none absolute inset-0"
                    style={{ borderRadius: "inherit" }}
                  />
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
        </div>

        {selected !== null &&
          (() => {
            const s = SYSTEMS[selected];
            const color = tileColor(ACCENT_HEX[s.accent]);
            return (
              <div data-card className="absolute inset-x-4 bottom-20 z-[300] mx-auto max-w-[380px] md:inset-x-auto md:bottom-auto md:right-10 md:top-1/2 md:w-[360px] md:-translate-y-1/2">
                <div
                  key={s.id}
                  className="st-swap rounded-[24px] border border-white/15 bg-[#06122B]/75 p-5 text-left backdrop-blur-xl"
                  style={{ boxShadow: `0 30px 80px -30px ${color}aa, inset 0 1px 0 rgba(255,255,255,0.08)` }}
                >
                  <div className="flex items-start gap-3">
                    <AppIcon id={s.id} category={s.category} tone="dark" className="block h-12 w-12 shrink-0 overflow-hidden rounded-[14px]" glyphClass="h-6 w-6" />
                    <div className="min-w-0 flex-1">
                      <p className="font-obs-mono text-[11px] uppercase tracking-[0.1em] text-[#5CE1FF]">DEPUP / {s.num}</p>
                      <h3 className="mt-1 font-display text-[20px] font-semibold leading-tight tracking-[-0.015em]">{s.name}</h3>
                      <p className="mt-0.5 text-[13px] text-[#A9B8D6]">{s.badge}</p>
                    </div>
                    <button
                      type="button"
                      aria-label="Close"
                      onClick={() => setSelected(null)}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-[#C9D5EC] transition-colors hover:border-white/40 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-4 text-[14px] leading-[1.6] text-[#C9D5EC]">{s.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.tags.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[12px] text-[#C9D5EC]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <SmartLink
                    href={safeHref(s.href)}
                    className="group mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0057C3] px-5 text-[14px] font-medium text-white transition-colors hover:bg-[#1F6FEB]"
                  >
                    {s.cta}
                    <ArrowRight className="st-arrow h-4 w-4" />
                  </SmartLink>
                </div>
              </div>
            );
          })()}

        <div className={`${wrap} pointer-events-none absolute inset-x-0 top-[12vh] z-[250] text-center md:top-[10vh]`}>
          <div ref={copyA} className="absolute inset-x-0">
            <p className={`${eyebrow} text-[#5CE1FF]`}>The Depup ecosystem</p>
            <h2 className="mx-auto mt-4 max-w-[760px] font-display text-[clamp(30px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Every project starts as its own idea.
            </h2>
          </div>
          <div ref={copyB} className="absolute inset-x-0" style={{ opacity: 0 }}>
            <p className={`${eyebrow} text-[#5CE1FF]`}>{n} live products · more on the way</p>
            <h2 className="mx-auto mt-4 max-w-[760px] font-display text-[clamp(30px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Then they move as one studio.
            </h2>
          </div>
        </div>

        <div className={`${wrap} absolute inset-x-0 bottom-8 z-[250] flex items-center gap-4`}>
          <span className="font-obs-mono text-[11px] uppercase tracking-[0.1em] text-[#8FA3C7]">
            Scroll<span className="hidden md:inline"> · Click space or a planet</span>
          </span>
          <div className="h-px flex-1 overflow-hidden rounded-full bg-white/15">
            <div ref={barRef} className="h-full origin-left rounded-full" style={{ transform: "scaleX(0)", background: `linear-gradient(90deg, #1F6FEB, ${HOLO})` }} />
          </div>
          <a href="#ecosystem" className="font-obs-mono text-[11px] uppercase tracking-[0.1em] text-[#C9D5EC] hover:text-white">
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
                <AppIcon
                  id={s.id}
                  category={s.category}
                  tone="light"
                  className="block h-11 w-11 overflow-hidden rounded-[12px] transition-transform duration-500 group-hover:scale-110"
                  glyphClass="h-5 w-5"
                />
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
          <div className={`st-reveal flex items-center gap-2 ${view.atStart && view.atEnd ? "invisible" : ""}`} style={EASE_DELAY(160)}>
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
                <div className="relative h-[200px] overflow-hidden bg-[#061634] text-[#F3F6FC]">
                  {u.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={u.image}
                      alt={`${u.title} preview`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1200ms] group-hover:scale-[1.06]"
                      style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
                    />
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, rgba(6,22,52,0.92) 0%, rgba(6,22,52,0.35) 45%, rgba(6,22,52,0) 75%), radial-gradient(80% 90% at 80% 20%, ${color}33, transparent 65%)` }}
                  />
                  <span className="absolute bottom-4 left-6 font-display text-[52px] font-semibold leading-none tracking-[-0.04em] drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]">{u.num}</span>
                  <span className="absolute right-4 top-4 rounded-full bg-[#061634]/70 px-3 py-1 font-obs-mono text-[11px] uppercase tracking-[0.1em] text-[#E3EBFA] backdrop-blur-md">
                    {u.area}
                  </span>
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

        <div className={`mt-4 h-[2px] overflow-hidden rounded-full bg-black/[0.07] ${view.ratio >= 0.999 ? "invisible" : ""}`}>
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
          {LIVE_NOTES.map((n, i) => {
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
    title: "Products",
    links: [
      { label: "depup.cloud", href: "https://depup.cloud" },
      { label: "depup Office", href: "/office" },
      { label: "Sentinel-ID", href: "/sentinel" },
    ],
  },
  {
    title: "Use them",
    links: [
      { label: "Open depup.cloud", href: "https://depup.cloud" },
      { label: "sentinel-id.net", href: "https://sentinel-id.net" },
      { label: "Get depup Office", href: "/office" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Sentinel safety approach", href: "/sentinel#safety" },
      { label: "Office privacy", href: "/office/privacy-policy" },
      { label: "API Status", href: "/api/status" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Ecosystem", href: "#ecosystem" },
      { label: "Field notes", href: "#notes" },
      { label: "Contact", href: `mailto:${STUDIO.email}` },
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
            <span className="text-[#5E6A80]">Connected by design.</span>
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
      <a
        href="#main"
        className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-full bg-[#0057C3] px-5 py-3 text-[14px] font-medium text-white shadow-lg transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <StudioNav />
      <main id="main" tabIndex={-1} className="outline-none">
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
