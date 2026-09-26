
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
import { useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useI18n } from '@/i18n/context';
import { getPatternDisplay } from '@/i18n/options';

function App() {
  const { t, locale } = useI18n();
  const steps = useMemo(
    () => [
      { id: 1, title: t('steps.model') },
      { id: 2, title: t('steps.idea') },
      { id: 3, title: t('steps.adjustments') },
    ],
    [t],
  );

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
    agentKit,
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
    const display = getPatternDisplay(locale, pattern.id, { name: pattern.name, blurb: pattern.blurb });
    toast.success(t('generator.patternApplied', { name: display.name }));
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
      toast.error(t('generator.fillRequired'));
      return;
    }
    generatePrompt();
    setIsFullScreen(false);
    toast.success(t('generator.kitGenerated'));
  };

  const handleReset = () => {
    setIsFullScreen(false);
    resetForm();
  };

  const featureCards = [
    {
      icon: <Code2 className="w-5 h-5" />,
      title: t('features.skills.title'),
      desc: t('features.skills.desc'),
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: t('features.rhythms.title'),
      desc: t('features.rhythms.desc'),
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      title: t('features.harness.title'),
      desc: t('features.harness.desc'),
    },
  ];

  if (showResult) {
    return (
      <div className="min-h-screen bg-secondary">
        <Header onExport={exportConfig} onImport={importConfig} onClear={handleReset} />
        <main className="container py-16">
          <div className="max-w-3xl mx-auto">
            <Resultado
              prompt={generatedPrompt}
              kit={agentKit}
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
        {t('common.skipToContent')}
      </a>

      <Header onClear={clearSavedData} onExport={exportConfig} onImport={importConfig} />

      <main id="main-content" role="main" className="flex-1 w-full">
        <section id="hero" className="text-center px-5 pt-20 pb-16 sm:pt-28 sm:pb-20">
          <p className="text-[17px] font-medium text-primary mb-4">{t('hero.eyebrow')}</p>
          <h1 className="display text-[clamp(2.5rem,8vw,5rem)] text-balance max-w-4xl mx-auto">
            {t('hero.titleLine1')}
            <br />
            {t('hero.titleLine2')}
          </h1>
          <p className="mt-6 text-[17px] text-muted-foreground max-w-xl mx-auto leading-[1.47]">
            {t('hero.subtitle')}
          </p>
        </section>

        <section id="features" aria-label="Recursos principais" className="band py-20">
          <div className="container grid grid-cols-1 md:grid-cols-3 gap-5">
            {featureCards.map((feature) => (
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
          aria-label={t('generator.aria')}
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
                aria-label={isFullScreen ? t('header.fullscreenExit') : t('header.fullscreenEnter')}
              >
                {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </Button>
            </div>

            <div className="bg-card mx-3 mb-3 rounded-[22px] px-6 sm:px-10 py-10 min-h-[460px]">
              <div className="mb-8 space-y-2">
                <h2 className="text-[32px] sm:text-[40px] font-semibold leading-none">
                  {currentStep === 1 && t('generator.step1Title')}
                  {currentStep === 2 && t('generator.step2Title')}
                  {currentStep === 3 && t('generator.step3Title')}
                </h2>
                <p className="text-[17px] text-muted-foreground">
                  {currentStep === 1 && t('generator.step1Desc')}
                  {currentStep === 2 && t('generator.step2Desc')}
                  {currentStep === 3 && t('generator.step3Desc')}
                </p>
              </div>
              {renderStep()}
            </div>

            <div className="px-6 sm:px-8 py-3 text-[12px] text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
              <span>{promptStats.kitFiles} {t('common.files')}</span>
              <span>~{promptStats.kitTokens} {t('common.tokens')}</span>
              <details>
                <summary className="cursor-pointer text-primary">{t('common.draft')}</summary>
                <pre className="mt-2 max-h-48 overflow-auto rounded-2xl bg-card p-3 text-[11px] leading-relaxed whitespace-pre-wrap font-mono">
                  {promptStats.preview}
                </pre>
              </details>
            </div>

            <div className="px-6 sm:px-8 pb-6 flex items-center justify-between">
              <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 1} className="h-11 px-5">
                <ChevronLeft className="w-4 h-4" />
                {t('common.previous')}
              </Button>
              {currentStep === 3 ? (
                <Button onClick={handleGenerate} className="h-11 px-7">
                  {t('common.generateKit')}
                </Button>
              ) : (
                <Button onClick={handleNext} className="h-11 px-7" disabled={!getStepValidity(currentStep)}>
                  {t('common.continue')}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </section>

        <section id="tips" aria-label="Economia de tokens" className="band py-20">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-5">
            <article className="p-8 rounded-[28px] bg-card space-y-4">
              <h3 className="text-[24px] font-semibold">{t('tips.tokensTitle')}</h3>
              <p className="text-[17px] text-muted-foreground leading-relaxed">
                {t('tips.tokensIntro')}
              </p>
              <ul className="space-y-2 text-[15px]">
                {tokenTips(formData, locale).map((tip) => (
                  <li key={tip} className="text-foreground">
                    {tip}
                  </li>
                ))}
              </ul>
            </article>
            <article className="p-8 rounded-[28px] bg-card space-y-4">
              <h3 className="text-[24px] font-semibold">{t('tips.loopsTitle')}</h3>
              <p className="text-[17px] text-muted-foreground leading-relaxed">
                {t('tips.loopsBody')}
              </p>
              <h3 className="text-[24px] font-semibold">{t('tips.jevTitle')}</h3>
              <p className="text-[17px] text-muted-foreground leading-relaxed">
                {t('tips.jevBody')}
              </p>
              <p className="text-[14px] text-muted-foreground">{t('tips.footerNote')}</p>
            </article>
          </div>
        </section>
      </main>

      <footer role="contentinfo" className="w-full bg-secondary border-t border-border/60">
        <div className="container py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <span className="font-medium text-foreground">{t('brand.name')}</span>
            <span className="text-muted-foreground">
              <a href="https://vitorhub.com" className="hover:text-foreground" target="_blank" rel="noopener noreferrer">
                {t('brand.byVitorHub')}
              </a>
            </span>
          </div>
          <div className="flex gap-6">
            <a href="https://vitorhub.com" target="_blank" rel="noopener noreferrer">
              {t('footer.author')} · {t('footer.site')}
            </a>
            <a href="https://github.com/vitorhubdev/WebBrief" target="_blank" rel="noopener noreferrer">
              {t('footer.github')}
            </a>
          </div>
          <span>© {new Date().getFullYear()} {t('footer.mit')}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
