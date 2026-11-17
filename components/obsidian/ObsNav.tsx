"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Command, Menu, Search, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Systems", href: "#systems", section: "systems" },
  { label: "Cloud", href: "https://depup.cloud", external: true },
  { label: "Office", href: "/office" },
  { label: "Sentinel", href: "/sentinel" },
  { label: "Engineering", href: "#engineering", section: "engineering" },
  { label: "Mission", href: "#mission", section: "mission" },
];

const SECTIONS = ["top", "systems", "engineering", "updates", "notes", "mission"];

export function ObsNav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [active, setActive] = useState("top");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number; visible: boolean }>({ left: 0, width: 0, visible: false });

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Sliding highlight that follows hover, falling back to the active section.
  const target = hovered ?? LINKS.find((l) => l.section === active)?.label ?? null;
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const el = target ? nav.querySelector<HTMLElement>(`[data-label="${target}"]`) : null;
    if (!el) {
      setPill((p) => ({ ...p, visible: false }));
      return;
    }
    setPill({ left: el.offsetLeft, width: el.offsetWidth, visible: true });
  }, [target]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500 ${
        scrolled || open
          ? "border-white/12 bg-[rgba(22,22,23,0.72)] shadow-[0_1px_8px_rgba(0,0,0,0.4)] backdrop-blur-xl backdrop-saturate-[1.8]"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-6">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Depup Studio, back to top">
          <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-obs-titanium via-[#9a9aa1] to-[#3a3a3c] text-[15px] font-extrabold text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105">
            D
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </span>
          <span className="whitespace-nowrap text-[20px] font-semibold tracking-[-0.01em] text-obs-text">Depup Studio</span>
        </a>

        <nav
          ref={navRef}
          className="relative hidden items-center md:flex"
          onPointerLeave={() => setHovered(null)}
          aria-label="Primary"
        >
          <span
            aria-hidden="true"
            className="absolute top-1/2 h-8 -translate-y-1/2 rounded-full bg-white/[0.08] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ left: pill.left, width: pill.width, opacity: pill.visible ? 1 : 0 }}
          />
          {LINKS.map((link) => {
            const isActive = link.section === active;
            return (
              <a
                key={link.label}
                data-label={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                aria-current={isActive ? "location" : undefined}
                onPointerEnter={() => setHovered(link.label)}
                onFocus={() => setHovered(link.label)}
                onBlur={() => setHovered(null)}
                className={`relative z-10 rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
                  isActive ? "font-semibold text-obs-text" : "text-obs-muted hover:text-obs-text"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] py-1.5 pl-3 pr-1.5 text-[12px] text-obs-muted transition-colors hover:border-white/24 hover:text-obs-text lg:inline-flex"
            aria-label="Search systems (Command K)"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search</span>
            <kbd className="inline-flex items-center gap-0.5 rounded-full bg-white/10 px-1.5 py-0.5 font-obs-mono text-[10px] text-obs-text">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </button>
          <button
            type="button"
            onClick={onOpenPalette}
            className="grid h-8 w-8 place-items-center rounded-full text-obs-muted transition-colors hover:bg-white/10 hover:text-obs-text lg:hidden"
            aria-label="Search systems"
          >
            <Search className="h-4 w-4" />
          </button>
          <a
            href="https://depup.cloud"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-obs-titanium px-4 py-1 text-[12px] font-semibold text-black transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] sm:inline-flex"
          >
            Launch Cloud
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-8 w-8 place-items-center rounded-full bg-obs-sky text-[#002f66] transition-transform hover:scale-105 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* reading progress */}
      <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
        <div
          className="h-full origin-left bg-gradient-to-r from-obs-blue via-obs-sky to-obs-pink"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

    </header>

      {/* mobile sheet (outside header: backdrop-filter would trap fixed positioning) */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-black/80 backdrop-blur-2xl transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 pt-6" aria-label="Mobile">
          {LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-white/[0.06] py-4 text-[28px] font-semibold tracking-[-0.015em] text-obs-text transition-all duration-500"
              style={{
                transitionDelay: open ? `${80 + i * 45}ms` : "0ms",
                transform: open ? "none" : "translateY(12px)",
                opacity: open ? 1 : 0,
              }}
            >
              {link.label}
              {link.external && <ArrowUpRight className="h-5 w-5 text-obs-muted" />}
            </a>
          ))}
          <a
            href="https://depup.cloud"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex justify-center rounded-full bg-obs-titanium py-3 text-[14px] font-semibold text-black"
          >
            Launch Cloud
          </a>
        </nav>
      </div>
    </>
  );
}
