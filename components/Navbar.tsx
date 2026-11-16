"use client";

import { useEffect, useState } from "react";
import { Search, Menu, X, Sparkles } from "lucide-react";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const navLinks = [
  { label: "Spotlight", href: "#spotlight" },
  { label: "depup Office", href: "/office" },
  { label: "Updates", href: "#updates" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Engineering", href: "#engineering" },
  { label: "Mission", href: "#mission" },
];

export function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("spotlight");

  useEffect(() => {
    const updateHeader = () => {
      const hero = document.getElementById("spotlight");
      if (!hero) {
        setScrolled(window.scrollY > 48);
        return;
      }
      const bounds = hero.getBoundingClientRect();
      const heroIsBehindHeader = bounds.top <= 64 && bounds.bottom > Math.min(120, window.innerHeight * 0.18);
      setScrolled(!heroIsBehindHeader);
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);
    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, []);

  useEffect(() => {
    const ids = ["spotlight", "updates", "ecosystem", "engineering", "mission"];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const isOnHero = !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow,color] duration-300 ${
        isOnHero
          ? "border-white/10 bg-[#071b42]/20 text-white shadow-none"
          : "border-border-subtle bg-surface-canvas/90 text-text-primary shadow-[0_1px_8px_rgba(0,0,0,0.03)]"
      }`}
    >
      <div className="h-16 max-w-7xl mx-auto px-5 md:px-10 lg:px-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <a
            href="#spotlight"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Depup Studio Home"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-editorial-sm text-sm transition-colors ${isOnHero ? "bg-white/15 text-white ring-1 ring-white/25 group-hover:bg-white/25" : "bg-text-primary text-surface-canvas group-hover:bg-primary-container"}`}>
              D
            </div>
            <span className={`whitespace-nowrap font-editorial-sm text-base tracking-tight sm:text-lg ${isOnHero ? "text-white" : "text-text-primary"}`}>
              Depup Studio
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-current={link.href.startsWith("#") && activeSection === link.href.slice(1) ? "location" : undefined}
                className={`inline-flex min-h-11 items-center ${
                  link.href.startsWith("#") && activeSection === link.href.slice(1)
                    ? `text-sm font-semibold transition-colors ${isOnHero ? "text-white" : "text-primary"}`
                    : `text-sm font-medium transition-colors ${isOnHero ? "text-white/75 hover:text-white" : "text-on-surface-variant hover:text-on-surface"}`
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:flex items-center">
            <div className={`flex min-h-11 items-center gap-2 rounded-full border px-3.5 py-2 transition-colors focus-within:border-primary-container ${isOnHero ? "border-white/25 bg-white/10 focus-within:bg-white/15" : "border-border-subtle bg-surface-subtle focus-within:bg-surface-canvas"}`}>
              <Search className={`w-4 h-4 shrink-0 ${isOnHero ? "text-white/70" : "text-text-tertiary"}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products, systems..."
                aria-label="Search products and systems"
                className={`w-36 border-none bg-transparent text-sm outline-none lg:w-48 ${isOnHero ? "text-white placeholder:text-white/55" : "text-on-surface placeholder:text-text-tertiary"}`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className={isOnHero ? "text-white/70 hover:text-white" : "text-text-tertiary hover:text-text-primary"}
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <a
            href="https://depup.cloud"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${isOnHero ? "border border-white/25 bg-white/10 text-white hover:bg-white/20" : "bg-text-primary text-surface-canvas hover:bg-primary-container hover:text-on-primary-container"}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Cloud</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`lg:hidden flex h-11 w-11 items-center justify-center rounded-full border ${isOnHero ? "border-white/25 bg-white/10 text-white" : "border-border-subtle bg-surface-subtle text-text-primary"}`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-navigation" className="lg:hidden bg-surface-canvas/95 backdrop-blur-xl border-b border-border-subtle px-5 py-4 space-y-3">
          <div className="flex items-center gap-2 bg-surface-subtle border border-border-subtle rounded-full px-3.5 py-2">
            <Search className="w-4 h-4 text-text-tertiary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products, systems..."
              aria-label="Search products and systems"
              className="bg-transparent border-none outline-none text-sm text-on-surface w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-11 items-center text-sm font-medium text-on-surface-variant hover:text-primary py-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
