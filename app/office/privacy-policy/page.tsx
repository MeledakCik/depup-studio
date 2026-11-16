import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Heart } from "lucide-react";
import { ScrollProgress } from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — depup Office",
  description:
    "Kebijakan privasi aplikasi depup Office, termasuk cara aplikasi menangani data, donasi, dan keamanan.",
};

const policySections = [
  { id: "data", title: "2. Data yang Kami Kumpulkan / Data We Collect" },
  { id: "donasi", title: "3. Donasi / Donation" },
  { id: "pihak-ketiga", title: "4. Pihak Ketiga / Third Parties" },
  { id: "keamanan", title: "5. Keamanan Data / Data Security" },
  { id: "anak", title: "6. Hak Anak / Children’s Privacy" },
  { id: "perubahan", title: "7. Perubahan Kebijakan / Changes" },
  { id: "kontak", title: "8. Hubungi Kami / Contact Us" },
];

export default function OfficePrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-surface text-text-primary">
      <ScrollProgress />
      <header className="border-b border-border-subtle bg-surface-canvas">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5 md:px-8">
          <a href="/office" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary">
            <ArrowLeft className="h-4 w-4" /> depup Office
          </a>
          <a href="/" className="text-sm text-text-secondary hover:text-text-primary">
            Depup Studio
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-4xl gap-10 px-5 py-10 md:grid-cols-[minmax(0,1fr)_220px] md:px-8 md:py-16">
        <article className="min-w-0 rounded-3xl border border-border-subtle bg-surface-canvas p-6 shadow-sm sm:p-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8eeff] px-3 py-1.5 text-xs font-semibold text-[#1652f6]">
            <Heart className="h-3.5 w-3.5" /> Kebijakan Privasi
          </span>
          <h1 className="font-editorial-xl mt-5 text-3xl sm:text-4xl">
            Privacy Policy for Depup Office
          </h1>
          <div className="mt-4 border-b border-border-subtle pb-6 text-sm leading-6 text-text-secondary">
            <p>Tanggal berlaku: 28 Oktober 2026</p>
            <p>Aplikasi: Depup Office</p>
            <p>Developer: <a className="text-primary hover:underline" href="mailto:depupdev@gmail.com">depupdev@gmail.com</a></p>
            <p>Donasi: <a className="text-primary hover:underline" href="https://saweria.co/depupdonate" target="_blank" rel="noopener noreferrer">saweria.co/depupdonate</a></p>
          </div>

          <section className="policy-section">
            <h2>1. Pengantar / Introduction</h2>
            <p><strong>Indonesia:</strong> Depup Office adalah aplikasi GRATIS. Kami sangat menghargai privasi Anda. Kebijakan ini menjelaskan bagaimana kami menangani data Anda.</p>
            <p><strong>English:</strong> Depup Office is a FREE application. We value your privacy. This policy explains how we handle your data.</p>
          </section>

          <section id="data" className="policy-section">
            <h2>2. Data yang Kami Kumpulkan / Data We Collect</h2>
            <p><strong>Kami TIDAK mengumpulkan data pribadi sensitif seperti:</strong></p>
            <ul>
              <li>Nomor KTP, rekening bank, password e-wallet</li>
              <li>Lokasi GPS presisi</li>
              <li>Kontak HP atau foto pribadi tanpa izin</li>
            </ul>
            <p>Data yang mungkin digunakan hanya untuk fungsi pendaftaran gratis di dalam aplikasi (misal: nama, email) dan disimpan secara lokal di perangkat Anda, tidak dikirim ke server kami kecuali diperlukan untuk fitur aplikasi.</p>
          </section>

          <section id="donasi" className="policy-section">
            <h2>3. Donasi / Donation</h2>
            <div className="rounded-2xl border border-[#c7d7ff] bg-[#f1f5ff] p-5">
              <p><strong>Penting / Important:</strong> Donasi di Depup Office bersifat <strong>sukarela (voluntary)</strong> dan <strong>TIDAK membuka fitur premium apapun</strong>. Semua fitur tetap gratis.</p>
              <p>Donasi <strong>TIDAK diproses di dalam aplikasi</strong> dan <strong>TIDAK menggunakan Google Play Billing</strong>. Ketika Anda menekan tombol “Dukung Developer”, aplikasi akan membuka browser eksternal ke link resmi kami:</p>
              <p><a className="break-all font-medium text-primary hover:underline" href="https://saweria.co/depupdonate" target="_blank" rel="noopener noreferrer">https://saweria.co/depupdonate</a></p>
              <p>Proses pembayaran (Dana, GoPay, ShopeePay, QRIS) sepenuhnya dilakukan di website Saweria, di luar aplikasi Depup Office. Kami tidak menyimpan atau memproses nomor e-wallet Anda di dalam aplikasi.</p>
            </div>
          </section>

          <section id="pihak-ketiga" className="policy-section">
            <h2>4. Pihak Ketiga / Third Parties</h2>
            <p>Kami menggunakan layanan pihak ketiga hanya untuk donasi:</p>
            <ul><li><strong>Saweria.co</strong> — untuk memproses donasi sukarela. Silakan cek privacy policy mereka di saweria.co.</li></ul>
            <p>Kami tidak menjual data Anda kepada pihak ketiga.</p>
          </section>

          <section id="keamanan" className="policy-section">
            <h2>5. Keamanan Data / Data Security</h2>
            <p>Kami berusaha menjaga keamanan data Anda dengan menyimpan data secara lokal di perangkat. Namun, tidak ada metode yang 100% aman di internet.</p>
          </section>

          <section id="anak" className="policy-section">
            <h2>6. Hak Anak / Children’s Privacy</h2>
            <p>Aplikasi ini tidak ditujukan untuk anak di bawah 13 tahun untuk pengumpulan data. Kami tidak sengaja mengumpulkan data dari anak-anak.</p>
          </section>

          <section id="perubahan" className="policy-section">
            <h2>7. Perubahan Kebijakan / Changes</h2>
            <p>Kami dapat memperbarui kebijakan ini dari waktu ke waktu. Perubahan akan diinformasikan melalui pembaruan aplikasi atau halaman ini.</p>
          </section>

          <section id="kontak" className="policy-section">
            <h2>8. Hubungi Kami / Contact Us</h2>
            <p>Jika ada pertanyaan tentang privacy policy ini, hubungi:</p>
            <p>Email: <a className="text-primary hover:underline" href="mailto:depupdev@gmail.com">depupdev@gmail.com</a><br />
              GitHub: <a className="text-primary hover:underline" href="https://github.com/MeledakCik/DepupOffice" target="_blank" rel="noopener noreferrer">github.com/MeledakCik/DepupOffice</a><br />
              Donasi: <a className="text-primary hover:underline" href="https://saweria.co/depupdonate" target="_blank" rel="noopener noreferrer">saweria.co/depupdonate</a></p>
          </section>

          <div className="mt-10 border-t border-border-subtle pt-5 text-center text-xs leading-5 text-text-tertiary">
            © 2026 Depup Office · Made with love in Bandung, Indonesia<br />
            This privacy policy is compliant with Google Play Store Policy
          </div>
        </article>

        <aside className="h-fit rounded-2xl border border-border-subtle bg-surface-canvas p-5 md:sticky md:top-6">
          <h2 className="font-editorial-sm text-sm">Daftar isi</h2>
          <nav className="mt-3 flex flex-col gap-2.5 text-xs leading-5 text-text-secondary" aria-label="Daftar isi kebijakan">
            <a href="#data" className="hover:text-primary">Data yang kami kumpulkan</a>
            {policySections.slice(1).map(({ id, title }) => (
              <a key={id} href={`#${id}`} className="hover:text-primary">{title.replace(/^\d+\. /, "")}</a>
            ))}
          </nav>
          <a
            href="https://depupoffice-privacy.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            Buka versi hosted <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </aside>
      </div>

      <style>{`
        .policy-section { margin-top: 30px; scroll-margin-top: 24px; }
        .policy-section h2 { margin-bottom: 12px; border-bottom: 1px solid #e4e2dd; padding-bottom: 8px; font-size: 18px; font-weight: 650; line-height: 1.35; color: #111111; }
        .policy-section p, .policy-section li { margin-top: 10px; color: #424754; font-size: 14px; line-height: 1.8; }
        .policy-section ul { margin: 10px 0 14px; padding-left: 22px; list-style: disc; }
      `}</style>
    </main>
  );
}
