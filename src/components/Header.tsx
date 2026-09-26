import { useRef } from 'react';
import { Github, FileJson, Trash2, Upload, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      await onImport(file);
      toast.success('Configuração importada');
    } catch {
      toast.error('JSON inválido. Nada foi alterado.');
    }
  };

  return (
    <header role="banner" className="w-full h-12 sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/70">
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-[17px] font-semibold tracking-tight">PromptGen</h1>
          <span className="hidden sm:inline text-[12px] text-muted-foreground">Kit</span>
        </div>

        <nav aria-label="Navegação e Ferramentas" className="flex items-center gap-1">
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
            aria-label="Importar configurações"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[13px]">Importar</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onExport();
              toast.success('JSON baixado');
            }}
            className="h-8 px-3 text-foreground"
            aria-label="Exportar configurações"
          >
            <FileJson className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[13px]">Exportar</span>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8" aria-label="Limpar dados">
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-[28px] border-border">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-[21px] font-semibold">Reiniciar?</AlertDialogTitle>
                <AlertDialogDescription className="text-[17px]">
                  Isso apaga as respostas atuais.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-2">
                <AlertDialogCancel className="rounded-full">Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={onClear} className="rounded-full bg-destructive text-white">
                  Limpar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label={resolvedTheme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          >
            {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          <Button variant="ghost" size="icon" asChild className="w-8 h-8">
            <a href="https://github.com/vitorhubdev" target="_blank" rel="noopener noreferrer" aria-label="Ver perfil no GitHub">
              <Github className="w-4 h-4" />
              <span className="sr-only">GitHub do desenvolvedor (abre em nova janela)</span>
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
