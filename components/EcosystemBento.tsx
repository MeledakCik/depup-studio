'use client';

import React from 'react';
import { Cloud, FileSpreadsheet, ShieldCheck, Zap, Smartphone, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export function EcosystemBento() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
          FOUNDATIONAL ECOSYSTEM • GOOGLE PLAY STORE
        </p>
        <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-white">
          Two flagship products. One unified architecture.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* depup.cloud Card */}
        <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-zinc-900/60 p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20">
                cloud.depup.app • Google Play
              </span>
              <Cloud className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">depup.cloud</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Zero-knowledge distributed cloud storage with block-level neural deduplication.
              Engineered by depup.studio to shrink mobile & enterprise footprints by up to 5.8x
              while keeping instant edge sync across Android & Web.
            </p>
          </div>
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">AES-256-GCM • Edge Sync</span>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-amber-300"
            >
              Google Play Store <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* depup Office Card */}
        <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-zinc-900/60 p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                studio.depup.office • Google Play
              </span>
              <FileSpreadsheet className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">depup Office</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Next-generation mobile & desktop document engine on Google Play. Native 120fps rendering
              for Word (.docx), Sheets (.xlsx), Slides (.pptx), and PDF with AI-assisted editorial
              precision and direct depup.cloud integration.
            </p>
          </div>
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">Local-First CRDT • 120Hz UI</span>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-amber-300"
            >
              Google Play Store <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
