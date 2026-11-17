"use client";

import { useCallback, useEffect, useState } from "react";
import { ObsNav } from "@/components/obsidian/ObsNav";
import { Hero } from "@/components/obsidian/Hero";
import { Pillars } from "@/components/obsidian/Pillars";
import { Systems } from "@/components/obsidian/Systems";
import { SystemModal } from "@/components/obsidian/SystemModal";
import { Principles } from "@/components/obsidian/Principles";
import { Updates } from "@/components/obsidian/Updates";
import { FieldNotes } from "@/components/obsidian/FieldNotes";
import { Manifesto } from "@/components/obsidian/Manifesto";
import { ObsFooter } from "@/components/obsidian/ObsFooter";
import { CommandPalette } from "@/components/obsidian/CommandPalette";
import { useRevealAll } from "@/components/obsidian/primitives";
import type { Category } from "@/components/obsidian/data";

export default function HomePage() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [systemId, setSystemId] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useRevealAll();

  const openSystem = useCallback((id: string) => setSystemId(id), []);
  const closeSystem = useCallback(() => setSystemId(null), []);

  const selectPillar = useCallback((c: Category) => {
    setFilter(c);
    document.getElementById("systems")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // ⌘K / Ctrl+K or "/" opens search; links like href="#system:kasyaf" open the detail sheet.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target?.closest("input, textarea, [contenteditable=true]");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#system:"]');
      if (!a) return;
      e.preventDefault();
      setSystemId(a.getAttribute("href")!.slice("#system:".length));
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="obs-root min-h-screen bg-black font-sans text-obs-text antialiased selection:bg-obs-sky selection:text-[#002f66]">
      <ObsNav onOpenPalette={() => setPaletteOpen(true)} />
      <main className="w-full">
        <Hero />
        <Pillars onSelect={selectPillar} />
        <Systems filter={filter} onFilter={setFilter} onOpen={openSystem} />
        <Principles />
        <Updates onOpen={openSystem} />
        <FieldNotes onOpen={openSystem} />
        <Manifesto />
      </main>
      <ObsFooter onOpen={openSystem} />
      <SystemModal id={systemId} onClose={closeSystem} onNavigate={openSystem} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onOpenSystem={openSystem} />
    </div>
  );
}
