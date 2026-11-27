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

import type { Lang } from "@/lib/i18n";

type Screen = "home" | "documents" | "scan" | "tools" | "profile";

const COPY = {
  id: {
    nav: { home: "Beranda", documents: "Dokumen", scan: "Scan", tools: "Alat", profile: "Saya" },
    screens: {
      home: { title: "Beranda", description: "Pintasan cepat untuk pekerjaan sehari-hari." },
      documents: { title: "Dokumen", description: "Cari, tandai, dan lanjutkan membuka berkas." },
      scan: { title: "Scan dokumen", description: "Pindai kertas dan simpan sebagai PDF." },
      tools: { title: "Alat", description: "Kelola PDF, gambar, tanda tangan, dan ekspor." },
      profile: { title: "Saya", description: "Atur privasi, tampilan, dan preferensi aplikasi." },
    },
    date: "Senin, 16 November",
    greeting1: "Selamat datang,",
    greeting2: "mau kerjakan apa?",
    search: "Cari dokumen…",
    scanTitle: "Scan dokumen",
    scanBody: "Foto kertas jadi PDF rapi. Sudut otomatis diluruskan.",
    scanStart: "Mulai Scan",
    recent: "Berkas terbaru",
    made: "Hasil dibuat",
    open: "Buka berkas",
    more: "Lainnya",
    create: "Buat baru",
    newWord: ["Dokumen Word", "Halaman kosong, editor ala Word"],
    newSheet: ["Spreadsheet", "Tabel & rumus seperti Excel"],
    docsSub: "Semua berkas di perangkat Anda.",
    filters: ["Terkini", "Ditandai", "Hasil olahan"],
    today: "Hari ini",
    files: [
      ["Rencana kerja.docx", "Word · 2 menit lalu"],
      ["Anggaran proyek.xlsx", "Excel · 1 jam lalu"],
      ["Scan_2026_11_16.pdf", "PDF · Kemarin"],
      ["Surat lamaran.docx", "Word · 3 hari lalu"],
    ],
    camTitle: "Arahkan kamera ke dokumen",
    camBody: "Tepi kertas akan terdeteksi otomatis. Hasil scan tersimpan sebagai PDF.",
    camOpen: "Buka kamera",
    toolsSub: "Pilih alat sesuai kebutuhan Anda.",
    toolsGroup: "Kelola PDF",
    tools: [
      ["Gabungkan PDF", "Satukan beberapa berkas PDF"],
      ["Kompres PDF", "Perkecil ukuran berkas"],
      ["Gambar & foto", "Ubah, potong, dan rapikan"],
      ["Tanda tangan PDF", "Tambahkan tanda tangan"],
      ["Ekspor & bagikan", "Pilih format dan tujuan"],
    ],
    toolsNoteTitle: "Semua alat, langsung dari perangkat",
    toolsNoteBody: "Buka dan olah file tanpa perlu mengunggahnya ke layanan lain.",
    profileSub: "Pengaturan dan informasi aplikasi.",
    version: "Versi 3.0 · Gratis · Tanpa iklan",
    prefs: "Preferensi",
    settings: [
      ["Brankas", "Lindungi dokumen pribadi"],
      ["Tampilan", "Tema, ukuran huruf, dan bahasa"],
      ["Penyimpanan", "Kelola lokasi dan berkas"],
    ],
    offline: "100% offline · berkas tidak diunggah",
    sideEyebrow: "Aplikasi Android",
    sideTitle: "Dirancang untuk pekerjaan sehari-hari.",
    sideBody: "Navigasikan tab di bagian bawah ponsel untuk melihat beranda, dokumen, alat, dan pengaturan. Tombol Scan membuka alur pemindaian.",
    searchAria: "Cari dokumen",
    contentAria: "Isi pratinjau aplikasi",
    scanAria: "Mulai scan dokumen",
    points: [
      "Aksi penting tetap dekat dan mudah ditemukan.",
      "Warna berkas membantu mengenali format dengan cepat.",
      "Preview ini mengikuti struktur aplikasi Android Depup Office.",
    ],
  },
  en: {
    nav: { home: "Home", documents: "Files", scan: "Scan", tools: "Tools", profile: "Me" },
    screens: {
      home: { title: "Home", description: "Quick shortcuts for everyday work." },
      documents: { title: "Files", description: "Search, star and pick up where you left off." },
      scan: { title: "Scan a document", description: "Scan paper and save it as a PDF." },
      tools: { title: "Tools", description: "Manage PDFs, images, signatures and exports." },
      profile: { title: "Me", description: "Privacy, appearance and app preferences." },
    },
    date: "Monday, 16 November",
    greeting1: "Welcome back,",
    greeting2: "what are we working on?",
    search: "Search files…",
    scanTitle: "Scan a document",
    scanBody: "Turn paper into a clean PDF. Edges are straightened automatically.",
    scanStart: "Start scan",
    recent: "Recent files",
    made: "Files created",
    open: "Open a file",
    more: "More",
    create: "Create new",
    newWord: ["Word document", "Blank page, Word-style editor"],
    newSheet: ["Spreadsheet", "Tables & formulas like Excel"],
    docsSub: "Every file on your device.",
    filters: ["Recent", "Starred", "Created"],
    today: "Today",
    files: [
      ["Work plan.docx", "Word · 2 min ago"],
      ["Project budget.xlsx", "Excel · 1 hr ago"],
      ["Scan_2026_11_16.pdf", "PDF · Yesterday"],
      ["Cover letter.docx", "Word · 3 days ago"],
    ],
    camTitle: "Point the camera at a document",
    camBody: "Paper edges are detected automatically. Scans are saved as PDF.",
    camOpen: "Open camera",
    toolsSub: "Pick the tool you need.",
    toolsGroup: "PDF tools",
    tools: [
      ["Merge PDF", "Combine several PDF files"],
      ["Compress PDF", "Make files smaller"],
      ["Images & photos", "Convert, crop and tidy up"],
      ["Sign PDF", "Add a signature"],
      ["Export & share", "Choose a format and destination"],
    ],
    toolsNoteTitle: "Every tool, right on your device",
    toolsNoteBody: "Open and edit files without uploading them to another service.",
    profileSub: "Settings and app information.",
    version: "Version 3.0 · Free · No ads",
    prefs: "Preferences",
    settings: [
      ["Vault", "Protect private documents"],
      ["Appearance", "Theme, text size and language"],
      ["Storage", "Manage locations and files"],
    ],
    offline: "100% offline · files are never uploaded",
    sideEyebrow: "Android app",
    sideTitle: "Designed for everyday work.",
    sideBody: "Use the tabs at the bottom of the phone to see home, files, tools and settings. The Scan button opens the scanner.",
    searchAria: "Search files",
    contentAria: "App preview content",
    scanAria: "Start scanning a document",
    points: [
      "Important actions stay close and easy to find.",
      "File colours help you spot formats at a glance.",
      "This preview follows the structure of the depup Office Android app.",
    ],
  },
} as const;

type Copy = (typeof COPY)[Lang];

const appNav: { id: Screen; icon: typeof Home }[] = [
  { id: "home", icon: Home },
  { id: "documents", icon: Folder },
  { id: "scan", icon: ScanLine },
  { id: "tools", icon: Wrench },
  { id: "profile", icon: UserRound },
];

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

function HomeScreen({ t }: { t: Copy }) {
  return (
    <>
      <div className="mb-3">
        <p className="text-[9px] text-[#65625d]">{t.date}</p>
        <h3 className="mt-1 text-[19px] font-bold leading-tight tracking-[-.04em] text-[#111111]">
          {t.greeting1}
          <br />{t.greeting2}
        </h3>
      </div>
      <div className="mb-2.5 flex h-10 items-center gap-2 rounded-full border border-[#e4e2dd] bg-white px-3.5 text-[#65625d]">
        <Search className="h-3.5 w-3.5" />
        <span className="text-[10px]">{t.search}</span>
      </div>
      <div className="mb-2.5 rounded-2xl bg-[#1652f6] p-3.5 text-white">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="text-[14px] font-bold">{t.scanTitle}</h4>
            <p className="mt-1 max-w-[175px] text-[9px] leading-4 text-white/85">
              {t.scanBody}
            </p>
            <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[9px] font-semibold text-[#1652f6]">
              <Camera className="h-3 w-3" /> {t.scanStart}
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
          <p className="mt-1 text-[8px] text-[#65625d]">{t.recent}</p>
        </div>
        <div className="rounded-xl bg-[#1652f6] px-3 py-2.5 text-white">
          <p className="text-base font-bold leading-none">08</p>
          <p className="mt-1 text-[8px] text-white/85">{t.made}</p>
        </div>
      </div>
      <SectionLabel>{t.open}</SectionLabel>
      <div className="mb-3 grid grid-cols-4 rounded-2xl bg-white px-1 py-1">
        <ActionTile icon={File} label="PDF" tone="bg-[#f5e6e1] text-[#b0472f]" />
        <ActionTile icon={FileText} label="Word" tone="bg-[#e4eaf3] text-[#33609f]" />
        <ActionTile icon={FileSpreadsheet} label="Excel" tone="bg-[#e3eee6] text-[#35754c]" />
        <ActionTile icon={FolderOpen} label={t.more} tone="bg-[#e8eeff] text-[#1652f6]" />
      </div>
      <SectionLabel>{t.create}</SectionLabel>
      <div className="overflow-hidden rounded-2xl bg-white">
        <FileRow icon={FileText} tone="bg-[#e4eaf3] text-[#33609f]" title={t.newWord[0]} subtitle={t.newWord[1]} />
        <div className="mx-3 border-t border-[#e4e2dd]" />
        <FileRow icon={FileSpreadsheet} tone="bg-[#e3eee6] text-[#35754c]" title={t.newSheet[0]} subtitle={t.newSheet[1]} />
      </div>
    </>
  );
}

function DocumentsScreen({ t }: { t: Copy }) {
  return (
    <>
      <div className="mb-3">
        <h3 className="text-[20px] font-bold tracking-[-.04em] text-[#111111]">{t.nav.documents}</h3>
        <p className="mt-1 text-[9px] text-[#65625d]">{t.docsSub}</p>
      </div>
      <div className="mb-3 flex h-10 items-center gap-2 rounded-full border border-[#e4e2dd] bg-white px-3.5 text-[#65625d]">
        <Search className="h-3.5 w-3.5" /><span className="text-[10px]">{t.search}</span>
      </div>
      <div className="mb-3 flex gap-1 rounded-full bg-[#e8e6e1] p-1">
        {t.filters.map((label, i) => [label, i === 0] as const).map(([label, active]) => (
          <span key={String(label)} className={`rounded-full px-2 py-1.5 text-[8px] font-semibold ${active ? "bg-white text-[#111111] shadow-sm" : "text-[#65625d]"}`}>{label}</span>
        ))}
      </div>
      <SectionLabel>{t.today}</SectionLabel>
      <div className="overflow-hidden rounded-2xl bg-white">
        <FileRow icon={FileText} tone="bg-[#e4eaf3] text-[#33609f]" title={t.files[0][0]} subtitle={t.files[0][1]} />
        <div className="mx-3 border-t border-[#e4e2dd]" />
        <FileRow icon={FileSpreadsheet} tone="bg-[#e3eee6] text-[#35754c]" title={t.files[1][0]} subtitle={t.files[1][1]} />
        <div className="mx-3 border-t border-[#e4e2dd]" />
        <FileRow icon={FileImage} tone="bg-[#ece6f3] text-[#72539e]" title={t.files[2][0]} subtitle={t.files[2][1]} />
        <div className="mx-3 border-t border-[#e4e2dd]" />
        <FileRow icon={FileText} tone="bg-[#e4eaf3] text-[#33609f]" title={t.files[3][0]} subtitle={t.files[3][1]} />
      </div>
    </>
  );
}

function ScanScreen({ t }: { t: Copy }) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl bg-[#1f2230] px-5 py-8 text-center text-white">
      <div className="relative grid h-36 w-36 place-items-center rounded-2xl border border-white/30 bg-white/5">
        <div className="absolute inset-4 rounded-lg border border-dashed border-white/45" />
        <FileText className="h-12 w-12 text-white/80" />
        <span className="absolute -left-1 -top-1 h-5 w-5 rounded-tl-md border-l-2 border-t-2 border-white" />
        <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-br-md border-b-2 border-r-2 border-white" />
      </div>
      <h3 className="mt-5 text-base font-bold">{t.camTitle}</h3>
      <p className="mt-2 max-w-[190px] text-[10px] leading-4 text-white/70">
        {t.camBody}
      </p>
      <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-semibold text-[#111111]">
        <Camera className="h-3.5 w-3.5" /> {t.camOpen}
      </span>
    </div>
  );
}

function ToolsScreen({ t }: { t: Copy }) {
  const look = [
    [FileText, "bg-[#f5e6e1] text-[#b0472f]"],
    [ArrowDownToLine, "bg-[#e8eeff] text-[#1652f6]"],
    [FileImage, "bg-[#ece6f3] text-[#72539e]"],
    [ShieldCheck, "bg-[#e3eee6] text-[#35754c]"],
    [Grid2X2, "bg-[#fdf0cc] text-[#8a4508]"],
  ] as const;
  const tools = look.map(([icon, tone], i) => [icon, t.tools[i][0], t.tools[i][1], tone] as const);
  return (
    <>
      <div className="mb-3">
        <h3 className="text-[20px] font-bold tracking-[-.04em] text-[#111111]">{t.nav.tools}</h3>
        <p className="mt-1 text-[9px] text-[#65625d]">{t.toolsSub}</p>
      </div>
      <SectionLabel>{t.toolsGroup}</SectionLabel>
      <div className="overflow-hidden rounded-2xl bg-white">
        {tools.map(([Icon, title, sub, tone], index) => (
          <div key={title}>
            <FileRow icon={Icon} tone={tone} title={title} subtitle={sub} />
            {index < tools.length - 1 && <div className="mx-3 border-t border-[#e4e2dd]" />}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl bg-[#e8eeff] p-3.5">
        <div className="flex items-center gap-2 text-[#1652f6]"><Sparkles className="h-4 w-4" /><span className="text-[10px] font-bold">{t.toolsNoteTitle}</span></div>
        <p className="mt-1.5 text-[9px] leading-4 text-[#65625d]">{t.toolsNoteBody}</p>
      </div>
    </>
  );
}

function ProfileScreen({ t }: { t: Copy }) {
  const look = [
    [ShieldCheck, "bg-[#e8eeff] text-[#1652f6]"],
    [Settings2, "bg-[#ece6f3] text-[#72539e]"],
    [Folder, "bg-[#e3eee6] text-[#35754c]"],
  ] as const;
  const settings = look.map(([icon, tone], i) => [icon, t.settings[i][0], t.settings[i][1], tone] as const);
  return (
    <>
      <div className="mb-4">
        <h3 className="text-[20px] font-bold tracking-[-.04em] text-[#111111]">{t.nav.profile}</h3>
        <p className="mt-1 text-[9px] text-[#65625d]">{t.profileSub}</p>
      </div>
      <div className="mb-3 flex items-center gap-3 rounded-2xl bg-white p-3.5">
            <Image src="/office-logo.svg" width={42} height={42} alt="" className="rounded-xl" />
        <div><p className="text-[11px] font-bold text-[#111111]">depup Office</p><p className="mt-1 text-[9px] text-[#65625d]">{t.version}</p></div>
        <ChevronRight className="ml-auto h-4 w-4 text-[#65625d]" />
      </div>
      <SectionLabel>{t.prefs}</SectionLabel>
      <div className="overflow-hidden rounded-2xl bg-white">
        {settings.map(([Icon, title, sub, tone], index) => (
          <div key={title}>
            <FileRow icon={Icon} tone={tone} title={title} subtitle={sub} />
            {index < settings.length - 1 && <div className="mx-3 border-t border-[#e4e2dd]" />}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#dcf5e4] px-3 py-2.5 text-[#14532d]">
        <Check className="h-3.5 w-3.5" /><span className="text-[9px] font-semibold">{t.offline}</span>
      </div>
    </>
  );
}

function ScreenContent({ screen, t }: { screen: Screen; t: Copy }) {
  switch (screen) {
    case "home": return <HomeScreen t={t} />;
    case "documents": return <DocumentsScreen t={t} />;
    case "scan": return <ScanScreen t={t} />;
    case "tools": return <ToolsScreen t={t} />;
    case "profile": return <ProfileScreen t={t} />;
  }
}

export function OfficePreview({ expanded = false, lang = "id" }: { expanded?: boolean; lang?: Lang }) {
  const [screen, setScreen] = useState<Screen>("home");
  const t = COPY[lang];
  const current = t.screens[screen];

  return (
    <div className={`${expanded ? "mx-auto grid max-w-5xl items-center gap-8 rounded-[2rem] border border-[#e4e2dd] bg-[#f1f0ec] p-5 sm:p-8 lg:grid-cols-[1fr_300px_1fr]" : "flex justify-center"}`}>
      {expanded && (
        <div className="hidden lg:block">
          <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#65625d]">{t.sideEyebrow}</span>
          <h3 className="font-editorial-xl mt-3 text-2xl text-[#111111]">{t.sideTitle}</h3>
          <p className="mt-3 text-sm leading-6 text-[#65625d]">{t.sideBody}</p>
          <div className="mt-6 flex flex-col gap-2">
            {appNav.map(({ id, icon: Icon }) => (
              <button key={id} type="button" onClick={() => setScreen(id)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${screen === id ? "bg-[#e8eeff] font-semibold text-[#1652f6]" : "text-[#65625d] hover:bg-white/70"}`}>
                <Icon className="h-4 w-4" />{t.nav[id]}<ArrowRight className="ml-auto h-3.5 w-3.5" />
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
            <button type="button" aria-label={t.searchAria} onClick={() => setScreen("documents")} className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#111111]"><Search className="h-3.5 w-3.5" /></button>
          </div>

          <div tabIndex={0} aria-label={t.contentAria} className="min-h-0 flex-1 overflow-y-auto px-3.5 pb-3 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-[#1F6FEB]">
            <div className="pb-16"><ScreenContent screen={screen} t={t} /></div>
          </div>

          <div className="absolute inset-x-2 bottom-2 z-10 grid h-[54px] grid-cols-5 items-center rounded-full border border-white/40 bg-white/30 px-1.5 shadow-[0_5px_18px_rgba(17,17,17,.10)] backdrop-blur-md">
            {appNav.map(({ id, icon: Icon }) => (
              id === "scan" ? (
                <button key={id} type="button" onClick={() => setScreen("scan")} className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#1652f6] text-white shadow-sm" aria-label={t.scanAria}>
                  <ScanLine className="h-4 w-4" />
                </button>
              ) : (
                <button key={id} type="button" onClick={() => setScreen(id)} aria-label={t.nav[id]} aria-current={screen === id ? "page" : undefined} className={`mx-auto grid h-10 w-10 place-items-center rounded-full transition-colors ${screen === id ? "bg-[#1652f6] text-white" : "text-[#65625d] hover:bg-[#f1f0ec]"}`}>
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
            {t.points.map((point) => (
              <p key={point} className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1652f6]" /> {point}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
