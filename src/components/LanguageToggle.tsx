import { useI18n } from '@/i18n/context';
import type { Locale } from '@/i18n/types';
import { Button } from '@/components/ui/button';

export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();

  const next = (value: Locale) => {
    setLocale(value);
  };

  return (
    <div
      className="flex items-center rounded-full border border-border/80 p-0.5 text-[12px]"
      role="group"
      aria-label={t('lang.toggle')}
    >
      {(['pt', 'en'] as Locale[]).map((code) => (
        <Button
          key={code}
          type="button"
          variant={locale === code ? 'secondary' : 'ghost'}
          size="sm"
          className="h-7 px-2.5 rounded-full font-medium"
          onClick={() => next(code)}
          aria-pressed={locale === code}
        >
          {code === 'pt' ? t('lang.pt') : t('lang.en')}
        </Button>
      ))}
    </div>
  );
}
