import type { Metadata } from "next";
import { PRODUCT_KEYWORDS, jsonLdString, productJsonLd } from "@/lib/seo";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe,
  Network,
  Radar,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { SentinelPreview } from "@/components/SentinelPreview";
import { PlatformDownloads } from "@/components/PlatformDownloads";
import { ProductFooter, ProductHeader } from "@/components/ProductChrome";
import { PRODUCTS } from "@/lib/products";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollScene } from "@/components/ScrollScene";

const sentinelUrl = "https://sentinel-id.net";

const SEO_TITLE = "Sentinel-ID — Audit Keamanan Website Pasif untuk Domain Anda";
const SEO_DESCRIPTION =
  "Cek keamanan website Anda secara pasif: header, TLS, DNS, file sensitif, SEO, dan performa. Hanya GET/HEAD, maks. 100 request, tanpa eksploit.";

export const metadata: Metadata = {
  title: { absolute: SEO_TITLE },
  description: SEO_DESCRIPTION,
  keywords: PRODUCT_KEYWORDS.sentinel,
  alternates: { canonical: "/sentinel", languages: { "id-ID": "/sentinel", "x-default": "/sentinel" } },
  openGraph: { title: SEO_TITLE, description: SEO_DESCRIPTION, url: "/sentinel", locale: "id_ID", type: "website", siteName: "Depup Studio" },
  twitter: { card: "summary_large_image", title: SEO_TITLE, description: SEO_DESCRIPTION },
};

const principles = [
  {
    icon: ShieldCheck,
    title: "Pasif, GET-only",
    text: "Tidak mencoba login, mengirim form, menyuntik payload, atau mengeksploitasi temuan.",
  },
  {
    icon: Network,
    title: "Same-origin",
    text: "Crawl tetap di domain target. Tautan ke domain eksternal dilewati.",
  },
  {
    icon: Timer,
    title: "Batas permintaan",
    text: "Maksimal 100 request dan crawl hingga 50 halaman per scan.",
  },
  {
    icon: Radar,
    title: "Cloudflare-aware",
    text: "Jika challenge terdeteksi, scan berhenti dengan instruksi—tanpa mencoba bypass.",
  },
];

export default function SentinelPage() {
  return (
    <main lang="id" className="min-h-screen bg-surface text-text-primary">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(productJsonLd("sentinel", SEO_DESCRIPTION)) }} />
      <ScrollProgress />
      <ProductHeader
        cta={{ label: "Buka Sentinel-ID", href: sentinelUrl }}
      />

      <section className="overflow-hidden bg-surface-canvas">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-16 lg:py-28">
          <ScrollReveal variant="left" className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-primary-container" />
              Passive-only security auditor
            </span>
            <h1 className="font-editorial-display mt-6 max-w-xl text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Audit website dengan cara yang <span className="text-primary">lebih tenang.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-text-secondary sm:text-lg">
              Sentinel-ID membantu pemilik website meninjau kebersihan keamanan dasar melalui crawl dan analisis pasif—tanpa payload dan tanpa eksploitasi.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={sentinelUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-text-primary px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-container">
                Buka sentinel-id.net <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#preview" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border-subtle bg-surface-canvas px-5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-subtle">
                Lihat preview <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 flex flex-wrap items-center gap-x-2 text-xs text-text-tertiary">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Hanya untuk domain milik sendiri · GET-only · tanpa bypass WAF ·{" "}
              <a href="/sentinel/privacy-policy" className="font-medium text-primary hover:underline">Kebijakan Privasi</a>
            </p>
          </ScrollReveal>

          <ScrollReveal variant="right">
          <ScrollScene className="relative min-w-0 scroll-scene--parallax">
            <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative"><SentinelPreview /></div>
          </ScrollScene>
          </ScrollReveal>
        </div>
      </section>

      <section id="preview" className="scroll-mt-8 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-16">
          <ScrollReveal variant="left" className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">Preview interaktif · data contoh</span>
            <h2 className="font-editorial-xl mt-3 text-3xl sm:text-4xl lg:text-5xl">Satu audit, beberapa cara melihat hasilnya.</h2>
            <p className="mt-4 text-base leading-7 text-text-secondary">Jelajahi ringkasan, temuan, peta halaman, dan contoh laporan. Preview ini tidak menjalankan scan.</p>
          </ScrollReveal>
          <ScrollScene className="scroll-scene--parallax">
            <SentinelPreview expanded />
          </ScrollScene>
        </div>
      </section>

      <PlatformDownloads product={PRODUCTS.sentinel} />

      <section id="features" className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-16">
          <ScrollReveal variant="left" className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">Prinsip kerja</span>
            <h2 className="font-editorial-xl mt-3 text-3xl sm:text-4xl">Tetap sopan pada website yang diperiksa.</h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(({ icon: Icon, title, text }, index) => (
              <ScrollReveal key={title} variant={index % 2 === 0 ? "left" : "right"} delay={index * 55}>
              <article className="rounded-2xl border border-border-subtle bg-surface-subtle p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-badge-accent-bg text-badge-accent-text"><Icon className="h-5 w-5" /></span>
                <h3 className="font-editorial-sm mt-5 text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-text-secondary">{text}</p>
              </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <ScrollReveal variant="left">
          <article className="rounded-[1.75rem] border border-border-subtle bg-surface-canvas p-7 sm:p-10">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.15em] text-text-tertiary"><Globe className="h-4 w-4" /> OSINT lookup</span>
            <h2 className="font-editorial-xl mt-4 text-3xl">Public data only.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-text-secondary">Lookup publik berdasarkan username, email, domain, atau nama. Tanpa login, tanpa scraping di balik autentikasi, dengan batas 10 permintaan per menit.</p>
            <a href={sentinelUrl + "/scan/osint"} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Lihat Sentinel-ID <ArrowUpRight className="h-4 w-4" /></a>
          </article>
          </ScrollReveal>
          <ScrollReveal variant="right">
          <article id="safety" className="scroll-mt-8 rounded-[1.75rem] bg-[#111c32] p-7 text-white sm:p-10">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.15em] text-blue-200"><ShieldCheck className="h-4 w-4" /> Batas etis</span>
            <h2 className="font-editorial-xl mt-4 text-3xl">Gunakan hanya pada domain Anda.</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">Sentinel-ID dirancang untuk audit pasif website yang Anda miliki atau kelola. Temuan pola potensial bukan bukti eksploitasi dan perlu diperiksa manual.</p>
            <ul className="mt-5 space-y-2 text-sm text-white/80">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-300" /> Tidak ada brute force atau payload</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-300" /> Tidak ada WAF bypass</li>
            </ul>
          </article>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 lg:px-16">
        <ScrollReveal variant="scale" className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 overflow-hidden rounded-[1.75rem] bg-[#111827] px-7 py-10 text-white sm:px-12 md:flex-row md:items-center md:justify-between md:py-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">Mulai dengan Sentinel-ID</p>
            <h2 className="font-editorial-xl mt-3 text-3xl sm:text-4xl">Tinjau keamanan website dengan langkah yang terukur.</h2>
            <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">Pastikan target adalah domain milik Anda sebelum memulai.</p>
          </div>
          <a href={sentinelUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#111827] transition-colors hover:bg-blue-50">
            Buka sentinel-id.net <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        </ScrollReveal>
      </section>

      <ProductFooter />
    </main>
  );
}
