import type { Metadata } from "next";
import { PolicyPage, type PolicySection } from "@/components/PolicyPage";
import { STUDIO } from "@/lib/products";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Sentinel ID",
  description:
    "Data yang diproses Sentinel ID (sentinel-id.net) saat Anda mengaudit domain: hasil scan sementara, catatan aktivitas untuk mencegah penyalahgunaan, dan layanan pihak ketiga yang dipakai.",
  alternates: { canonical: "/sentinel/privacy-policy" },
};

const UPDATED = "25 November 2026";

const sections: PolicySection[] = [
  {
    id: "lingkup",
    title: "Lingkup",
    body: (
      <p>
        Kebijakan ini berlaku untuk <strong>Sentinel ID</strong> di <a href="https://sentinel-id.net">sentinel-id.net</a>, alat
        audit keamanan website pasif yang dikembangkan oleh {STUDIO.name}. Sentinel ID hanya boleh dipakai untuk domain milik
        Anda sendiri atau yang Anda punya izin tertulis untuk mengauditnya.
      </p>
    ),
  },
  {
    id: "data",
    title: "Data yang kami proses",
    body: (
      <ul>
        <li><strong>Target audit:</strong> nama domain/URL yang Anda masukkan, beserta hasil pemindaian pasif (header keamanan, sertifikat SSL, DNS, teknologi yang terdeteksi, dan temuan).</li>
        <li><strong>Berkas yang Anda unggah</strong> untuk Source Code Audit (ZIP): diproses di memori server untuk dianalisis dan tidak disimpan.</li>
        <li><strong>Email atau domain</strong> yang Anda masukkan untuk pemeriksaan kebocoran data (Breach Peek).</li>
        <li><strong>Data teknis:</strong> alamat IP, jenis browser (user-agent), dan cookie pengenal acak <code>sentinel_uid</code>, untuk pembatasan laju dan mencegah penyalahgunaan.</li>
        <li><strong>Catatan aktivitas:</strong> modul yang dipakai, target, status, dan ringkasan hasil.</li>
      </ul>
    ),
  },
  {
    id: "tujuan",
    title: "Untuk apa data dipakai",
    body: (
      <ul>
        <li>Menjalankan audit yang Anda minta dan menampilkan laporannya.</li>
        <li>Menegakkan batas pemakaian (mis. maksimal 100 permintaan per scan) dan mencegah pemindaian domain milik orang lain tanpa izin.</li>
        <li>Menyelidiki laporan penyalahgunaan.</li>
        <li>Kami tidak menjual data, tidak menampilkan iklan, dan tidak memakai data Anda untuk melatih model AI.</li>
      </ul>
    ),
  },
  {
    id: "retensi",
    title: "Berapa lama data disimpan",
    body: (
      <div className="policy-table-wrap">
        <table>
          <thead><tr><th>Data</th><th>Masa simpan</th></tr></thead>
          <tbody>
            <tr><td data-label="Data">Hasil scan & QC beserta log prosesnya</td><td data-label="Masa simpan">Dihapus otomatis 30 menit setelah dibuat.</td></tr>
            <tr><td data-label="Data">Ringkasan publik hasil audit per domain</td><td data-label="Masa simpan">7 hari.</td></tr>
            <tr><td data-label="Data">Bukti temuan sensitif (Evidence Vault), terenkripsi AES-256-GCM</td><td data-label="Masa simpan">24 jam, hanya dapat dibuka satu kali oleh pemilik domain terverifikasi.</td></tr>
            <tr><td data-label="Data">Catatan aktivitas (IP, user-agent, modul, target)</td><td data-label="Masa simpan">7 hari, maksimal 500 entri terbaru.</td></tr>
            <tr><td data-label="Data">Berkas ZIP Source Code Audit</td><td data-label="Masa simpan">Tidak disimpan setelah analisis selesai.</td></tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "pihak-ketiga",
    title: "Pihak ketiga",
    body: (
      <ul>
        <li><strong>Website target</strong> — menerima permintaan GET biasa dari server Sentinel ID selama audit.</li>
        <li><strong>XposedOrNot</strong> — menerima email/domain yang Anda periksa di Breach Peek.</li>
        <li><strong>Cloudflare DNS (DNS-over-HTTPS) dan crt.sh</strong> — menerima nama domain untuk pengecekan DNS dan sertifikat.</li>
        <li><strong>Penyedia hosting dan basis data</strong> — menyimpan data sementara di atas sesuai masa simpannya.</li>
      </ul>
    ),
  },
  {
    id: "cookie",
    title: "Cookie",
    body: (
      <p>
        Sentinel ID hanya memakai cookie yang diperlukan agar layanan berjalan (pengenal sesi acak <code>sentinel_uid</code>
        dan sesi admin). Tidak ada cookie iklan atau analitik pihak ketiga.
      </p>
    ),
  },
  {
    id: "hak",
    title: "Hak Anda",
    body: (
      <p>
        Anda dapat meminta penjelasan, salinan, atau penghapusan data yang terkait dengan Anda sebelum masa simpannya habis
        dengan mengirim email ke <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>. Pemilik domain yang merasa domainnya
        dipindai tanpa izin juga dapat melapor ke alamat yang sama.
      </p>
    ),
  },
  {
    id: "anak",
    title: "Anak-anak",
    body: <p>Sentinel ID ditujukan untuk pemilik website dan pengembang, bukan untuk anak di bawah 13 tahun.</p>,
  },
  {
    id: "perubahan",
    title: "Perubahan kebijakan",
    body: <p>Bila kebijakan ini berubah, tanggal di atas diperbarui dan versi terbaru selalu tersedia di halaman ini.</p>,
  },
  {
    id: "kontak",
    title: "Kontak",
    body: (
      <p>
        Pertanyaan terkait privasi: <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>. Pengembang: {STUDIO.name},{" "}
        {STUDIO.city}.
      </p>
    ),
  },
];

export default function SentinelPrivacyPolicyPage() {
  return (
    <PolicyPage
      product="Sentinel ID"
      productHref="/sentinel"
      updated={UPDATED}
      summary={[
        "Hanya untuk domain milik Anda; audit bersifat pasif (GET-only).",
        "Hasil scan terhapus otomatis setelah 30 menit.",
        "IP dan catatan aktivitas disimpan 7 hari untuk mencegah penyalahgunaan.",
        "Tanpa iklan, tanpa analitik pihak ketiga, data tidak dijual.",
      ]}
      englishSummary="Sentinel ID processes the domains you audit, temporary scan results (auto-deleted after 30 minutes), and IP/user-agent activity logs kept for 7 days to prevent abuse. Breach checks send the email/domain you enter to XposedOrNot. No ads, no third-party analytics, no data sales."
      sections={sections}
    />
  );
}
