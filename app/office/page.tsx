import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  FileText,
  Presentation,
  ScanLine,
  ShieldCheck,
  Smartphone,
  Table2,
} from "lucide-react";
import { OfficePreview } from "@/components/OfficePreview";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollScene } from "@/components/ScrollScene";

const playStoreUrl =
  "https://play.google.com/store/apps/details?id=studio.depup.office";

export const metadata: Metadata = {
  title: "depup Office — Dokumen, Spreadsheet, Presentasi, dan PDF",
  description:
    "Kenali depup Office, aplikasi produktivitas untuk dokumen, spreadsheet, presentasi, dan PDF. Unduh di Google Play.",
};

const capabilities = [
  {
    icon: FileText,
    title: "Dokumen",
    text: "Tulis dan rapikan dokumen dalam satu ruang kerja.",
  },
  {
    icon: Table2,
    title: "Spreadsheet",
    text: "Susun data dalam lembar kerja yang mudah dibaca.",
  },
  {
    icon: Presentation,
    title: "Presentasi",
    text: "Siapkan materi presentasi untuk dibagikan.",
  },
  {
    icon: ScanLine,
    title: "PDF dan scan",
    text: "Buka PDF dan ubah dokumen fisik menjadi file digital.",
  },
];

export default function OfficePage() {
  return (
    <main className="min-h-screen bg-surface text-text-primary">
      <ScrollProgress />
      <header className="border-b border-border-subtle bg-surface-canvas/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10 lg:px-16">
          <a href="/" className="flex items-center gap-2.5" aria-label="Depup Studio">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-text-primary font-editorial-sm text-sm text-white">
              D
            </span>
            <span className="font-editorial-sm text-base">Depup Studio</span>
          </a>
          <nav className="flex items-center gap-3 sm:gap-6" aria-label="Navigasi">
            <a href="/" className="hidden items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary sm:inline-flex">
              <ArrowLeft className="h-4 w-4" /> Studio
            </a>
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-text-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-container"
            >
              Unduh aplikasi <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      </header>

      <section className="overflow-hidden bg-surface-canvas">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-16 lg:py-28">
          <ScrollReveal variant="left" className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-primary-container" />
              Produktivitas sehari-hari
            </span>
            <h1 className="font-editorial-display mt-6 max-w-xl text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Kerja lebih rapi dengan <span className="text-primary">depup Office.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-text-secondary sm:text-lg">
              Buat dan kelola dokumen, spreadsheet, presentasi, serta PDF dalam
              satu aplikasi produktivitas.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-text-primary px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-container"
              >
                <Smartphone className="h-4 w-4" /> Unduh di Google Play
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#preview"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border-subtle bg-surface-canvas px-5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-subtle"
              >
                Lihat preview <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-tertiary">
              <span>Tersedia untuk Android melalui Google Play.</span>
              <span aria-hidden="true">·</span>
              <a
                href="/office/privacy-policy"
                className="font-medium text-primary hover:underline"
              >
                Kebijakan Privasi
              </a>
            </p>
          </ScrollReveal>

          <ScrollReveal variant="right">
          <ScrollScene className="relative min-w-0 scroll-scene--parallax">
            <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative rounded-[1.75rem] border border-border-subtle bg-surface-subtle p-3 shadow-[0_30px_90px_rgba(19,37,72,0.12)] sm:p-5">
              <OfficePreview />
            </div>
            <div className="relative z-10 mx-auto mt-4 flex max-w-[292px] items-center gap-3 rounded-2xl border border-border-subtle bg-surface-canvas px-4 py-3 shadow-sm">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-badge-accent-bg text-badge-accent-text">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <span>
                <strong className="block text-sm">Satu aplikasi</strong>
                <span className="text-xs text-text-tertiary">Untuk beragam format kerja</span>
              </span>
            </div>
          </ScrollScene>
          </ScrollReveal>
        </div>
      </section>

      <section id="preview" className="scroll-mt-8 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-16">
          <ScrollReveal variant="left" className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Preview interaktif
            </span>
            <h2 className="font-editorial-xl mt-3 text-3xl sm:text-4xl lg:text-5xl">
              Lihat ruang kerja depup Office
            </h2>
            <p className="mt-4 text-base leading-7 text-text-secondary">
              Pilih format untuk melihat contoh tampilan dokumen, tabel,
              presentasi, dan PDF.
            </p>
          </ScrollReveal>
          <ScrollScene className="scroll-scene--parallax">
            <OfficePreview expanded />
          </ScrollScene>
        </div>
      </section>

      <section className="border-y border-border-subtle bg-surface-canvas py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-16">
          <ScrollReveal variant="left" className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Dalam satu aplikasi
            </span>
            <h2 className="font-editorial-xl mt-3 text-3xl sm:text-4xl">
              Perangkat kerja untuk berbagai kebutuhan
            </h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(({ icon: Icon, title, text }, index) => (
              <ScrollReveal key={title} variant={index % 2 === 0 ? "left" : "right"} delay={index * 55}>
              <article
                className="rounded-2xl border border-border-subtle bg-surface-subtle p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-badge-accent-bg text-badge-accent-text">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-editorial-sm mt-5 text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-text-secondary">{text}</p>
              </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16">
        <ScrollReveal variant="scale" className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 overflow-hidden rounded-[1.75rem] bg-[#111827] px-7 py-10 text-white sm:px-12 md:flex-row md:items-center md:justify-between md:py-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
              Mulai dengan depup Office
            </p>
            <h2 className="font-editorial-xl mt-3 text-3xl sm:text-4xl">
              Bawa pekerjaan Anda ke satu ruang kerja.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
              Unduh aplikasi depup Office untuk Android melalui Google Play.
            </p>
          </div>
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#111827] transition-colors hover:bg-blue-50"
          >
            Unduh aplikasi <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        </ScrollReveal>
      </section>

      <footer className="border-t border-border-subtle bg-surface-canvas">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-text-tertiary sm:flex-row sm:items-center sm:justify-between md:px-10 lg:px-16">
          <span>© {new Date().getFullYear()} Depup Studio</span>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Tautan footer">
            <a href="/" className="inline-flex items-center gap-1.5 hover:text-text-primary">
              <ArrowLeft className="h-4 w-4" /> Kembali ke Depup Studio
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
