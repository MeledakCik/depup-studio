"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { trackSpot, useMagnetic } from "./primitives";

function useJakartaTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export function Manifesto() {
  const time = useJakartaTime();
  const a = useMagnetic<HTMLAnchorElement>(0.25);
  const b = useMagnetic<HTMLAnchorElement>(0.25);

  return (
    <section id="mission" onPointerMove={trackSpot} className="obs-hero relative w-full overflow-hidden bg-obs-elevated py-24">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[rgba(0,113,227,0.15)] blur-[140px]" />
      <div className="obs-hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center lg:px-6">
        <span className="obs-reveal mb-4 block font-obs-mono text-[12px] uppercase tracking-[0.14em] text-obs-dim">Independent software studio · Indonesia</span>
        <h2 className="obs-reveal obs-title mb-6 text-[44px] font-extrabold leading-[48px] tracking-[-0.03em] md:text-[72px] md:leading-[76px]" style={{ ["--d" as string]: "80ms" }}>
          Built to move
          <br />
          real work forward.
        </h2>
        <p className="obs-reveal mx-auto mb-16 max-w-2xl text-[19px] leading-[30px] text-obs-muted" style={{ ["--d" as string]: "160ms" }}>
          We make thoughtful software, useful infrastructure, and connected tools for the people who put them to work.
        </p>
        <div className="obs-reveal mb-16 flex flex-wrap items-center justify-center gap-4" style={{ ["--d" as string]: "240ms" }}>
          <a
            ref={a}
            href="#systems"
            className="inline-flex items-center justify-center rounded-full bg-obs-titanium px-10 py-4 text-[12px] font-semibold tracking-wide text-black transition-[background-color,box-shadow,transform] duration-300 ease-out hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            Explore the ecosystem
          </a>
          <a
            ref={b}
            href="https://github.com/MeledakCik"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1 rounded-full bg-obs-container px-10 py-4 text-[12px] font-semibold text-obs-text transition-[background-color,transform] duration-300 ease-out hover:bg-obs-variant"
          >
            Meet the builders
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="obs-reveal flex flex-col items-center gap-3 font-obs-mono text-[12px] text-obs-dim" style={{ ["--d" as string]: "320ms" }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-obs-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-obs-green" />
            Jakarta · <span className="tabular-nums text-obs-text">{time ?? "--:--:--"}</span> WIB
          </span>
          <span>DEPUP __STUDIO / 2026 · Independent by nature. Connected by design.</span>
        </div>
      </div>
    </section>
  );
}
