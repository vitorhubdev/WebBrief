import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Check, Copy, RotateCcw, Download, Sparkles, FileJson, Zap, HelpCircle, FileCode, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { generateTOON, generateXML } from '@/hooks/usePromptGenerator';
import type { FormData } from '@/types';
import { useMemo } from 'react';

interface ResultadoProps {
  prompt: string;
  onReset: () => void;
  onExport: () => void; // This will be JSON
  onExportToon: () => void;
  onExportXml: () => void;
  formData: FormData;
}

export function Resultado({ prompt, onReset, onExport, onExportToon, onExportXml, formData }: ResultadoProps) {
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

  const stats = useMemo(() => {
    const md = prompt;
    const json = JSON.stringify(formData, null, 2);
    const toon = generateTOON(formData);
    const xml = generateXML(formData);

    const calc = (text: string) => ({
      tokens: Math.ceil(text.length / 4),
      chars: text.length
    });

    const mdStats = calc(md);
    const jsonStats = calc(json);
    const toonStats = calc(toon);
    const xmlStats = calc(xml);

    return [
      { name: 'Markdown (Visual)', stats: mdStats, diff: 0, color: 'text-primary' },
      { name: 'TOON (Otimizado)', stats: toonStats, diff: toonStats.tokens - mdStats.tokens, color: 'text-emerald-500' },
      { name: 'XML (Estruturado)', stats: xmlStats, diff: xmlStats.tokens - mdStats.tokens, color: 'text-amber-500' },
      { name: 'JSON (Config)', stats: jsonStats, diff: jsonStats.tokens - mdStats.tokens, color: 'text-blue-500' },
    ];
  }, [prompt, formData]);

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
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="glass-card rounded-[2.5rem] overflow-hidden border-primary/10">
        <header className="p-8 sm:p-10 bg-primary/5 border-b border-primary/10">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20 animate-float">
              <Sparkles className="w-8 h-8 text-primary-foreground fill-white/20" />
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight">Prompt Gerado!</h2>
              <p className="text-muted-foreground font-medium">
                Sua arquitetura está pronta para ser entregue à IA.
              </p>
            </div>
          </div>
        </header>

        <div className="p-8 sm:p-10 space-y-8">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-indigo-500/10 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-500" />
            <Textarea
              value={prompt}
              readOnly
              className="relative min-h-[450px] font-mono text-sm bg-muted/30 border-primary/5 rounded-2xl p-6 resize-none focus-visible:ring-primary/20 leading-relaxed overflow-y-auto break-words whitespace-pre-wrap scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent"
              aria-label="Conteúdo do prompt gerado"
            />

            {/* Stats Bar */}
            <div className="absolute bottom-4 right-6 flex items-center gap-4 px-4 py-2 rounded-xl bg-background/80 backdrop-blur-md border border-primary/5 shadow-sm animate-in fade-in zoom-in duration-500">
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-tighter font-black text-muted-foreground/60">Tokens ~</span>
                <span className="text-xs font-bold text-primary">{Math.ceil(prompt.length / 4)}</span>
              </div>
              <div className="w-px h-6 bg-primary/10" />
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-tighter font-black text-muted-foreground/60">Caracteres</span>
                <span className="text-xs font-bold text-primary">{prompt.length}</span>
              </div>
              <div className="w-px h-6 bg-primary/10" />
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-tighter font-black text-muted-foreground/60">Linhas</span>
                <span className="text-xs font-bold text-primary">{prompt.split('\n').length}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <Button
              onClick={handleCopy}
              className={`h-14 px-8 rounded-2xl transition-all duration-300 font-bold gap-3 shadow-xl ${copied
                ? 'bg-emerald-500 hover:bg-emerald-600 scale-105 shadow-emerald-500/20'
                : 'bg-primary hover:bg-primary/90 shadow-primary/20 hover:scale-105'
                }`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 stroke-[3px]" />
                  <span>Copiado com sucesso!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Copiar Prompt</span>
                </>
              )}
            </Button>

            <div className="flex gap-3">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="h-14 px-6 rounded-2xl border-primary/10 hover:bg-primary/5 hover:border-primary/20 font-bold gap-2 group"
                aria-label="Baixar prompt em formato markdown"
              >
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                <span className="hidden sm:inline">Baixar .md</span>
              </Button>

              <Button
                onClick={onExportToon}
                variant="outline"
                className="h-14 px-6 rounded-2xl border-primary/10 hover:bg-primary/5 hover:border-primary/20 font-bold gap-2 group"
                title="Exportar no formato estruturado TOON (Token-Efficient)"
              >
                <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Exportar TOON</span>
              </Button>

              <Button
                onClick={onExport}
                variant="outline"
                className="h-14 px-6 rounded-2xl border-primary/10 hover:bg-primary/5 hover:border-primary/20 font-bold gap-2 group"
                aria-label="Exportar configurações em JSON"
              >
                <FileJson className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">JSON</span>
              </Button>

              <Button
                onClick={onExportXml}
                variant="outline"
                className="h-14 px-6 rounded-2xl border-primary/10 hover:bg-primary/5 hover:border-primary/20 font-bold gap-2 group"
                title="Exportar no formato estruturado XML"
              >
                <FileCode className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">XML</span>
              </Button>

              <Button
                onClick={onReset}
                variant="ghost"
                className="h-14 px-6 rounded-2xl text-muted-foreground hover:text-primary hover:bg-primary/5 font-bold gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Novo</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="glass-card rounded-[2.5rem] overflow-hidden border-primary/10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <header className="px-8 py-6 bg-primary/5 border-b border-primary/5">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Comparativo de Eficiência (Tokens)
          </h3>
          <p className="text-xs text-muted-foreground">Compare qual formato consome menos recursos da sua IA.</p>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-primary/5 bg-muted/20">
                <th className="px-8 py-4 font-bold">Formato</th>
                <th className="px-8 py-4 font-bold">Tokens Est.</th>
                <th className="px-8 py-4 font-bold">Diferença</th>
                <th className="px-8 py-4 font-bold">Uso Recomendado</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((row, i) => (
                <tr key={i} className="border-b border-primary/5 hover:bg-primary/5 transition-colors">
                  <td className={`px-8 py-4 font-bold ${row.color}`}>{row.name}</td>
                  <td className="px-8 py-4 font-mono">{row.stats.tokens}</td>
                  <td className="px-8 py-4 font-mono font-bold">
                    {row.diff === 0 ? (
                      <span className="text-muted-foreground">-</span>
                    ) : row.diff < 0 ? (
                      <span className="text-emerald-500 flex items-center gap-1">
                        <ArrowDownRight className="w-3 h-3" /> {row.diff}
                      </span>
                    ) : (
                      <span className="text-destructive flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> +{row.diff}
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-4 text-xs text-muted-foreground">
                    {row.name.includes('Markdown') && 'Melhor para leitura humana e edição.'}
                    {row.name.includes('TOON') && 'Máxima economia de tokens (IA-First).'}
                    {row.name.includes('XML') && 'Melhor para organização de dados complexos.'}
                    {row.name.includes('JSON') && 'Ideal para salvar configurações no app.'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article className="p-8 rounded-[2rem] glass border-primary/5 space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            Próximos Passos
          </h3>
          <ol className="space-y-3 list-none">
            {[
              { text: "Copie o prompt acima", icon: "1" },
              { text: "Abra o ChatGPT, Claude ou Gemini", icon: "2" },
              { text: "Cole e envie para processamento", icon: "3" },
              { text: "Refine conforme as sugestões da IA", icon: "4" }
            ].map((step, i) => (
              <li key={i} className="flex items-center gap-4 text-muted-foreground text-sm font-medium">
                <span className="w-6 h-6 rounded-lg bg-background flex items-center justify-center text-[10px] font-black border border-primary/10 text-primary">
                  {step.icon}
                </span>
                {step.text}
              </li>
            ))}
          </ol>
        </article>

        <article className="p-8 rounded-[2rem] bg-amber-500/5 border border-amber-500/10 space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2 text-amber-900 dark:text-amber-200">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            Dica Importante
          </h3>
          <p className="text-sm text-amber-800/80 dark:text-amber-200/60 leading-relaxed font-medium">
            O prompt gerado inclui uma estrutura em camadas que prioriza a
            <strong className="text-amber-900 dark:text-amber-100"> manutenibilidade e escalabilidade</strong>.
            Se a IA tentar simplificar demais, peça para ela manter a arquitetura planejada original.
          </p>
        </article>
      </div>
    </section>
  );
}
