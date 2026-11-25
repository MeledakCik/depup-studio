import { PRODUCTS, STUDIO, type Product } from "@/lib/products";

/** Search keywords per product: brand terms first, then the plain-language queries people type. */
export const PRODUCT_KEYWORDS: Record<Product["id"], string[]> = {
  office: [
    "depup Office",
    "aplikasi scan dokumen offline",
    "aplikasi office offline android",
    "scanner dokumen android",
    "edit PDF android",
    "aplikasi dokumen spreadsheet presentasi",
    "offline document scanner app",
  ],
  sentinel: [
    "Sentinel-ID",
    "audit keamanan website",
    "cek keamanan website gratis",
    "scan keamanan website pasif",
    "security header checker",
    "passive website security audit",
  ],
  cloud: [
    "depup.cloud",
    "Depup",
    "deploy dashboard Indonesia",
    "deploy ke Vercel Cloudflare Pages Railway",
    "cara deploy website gratis",
    "MCP connector deploy",
  ],
};

const CATEGORY: Record<Product["id"], string> = {
  office: "BusinessApplication",
  sentinel: "SecurityApplication",
  cloud: "DeveloperApplication",
};

/** JSON-LD for a product page: the app itself plus its breadcrumb under the studio. */
export function productJsonLd(id: Product["id"], description: string) {
  const p = PRODUCTS[id];
  const pageUrl = `${STUDIO.url}${p.path}`;
  const available = p.platforms.filter((x) => x.status === "available");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${pageUrl}#app`,
        name: p.name,
        description,
        url: p.site ?? pageUrl,
        mainEntityOfPage: pageUrl,
        applicationCategory: CATEGORY[id],
        operatingSystem: available.map((x) => (x.id === "web" ? "Web" : x.id === "android" ? "Android" : x.id)).join(", "),
        inLanguage: "id",
        installUrl: available.find((x) => x.href)?.href,
        publisher: { "@type": "Organization", "@id": `${STUDIO.url}/#organization`, name: STUDIO.name, url: STUDIO.url },
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
