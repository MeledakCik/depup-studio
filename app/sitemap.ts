import type { MetadataRoute } from "next";
import { LANGS, languageAlternates, localePath } from "@/lib/i18n";
import { PRODUCTS, STUDIO } from "@/lib/products";

// Bump when page content meaningfully changes, so crawlers see a real signal instead of "changed every build".
const UPDATED = new Date("2026-11-27");

type Entry = MetadataRoute.Sitemap[number];
const abs = (path: string) => `${STUDIO.url}${path}`;

/** Every language version of a page, each listing all versions as hreflang alternates. */
function localized(path: string, extra: Omit<Entry, "url">): Entry[] {
  const languages = Object.fromEntries(Object.entries(languageAlternates(path)).map(([k, v]) => [k, abs(v)]));
  return LANGS.map((lang) => ({ url: abs(localePath(path, lang)), ...extra, alternates: { languages } }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const products = Object.values(PRODUCTS);
  return [
    {
      url: STUDIO.url,
      lastModified: UPDATED,
      changeFrequency: "monthly",
      priority: 1,
      images: [abs("/opengraph-image"), ...products.map((p) => abs(`/updates/${p.id}.webp`))],
    },
    ...products.flatMap((p) =>
      localized(p.path, {
        lastModified: UPDATED,
        changeFrequency: "monthly",
        priority: 0.9,
        images: [abs(`/updates/${p.id}.webp`), ...(p.id === "office" ? [abs("/office-app-icon.png")] : [])],
      }),
    ),
    // Policies are Indonesian only; depup.cloud's policy lives on its own domain.
    ...["/privacy", ...products.filter((p) => p.privacyHostedHere).map((p) => p.privacy)].map(
      (path): Entry => ({ url: abs(path), lastModified: UPDATED, changeFrequency: "yearly", priority: 0.3 }),
    ),
  ];
}
