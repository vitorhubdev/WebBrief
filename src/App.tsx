
import { Header } from '@/components/Header';
import { StepIndicator } from '@/components/StepIndicator';
import { EasyStart } from '@/components/steps/EasyStart';
import { EasyStory } from '@/components/steps/EasyStory';
import { EasyExtras } from '@/components/steps/EasyExtras';

import { Resultado } from '@/components/Resultado';
import { usePromptGenerator } from '@/hooks/usePromptGenerator';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Code2, Layers, Cpu, Maximize2, Minimize2 } from 'lucide-react';
import type { ProductPattern } from '@/types';
import { tokenTips } from '@/lib/harnessGuide';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

const steps = [
  { id: 1, title: 'Modelo' },
  { id: 2, title: 'Ideia' },
  { id: 3, title: 'Ajustes' },
];

function App() {
  const {
    formData,
    generatedPrompt,
    showResult,
    currentStep,
    setCurrentStep,
    updateField,
    toggleArrayField,
    loadPattern,
    generatePrompt,
    resetForm,
    exportConfig,
    exportKitFile,
    exportKitAll,
    vibeKit,
    importConfig,
    clearSavedData,
    promptStats,
  } = usePromptGenerator();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const generatorRef = useRef<HTMLDivElement>(null);

  const scrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getStepValidity = (stepId: number) => {
    switch (stepId) {
      case 1:
        return !!formData.appType && !!formData.stack;
      case 2:
        return !!formData.projectName?.trim() && !!formData.pitch?.trim() && !!formData.mainAction?.trim();
      default:
        return true;
    }
  };

  const invalidSteps = steps
    .filter(step => !getStepValidity(step.id))
    .map(step => step.id);

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
    scrollToGenerator();
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      scrollToGenerator();
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      if (!getStepValidity(currentStep)) return;
      setCurrentStep(prev => prev + 1);
      scrollToGenerator();
    }
  };

  const handleLoadPattern = (pattern: ProductPattern) => {
    loadPattern(pattern);
    toast.success(`Modelo “${pattern.name}” aplicado`);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <EasyStart
            selectedType={formData.appType}
            selectedStack={formData.stack}
            patternId={formData.patternId}
            framework={formData.framework}
            onSelectType={(type) => updateField('appType', type)}
            onSelectStack={(stack) => updateField('stack', stack)}
            onLoadPattern={handleLoadPattern}
            onUpdateFramework={(value) => updateField('framework', value)}
          />
        );
      case 2:
        return (
          <EasyStory
            formData={formData}
            updateField={updateField}
          />
        );
      case 3:
        return (
          <EasyExtras
            formData={formData}
            updateField={updateField}
            toggleArrayField={toggleArrayField}
          />
        );
      default:
        return null;
    }
  };

  const handleGenerate = () => {
    if (invalidSteps.length > 0) {
      toast.error('Preencha os campos obrigatórios marcados em vermelho.');
      return;
    }
    generatePrompt();
    setIsFullScreen(false);
    toast.success('Kit gerado');
  };

  const handleReset = () => {
    setIsFullScreen(false);
    resetForm();
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-secondary">
        <Header onExport={exportConfig} onImport={importConfig} onClear={handleReset} />
        <main className="container py-16">
          <div className="max-w-3xl mx-auto">
            <Resultado
              prompt={generatedPrompt}
              kit={vibeKit}
              onReset={handleReset}
              onExportKitFile={exportKitFile}
              onExportKitAll={exportKitAll}
              formData={formData}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-full"
      >
        Pular para o conteúdo principal
      </a>

      <Header onClear={clearSavedData} onExport={exportConfig} onImport={importConfig} />

      <main id="main-content" role="main" className="flex-1 w-full">
        <section id="hero" className="text-center px-5 pt-20 pb-16 sm:pt-28 sm:pb-20">
          <p className="text-[17px] font-medium text-primary mb-4">Para quem nunca programou</p>
          <h1 className="display text-[clamp(2.5rem,8vw,5rem)] text-balance max-w-4xl mx-auto">
            Descreva a ideia.
            <br />
            O agente constrói.
          </h1>
          <p className="mt-6 text-[17px] text-muted-foreground max-w-xl mx-auto leading-[1.47]">
            Poucos minutos para travar o pronto. O agente gasta as horas. Você não reescreve o prompt no meio.
          </p>
        </section>

        <section id="features" aria-label="Recursos principais" className="band py-20">
          <div className="container grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Code2 className="w-5 h-5" />,
                title: 'Skills do caso',
                desc: 'Landing, loja, SaaS, blog, chat, app, API, CLI, desktop — SKILL.md adaptável.',
              },
              {
                icon: <Layers className="w-5 h-5" />,
                title: 'Três ritmos',
                desc: 'Vibe rápido, estruturado ou spec-driven. O mesmo formulário.',
              },
              {
                icon: <Cpu className="w-5 h-5" />,
                title: 'Harness e tokens',
                desc: 'Pi, Codex, Claude Code, Antigravity (/boost) e outros. Jev opcional só para decidir, não para escrever.',
              },
            ].map((feature) => (
              <article key={feature.title} className="p-7 rounded-[28px] bg-card">
                <div className="text-foreground mb-5">{feature.icon}</div>
                <h3 className="text-[21px] font-semibold leading-tight">{feature.title}</h3>
                <p className="text-[14px] text-muted-foreground mt-2 leading-relaxed">{feature.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="generator"
          ref={generatorRef}
          aria-label="Gerador de Prompt"
          className={`container py-20 scroll-mt-16 ${isFullScreen ? 'fixed inset-0 z-[100] max-w-none bg-background overflow-y-auto py-6' : ''}`}
        >
          <div className={`mx-auto max-w-3xl rounded-[28px] bg-secondary overflow-hidden ${isFullScreen ? 'min-h-full' : ''}`}>
            <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
              <div className="flex-1">
                <StepIndicator
                  steps={steps}
                  currentStep={currentStep}
                  onStepClick={handleStepClick}
                  invalidSteps={invalidSteps}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="text-muted-foreground"
                aria-label={isFullScreen ? 'Sair da tela cheia' : 'Modo concentração'}
              >
                {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </Button>
            </div>

            <div className="bg-card mx-3 mb-3 rounded-[22px] px-6 sm:px-10 py-10 min-h-[460px]">
              <div className="mb-8 space-y-2">
                <h2 className="text-[32px] sm:text-[40px] font-semibold leading-none">
                  {currentStep === 1 && 'Escolha um modelo'}
                  {currentStep === 2 && 'Conte a ideia'}
                  {currentStep === 3 && 'Harness e ajustes'}
                </h2>
                <p className="text-[17px] text-muted-foreground">
                  {currentStep === 1 && 'Toque num cartão. As etiquetas são as skills do zip.'}
                  {currentStep === 2 && 'Nome, o que faz, quem usa, o que a pessoa clica.'}
                  {currentStep === 3 && 'Escolha onde o kit vai rodar. O resto pode ficar no padrão.'}
                </p>
              </div>
              {renderStep()}
            </div>

            <div className="px-6 sm:px-8 py-3 text-[12px] text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
              <span>{promptStats.kitFiles} arquivos</span>
              <span>~{promptStats.kitTokens} tokens</span>
              <details>
                <summary className="cursor-pointer text-primary">Rascunho</summary>
                <pre className="mt-2 max-h-48 overflow-auto rounded-2xl bg-card p-3 text-[11px] leading-relaxed whitespace-pre-wrap font-mono">
                  {promptStats.preview}
                </pre>
              </details>
            </div>

            <div className="px-6 sm:px-8 pb-6 flex items-center justify-between">
              <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 1} className="h-11 px-5">
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </Button>
              {currentStep === 3 ? (
                <Button onClick={handleGenerate} className="h-11 px-7">
                  Gerar kit
                </Button>
              ) : (
                <Button onClick={handleNext} className="h-11 px-7" disabled={!getStepValidity(currentStep)}>
                  Continuar
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </section>

        <section id="tips" aria-label="Economia de tokens" className="band py-20">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-5">
            <article className="p-8 rounded-[28px] bg-card space-y-4">
              <h3 className="text-[24px] font-semibold">Economia de tokens</h3>
              <p className="text-[17px] text-muted-foreground leading-relaxed">
                O modelo escreve. O harness decide o que entra no contexto. Estas dicas seguem o harness marcado no passo 3.
              </p>
              <ul className="space-y-2 text-[15px]">
                {tokenTips(formData).map((tip) => (
                  <li key={tip} className="text-foreground">
                    {tip}
                  </li>
                ))}
              </ul>
            </article>
            <article className="p-8 rounded-[28px] bg-card space-y-4">
              <h3 className="text-[24px] font-semibold">Ralph ou Gauntlet</h3>
              <p className="text-[17px] text-muted-foreground leading-relaxed">
                Ralph repete o mesmo pedido até o teste passar. Gauntlet põe um crítico de contexto limpo contra uma barra com nome — a página da Linear, a CLI jq — e só para quando a nossa ganha, ou quando você manda parar.
              </p>
              <h3 className="text-[24px] font-semibold">Jev não é o agente</h3>
              <p className="text-[17px] text-muted-foreground leading-relaxed">
                Jev classifica: qual skill abrir, qual ferramenta cabe, se vale o modelo caro. O código sai do Pi, do Codex, do Claude Code ou de quem você escolheu.
              </p>
              <p className="text-[14px] text-muted-foreground">ECONOMIA.md entra no zip · skills sob demanda · uma tarefa por contexto</p>
            </article>
          </div>
        </section>
      </main>

      <footer role="contentinfo" className="w-full bg-secondary border-t border-border/60">
        <div className="container py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-muted-foreground">
          <span className="font-medium text-foreground">PromptGen</span>
          <div className="flex gap-6">
            <a href="#">Termos</a>
            <a href="#">Privacidade</a>
            <a href="https://github.com/vitorhubdev" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
          <span>© {new Date().getFullYear()} MIT</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
