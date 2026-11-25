import { STUDIO } from "@/lib/products";

/** Homepage FAQ: shown on the page and published as FAQPage structured data. Keep every answer factual. */
export const FAQ: { q: string; a: string }[] = [
  {
    q: "What is Depup Studio?",
    a: `Depup Studio is an independent, founder-led software studio based in ${STUDIO.city}. We design, build and run our own products: depup.cloud, depup Office and Sentinel-ID.`,
  },
  {
    q: "What is depup.cloud?",
    a: "depup.cloud is a deploy dashboard made in Indonesia. Paste a GitHub link, let it check the repo, then deploy to Vercel, Cloudflare Pages or Railway from one place. It also has an MCP connector so AI assistants can work with your projects.",
  },
  {
    q: "What is depup Office?",
    a: "depup Office is an offline productivity app for Android: scan documents, work with PDF, and create documents, spreadsheets and presentations on your phone without an internet connection. iOS, macOS and Windows versions are on the way.",
  },
  {
    q: "What is Sentinel-ID?",
    a: "Sentinel-ID is a passive website security audit for domains you own. It checks security headers, TLS, DNS, exposed files, SEO and performance using only GET/HEAD requests, capped at 100 per scan, with no exploits.",
  },
  {
    q: "How can I contact Depup Studio?",
    a: `Email ${STUDIO.email}. The founder replies to every message personally.`,
  },
];
