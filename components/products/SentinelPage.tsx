import { ArrowRight, ArrowUpRight, Check, Globe, Network, Radar, ShieldCheck, Timer } from "lucide-react";
import { PlatformDownloads } from "@/components/PlatformDownloads";
import { ProductFooter, ProductHeader } from "@/components/ProductChrome";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollScene } from "@/components/ScrollScene";
import { SentinelPreview } from "@/components/SentinelPreview";
import type { Lang } from "@/lib/i18n";
import { PRODUCTS } from "@/lib/products";
import { jsonLdString, productJsonLd } from "@/lib/seo";

const product = PRODUCTS.sentinel;
const sentinelUrl = product.site!;

const COPY = {
  id: {
    download: "unduh",
    headerCta: "Buka Sentinel ID",
    eyebrow: "Passive-only security auditor",
    h1: ["Audit website dengan cara yang ", "lebih tenang."],
    lead: "Sentinel ID membantu pemilik website meninjau kebersihan keamanan dasar melalui crawl dan analisis pasif—tanpa payload dan tanpa eksploitasi.",
    open: "Buka sentinel-id.net",
    preview: "Lihat preview",
    rules: "Hanya untuk domain milik sendiri · GET-only · tanpa bypass WAF ·",
    privacy: "Kebijakan Privasi",
    previewEyebrow: "Preview interaktif · data contoh",
    previewTitle: "Satu audit, beberapa cara melihat hasilnya.",
    previewText: "Jelajahi ringkasan, temuan, peta halaman, dan contoh laporan. Preview ini tidak menjalankan scan.",
    principlesEyebrow: "Prinsip kerja",
    principlesTitle: "Tetap sopan pada website yang diperiksa.",
    principles: [
      ["Pasif, GET-only", "Tidak mencoba login, mengirim form, menyuntik payload, atau mengeksploitasi temuan."],
      ["Same-origin", "Crawl tetap di domain target. Tautan ke domain eksternal dilewati."],
      ["Batas permintaan", "Maksimal 100 request dan crawl hingga 50 halaman per scan."],
      ["Cloudflare-aware", "Jika challenge terdeteksi, scan berhenti dengan instruksi—tanpa mencoba bypass."],
    ],
    osintTitle: "Public data only.",
    osintText: "Lookup publik berdasarkan username, email, domain, atau nama. Tanpa login, tanpa scraping di balik autentikasi, dengan batas 10 permintaan per menit.",
    osintLink: "Lihat Sentinel ID",
    ethicsEyebrow: "Batas etis",
    ethicsTitle: "Gunakan hanya pada domain Anda.",
    ethicsText: "Sentinel ID dirancang untuk audit pasif website yang Anda miliki atau kelola. Temuan pola potensial bukan bukti eksploitasi dan perlu diperiksa manual.",
    ethicsList: ["Tidak ada brute force atau payload", "Tidak ada WAF bypass"],
    ctaEyebrow: "Mulai dengan Sentinel ID",
    ctaTitle: "Tinjau keamanan website dengan langkah yang terukur.",
    ctaText: "Pastikan target adalah domain milik Anda sebelum memulai.",
  },
  en: {
    download: "download",
    headerCta: "Open Sentinel ID",
    eyebrow: "Passive-only security auditor",
    h1: ["Audit your website the ", "calmer way."],
    lead: "Sentinel ID helps website owners review basic security hygiene through passive crawling and analysis — no payloads, no exploitation.",
    open: "Open sentinel-id.net",
    preview: "See the preview",
    rules: "Only for domains you own · GET-only · no WAF bypass ·",
    privacy: "Privacy Policy",
    previewEyebrow: "Interactive preview · sample data",
    previewTitle: "One audit, several ways to read the results.",
    previewText: "Explore the summary, findings, page map and a sample report. This preview does not run a scan.",
    principlesEyebrow: "How it works",
    principlesTitle: "Polite to the website it checks.",
    principles: [
      ["Passive, GET-only", "Never tries to log in, submit forms, inject payloads or exploit what it finds."],
      ["Same-origin", "The crawl stays on the target domain. Links to external domains are skipped."],
      ["Request limits", "At most 100 requests and up to 50 crawled pages per scan."],
      ["Cloudflare-aware", "If a challenge is detected, the scan stops with instructions — no bypass attempts."],
    ],
    osintTitle: "Public data only.",
    osintText: "Public lookups by username, email, domain or name. No logins, no scraping behind authentication, limited to 10 requests per minute.",
    osintLink: "See Sentinel ID",
    ethicsEyebrow: "Ethical limits",
    ethicsTitle: "Use it only on your own domain.",
    ethicsText: "Sentinel ID is built for passive audits of websites you own or manage. Potential patterns are not proof of exploitation and need manual review.",
    ethicsList: ["No brute force or payloads", "No WAF bypass"],
    ctaEyebrow: "Get started with Sentinel ID",
    ctaTitle: "Review your website's security, one measured step at a time.",
    ctaText: "Make sure the target is a domain you own before you start.",
  },
} as const;

const PRINCIPLE_ICONS = [ShieldCheck, Network, Timer, Radar];

export function SentinelPage({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <main lang={lang} className="min-h-screen bg-surface text-text-primary">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(productJsonLd("sentinel", lang)) }} />
      <ScrollProgress />
      <ProductHeader cta={{ label: t.headerCta, href: sentinelUrl }} lang={lang} path={product.path} />

      <section className="overflow-hidden bg-surface-canvas">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-16 lg:py-28">
          <ScrollReveal variant="left" className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-primary-container" />
              {t.eyebrow}
            </span>
            <h1 className="font-editorial-display mt-6 max-w-xl text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              {t.h1[0]}
              <span className="text-primary">{t.h1[1]}</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-text-secondary sm:text-lg">{t.lead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={sentinelUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-text-primary px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-container">
                {t.open} <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#preview" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border-subtle bg-surface-canvas px-5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-subtle">
                {t.preview} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 flex flex-wrap items-center gap-x-2 text-xs text-text-tertiary">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              {t.rules}{" "}
              <a href={product.privacy} className="font-medium text-primary hover:underline">{t.privacy}</a>
            </p>
          </ScrollReveal>

          <ScrollReveal variant="right">
            <ScrollScene className="relative min-w-0 scroll-scene--parallax">
              <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative"><SentinelPreview lang={lang} /></div>
            </ScrollScene>
          </ScrollReveal>
        </div>
      </section>

      <section id="preview" className="scroll-mt-8 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-16">
          <ScrollReveal variant="left" className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">{t.previewEyebrow}</span>
            <h2 className="font-editorial-xl mt-3 text-3xl sm:text-4xl lg:text-5xl">{t.previewTitle}</h2>
            <p className="mt-4 text-base leading-7 text-text-secondary">{t.previewText}</p>
          </ScrollReveal>
          <ScrollScene className="scroll-scene--parallax">
            <SentinelPreview expanded lang={lang} />
          </ScrollScene>
        </div>
      </section>

      <PlatformDownloads product={product} lang={lang} id={t.download} />

      <section id="features" className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-16">
          <ScrollReveal variant="left" className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">{t.principlesEyebrow}</span>
            <h2 className="font-editorial-xl mt-3 text-3xl sm:text-4xl">{t.principlesTitle}</h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.principles.map(([title, text], index) => {
              const Icon = PRINCIPLE_ICONS[index];
              return (
                <ScrollReveal key={title} variant={index % 2 === 0 ? "left" : "right"} delay={index * 55}>
                  <article className="rounded-2xl border border-border-subtle bg-surface-subtle p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-badge-accent-bg text-badge-accent-text"><Icon className="h-5 w-5" /></span>
                    <h3 className="font-editorial-sm mt-5 text-lg">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">{text}</p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <ScrollReveal variant="left">
            <article className="rounded-[1.75rem] border border-border-subtle bg-surface-canvas p-7 sm:p-10">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.15em] text-text-tertiary"><Globe className="h-4 w-4" /> OSINT lookup</span>
              <h2 className="font-editorial-xl mt-4 text-3xl">{t.osintTitle}</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-text-secondary">{t.osintText}</p>
              <a href={sentinelUrl + "/scan/osint"} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">{t.osintLink} <ArrowUpRight className="h-4 w-4" /></a>
            </article>
          </ScrollReveal>
          <ScrollReveal variant="right">
            <article id="safety" className="scroll-mt-8 rounded-[1.75rem] bg-[#111c32] p-7 text-white sm:p-10">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.15em] text-blue-200"><ShieldCheck className="h-4 w-4" /> {t.ethicsEyebrow}</span>
              <h2 className="font-editorial-xl mt-4 text-3xl">{t.ethicsTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-white/70">{t.ethicsText}</p>
              <ul className="mt-5 space-y-2 text-sm text-white/80">
                {t.ethicsList.map((item) => (
                  <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-300" /> {item}</li>
                ))}
              </ul>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 lg:px-16">
        <ScrollReveal variant="scale" className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 overflow-hidden rounded-[1.75rem] bg-[#111827] px-7 py-10 text-white sm:px-12 md:flex-row md:items-center md:justify-between md:py-14">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">{t.ctaEyebrow}</p>
              <h2 className="font-editorial-xl mt-3 text-3xl sm:text-4xl">{t.ctaTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">{t.ctaText}</p>
            </div>
            <a href={sentinelUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#111827] transition-colors hover:bg-blue-50">
              {t.open} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </ScrollReveal>
      </section>

      <ProductFooter lang={lang} />
    </main>
  );
}
