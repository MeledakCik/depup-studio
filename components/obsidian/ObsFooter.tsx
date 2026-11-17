"use client";

import { ArrowUp } from "lucide-react";

type FooterLink = { label: string; href?: string; system?: string; external?: boolean };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Cloud & Compute",
    links: [
      { label: "depup.cloud", href: "https://depup.cloud", external: true },
      { label: "Remote MCP", system: "cloud" },
      { label: "Kasyaf Redis Cloud", system: "kasyaf" },
      { label: "CikAi Gateway", system: "cikai" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "depup Office", href: "/office" },
      { label: "MotionKu", system: "motionku" },
      { label: "DVibes", system: "dvibes" },
      { label: "Depup Code", system: "code" },
    ],
  },
  {
    title: "Security",
    links: [
      { label: "Sentinel-ID", href: "/sentinel" },
      { label: "sentinel-id.net", href: "https://sentinel-id.net", external: true },
      { label: "Engineering principles", href: "#engineering" },
      { label: "Depup OS Dev Edition", system: "os" },
    ],
  },
  {
    title: "Depup Studio",
    links: [
      { label: "Studio Manifesto", href: "#mission" },
      { label: "Studio Updates", href: "#updates" },
      { label: "GitHub", href: "https://github.com/MeledakCik", external: true },
      { label: "Support the studio", href: "https://saweria.co/depupdonate", external: true },
    ],
  },
];

export function ObsFooter({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <footer className="w-full border-t border-white/12 bg-obs-elevated py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-16 grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-obs-mono text-[12px] uppercase tracking-[0.08em] text-obs-dim">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.system ? (
                      <button type="button" onClick={() => onOpen(l.system!)} className="obs-underline text-left text-[13px] text-obs-muted transition-colors hover:text-obs-text">
                        {l.label}
                      </button>
                    ) : (
                      <a
                        href={l.href}
                        target={l.external ? "_blank" : undefined}
                        rel={l.external ? "noreferrer" : undefined}
                        className="obs-underline text-[13px] text-obs-muted transition-colors hover:text-obs-text"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="mb-4 font-obs-mono text-[12px] uppercase tracking-[0.08em] text-obs-dim">Security Brief</h4>
            <p className="mb-4 text-[13px] leading-[20px] text-obs-dim">
              Passive by default. Every Sentinel scan is GET-only, same-origin, and capped at 100 requests.
            </p>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-obs-sky" />
              <span className="font-obs-mono text-[12px] text-obs-sky">Sentinel v4.9 Active</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/12 pt-6 md:flex-row md:items-center">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <span className="text-[13px] text-obs-dim">© 2026 Depup Studio. Made with intent.</span>
            <div className="flex items-center gap-3 text-[13px] text-obs-dim">
              <a className="transition-colors hover:text-obs-muted" href="/office/privacy-policy">
                Privacy Policy
              </a>
              <span className="text-white/12">•</span>
              <a className="transition-colors hover:text-obs-muted" href="https://github.com/MeledakCik" target="_blank" rel="noreferrer">
                Source
              </a>
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 font-obs-mono text-[12px] text-obs-dim transition-colors hover:text-obs-text"
          >
            Obsidian Spec // Back to top
            <span className="grid h-7 w-7 place-items-center rounded-full border border-white/12 transition-all group-hover:-translate-y-0.5 group-hover:border-white/24">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
