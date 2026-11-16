"use client";

import { useState, type CSSProperties } from "react";
import {
  ArrowRight,
  RotateCcw,
  Cloud,
  Code2,
  Cpu,
  ShieldCheck,
  Sparkles,
  Smartphone,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollScene } from "@/components/ScrollScene";
import { CardTilt } from "@/components/CardTilt";

type FilterCategory = "all" | "cloud" | "productivity" | "security" | "creative" | "open";

interface SystemCard {
  id: string;
  categories: FilterCategory[];
  badge?: string;
  eyebrow: string;
  title: string;
  description: string;
  tryLabel?: string;
  pills: string[];
  colSpan?: boolean;
  dark?: boolean;
  href: string;
  actionLabel: string;
}

const filterTabs: { id: FilterCategory; label: string }[] = [
  { id: "all", label: "All Systems" },
  { id: "cloud", label: "Cloud & MCP" },
  { id: "productivity", label: "Productivity" },
  { id: "security", label: "Security" },
  { id: "creative", label: "Creative & Media" },
  { id: "open", label: "Developer & OS" },
];

const systems: SystemCard[] = [
  {
    id: "depup-cloud",
    categories: ["cloud"],
    badge: "Flagship",
    eyebrow: "Cloud & Remote MCP",
    title: "depup.cloud",
    description:
      "Multi-tenant cloud deployment, hosting management, and remote Model Context Protocol infrastructure.",
    tryLabel: "Available on",
    pills: ["depup.cloud", "depup.web.id", "MCP Connectors", "Supabase Auth"],
    colSpan: true,
    href: "https://depup.cloud",
    actionLabel: "Open depup.cloud",
  },
  {
    id: "depup-office",
    categories: ["productivity"],
    badge: "Google Play",
    eyebrow: "Document & Productivity",
    title: "depup Office",
    description:
      "Document scanner and productivity suite across Android Kotlin and standalone Windows .NET 8.0.",
    tryLabel: "Platforms",
    pills: ["Google Play", "Windows .NET 8"],
    href: "/office",
    actionLabel: "Explore depup Office",
  },
  {
    id: "sentinel-id",
    categories: ["security"],
    eyebrow: "Passive Auditing",
    title: "Sentinel-ID",
    description:
      "Auditor keamanan pasif untuk domain milik sendiri. GET-only, same-origin, dan dibatasi maksimal 100 request per scan.",
    tryLabel: "Prinsip",
    pills: ["GET-only", "Same-origin", "Manual review"],
    href: "/sentinel",
    actionLabel: "Explore Sentinel-ID",
  },
  {
    id: "motionku",
    categories: ["creative"],
    eyebrow: "Motion Graphics",
    title: "MotionKu",
    description:
      "AI-powered short-form motion graphic studio with Hooke spring physics and Canvas MediaRecorder export.",
    tryLabel: "Capabilities",
    pills: ["24 Scene Engine", "AudioContext"],
    href: "#updates",
    actionLabel: "View project notes",
  },
  {
    id: "dvibes",
    categories: ["creative"],
    eyebrow: "Audio Streaming",
    title: "DVibes",
    description:
      "Cross-platform ad-free desktop and mobile music app built with Tauri 2, Next.js, and Howler.js.",
    tryLabel: "Sources",
    pills: ["Audius", "Offline Cache"],
    href: "#updates",
    actionLabel: "View project notes",
  },
  {
    id: "kasyaf-redis",
    categories: ["cloud", "open"],
    eyebrow: "Serverless Data",
    title: "Kasyaf Redis Cloud",
    description:
      "Lightweight multi-tenant serverless Redis and Qdrant vector database console deployed for low-latency workloads.",
    tryLabel: "Stack",
    pills: ["ioredis", "Qdrant Vector"],
    href: "#engineering",
    actionLabel: "See how it works",
  },
  {
    id: "depup-code",
    categories: ["open", "productivity"],
    eyebrow: "Hybrid Workspace",
    title: "Depup Code",
    description:
      "Offline-first hybrid web and desktop IDE combining VS Code ergonomics with depup.cloud deployment.",
    tryLabel: "Features",
    pills: ["IndexedDB Cache", "Direct Deploy"],
    href: "#engineering",
    actionLabel: "See how it works",
  },
  {
    id: "cikai-gateway",
    categories: ["cloud", "security"],
    badge: "Gateway",
    eyebrow: "Unified Inference Routing",
    title: "CikAi Gateway & Core Architecture",
    description:
      "Multi-model AI routing gateway engineered for deterministic fallback, rate limiting, and developer observability.",
    tryLabel: "Explore modules",
    pills: ["Express TypeScript", "Model Router", "Token Guard", "Health Probes"],
    colSpan: true,
    href: "#engineering",
    actionLabel: "See how it works",
  },
  {
    id: "depup-os",
    categories: ["open"],
    badge: "Open Tooling",
    eyebrow: "Developer Environment",
    title: "Depup OS Dev Edition",
    description:
      "Customized lightweight Windows 11 IoT LTSC developer operating system image with automated CLI provisioning.",
    tryLabel: "Build with Depup",
    pills: ["depup.bat CLI", "NTLite Profile", "Dev ISO"],
    colSpan: true,
    dark: true,
    href: "#engineering",
    actionLabel: "See how it works",
  },
];

interface EcosystemBentoProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function EcosystemBento({ searchQuery, onSearchChange }: EcosystemBentoProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const q = searchQuery.trim().toLowerCase();

  const filteredSystems = systems.filter((item) => {
    const matchesCategory =
      activeFilter === "all" || item.categories.includes(activeFilter);
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.eyebrow.toLowerCase().includes(q) ||
      item.pills.some((p) => p.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const accentFor = (item: SystemCard) =>
    item.categories.includes("cloud") ? "#69c9f2" :
    item.categories.includes("productivity") ? "#8aa8ff" :
    item.categories.includes("security") ? "#71d6c2" :
    item.categories.includes("creative") ? "#c5a5ff" : "#8bc0fa";

  const iconFor = (item: SystemCard) =>
    item.categories.includes("cloud") ? Cloud :
    item.categories.includes("productivity") ? Smartphone :
    item.categories.includes("security") ? ShieldCheck :
    item.categories.includes("creative") ? Sparkles :
    item.categories.includes("open") ? Code2 : Cpu;

  return (
    <section id="ecosystem" className="studio-ecosystem w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <ScrollReveal variant="left" className="t-stagger flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12 md:mb-16">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
              One studio · Many systems
            </span>
            <h2 className="font-editorial-display text-4xl sm:text-5xl lg:text-7xl text-text-primary mt-3">
              <span className="t-stagger-line t-stagger-line--1">A system for every</span>
              <span className="t-stagger-line t-stagger-line--2">kind of work.</span>
            </h2>
            <p className="max-w-2xl text-base md:text-lg text-text-secondary mt-4 leading-relaxed">
              Explore the products and platforms we build across cloud, productivity, security, and creative tools.
            </p>
          </div>
          <a
            href="#engineering"
            className="inline-flex self-start items-center gap-2 px-5 py-2.5 bg-text-primary text-surface-canvas rounded-full text-sm font-medium hover:bg-primary transition-colors shrink-0"
          >
            <span>Architecture</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </ScrollReveal>

        <ScrollReveal variant="scale" className="mb-8 md:mb-10 overflow-x-auto pb-2" delay={90}>
          <div className="flex min-w-max items-center gap-2" role="group" aria-label="Filter systems by category">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={
                    isActive
                      ? "inline-flex min-h-11 items-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border border-[#111827] bg-[#111827] text-white shadow-[0_8px_24px_rgba(17,24,39,0.16)]"
                      : "inline-flex min-h-11 items-center px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border border-black/10 bg-white/65 text-text-secondary hover:bg-white hover:text-text-primary"
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <div className="mb-4 flex min-h-8 items-center justify-between gap-4 text-xs text-text-tertiary" aria-live="polite">
          <span>{filteredSystems.length} {filteredSystems.length === 1 ? "system" : "systems"}</span>
          {(q || activeFilter !== "all") && <button type="button" onClick={() => { setActiveFilter("all"); onSearchChange(""); }} className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:text-text-primary"><RotateCcw className="h-3.5 w-3.5" />Clear filters</button>}
        </div>

        {filteredSystems.length === 0 ? (
          <div className="bg-white/70 border border-black/5 rounded-[28px] p-12 text-center shadow-sm">
            <p className="text-text-secondary text-base">
              No systems match &ldquo;{searchQuery}&rdquo;. Try clearing your search or switching tabs.
            </p>
          </div>
        ) : (
          <div key={`${activeFilter}-${q}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {filteredSystems.map((item, index) => (
              <ScrollReveal
                key={item.id}
                delay={index * 45}
                variant={index % 3 === 0 ? "left" : index % 3 === 1 ? "right" : "scale"}
                className={item.colSpan ? "md:col-span-2" : ""}
              >
                <CardTilt
                  className="system-card-tilt h-full"
                  style={{ "--system-accent": accentFor(item) } as CSSProperties}
                >
                <article
                  className={`system-card group relative flex h-full min-h-[430px] flex-col justify-between overflow-hidden rounded-[28px] border p-6 sm:p-8 ${item.dark ? "system-card--dark" : "system-card--light"}`}
                >
                  <ScrollScene className="system-card-art scroll-scene--parallax" aria-hidden="true">
                    <div className="system-card-orbit system-card-orbit--one" />
                    <div className="system-card-orbit system-card-orbit--two" />
                    <span className="system-card-icon">
                      {(() => {
                        const Icon = iconFor(item);
                        return <Icon className="h-7 w-7" strokeWidth={1.5} />;
                      })()}
                    </span>
                    <span className="system-card-index">DEPUP / {String(systems.indexOf(item) + 1).padStart(2, "0")}</span>
                  </ScrollScene>

                  <div className="relative z-10 mt-3">
                  <div className="flex items-center gap-2 mb-3">
                    {item.badge && (
                      <span
                        className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                          item.dark
                            ? "bg-primary text-on-primary"
                            : "bg-badge-accent-bg text-badge-accent-text"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        item.dark ? "text-surface-dim" : "text-text-tertiary"
                      }`}
                    >
                      {item.eyebrow}
                    </span>
                  </div>

                  <h3 className="font-editorial-display text-2xl sm:text-3xl tracking-tight">
                    {item.title}
                  </h3>

                  <p
                    className={`mt-2 text-sm sm:text-base max-w-xl leading-relaxed ${
                      item.dark ? "text-surface-container-highest" : "text-text-secondary"
                    }`}
                  >
                    {item.description}
                  </p>

                  {item.tryLabel && (
                    <div className="mt-5">
                      <p
                        className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                          item.dark ? "text-surface-dim" : "text-text-tertiary"
                        }`}
                      >
                        {item.tryLabel}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.pills.map((pill) => (
                          <span
                            key={pill}
                            className={`system-card-pill px-3.5 py-1.5 rounded-full text-xs sm:text-sm ${
                              item.dark
                                ? "bg-surface-canvas/10 text-surface-canvas backdrop-blur"
                                : "bg-surface-canvas text-text-primary border border-border-subtle shadow-sm"
                            }`}
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  </div>

                <div className="relative z-10 mt-7 pt-4 border-t border-current/10">
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3 ${
                      item.dark ? "text-inverse-primary" : "text-primary"
                    }`}
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                </article>
                </CardTilt>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
