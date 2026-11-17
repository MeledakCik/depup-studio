"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { ACCENT_HEX, ACCENT_TEXT, CATEGORIES, SYSTEMS } from "./data";

export function SystemModal({ id, onClose, onNavigate }: { id: string | null; onClose: () => void; onNavigate: (id: string) => void }) {
  const [shown, setShown] = useState<string | null>(id);
  const [visible, setVisible] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (id) {
      if (!shown) lastFocus.current = document.activeElement as HTMLElement;
      setShown(id);
      requestAnimationFrame(() => setVisible(true));
    } else if (shown) {
      setVisible(false);
      const t = window.setTimeout(() => {
        setShown(null);
        lastFocus.current?.focus?.();
      }, 280);
      return () => window.clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const index = SYSTEMS.findIndex((s) => s.id === shown);
  const item = index >= 0 ? SYSTEMS[index] : null;

  useEffect(() => {
    if (!id) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(SYSTEMS[(index + 1) % SYSTEMS.length].id);
      if (e.key === "ArrowLeft") onNavigate(SYSTEMS[(index - 1 + SYSTEMS.length) % SYSTEMS.length].id);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [id, index, onClose, onNavigate]);

  if (!item) return null;
  const prev = SYSTEMS[(index - 1 + SYSTEMS.length) % SYSTEMS.length];
  const next = SYSTEMS[(index + 1) % SYSTEMS.length];
  const hex = ACCENT_HEX[item.accent];
  const category = CATEGORIES.find((c) => c.id === item.category)?.label;

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-end justify-center p-0 transition-opacity duration-300 sm:items-center sm:p-6 ${visible ? "opacity-100" : "opacity-0"}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="system-modal-title"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div
        className={`relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-[1.5rem] border border-white/12 bg-[rgba(22,22,23,0.92)] shadow-[0_40px_120px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:rounded-[1.5rem] ${
          visible ? "translate-y-0 scale-100" : "translate-y-8 scale-[0.97]"
        }`}
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl transition-colors duration-700" style={{ background: `${hex}26` }} />
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.06] bg-[rgba(22,22,23,0.8)] px-6 py-4 backdrop-blur-xl">
          <span className="font-obs-mono text-[12px] text-obs-dim">
            DEPUP / {item.num} · {category}
          </span>
          <div className="flex items-center gap-1">
            <button onClick={() => onNavigate(prev.id)} className="grid h-8 w-8 place-items-center rounded-full text-obs-muted transition-colors hover:bg-white/10 hover:text-white" aria-label={`Previous: ${prev.name}`}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => onNavigate(next.id)} className="grid h-8 w-8 place-items-center rounded-full text-obs-muted transition-colors hover:bg-white/10 hover:text-white" aria-label={`Next: ${next.name}`}>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button ref={closeRef} onClick={onClose} className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-obs-text transition-colors hover:bg-white/20" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div key={item.id} className="obs-card-in relative p-6 sm:p-10">
          <span className={`mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-obs-container px-3 py-1 font-obs-mono text-[12px] uppercase ${ACCENT_TEXT[item.accent]}`}>
            <span className="h-2 w-2 rounded-full" style={{ background: hex }} />
            {item.badge}
          </span>
          <h3 id="system-modal-title" className="mb-3 text-[36px] font-extrabold leading-[40px] tracking-[-0.025em] text-white sm:text-[44px] sm:leading-[48px]">
            {item.name}
          </h3>
          <p className="mb-3 text-[17px] leading-[26px] text-obs-text/90">{item.description}</p>
          <p className="mb-8 text-[15px] leading-[24px] text-obs-muted">{item.detail}</p>

          <dl className="mb-8">
            {item.specs.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 border-b border-white/[0.06] py-3">
                <dt className="font-obs-mono text-[12px] uppercase tracking-[0.04em] text-obs-muted">{k}</dt>
                <dd className="text-right text-[15px] text-obs-text">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mb-8 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span key={t} className="rounded bg-obs-container px-2.5 py-1 font-obs-mono text-[13px] text-obs-muted">
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {item.href ? (
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="inline-flex items-center gap-1 rounded-full bg-obs-blue px-6 py-3 text-[13px] font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(0,113,227,0.5)]"
              >
                {item.cta}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 font-obs-mono text-[12px] text-obs-muted">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-obs-green" />
                In active development · public page coming soon
              </span>
            )}
            <button
              onClick={() => onNavigate(next.id)}
              className="group inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.08] px-5 py-3 text-[13px] text-obs-text transition-colors hover:bg-white/[0.14]"
            >
              Next: {next.name}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
          <p className="mt-6 hidden font-obs-mono text-[11px] text-obs-dim sm:block">← → to browse · Esc to close</p>
        </div>
      </div>
    </div>
  );
}
