import { NextResponse } from "next/server";
import { PLATFORM_LABEL, PRODUCTS, STUDIO } from "@/lib/products";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    studio: STUDIO.name,
    url: STUDIO.url,
    products: Object.values(PRODUCTS).map((p) => ({
      name: p.name,
      page: `${STUDIO.url}${p.path}`,
      website: p.site,
      privacy: p.privacy.startsWith("http") ? p.privacy : `${STUDIO.url}${p.privacy}`,
      platforms: p.platforms
        .filter((pl) => pl.status !== "soon")
        .map((pl) => ({ platform: PLATFORM_LABEL[pl.id], status: pl.status, store: pl.store, url: pl.href })),
    })),
  });
}
