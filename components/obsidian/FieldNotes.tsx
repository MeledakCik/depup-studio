"use client";

import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { ACCENT_TEXT, NOTES } from "./data";
import { trackSpot } from "./primitives";

export function FieldNotes({ onOpen }: { onOpen: (id: string) => void }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="notes" className="relative w-full bg-black py-24" aria-labelledby="notes-title">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="obs-reveal mb-16 max-w-3xl">
          <span className="mb-1 block font-obs-mono text-[12px] uppercase tracking-[0.14em] text-obs-dim">Notes from the studio</span>
          <h2 id="notes-title" className="mb-1 text-[36px] font-bold leading-[40px] tracking-[-0.025em] text-white md:text-[56px] md:leading-[60px]">
            Ideas into
            <br />
            working systems.
          </h2>
          <p className="text-[19px] leading-[28px] text-obs-muted">A closer look at the choices behind the tools.</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-3">
          {NOTES.map((n, i) => {
            const isOpen = open === n.num;
            const accent = n.accent === "titanium" ? "text-obs-text" : ACCENT_TEXT[n.accent];
            return (
              <div key={n.num} className="obs-reveal" style={{ ["--d" as string]: `${i * 90}ms` }}>
              <article
                onPointerMove={trackSpot}
                className={`obs-spot flex h-full flex-col justify-between rounded-[1.5rem] border bg-obs-elevated/70 p-10 shadow-xl backdrop-blur-xl transition-[border-color,background-color] duration-300 ${
                  isOpen ? "border-white/24 bg-obs-elevated" : "border-white/10 hover:border-white/20"
                }`}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-obs-mono text-[12px] text-obs-dim">FIELD NOTE / {n.num}</span>
                    <span className={`font-obs-mono text-[11px] ${n.accent === "titanium" ? "text-obs-dim" : ACCENT_TEXT[n.accent]}`}>{n.area}</span>
                  </div>
                  <h3 className="mb-2 text-[28px] font-bold leading-[32px] tracking-[-0.015em] text-white">{n.title}</h3>
                  <p className="text-[15px] leading-[24px] text-obs-muted">{n.body}</p>
                  <div className={`obs-collapse ${isOpen ? "is-open" : ""}`}>
                    <div>
                      <p className="mt-4 border-l-2 border-white/12 pl-4 text-[15px] leading-[24px] text-obs-text/85">{n.more}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => onOpen(n.systemId)}
                    className={`group inline-flex items-center gap-1 text-[13px] font-semibold ${accent}`}
                  >
                    Explore this system
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : n.num)}
                    aria-expanded={isOpen}
                    aria-label={isOpen ? "Collapse note" : "Read the full note"}
                    className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/[0.08] text-obs-text transition-all hover:bg-white/[0.14]"
                  >
                    <Plus className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                  </button>
                </div>
              </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
