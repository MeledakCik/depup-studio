import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: "https://depupstudio.com/sitemap.xml",
    host: "https://depupstudio.com",
  };
}
