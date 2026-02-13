
import { Header } from '@/components/Header';
import { StepIndicator } from '@/components/StepIndicator';
import { TypeSelection } from '@/components/steps/TypeSelection';
import { BasicInfo } from '@/components/steps/BasicInfo';
import { TechnicalRequirements } from '@/components/steps/TechnicalRequirements';
import { SecurityLegal } from '@/components/steps/SecurityLegal';
import { Deliverables } from '@/components/steps/Deliverables';
import { SpecificModule } from '@/components/steps/SpecificModule';
import { Resultado } from '@/components/Resultado';
import { usePromptGenerator } from '@/hooks/usePromptGenerator';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Zap, Code2, Layers, Cpu, HelpCircle, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import type { Preset } from '@/types';
import { useRef, useState } from 'react';

const steps = [
  { id: 1, title: 'Tipo' },
  { id: 2, title: 'Identidade' },
  { id: 3, title: 'Técnico' },
  { id: 4, title: 'Segurança' },
  { id: 5, title: 'Entregáveis' },
  { id: 6, title: 'Específico' },
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
    loadPreset,
    generatePrompt,
    resetForm,
    exportConfig,
    exportTOON,
    exportXML,
    importConfig,
    clearSavedData,
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
        return !!formData.projectName?.trim();
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

  const handleLoadPreset = (preset: Preset) => {
    loadPreset(preset);
    if (currentStep === 1) {
      setCurrentStep(2);
      scrollToGenerator();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TypeSelection
            selectedType={formData.appType}
            selectedStack={formData.stack}
            onSelectType={(type) => updateField('appType', type)}
            onSelectStack={(stack) => updateField('stack', stack)}
            onLoadPreset={handleLoadPreset}
          />
        );
      case 2:
        return (
          <BasicInfo
            formData={formData}
            updateField={updateField}
            toggleArrayField={toggleArrayField}
          />
        );
      case 3:
        return (
          <TechnicalRequirements
            formData={formData}
            updateField={updateField}
          />
        );
      case 4:
        return (
          <SecurityLegal
            formData={formData}
            updateField={updateField}
            toggleArrayField={toggleArrayField}
          />
        );
      case 5:
        return (
          <Deliverables
            formData={formData}
            updateField={updateField}
            toggleArrayField={toggleArrayField}
          />
        );
      case 6:
        return (
          <SpecificModule
            appType={formData.appType}
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
      alert("Por favor, preencha todos os campos obrigatórios marcados em vermelho antes de gerar o prompt.");
      return;
    }
    generatePrompt();
    setIsFullScreen(false); // Reset focus mode on result
    setCurrentStep(7); // Move to the result step
  };

  const handleReset = () => {
    setIsFullScreen(false);
    resetForm();
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
        <Header onExport={exportConfig} onImport={importConfig} onClear={handleReset} />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto animate-in fade-in zoom-in duration-500">
            <Resultado
              prompt={generatedPrompt}
              onReset={handleReset}
              onExport={exportConfig}
              onExportToon={exportTOON}
              onExportXml={exportXML}
              formData={formData}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 flex flex-col items-center overflow-x-hidden">
      {/* Skip Link para Acessibilidade */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none"
      >
        Pular para o conteúdo principal
      </a>

      <Header onClear={clearSavedData} onExport={exportConfig} onImport={importConfig} />

      <main id="main-content" role="main" className="flex-1 w-full flex flex-col items-center">
        <div className="container px-4 py-8 sm:py-12 lg:py-20 space-y-16 sm:space-y-24 max-w-7xl mx-auto">
          {/* Hero Section */}
          <section id="hero" className="text-center space-y-8 animate-in fade-in slide-in-from-top-10 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-float">
              <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
              <span>Prompt Engineering 2026</span>
            </div>

            <div className="space-y-4 px-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.1]">
                Crie prompts para{' '}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-600 bg-clip-text text-transparent transform-gpu">
                  qualquer aplicação
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Estruture ideias complexas em prompts profissionais e assertivos.
                Economize horas de ajustes manuais com nossa arquitetura guiada.
              </p>
            </div>
          </section>

          {/* Features Grid */}
          <section id="features" aria-label="Recursos principais" className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            {[
              {
                icon: <Code2 className="w-6 h-6" />,
                title: "Arquitetura Universal",
                desc: "Estrutura otimizada para Web, Mobile, APIs e Desktop em um só lugar.",
                bg: "from-blue-500/10 to-indigo-500/10"
              },
              {
                icon: <Layers className="w-6 h-6" />,
                title: "Refinamento em Etapas",
                desc: "Do conceito base à segurança e deliverables. Nenhuma regra é esquecida.",
                bg: "from-purple-500/10 to-pink-500/10"
              },
              {
                icon: <Cpu className="w-6 h-6" />,
                title: "Pronto para LLMs",
                desc: "Prompts otimizados para GPT-5.3 Codex, Claude 4.6 Opus e Gemini 3 Deep Think.",
                bg: "from-amber-500/10 to-orange-500/10"
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-8 rounded-[2.5rem] glass hover-lift border-primary/5 relative overflow-hidden transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center shadow-lg text-primary group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Form Area */}
          <section id="generator" ref={generatorRef} aria-label="Gerador de Prompt" className={`relative transition-all duration-500 mx-auto w-full scroll-mt-20 ${isFullScreen ? 'fixed inset-0 z-[100] bg-background p-4 sm:p-8 overflow-y-auto max-w-none' : 'max-w-5xl group'}`}>
            <div className={`absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-indigo-500/20 rounded-[3rem] blur-2xl opacity-50 transition duration-1000 ${isFullScreen ? 'hidden' : 'group-hover:opacity-100'}`} />

            <div className={`relative glass-card rounded-[2.5rem] overflow-hidden border-primary/10 flex flex-col ${isFullScreen ? 'min-h-full rounded-none sm:rounded-[2.5rem]' : ''}`}>
              <div className="p-1 sm:p-2 bg-muted/30 border-b border-primary/5 flex items-center justify-between pr-4 sm:pr-6">
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
                  className="rounded-xl hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors ml-2"
                  title={isFullScreen ? "Sair da Tela Cheia" : "Modo Concentração (Tela Cheia)"}
                >
                  {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </Button>
              </div>

              <div className="p-6 sm:p-10 lg:p-12 min-h-[500px]">
                {currentStep < 7 ? (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="mb-8 space-y-2">
                      <h2 className="text-3xl font-bold tracking-tight">
                        {currentStep === 1 && "Definição de Base"}
                        {currentStep === 2 && "Identidade do Projeto"}
                        {currentStep === 3 && "Requisitos Técnicos"}
                        {currentStep === 4 && "Segurança e Legal"}
                        {currentStep === 5 && "Deliverables e MVP"}
                        {currentStep === 6 && "Configurações Específicas"}
                      </h2>
                      <p className="text-muted-foreground">Preencha os detalhes para estruturar o prompt ideal.</p>
                    </div>
                    {renderStep()}
                  </div>
                ) : (
                  <Resultado
                    prompt={generatedPrompt}
                    onReset={handleReset}
                    onExport={exportConfig}
                    onExportToon={exportTOON}
                    onExportXml={exportXML}
                    formData={formData}
                  />
                )}
              </div>


              {currentStep < 7 && (
                <div className="p-6 sm:p-8 bg-muted/30 border-t border-primary/5 flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className="h-12 px-6 rounded-xl hover:bg-background gap-2 font-semibold"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Anterior
                  </Button>

                  {currentStep === 1 ? (
                    <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Selecione um tipo para continuar
                    </div>
                  ) : null}

                  {currentStep === 6 ? (
                    <Button
                      onClick={handleGenerate}
                      className="h-12 px-8 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:scale-105 transition-transform gap-2 font-bold shadow-xl shadow-primary/30 text-white border-none"
                    >
                      Gerar Prompt
                      <Sparkles className="w-5 h-5 fill-white/20" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="h-12 px-8 rounded-xl bg-primary hover:scale-105 transition-transform gap-2 font-bold shadow-lg shadow-primary/40 text-white border-none"
                      disabled={!getStepValidity(currentStep)}
                    >
                      Continuar
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Quick Tips Section */}
          <section id="tips" aria-label="Dicas rápidas" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[2.5rem] bg-indigo-600/5 border border-indigo-500/10 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight">Dica de Especialista</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Quanto mais específico você for na seção de <strong className="text-foreground">Identidade do Projeto</strong>,
                  mais o código gerado parecerá com um produto real em vez de um exemplo genérico.
                </p>
                <ul className="grid grid-cols-1 gap-3 pt-2">
                  {[
                    "Defina o público-alvo claramente",
                    "Especifique o fluxo principal do usuário",
                    "Mencione tecnologias legadas se necessário"
                  ].map((tip, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" aria-hidden="true" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-emerald-600/5 border border-emerald-500/10 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight">O que vem a seguir?</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  O prompt gerado segue o padrão <strong className="text-foreground">SMILE (Simple, Modular, Integrated, Lean, Extensible)</strong>,
                  garantindo que qualquer IA consiga implementar seu projeto.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['Clean Code', 'SOLID', 'DRY', 'YAGNI'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-[10px] font-black uppercase tracking-widest border border-emerald-500/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer role="contentinfo" className="w-full border-t border-primary/5 glass mt-20">
        <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-bold tracking-tight">PromptGen 2026</span>
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              Transformando sua visão em arquitetura técnica impecável.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Termos</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="https://github.com/vitorhubdev" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
          </div>

          <p className="text-[10px] text-muted-foreground/60 font-bold">
            &copy; {new Date().getFullYear()} vitorhubdev. Licença MIT.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
