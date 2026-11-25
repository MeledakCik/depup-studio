import type { MetadataRoute } from "next";

const BASE = "https://depupstudio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["", "/office", "/office/privacy-policy", "/sentinel", "/sentinel/privacy-policy", "/cloud", "/privacy"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path.includes("privacy") ? "yearly" : "monthly",
    priority: path === "" ? 1 : path.includes("privacy") ? 0.4 : 0.8,
  }));
}
