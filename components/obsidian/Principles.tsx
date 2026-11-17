"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { PRINCIPLES } from "./data";
import { trackSpot } from "./primitives";

const DURATION = 7000;

export function Principles() {
  const [active, setActive] = useState(0);
  const [shownIdx, setShownIdx] = useState(0);
  const [morph, setMorph] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const [cycle, setCycle] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (idx: number) => {
      setActive(idx);
      setCycle((c) => c + 1);
      if (idx === shownIdx) return;
      setMorph(true);
      window.setTimeout(() => {
        setShownIdx(idx);
        requestAnimationFrame(() => setMorph(false));
      }, 170);
    },
    [shownIdx]
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) setPlaying(false);
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = playing && !hovering && inView;


  const onKey = (e: KeyboardEvent) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = (active + dir + PRINCIPLES.length) % PRINCIPLES.length;
    go(next);
    menuRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[next]?.focus();
  };

  const p = PRINCIPLES[shownIdx];

  return (
    <section ref={sectionRef} id="engineering" className="relative w-full bg-black py-24" aria-labelledby="engineering-title">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="obs-reveal mb-16 flex max-w-none flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <span className="mb-1 block font-obs-mono text-[12px] uppercase tracking-[0.14em] text-obs-dim">Engineering Foundations · Our mission</span>
            <h2 id="engineering-title" className="mb-2 text-[36px] font-bold leading-[40px] tracking-[-0.025em] text-white md:text-[56px] md:leading-[60px]">
              Thoughtful by design.
              <br />
              Reliable by engineering.
            </h2>
            <p className="text-[19px] leading-[28px] text-obs-muted">Select an architectural principle to examine our deterministic systems criteria.</p>
          </div>
          <button
            onClick={() => setPlaying((v) => !v)}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 font-obs-mono text-[12px] text-obs-muted transition-colors hover:text-white md:self-auto"
            aria-label={playing ? "Pause autoplay" : "Play autoplay"}
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {playing ? "Autoplay on" : "Autoplay off"}
          </button>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12" onPointerEnter={() => setHovering(true)} onPointerLeave={() => setHovering(false)}>
          <div ref={menuRef} role="tablist" aria-orientation="vertical" aria-label="Engineering principles" onKeyDown={onKey} className="flex flex-col gap-2 lg:col-span-5">
            {PRINCIPLES.map((item, i) => {
              const isActive = i === active;
              return (
                <div key={item.id} className="obs-reveal" style={{ ["--d" as string]: `${(i + 1) * 60}ms` }}>
                <button
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="principle-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => go(i)}
                  className={`group relative w-full overflow-hidden rounded-[1.5rem] border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-obs-sky/30 bg-obs-elevated/90 shadow-[0_4px_24px_rgba(0,113,227,0.18)]"
                      : "border-white/[0.06] bg-obs-lowest/60 hover:border-white/20 hover:bg-obs-elevated/70"
                  }`}
                >
                  <span
                    className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full transition-all duration-300"
                    style={{ background: item.color, opacity: isActive ? 1 : 0, transform: `scaleY(${isActive ? 1 : 0.4})` }}
                  />
                  <span className="mb-1 flex items-center justify-between pl-2">
                    <span className={`font-obs-mono text-[12px] font-bold ${isActive ? "text-obs-sky" : "text-obs-dim"}`}>{item.tag}</span>
                    <span className={`font-obs-mono text-[11px] ${isActive ? "text-obs-sky" : "text-obs-dim"}`}>{isActive ? "Active" : item.status}</span>
                  </span>
                  <span className={`block pl-2 text-[20px] font-bold leading-[26px] transition-colors ${isActive ? "text-white" : "text-obs-muted group-hover:text-white"}`}>{item.shortTitle}</span>
                  <span className={`mt-1 block pl-2 text-[13px] leading-[18px] transition-colors ${isActive ? "text-obs-muted" : "text-obs-dim"}`}>{item.shortDesc}</span>
                  {isActive && (
                    <span className="absolute inset-x-4 bottom-0 h-[2px] overflow-hidden rounded-full bg-white/[0.06]">
                      <span
                        key={cycle}
                        onAnimationEnd={() => go((active + 1) % PRINCIPLES.length)}
                        className="obs-progress block h-full origin-left rounded-full"
                        style={{
                          background: item.color,
                          animationDuration: `${DURATION}ms`,
                          animationPlayState: running ? "running" : "paused",
                        }}
                      />
                    </span>
                  )}
                </button>
                </div>
              );
            })}
          </div>

          <div
            id="principle-panel"
            role="tabpanel"
            onPointerMove={trackSpot}
            className="obs-reveal obs-spot relative flex min-h-[500px] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/12 bg-obs-elevated/80 p-6 shadow-2xl backdrop-blur-2xl sm:p-10 lg:col-span-7"
            style={{ ["--d" as string]: "200ms", ["--spot" as string]: `${p.color}22` }}
          >
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full blur-3xl transition-[background-color] duration-700" style={{ backgroundColor: p.glow }} />
            <div className={`obs-morph relative flex min-h-[440px] flex-col justify-between ${morph ? "is-morphing" : ""}`}>
              <div>
                <div className="mb-6 flex items-center justify-between gap-4">
                  <span className="font-obs-mono text-[12px] uppercase tracking-[0.06em] text-obs-dim">Depup Studio / Engineering system principle</span>
                  <span className="font-obs-mono text-[20px] font-bold transition-colors" style={{ color: p.color }}>
                    {p.id}
                  </span>
                </div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-obs-container px-3 py-1">
                  <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                  <span className="font-obs-mono text-[12px] uppercase tracking-wide text-obs-text">{p.badge}</span>
                </div>
                <h3 className="mb-2 text-[36px] font-extrabold leading-[40px] tracking-[-0.025em] text-white md:text-[56px] md:leading-[60px]">{p.title}</h3>
                <p className="mb-8 max-w-xl text-[19px] leading-[30px] text-obs-muted">{p.desc}</p>
                <div className="mb-8 grid grid-cols-3 gap-2">
                  {p.metrics.map(([k, v]) => (
                    <div key={k} className="rounded-[1rem] border border-white/[0.06] bg-black/40 p-3">
                      <span className="block font-obs-mono text-[10px] uppercase text-obs-dim">{k}</span>
                      <span className="mt-1 block text-[20px] font-bold tracking-[-0.01em] text-obs-text sm:text-[24px]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/[0.06] pt-4">
                <span className="mb-3 block font-obs-mono text-[11px] uppercase tracking-[0.08em] text-obs-dim">{p.linksHeading}</span>
                <div className="flex flex-wrap items-center gap-4">
                  {p.links.map((l, i) => (
                    <span key={l.label} className="flex items-center gap-4">
                      {i > 0 && <span className="text-obs-dim">/</span>}
                      <a
                        href={l.href}
                        target={l.external ? "_blank" : undefined}
                        rel={l.external ? "noreferrer" : undefined}
                        className="group inline-flex items-center gap-1 font-obs-mono text-[13px] text-obs-text transition-colors hover:text-obs-sky"
                      >
                        {l.label}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
