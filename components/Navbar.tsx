'use client';

import React from 'react';
import { Sparkles, Globe, Terminal, ArrowUpRight, Layers } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'obsidian' | 'editorial' | 'titanium';
  setTheme: (theme: 'obsidian' | 'editorial' | 'titanium') => void;
  lang: 'id' | 'en';
  setLang: (lang: 'id' | 'en') => void;
  onOpenCommand: () => void;
}

export function Navbar({
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  lang,
  setLang,
  onOpenCommand,
}: NavbarProps) {
  const navItems = [
    { id: 'overview', label: lang === 'id' ? 'Ikhtisar' : 'Overview' },
    { id: 'ecosystem', label: lang === 'id' ? 'Produk (Play Store)' : 'Ecosystem' },
    { id: 'sandbox', label: lang === 'id' ? 'Simulasi Live' : 'Interactive Lab' },
    { id: 'architecture', label: lang === 'id' ? 'Riset & Arsitektur' : 'Research' },
    { id: 'nextjs16', label: 'Next.js v16 Code' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-zinc-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500/90 via-orange-400 to-indigo-500 p-[1px]">
              <div className="w-full h-full bg-zinc-950 rounded-[7px] flex items-center justify-center">
                <Layers className="w-4 h-4 text-amber-300" />
              </div>
            </div>
            <div>
              <span className="font-semibold tracking-tight text-white text-base">depup</span>
              <span className="text-amber-400/90 font-mono text-xs ml-0.5">.studio</span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-sm transition-all ${
                  activeTab === item.id
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenCommand}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-300 hover:border-white/20"
          >
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>⌘K</span>
          </button>

          <button
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className="px-2.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono uppercase text-zinc-300 hover:text-white"
          >
            <Globe className="w-3.5 h-3.5 inline mr-1" />
            {lang}
          </button>

          <button
            onClick={() =>
              setTheme(
                theme === 'obsidian' ? 'editorial' : theme === 'editorial' ? 'titanium' : 'obsidian'
              )
            }
            className="px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs text-amber-200 hover:bg-amber-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 inline mr-1" />
            {theme}
          </button>
        </div>
      </div>
    </header>
  );
}
