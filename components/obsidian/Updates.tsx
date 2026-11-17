"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ACCENT_TEXT, UPDATES } from "./data";
import { trackSpot } from "./primitives";

const SEGMENTS = ["All", "November", "October"] as const;
type Segment = (typeof SEGMENTS)[number];

export function Updates({ onOpen }: { onOpen: (id: string) => void }) {
  const [seg, setSeg] = useState<Segment>("All");
  const trackRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ left: 4, width: 0 });
  const list = UPDATES.filter((u) => seg === "All" || u.month === seg);

  useLayoutEffect(() => {
    const el = trackRef.current?.querySelector<HTMLElement>(`[data-seg="${seg}"]`);
    if (el) setThumb({ left: el.offsetLeft, width: el.offsetWidth });
  }, [seg]);

  return (
    <section id="updates" className="relative w-full bg-black py-24" aria-labelledby="updates-title">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="obs-reveal mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="mb-1 block font-obs-mono text-[12px] uppercase tracking-[0.14em] text-obs-dim">Studio Updates / 2026</span>
            <h2 id="updates-title" className="text-[36px] font-bold leading-[40px] tracking-[-0.025em] text-white md:text-[56px] md:leading-[60px]">
              New work. New momentum.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <div ref={trackRef} className="relative inline-flex rounded-full border border-white/10 bg-black p-1" role="tablist" aria-label="Filter updates by month">
              <span
                aria-hidden="true"
                className="absolute bottom-1 top-1 rounded-full border border-white/24 bg-[rgba(255,255,255,0.14)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ left: thumb.left, width: thumb.width }}
              />
              {SEGMENTS.map((s) => (
                <button
                  key={s}
                  data-seg={s}
                  role="tab"
                  aria-selected={seg === s}
                  onClick={() => setSeg(s)}
                  className={`relative z-10 rounded-full px-4 py-1.5 text-[12px] font-semibold transition-colors ${seg === s ? "text-white" : "text-obs-muted hover:text-white"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <span className="font-obs-mono text-[12px] text-obs-muted">
              {String(list.length).padStart(2, "0")} / {String(UPDATES.length).padStart(2, "0")} Release Feed
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((u, i) => {
            const accent = u.accent === "titanium" ? "text-obs-dim" : ACCENT_TEXT[u.accent];
            const hover = u.accent === "titanium" ? "group-hover:text-white" : u.accent === "pink" ? "group-hover:text-obs-pink" : u.accent === "green" ? "group-hover:text-obs-green" : "group-hover:text-obs-sky";
            return (
              <button
                key={`${seg}-${u.num}`}
                type="button"
                onPointerMove={trackSpot}
                onClick={() => onOpen(u.systemId)}
                className="obs-card-in obs-spot group flex flex-col justify-between rounded-[1.5rem] border border-white/10 bg-obs-elevated/70 p-6 text-left shadow-xl backdrop-blur-xl transition-[transform,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-white/24 hover:bg-obs-elevated"
                style={{ ["--d" as string]: `${i * 70}ms` }}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className={`font-obs-mono text-[12px] font-bold ${accent}`}>
                      {u.num} DEPUP · {u.area}
                    </span>
                    <span className="font-obs-mono text-[11px] text-obs-dim">{u.month} 2026</span>
                  </div>
                  <h3 className={`mb-1 text-[20px] font-bold leading-[26px] tracking-[-0.01em] text-white transition-colors ${hover}`}>{u.title}</h3>
                  <p className="text-[13px] leading-[20px] text-obs-muted">{u.body}</p>
                </div>
                <span className={`flex items-center gap-1 pt-4 font-obs-mono text-[12px] ${u.accent === "titanium" ? "text-obs-muted group-hover:text-white" : ACCENT_TEXT[u.accent]}`}>
                  Explore update
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
