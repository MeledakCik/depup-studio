import { ArrowRight, ArrowUpRight, Bot, KeyRound, Link2, Rocket, ShieldCheck } from "lucide-react";
import { CloudPreview } from "@/components/CloudPreview";
import { PlatformDownloads } from "@/components/PlatformDownloads";
import { ProductFooter, ProductHeader } from "@/components/ProductChrome";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollScene } from "@/components/ScrollScene";
import type { Lang } from "@/lib/i18n";
import { PRODUCTS } from "@/lib/products";
import { jsonLdString, productJsonLd } from "@/lib/seo";

const product = PRODUCTS.cloud;
const site = product.site!;

const COPY = {
  id: {
    download: "unduh",
    open: "Buka depup.cloud",
    h1: ["Deploy tanpa pindah-pindah ", "dashboard."],
    preview: "Lihat preview",
    signIn: "Masuk dengan Google",
    privacy: "Kebijakan Privasi",
    previewEyebrow: "Preview interaktif · data contoh",
    previewTitle: "Lihat cara kerja depup.cloud",
    previewText: "Deploy, Link Instan, dan konektor Claude. Preview ini tidak terhubung ke akun mana pun.",
    featuresEyebrow: "Fitur",
    featuresTitle: "Yang Anda dapat",
    features: [
      ["Deploy satu tempat", "Vercel, Cloudflare Pages, dan Railway dikelola dari satu dashboard: riwayat, domain, dan environment variables."],
      ["Link Instan", "Tayangkan website statis sementara di *.depup.web.id, kedaluwarsa otomatis 1 jam sampai 30 hari."],
      ["Konektor Claude (MCP)", "Minta Claude men-deploy atas nama Anda lewat OAuth 2.0 + PKCE; akses bisa dicabut kapan saja."],
      ["Token terenkripsi", "Token platform disimpan terenkripsi AES-256-GCM dan hanya dibaca di server saat dibutuhkan."],
    ],
  },
  en: {
    download: "download",
    open: "Open depup.cloud",
    h1: ["Deploy without juggling ", "dashboards."],
    preview: "See the preview",
    signIn: "Sign in with Google",
    privacy: "Privacy Policy",
    previewEyebrow: "Interactive preview · sample data",
    previewTitle: "See how depup.cloud works",
    previewText: "Deploys, Instant Links and the Claude connector. This preview isn't connected to any account.",
    featuresEyebrow: "Features",
    featuresTitle: "What you get",
    features: [
      ["One place to deploy", "Manage Vercel, Cloudflare Pages and Railway from one dashboard: history, domains and environment variables."],
      ["Instant Link", "Put a static site live on *.depup.web.id for a while; it expires automatically after 1 hour to 30 days."],
      ["Claude connector (MCP)", "Ask Claude to deploy on your behalf via OAuth 2.0 + PKCE; revoke access any time."],
      ["Encrypted tokens", "Platform tokens are stored encrypted with AES-256-GCM and only read on the server when needed."],
    ],
  },
} as const;

const FEATURE_ICONS = [Rocket, Link2, Bot, KeyRound];

export function CloudPage({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <main lang={lang} className="min-h-screen bg-surface text-text-primary">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(productJsonLd("cloud", lang)) }} />
      <ScrollProgress />
      <ProductHeader cta={{ label: t.open, href: site }} lang={lang} path={product.path} />

      <section className="overflow-hidden bg-surface-canvas">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-16 lg:py-28">
          <ScrollReveal variant="left" className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-primary-container" />
              Cloud &amp; Remote MCP
            </span>
            <h1 className="font-editorial-display mt-6 max-w-xl text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              {t.h1[0]}
              <span className="text-primary">{t.h1[1]}</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-text-secondary sm:text-lg">{product.tagline[lang]}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={site}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-text-primary px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-container"
              >
                {t.open} <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#preview"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border-subtle bg-surface-canvas px-5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-subtle"
              >
                {t.preview} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-tertiary">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span>{t.signIn}</span>
              <span aria-hidden="true">·</span>
              <a href={product.privacy} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                {t.privacy}
              </a>
            </p>
          </ScrollReveal>

          <ScrollReveal variant="right">
            <ScrollScene className="relative min-w-0 scroll-scene--parallax">
              <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative"><CloudPreview lang={lang} /></div>
            </ScrollScene>
          </ScrollReveal>
        </div>
      </section>

      <section id="preview" className="scroll-mt-20 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5 md:px-10">
          <ScrollReveal variant="left" className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">{t.previewEyebrow}</span>
            <h2 className="font-editorial-xl mt-3 text-3xl sm:text-4xl lg:text-5xl">{t.previewTitle}</h2>
            <p className="mt-4 text-base leading-7 text-text-secondary">{t.previewText}</p>
          </ScrollReveal>
          <ScrollScene className="scroll-scene--parallax">
            <CloudPreview expanded lang={lang} />
          </ScrollScene>
        </div>
      </section>

      <PlatformDownloads product={product} lang={lang} id={t.download} />

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-16">
          <ScrollReveal variant="left" className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">{t.featuresEyebrow}</span>
            <h2 className="font-editorial-xl mt-3 text-3xl sm:text-4xl">{t.featuresTitle}</h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.features.map(([title, text], index) => {
              const Icon = FEATURE_ICONS[index];
              return (
                <ScrollReveal key={title} variant={index % 2 === 0 ? "left" : "right"} delay={index * 55}>
                  <article className="h-full rounded-2xl border border-border-subtle bg-surface-subtle p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-badge-accent-bg text-badge-accent-text">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-editorial-sm mt-5 text-lg">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">{text}</p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <ProductFooter lang={lang} />
    </main>
  );
}
