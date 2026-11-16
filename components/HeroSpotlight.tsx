"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cloud,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const spotlightItems = [
  {
    id: "depup-cloud",
    index: "01 / 04",
    badge: "Featured Cloud Platform",
    title: "depup.cloud",
    subtitle: "Multi-tenant cloud deployment, hosting, and remote MCP infrastructure",
    status: "Production v2.4 Live",
    ctaPrimary: "Explore Platform",
    ctaPrimaryHref: "https://depup.cloud",
    ctaSecondary: "API Docs",
    ctaSecondaryHref: "#ecosystem",
  },
  {
    id: "depup-office",
    index: "02 / 04",
    badge: "Mobile & Desktop Suite",
    title: "depup Office",
    subtitle: "Intelligent document scanner and productivity suite on Google Play & Windows",
    status: "Google Play Verified",
    ctaPrimary: "Explore depup Office",
    ctaPrimaryHref: "/office",
    ctaSecondary: "Download on Google Play",
    ctaSecondaryHref: "https://play.google.com/store/apps/details?id=studio.depup.office",
  },
  {
    id: "sentinel-id",
    index: "03 / 04",
    badge: "Security Research",
    title: "Sentinel-ID",
    subtitle: "Audit keamanan website secara pasif — GET-only, same-origin, tanpa payload atau exploit",
    status: "Passive-only · GET-only",
    ctaPrimary: "Explore Sentinel-ID",
    ctaPrimaryHref: "/sentinel",
    ctaSecondary: "GitHub Repository",
    ctaSecondaryHref: "https://github.com/MeledakCik/audit-otomatis",
  },
];

export function HeroSpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = spotlightItems[activeIndex];

  return (
    <section
      id="spotlight"
      className="w-full bg-surface-canvas py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">
              Frontier Systems &amp; Digital Craft
            </p>
            <h1 className="font-editorial-display text-4xl sm:text-5xl lg:text-[4.25rem] text-text-primary">
              Our next era of studio engineering
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#ecosystem"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-text-primary text-surface-canvas rounded-full text-sm font-medium hover:bg-primary-container transition-colors shadow-sm"
            >
              <span>Explore ecosystem</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#updates"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-surface-subtle text-text-primary rounded-full text-sm font-medium hover:bg-surface-container transition-colors border border-border-subtle"
            >
              <span>Release notes</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 bg-surface-subtle border border-border-subtle rounded-2xl p-6 sm:p-10 flex flex-col justify-between shadow-sm relative overflow-hidden group">
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 bg-badge-accent-bg text-badge-accent-text text-xs font-semibold rounded-full tracking-wide">
                  {current.badge}
                </span>
                <span className="font-mono text-xs text-text-tertiary">
                  {current.index}
                </span>
              </div>
              <h2 className="font-editorial-xl text-3xl sm:text-4xl lg:text-5xl text-text-primary mb-2">
                {current.title}
              </h2>
              <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
                {current.subtitle}
              </p>
            </div>

            <div className="my-8 relative h-64 sm:h-80 w-full rounded-xl overflow-hidden border border-border-subtle bg-[#0B0F19] flex items-center justify-center">
              <svg
                viewBox="0 0 800 360"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                aria-hidden="true"
              >
                <defs>
                  <radialGradient id="heroGlow" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#1F6FEB" stopOpacity="0.45" />
                    <stop offset="55%" stopColor="#00E5FF" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="#0B0F19" stopOpacity="1" />
                  </radialGradient>
                  <linearGradient id="gridLine" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#A855F7" stopOpacity="0.15" />
                  </linearGradient>
                </defs>
                <rect width="800" height="360" fill="url(#heroGlow)" />
                <g stroke="url(#gridLine)" strokeWidth="1" fill="none" opacity="0.55">
                  <circle cx="400" cy="180" r="70" />
                  <circle cx="400" cy="180" r="125" strokeDasharray="6 6" />
                  <circle cx="400" cy="180" r="185" />
                  <path d="M80 180 H720 M400 20 V340" opacity="0.35" />
                  <path d="M180 70 L400 180 L620 90 M210 280 L400 180 L600 265" />
                </g>
                <g fill="#EBF3FE">
                  <circle cx="400" cy="180" r="10" fill="#00E5FF" />
                  <circle cx="180" cy="70" r="5" />
                  <circle cx="620" cy="90" r="5" />
                  <circle cx="210" cy="280" r="5" />
                  <circle cx="600" cy="265" r="5" />
                </g>
              </svg>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80 font-mono bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10">
                <span>NODE: DEPUP-EDGE-01</span>
                <span className="text-cyan-300">LATENCY &lt; 18ms</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <a
                  href={current.ctaPrimaryHref}
                  target={current.ctaPrimaryHref.startsWith("http") ? "_blank" : undefined}
                  rel={current.ctaPrimaryHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center justify-center px-6 py-2 bg-text-primary text-surface-canvas rounded-full text-sm font-medium hover:bg-primary transition-colors"
                >
                  {current.ctaPrimary}
                </a>
                <a
                  href={current.ctaSecondaryHref}
                  target={current.ctaSecondaryHref.startsWith("http") ? "_blank" : undefined}
                  rel={current.ctaSecondaryHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center justify-center px-6 py-2 bg-surface-canvas text-text-primary rounded-full text-sm font-medium hover:bg-surface-container transition-colors border border-border-subtle"
                >
                  {current.ctaSecondary}
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-text-tertiary text-sm">
                <CheckCircle2 className="w-4 h-4 text-badge-accent-text" />
                <span>{current.status}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4 justify-between">
            <button
              type="button"
              onClick={() => setActiveIndex(0)}
              className={`text-left bg-surface-subtle p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                activeIndex === 0
                  ? "border-primary-container shadow-md"
                  : "border-border-subtle hover:border-border-strong shadow-sm"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                    Cloud &amp; MCP
                  </span>
                  <Cloud className="w-4 h-4 text-text-tertiary" />
                </div>
                <h3 className="font-editorial-sm text-lg text-text-primary mb-1">
                  depup.cloud
                </h3>
                <p className="text-sm text-text-secondary">
                  Remote MCP servers, OAuth gateways, and multi-tenant app hosting
                </p>
              </div>
              <span className="mt-4 text-sm font-medium text-primary inline-flex items-center gap-1">
                Focus spotlight <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveIndex(1)}
              className={`text-left bg-surface-subtle p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                activeIndex === 1
                  ? "border-primary-container shadow-md"
                  : "border-border-subtle hover:border-border-strong shadow-sm"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                    Productivity
                  </span>
                  <Smartphone className="w-4 h-4 text-text-tertiary" />
                </div>
                <h3 className="font-editorial-sm text-lg text-text-primary mb-1">
                  depup Office
                </h3>
                <p className="text-sm text-text-secondary">
                  Document scanning &amp; studio productivity on Android and Windows
                </p>
              </div>
              <span className="mt-4 text-sm font-medium text-primary inline-flex items-center gap-1">
                Focus spotlight <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveIndex(2)}
              className={`text-left bg-surface-subtle p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                activeIndex === 2
                  ? "border-primary-container shadow-md"
                  : "border-border-subtle hover:border-border-strong shadow-sm"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                    Security
                  </span>
                  <ShieldCheck className="w-4 h-4 text-text-tertiary" />
                </div>
                <h3 className="font-editorial-sm text-lg text-text-primary mb-1">
                  Sentinel-ID
                </h3>
                <p className="text-sm text-text-secondary">
                  Passive security auditing with encrypted proof vault storage
                </p>
              </div>
              <span className="mt-4 text-sm font-medium text-primary inline-flex items-center gap-1">
                Focus spotlight <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            <a
              href="#engineering"
              className="bg-surface-container p-5 rounded-2xl flex items-center justify-between shadow-sm hover:bg-surface-container-high transition-colors border border-border-subtle"
            >
              <div className="min-w-0 pr-3">
                <div className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Depup Labs
                </div>
                <div className="font-editorial-sm text-base text-text-primary truncate">
                  Architecture &amp; Open Tooling
                </div>
              </div>
              <span className="shrink-0 w-10 h-10 rounded-full bg-text-primary text-surface-canvas flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
