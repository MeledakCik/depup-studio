"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowDownToLine,
  ArrowRight,
  Camera,
  Check,
  ChevronRight,
  File,
  FileImage,
  FileSpreadsheet,
  FileText,
  Folder,
  FolderOpen,
  Grid2X2,
  Home,
  MoreHorizontal,
  ScanLine,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wrench,
} from "lucide-react";

type Screen = "home" | "documents" | "scan" | "tools" | "profile";

const appNav: { id: Screen; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Beranda", icon: Home },
  { id: "documents", label: "Dokumen", icon: Folder },
  { id: "scan", label: "Scan", icon: ScanLine },
  { id: "tools", label: "Alat", icon: Wrench },
  { id: "profile", label: "Saya", icon: UserRound },
];

const screenCopy: Record<Screen, { title: string; description: string }> = {
  home: {
    title: "Beranda",
    description: "Pintasan cepat untuk pekerjaan sehari-hari.",
  },
  documents: {
    title: "Dokumen",
    description: "Cari, tandai, dan lanjutkan membuka berkas.",
  },
  scan: {
    title: "Scan dokumen",
    description: "Pindai kertas dan simpan sebagai PDF.",
  },
  tools: {
    title: "Alat",
    description: "Kelola PDF, gambar, tanda tangan, dan ekspor.",
  },
  profile: {
    title: "Saya",
    description: "Atur privasi, tampilan, dan preferensi aplikasi.",
  },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h4 className="mb-2.5 text-[11px] font-semibold text-[#65625d]">{children}</h4>;
}

function ActionTile({
  icon: Icon,
  label,
  tone,
}: {
  icon: typeof FileText;
  label: string;
  tone: string;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-1.5 rounded-xl px-1 py-2">
      <span className={`grid h-10 w-10 place-items-center rounded-[13px] ${tone}`}>
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="text-[9px] font-semibold text-[#111111]">{label}</span>
    </div>
  );
}

function FileRow({
  icon: Icon,
  tone,
  title,
  subtitle,
}: {
  icon: typeof FileText;
  tone: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2.5">
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-[11px] ${tone}`}>
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[10px] font-semibold text-[#111111]">{title}</span>
        <span className="mt-0.5 block truncate text-[9px] text-[#65625d]">{subtitle}</span>
      </span>
      <MoreHorizontal className="h-4 w-4 shrink-0 text-[#65625d]" />
    </div>
  );
}

function HomeScreen() {
  return (
    <>
      <div className="mb-3">
        <p className="text-[9px] text-[#65625d]">Senin, 16 November</p>
        <h3 className="mt-1 text-[19px] font-bold leading-tight tracking-[-.04em] text-[#111111]">
          Selamat datang,
          <br />mau kerjakan apa?
        </h3>
      </div>
      <div className="mb-2.5 flex h-10 items-center gap-2 rounded-full border border-[#e4e2dd] bg-white px-3.5 text-[#65625d]">
        <Search className="h-3.5 w-3.5" />
        <span className="text-[10px]">Cari dokumen…</span>
      </div>
      <div className="mb-2.5 rounded-2xl bg-[#1652f6] p-3.5 text-white">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="text-[14px] font-bold">Scan dokumen</h4>
            <p className="mt-1 max-w-[175px] text-[9px] leading-4 text-white/85">
              Foto kertas jadi PDF rapi. Sudut otomatis diluruskan.
            </p>
            <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[9px] font-semibold text-[#1652f6]">
              <Camera className="h-3 w-3" /> Mulai Scan
            </span>
          </div>
          <div className="grid h-[66px] w-[53px] place-items-center rounded-xl border border-white/30 bg-white/10">
            <ScanLine className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white px-3 py-2.5">
          <p className="text-base font-bold leading-none text-[#111111]">12</p>
          <p className="mt-1 text-[8px] text-[#65625d]">Berkas terbaru</p>
        </div>
        <div className="rounded-xl bg-[#1652f6] px-3 py-2.5 text-white">
          <p className="text-base font-bold leading-none">08</p>
          <p className="mt-1 text-[8px] text-white/85">Hasil dibuat</p>
        </div>
      </div>
      <SectionLabel>Buka berkas</SectionLabel>
      <div className="mb-3 grid grid-cols-4 rounded-2xl bg-white px-1 py-1">
        <ActionTile icon={File} label="PDF" tone="bg-[#f5e6e1] text-[#b0472f]" />
        <ActionTile icon={FileText} label="Word" tone="bg-[#e4eaf3] text-[#33609f]" />
        <ActionTile icon={FileSpreadsheet} label="Excel" tone="bg-[#e3eee6] text-[#35754c]" />
        <ActionTile icon={FolderOpen} label="Lainnya" tone="bg-[#e8eeff] text-[#1652f6]" />
      </div>
      <SectionLabel>Buat baru</SectionLabel>
      <div className="overflow-hidden rounded-2xl bg-white">
        <FileRow icon={FileText} tone="bg-[#e4eaf3] text-[#33609f]" title="Dokumen Word" subtitle="Halaman kosong, editor ala Word" />
        <div className="mx-3 border-t border-[#e4e2dd]" />
        <FileRow icon={FileSpreadsheet} tone="bg-[#e3eee6] text-[#35754c]" title="Spreadsheet" subtitle="Tabel & rumus seperti Excel" />
      </div>
    </>
  );
}

function DocumentsScreen() {
  return (
    <>
      <div className="mb-3">
        <h3 className="text-[20px] font-bold tracking-[-.04em] text-[#111111]">Dokumen</h3>
        <p className="mt-1 text-[9px] text-[#65625d]">Semua berkas di perangkat Anda.</p>
      </div>
      <div className="mb-3 flex h-10 items-center gap-2 rounded-full border border-[#e4e2dd] bg-white px-3.5 text-[#65625d]">
        <Search className="h-3.5 w-3.5" /><span className="text-[10px]">Cari dokumen…</span>
      </div>
      <div className="mb-3 flex gap-1 rounded-full bg-[#e8e6e1] p-1">
        {[["Terkini", true], ["Ditandai", false], ["Hasil olahan", false]].map(([label, active]) => (
          <span key={String(label)} className={`rounded-full px-2 py-1.5 text-[8px] font-semibold ${active ? "bg-white text-[#111111] shadow-sm" : "text-[#65625d]"}`}>{label}</span>
        ))}
      </div>
      <SectionLabel>Hari ini</SectionLabel>
      <div className="overflow-hidden rounded-2xl bg-white">
        <FileRow icon={FileText} tone="bg-[#e4eaf3] text-[#33609f]" title="Rencana kerja.docx" subtitle="Word · 2 menit lalu" />
        <div className="mx-3 border-t border-[#e4e2dd]" />
        <FileRow icon={FileSpreadsheet} tone="bg-[#e3eee6] text-[#35754c]" title="Anggaran proyek.xlsx" subtitle="Excel · 1 jam lalu" />
        <div className="mx-3 border-t border-[#e4e2dd]" />
        <FileRow icon={FileImage} tone="bg-[#ece6f3] text-[#72539e]" title="Scan_2026_11_16.pdf" subtitle="PDF · Kemarin" />
        <div className="mx-3 border-t border-[#e4e2dd]" />
        <FileRow icon={FileText} tone="bg-[#e4eaf3] text-[#33609f]" title="Surat lamaran.docx" subtitle="Word · 3 hari lalu" />
      </div>
    </>
  );
}

function ScanScreen() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl bg-[#1f2230] px-5 py-8 text-center text-white">
      <div className="relative grid h-36 w-36 place-items-center rounded-2xl border border-white/30 bg-white/5">
        <div className="absolute inset-4 rounded-lg border border-dashed border-white/45" />
        <FileText className="h-12 w-12 text-white/80" />
        <span className="absolute -left-1 -top-1 h-5 w-5 rounded-tl-md border-l-2 border-t-2 border-white" />
        <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-br-md border-b-2 border-r-2 border-white" />
      </div>
      <h3 className="mt-5 text-base font-bold">Arahkan kamera ke dokumen</h3>
      <p className="mt-2 max-w-[190px] text-[10px] leading-4 text-white/70">
        Tepi kertas akan terdeteksi otomatis. Hasil scan tersimpan sebagai PDF.
      </p>
      <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-semibold text-[#111111]">
        <Camera className="h-3.5 w-3.5" /> Buka kamera
      </span>
    </div>
  );
}

function ToolsScreen() {
  const tools = [
    [FileText, "Gabungkan PDF", "Satukan beberapa berkas PDF", "bg-[#f5e6e1] text-[#b0472f]"],
    [ArrowDownToLine, "Kompres PDF", "Perkecil ukuran berkas", "bg-[#e8eeff] text-[#1652f6]"],
    [FileImage, "Gambar & foto", "Ubah, potong, dan rapikan", "bg-[#ece6f3] text-[#72539e]"],
    [ShieldCheck, "Tanda tangan PDF", "Tambahkan tanda tangan", "bg-[#e3eee6] text-[#35754c]"],
    [Grid2X2, "Ekspor & bagikan", "Pilih format dan tujuan", "bg-[#fdf0cc] text-[#8a4508]"],
  ] as const;
  return (
    <>
      <div className="mb-3">
        <h3 className="text-[20px] font-bold tracking-[-.04em] text-[#111111]">Alat</h3>
        <p className="mt-1 text-[9px] text-[#65625d]">Pilih alat sesuai kebutuhan Anda.</p>
      </div>
      <SectionLabel>Kelola PDF</SectionLabel>
      <div className="overflow-hidden rounded-2xl bg-white">
        {tools.map(([Icon, title, sub, tone], index) => (
          <div key={title}>
            <FileRow icon={Icon} tone={tone} title={title} subtitle={sub} />
            {index < tools.length - 1 && <div className="mx-3 border-t border-[#e4e2dd]" />}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl bg-[#e8eeff] p-3.5">
        <div className="flex items-center gap-2 text-[#1652f6]"><Sparkles className="h-4 w-4" /><span className="text-[10px] font-bold">Semua alat, langsung dari perangkat</span></div>
        <p className="mt-1.5 text-[9px] leading-4 text-[#65625d]">Buka dan olah file tanpa perlu mengunggahnya ke layanan lain.</p>
      </div>
    </>
  );
}

function ProfileScreen() {
  const settings = [
    [ShieldCheck, "Brankas", "Lindungi dokumen pribadi", "bg-[#e8eeff] text-[#1652f6]"],
    [Settings2, "Tampilan", "Tema, ukuran huruf, dan bahasa", "bg-[#ece6f3] text-[#72539e]"],
    [Folder, "Penyimpanan", "Kelola lokasi dan berkas", "bg-[#e3eee6] text-[#35754c]"],
  ] as const;
  return (
    <>
      <div className="mb-4">
        <h3 className="text-[20px] font-bold tracking-[-.04em] text-[#111111]">Saya</h3>
        <p className="mt-1 text-[9px] text-[#65625d]">Pengaturan dan informasi aplikasi.</p>
      </div>
      <div className="mb-3 flex items-center gap-3 rounded-2xl bg-white p-3.5">
            <Image src="/office-logo.svg" width={42} height={42} alt="" className="rounded-xl" />
        <div><p className="text-[11px] font-bold text-[#111111]">depup Office</p><p className="mt-1 text-[9px] text-[#65625d]">Versi 3.0 · Gratis · Tanpa iklan</p></div>
        <ChevronRight className="ml-auto h-4 w-4 text-[#65625d]" />
      </div>
      <SectionLabel>Preferensi</SectionLabel>
      <div className="overflow-hidden rounded-2xl bg-white">
        {settings.map(([Icon, title, sub, tone], index) => (
          <div key={title}>
            <FileRow icon={Icon} tone={tone} title={title} subtitle={sub} />
            {index < settings.length - 1 && <div className="mx-3 border-t border-[#e4e2dd]" />}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#dcf5e4] px-3 py-2.5 text-[#14532d]">
        <Check className="h-3.5 w-3.5" /><span className="text-[9px] font-semibold">100% offline · berkas tidak diunggah</span>
      </div>
    </>
  );
}

function ScreenContent({ screen }: { screen: Screen }) {
  switch (screen) {
    case "home": return <HomeScreen />;
    case "documents": return <DocumentsScreen />;
    case "scan": return <ScanScreen />;
    case "tools": return <ToolsScreen />;
    case "profile": return <ProfileScreen />;
  }
}

export function OfficePreview({ expanded = false }: { expanded?: boolean }) {
  const [screen, setScreen] = useState<Screen>("home");
  const current = screenCopy[screen];

  return (
    <div className={`${expanded ? "mx-auto grid max-w-5xl items-center gap-8 rounded-[2rem] border border-[#e4e2dd] bg-[#f1f0ec] p-5 sm:p-8 lg:grid-cols-[1fr_300px_1fr]" : "flex justify-center"}`}>
      {expanded && (
        <div className="hidden lg:block">
          <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#65625d]">Aplikasi Android</span>
          <h3 className="font-editorial-xl mt-3 text-2xl text-[#111111]">Dirancang untuk pekerjaan sehari-hari.</h3>
          <p className="mt-3 text-sm leading-6 text-[#65625d]">Navigasikan tab di bagian bawah ponsel untuk melihat beranda, dokumen, alat, dan pengaturan. Tombol Scan membuka alur pemindaian.</p>
          <div className="mt-6 flex flex-col gap-2">
            {appNav.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" onClick={() => setScreen(id)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${screen === id ? "bg-[#e8eeff] font-semibold text-[#1652f6]" : "text-[#65625d] hover:bg-white/70"}`}>
                <Icon className="h-4 w-4" />{label}<ArrowRight className="ml-auto h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-[292px] rounded-[36px] bg-[#111111] p-[7px] shadow-[0_25px_60px_rgba(17,17,17,.24)] ring-1 ring-black/10">
        <div className="relative flex h-[590px] flex-col overflow-hidden rounded-[29px] bg-[#f1f0ec]">
          <div className="flex h-7 shrink-0 items-center justify-between px-4 text-[9px] font-semibold text-[#111111]">
            <span>9:41</span>
            <span className="flex items-center gap-1"><span className="h-2 w-3 rounded-sm border border-[#111111]" /><span className="h-2 w-4 rounded-sm border border-[#111111] bg-[#111111]" /></span>
          </div>

          <div className="flex h-11 shrink-0 items-center gap-2.5 px-3.5">
            <Image src="/office-logo.svg" width={27} height={27} alt="" className="rounded-[8px]" />
            <span className="flex-1 text-[11px] font-bold text-[#111111]">{current.title}</span>
            <button type="button" aria-label="Cari dokumen" onClick={() => setScreen("documents")} className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#111111]"><Search className="h-3.5 w-3.5" /></button>
          </div>

          <div tabIndex={0} aria-label="App preview content" className="min-h-0 flex-1 overflow-y-auto px-3.5 pb-3 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-[#1F6FEB]">
            <div className="pb-16"><ScreenContent screen={screen} /></div>
          </div>

          <div className="absolute inset-x-2 bottom-2 z-10 grid h-[54px] grid-cols-5 items-center rounded-full border border-white/40 bg-white/30 px-1.5 shadow-[0_5px_18px_rgba(17,17,17,.10)] backdrop-blur-md">
            {appNav.map(({ id, label, icon: Icon }) => (
              id === "scan" ? (
                <button key={id} type="button" onClick={() => setScreen("scan")} className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#1652f6] text-white shadow-sm" aria-label="Mulai scan dokumen">
                  <ScanLine className="h-4 w-4" />
                </button>
              ) : (
                <button key={id} type="button" onClick={() => setScreen(id)} aria-label={label} aria-current={screen === id ? "page" : undefined} className={`mx-auto grid h-10 w-10 place-items-center rounded-full transition-colors ${screen === id ? "bg-[#1652f6] text-white" : "text-[#65625d] hover:bg-[#f1f0ec]"}`}>
                  <Icon className="h-4 w-4" />
                </button>
              )
            ))}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="hidden lg:block">
          <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#65625d]">{current.title}</span>
          <p className="font-editorial-lg mt-3 text-xl leading-snug text-[#111111]">{current.description}</p>
          <div className="mt-6 space-y-3 text-sm leading-5 text-[#65625d]">
            <p className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1652f6]" /> Aksi penting tetap dekat dan mudah ditemukan.</p>
            <p className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1652f6]" /> Warna berkas membantu mengenali format dengan cepat.</p>
            <p className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1652f6]" /> Preview ini mengikuti struktur aplikasi Android Depup Office.</p>
          </div>
        </div>
      )}
    </div>
  );
}
