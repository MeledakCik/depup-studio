import type { Metadata } from "next";
import { LANG_META, languageAlternates, localePath, type Lang } from "@/lib/i18n";
import { PLATFORM_LABEL, PRODUCTS, STUDIO, type Product } from "@/lib/products";

type ProductId = Product["id"];

/**
 * Search copy per product and language: titles and descriptions stay under ~60/160 characters.
 * Indonesian targets national queries, English targets international ones.
 */
export const PRODUCT_SEO: Record<ProductId, Record<Lang, { title: string; description: string; keywords: string[] }>> = {
  office: {
    id: {
      title: "Depup Office — Aplikasi Scan Dokumen, PDF & Office Offline untuk Android",
      description:
        "Aplikasi offline untuk Android: scan dokumen, edit PDF, buat dokumen, spreadsheet, dan presentasi tanpa internet. iOS, macOS & Windows segera hadir.",
      keywords: [
        "Depup Office",
        "aplikasi scan dokumen offline",
        "aplikasi office offline android",
        "scanner dokumen android",
        "edit PDF android",
        "aplikasi dokumen spreadsheet presentasi",
      ],
    },
    en: {
      title: "Depup Office — Offline Document Scanner, PDF & Office App for Android",
      description:
        "Offline Android app: scan documents, edit PDFs, and create documents, spreadsheets and presentations without internet. iOS, macOS & Windows coming soon.",
      keywords: [
        "Depup Office",
        "offline document scanner app",
        "offline office app android",
        "document scanner android",
        "PDF editor android offline",
        "documents spreadsheets presentations app",
      ],
    },
  },
  sentinel: {
    id: {
      title: "Sentinel ID — Audit Keamanan Website Pasif untuk Domain Anda",
      description:
        "Cek keamanan website Anda secara pasif: header, TLS, DNS, file sensitif, SEO, dan performa. Hanya GET/HEAD, maks. 100 request, tanpa eksploit.",
      keywords: [
        "Sentinel ID",
        "Sentinel-ID",
        "audit keamanan website",
        "cek keamanan website gratis",
        "scan keamanan website pasif",
        "security header checker",
      ],
    },
    en: {
      title: "Sentinel ID — Passive Website Security Audit for Your Own Domain",
      description:
        "Check your website's security passively: headers, TLS, DNS, exposed files, SEO and performance. GET/HEAD only, max 100 requests, no exploits.",
      keywords: [
        "Sentinel ID",
        "Sentinel-ID",
        "passive website security audit",
        "website security checker",
        "security header checker",
        "free website security scan",
      ],
    },
  },
  cloud: {
    id: {
      title: "Depup Cloud — Dashboard Deploy ke Vercel, Cloudflare Pages & Railway",
      description:
        "Dashboard deploy buatan Indonesia: tempel link GitHub, cek repo, lalu deploy ke Vercel, Cloudflare Pages, atau Railway dari satu tempat.",
      keywords: [
        "Depup Cloud",
        "depup.cloud",
        "Depup",
        "deploy dashboard Indonesia",
        "deploy ke Vercel Cloudflare Pages Railway",
        "cara deploy website gratis",
        "MCP connector deploy",
      ],
    },
    en: {
      title: "Depup Cloud — Deploy to Vercel, Cloudflare Pages & Railway in One Place",
      description:
        "Paste a GitHub link, check the repo, then deploy to Vercel, Cloudflare Pages or Railway from one dashboard — with a Claude (MCP) connector.",
      keywords: [
        "Depup Cloud",
        "depup.cloud",
        "Depup",
        "deploy dashboard",
        "deploy to Vercel Cloudflare Pages Railway",
        "multi-platform deploy dashboard",
        "MCP deploy connector",
      ],
    },
  },
};

/** Full Next.js metadata for a product page in one language: canonical, hreflang, Open Graph and Twitter. */
export function productMetadata(id: ProductId, lang: Lang): Metadata {
  const { title, description, keywords } = PRODUCT_SEO[id][lang];
  const basePath = PRODUCTS[id].path;
  const url = localePath(basePath, lang);
  const otherLocales = Object.values(LANG_META)
    .map((m) => m.ogLocale)
    .filter((l) => l !== LANG_META[lang].ogLocale);
  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: url, languages: languageAlternates(basePath) },
    openGraph: {
      title,
      description,
      url,
      locale: LANG_META[lang].ogLocale,
      alternateLocale: otherLocales,
      type: "website",
      siteName: STUDIO.name,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const CATEGORY: Record<ProductId, string> = {
  office: "BusinessApplication",
  sentinel: "SecurityApplication",
  cloud: "DeveloperApplication",
};

/** JSON-LD for a product page: the app itself plus its breadcrumb under the studio. */
export function productJsonLd(id: ProductId, lang: Lang) {
  const p = PRODUCTS[id];
  const { description } = PRODUCT_SEO[id][lang];
  const pageUrl = `${STUDIO.url}${localePath(p.path, lang)}`;
  // One app entity shared by both language versions, so search engines don't see two different apps.
  const appId = `${STUDIO.url}${p.path}#app`;
  const available = p.platforms.filter((x) => x.status === "available");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": appId,
        name: p.name,
        description,
        url: p.site ?? pageUrl,
        mainEntityOfPage: pageUrl,
        applicationCategory: CATEGORY[id],
        operatingSystem: available.map((x) => PLATFORM_LABEL[x.id]).join(", "),
        inLanguage: ["id", "en"],
        installUrl: available.find((x) => x.href)?.href,
        publisher: { "@type": "Organization", "@id": `${STUDIO.url}/#organization`, name: STUDIO.name, url: STUDIO.url },
      },
      {
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: PRODUCT_SEO[id][lang].title,
        inLanguage: LANG_META[lang].hreflang,
        about: { "@id": appId },
        isPartOf: { "@id": `${STUDIO.url}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: STUDIO.name, item: STUDIO.url },
          { "@type": "ListItem", position: 2, name: p.name, item: pageUrl },
        ],
      },
    ],
  };
}

export const jsonLdString = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
