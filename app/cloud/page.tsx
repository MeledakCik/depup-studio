import type { Metadata } from "next";
import { PRODUCT_KEYWORDS, jsonLdString, productJsonLd } from "@/lib/seo";
import { ArrowRight, ArrowUpRight, Bot, KeyRound, Link2, Rocket, ShieldCheck } from "lucide-react";
import { CloudPreview } from "@/components/CloudPreview";
import { PlatformDownloads } from "@/components/PlatformDownloads";
import { ProductFooter, ProductHeader } from "@/components/ProductChrome";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollScene } from "@/components/ScrollScene";
import { PRODUCTS } from "@/lib/products";

const cloud = PRODUCTS.cloud;

const SEO_TITLE = "depup.cloud — Dashboard Deploy ke Vercel, Cloudflare Pages & Railway";
const SEO_DESCRIPTION =
  "Dashboard deploy buatan Indonesia: tempel link GitHub, cek repo, lalu deploy ke Vercel, Cloudflare Pages, atau Railway dari satu tempat.";

export const metadata: Metadata = {
  title: { absolute: SEO_TITLE },
  description: SEO_DESCRIPTION,
  keywords: PRODUCT_KEYWORDS.cloud,
  alternates: { canonical: "/cloud", languages: { "id-ID": "/cloud", "x-default": "/cloud" } },
  openGraph: { title: SEO_TITLE, description: SEO_DESCRIPTION, url: "/cloud", locale: "id_ID", type: "website", siteName: "Depup Studio" },
  twitter: { card: "summary_large_image", title: SEO_TITLE, description: SEO_DESCRIPTION },
};

const features = [
  { icon: Rocket, title: "Deploy satu tempat", text: "Vercel, Cloudflare Pages, dan Railway dikelola dari satu dashboard: riwayat, domain, dan environment variables." },
  { icon: Link2, title: "Link Instan", text: "Tayangkan website statis sementara di *.depup.web.id, kedaluwarsa otomatis 1 jam sampai 30 hari." },
  { icon: Bot, title: "Konektor Claude (MCP)", text: "Minta Claude men-deploy atas nama Anda lewat OAuth 2.0 + PKCE; akses bisa dicabut kapan saja." },
  { icon: KeyRound, title: "Token terenkripsi", text: "Token platform disimpan terenkripsi AES-256-GCM dan hanya dibaca di server saat dibutuhkan." },
];

export default function CloudPage() {
  return (
    <main lang="id" className="min-h-screen bg-surface text-text-primary">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(productJsonLd("cloud", SEO_DESCRIPTION)) }} />
      <ScrollProgress />
      <ProductHeader cta={{ label: "Buka depup.cloud", href: cloud.site! }} />

      <section className="overflow-hidden bg-surface-canvas">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-16 lg:py-28">
          <ScrollReveal variant="left" className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-primary-container" />
              Cloud &amp; Remote MCP
            </span>
            <h1 className="font-editorial-display mt-6 max-w-xl text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Deploy tanpa pindah-pindah <span className="text-primary">dashboard.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-text-secondary sm:text-lg">{cloud.tagline}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={cloud.site}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-text-primary px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-container"
              >
                Buka depup.cloud <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#preview"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border-subtle bg-surface-canvas px-5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-subtle"
              >
                Lihat preview <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-tertiary">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span>Masuk dengan Google</span>
              <span aria-hidden="true">·</span>
              <a href={cloud.privacy} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                Kebijakan Privasi
              </a>
            </p>
          </ScrollReveal>

          <ScrollReveal variant="right">
            <ScrollScene className="relative min-w-0 scroll-scene--parallax">
              <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative"><CloudPreview /></div>
            </ScrollScene>
          </ScrollReveal>
        </div>
      </section>

      <section id="preview" className="scroll-mt-20 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5 md:px-10">
          <ScrollReveal variant="left" className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">Preview interaktif · data contoh</span>
            <h2 className="font-editorial-xl mt-3 text-3xl sm:text-4xl lg:text-5xl">Lihat cara kerja depup.cloud</h2>
            <p className="mt-4 text-base leading-7 text-text-secondary">Deploy, Link Instan, dan konektor Claude. Preview ini tidak terhubung ke akun mana pun.</p>
          </ScrollReveal>
          <ScrollScene className="scroll-scene--parallax">
            <CloudPreview expanded />
          </ScrollScene>
        </div>
      </section>

      <PlatformDownloads product={cloud} />

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-16">
          <ScrollReveal variant="left" className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">Fitur</span>
            <h2 className="font-editorial-xl mt-3 text-3xl sm:text-4xl">Yang Anda dapat</h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, text }, index) => (
              <ScrollReveal key={title} variant={index % 2 === 0 ? "left" : "right"} delay={index * 55}>
                <article className="h-full rounded-2xl border border-border-subtle bg-surface-subtle p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-badge-accent-bg text-badge-accent-text">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-editorial-sm mt-5 text-lg">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ProductFooter />
    </main>
  );
}
