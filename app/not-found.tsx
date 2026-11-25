import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#F6F8FC] px-6 text-center text-[#0A1428]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(45% 40% at 30% 30%, rgba(92,225,255,0.35), transparent 70%), radial-gradient(45% 45% at 75% 70%, rgba(124,77,255,0.22), transparent 70%)" }}
      />
      <p className="relative font-obs-mono text-[12px] uppercase tracking-[0.1em] text-[#0057C3]">Error 404</p>
      <h1 className="relative mt-5 font-display text-[clamp(44px,8vw,96px)] font-semibold leading-[1] tracking-[-0.04em]">
        Lost in the clouds.
      </h1>
      <p className="relative mt-6 max-w-[460px] text-[18px] leading-[1.6] text-[#2E3A50]">
        The page you were looking for doesn&apos;t exist or has moved.
      </p>
      <div className="relative mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/" className="inline-flex min-h-11 items-center rounded-full bg-[#0057C3] px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#1F6FEB]">
          Back to Depup Studio
        </Link>
        <a href="mailto:depupdev@gmail.com" className="inline-flex min-h-11 items-center rounded-full border border-black/15 bg-white/70 px-6 text-[15px] font-medium backdrop-blur-md transition-colors hover:border-black/40">
          Contact us
        </a>
      </div>
    </main>
  );
}
