"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, CornerDownLeft, Hash, Layers, Search } from "lucide-react";
import { SYSTEMS } from "./data";

interface Entry {
  id: string;
  label: string;
  hint: string;
  group: "Systems" | "Sections" | "Links";
  run: () => void;
  keywords: string;
}

export function CommandPalette({ open, onClose, onOpenSystem }: { open: boolean; onClose: () => void; onOpenSystem: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const entries = useMemo<Entry[]>(() => {
    const jump = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const go = (href: string, external = false) => () => {
      if (external) window.open(href, "_blank", "noopener");
      else window.location.href = href;
    };
    return [
      ...SYSTEMS.map<Entry>((s) => ({
        id: `sys-${s.id}`,
        label: s.name,
        hint: s.badge,
        group: "Systems",
        run: () => onOpenSystem(s.id),
        keywords: `${s.name} ${s.badge} ${s.tags.join(" ")} ${s.category}`.toLowerCase(),
      })),
      { id: "sec-systems", label: "All systems", hint: "Section", group: "Sections", run: jump("systems"), keywords: "systems products grid" },
      { id: "sec-eng", label: "Engineering foundations", hint: "Section", group: "Sections", run: jump("engineering"), keywords: "engineering principles mission" },
      { id: "sec-upd", label: "Studio updates", hint: "Section", group: "Sections", run: jump("updates"), keywords: "updates news release" },
      { id: "sec-notes", label: "Notes from the studio", hint: "Section", group: "Sections", run: jump("notes"), keywords: "notes field blog" },
      { id: "sec-mission", label: "Studio manifesto", hint: "Section", group: "Sections", run: jump("mission"), keywords: "mission manifesto about" },
      { id: "lnk-office", label: "depup Office page", hint: "/office", group: "Links", run: go("/office"), keywords: "office documents android windows" },
      { id: "lnk-sentinel", label: "Sentinel-ID page", hint: "/sentinel", group: "Links", run: go("/sentinel"), keywords: "sentinel security audit" },
      { id: "lnk-cloud", label: "Open depup.cloud", hint: "depup.cloud", group: "Links", run: go("https://depup.cloud", true), keywords: "cloud launch mcp" },
      { id: "lnk-gh", label: "GitHub", hint: "github.com/MeledakCik", group: "Links", run: go("https://github.com/MeledakCik", true), keywords: "github source code builders" },
    ];
  }, [onOpenSystem]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((e) => q.split(/\s+/).every((part) => e.keywords.includes(part) || e.label.toLowerCase().includes(part)));
  }, [entries, query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setCursor(0);
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${cursor}"]`)?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const run = (e?: Entry) => {
    if (!e) return;
    onClose();
    window.setTimeout(e.run, 60);
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(results.length - 1, c + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[cursor]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!open) return null;

  let lastGroup = "";
  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search Depup Studio">
      <div className="obs-fade absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="obs-pop relative w-full max-w-xl overflow-hidden rounded-[1.5rem] border border-white/12 bg-[rgba(22,22,23,0.9)] shadow-[0_40px_120px_rgba(0,0,0,0.9)] backdrop-blur-2xl" onKeyDown={onKey}>
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-5">
          <Search className="h-4 w-4 shrink-0 text-obs-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search systems, sections, links…"
            aria-label="Search"
            aria-activedescendant={results[cursor] ? `cmd-${results[cursor].id}` : undefined}
            className="h-14 w-full bg-transparent text-[15px] text-obs-text outline-none placeholder:text-obs-dim"
          />
          <kbd className="rounded-md border border-white/12 px-1.5 py-0.5 font-obs-mono text-[10px] text-obs-dim">ESC</kbd>
        </div>
        <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
          {results.length === 0 && <p className="px-3 py-10 text-center text-[13px] text-obs-dim">No matches for “{query}”.</p>}
          {results.map((e, i) => {
            const header = e.group !== lastGroup ? e.group : null;
            lastGroup = e.group;
            const Icon = e.group === "Systems" ? Layers : e.group === "Sections" ? Hash : ArrowUpRight;
            const active = i === cursor;
            return (
              <div key={e.id}>
                {header && <div className="px-3 pb-1 pt-3 font-obs-mono text-[10px] uppercase tracking-[0.1em] text-obs-dim">{header}</div>}
                <button
                  id={`cmd-${e.id}`}
                  data-idx={i}
                  role="option"
                  aria-selected={active}
                  onPointerMove={() => setCursor(i)}
                  onClick={() => run(e)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${active ? "bg-white/[0.08]" : ""}`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${active ? "bg-obs-blue text-white" : "bg-obs-container text-obs-muted"}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] text-obs-text">{e.label}</span>
                    <span className="block truncate font-obs-mono text-[11px] text-obs-dim">{e.hint}</span>
                  </span>
                  {active && <CornerDownLeft className="h-3.5 w-3.5 text-obs-muted" />}
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-2.5 font-obs-mono text-[10px] text-obs-dim">
          <span>↑ ↓ navigate · ↵ open</span>
          <span>Depup Studio</span>
        </div>
      </div>
    </div>
  );
}
