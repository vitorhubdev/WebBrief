import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Gauge, Accessibility, Languages, Palette } from 'lucide-react';
import type { FormData } from '@/types';

interface TechnicalRequirementsProps {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}

export function TechnicalRequirements({ formData, updateField }: TechnicalRequirementsProps) {
  return (
    <div className="space-y-8">
      {/* Performance */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Performance e Experiência</h3>
        </div>

        <Card className="p-4 space-y-4">
          {/* Offline */}
          <div className="space-y-3">
            <Label>Suporte offline</Label>
            <RadioGroup
              value={formData.offlineSupport}
              onValueChange={(v) => updateField('offlineSupport', v as 'nao' | 'parcial' | 'total')}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="offline-nao" />
                <Label htmlFor="offline-nao" className="cursor-pointer text-sm">Não necessário</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="parcial" id="offline-parcial" />
                <Label htmlFor="offline-parcial" className="cursor-pointer text-sm">Parcial (cache)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="total" id="offline-total" />
                <Label htmlFor="offline-total" className="cursor-pointer text-sm">Total (100% offline)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Performance target */}
          <div className="space-y-2">
            <Label htmlFor="performance">Meta de performance (opcional)</Label>
            <Input
              id="performance"
              placeholder="Ex: Carregar em <2s, API <200ms, etc."
              value={formData.performanceTarget}
              onChange={(e) => updateField('performanceTarget', e.target.value)}
            />
          </div>
        </Card>
      </div>

      {/* Acessibilidade */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Accessibility className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Acessibilidade</h3>
        </div>

        <Card className="p-4">
          <RadioGroup
            value={formData.accessibility}
            onValueChange={(v) => updateField('accessibility', v as 'basica' | 'avancada')}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="basica" id="acc-basica" className="mt-1" />
              <div>
                <Label htmlFor="acc-basica" className="cursor-pointer font-medium">Básica</Label>
                <p className="text-sm text-muted-foreground">Navegação por teclado e contraste adequado</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="avancada" id="acc-avancada" className="mt-1" />
              <div>
                <Label htmlFor="acc-avancada" className="cursor-pointer font-medium">Avançada</Label>
                <p className="text-sm text-muted-foreground">WCAG 2.1 AA completo (screen readers, etc.)</p>
              </div>
            </div>
          </RadioGroup>
        </Card>
      </div>

      {/* Idioma e Tema */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Idioma</h3>
          </div>
          <Card className="p-4">
            <RadioGroup
              value={formData.languages}
              onValueChange={(v) => updateField('languages', v as 'ptbr' | 'multi')}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ptbr" id="lang-ptbr" />
                <Label htmlFor="lang-ptbr" className="cursor-pointer">Português brasileiro (pt-BR)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multi" id="lang-multi" />
                <Label htmlFor="lang-multi" className="cursor-pointer">Multi-idioma</Label>
              </div>
            </RadioGroup>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Tema Visual</h3>
          </div>
          <Card className="p-4">
            <RadioGroup
              value={formData.theme}
              onValueChange={(v) => updateField('theme', v as 'claro' | 'escuro' | 'ambos')}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="claro" id="theme-claro" />
                <Label htmlFor="theme-claro" className="cursor-pointer">Claro</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="escuro" id="theme-escuro" />
                <Label htmlFor="theme-escuro" className="cursor-pointer">Escuro</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ambos" id="theme-ambos" />
                <Label htmlFor="theme-ambos" className="cursor-pointer">Ambos (com toggle)</Label>
              </div>
            </RadioGroup>
          </Card>
        </div>
      </div>
    </div>
  );
}
