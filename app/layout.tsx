import type { Metadata, Viewport } from "next";
const F=(v:string)=>(_o:unknown)=>({variable:v});const Inter=F("fi"),JetBrains_Mono=F("fj"),Plus_Jakarta_Sans=F("fp");
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jbmono",
  display: "swap",
});

const SITE = "https://depupstudio.com";
const DESCRIPTION =
  "Depup Studio is an independent, founder-led software studio in Bandung, Indonesia. We build and run depup.cloud, depup Office and Sentinel-ID.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Depup Studio — Independent Software Studio in Bandung, Indonesia",
    template: "%s · Depup Studio",
  },
  description: DESCRIPTION,
  applicationName: "Depup Studio",
  authors: [{ name: "Depup Studio", url: SITE }],
  creator: "Depup Studio",
  publisher: "Depup Studio",
  keywords: [
    "Depup Studio",
    "Depup",
    "depup.cloud",
    "depup Office",
    "Sentinel-ID",
    "software studio Indonesia",
    "software studio Bandung",
    "independent software studio",
    "studio software Bandung",
    "pengembang aplikasi Indonesia",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "Depup Studio",
    type: "website",
    url: SITE,
    locale: "en_US",
    title: "Depup Studio — Independent Software Studio in Bandung, Indonesia",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Depup Studio — Independent Software Studio in Bandung, Indonesia",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F8FC" },
    { media: "(prefers-color-scheme: dark)", color: "#061634" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-surface font-sans text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
