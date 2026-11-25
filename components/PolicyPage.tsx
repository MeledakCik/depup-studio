import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { PrintButton } from "@/components/PrintButton";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ProductFooter, ProductHeader } from "@/components/ProductChrome";
import { STUDIO } from "@/lib/products";

export interface PolicySection {
  id: string;
  title: string;
  body: ReactNode;
}

/**
 * Kerangka kebijakan privasi yang sama untuk semua produk: ringkasan poin penting di atas, daftar isi
 * (melekat di desktop, bisa dilipat di HP), bagian bernomor, kontak, dan tampilan cetak yang bersih.
 */
export function PolicyPage({
  product,
  productHref,
  updated,
  summary,
  sections,
  englishSummary,
}: {
  product: string;
  productHref: string;
  updated: string;
  summary: string[];
  sections: PolicySection[];
  englishSummary?: string;
}) {
  return (
    <main className="min-h-screen bg-surface text-text-primary">
      <ScrollProgress />
      <ProductHeader backHref={productHref} backLabel={product} links={<a href="/privacy" className="hidden text-sm text-text-secondary hover:text-text-primary md:inline">Pusat Privasi</a>} />

      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-16">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">Kebijakan Privasi</span>
          <h1 className="font-editorial-xl mt-3 text-4xl leading-tight sm:text-5xl">{product}</h1>
          <p className="mt-4 text-sm text-text-secondary">
            Berlaku sejak <time>{updated}</time> · Pengembang: {STUDIO.name} (
            <a className="text-primary hover:underline" href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>)
          </p>
        </div>

        <section aria-label="Ringkasan" className="mt-8 rounded-3xl border border-[#c7d7ff] bg-[#f1f5ff] p-6 sm:p-8">
          <h2 className="font-editorial-sm text-lg">Ringkasnya</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {summary.map((s) => (
              <li key={s} className="flex gap-3 text-sm leading-6 text-[#1f2a44]">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
          {englishSummary && (
            <p lang="en" className="mt-5 border-t border-[#c7d7ff] pt-4 text-xs leading-5 text-[#43506b]">
              <strong>English summary:</strong> {englishSummary}
            </p>
          )}
        </section>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
          <article className="policy min-w-0 rounded-3xl border border-border-subtle bg-surface-canvas p-6 shadow-sm sm:p-10">
            <details className="policy-toc-mobile mb-6 rounded-2xl border border-border-subtle bg-surface-subtle p-4 lg:hidden">
              <summary className="cursor-pointer text-sm font-semibold">Daftar isi</summary>
              <Toc sections={sections} />
            </details>
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="policy-section">
                <h2>
                  <span className="policy-num">{i + 1}.</span> {s.title}
                </h2>
                {s.body}
              </section>
            ))}
            <div className="mt-12 border-t border-border-subtle pt-5 text-xs leading-5 text-text-tertiary">
              © {new Date().getFullYear()} {STUDIO.name} · {STUDIO.city}. Kebijakan ini adalah versi resmi dan terbaru di{" "}
              {STUDIO.domain}.
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-border-subtle bg-surface-canvas p-5">
              <h2 className="font-editorial-sm text-sm">Daftar isi</h2>
              <Toc sections={sections} />
              <PrintButton />
            </div>
          </aside>
        </div>
      </div>

      <ProductFooter />
    </main>
  );
}

function Toc({ sections }: { sections: PolicySection[] }) {
  return (
    <nav aria-label="Daftar isi kebijakan" className="mt-3">
      <ol className="space-y-2 text-[13px] leading-5 text-text-secondary">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className="flex gap-2 hover:text-primary">
              <span className="w-4 shrink-0 text-text-tertiary">{i + 1}.</span>
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
