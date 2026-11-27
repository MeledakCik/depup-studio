import type { Metadata } from "next";
import { PolicyPage, type PolicySection } from "@/components/PolicyPage";
import { PRODUCTS, STUDIO } from "@/lib/products";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Depup Office",
  description:
    "Bagaimana Depup Office menangani data: berkas diproses di perangkat, tanpa akun, tanpa iklan, tanpa analitik. Internet hanya untuk unduhan link yang Anda setujui dan pemeriksaan pembaruan.",
  alternates: { canonical: "/office/privacy-policy" },
};

const UPDATED = "25 November 2026";

const sections: PolicySection[] = [
  {
    id: "lingkup",
    title: "Lingkup",
    body: (
      <>
        <p>
          Kebijakan ini berlaku untuk aplikasi <strong>Depup Office</strong> di Android (paket <code>cloud.depup.office</code>)
          dan iOS, yang dikembangkan oleh {STUDIO.name}. Kebijakan ini menjelaskan data apa yang diproses aplikasi, di mana
          data itu disimpan, dan kapan aplikasi memakai internet.
        </p>
      </>
    ),
  },
  {
    id: "data",
    title: "Data yang kami kumpulkan",
    body: (
      <>
        <p>
          <strong>Kami tidak mengumpulkan data pribadi.</strong> Depup Office tidak memiliki akun atau pendaftaran, tidak
          menampilkan iklan, dan tidak memakai alat analitik atau pelacak. Kami tidak menerima isi dokumen, foto, catatan,
          atau daftar berkas Anda.
        </p>
        <p>Semua yang Anda buat atau buka di aplikasi tetap berada di perangkat Anda:</p>
        <ul>
          <li>Dokumen, PDF, hasil scan, dan berkas hasil olahan disimpan di folder <code>Documents/DepUp Office</code> (Android) atau folder aplikasi (iOS).</li>
          <li>Catatan dan widget catatan disimpan di memori lokal aplikasi.</li>
          <li>Berkas di <strong>Brankas</strong> dienkripsi AES-256-GCM dengan kunci di Android Keystore dan dikunci PIN.</li>
          <li>Riwayat berkas terbaru dan pengaturan disimpan lokal dan bisa dihapus dari aplikasi.</li>
        </ul>
      </>
    ),
  },
  {
    id: "internet",
    title: "Kapan aplikasi memakai internet",
    body: (
      <>
        <p>Depup Office bekerja offline. Internet hanya dipakai pada tiga keadaan berikut:</p>
        <div className="policy-table-wrap">
          <table>
            <thead>
              <tr><th>Keadaan</th><th>Yang dikirim</th><th>Ke mana</th></tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Keadaan"><strong>Buka dari link.</strong> Anda membagikan link berkas (mis. Google Drive, Google Docs, share.google, atau LMS) ke Depup Office lalu menekan “Unduh &amp; buka”.</td>
                <td data-label="Yang dikirim">Permintaan HTTPS biasa untuk mengunduh berkas itu (alamat link, alamat IP perangkat seperti saat membuka di browser). Tanpa cookie atau data akun Anda.</td>
                <td data-label="Ke mana">Server pemilik link tersebut.</td>
              </tr>
              <tr>
                <td data-label="Keadaan"><strong>Pemeriksaan pembaruan wajib.</strong> Saat aplikasi dibuka, aplikasi memeriksa apakah ada versi baru.</td>
                <td data-label="Yang dikirim">Android: tidak ada data dari aplikasi; pemeriksaan dilakukan oleh aplikasi Google Play di perangkat. iOS: ID paket aplikasi.</td>
                <td data-label="Ke mana">Google Play (Android) atau Apple App Store (iOS).</td>
              </tr>
              <tr>
                <td data-label="Keadaan"><strong>Donasi.</strong> Anda menekan tombol dukungan.</td>
                <td data-label="Yang dikirim">Tidak ada; aplikasi hanya membuka browser.</td>
                <td data-label="Ke mana">saweria.co, di luar aplikasi.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Pengenalan teks (OCR) memakai Google ML Kit yang berjalan sepenuhnya di perangkat; model sudah terpasang di
          aplikasi. Pengiriman log/telemetri library tersebut dimatikan di aplikasi. Saat membuka dokumen Word/Excel,
          gambar atau skrip dari internet yang tertaut di dokumen tidak dimuat.
        </p>
      </>
    ),
  },
  {
    id: "izin",
    title: "Izin perangkat",
    body: (
      <ul>
        <li><strong>Kamera</strong> — untuk memindai dokumen, KTP, dan kode QR. Gambar diproses di perangkat.</li>
        <li><strong>Internet</strong> — hanya untuk keadaan pada bagian sebelumnya.</li>
        <li><strong>Deteksi perekaman layar</strong> (Android 15+) — agar Dokumen Terlindungi ditutup saat layar sedang direkam. Tidak ada data yang direkam atau dikirim.</li>
        <li>Akses berkas diberikan per berkas melalui pemilih berkas sistem; aplikasi tidak meminta akses ke seluruh penyimpanan.</li>
      </ul>
    ),
  },
  {
    id: "terlindungi",
    title: "Dokumen Terlindungi",
    body: (
      <>
        <p>
          Isi Dokumen Terlindungi dienkripsi AES-256-GCM. Kunci dibuat dari kode akses yang dibagikan pembuat dokumen
          (mis. guru) dan tidak pernah dikirim ke server mana pun. Bila Anda memilih “ingat kode”, kode disimpan di
          Android Keystore atau iOS Keychain di perangkat Anda dan tidak ikut dicadangkan ke perangkat lain.
        </p>
        <p>
          Saat dokumen terkunci terbuka, aplikasi memblokir tangkapan layar dan membatasi akses layanan lain (mis.
          asisten AI dan isi otomatis) ke isi layar.
        </p>
      </>
    ),
  },
  {
    id: "pihak-ketiga",
    title: "Pihak ketiga",
    body: (
      <>
        <ul>
          <li><strong>Google Play / Apple App Store</strong> — distribusi aplikasi dan pemeriksaan pembaruan, sesuai kebijakan privasi masing-masing.</li>
          <li><strong>Google ML Kit</strong> — library OCR dan pemindai kode yang berjalan di perangkat.</li>
          <li><strong>Saweria</strong> — hanya bila Anda memilih berdonasi, di browser.</li>
          <li><strong>Pemilik link</strong> — hanya server dari link yang Anda sendiri bagikan untuk diunduh.</li>
        </ul>
        <p>Kami tidak menjual, menyewakan, atau membagikan data Anda kepada siapa pun.</p>
      </>
    ),
  },
  {
    id: "penyimpanan",
    title: "Penyimpanan, cadangan, dan penghapusan",
    body: (
      <ul>
        <li>Karena data ada di perangkat Anda, Anda yang memegang kendali penuh: hapus berkas dari aplikasi atau pengelola berkas kapan saja.</li>
        <li>Menghapus aplikasi akan menghapus catatan, pengaturan, kode yang diingat, dan isi Brankas. Berkas di <code>Documents/DepUp Office</code> tetap ada sampai Anda menghapusnya.</li>
        <li>Pencadangan otomatis data aplikasi dinonaktifkan, sehingga data aplikasi tidak disalin ke cloud.</li>
        <li>Salinan sementara berkas yang dibuka dibersihkan otomatis oleh aplikasi.</li>
      </ul>
    ),
  },
  {
    id: "anak",
    title: "Anak-anak",
    body: (
      <p>
        Depup Office dapat dipakai pelajar, guru, dan pekerja. Karena aplikasi tidak mengumpulkan data pribadi dari siapa
        pun, aplikasi juga tidak mengumpulkan data dari anak-anak.
      </p>
    ),
  },
  {
    id: "keamanan",
    title: "Keamanan",
    body: (
      <p>
        Aplikasi memeriksa keutuhan dirinya (mis. tanda tangan resmi dan tanda modifikasi) sebelum membuka Dokumen
        Terlindungi, memakai HTTPS untuk setiap unduhan, dan menolak link yang bukan HTTPS. Tidak ada sistem yang
        benar-benar sempurna; laporkan celah keamanan ke {STUDIO.email}.
      </p>
    ),
  },
  {
    id: "perubahan",
    title: "Perubahan kebijakan",
    body: (
      <p>
        Bila kebijakan ini berubah, tanggal di atas diperbarui dan versi terbaru selalu tersedia di halaman ini.
        Perubahan penting juga dicantumkan di catatan rilis aplikasi.
      </p>
    ),
  },
  {
    id: "kontak",
    title: "Kontak",
    body: (
      <p>
        Pertanyaan atau permintaan terkait privasi: <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>. Pengembang:{" "}
        {STUDIO.name}, {STUDIO.city}. Halaman produk: <a href={PRODUCTS.office.path}>{STUDIO.domain}/office</a>.
      </p>
    ),
  },
];

export default function OfficePrivacyPolicyPage() {
  return (
    <PolicyPage
      product="Depup Office"
      productHref="/office"
      updated={UPDATED}
      summary={[
        "Tanpa akun, tanpa iklan, tanpa analitik atau pelacak.",
        "Dokumen, scan, dan catatan diproses dan disimpan di perangkat Anda.",
        "Internet hanya untuk mengunduh link yang Anda setujui dan memeriksa pembaruan.",
        "Kode Dokumen Terlindungi disimpan di Keystore/Keychain perangkat, tidak dikirim ke server.",
      ]}
      englishSummary="Depup Office collects no personal data: no account, no ads, no analytics. Files are processed and stored on your device. The app uses the internet only to download a link you explicitly share to it and approve, and to check Google Play / the App Store for a required update."
      sections={sections}
    />
  );
}
