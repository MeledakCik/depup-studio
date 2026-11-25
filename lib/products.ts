/**
 * Satu sumber data untuk semua produk Depup Studio: nama, domain, kebijakan privasi, dan tautan unduhan per platform.
 * Untuk merilis platform baru cukup ubah `status` menjadi "available" dan isi `href` di sini; semua halaman ikut.
 */

export type PlatformId = "android" | "ios" | "macos" | "windows" | "web";

export type PlatformStatus = "available" | "beta" | "soon";

export interface PlatformLink {
  id: PlatformId;
  status: PlatformStatus;
  /** Tujuan tombol bila tersedia/beta (toko aplikasi, berkas, atau situs). */
  href?: string;
  /** Teks toko/kanal, mis. "Google Play", "App Store", "Microsoft Store". */
  store?: string;
  /** Keterangan kecil di bawah tombol, mis. "Android 10 ke atas". */
  note?: string;
  /** Tautan kedua (mis. APK langsung dari GitHub). */
  alt?: { label: string; href: string };
}

export interface Product {
  id: "office" | "sentinel" | "cloud";
  name: string;
  tagline: string;
  /** Halaman produk di depupstudio.com */
  path: string;
  /** Situs/aplikasi web produk sendiri, bila ada. */
  site?: string;
  /** Kebijakan privasi resmi (kanonik). */
  privacy: string;
  /** Kebijakan privasi tersimpan di depupstudio.com atau di domain produk. */
  privacyHostedHere: boolean;
  platforms: PlatformLink[];
}

export const STUDIO = {
  name: "Depup Studio",
  domain: "depupstudio.com",
  url: "https://depupstudio.com",
  email: "depupdev@gmail.com",
  github: "https://github.com/MeledakCik",
  city: "Bandung, Indonesia",
} as const;

export const OFFICE_PACKAGE = "cloud.depup.office";
export const OFFICE_PLAY_URL = `https://play.google.com/store/apps/details?id=${OFFICE_PACKAGE}`;

export const PRODUCTS: Record<Product["id"], Product> = {
  office: {
    id: "office",
    name: "depup Office",
    tagline: "Dokumen, spreadsheet, presentasi, PDF, dan scanner — offline di perangkat Anda.",
    path: "/office",
    privacy: "/office/privacy-policy",
    privacyHostedHere: true,
    platforms: [
      {
        id: "android",
        status: "available",
        store: "Google Play",
        href: OFFICE_PLAY_URL,
        note: "Android 10 ke atas",
        alt: { label: "APK (GitHub)", href: "https://github.com/MeledakCik/DepupOffice/releases/latest" },
      },
      { id: "ios", status: "soon", store: "App Store", note: "iPhone & iPad, iOS 18+" },
      { id: "macos", status: "soon", store: "Mac App Store", note: "Apple silicon & Intel" },
      { id: "windows", status: "soon", store: "Microsoft Store", note: "Windows 10/11" },
    ],
  },
  sentinel: {
    id: "sentinel",
    name: "Sentinel-ID",
    tagline: "Audit keamanan website pasif untuk domain milik Anda sendiri.",
    path: "/sentinel",
    site: "https://sentinel-id.net",
    privacy: "/sentinel/privacy-policy",
    privacyHostedHere: true,
    platforms: [
      { id: "web", status: "available", store: "sentinel-id.net", href: "https://sentinel-id.net", note: "Langsung di browser" },
      { id: "android", status: "soon", store: "Google Play" },
      { id: "ios", status: "soon", store: "App Store" },
      { id: "macos", status: "soon", store: "Mac App Store" },
      { id: "windows", status: "soon", store: "Microsoft Store" },
    ],
  },
  cloud: {
    id: "cloud",
    name: "depup.cloud",
    tagline: "Deploy ke Vercel, Cloudflare Pages, dan Railway dari satu dashboard — plus konektor Claude (MCP).",
    path: "/cloud",
    site: "https://depup.cloud",
    // depup.cloud memakai Masuk dengan Google & OAuth konektor: kebijakannya wajib tetap di domain layanannya sendiri.
    privacy: "https://depup.cloud/privacy",
    privacyHostedHere: false,
    platforms: [
      { id: "web", status: "available", store: "depup.cloud", href: "https://depup.cloud", note: "Dashboard web" },
      { id: "android", status: "soon", store: "Google Play" },
      { id: "ios", status: "soon", store: "App Store" },
      { id: "macos", status: "soon", store: "Mac App Store" },
      { id: "windows", status: "soon", store: "Microsoft Store" },
    ],
  },
};

export const PLATFORM_LABEL: Record<PlatformId, string> = {
  android: "Android",
  ios: "iOS",
  macos: "macOS",
  windows: "Windows",
  web: "Web",
};
