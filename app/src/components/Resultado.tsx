import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Check, Copy, RotateCcw, Download, Sparkles, FileJson } from 'lucide-react';

interface ResultadoProps {
  prompt: string;
  onReset: () => void;
  onExport: () => void;
}

export function Resultado({ prompt, onReset, onExport }: ResultadoProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([prompt], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl">Prompt Gerado!</CardTitle>
              <CardDescription>
                Copie e cole em qualquer IA (ChatGPT, Claude, Gemini...)
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="relative">
            <Textarea
              value={prompt}
              readOnly
              className="min-h-[400px] font-mono text-sm bg-muted/50 resize-none"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleCopy}
              className="flex items-center gap-2"
              variant={copied ? "default" : "default"}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar Prompt
                </>
              )}
            </Button>
            
            <Button
              onClick={handleDownload}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Baixar .md
            </Button>

            <Button
              onClick={onExport}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FileJson className="w-4 h-4" />
              Exportar Config
            </Button>
            
            <Button
              onClick={onReset}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Novo
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Como usar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
            <li><span className="text-foreground">Copie o prompt</span> acima</li>
            <li><span className="text-foreground">Abra sua IA preferida</span> (ChatGPT, Claude, etc.)</li>
            <li><span className="text-foreground">Cole e envie</span> o prompt</li>
            <li><span className="text-foreground">Aguarde</span> a geração do código</li>
          </ol>
          
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mt-4">
            <p className="text-sm text-amber-800">
              <strong>Dica:</strong> Quanto mais detalhadas suas respostas, mais assertivo será o resultado. 
              O prompt inclui todas as regras técnicas para um projeto profissional.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
