
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
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, FileText, Zap, Shield, Code, Settings } from 'lucide-react';
import type { Preset } from '@/types';

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
    importConfig,
    clearSavedData,
  } = usePromptGenerator();

  const handleNext = () => {
    if (currentStep < steps.length) {
      if (!canProceed()) return;
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoadPreset = (preset: Preset) => {
    loadPreset(preset);
    if (currentStep === 1) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!formData.appType && !!formData.stack;
      case 2:
        return !!formData.projectName.trim();
      default:
        return true;
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

  if (showResult) {
    return (
      <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
        <Header onExport={exportConfig} onImport={importConfig} onClear={clearSavedData} />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto animate-in fade-in zoom-in duration-500">
            <Resultado
              prompt={generatedPrompt}
              onReset={resetForm}
              onExport={exportConfig}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      <Header onExport={exportConfig} onImport={importConfig} onClear={clearSavedData} />

      <main className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto space-y-16">

          {/* Hero Section */}
          <section className="text-center space-y-8 animate-in fade-in slide-in-from-top-10 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-float">
              <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
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

          {/* Feature Grid - Scannable & Modern */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
            {[
              { icon: FileText, label: 'Estruturação', desc: 'Siga padrões de mercado' },
              { icon: Code, label: 'Multi-Stack', desc: 'De Rust a TypeScript' },
              { icon: Shield, label: 'Compliance', desc: 'Focado em LGPD/GDPR' },
              { icon: Settings, label: 'Presets', desc: 'Início instantâneo' },
            ].map((f) => (
              <div
                key={f.label}
                className="group p-6 rounded-2xl glass-card hover-lift border-transparent hover:border-primary/30"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-1">{f.label}</h3>
                <p className="text-sm text-muted-foreground leading-snug">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-8 animate-in fade-in duration-700 delay-300">
            {/* Step Indicator */}
            <StepIndicator steps={steps} currentStep={currentStep} />

            {/* Form Card - Glassmorphism */}
            <Card className="glass-card border-white/20 shadow-2xl overflow-hidden rounded-[2rem]">
              <CardContent className="p-6 sm:p-10 lg:p-12">
                {renderStep()}

                {/* Navigation */}
                <div className="flex justify-between mt-12 pt-8 border-t border-primary/10">
                  <Button
                    variant="ghost"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className="h-12 px-6 rounded-xl hover:bg-primary/5 gap-2 font-semibold"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Anterior
                  </Button>

                  {currentStep === steps.length ? (
                    <Button
                      onClick={generatePrompt}
                      className="h-12 px-8 rounded-xl bg-primary hover:scale-105 transition-transform gap-2 font-bold shadow-lg shadow-primary/40"
                      disabled={!formData.appType}
                    >
                      <FileText className="w-5 h-5" />
                      Gerar Prompt
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="h-12 px-8 rounded-xl bg-primary hover:scale-105 transition-transform gap-2 font-bold shadow-lg shadow-primary/40"
                      disabled={!canProceed()}
                    >
                      Continuar
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Tips Section */}
          <section className="grid sm:grid-cols-2 gap-6 px-4">
            <div className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/20 backdrop-blur-sm group">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Engenharia de Prompt</h3>
              <p className="text-sm text-blue-800/80 dark:text-blue-200/60 leading-relaxed">
                Prompts estruturados reduzem alucinações da IA e garantem que o código siga as melhores práticas de arquitetura.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-sm group">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="font-bold text-emerald-900 dark:text-emerald-300 mb-2">Zero Boilerplate</h3>
              <p className="text-sm text-emerald-800/80 dark:text-emerald-200/60 leading-relaxed">
                Gere arquivos de configuração, Dockerfiles e scripts de deploy prontos para uso em ambiente de produção real.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/5 mt-20 bg-muted/20">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2">
            <h2 className="font-bold text-xl tracking-tight">PromptGen</h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              Construindo a ponte entre sua ideia e o código perfeito.
            </p>
          </div>
          <div className="flex gap-12 text-sm">
            <div className="space-y-4">
              <p className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground">Produto</p>
              <ul className="space-y-2">
                <li><button onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors">Gerador</button></li>
                <li><button className="hover:text-primary transition-colors">Presets</button></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground">Legal</p>
              <ul className="space-y-2">
                <li><button className="hover:text-primary transition-colors">Privacidade</button></li>
                <li><button className="hover:text-primary transition-colors">Termos</button></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 border-t border-primary/5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} PromptGen AI Tool. Código Aberto sob licença MIT.
        </div>
      </footer>
    </div>
  );
}

export default App;
