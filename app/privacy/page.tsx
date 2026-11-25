import type { Metadata } from "next";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { ProductFooter, ProductHeader } from "@/components/ProductChrome";
import { PRODUCTS, STUDIO } from "@/lib/products";

export const metadata: Metadata = {
  title: "Pusat Privasi — Depup Studio",
  description: "Kebijakan privasi semua produk Depup Studio: depup Office, Sentinel-ID, dan depup.cloud.",
  alternates: { canonical: "/privacy" },
};

const notes: Record<string, string> = {
  office: "Aplikasi offline: tanpa akun, tanpa iklan, tanpa analitik. Berkas tetap di perangkat Anda.",
  sentinel: "Audit pasif untuk domain milik Anda. Hasil scan terhapus otomatis 30 menit.",
  cloud: "Layanan dengan akun (Masuk dengan Google). Kebijakannya dikelola di domain layanan depup.cloud.",
};

export default function PrivacyHubPage() {
  const products = [PRODUCTS.office, PRODUCTS.sentinel, PRODUCTS.cloud];
  return (
    <main className="min-h-screen bg-surface text-text-primary">
      <ProductHeader />
      <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
          <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" /> Pusat Privasi
        </span>
        <h1 className="font-editorial-xl mt-3 text-4xl leading-tight sm:text-5xl">Privasi di semua produk {STUDIO.name}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
          Setiap produk punya kebijakan privasi sendiri karena datanya berbeda. Semuanya dikelola oleh {STUDIO.name}; pertanyaan
          dapat dikirim ke <a className="text-primary underline underline-offset-2 hover:no-underline" href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {products.map((p) => (
            <a
              key={p.id}
              href={p.privacy}
              {...(p.privacyHostedHere ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              className="group flex flex-col rounded-2xl border border-border-subtle bg-surface-canvas p-6 transition-colors hover:border-primary/40"
            >
              <h2 className="font-editorial-sm text-lg">{p.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-text-secondary">{notes[p.id]}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Baca kebijakan
                {!p.privacyHostedHere && <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
              </span>
              <span className="mt-1 truncate text-xs text-text-tertiary">
                {p.privacyHostedHere ? `${STUDIO.domain}${p.privacy}` : p.privacy.replace("https://", "")}
              </span>
            </a>
          ))}
        </div>
      </div>
      <ProductFooter />
    </main>
  );
}
