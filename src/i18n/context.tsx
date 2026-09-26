import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { messages, type MessageTree } from './messages';
import { detectLocale, LOCALE_STORAGE_KEY, type Locale } from './types';

type InterpolateValues = Record<string, string | number>;

function getPath(tree: Record<string, unknown>, path: string): string | undefined {
  const parts = path.split('.');
  let cur: unknown = tree;
  for (const part of parts) {
    if (cur == null || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[part];
  }
  return typeof cur === 'string' ? cur : undefined;
}

function interpolate(template: string, values?: InterpolateValues): string {
  if (!values) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => String(values[key] ?? `{{${key}}}`));
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, values?: InterpolateValues) => string;
  m: MessageTree;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectLocale());

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(LOCALE_STORAGE_KEY, next);
    document.documentElement.lang = next === 'en' ? 'en' : 'pt-BR';
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'en' ? 'en' : 'pt-BR';
  }, [locale]);

  const m = messages[locale];

  const t = useCallback(
    (key: string, values?: InterpolateValues) => {
      const raw = getPath(m as Record<string, unknown>, key) ?? getPath(messages.pt as Record<string, unknown>, key);
      if (!raw) return key;
      return interpolate(raw, values);
    },
    [m],
  );

  const value = useMemo(() => ({ locale, setLocale, t, m }), [locale, setLocale, t, m]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
