import { useRef } from 'react';
import { Sparkles, Github, FileJson, Trash2, Upload } from 'lucide-react';
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
  onImport: (file: File) => void;
  onClear: () => void;
}

export function Header({ onExport, onImport, onClear }: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };

  return (
    <header role="banner" className="w-full h-16 glass border-b border-primary/10 sticky top-0 z-50 transform-gpu">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl leading-none tracking-tight">PromptGen</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mt-1">Universal v2.0</p>
          </div>
        </div>

        <nav aria-label="Navegação e Ferramentas" className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json,application/json"
            className="hidden"
          />

          <div className="hidden sm:flex items-center gap-1 bg-muted/40 p-1 rounded-xl">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="h-8 px-3 rounded-lg hover:bg-background gap-2"
              aria-label="Importar configurações"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">Importar</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onExport}
              className="h-8 px-3 rounded-lg hover:bg-background gap-2"
              aria-label="Exportar configurações"
            >
              <FileJson className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">Exportar</span>
            </Button>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 rounded-xl text-destructive hover:bg-destructive/10"
                aria-label="Limpar dados"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-3xl glass-card">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl font-bold">Reiniciar formulário?</AlertDialogTitle>
                <AlertDialogDescription className="text-base">
                  Isso apagará todas as respostas atuais. Esta ação é irreversível.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel className="rounded-xl border-none hover:bg-muted">Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={onClear} className="bg-destructive text-white rounded-xl hover:bg-destructive/90 transition-colors">
                  Confirmar Limpeza
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button variant="outline" size="icon" asChild className="w-9 h-9 rounded-xl border-primary/10 hover:bg-primary/5">
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
