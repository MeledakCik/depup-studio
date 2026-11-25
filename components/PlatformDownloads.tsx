import { ArrowUpRight, Clock, Globe, Laptop, Monitor, Smartphone, TabletSmartphone, type LucideIcon } from "lucide-react";
import { PLATFORM_LABEL, type PlatformId, type Product } from "@/lib/products";
import { ScrollReveal } from "@/components/ScrollReveal";

const ICON: Record<PlatformId, LucideIcon> = {
  android: Smartphone,
  ios: TabletSmartphone,
  macos: Laptop,
  windows: Monitor,
  web: Globe,
};

/**
 * Bagian "Unduh" yang sama di setiap halaman produk: satu kartu per platform (Android, iOS, macOS, Windows, Web).
 * Platform yang belum rilis tampil sebagai "Segera hadir" tanpa tautan; datanya dari lib/products.ts.
 */
export function PlatformDownloads({ product, id = "unduh" }: { product: Product; id?: string }) {
  const cols = product.platforms.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";
  return (
    <section id={id} className="scroll-mt-8 border-y border-border-subtle bg-surface-canvas py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-16">
        <ScrollReveal variant="left" className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">Unduh</span>
            <h2 className="font-editorial-xl mt-3 text-3xl sm:text-4xl">{product.name} di perangkat Anda</h2>
            <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-base">
              Pilih platform. Versi yang belum tersedia akan diumumkan di halaman ini.
            </p>
          </div>
          <a href={product.privacy} className="text-sm font-medium text-primary hover:underline">
            Kebijakan Privasi {product.name}
          </a>
        </ScrollReveal>

        <div className={`grid grid-cols-2 gap-3 sm:gap-4 ${cols}`}>
          {product.platforms.map((p, index) => {
            const Icon = ICON[p.id];
            const live = p.status !== "soon" && p.href;
            const external = p.href?.startsWith("http");
            return (
              <ScrollReveal key={p.id} variant="rise" delay={index * 50} className={live ? "col-span-2 sm:col-span-1" : ""}>
                <article
                  className={`flex h-full flex-col rounded-2xl border p-4 transition-colors sm:p-5 ${
                    live ? "border-border-subtle bg-surface-subtle hover:border-primary/40" : "border-dashed border-border-strong bg-surface-canvas"
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
                    <StatusPill status={p.status} />
                  </div>
                  <h3 className="font-editorial-sm mt-5 text-lg">{PLATFORM_LABEL[p.id]}</h3>
                  <p className="mt-1 min-h-5 text-xs text-text-tertiary">{p.note ?? p.store}</p>
                  <div className="mt-auto pt-5">
                    {live ? (
                      <a
                        href={p.href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-text-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-container"
                        aria-label={`${p.id === "web" ? "Buka" : "Unduh"} ${product.name} untuk ${PLATFORM_LABEL[p.id]}${p.store ? ` di ${p.store}` : ""}`}
                      >
                        {p.id === "web" ? "Buka" : p.store ?? "Unduh"} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : (
                      <span
                        className="inline-flex min-h-11 w-full cursor-not-allowed items-center justify-center gap-1.5 rounded-full border border-border-subtle px-2 text-xs font-medium text-text-tertiary sm:px-4 sm:text-sm"
                        aria-disabled="true"
                      >
                        <Clock className="h-4 w-4" aria-hidden="true" /> {p.store ?? "Segera"}
                      </span>
                    )}
                    {live && p.alt && (
                      <a
                        href={p.alt.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 block text-center text-xs font-medium text-text-secondary hover:text-primary"
                      >
                        {p.alt.label}
                      </a>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatusPill({ status }: { status: Product["platforms"][number]["status"] }) {
  const map = {
    available: { label: "Tersedia", cls: "bg-[#e7f6ec] text-[#11743b]" },
    beta: { label: "Beta", cls: "bg-[#fff4e0] text-[#8a5300]" },
    soon: { label: "Segera", cls: "bg-surface-subtle text-text-tertiary" },
  } as const;
  const s = map[status];
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${s.cls}`}>{s.label}</span>;
}
