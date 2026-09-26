import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Check, Copy, RotateCcw, Download, FolderDown } from 'lucide-react';
import type { FormData } from '@/types';
import { harnessLabel, tokenTips } from '@/lib/harnessGuide';
import { loopLabel } from '@/lib/loopKit';
import type { KitFile } from '@/lib/vibeKit';
import { toast } from 'sonner';

interface ResultadoProps {
  prompt: string;
  kit: KitFile[];
  onReset: () => void;
  onExportKitFile: (file: KitFile) => void;
  onExportKitAll: () => void | Promise<void>;
  formData: FormData;
}

export function Resultado({ prompt, kit, onReset, onExportKitFile, onExportKitAll, formData }: ResultadoProps) {
  const [copied, setCopied] = useState(false);
  const [zipping, setZipping] = useState(false);
  const [activeId, setActiveId] = useState(kit[0]?.id || 'howto');
  const active = kit.find((f) => f.id === activeId) || kit[0];
  const text = active?.content || prompt;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(`${active?.path || 'Arquivo'} copiado`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Não foi possível copiar');
    }
  };

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="rounded-[28px] bg-card overflow-hidden">
        <header className="p-8 sm:p-10">
          <div className="space-y-2">
              <h2 className="text-[32px] sm:text-[40px] font-semibold leading-none">Kit pronto</h2>
              <p className="text-muted-foreground font-medium">
                {kit.length} arquivos no preview · zip com prompt, skills e regras do esquema{' '}
                {formData.workflowMode === 'vibe' ? 'vibe' : formData.workflowMode === 'spec' ? 'spec-driven' : 'estruturado'}
                {' · '}
                {harnessLabel(formData.promptTarget)}
                {formData.useJev ? ' · Jev só para decisão' : ''}
                {formData.loopMode === 'ralph' || formData.loopMode === 'gauntlet'
                  ? ` · ${loopLabel(formData.loopMode)}`
                  : ''}
              </p>
          </div>
        </header>

        <div className="p-6 sm:p-10 space-y-6">
          {(['Contrato', 'Skills', 'Spec'] as const).map((group) => {
            const files =
              group === 'Skills'
                ? kit.filter((f) => f.path.includes('skills/') || f.id === 'antislop')
                : group === 'Spec'
                  ? kit.filter((f) => ['spec', 'tasks', 'constitution', 'plan'].includes(f.id))
                  : kit.filter(
                      (f) =>
                        !f.path.includes('skills/') &&
                        f.id !== 'antislop' &&
                        !['spec', 'tasks', 'constitution', 'plan'].includes(f.id),
                    );
            if (!files.length) return null;
            return (
              <div key={group} className="space-y-2">
                <p className="text-[13px] text-muted-foreground">{group}</p>
                <div className="flex flex-wrap gap-2">
                  {files.map((file) => (
                    <Button
                      key={file.id}
                      type="button"
                      variant={file.id === active?.id ? 'default' : 'outline'}
                      size="sm"
                      className=""
                      onClick={() => setActiveId(file.id)}
                    >
                      {file.label}
                    </Button>
                  ))}
                </div>
              </div>
            );
          })}

          {active && (
            <p className="text-sm text-muted-foreground">
              <span className="font-mono text-foreground">{active.path}</span>
              {' — '}
              {active.description}
            </p>
          )}

          <Textarea
            value={text}
            readOnly
            className="min-h-[420px] font-mono text-sm bg-secondary border-0 rounded-[20px] p-6 resize-none leading-relaxed"
            aria-label={active?.path || 'Arquivo do kit'}
          />

          <div className="flex flex-wrap items-center gap-3">
            <Button
              className="h-11 px-6"
              disabled={zipping}
              onClick={async () => {
                setZipping(true);
                try {
                  await onExportKitAll();
                  toast.success('Kit .zip baixado — descompacte na pasta do projeto');
                } catch {
                  toast.error('Não foi possível gerar o zip');
                } finally {
                  setZipping(false);
                }
              }}
            >
              <FolderDown className="w-5 h-5" />
              {zipping ? 'Montando zip…' : 'Baixar kit .zip'}
            </Button>
            <Button
              onClick={handleCopy}
              variant="outline"
              className={`h-11 px-6 ${copied ? 'bg-foreground text-background' : ''}`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              Copiar arquivo
            </Button>
            <Button
              variant="outline"
              className="h-11 px-6"
              onClick={() => active && onExportKitFile(active)}
            >
              <Download className="w-5 h-5" />
              Baixar este
            </Button>
            <Button variant="ghost" className="h-11 px-6" onClick={onReset}>
              <RotateCcw className="w-5 h-5" />
              Novo
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article className="p-8 rounded-[28px] bg-card space-y-4">
          <h3 className="text-[21px] font-semibold">Como usar hoje</h3>
          <ol className="space-y-3 list-none text-sm text-muted-foreground font-medium">
            <li>1. Crie a pasta do repo e <span className="text-foreground">descompacte o .zip</span> nela (pastas inclusive).</li>
            <li>2. Abra a pasta no agente que você já usa (chat ou IDE).</li>
            <li>3. Cole o <span className="text-foreground">Kickoff</span> como primeira mensagem.</li>
            <li>4. No modo spec, não peça código até o plano estar claro.</li>
          </ol>
        </article>
        <article className="p-8 rounded-[28px] bg-card space-y-4">
          <h3 className="text-[21px] font-semibold">Economia neste kit</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {tokenTips(formData).map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </article>
        <article className="p-8 rounded-[28px] bg-card space-y-4 md:col-span-2">
          <h3 className="text-[21px] font-semibold">Por que um kit</h3>
          <p className="text-[15px] text-muted-foreground leading-relaxed">
            Agentes leem arquivos do repo. Um Markdown gigante no chat some no contexto.
            AGENTS.md é o contrato portátil. ANTI-SLOP e skills valem em qualquer ferramenta.
            SPEC/TASKS evitam o agente inventar requisito.
          </p>
        </article>
      </div>
    </section>
  );
}
