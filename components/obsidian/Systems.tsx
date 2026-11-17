"use client";

import { useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { ACCENT_TEXT, CATEGORIES, SYSTEMS, type Category, type SystemItem } from "./data";
import { trackSpot } from "./primitives";

type Filter = "all" | Category;

export function Systems({
  filter,
  onFilter,
  onOpen,
}: {
  filter: Filter;
  onFilter: (f: Filter) => void;
  onOpen: (id: string) => void;
}) {
  const chipsRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ left: 0, width: 0 });
  const visible = useMemo(() => SYSTEMS.filter((s) => filter === "all" || s.category === filter), [filter]);

  useLayoutEffect(() => {
    const measure = () => {
      const el = chipsRef.current?.querySelector<HTMLElement>(`[data-filter="${filter}"]`);
      if (!el) return;
      setThumb({ left: el.offsetLeft, width: el.offsetWidth });
      const track = chipsRef.current;
      if (track && track.scrollWidth > track.clientWidth) {
        track.scrollTo({ left: el.offsetLeft - track.clientWidth / 2 + el.offsetWidth / 2, behavior: "smooth" });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [filter]);

  const onKeyChips = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const idx = CATEGORIES.findIndex((c) => c.id === filter);
    const next = (idx + (e.key === "ArrowRight" ? 1 : -1) + CATEGORIES.length) % CATEGORIES.length;
    onFilter(CATEGORIES[next].id);
    chipsRef.current?.querySelector<HTMLElement>(`[data-filter="${CATEGORIES[next].id}"]`)?.focus();
  };

  return (
    <section id="systems" className="relative w-full bg-black py-24" aria-labelledby="systems-title">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="obs-reveal mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-1 block font-obs-mono text-[12px] uppercase tracking-[0.14em] text-obs-dim">One studio · Many systems</span>
            <h2 id="systems-title" className="text-[44px] font-bold leading-[48px] tracking-[-0.03em] text-white md:text-[72px] md:leading-[76px]">
              A system for every
              <br />
              kind of work.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-[22px] text-obs-muted">
            Explore the products and platforms we build across cloud, productivity, security, and creative tools.
          </p>
        </div>

        <div
          ref={chipsRef}
          role="tablist"
          aria-label="Filter systems"
          onKeyDown={onKeyChips}
          className="obs-reveal obs-noscroll relative mb-10 flex items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-black p-1 sm:inline-flex"
          style={{ ["--d" as string]: "80ms" }}
        >
          <span
            aria-hidden="true"
            className="absolute bottom-1 top-1 rounded-full bg-obs-titanium shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_10px_rgba(0,0,0,0.5)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ left: thumb.left, width: thumb.width }}
          />
          {CATEGORIES.map((c) => {
            const count = c.id === "all" ? SYSTEMS.length : SYSTEMS.filter((s) => s.category === c.id).length;
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                data-filter={c.id}
                role="tab"
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                onClick={() => onFilter(c.id)}
                className={`relative z-10 shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 font-obs-mono text-[12px] tracking-[0.04em] transition-colors duration-300 ${
                  active ? "font-semibold text-black" : "text-obs-muted hover:text-white"
                }`}
              >
                {c.label} <span className={active ? "text-black/60" : "text-obs-dim"}>({count})</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {visible.map((s, i) => (
            <SystemCard key={`${filter}-${s.id}`} item={s} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemCard({ item: s, index, onOpen }: { item: SystemItem; index: number; onOpen: (id: string) => void }) {
  const accent = ACCENT_TEXT[s.accent];
  const titleSize = s.featured
    ? "text-[44px] leading-[48px]"
    : s.name.length > 22
    ? "text-[22px] leading-tight"
    : "text-[34px] leading-[38px] md:text-[40px] md:leading-[44px]";

  return (
    <article
      onPointerMove={trackSpot}
      onClick={() => onOpen(s.id)}
      className={`obs-card-in obs-spot group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/10 bg-obs-elevated/70 p-10 shadow-2xl backdrop-blur-xl transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-white/24 hover:bg-obs-elevated ${
        s.featured ? "lg:col-span-2" : ""
      }`}
      style={{ ["--d" as string]: `${index * 55}ms` }}
    >
      {s.featured && <div className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-[rgba(0,113,227,0.2)] blur-3xl transition-transform duration-700 group-hover:scale-125" />}
      {s.accent === "pink" && <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-obs-plum/20 blur-2xl" />}
      <div className="relative">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="font-obs-mono text-[12px] text-obs-dim">DEPUP / {s.num}</span>
          <span
            className={`rounded-full px-2.5 py-1 text-right font-obs-mono text-[11px] ${
              s.featured
                ? "bg-obs-blue font-semibold text-white"
                : s.accent === "pink"
                ? "bg-obs-plum/30 text-obs-pink"
                : "bg-obs-container text-obs-muted"
            }`}
          >
            {s.badge}
          </span>
        </div>
        <h3 className={`mb-1 font-bold tracking-[-0.02em] text-white ${titleSize}`}>{s.name}</h3>
        <p className={`mb-6 text-obs-muted ${s.featured ? "max-w-xl text-[19px] leading-[28px]" : "text-[15px] leading-[22px]"}`}>{s.description}</p>
        <div className="mb-6">
          <span className="mb-2 block font-obs-mono text-[11px] uppercase tracking-[0.08em] text-obs-dim">{s.tagLabel}</span>
          <div className="flex flex-wrap gap-2">
            {s.tags.map((t) => (
              <span
                key={t}
                className={`rounded bg-obs-container px-2.5 py-1 font-obs-mono text-[13px] transition-colors group-hover:bg-obs-variant/70 ${
                  s.accent === "pink" && t !== "Manual review" ? "text-obs-pink" : "text-obs-muted"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-between pt-4">
        {s.featured ? (
          <>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 rounded-full bg-obs-sky px-6 py-2 text-[12px] font-semibold text-[#002f66] transition-all hover:bg-white hover:text-black"
            >
              {s.cta}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <span className="hidden font-obs-mono text-[12px] text-obs-dim sm:inline">Managed Edge Protocol</span>
          </>
        ) : (
          <span className={`inline-flex items-center gap-1 text-[13px] ${s.href ? `font-semibold ${accent}` : "text-obs-muted group-hover:text-white"}`}>
            {s.cta}
            {s.href ? (
              <ChevronRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
            ) : (
              <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
            )}
          </span>
        )}
      </div>
    </article>
  );
}
