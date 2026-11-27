/**
 * Product pages exist in two languages: Indonesian at the root (/office) and English under /en (/en/office).
 * Everything that differs per language (paths, hreflang, Open Graph locale) is derived here, so adding a page
 * only needs its Indonesian path.
 */

export type Lang = "id" | "en";

export const LANGS: Lang[] = ["id", "en"];

/** hreflang code, Open Graph locale and display name per language. */
export const LANG_META: Record<Lang, { hreflang: string; ogLocale: string; label: string; short: string }> = {
  id: { hreflang: "id-ID", ogLocale: "id_ID", label: "Bahasa Indonesia", short: "ID" },
  en: { hreflang: "en", ogLocale: "en_US", label: "English", short: "EN" },
};

/** Language served to visitors whose language matches neither version. */
export const DEFAULT_LANG: Lang = "en";

/** "/office" → "/en/office" for English; Indonesian stays at the root. */
export function localePath(path: string, lang: Lang) {
  if (lang === "id") return path;
  return path === "/" || path === "" ? "/en" : `/en${path}`;
}

/** hreflang map for a page that exists in every language, including x-default. */
export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(LANGS.map((l) => [LANG_META[l].hreflang, localePath(path, l)])),
    "x-default": localePath(path, DEFAULT_LANG),
  };
}

/** Cookie/localStorage key that remembers a language the visitor picked themselves. */
export const LANG_PREF_KEY = "depup-lang";
