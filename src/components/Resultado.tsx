import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Check, Copy, RotateCcw, Download, FolderDown } from 'lucide-react';
import type { FormData } from '@/types';
import { harnessLabel, tokenTips } from '@/lib/harnessGuide';
import { loopLabel } from '@/lib/loopKit';
import type { KitFile } from '@/lib/agentKit';
import { toast } from 'sonner';
import { useI18n } from '@/i18n/context';
import { workflowModeShortLabel } from '@/i18n/options';

interface ResultadoProps {
  prompt: string;
  kit: KitFile[];
  onReset: () => void;
  onExportKitFile: (file: KitFile) => void;
  onExportKitAll: () => void | Promise<void>;
  formData: FormData;
}

export function Resultado({ prompt, kit, onReset, onExportKitFile, onExportKitAll, formData }: ResultadoProps) {
  const { locale, t } = useI18n();
  const [copied, setCopied] = useState(false);
  const [zipping, setZipping] = useState(false);
  const [activeId, setActiveId] = useState(kit[0]?.id || 'howto');
  const active = kit.find((f) => f.id === activeId) || kit[0];
  const text = active?.content || prompt;

  const mode = workflowModeShortLabel(locale, formData.workflowMode || 'structured');
  const harness = harnessLabel(formData.promptTarget, locale);
  const jev = formData.useJev ? t('resultado.jevSuffix') : '';
  const loop =
    formData.loopMode === 'ralph' || formData.loopMode === 'gauntlet'
      ? ` · ${loopLabel(formData.loopMode)}`
      : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(t('resultado.copySuccess', { path: active?.path || 'file' }));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t('resultado.copyError'));
    }
  };

  const groupLabels = {
    contract: t('resultado.groupContract'),
    skills: t('resultado.groupSkills'),
    spec: t('resultado.groupSpec'),
  };

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="rounded-[28px] bg-card overflow-hidden">
        <header className="p-8 sm:p-10">
          <div className="space-y-2">
              <h2 className="text-[32px] sm:text-[40px] font-semibold leading-none">{t('resultado.title')}</h2>
              <p className="text-muted-foreground font-medium">
                {t('resultado.previewMeta', {
                  count: kit.length,
                  mode,
                  harness,
                  jev,
                  loop,
                })}
              </p>
          </div>
        </header>

        <div className="p-6 sm:p-10 space-y-6">
          {(
            [
              { key: 'contract' as const, files: kit.filter(
                      (f) =>
                        !f.path.includes('skills/') &&
                        f.id !== 'antislop' &&
                        !['spec', 'tasks', 'constitution', 'plan'].includes(f.id),
                    ) },
              { key: 'skills' as const, files: kit.filter((f) => f.path.includes('skills/') || f.id === 'antislop') },
              { key: 'spec' as const, files: kit.filter((f) => ['spec', 'tasks', 'constitution', 'plan'].includes(f.id)) },
            ] as const
          ).map(({ key, files }) => {
            if (!files.length) return null;
            return (
              <div key={key} className="space-y-2">
                <p className="text-[13px] text-muted-foreground">{groupLabels[key]}</p>
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
            aria-label={t('resultado.fileAria')}
          />

          <div className="flex flex-wrap items-center gap-3">
            <Button
              className="h-11 px-6"
              disabled={zipping}
              onClick={async () => {
                setZipping(true);
                try {
                  await onExportKitAll();
                  toast.success(t('resultado.zipSuccess'));
                } catch {
                  toast.error(t('resultado.zipError'));
                } finally {
                  setZipping(false);
                }
              }}
            >
              <FolderDown className="w-5 h-5" />
              {zipping ? t('resultado.zipping') : t('resultado.zipButton')}
            </Button>
            <Button
              onClick={handleCopy}
              variant="outline"
              className={`h-11 px-6 ${copied ? 'bg-foreground text-background' : ''}`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {t('resultado.copyFile')}
            </Button>
            <Button
              variant="outline"
              className="h-11 px-6"
              onClick={() => active && onExportKitFile(active)}
            >
              <Download className="w-5 h-5" />
              {t('resultado.downloadOne')}
            </Button>
            <Button variant="ghost" className="h-11 px-6" onClick={onReset}>
              <RotateCcw className="w-5 h-5" />
              {t('resultado.newBrief')}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article className="p-8 rounded-[28px] bg-card space-y-4">
          <h3 className="text-[21px] font-semibold">{t('resultado.howToTitle')}</h3>
          <ol className="space-y-3 list-none text-sm text-muted-foreground font-medium">
            <li>{t('resultado.howTo1')}</li>
            <li>{t('resultado.howTo2')}</li>
            <li>{t('resultado.howTo3')}</li>
            <li>{t('resultado.howTo4')}</li>
          </ol>
        </article>
        <article className="p-8 rounded-[28px] bg-card space-y-4">
          <h3 className="text-[21px] font-semibold">{t('resultado.economyTitle')}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {tokenTips(formData, locale).map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </article>
        <article className="p-8 rounded-[28px] bg-card space-y-4 md:col-span-2">
          <h3 className="text-[21px] font-semibold">{t('resultado.whyKitTitle')}</h3>
          <p className="text-[15px] text-muted-foreground leading-relaxed">
            {t('resultado.whyKitBody')}
          </p>
        </article>
      </div>
    </section>
  );
}
