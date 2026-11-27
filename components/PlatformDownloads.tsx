"use client";

import { ArrowUpRight, ChevronDown, Clock, Globe, Laptop, Monitor, Smartphone, TabletSmartphone, type LucideIcon } from "lucide-react";
import { useDevice, type DeviceId } from "@/lib/device";
import type { Lang } from "@/lib/i18n";
import { PLATFORM_LABEL, type PlatformId, type PlatformLink, type Product } from "@/lib/products";
import { ScrollReveal } from "@/components/ScrollReveal";

const ICON: Record<PlatformId, LucideIcon> = {
  android: Smartphone,
  ios: TabletSmartphone,
  macos: Laptop,
  windows: Monitor,
  web: Globe,
};

const DEVICE_LABEL: Record<Lang, Record<DeviceId, string>> = {
  id: { android: "Android", ios: "iPhone & iPad", macos: "Mac", windows: "Windows", other: "perangkat ini" },
  en: { android: "Android", ios: "iPhone & iPad", macos: "Mac", windows: "Windows", other: "this device" },
};

const COPY = {
  id: {
    eyebrow: "Unduh",
    title: (name: string) => `${name} di perangkat Anda`,
    intro: "Pilih platform. Versi yang belum tersedia akan diumumkan di halaman ini.",
    introDetected: (device: string) => `Kami mendeteksi Anda memakai ${device}. Tautan untuk perangkat lain ada di bawah.`,
    privacy: (name: string) => `Kebijakan Privasi ${name}`,
    forYou: "Untuk perangkat Anda",
    other: "Unduh untuk perangkat lain",
    open: "Buka",
    download: "Unduh",
    soon: "Segera",
    status: { available: "Tersedia", beta: "Beta", soon: "Segera" },
    aria: (verb: string, name: string, platform: string, store?: string) =>
      `${verb} ${name} untuk ${platform}${store ? ` di ${store}` : ""}`,
    webInstead: (name: string, device: string) =>
      `${name} untuk ${device} segera hadir. Sementara itu, versi web bisa langsung dipakai di browser Anda.`,
    nothingYet: (name: string, device: string) =>
      `${name} untuk ${device} belum tersedia. Lihat perangkat lain yang sudah didukung di bawah.`,
  },
  en: {
    eyebrow: "Download",
    title: (name: string) => `${name} on your device`,
    intro: "Pick a platform. Versions that aren't out yet will be announced on this page.",
    introDetected: (device: string) => `Looks like you're on ${device}. Links for other devices are below.`,
    privacy: (name: string) => `${name} privacy policy`,
    forYou: "For your device",
    other: "Download for another device",
    open: "Open",
    download: "Download",
    soon: "Soon",
    status: { available: "Available", beta: "Beta", soon: "Soon" },
    aria: (verb: string, name: string, platform: string, store?: string) =>
      `${verb} ${name} for ${platform}${store ? ` on ${store}` : ""}`,
    webInstead: (name: string, device: string) =>
      `${name} for ${device} is coming soon. Meanwhile, the web version works right in your browser.`,
    nothingYet: (name: string, device: string) =>
      `${name} isn't available for ${device} yet. See the supported devices below.`,
  },
} as const;

type Copy = (typeof COPY)[Lang];

const isLive = (p: PlatformLink) => p.status !== "soon" && Boolean(p.href);

/** Picks what to show first for the visitor's device: its native app, else the web app, else nothing. */
function plan(product: Product, device: DeviceId) {
  const native = product.platforms.find((p) => p.id === device);
  const web = product.platforms.find((p) => p.id === "web" && isLive(p));
  if (native && isLive(native)) return { primary: native, notice: null as null | "web" | "none", native };
  if (web) return { primary: web, notice: native ? ("web" as const) : null, native };
  return { primary: native ?? null, notice: "none" as const, native };
}

/**
 * The "Download" section on every product page. Without JavaScript (and for search engines) it lists every
 * platform; in the browser it leads with the visitor's own device and folds the rest under "another device".
 * Platform data comes from lib/products.ts.
 */
export function PlatformDownloads({ product, lang, id }: { product: Product; lang: Lang; id?: string }) {
  const t = COPY[lang];
  const device = useDevice();
  const sectionId = id ?? (lang === "id" ? "unduh" : "download");

  const detected = device ? plan(product, device) : null;
  const deviceName = device ? DEVICE_LABEL[lang][device] : "";
  const others = detected ? product.platforms.filter((p) => p !== detected.primary) : product.platforms;

  return (
    <section id={sectionId} className="scroll-mt-8 border-y border-border-subtle bg-surface-canvas py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-16">
        <ScrollReveal variant="left" className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">{t.eyebrow}</span>
            <h2 className="font-editorial-xl mt-3 text-3xl sm:text-4xl">{t.title(product.name)}</h2>
            <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-base">
              {detected && device !== "other" ? t.introDetected(deviceName) : t.intro}
            </p>
          </div>
          <a href={product.privacy} className="text-sm font-medium text-primary hover:underline">
            {t.privacy(product.name)}
          </a>
        </ScrollReveal>

        {detected ? (
          <div className="space-y-4">
            {detected.notice && (
              <p className="rounded-2xl border border-border-subtle bg-surface-subtle px-5 py-4 text-sm leading-6 text-text-secondary" role="status">
                {detected.notice === "web" ? t.webInstead(product.name, deviceName) : t.nothingYet(product.name, deviceName)}
              </p>
            )}
            {detected.primary && <PrimaryCard platform={detected.primary} product={product} t={t} lang={lang} />}
            {others.length > 0 && (
              <details className="group rounded-2xl border border-border-subtle bg-surface-subtle" open={detected.notice === "none" || undefined}>
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 text-sm font-semibold text-text-primary [&::-webkit-details-marker]:hidden">
                  {t.other}
                  <ChevronDown className="h-4 w-4 text-text-tertiary transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="grid grid-cols-1 gap-3 px-3 pb-3 min-[420px]:grid-cols-2 sm:gap-4 sm:px-5 sm:pb-5 lg:grid-cols-4">
                  {others.map((p) => (
                    <PlatformCard key={p.id} platform={p} product={product} t={t} lang={lang} />
                  ))}
                </div>
              </details>
            )}
          </div>
        ) : (
          <div className={`grid grid-cols-2 gap-3 sm:gap-4 ${product.platforms.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
            {product.platforms.map((p, index) => (
              <ScrollReveal key={p.id} variant="rise" delay={index * 50} className={isLive(p) ? "col-span-2 sm:col-span-1" : ""}>
                <PlatformCard platform={p} product={product} t={t} lang={lang} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PlatformButton({ platform: p, product, t, className = "" }: { platform: PlatformLink; product: Product; t: Copy; className?: string }) {
  const external = p.href?.startsWith("http");
  const verb = p.id === "web" ? t.open : t.download;
  return (
    <a
      href={p.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-text-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-container ${className}`}
      aria-label={t.aria(verb, product.name, PLATFORM_LABEL[p.id], p.store)}
    >
      {p.id === "web" ? t.open : p.store ?? t.download} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function AltLink({ platform: p, className = "" }: { platform: PlatformLink; className?: string }) {
  if (!p.alt) return null;
  return (
    <a href={p.alt.href} target="_blank" rel="noopener noreferrer" className={`text-xs font-medium text-text-secondary hover:text-primary ${className}`}>
      {p.alt.label}
    </a>
  );
}

function PrimaryCard({ platform: p, product, t, lang }: { platform: PlatformLink; product: Product; t: Copy; lang: Lang }) {
  const Icon = ICON[p.id];
  const live = isLive(p);
  return (
    <article className="flex flex-col gap-5 rounded-3xl border border-primary/25 bg-surface-subtle p-5 sm:flex-row sm:items-center sm:p-7">
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-badge-accent-bg text-badge-accent-text">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{t.forYou}</p>
        <h3 className="font-editorial-sm mt-1 text-xl">
          {product.name} · {PLATFORM_LABEL[p.id]}
        </h3>
        {p.note && <p className="mt-1 text-sm text-text-tertiary">{p.note[lang]}</p>}
      </div>
      <div className="flex flex-col items-stretch gap-2 sm:items-end">
        {live ? (
          <>
            <PlatformButton platform={p} product={product} t={t} className="min-h-12 px-7" />
            <AltLink platform={p} className="text-center sm:text-right" />
          </>
        ) : (
          <StatusPill status={p.status} t={t} />
        )}
      </div>
    </article>
  );
}

function PlatformCard({ platform: p, product, t, lang }: { platform: PlatformLink; product: Product; t: Copy; lang: Lang }) {
  const Icon = ICON[p.id];
  const live = isLive(p);
  return (
    <article
      className={`flex h-full flex-col rounded-2xl border p-4 transition-colors sm:p-5 ${
        live ? "border-border-subtle bg-surface-canvas hover:border-primary/40" : "border-dashed border-border-strong bg-surface-canvas"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`grid h-11 w-11 place-items-center rounded-xl ${
            live ? "bg-badge-accent-bg text-badge-accent-text" : "bg-surface-subtle text-text-tertiary"
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <StatusPill status={p.status} t={t} />
      </div>
      <h3 className="font-editorial-sm mt-5 text-lg">{PLATFORM_LABEL[p.id]}</h3>
      <p className="mt-1 min-h-5 text-xs text-text-tertiary">{p.note?.[lang] ?? (live ? p.store : null)}</p>
      <div className="mt-auto pt-5">
        {live ? (
          <PlatformButton platform={p} product={product} t={t} className="w-full px-4" />
        ) : (
          <span
            className="inline-flex min-h-11 w-full cursor-not-allowed items-center justify-center gap-1.5 rounded-full border border-border-subtle px-2 text-xs font-medium text-text-tertiary sm:px-4 sm:text-sm"
            aria-disabled="true"
          >
            <Clock className="h-4 w-4" aria-hidden="true" /> {p.store ?? t.soon}
          </span>
        )}
        {live && <AltLink platform={p} className="mt-2 block text-center" />}
      </div>
    </article>
  );
}

function StatusPill({ status, t }: { status: PlatformLink["status"]; t: Copy }) {
  const cls = {
    available: "bg-[#e7f6ec] text-[#11743b]",
    beta: "bg-[#fff4e0] text-[#8a5300]",
    soon: "bg-surface-subtle text-text-tertiary",
  } as const;
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${cls[status]}`}>{t.status[status]}</span>;
}
