import type { MetadataRoute } from "next";

const BASE = "https://depupstudio.com";
// Bump when page content meaningfully changes, so crawlers see a real signal instead of "changed every build".
const UPDATED = new Date("2026-11-25");

const PAGES: { path: string; priority: number; freq: "monthly" | "yearly"; images?: string[] }[] = [
  { path: "", priority: 1, freq: "monthly", images: ["/opengraph-image", "/updates/cloud.webp", "/updates/office.webp", "/updates/sentinel.webp"] },
  { path: "/cloud", priority: 0.9, freq: "monthly", images: ["/updates/cloud.webp"] },
  { path: "/office", priority: 0.9, freq: "monthly", images: ["/updates/office.webp", "/office-app-icon.png"] },
  { path: "/sentinel", priority: 0.9, freq: "monthly", images: ["/updates/sentinel.webp"] },
  { path: "/privacy", priority: 0.3, freq: "yearly" },
  { path: "/office/privacy-policy", priority: 0.3, freq: "yearly" },
  { path: "/sentinel/privacy-policy", priority: 0.3, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: UPDATED,
    changeFrequency: p.freq,
    priority: p.priority,
    ...(p.images ? { images: p.images.map((i) => `${BASE}${i}`) } : {}),
  }));
}
