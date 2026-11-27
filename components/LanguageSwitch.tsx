"use client";

import { useEffect, useState } from "react";
import { Languages, X } from "lucide-react";
import { LANG_META, LANG_PREF_KEY, LANGS, localePath, type Lang } from "@/lib/i18n";

function readPref(): Lang | null {
  try {
    const v = window.localStorage.getItem(LANG_PREF_KEY);
    return v === "id" || v === "en" ? v : null;
  } catch {
    return null;
  }
}

function savePref(lang: Lang) {
  try {
    window.localStorage.setItem(LANG_PREF_KEY, lang);
  } catch {
    /* storage blocked: the choice just isn't remembered */
  }
}

/** Indonesian for visitors whose browser lists Indonesian first, English for everyone else. */
function browserLang(): Lang {
  const first = (navigator.languages?.[0] ?? navigator.language ?? "").toLowerCase();
  return first.startsWith("id") ? "id" : "en";
}

/** "ID | EN" links in the header; clicking one remembers the choice. */
export function LanguageSwitch({ lang, path }: { lang: Lang; path: string }) {
  return (
    <div className="flex items-center rounded-full border border-border-subtle p-0.5 text-xs font-semibold" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <a
          key={l}
          href={localePath(path, l)}
          hrefLang={LANG_META[l].hreflang}
          lang={l}
          aria-current={l === lang ? "page" : undefined}
          title={LANG_META[l].label}
          onClick={() => savePref(l)}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            l === lang ? "bg-text-primary text-white" : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {LANG_META[l].short}
        </a>
      ))}
    </div>
  );
}

const SUGGEST = {
  id: { text: "Halaman ini tersedia dalam Bahasa Indonesia.", go: "Lihat versi Indonesia", stay: "Tetap di sini" },
  en: { text: "This page is also available in English.", go: "View in English", stay: "Stay here" },
} as const;

/**
 * Sends returning visitors to the language they picked before, and offers first-time visitors the version that
 * matches their browser language. Never redirects without a stored choice, so crawlers index both versions.
 */
export function LanguageSuggest({ lang, path }: { lang: Lang; path: string }) {
  const [suggest, setSuggest] = useState<Lang | null>(null);

  useEffect(() => {
    const pref = readPref();
    if (pref && pref !== lang) {
      window.location.replace(localePath(path, pref) + window.location.hash);
      return;
    }
    if (pref) return;
    const wanted = browserLang();
    if (wanted !== lang) setSuggest(wanted);
  }, [lang, path]);

  if (!suggest) return null;
  const t = SUGGEST[suggest];
  return (
    <div
      lang={suggest}
      role="dialog"
      aria-label={t.text}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-xl flex-col gap-3 rounded-2xl border border-border-subtle bg-surface-canvas/95 p-4 shadow-[0_20px_60px_rgba(19,37,72,0.18)] backdrop-blur-md sm:flex-row sm:items-center"
    >
      <Languages className="hidden h-5 w-5 shrink-0 text-primary sm:block" aria-hidden="true" />
      <p className="flex-1 text-sm text-text-primary">{t.text}</p>
      <div className="flex items-center gap-2">
        <a
          href={localePath(path, suggest)}
          hrefLang={LANG_META[suggest].hreflang}
          onClick={() => savePref(suggest)}
          className="inline-flex min-h-10 flex-1 items-center justify-center rounded-full bg-text-primary px-4 text-sm font-semibold text-white hover:bg-primary-container sm:flex-none"
        >
          {t.go}
        </a>
        <button
          type="button"
          onClick={() => {
            savePref(lang);
            setSuggest(null);
          }}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-text-secondary hover:text-text-primary"
        >
          <X className="h-4 w-4" aria-hidden="true" /> {t.stay}
        </button>
      </div>
    </div>
  );
}
