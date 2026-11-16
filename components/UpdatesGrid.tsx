"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollScene } from "@/components/ScrollScene";

const updates = [
  {
    tag: "Cloud",
    date: "November 2026",
    title: "Introducing depup.cloud Remote MCP Gateway",
    accent: "#78c9ff",
    bg: "#0b1831",
    href: "https://depup.cloud",
    index: "01",
  },
  {
    tag: "Security",
    date: "November 2026",
    title: "Sentinel-ID adds encrypted proof review",
    accent: "#60ddc9",
    bg: "#0a2024",
    href: "/sentinel",
    index: "02",
  },
  {
    tag: "Desktop",
    date: "October 2026",
    title: "depup Office brings document work to Windows",
    accent: "#89aaff",
    bg: "#101a34",
    href: "/office",
    index: "03",
  },
  {
    tag: "Creative",
    date: "November 2026",
    title: "MotionKu v2 introduces spring-driven scenes",
    accent: "#c9a4ff",
    bg: "#1a1230",
    href: "#ecosystem",
    index: "04",
  },
  {
    tag: "Developer",
    date: "November 2026",
    title: "Depup Code: an offline-first hybrid IDE",
    accent: "#56c9ef",
    bg: "#0d1b2a",
    href: "#ecosystem",
    index: "05",
  },
  {
    tag: "Systems",
    date: "October 2026",
    title: "Depup OS Dev Edition for a lighter workflow",
    accent: "#70d6a5",
    bg: "#0a211d",
    href: "#ecosystem",
    index: "06",
  },
];

export function UpdatesGrid() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pointerActive, setPointerActive] = useState(false);
  const [focusActive, setFocusActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || pointerActive || focusActive || reducedMotion || !isVisible) return;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % updates.length);
    }, 7200);
    return () => window.clearInterval(timer);
  }, [paused, pointerActive, focusActive, reducedMotion, isVisible]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const firstCard = track.querySelector<HTMLElement>("[data-update-card]");
      if (!firstCard) return;
      const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0");
      setStep(firstCard.getBoundingClientRect().width + gap);
      setMaxOffset(Math.max(0, track.scrollWidth - track.parentElement!.clientWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    if (track.parentElement) observer.observe(track.parentElement);
    return () => observer.disconnect();
  }, []);

  const offset = Math.min(active * step, maxOffset);
  const slide = (direction: number) => {
    setPaused(true);
    setActive((index) => (index + direction + updates.length) % updates.length);
  };

  return (
    <section ref={sectionRef} id="updates" className="updates-section w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <ScrollReveal variant="left" className="t-stagger flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <span className="eyebrow-label">Studio Updates / 2026</span>
            <h2 className="font-editorial-display text-4xl sm:text-5xl lg:text-7xl text-text-primary mt-3">
              <span className="t-stagger-line t-stagger-line--1">New work.</span>
              <span className="t-stagger-line t-stagger-line--2">New momentum.</span>
            </h2>
          </div>
          <div className="updates-controls">
            <a href="#ecosystem" className="studio-link mr-2">Explore the studio <ArrowRight className="h-4 w-4" /></a>
            <button type="button" className="updates-control" onClick={() => slide(-1)} aria-label="Previous release"><ArrowLeft /></button>
            <button type="button" className="updates-control" onClick={() => slide(1)} aria-label="Next release"><ArrowRight /></button>
            <button
              type="button"
              className="updates-control updates-pause"
              onClick={() => setPaused((value) => !value)}
              aria-label={paused ? "Resume automatic releases" : "Pause automatic releases"}
              aria-pressed={paused}
            >
              {paused ? <Play /> : <Pause />}
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={100}>
          <div
            className="updates-viewport"
            onPointerEnter={() => setPointerActive(true)}
            onPointerLeave={() => setPointerActive(false)}
            onFocusCapture={() => setFocusActive(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusActive(false);
            }}
          >
            <div
              ref={trackRef}
              className="updates-track"
              style={{ "--updates-offset": `-${offset}px` } as CSSProperties}
            >
              {updates.map((item, index) => (
                <article
                  key={item.index}
                  data-update-card
                  className={`update-card ${index === active ? "is-current" : ""}`}
                  style={{ "--update-accent": item.accent, "--update-bg": item.bg } as CSSProperties}
                >
                  <a href={item.href} className="update-art" aria-label={`Explore ${item.tag} update`}>
                    <ScrollScene className="update-art-scene scroll-scene--parallax" aria-hidden="true">
                      <div className="update-art-grid" />
                      <div className="update-art-orbit update-art-orbit--one" />
                      <div className="update-art-orbit update-art-orbit--two" />
                      <div className="update-art-center"><span>{item.index}</span></div>
                      <span className="update-art-mark">DEPUP</span>
                      <span className="update-tag">{item.tag}</span>
                      <span className="update-art-arrow"><ArrowUpRight /></span>
                    </ScrollScene>
                  </a>
                  <div className="update-card-copy">
                    <p className="update-date">{item.date} <span>/</span> Release note</p>
                    <h3>{item.title}</h3>
                    <a href={item.href} className="update-read-link">Explore update <ArrowRight /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="updates-progress-row" aria-label={`Release ${active + 1} of ${updates.length}`}>
          <div className="updates-progress-track" aria-hidden="true">
            <span style={{ transform: `translateX(${active * 100}%)` }} />
          </div>
          <span className="updates-counter">{String(active + 1).padStart(2, "0")} <span>/</span> {String(updates.length).padStart(2, "0")}</span>
          <span className="sr-only" aria-live="polite">{updates[active].tag}: {updates[active].title}</span>
        </div>
        {reducedMotion && <p className="updates-motion-note">Automatic movement is paused by your motion preference.</p>}
      </div>
    </section>
  );
}
