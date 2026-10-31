import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Depup Studio — Produk Digital untuk Kebutuhan Sehari-hari',
  description:
    'Depup Studio adalah perusahaan pengembang produk digital di balik depup.cloud dan depup Office.',
  keywords: ['Depup Studio', 'depup.cloud', 'depup Office', 'produk digital'],
  openGraph: {
    title: 'Depup Studio — Produk Digital untuk Kebutuhan Sehari-hari',
    description: 'Studio di balik depup.cloud dan depup Office.',
    url: 'https://depup.studio',
    siteName: 'Depup Studio',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
