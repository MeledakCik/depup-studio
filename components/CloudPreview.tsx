"use client";

import { useState } from "react";
import { Bot, CheckCircle2, Clock, Cloud, Link2, Loader2, Rocket } from "lucide-react";

const tabs = [
  { id: "deploy", label: "Deploy", icon: Rocket },
  { id: "link", label: "Link Instan", icon: Link2 },
  { id: "claude", label: "Konektor Claude", icon: Bot },
] as const;

type Tab = (typeof tabs)[number]["id"];

const deploys = [
  { name: "toko-kue", platform: "Vercel", domain: "toko-kue.vercel.app", status: "ready", time: "2 mnt lalu" },
  { name: "landing-sekolah", platform: "Cloudflare Pages", domain: "landing-sekolah.pages.dev", status: "building", time: "baru saja" },
  { name: "api-absensi", platform: "Railway", domain: "api-absensi.up.railway.app", status: "ready", time: "1 jam lalu" },
] as const;

/** Pratinjau dashboard depup.cloud dengan DATA CONTOH (tidak terhubung ke akun apa pun). */
export function CloudPreview({ expanded = false }: { expanded?: boolean }) {
  const [tab, setTab] = useState<Tab>("deploy");
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1220] text-slate-200 shadow-[0_30px_90px_rgba(8,20,45,0.35)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 inline-flex items-center gap-1.5 rounded-md bg-white/[.06] px-2.5 py-1 text-[11px] text-slate-400">
          <Cloud className="h-3.5 w-3.5" /> depup.cloud/dashboard
        </span>
      </div>

      <div className="obs-noscroll flex gap-1 overflow-x-auto border-b border-white/10 px-3 pt-3" role="tablist" aria-label="Pratinjau depup.cloud">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-t-lg px-3 py-2 text-xs font-medium transition-colors ${
              tab === id ? "bg-white/[.08] text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Icon className="h-3.5 w-3.5" /> {label}
          </button>
        ))}
      </div>

      <div className={`p-4 sm:p-5 ${expanded ? "min-h-[320px]" : "min-h-[260px]"}`} role="tabpanel">
        {tab === "deploy" && (
          <div className="space-y-2.5">
            {deploys.map((d) => (
              <div key={d.name} className="flex items-center gap-3 rounded-xl border border-white/[.08] bg-white/[.03] px-3.5 py-3">
                {d.status === "ready" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                ) : (
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin text-sky-300" />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-white">{d.name}</span>
                  <span className="block truncate text-[11px] text-slate-400">{d.domain}</span>
                </span>
                <span className="hidden rounded-full bg-white/[.06] px-2 py-1 text-[10px] text-slate-300 sm:inline">{d.platform}</span>
                <span className="shrink-0 text-[10px] text-slate-400">{d.time}</span>
              </div>
            ))}
            {expanded && (
              <p className="pt-2 text-xs leading-5 text-slate-400">
                Hubungkan token Vercel, Cloudflare, atau Railway sekali; token disimpan terenkripsi AES-256-GCM dan hanya dipakai di server.
              </p>
            )}
          </div>
        )}
        {tab === "link" && (
          <div className="grid gap-3 sm:grid-cols-[1.2fr_.8fr]">
            <div className="grid place-items-center rounded-xl border border-dashed border-white/15 bg-white/[.02] px-4 py-10 text-center">
              <Link2 className="h-6 w-6 text-sky-300" />
              <p className="mt-3 text-sm font-medium text-white">Tarik folder website ke sini</p>
              <p className="mt-1 text-[11px] text-slate-400">HTML/CSS/JS statis · langsung tayang</p>
            </div>
            <div className="space-y-2.5 rounded-xl border border-white/[.08] bg-white/[.03] p-4">
              <p className="text-[11px] uppercase tracking-wider text-slate-400">Link aktif</p>
              <p className="truncate text-sm font-medium text-sky-300">tugas-web.depup.web.id</p>
              <p className="inline-flex items-center gap-1.5 text-[11px] text-slate-400"><Clock className="h-3.5 w-3.5" /> Kedaluwarsa dalam 7 hari</p>
            </div>
          </div>
        )}
        {tab === "claude" && (
          <div className="space-y-3">
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-sky-500/20 px-3.5 py-2.5 text-sm text-sky-50">
              Deploy repo toko-kue ke Vercel.
            </div>
            <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-white/[.08] bg-white/[.04] px-3.5 py-2.5 text-sm">
              <span className="mb-1 inline-flex items-center gap-1.5 text-[11px] text-slate-400"><Bot className="h-3.5 w-3.5" /> depup.cloud · deploy_project</span>
              <p>Selesai — <span className="text-sky-300">toko-kue.vercel.app</span> sudah tayang.</p>
            </div>
            <p className="text-[11px] leading-5 text-slate-400">Konektor MCP memakai OAuth 2.0 + PKCE. Token platform tidak pernah dikirim ke chat.</p>
          </div>
        )}
      </div>
      <p className="border-t border-white/10 px-4 py-2 text-[10px] text-slate-400">Data contoh untuk pratinjau.</p>
    </div>
  );
}
