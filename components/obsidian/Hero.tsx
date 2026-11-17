"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { ParticleField } from "./ParticleField";
import { trackSpot, useMagnetic, useTilt } from "./primitives";

type View = "mesh" | "vector" | "audit";

const VIEWS: { id: View; index: string; label: string }[] = [
  { id: "mesh", index: "01", label: "Studio Mesh" },
  { id: "vector", index: "02", label: "Vector Engine" },
  { id: "audit", index: "03", label: "Sentinel Audit" },
];

function useTelemetry() {
  const [latency, setLatency] = useState<number[]>(() => Array.from({ length: 28 }, (_, i) => 12 + Math.sin(i / 2) * 1.5));
  const [requests, setRequests] = useState(0);
  const [ops, setOps] = useState(18420);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRequests(75);
      return;
    }
    const a = window.setInterval(() => {
      setLatency((prev) => {
        const last = prev[prev.length - 1];
        const next = Math.max(9, Math.min(16, last + (Math.random() - 0.5) * 2.2));
        return [...prev.slice(1), next];
      });
      setOps((v) => Math.max(15000, Math.min(24000, Math.round(v + (Math.random() - 0.48) * 900))));
    }, 1100);
    const b = window.setInterval(() => {
      setRequests((v) => (v >= 100 ? 0 : v + 1));
    }, 140);
    return () => {
      window.clearInterval(a);
      window.clearInterval(b);
    };
  }, []);

  return { latency, current: latency[latency.length - 1], requests, ops };
}

function Sparkline({ values, color = "#abc7ff" }: { values: number[]; color?: string }) {
  const w = 220;
  const h = 44;
  const min = 8;
  const max = 17;
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - ((v - min) / (max - min)) * h}`);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-11 w-full" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts.join(" ")} ${w},${h}`} fill="url(#spark-fill)" />
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function Hero() {
  const [view, setView] = useState<View>("mesh");
  const [morph, setMorph] = useState(false);
  const t = useTelemetry();
  const stageRef = useTilt<HTMLDivElement>(4);
  const primaryBtn = useMagnetic<HTMLAnchorElement>(0.2);
  const secondaryBtn = useMagnetic<HTMLAnchorElement>(0.2);

  const select = (next: View) => {
    if (next === view) return;
    setMorph(true);
    window.setTimeout(() => {
      setView(next);
      setMorph(false);
    }, 160);
  };

  const meta = VIEWS.find((v) => v.id === view)!;

  return (
    <section
      id="top"
      onPointerMove={trackSpot}
      className="obs-hero relative flex w-full flex-col items-center justify-center overflow-hidden bg-black pb-24 pt-24 md:pt-28"
    >
      <ParticleField className="pointer-events-none absolute inset-0 z-0 opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-obs-blue/20 via-[rgba(0,113,227,0.25)] to-obs-plum/10 blur-[140px]" />
      <div className="pointer-events-none absolute -top-32 left-1/3 h-[360px] w-[360px] rounded-full bg-[rgba(89,41,52,0.35)] blur-[120px]" />
      <div className="obs-hero-glow pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center lg:px-6">
        <div className="obs-rise inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-obs-elevated/80 px-4 py-1 shadow-lg backdrop-blur-xl" style={{ ["--d" as string]: "0ms" }}>
          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-obs-sky" />
          <span className="truncate font-obs-mono text-[12px] uppercase tracking-[0.12em] text-obs-muted">
            Depup Studio · Independent systems studio · Jakarta · Working everywhere
          </span>
        </div>

        <h1 className="obs-title mt-6 max-w-4xl select-none text-[44px] font-extrabold leading-[48px] tracking-[-0.04em] sm:text-[72px] sm:leading-[76px] md:text-[84px] md:leading-[88px]">
          <span className="obs-word" style={{ ["--d" as string]: "80ms" }}>One</span>{" "}
          <span className="obs-word" style={{ ["--d" as string]: "160ms" }}>studio.</span>
          <br className="hidden sm:inline" />{" "}
          <span className="obs-word" style={{ ["--d" as string]: "260ms" }}>Made</span>{" "}
          <span className="obs-word" style={{ ["--d" as string]: "340ms" }}>to</span>{" "}
          <span className="obs-word" style={{ ["--d" as string]: "420ms" }}>move.</span>
        </h1>

        <p className="obs-rise mx-auto mt-4 max-w-2xl text-[19px] leading-[30px] tracking-[-0.01em] text-obs-muted" style={{ ["--d" as string]: "520ms" }}>
          Software, infrastructure, and useful tools designed around the way people get things done.
        </p>

        <div className="obs-rise mt-10 flex flex-wrap items-center justify-center gap-4" style={{ ["--d" as string]: "620ms" }}>
          <a
            ref={primaryBtn}
            href="#systems"
            className="inline-flex items-center justify-center rounded-full bg-obs-titanium px-10 py-4 text-[12px] font-semibold tracking-wide text-black transition-[background-color,box-shadow,transform] duration-300 ease-out hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            Explore our systems
          </a>
          <a
            ref={secondaryBtn}
            href="#engineering"
            className="group inline-flex items-center justify-center gap-1 rounded-full border border-white/10 bg-obs-elevated/90 px-10 py-4 text-[12px] font-semibold text-obs-text shadow-md backdrop-blur-md transition-[background-color,transform] duration-300 ease-out hover:bg-obs-variant"
          >
            <span>Meet the studio</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Interactive device stage */}
        <div className="obs-rise mt-24 w-full max-w-4xl" style={{ ["--d" as string]: "760ms" }}>
        <div
          ref={stageRef}
          className="relative w-full rounded-[1.5rem] border border-white/10 bg-obs-elevated/70 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-transform duration-300 ease-out md:p-6"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 pb-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#93000a]" />
              <span className="h-3 w-3 rounded-full bg-obs-plum" />
              <span className="h-3 w-3 rounded-full bg-obs-blue" />
              <span className="ml-1 truncate font-obs-mono text-[12px] text-obs-dim">depup://studio.orchestration.mesh</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-black/60 px-2.5 py-0.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-obs-green opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-obs-green" />
              </span>
              <span className="font-obs-mono text-[11px] uppercase text-obs-muted">Ready · 9 Systems Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-12">
            {/* main node */}
            <div className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[1rem] bg-obs-lowest/80 p-6 md:col-span-8">
              <div className="pointer-events-none absolute -bottom-8 -right-8 h-44 w-44 rounded-full bg-obs-sky/10 blur-2xl" />
              <div className={`obs-morph ${morph ? "is-morphing" : ""}`}>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="font-obs-mono text-[12px] uppercase tracking-[0.06em] text-obs-sky">
                    {view === "mesh" ? "A connected workspace" : view === "vector" ? "Memory fabric" : "Passive perimeter"}
                  </span>
                  <span className="font-obs-mono text-[12px] text-obs-dim">
                    {meta.index} / {meta.label}
                  </span>
                </div>

                {view === "mesh" && (
                  <>
                    <h3 className="mb-1 text-[28px] font-bold leading-[34px] tracking-[-0.015em] text-obs-text">Products moving in one direction.</h3>
                    <p className="mb-6 text-[15px] leading-[22px] text-obs-muted">
                      Synchronized runtime bridging remote MCP bridges, passive enclave scanners, and cross-platform native editors.
                    </p>
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <Stat label="MCP LATENCY" value={`${t.current.toFixed(0)}ms`} hint="Direct Edge" hintClass="text-obs-sky" />
                      <Stat label="ZERO-TRUST" value="ENCLAVE" valueClass="text-obs-green" hint="GET-Only Spec" />
                      <Stat label="NODES" value="9 / 9" hint="Online" hintClass="text-obs-green" />
                    </div>
                  </>
                )}

                {view === "vector" && (
                  <>
                    <h3 className="mb-1 text-[28px] font-bold leading-[34px] tracking-[-0.015em] text-obs-text">Kasyaf Vector Engine</h3>
                    <p className="mb-4 text-[15px] leading-[22px] text-obs-muted">Multi-tenant serverless Redis &amp; Qdrant vector stream, measured live.</p>
                    <div className="rounded-lg bg-obs-container/60 p-3">
                      <div className="mb-1 flex items-center justify-between font-obs-mono text-[10px] text-obs-dim">
                        <span>EDGE LATENCY · LAST 30s</span>
                        <span className="text-obs-sky">{t.current.toFixed(1)} ms</span>
                      </div>
                      <Sparkline values={t.latency} />
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <Stat label="OPS / SEC" value={t.ops.toLocaleString("en-US")} hint="ioredis pool" />
                      <Stat label="AVAILABILITY" value="99.98%" valueClass="text-obs-sky" hint="Rolling 30 days" />
                    </div>
                  </>
                )}

                {view === "audit" && (
                  <>
                    <h3 className="mb-1 text-[28px] font-bold leading-[34px] tracking-[-0.015em] text-obs-text">Sentinel-ID Audit</h3>
                    <p className="mb-5 text-[15px] leading-[22px] text-obs-muted">GET-only, same-origin. The scan stops by itself at the request ceiling.</p>
                    <div className="mb-2 flex items-end justify-between font-obs-mono">
                      <span className="text-[10px] text-obs-dim">REQUESTS USED</span>
                      <span className="text-[20px] font-bold text-obs-text">
                        {t.requests}
                        <span className="text-obs-dim"> / 100</span>
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-obs-variant">
                      <div className="h-full rounded-full bg-gradient-to-r from-obs-pink to-obs-sky transition-[width] duration-150" style={{ width: `${t.requests}%` }} />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <Stat label="METHOD" value="GET" hint="Read only" />
                      <Stat label="ORIGIN" value="1" hint="Same-origin" />
                      <Stat label="STATE" value={t.requests >= 100 ? "DONE" : "RUN"} valueClass={t.requests >= 100 ? "text-obs-green" : "text-obs-pink"} hint="Manual review" />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* side nodes */}
            <div className="flex flex-col gap-4 md:col-span-4">
              <SideNode
                active={view === "vector"}
                onClick={() => select(view === "vector" ? "mesh" : "vector")}
                kicker="Telemetry"
                kickerClass="text-obs-pink"
                title="Kasyaf Vector Engine"
                body="Multi-tenant serverless Redis & Qdrant vector stream."
              >
                <div className="mt-4 flex items-center justify-between font-obs-mono text-[11px] text-obs-dim">
                  <span>ioredis // memory pool</span>
                  <span className="font-semibold text-obs-sky">99.98%</span>
                </div>
              </SideNode>
              <SideNode
                active={view === "audit"}
                onClick={() => select(view === "audit" ? "mesh" : "audit")}
                kicker="Active Run"
                kickerClass="text-obs-green"
                title="Sentinel-ID Audit"
                body="Max 100 requests per scan limit enforcement active."
              >
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-obs-variant">
                  <div className="h-full rounded-full bg-obs-sky transition-[width] duration-150" style={{ width: `${t.requests}%` }} />
                </div>
              </SideNode>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5" role="tablist" aria-label="Stage views">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                role="tab"
                aria-selected={view === v.id}
                aria-label={v.label}
                onClick={() => select(v.id)}
                className={`h-1.5 rounded-full transition-all duration-500 ${view === v.id ? "w-6 bg-obs-sky" : "w-1.5 bg-white/25 hover:bg-white/50"}`}
              />
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  hint,
  valueClass = "text-obs-text",
  hintClass = "text-obs-dim",
}: {
  label: string;
  value: string;
  hint: string;
  valueClass?: string;
  hintClass?: string;
}) {
  return (
    <div className="rounded-lg bg-obs-container/60 p-2.5">
      <span className="block font-obs-mono text-[10px] text-obs-dim">{label}</span>
      <span className={`block font-obs-mono text-[18px] font-bold tabular-nums leading-[26px] sm:text-[20px] ${valueClass}`}>{value}</span>
      <span className={`mt-0.5 block font-obs-mono text-[10px] ${hintClass}`}>{hint}</span>
    </div>
  );
}

function SideNode({
  active,
  onClick,
  kicker,
  kickerClass,
  title,
  body,
  children,
}: {
  active: boolean;
  onClick: () => void;
  kicker: string;
  kickerClass: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group flex flex-1 flex-col justify-between rounded-[1rem] border p-4 text-left transition-all duration-300 ${
        active
          ? "border-obs-sky/40 bg-obs-elevated shadow-[0_4px_24px_rgba(0,113,227,0.18)]"
          : "border-transparent bg-obs-lowest/80 hover:border-white/12 hover:bg-obs-elevated/80"
      }`}
    >
      <div>
        <span className={`mb-1 flex items-center justify-between font-obs-mono text-[12px] uppercase ${kickerClass}`}>
          {kicker}
          <span className="text-[10px] text-obs-dim opacity-0 transition-opacity group-hover:opacity-100">{active ? "Close" : "Inspect"}</span>
        </span>
        <h4 className="text-[20px] font-semibold leading-[26px] tracking-[-0.01em] text-obs-text">{title}</h4>
        <p className="mt-1 text-[13px] leading-[18px] text-obs-muted">{body}</p>
      </div>
      {children}
    </button>
  );
}
