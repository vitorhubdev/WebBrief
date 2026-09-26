import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Package, Code, TestTube, Shield } from 'lucide-react';
import type { FormData, WorkflowMode } from '@/types';
import { workflowModeOptions } from '@/types';

interface DeliverablesProps {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  toggleArrayField: <K extends keyof FormData>(field: K, value: string) => void;
}

const deliverableOptions = [
  { value: 'codigo', label: 'Código fonte', desc: 'Projeto completo e funcional' },
  { value: 'testes', label: 'Testes', desc: 'Unitários, integração ou E2E' },
  { value: 'docs', label: 'Documentação', desc: 'README, API docs, comentários' },
  { value: 'docker', label: 'Docker/Container', desc: 'Dockerfile e compose' },
  { value: 'ci', label: 'Pipeline CI/CD', desc: 'GitHub Actions, etc.' },
];

export function Deliverables({ formData, updateField, toggleArrayField }: DeliverablesProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Como o agente vai trabalhar?</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {workflowModeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateField('workflowMode', option.value as WorkflowMode)}
              className={`p-5 rounded-2xl border-2 text-left transition-all ${
                formData.workflowMode === option.value
                  ? 'border-primary bg-primary/[0.04]'
                  : 'border-muted hover:border-primary/30'
              }`}
            >
              <p className="font-bold">{option.label}</p>
              <p className="text-sm text-muted-foreground mt-1">{option.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* O que entregar */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">O que você quer receber?</h3>
        </div>

        <Card className="p-4">
          <div className="grid grid-cols-1 gap-3">
            {deliverableOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => toggleArrayField('deliverables', option.value)}
              >
                <Checkbox
                  checked={formData.deliverables.includes(option.value)}
                  onCheckedChange={() => toggleArrayField('deliverables', option.value)}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium">{option.label}</p>
                  <p className="text-sm text-muted-foreground">{option.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Escopo */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Escopo do Projeto</h3>
        </div>

        <Card className="p-4">
          <RadioGroup
            value={formData.scope}
            onValueChange={(v) => updateField('scope', v as 'mvp' | 'completo')}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="mvp" id="scope-mvp" className="mt-1" />
              <div>
                <Label htmlFor="scope-mvp" className="cursor-pointer font-medium text-base">MVP (Mínimo Viável)</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Funcionalidades essenciais apenas. Rápido de desenvolver, 
                  ideal para validar ideias.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="completo" id="scope-completo" className="mt-1" />
              <div>
                <Label htmlFor="scope-completo" className="cursor-pointer font-medium text-base">Completo</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Todas as funcionalidades, com tratamento de erros, 
                  logs e documentação completa.
                </p>
              </div>
            </div>
          </RadioGroup>
        </Card>
      </div>

      {/* Qualidade de código */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Qualidade de Código</h3>
        </div>

        <Card className="p-4">
          <RadioGroup
            value={formData.codeQuality}
            onValueChange={(v) => updateField('codeQuality', v as 'simples' | 'clean' | 'patterns' | 'arquitetura')}
            className="space-y-3"
          >
            <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="simples" id="quality-simples" className="mt-1" />
              <div>
                <Label htmlFor="quality-simples" className="cursor-pointer font-medium">Simples e direto</Label>
                <p className="text-sm text-muted-foreground">Código funcional, sem over-engineering</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="clean" id="quality-clean" className="mt-1" />
              <div>
                <Label htmlFor="quality-clean" className="cursor-pointer font-medium">Clean Code</Label>
                <p className="text-sm text-muted-foreground">Funções pequenas, nomes claros, código legível</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="patterns" id="quality-patterns" className="mt-1" />
              <div>
                <Label htmlFor="quality-patterns" className="cursor-pointer font-medium">Design Patterns</Label>
                <p className="text-sm text-muted-foreground">Factory, Repository, Strategy, etc.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="arquitetura" id="quality-arquitetura" className="mt-1" />
              <div>
                <Label htmlFor="quality-arquitetura" className="cursor-pointer font-medium">Arquitetura Completa</Label>
                <p className="text-sm text-muted-foreground">Clean Architecture, Hexagonal, ou similar</p>
              </div>
            </div>
          </RadioGroup>
        </Card>
      </div>

      {/* Testes */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TestTube className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Testes</h3>
        </div>

        <Card className="p-4">
          <RadioGroup
            value={formData.tests}
            onValueChange={(v) => updateField('tests', v as 'nenhum' | 'unitarios' | 'integracao' | 'e2e')}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nenhum" id="test-none" />
              <Label htmlFor="test-none" className="cursor-pointer text-sm">Não necessários</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unitarios" id="test-unit" />
              <Label htmlFor="test-unit" className="cursor-pointer text-sm">Unitários</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="integracao" id="test-int" />
              <Label htmlFor="test-int" className="cursor-pointer text-sm">Integração</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="e2e" id="test-e2e" />
              <Label htmlFor="test-e2e" className="cursor-pointer text-sm">E2E</Label>
            </div>
          </RadioGroup>
        </Card>
      </div>

      {/* Segurança */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Nível de Segurança</h3>
        </div>

        <Card className="p-4">
          <RadioGroup
            value={formData.securityLevel}
            onValueChange={(v) => updateField('securityLevel', v as 'basica' | 'avancada' | 'compliance')}
            className="space-y-3"
          >
            <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="basica" id="sec-basica" className="mt-1" />
              <div>
                <Label htmlFor="sec-basica" className="cursor-pointer font-medium">Básica</Label>
                <p className="text-sm text-muted-foreground">Sanitização de inputs, HTTPS, senhas hasheadas</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="avancada" id="sec-avancada" className="mt-1" />
              <div>
                <Label htmlFor="sec-avancada" className="cursor-pointer font-medium">Avançada</Label>
                <p className="text-sm text-muted-foreground">+ Rate limiting, CORS, CSP, security headers</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="compliance" id="sec-compliance" className="mt-1" />
              <div>
                <Label htmlFor="sec-compliance" className="cursor-pointer font-medium">Compliance</Label>
                <p className="text-sm text-muted-foreground">+ LGPD/GDPR, PCI-DSS (se aplicável)</p>
              </div>
            </div>
          </RadioGroup>
        </Card>
      </div>
    </div>
  );
}
