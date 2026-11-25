import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PRODUCTS, STUDIO } from "@/lib/products";

/** Header halaman produk & dokumen (logo studio, kembali ke Studio, tombol utama). */
export function ProductHeader({
  cta,
  links,
  backHref = "/",
  backLabel = "Studio",
}: {
  cta?: { label: string; href: string };
  links?: ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  const external = cta?.href.startsWith("http");
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-surface-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:px-10 lg:px-16">
        <a href="/" className="flex items-center gap-2.5" aria-label={`${STUDIO.name} — beranda`}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-text-primary font-editorial-sm text-sm text-white">D</span>
          <span className="font-editorial-sm text-base">{STUDIO.name}</span>
        </a>
        <nav className="flex items-center gap-3 sm:gap-6" aria-label="Navigasi">
          <a href={backHref} className="hidden items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary sm:inline-flex">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {backLabel}
          </a>
          {links}
          {cta && (
            <a
              href={cta.href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center gap-2 rounded-full bg-text-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-container"
            >
              {cta.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}

/** Footer vendor yang sama di semua halaman produk & kebijakan. */
export function ProductFooter() {
  const products = [PRODUCTS.office, PRODUCTS.sentinel, PRODUCTS.cloud];
  return (
    <footer className="border-t border-border-subtle bg-surface-canvas">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-10 lg:px-16">
        <div>
          <a href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-text-primary font-editorial-sm text-sm text-white">D</span>
            <span className="font-editorial-sm text-base">{STUDIO.name}</span>
          </a>
          <p className="mt-3 max-w-sm text-sm leading-6 text-text-secondary">
            Studio pembuat {products.map((p) => p.name).join(", ")}. Dibuat di {STUDIO.city}.
          </p>
          <a href={`mailto:${STUDIO.email}`} className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
            {STUDIO.email}
          </a>
        </div>
        <nav aria-label="Produk">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-tertiary">Produk</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {products.map((p) => (
              <li key={p.id}>
                <a href={p.path} className="text-text-secondary hover:text-text-primary">{p.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Legal">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-tertiary">Legal</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="/privacy" className="text-text-secondary hover:text-text-primary">Pusat Privasi</a></li>
            {products.map((p) => (
              <li key={p.id}>
                <a
                  href={p.privacy}
                  {...(p.privacyHostedHere ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="text-text-secondary hover:text-text-primary"
                >
                  Privasi {p.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border-subtle">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-text-tertiary sm:flex-row sm:items-center sm:justify-between md:px-10 lg:px-16">
          <span>© {new Date().getFullYear()} {STUDIO.name} · {STUDIO.domain}</span>
          <a href={STUDIO.github} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
