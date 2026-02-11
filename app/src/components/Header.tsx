import { useRef } from 'react';
import { Sparkles, Github, FileJson, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">PromptGen</h1>
            <p className="text-xs text-muted-foreground">Gerador Universal</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
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
            className="hidden sm:flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden md:inline">Importar</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onExport}
            className="hidden sm:flex items-center gap-2"
          >
            <FileJson className="w-4 h-4" />
            <span className="hidden md:inline">Exportar</span>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center gap-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden md:inline">Limpar</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Limpar todas as configurações?</AlertDialogTitle>
                <AlertDialogDescription>
                  Isso apagará todas as respostas do questionário. Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={onClear} className="bg-destructive text-destructive-foreground">
                  Limpar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <span className="sr-only">Sobre</span>
                <span className="text-sm font-medium">?</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Sobre o PromptGen</DialogTitle>
                <DialogDescription>
                  Gerador universal de prompts para qualquer tipo de aplicação
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  O <strong>PromptGen</strong> cria prompts técnicos completos para IAs gerarem 
                  código de qualidade. Suporta websites, apps mobile, CLI, GUI desktop, 
                  containers e APIs.
                </p>
                <div className="space-y-2">
                  <p className="font-medium text-foreground">Recursos:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>7 tipos de aplicação suportados</li>
                    <li>9 linguagens/stacks</li>
                    <li>Presets pré-configurados</li>
                    <li>Import/export de configurações</li>
                    <li>Salvamento automático</li>
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
