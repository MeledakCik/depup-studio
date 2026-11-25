"use client";

import { useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Cloud, LockKeyhole, ScanLine } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollScene } from "@/components/ScrollScene";

const dispatches = [
  {
    ep: "FIELD NOTE / 01",
    topic: "Infrastructure",
    title: "A clearer path between tools and teams",
    summary:
      "Remote MCP gateways bring cloud workspaces and connected tools into one managed flow.",
    icon: Cloud,
    color: "#83caff",
    link: "#ecosystem",
  },
  {
    ep: "FIELD NOTE / 02",
    topic: "Security",
    title: "Security reviews built for careful decisions",
    summary:
      "Sentinel-ID keeps its audit approach transparent, passive-first, and ready for manual review.",
    icon: LockKeyhole,
    color: "#70ddc9",
    link: "/sentinel#safety",
  },
  {
    ep: "FIELD NOTE / 03",
    topic: "Productivity",
    title: "Document work that follows you",
    summary:
      "depup Office connects capture, organization, and everyday document work across devices.",
    icon: ScanLine,
    color: "#9ab4ff",
    link: "/office",
  },
];

export function InsightsAndMission() {
  const [active, setActive] = useState(0);
  const selected = dispatches[active];
  const ActiveIcon = selected.icon;

  return (
    <section id="mission" className="mission-section w-full">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 py-24 md:py-32">
        <ScrollReveal variant="left" className="t-stagger flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow-label">Notes from the studio</span>
            <h2 className="font-editorial-display text-4xl sm:text-5xl lg:text-7xl text-text-primary mt-3">
              <span className="t-stagger-line t-stagger-line--1">Ideas into</span>
              <span className="t-stagger-line t-stagger-line--2">working systems.</span>
            </h2>
          </div>
          <span className="mission-section-aside">A closer look at the choices behind the tools.</span>
        </ScrollReveal>

        <div className="dispatch-layout">
          <ScrollReveal variant="left" className="dispatch-selector" delay={90}>
            {dispatches.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  type="button"
                  aria-pressed={active === index}
                  aria-controls="dispatch-detail"
                  key={item.ep}
                  className={`dispatch-option ${active === index ? "is-active" : ""}`}
                  onClick={() => setActive(index)}
                >
                  <span className="dispatch-option-icon" style={{ "--dispatch-color": item.color } as CSSProperties}><Icon /></span>
                  <span className="dispatch-option-copy">
                    <span>{item.ep} <i>/</i> {item.topic}</span>
                    <strong>{item.title}</strong>
                  </span>
                  <ArrowRight className="dispatch-option-arrow" />
                </button>
              );
            })}
          </ScrollReveal>

          <ScrollReveal variant="right" delay={150}>
            <article
              id="dispatch-detail"
              className="dispatch-feature"
              role="region"
              aria-label={selected.topic}
              key={selected.ep}
              style={{ "--dispatch-color": selected.color } as CSSProperties}
            >
              <div className="dispatch-feature-top">
                <span>{selected.ep}</span>
                <span className="dispatch-feature-icon"><ActiveIcon /></span>
              </div>
              <div className="dispatch-feature-copy">
                <p>{selected.topic} / Depup Studio</p>
                <h3>{selected.title}</h3>
                <span>{selected.summary}</span>
                <a href={selected.link}>Explore this system <ArrowUpRight /></a>
              </div>
              <ScrollScene className="dispatch-feature-orbit scroll-scene--parallax" aria-hidden="true" />
              <span className="dispatch-feature-index" aria-hidden="true">0{active + 1}</span>
            </article>
          </ScrollReveal>
        </div>
      </div>

      <ScrollScene motion="closing" className="mission-manifesto scroll-scene--closing">
        <div className="mission-manifesto-glow mission-manifesto-glow--one" aria-hidden="true" />
        <div className="mission-manifesto-glow mission-manifesto-glow--two" aria-hidden="true" />
        <div className="mission-manifesto-grid" aria-hidden="true" />
        <ScrollReveal variant="scale" className="mission-manifesto-inner t-stagger">
          <span className="mission-kicker"><span /> Independent software studio · Indonesia</span>
          <h2>
            <span className="t-stagger-line t-stagger-line--1">Built to move</span>
            <span className="t-stagger-line t-stagger-line--2">real work forward.</span>
          </h2>
          <p>We make thoughtful software, useful infrastructure, and connected tools for the people who put them to work.</p>
          <div className="mission-actions">
            <a href="#ecosystem" className="mission-button mission-button--light">Explore the ecosystem <ArrowRight /></a>
            <a href="mailto:depupdev@gmail.com" className="mission-button mission-button--outline">Contact the studio <ArrowUpRight /></a>
          </div>
          <div className="mission-signature"><span>DEPUP</span><i /> STUDIO / 2026</div>
        </ScrollReveal>
      </ScrollScene>
    </section>
  );
}
