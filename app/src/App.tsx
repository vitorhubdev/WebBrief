
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
      // Validação básica
      if (currentStep === 1 && (!formData.appType || !formData.stack)) {
        return;
      }
      if (currentStep === 2 && !formData.projectName) {
        return;
      }
      // Avançar
      const nextStep = currentStep + 1;
      // Pular módulo específico se não tiver tipo selecionado
      if (nextStep === 6 && !formData.appType) {
        return;
      }
      // Atualizar step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoadPreset = (preset: Preset) => {
    loadPreset(preset);
    // Avançar para identidade após carregar preset
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
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Header onExport={exportConfig} onImport={importConfig} onClear={clearSavedData} />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header onExport={exportConfig} onImport={importConfig} onClear={clearSavedData} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Zap className="w-4 h-4" />
              <span>Prompts assertivos em minutos</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Crie prompts para{' '}
              <span className="text-primary">qualquer aplicação</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Websites, apps mobile, CLI, GUI desktop, containers e APIs. 
              Responda algumas perguntas e gere um prompt técnico completo.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: FileText, label: '7 Tipos', desc: 'Website a API' },
              { icon: Code, label: '9 Stacks', desc: 'Go, Rust, TS...' },
              { icon: Shield, label: 'Segurança', desc: 'LGPD/Compliance' },
              { icon: Settings, label: 'Presets', desc: 'Comece rápido' },
            ].map((f) => (
              <div key={f.label} className="flex flex-col items-center text-center p-4 rounded-xl bg-card border">
                <f.icon className="w-6 h-6 text-primary mb-2" />
                <span className="font-medium text-sm">{f.label}</span>
                <span className="text-xs text-muted-foreground">{f.desc}</span>
              </div>
            ))}
          </div>

          {/* Step Indicator */}
          <StepIndicator steps={steps} currentStep={currentStep} />

          {/* Form Card */}
          <Card>
            <CardContent className="pt-6">
              {renderStep()}
              
              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>
                
                {currentStep === steps.length ? (
                  <Button 
                    onClick={generatePrompt} 
                    className="flex items-center gap-2"
                    disabled={!formData.appType}
                  >
                    <FileText className="w-4 h-4" />
                    Gerar Prompt
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNext} 
                    className="flex items-center gap-2"
                    disabled={!canProceed()}
                  >
                    Próximo
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-1">Por que usar?</h3>
              <p className="text-sm text-blue-800">
                Um bom prompt reduz erros e entrega resultados próximos do ideal na primeira tentativa.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <h3 className="font-medium text-green-900 mb-1">O que está incluso?</h3>
              <p className="text-sm text-green-800">
                Especificações técnicas, regras de qualidade, segurança e checklist de validação.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} PromptGen. Ferramenta gratuita.</p>
            <p>Configs salvas automaticamente no navegador</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
