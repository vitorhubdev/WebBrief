import { useRef } from 'react';
import { Github, FileJson, Trash2, Upload, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useI18n } from '@/i18n/context';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface HeaderProps {
  onExport: () => void;
  onImport: (file: File) => Promise<void> | void;
  onClear: () => void;
}

export function Header({ onExport, onImport, onClear }: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useI18n();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      await onImport(file);
      toast.success(t('header.importSuccess'));
    } catch {
      toast.error(t('header.importError'));
    }
  };

  return (
    <header role="banner" className="w-full h-12 sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/70">
      <div className="container h-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <h1 className="text-[17px] font-semibold tracking-tight truncate">{t('brand.name')}</h1>
          <span className="hidden sm:inline text-[12px] text-muted-foreground">{t('header.kit')}</span>
        </div>

        <nav aria-label="Navegação e Ferramentas" className="flex items-center gap-1 shrink-0">
          <LanguageToggle />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json,application/json"
            className="hidden"
          />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="h-8 px-3 text-foreground"
            aria-label={t('header.importAria')}
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[13px]">{t('header.import')}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onExport();
              toast.success(t('header.exportSuccess'));
            }}
            className="h-8 px-3 text-foreground"
            aria-label={t('header.exportAria')}
          >
            <FileJson className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[13px]">{t('header.export')}</span>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8" aria-label={t('header.clearAria')}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-[28px] border-border">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-[21px] font-semibold">{t('header.resetTitle')}</AlertDialogTitle>
                <AlertDialogDescription className="text-[17px]">{t('header.resetDesc')}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-2">
                <AlertDialogCancel className="rounded-full">{t('common.cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={onClear} className="rounded-full bg-destructive text-white">
                  {t('common.clear')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label={resolvedTheme === 'dark' ? t('header.themeLight') : t('header.themeDark')}
          >
            {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          <Button variant="ghost" size="icon" asChild className="w-8 h-8">
            <a
              href="https://github.com/vitorhubdev/WebBrief"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('header.github')}
            >
              <Github className="w-4 h-4" />
              <span className="sr-only">{t('header.githubSr')}</span>
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
