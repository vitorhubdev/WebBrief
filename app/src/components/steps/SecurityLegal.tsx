import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Shield, FileCheck, User } from 'lucide-react';
import type { FormData } from '@/types';
import { collectedDataOptions } from '@/types';

interface SecurityLegalProps {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  toggleArrayField: <K extends keyof FormData>(field: K, value: string) => void;
}

export function SecurityLegal({ formData, updateField, toggleArrayField }: SecurityLegalProps) {
  return (
    <div className="space-y-8">
      {/* Dados Pessoais */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Proteção de Dados (LGPD/GDPR)</h3>
        </div>

        <Card className="p-4 space-y-4">
          <div className="space-y-3">
            <Label>Coleta dados pessoais dos usuários?</Label>
            <RadioGroup
              value={formData.collectsData}
              onValueChange={(v) => updateField('collectsData', v as 'sim' | 'nao')}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="collects-sim" />
                <Label htmlFor="collects-sim" className="cursor-pointer">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="collects-nao" />
                <Label htmlFor="collects-nao" className="cursor-pointer">Não</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.collectsData === 'sim' && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
              <Label>Quais dados são coletados?</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {collectedDataOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`data-${option.value}`}
                      checked={formData.collectedDataTypes.includes(option.value)}
                      onCheckedChange={() => toggleArrayField('collectedDataTypes', option.value)}
                    />
                    <Label htmlFor={`data-${option.value}`} className="text-sm cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Setor Regulado */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Conformidade Setorial</h3>
        </div>

        <Card className="p-4">
          <div className="space-y-3">
            <Label>Setor regulado?</Label>
            <RadioGroup
              value={formData.regulatedSector}
              onValueChange={(v) => updateField('regulatedSector', v as 'nao' | 'saude' | 'financas' | 'educacao' | 'outro')}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="sector-nao" />
                <Label htmlFor="sector-nao" className="cursor-pointer text-sm">Não</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="saude" id="sector-saude" />
                <Label htmlFor="sector-saude" className="cursor-pointer text-sm">Saúde</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="financas" id="sector-financas" />
                <Label htmlFor="sector-financas" className="cursor-pointer text-sm">Finanças</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="educacao" id="sector-educacao" />
                <Label htmlFor="sector-educacao" className="cursor-pointer text-sm">Educação</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="outro" id="sector-outro" />
                <Label htmlFor="sector-outro" className="cursor-pointer text-sm">Outro</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.regulatedSector !== 'nao' && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg animate-in fade-in">
              <p className="text-sm text-amber-800">
                <strong>Atenção:</strong> Setores regulados podem exigir conformidades específicas 
                (HIPAA para saúde, PCI-DSS para finanças, etc.). O prompt incluirá avisos sobre 
                consultoria especializada.
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Licenças */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Licenças e Conteúdo</h3>
        </div>

        <Card className="p-4 space-y-4">
          <div className="space-y-2">
            <Label>Fonte de imagens, ícones e fontes</Label>
            <RadioGroup
              value={formData.licensesSource}
              onValueChange={(v) => updateField('licensesSource', v)}
              className="space-y-2"
            >
              <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="licenca-livre" id="license-free" className="mt-1" />
                <div>
                  <Label htmlFor="license-free" className="cursor-pointer font-medium">Apenas licença livre</Label>
                  <p className="text-sm text-muted-foreground">MIT, Apache, Creative Commons, domínio público</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="proprietario" id="license-prop" className="mt-1" />
                <div>
                  <Label htmlFor="license-prop" className="cursor-pointer font-medium">Tenho licenças proprietárias</Label>
                  <p className="text-sm text-muted-foreground">Imagens/fontes pagas com licença adequada</p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </Card>
      </div>

      {/* Créditos */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Autoria e Créditos</h3>
        </div>

        <Card className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="credits">Texto de crédito</Label>
            <Input
              id="credits"
              placeholder="Ex: Criado por João Silva"
              value={formData.creditsText}
              onChange={(e) => updateField('creditsText', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Onde aparecem os créditos?</Label>
            <RadioGroup
              value={formData.creditsLocation}
              onValueChange={(v) => updateField('creditsLocation', v)}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="readme" id="cred-readme" />
                <Label htmlFor="cred-readme" className="cursor-pointer text-sm">README</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="footer" id="cred-footer" />
                <Label htmlFor="cred-footer" className="cursor-pointer text-sm">Footer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="about" id="cred-about" />
                <Label htmlFor="cred-about" className="cursor-pointer text-sm">Página Sobre</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nenhum" id="cred-none" />
                <Label htmlFor="cred-none" className="cursor-pointer text-sm">Não exibir</Label>
              </div>
            </RadioGroup>
          </div>
        </Card>
      </div>
    </div>
  );
}
