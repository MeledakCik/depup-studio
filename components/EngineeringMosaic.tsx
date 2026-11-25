"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Globe,
  Lock,
  Terminal,
  Zap,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollScene } from "@/components/ScrollScene";

const pillars = [
  {
    icon: Globe,
    title: "Remote MCP Cloud",
    label: "01 / Connect",
    description:
      "Multi-tenant Model Context Protocol endpoints with OAuth and zero-downtime routing.",
    visual: "network",
    metric: "REMOTE",
    detail: "A managed path between apps, teams, and the tools they rely on.",
  },
  {
    icon: Lock,
    title: "Zero-Trust Proof Vault",
    label: "02 / Protect",
    description:
      "Passive security auditing backed by AES-256-GCM encryption and deterministic scan logs.",
    visual: "shield",
    metric: "PRIVATE",
    detail: "Evidence stays reviewable, encrypted, and connected to its source.",
  },
  {
    icon: Zap,
    title: "Edge Latency",
    label: "03 / Deliver",
    description: "Fast global delivery across Vercel, Cloudflare, and Turso.",
    visual: "edge",
    metric: "NEARBY",
    detail: "Product experiences are delivered close to the people using them.",
  },
  {
    icon: Cpu,
    title: "Procedural Motion",
    label: "04 / Create",
    description:
      "Browser-native graphics and spring-driven interactions shaped for real-time use.",
    visual: "motion",
    metric: "IN MOTION",
    detail: "Motion has a job: explain state, guide attention, and make tools feel responsive.",
  },
  {
    icon: Terminal,
    title: "Offline-First Tooling",
    label: "05 / Continue",
    description:
      "IndexedDB workspace caching and native desktop ports built for speed.",
    visual: "offline",
    metric: "READY OFFLINE",
    detail: "Work remains available when the network is slow or unavailable.",
  },
];

export function EngineeringMosaic() {
  const [active, setActive] = useState(0);
  const selected = pillars[active];
  const SelectedIcon = selected.icon;

  return (
    <section id="engineering" className="engineering-section w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <ScrollReveal variant="left" className="t-stagger flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-[60rem]">
            <span className="eyebrow-label">Engineering Foundations</span>
            <h2 className="font-editorial-display text-4xl sm:text-5xl lg:text-6xl text-text-primary mt-3">
              <span className="t-stagger-line t-stagger-line--1">Thoughtful by design.</span>
              <span className="t-stagger-line t-stagger-line--2">Reliable by engineering.</span>
            </h2>
          </div>
          <a href="#mission" className="studio-link shrink-0">
            <span>Our mission</span><ArrowRight className="h-4 w-4" />
          </a>
        </ScrollReveal>

        <div className="engineering-layout">
          <ScrollReveal variant="left" className="engineering-selector" delay={90}>
            <p className="engineering-selector-label">Select a principle</p>
            <div className="engineering-selector-list" role="group" aria-label="Engineering principles">
              {pillars.map((item, index) => {
                const Icon = item.icon;
                const isActive = active === index;
                return (
                  <button
                    key={item.title}
                    type="button"
                    aria-pressed={isActive}
                    aria-controls="engineering-detail"
                    onClick={() => setActive(index)}
                    className="engineering-option"
                  >
                    <span className="engineering-option-icon"><Icon className="h-5 w-5" strokeWidth={1.7} /></span>
                    <span className="engineering-option-copy">
                      <span className="engineering-option-label">{item.label}</span>
                      <span className="engineering-option-title">{item.title}</span>
                    </span>
                    <ArrowRight className="engineering-option-arrow h-4 w-4" />
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="right" className="engineering-panel-wrap" delay={160}>
            <div
              id="engineering-detail"
              className={`engineering-panel engineering-visual--${selected.visual}`}
              role="region"
              aria-label={selected.title}
              key={selected.title}
            >
              <div className="engineering-panel-topline">
                <span>DEPUP STUDIO / ENGINEERING</span>
                <span className="engineering-live"><span /> SYSTEM PRINCIPLE</span>
              </div>
              <ScrollScene className="engineering-graphic scroll-scene--parallax" aria-hidden="true">
                <div className="engineering-graphic-orbit engineering-graphic-orbit--outer" />
                <div className="engineering-graphic-orbit engineering-graphic-orbit--inner" />
                <div className="engineering-graphic-crosshair" />
                <div className="engineering-core"><SelectedIcon strokeWidth={1.35} /></div>
                <span className="engineering-graphic-tag engineering-graphic-tag--top">{selected.metric}</span>
                <span className="engineering-graphic-tag engineering-graphic-tag--bottom">{selected.label}</span>
                <span className="engineering-graphic-index">0{active + 1}</span>
              </ScrollScene>
              <div className="engineering-panel-copy">
                <div>
                  <p className="engineering-panel-kicker">{selected.label}</p>
                  <h3>{selected.title}</h3>
                  <p>{selected.detail}</p>
                </div>
                <a href="#ecosystem" aria-label={`Explore ${selected.title} in the ecosystem`}>
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="scale" className="platform-ribbon" delay={100}>
          <span className="platform-ribbon-title">Built across a connected platform</span>
          <div className="platform-ribbon-links">
            <a href="https://depup.cloud" target="_blank" rel="noopener noreferrer">depup.cloud <ArrowUpRight /></a>
            <a href="https://depup.web.id" target="_blank" rel="noopener noreferrer">depup.web.id <ArrowUpRight /></a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
