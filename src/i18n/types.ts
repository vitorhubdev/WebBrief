export type Locale = 'pt' | 'en';

export const LOCALE_STORAGE_KEY = 'webbrief-locale';

export function detectLocale(): Locale {
  const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (saved === 'pt' || saved === 'en') return saved;
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('en')) return 'en';
  return 'pt';
}
