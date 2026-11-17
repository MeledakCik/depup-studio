"use client";

import { ChevronRight, CloudCog, ShieldCheck, Terminal, type LucideIcon } from "lucide-react";
import type { Category } from "./data";
import { trackSpot, useTilt } from "./primitives";

interface Pillar {
  index: string;
  title: string;
  subtitle: string;
  body: string;
  cta: string;
  icon: LucideIcon;
  tone: "sky" | "pink";
  filter: Category;
  featured?: boolean;
}

const PILLARS: Pillar[] = [
  {
    index: "01",
    title: "Build",
    subtitle: "Digital products",
    body: "High-performance user interfaces, offline-first architectures, native desktop runtimes, and precision media toolkits that redefine production velocity.",
    cta: "Explore Office & Code",
    icon: Terminal,
    tone: "sky",
    filter: "productivity",
  },
  {
    index: "02",
    title: "Connect",
    subtitle: "Cloud + MCP",
    body: "Next-generation Model Context Protocol gateways and multi-tenant telemetry creating a frictionless pipeline between autonomous AI agents and runtime environments.",
    cta: "Launch Remote MCP",
    icon: CloudCog,
    tone: "sky",
    filter: "cloud",
    featured: true,
  },
  {
    index: "03",
    title: "Protect",
    subtitle: "Security tools",
    body: "Passive, non-invasive zero-trust validation engines. Same-origin bounds, GET-only query architectures, and strict rate envelopes prioritizing system integrity.",
    cta: "Audit with Sentinel",
    icon: ShieldCheck,
    tone: "pink",
    filter: "security",
  },
];

export function Pillars({ onSelect }: { onSelect: (c: Category) => void }) {
  return (
    <section className="relative w-full bg-black py-24" aria-labelledby="pillars-title">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="obs-reveal mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-1 block font-obs-mono text-[12px] uppercase tracking-[0.14em] text-obs-dim">Three products · one studio</span>
          <h2 id="pillars-title" className="mb-2 text-[36px] font-bold leading-[40px] tracking-[-0.025em] text-obs-text md:text-[56px] md:leading-[60px]">
            A connected way to work.
          </h2>
          <p className="text-[19px] leading-[28px] text-obs-muted">
            Architecture built from unified primitives. Each system stands alone while amplifying the power of the whole ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.title} pillar={p} delay={i * 90} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ pillar: p, delay, onSelect }: { pillar: Pillar; delay: number; onSelect: (c: Category) => void }) {
  const ref = useTilt<HTMLButtonElement>(5);
  const Icon = p.icon;
  const accent = p.tone === "pink" ? "text-obs-pink" : "text-obs-sky";
  return (
    <div className="obs-reveal" style={{ ["--d" as string]: `${delay}ms` }}>
      <button
        ref={ref}
        type="button"
        onPointerMove={trackSpot}
        onClick={() => onSelect(p.filter)}
        className={`obs-spot group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/10 p-10 text-left shadow-2xl backdrop-blur-xl transition-[transform,background-color,border-color] duration-300 ease-out hover:border-white/24 ${
          p.featured ? "bg-gradient-to-b from-obs-elevated/90 to-obs-container/70" : "bg-obs-elevated/60 hover:bg-obs-elevated"
        }`}
        style={{ ["--spot" as string]: p.tone === "pink" ? "rgba(250,180,192,0.14)" : "rgba(171,199,255,0.14)" }}
      >
        <div
          className={`pointer-events-none absolute rounded-full blur-2xl transition-all duration-500 ${
            p.featured
              ? "-top-10 left-1/2 h-48 w-48 -translate-x-1/2 bg-obs-blue/20 group-hover:bg-obs-blue/30"
              : `right-0 top-0 h-32 w-32 ${p.tone === "pink" ? "bg-obs-pink/10 group-hover:bg-obs-pink/20" : "bg-obs-sky/10 group-hover:bg-obs-sky/20"}`
          }`}
        />
        <div className="relative">
          <div
            className={`mb-6 grid h-12 w-12 place-items-center rounded-lg transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg] ${
              p.featured ? "bg-obs-blue/20" : "bg-obs-container"
            } ${accent}`}
          >
            <Icon className="h-7 w-7" strokeWidth={1.6} />
          </div>
          <div className="mb-1 flex items-center justify-between">
            <span className={`font-obs-mono text-[12px] uppercase tracking-[0.06em] ${p.featured ? "text-obs-sky" : "text-obs-dim"}`}>Pillar // {p.index}</span>
            {p.featured && <span className="rounded-full bg-obs-sky/20 px-2 py-0.5 font-obs-mono text-[11px] text-obs-sky">FLAGSHIP</span>}
          </div>
          <h3 className="mb-1 text-[48px] font-extrabold leading-[52px] tracking-[-0.03em] text-white">{p.title}</h3>
          <p className={`mb-4 text-[20px] font-medium leading-[26px] ${p.featured || p.tone === "pink" ? accent : "text-obs-titanium"}`}>{p.subtitle}</p>
          <p className="mb-6 text-[15px] leading-[24px] text-obs-muted">{p.body}</p>
        </div>
        <span className={`relative flex items-center gap-1 pt-4 text-[13px] font-semibold ${accent}`}>
          {p.cta}
          <ChevronRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </button>
    </div>
  );
}
