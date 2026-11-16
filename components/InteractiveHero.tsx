"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type TouchEvent } from "react";
import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Cloud,
  FileText,
  Pause,
  Play,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import { ScrollScene } from "@/components/ScrollScene";

const slides = [
  {
    id: "studio",
    label: "Studio",
    eyebrow: "Depup Studio · Independent systems studio",
    title: "One studio.\nMade to move.",
    description: "Software, infrastructure, and useful tools designed around the way people get things done.",
    primary: "Explore our systems",
    primaryHref: "#ecosystem",
    secondary: "Meet the studio",
    secondaryHref: "#mission",
    product: "Depup systems",
    productLabel: "A connected workspace",
    windowKicker: "Products moving in one direction",
    windowHeadline: "A connected way to work.",
    icon: Activity,
    color: "#89c8ff",
    capabilities: [
      { title: "Build", caption: "Digital products" },
      { title: "Connect", caption: "Cloud + MCP" },
      { title: "Protect", caption: "Security tools" },
    ],
    status: "Three products · one studio",
  },
  {
    id: "cloud",
    label: "Cloud",
    eyebrow: "depup.cloud · Cloud & MCP",
    title: "Infrastructure\nfor ideas in motion.",
    description: "Deploy apps, connect remote MCP tools, and grow your platform on infrastructure built for teams.",
    primary: "Explore depup.cloud",
    primaryHref: "https://depup.cloud",
    secondary: "View all systems",
    secondaryHref: "#ecosystem",
    product: "depup.cloud",
    productLabel: "Cloud workspace",
    windowKicker: "Infrastructure for your next release",
    windowHeadline: "Build, deploy, scale.",
    icon: Cloud,
    color: "#70d8ff",
    capabilities: [
      { title: "Deployments", caption: "Apps and services" },
      { title: "Remote MCP", caption: "Tools and gateways" },
      { title: "Workspaces", caption: "One place to manage" },
    ],
    status: "Infrastructure · Ready to build",
  },
  {
    id: "office",
    label: "Office",
    eyebrow: "depup Office · Productivity suite",
    title: "Every document,\nready to move.",
    description: "Scan, organize, and work with documents in a practical suite for Android and Windows.",
    primary: "Discover depup Office",
    primaryHref: "/office",
    secondary: "Get the app",
    secondaryHref: "https://play.google.com/store/apps/details?id=studio.depup.office",
    product: "depup Office",
    productLabel: "Document workspace",
    windowKicker: "From capture to a usable file",
    windowHeadline: "Documents in one place.",
    icon: ScanLine,
    color: "#97baff",
    capabilities: [
      { title: "Scan", caption: "Capture documents" },
      { title: "Organize", caption: "Keep work in order" },
      { title: "Continue", caption: "Android + Windows" },
    ],
    status: "Productivity · Ready when you are",
  },
  {
    id: "sentinel",
    label: "Sentinel",
    eyebrow: "Sentinel-ID · Security research",
    title: "Security,\nwith more clarity.",
    description: "Understand website security posture with transparent, passive-first audits and clear next steps.",
    primary: "Explore Sentinel-ID",
    primaryHref: "/sentinel",
    secondary: "Visit sentinel-id.net",
    secondaryHref: "https://sentinel-id.net",
    product: "Sentinel-ID",
    productLabel: "Website audit overview",
    windowKicker: "Understand before you act",
    windowHeadline: "Findings made clear.",
    icon: ShieldCheck,
    color: "#85e0d1",
    capabilities: [
      { title: "Passive checks", caption: "Observe safely" },
      { title: "Evidence", caption: "Review findings" },
      { title: "Next steps", caption: "Act with clarity" },
    ],
    status: "Passive-first · GET-only",
  },
];

export function InteractiveHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const touchStartRef = useRef<number | null>(null);
  const pointerIdleRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCapability, setSelectedCapability] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pointerActive, setPointerActive] = useState(false);
  const [focusActive, setFocusActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const current = slides[activeIndex];
  const ProductIcon = current.icon;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(query.matches);
      if (query.matches) setPaused(true);
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || pointerActive || focusActive || !isVisible || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
      setSelectedCapability(0);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [paused, pointerActive, focusActive, isVisible, reducedMotion]);

  useEffect(() => setSelectedCapability(0), [activeIndex]);

  useEffect(() => () => {
    if (pointerIdleRef.current !== null) window.clearTimeout(pointerIdleRef.current);
  }, []);

  const selectSlide = (index: number) => setActiveIndex((index + slides.length) % slides.length);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || reducedMotion || !stageRef.current) return;
    setPointerActive(true);
    if (pointerIdleRef.current !== null) window.clearTimeout(pointerIdleRef.current);
    pointerIdleRef.current = window.setTimeout(() => setPointerActive(false), 1800);
    const rect = stageRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    visualRef.current?.style.setProperty("--tilt-x", `${(y * -2.2).toFixed(2)}deg`);
    visualRef.current?.style.setProperty("--tilt-y", `${(x * 2.8).toFixed(2)}deg`);
    visualRef.current?.style.setProperty("--shift-x", `${(x * 5).toFixed(1)}px`);
    visualRef.current?.style.setProperty("--shift-y", `${(y * 4).toFixed(1)}px`);
  };

  const resetPointer = () => {
    visualRef.current?.style.setProperty("--tilt-x", "0deg");
    visualRef.current?.style.setProperty("--tilt-y", "0deg");
    visualRef.current?.style.setProperty("--shift-x", "0px");
    visualRef.current?.style.setProperty("--shift-y", "0px");
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartRef.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartRef.current = null;
    if (startX === null || endX === undefined || Math.abs(endX - startX) < 55) return;
    selectSlide(activeIndex + (endX < startX ? 1 : -1));
  };

  const isExternal = (href: string) => href.startsWith("http");

  return (
    <ScrollScene motion="hero" className="scroll-scene--hero">
    <section ref={sectionRef} id="spotlight" className="depup-hero relative">
      <div
        ref={stageRef}
        className="depup-hero-stage relative flex min-h-[100svh] flex-col overflow-hidden text-white"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          setPointerActive(false);
          if (pointerIdleRef.current !== null) window.clearTimeout(pointerIdleRef.current);
          resetPointer();
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onFocusCapture={(event) => {
          setFocusActive((event.target as HTMLElement).dataset.autoplayToggle !== "true");
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusActive(false);
        }}
        style={{ "--product-accent": current.color } as CSSProperties}
        role="region"
        aria-roledescription="carousel"
        aria-label="Depup Studio products"
      >
        <div className="depup-hero-light depup-hero-light--one" aria-hidden="true" />
        <div className="depup-hero-light depup-hero-light--two" aria-hidden="true" />
        <div className="depup-hero-grain" aria-hidden="true" />

        <div className="depup-hero-content relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1480px] flex-col px-5 pb-3 pt-20 sm:px-9 sm:pb-4 sm:pt-20 lg:px-16 lg:pb-4">
          <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.19em] text-white/65 sm:text-xs">
            <span>Independent systems studio</span>
            <span className="hidden sm:inline">Jakarta · Working everywhere</span>
          </div>

          <div className="grid flex-1 grid-cols-1 items-center gap-6 py-5 md:grid-cols-[0.92fr_1.08fr] md:gap-9 lg:gap-14 lg:py-6">
            <div key={`${current.id}-copy`} className="depup-hero-copy relative z-10 max-w-2xl text-center md:text-left">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-100/80 sm:text-xs">{current.eyebrow}</p>
              <h1 className="whitespace-pre-line font-display text-[clamp(3rem,6.1vw,6.1rem)] font-medium leading-[0.97] tracking-[-0.067em] text-white [text-wrap:balance]">
                {current.title}
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-blue-50/76 sm:text-base sm:leading-7 md:mx-0 lg:mt-7 lg:text-lg">{current.description}</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start lg:mt-8">
                <a
                  href={current.primaryHref}
                  target={isExternal(current.primaryHref) ? "_blank" : undefined}
                  rel={isExternal(current.primaryHref) ? "noopener noreferrer" : undefined}
                  className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-6 text-sm font-semibold text-[#0b1b36] shadow-[0_12px_36px_rgba(1,10,28,0.2)] transition-colors hover:bg-sky-50 sm:text-base"
                >
                  {current.primary}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={current.secondaryHref}
                  target={isExternal(current.secondaryHref) ? "_blank" : undefined}
                  rel={isExternal(current.secondaryHref) ? "noopener noreferrer" : undefined}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-5 text-sm font-medium text-white/90 transition-colors hover:border-white/55 hover:bg-white/[0.08] sm:text-base"
                >
                  {current.secondary}
                </a>
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-[700px] items-center justify-center py-2 md:h-full md:min-h-[390px] md:py-0 lg:min-h-[480px]">
              <div className="depup-hero-halo" aria-hidden="true" />
              <div
                ref={visualRef}
                className={`depup-product-visual depup-product-visual--${current.id}`}
                key={`${current.id}-visual`}
              >
                <div className="depup-product-window">
                  <div className="depup-window-toolbar">
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b64]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ffc75b]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#53cf87]" />
                    </div>
                    <span className="truncate px-4 text-[10px] font-medium text-slate-500 sm:text-xs">{current.product}</span>
                    <span className="w-8" />
                  </div>

                  <div className="depup-window-content">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] text-[#0b2b56]" style={{ backgroundColor: `${current.color}55` }}>
                          <ProductIcon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold tracking-tight text-slate-900 sm:text-base">{current.product}</p>
                          <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">{current.productLabel}</p>
                        </div>
                      </div>
                      <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700 sm:inline-flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Ready</span>
                    </div>

                    <div className="mt-5 flex items-end justify-between gap-3 sm:mt-7">
                      <div>
                        <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-slate-400 sm:text-[10px]">{current.windowKicker}</p>
                        <h2 className="mt-1 text-lg font-semibold tracking-[-0.04em] text-slate-900 sm:text-2xl">{current.windowHeadline}</h2>
                      </div>
                      <div className="hidden h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 sm:flex"><ArrowUpRight className="h-4 w-4" /></div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
                      {current.capabilities.map((capability, index) => (
                        <button
                          key={capability.title}
                          type="button"
                          aria-pressed={selectedCapability === index}
                          onClick={() => setSelectedCapability(index)}
                          className={`depup-product-tile text-left ${selectedCapability === index ? "is-active" : ""}`}
                          style={{ "--tile-index": index } as CSSProperties}
                        >
                          <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm sm:mb-3 sm:h-8 sm:w-8">
                            {index === 0 ? <FileText className="h-3.5 w-3.5" /> : index === 1 ? <Activity className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
                          </span>
                          <p className="truncate text-[10px] font-semibold text-slate-800 sm:text-xs">{capability.title}</p>
                          <p className="mt-1 hidden truncate text-[10px] text-slate-500 sm:block">{capability.caption}</p>
                        </button>
                      ))}
                    </div>

                    <div className="depup-feature-detail" key={`${current.id}-${selectedCapability}`}>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#0b2b56]" style={{ backgroundColor: `${current.color}55` }}><Activity className="h-4 w-4" /></span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">Selected feature</p>
                        <p className="mt-0.5 truncate text-xs font-semibold text-slate-800">{current.capabilities[selectedCapability].title}</p>
                        <p className="truncate text-[10px] text-slate-500">{current.capabilities[selectedCapability].caption}</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400" />
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-200/80 pt-3 text-[9px] text-slate-500 sm:mt-5 sm:pt-4 sm:text-xs">
                      <span className="inline-flex min-w-0 items-center gap-2 truncate"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600"><ProductIcon className="h-3 w-3" /></span>{current.status}</span>
                      <span className="ml-3 flex shrink-0 items-center gap-1.5 text-slate-700"><ShieldCheck className="h-3.5 w-3.5" />Depup Studio</span>
                    </div>
                  </div>
                </div>
                <div className="depup-visual-caption"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: current.color }} /><span>{current.label} · Product preview</span></div>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 border-t border-white/15 pt-3 sm:pt-4">
            <a href="#updates" className="hidden min-h-10 items-center gap-2 text-sm text-white/60 transition-colors hover:text-white sm:inline-flex"><ArrowDown className="h-4 w-4" />Scroll to explore</a>

            <div className="flex flex-1 items-center justify-center gap-2 sm:gap-4" role="group" aria-label="Choose product story">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => selectSlide(index)}
                  aria-label={`Show ${slide.label} story`}
                  aria-pressed={activeIndex === index}
                  className={`depup-story-step ${activeIndex === index ? "is-active" : ""}`}
                >
                  <span className="font-mono text-[10px]">0{index + 1}</span>
                  <span className="hidden text-xs sm:inline">{slide.label}</span>
                  <span className="depup-story-step-line" />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="mr-2 hidden font-mono text-xs text-white/60 sm:inline">0{activeIndex + 1} / 0{slides.length}</span>
              <button type="button" onClick={() => selectSlide(activeIndex - 1)} aria-label="Previous product story" className="depup-story-arrow"><ArrowLeft className="h-4 w-4" /></button>
              <button type="button" onClick={() => selectSlide(activeIndex + 1)} aria-label="Next product story" className="depup-story-arrow"><ArrowRight className="h-4 w-4" /></button>
              <button type="button" data-autoplay-toggle="true" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play product story" : "Pause product story"} aria-pressed={paused} className="depup-story-arrow ml-1">
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </ScrollScene>
  );
}
