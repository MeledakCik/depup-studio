import { ArrowRight, ArrowUpRight, FileText, Presentation, ScanLine, ShieldCheck, Smartphone, Table2 } from "lucide-react";
import { OfficePreview } from "@/components/OfficePreview";
import { PlatformDownloads } from "@/components/PlatformDownloads";
import { ProductFooter, ProductHeader } from "@/components/ProductChrome";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollScene } from "@/components/ScrollScene";
import type { Lang } from "@/lib/i18n";
import { OFFICE_PLAY_URL, PRODUCTS } from "@/lib/products";
import { jsonLdString, productJsonLd } from "@/lib/seo";

const product = PRODUCTS.office;

const COPY = {
  id: {
    download: "unduh",
    headerCta: "Unduh aplikasi",
    eyebrow: "Produktivitas sehari-hari",
    h1: ["Kerja lebih rapi dengan ", "Depup Office."],
    lead: "Buat dan kelola dokumen, spreadsheet, presentasi, serta PDF dalam satu aplikasi produktivitas.",
    play: "Unduh di Google Play",
    preview: "Lihat preview",
    availability: "Tersedia untuk Android · iOS, macOS & Windows segera hadir.",
    allPlatforms: "Semua platform",
    privacy: "Kebijakan Privasi",
    badgeTitle: "Satu aplikasi",
    badgeText: "Untuk beragam format kerja",
    previewEyebrow: "Preview interaktif",
    previewTitle: "Lihat ruang kerja Depup Office",
    previewText: "Pilih format untuk melihat contoh tampilan dokumen, tabel, presentasi, dan PDF.",
    capsEyebrow: "Dalam satu aplikasi",
    capsTitle: "Perangkat kerja untuk berbagai kebutuhan",
    caps: [
      ["Dokumen", "Tulis dan rapikan dokumen dalam satu ruang kerja."],
      ["Spreadsheet", "Susun data dalam lembar kerja yang mudah dibaca."],
      ["Presentasi", "Siapkan materi presentasi untuk dibagikan."],
      ["PDF dan scan", "Buka PDF dan ubah dokumen fisik menjadi file digital."],
    ],
    ctaEyebrow: "Mulai dengan Depup Office",
    ctaTitle: "Bawa pekerjaan Anda ke satu ruang kerja.",
    ctaText: "Unduh Depup Office untuk Android melalui Google Play. Versi iOS, macOS, dan Windows segera menyusul.",
  },
  en: {
    download: "download",
    headerCta: "Get the app",
    eyebrow: "Everyday productivity",
    h1: ["Tidier work with ", "Depup Office."],
    lead: "Create and manage documents, spreadsheets, presentations and PDFs in one productivity app.",
    play: "Get it on Google Play",
    preview: "See the preview",
    availability: "Available for Android · iOS, macOS & Windows coming soon.",
    allPlatforms: "All platforms",
    privacy: "Privacy Policy",
    badgeTitle: "One app",
    badgeText: "For every work format",
    previewEyebrow: "Interactive preview",
    previewTitle: "Look inside Depup Office",
    previewText: "Pick a format to see sample documents, tables, presentations and PDFs.",
    capsEyebrow: "All in one app",
    capsTitle: "Tools for every kind of work",
    caps: [
      ["Documents", "Write and polish documents in one workspace."],
      ["Spreadsheets", "Organise data in easy-to-read sheets."],
      ["Presentations", "Prepare slides ready to share."],
      ["PDF and scanning", "Open PDFs and turn paper into digital files."],
    ],
    ctaEyebrow: "Get started with Depup Office",
    ctaTitle: "Bring your work into one workspace.",
    ctaText: "Download Depup Office for Android on Google Play. iOS, macOS and Windows versions are on the way.",
  },
} as const;

const CAP_ICONS = [FileText, Table2, Presentation, ScanLine];

export function OfficePage({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const downloadId = t.download;
  return (
    <main lang={lang} className="min-h-screen bg-surface text-text-primary">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(productJsonLd("office", lang)) }} />
      <ScrollProgress />
      <ProductHeader cta={{ label: t.headerCta, href: `#${downloadId}` }} lang={lang} path={product.path} />

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
              <a
                href={OFFICE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-text-primary px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-container"
              >
                <Smartphone className="h-4 w-4" /> {t.play}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#preview"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border-subtle bg-surface-canvas px-5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-subtle"
              >
                {t.preview} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-tertiary">
              <span className="basis-full sm:basis-auto">{t.availability}</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <a href={`#${downloadId}`} className="font-medium text-primary hover:underline">{t.allPlatforms}</a>
              <span aria-hidden="true">·</span>
              <a href={product.privacy} className="font-medium text-primary hover:underline">{t.privacy}</a>
            </p>
          </ScrollReveal>

          <ScrollReveal variant="right">
            <ScrollScene className="relative min-w-0 scroll-scene--parallax">
              <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative rounded-[1.75rem] border border-border-subtle bg-surface-subtle p-3 shadow-[0_30px_90px_rgba(19,37,72,0.12)] sm:p-5">
                <OfficePreview lang={lang} />
              </div>
              <div className="relative z-10 mx-auto mt-4 flex max-w-[292px] items-center gap-3 rounded-2xl border border-border-subtle bg-surface-canvas px-4 py-3 shadow-sm">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-badge-accent-bg text-badge-accent-text">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <span>
                  <strong className="block text-sm">{t.badgeTitle}</strong>
                  <span className="text-xs text-text-tertiary">{t.badgeText}</span>
                </span>
              </div>
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
            <OfficePreview expanded lang={lang} />
          </ScrollScene>
        </div>
      </section>

      <PlatformDownloads product={product} lang={lang} id={downloadId} />

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-16">
          <ScrollReveal variant="left" className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">{t.capsEyebrow}</span>
            <h2 className="font-editorial-xl mt-3 text-3xl sm:text-4xl">{t.capsTitle}</h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.caps.map(([title, text], index) => {
              const Icon = CAP_ICONS[index];
              return (
                <ScrollReveal key={title} variant={index % 2 === 0 ? "left" : "right"} delay={index * 55}>
                  <article className="rounded-2xl border border-border-subtle bg-surface-subtle p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-badge-accent-bg text-badge-accent-text">
                      <Icon className="h-5 w-5" />
                    </span>
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
        <ScrollReveal variant="scale" className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 overflow-hidden rounded-[1.75rem] bg-[#111827] px-7 py-10 text-white sm:px-12 md:flex-row md:items-center md:justify-between md:py-14">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">{t.ctaEyebrow}</p>
              <h2 className="font-editorial-xl mt-3 text-3xl sm:text-4xl">{t.ctaTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">{t.ctaText}</p>
            </div>
            <a
              href={OFFICE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#111827] transition-colors hover:bg-blue-50"
            >
              {t.headerCta} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </ScrollReveal>
      </section>

      <ProductFooter lang={lang} />
    </main>
  );
}
