"use client";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownToLine,
  FileText,
  GitBranch,
  Globe,
  ShieldCheck,
} from "lucide-react";
import type { Lang } from "@/lib/i18n";

const COPY = {
  id: {
    choose: "Pilih tampilan preview",
    patterns: "Pola potensial · perlu tinjauan manual",
    count: "3 contoh dari 12",
    note: "Preview ilustratif. Tidak ada pemindaian yang dijalankan di halaman ini.",
  },
  en: {
    choose: "Choose a preview view",
    patterns: "Potential patterns · need manual review",
    count: "3 samples of 12",
    note: "Illustrative preview. No scan runs on this page.",
  },
} as const;

const tabs = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "findings", label: "Findings", icon: AlertTriangle },
  { id: "graph", label: "Graph view", icon: GitBranch },
  { id: "report", label: "Report", icon: FileText },
] as const;

type PreviewTab = (typeof tabs)[number]["id"];

const findings = [
  { name: "Library version disclosure", type: "Fingerprint", severity: "MEDIUM", color: "text-amber-300 bg-amber-300/10" },
  { name: "Potential DOM sink pattern", type: "JavaScript review", severity: "POTENTIAL", color: "text-violet-300 bg-violet-300/10" },
  { name: "Missing security header", type: "Configuration", severity: "LOW", color: "text-sky-300 bg-sky-300/10" },
] as const;

function FindingRows({ compact = false }: { compact?: boolean }) {
  return (
    <div className="divide-y divide-white/10">
      {findings.map((finding) => (
        <div key={finding.name} className="flex items-center gap-2.5 py-2.5 first:pt-0 last:pb-0">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[.06] text-slate-300"><ShieldCheck className="h-4 w-4" /></span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[10px] font-medium text-slate-200 sm:text-xs">{finding.name}</span>
            {!compact && <span className="mt-1 block text-[9px] text-slate-400">{finding.type}</span>}
          </span>
          <span className={`shrink-0 rounded-full px-2 py-1 text-[7px] font-semibold tracking-wide sm:text-[8px] ${finding.color}`}>{finding.severity}</span>
        </div>
      ))}
    </div>
  );
}

function OverviewPanel() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[["1", "URL crawled"], ["11", "JS files"], ["29", "Requests"]].map(([value, label]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-white/[.04] p-3 sm:p-4">
            <p className="text-lg font-semibold text-white sm:text-2xl">{value}</p>
            <p className="mt-1 text-[9px] text-slate-400 sm:text-[11px]">{label}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-[.85fr_1.15fr]">
        <div className="rounded-xl border border-white/10 bg-white/[.04] p-4">
          <div className="flex items-center justify-between">
            <div><p className="text-xs font-medium text-slate-300">QC score</p><p className="mt-2 text-3xl font-semibold text-white">86<span className="text-base text-slate-400">/100</span></p></div>
            <div className="grid h-14 w-14 place-items-center rounded-full border-[5px] border-emerald-400/80 border-r-slate-700 text-xs font-semibold text-emerald-300">86</div>
          </div>
          <p className="mt-3 text-[10px] leading-4 text-slate-400">Sample score for this preview. Findings need manual review.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[.04] p-4">
          <div className="mb-3 flex items-center justify-between"><p className="text-xs font-medium text-slate-300">Severity overview</p><span className="text-[9px] text-slate-400">Sample results</span></div>
          <div className="grid grid-cols-5 gap-1.5 text-center">
            {[["0", "CRIT", "text-rose-300"], ["0", "HIGH", "text-orange-300"], ["6", "MED", "text-amber-300"], ["4", "LOW", "text-sky-300"], ["2", "INFO", "text-slate-300"]].map(([n, label, color]) => (
              <div key={label} className="rounded-lg bg-black/20 py-2"><p className={`text-sm font-semibold ${color}`}>{n}</p><p className="mt-1 text-[7px] tracking-wide text-slate-400">{label}</p></div>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[.04] p-4">
        <div className="mb-3 flex items-center justify-between"><p className="text-xs font-medium text-slate-300">Recent findings</p><span className="text-[9px] text-sky-300">Potential patterns only</span></div>
        <FindingRows compact />
      </div>
    </div>
  );
}

function GraphPanel() {
  const nodes = [["left-[13%] top-[19%]", "Page 01"], ["right-[13%] top-[17%]", "JS bundle"], ["left-[11%] bottom-[17%]", "robots.txt"], ["right-[11%] bottom-[19%]", "API path"]];
  return (
    <div className="relative min-h-[270px] overflow-hidden rounded-xl border border-white/10 bg-[#0b1220] p-4 sm:min-h-[330px]">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(#8290a8 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 300" preserveAspectRatio="none" aria-hidden="true"><g stroke="#536783" strokeWidth="1.5" strokeDasharray="5 5"><path d="M300 145 135 75M300 145 470 67M300 145 125 235M300 145 475 225M135 75 470 67M125 235 475 225" /></g></svg>
      <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-blue-300/40 bg-blue-500/20 text-blue-200 shadow-[0_0_40px_rgba(59,130,246,.2)]"><Globe className="h-7 w-7" /><span className="absolute -bottom-5 whitespace-nowrap text-[8px] text-slate-300">sample-domain.id</span></div>
      {nodes.map(([position, label]) => <div key={label} className={`absolute ${position} rounded-lg border border-white/10 bg-slate-800/90 px-2.5 py-2 text-[8px] text-slate-200 shadow-lg sm:text-[9px]`}>{label}</div>)}
      <span className="absolute bottom-3 left-3 text-[8px] uppercase tracking-[.14em] text-slate-400">Graph view · sample map</span>
    </div>
  );
}

function ReportPanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0b1220]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3"><span className="text-xs font-medium text-slate-300">pentest-report.md</span><span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2 py-1 text-[8px] font-medium text-emerald-300"><ArrowDownToLine className="h-3 w-3" /> Markdown</span></div>
      <pre className="overflow-x-auto p-4 text-[9px] leading-5 text-slate-300 sm:text-[10px]"><code>{`# Passive Audit Report

Target: sample-domain.id
Mode: GET-only · Same-origin
Requests: 29 / 100

## Summary
- Critical: 0
- High: 0
- Medium: 6 (potential)
- Low: 4
- Info: 2

> Findings are patterns for manual review.`}</code></pre>
    </div>
  );
}

export function SentinelPreview({ expanded = false, lang = "id" }: { expanded?: boolean; lang?: Lang }) {
  const [tab, setTab] = useState<PreviewTab>("overview");
  const t = COPY[lang];
  return (
    <div className={`${expanded ? "mx-auto max-w-6xl rounded-[2rem] border border-slate-700 bg-[#111c32] p-4 shadow-[0_30px_90px_rgba(15,23,42,.2)] sm:p-6" : "rounded-[1.5rem] border border-slate-700 bg-[#111c32] p-3 shadow-[0_25px_70px_rgba(15,23,42,.25)] sm:p-4"}`}>
      <div className="flex items-center gap-3 border-b border-white/10 pb-3 sm:pb-4">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-500/15 text-blue-300"><ShieldCheck className="h-5 w-5" /></span>
        <div className="min-w-0 flex-1"><p className="text-xs font-semibold text-white sm:text-sm">Sentinel-ID</p><p className="mt-0.5 text-[8px] uppercase tracking-[.14em] text-slate-400 sm:text-[9px]">Passive-only audit preview</p></div>
        <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-[8px] font-semibold text-amber-200 sm:text-[9px]">SAMPLE DATA</span>
      </div>
      <div className={`${expanded ? "grid gap-5 pt-4 md:grid-cols-[170px_minmax(0,1fr)] sm:pt-5" : "pt-3 sm:pt-4"}`}>
        <nav className={`${expanded ? "flex gap-1 overflow-x-auto pb-1 md:flex-col md:gap-2" : "mb-3 flex gap-1 overflow-x-auto pb-1"}`} aria-label={t.choose}>
          {tabs.map(({ id, label, icon: Icon }) => <button key={id} type="button" aria-pressed={tab === id} onClick={() => setTab(id)} className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[9px] font-medium transition-colors sm:px-3 sm:text-[10px] ${expanded ? "md:w-full" : ""} ${tab === id ? "bg-blue-500/15 text-blue-200" : "text-slate-400 hover:bg-white/[.06] hover:text-slate-200"}`}><Icon className="h-3.5 w-3.5" />{label}</button>)}
        </nav>
        <div className="min-w-0">
          <div className="mb-3 flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-4">
            <div className="flex min-w-0 items-center gap-2"><Globe className="h-3.5 w-3.5 shrink-0 text-slate-400" /><span className="truncate text-[10px] font-medium text-slate-200 sm:text-xs">https://sample-domain.id</span></div>
            <span className="inline-flex items-center gap-1.5 text-[8px] text-slate-400 sm:text-[9px]"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Finished · GET-only</span>
          </div>
          {tab === "overview" && <OverviewPanel />}
          {tab === "findings" && <div className="rounded-xl border border-white/10 bg-white/[.04] p-4"><div className="mb-4 flex items-start justify-between gap-3"><div><h3 className="text-sm font-semibold text-white">Findings table</h3><p className="mt-1 text-[9px] text-slate-400">{t.patterns}</p></div><span className="text-[9px] text-slate-400">{t.count}</span></div><FindingRows /></div>}
          {tab === "graph" && <GraphPanel />}
          {tab === "report" && <ReportPanel />}
          <p className="mt-3 text-[8px] leading-4 text-slate-400">{t.note}</p>
        </div>
      </div>
    </div>
  );
}
