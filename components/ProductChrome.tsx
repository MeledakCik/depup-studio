import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { LanguageSuggest, LanguageSwitch } from "@/components/LanguageSwitch";
import { localePath, type Lang } from "@/lib/i18n";
import { PRODUCTS, STUDIO } from "@/lib/products";

const CHROME = {
  id: {
    home: "beranda",
    nav: "Navigasi",
    madeBy: (names: string) => `Studio pembuat ${names}. Dibuat di ${STUDIO.city}.`,
    products: "Produk",
    privacyCenter: "Pusat Privasi",
    privacyOf: (name: string) => `Privasi ${name}`,
  },
  en: {
    home: "home",
    nav: "Navigation",
    madeBy: (names: string) => `The studio behind ${names}. Made in ${STUDIO.city}.`,
    products: "Products",
    privacyCenter: "Privacy Center",
    privacyOf: (name: string) => `${name} privacy`,
  },
} as const;

/**
 * Header for product and policy pages (studio logo, back to Studio, main button).
 * With `path`, the page exists in both languages: it shows the ID/EN switch and the language suggestion.
 */
export function ProductHeader({
  cta,
  links,
  backHref = "/",
  backLabel = "Studio",
  lang = "id",
  path,
}: {
  cta?: { label: string; href: string };
  links?: ReactNode;
  backHref?: string;
  backLabel?: string;
  lang?: Lang;
  /** Indonesian path of a page that also exists in English, e.g. "/office". */
  path?: string;
}) {
  const external = cta?.href.startsWith("http");
  const t = CHROME[lang];
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-surface-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:px-10 lg:px-16">
        <a href="/" className="flex items-center gap-2.5" aria-label={`${STUDIO.name} — ${t.home}`}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-text-primary font-editorial-sm text-sm text-white">D</span>
          <span className="hidden font-editorial-sm text-base min-[400px]:inline">{STUDIO.name}</span>
        </a>
        <nav className="flex items-center gap-3 sm:gap-6" aria-label={t.nav}>
          <a href={backHref} className={`hidden items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary ${path ? "md:inline-flex" : "sm:inline-flex"}`}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {backLabel}
          </a>
          {links}
          {path && <LanguageSwitch lang={lang} path={path} />}
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
      {path && <LanguageSuggest lang={lang} path={path} />}
    </header>
  );
}

/** Studio footer shared by product and policy pages. */
export function ProductFooter({ lang = "id" }: { lang?: Lang }) {
  const products = [PRODUCTS.office, PRODUCTS.sentinel, PRODUCTS.cloud];
  const t = CHROME[lang];
  return (
    <footer className="border-t border-border-subtle bg-surface-canvas">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-10 lg:px-16">
        <div>
          <a href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-text-primary font-editorial-sm text-sm text-white">D</span>
            <span className="font-editorial-sm text-base">{STUDIO.name}</span>
          </a>
          <p className="mt-3 max-w-sm text-sm leading-6 text-text-secondary">{t.madeBy(products.map((p) => p.name).join(", "))}</p>
          <a href={`mailto:${STUDIO.email}`} className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
            {STUDIO.email}
          </a>
        </div>
        <nav aria-label={t.products}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-tertiary">{t.products}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {products.map((p) => (
              <li key={p.id}>
                <a href={localePath(p.path, lang)} className="text-text-secondary hover:text-text-primary">{p.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Legal">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-tertiary">Legal</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="/privacy" className="text-text-secondary hover:text-text-primary">{t.privacyCenter}</a></li>
            {products.map((p) => (
              <li key={p.id}>
                <a
                  href={p.privacy}
                  {...(p.privacyHostedHere ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="text-text-secondary hover:text-text-primary"
                >
                  {t.privacyOf(p.name)}
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
