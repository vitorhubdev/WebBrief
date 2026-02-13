import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { FileText, Zap } from 'lucide-react';
import type { FormData } from '@/types';
import { featureOptions } from '@/types';

interface BasicInfoProps {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  toggleArrayField: <K extends keyof FormData>(field: K, value: string) => void;
}

export function BasicInfo({ formData, updateField, toggleArrayField }: BasicInfoProps) {
  return (
    <div className="space-y-8">
      {/* Identidade */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Identidade do Projeto</h3>
        </div>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">Nome do projeto/produto *</Label>
            <Input
              id="projectName"
              placeholder="Ex: TaskMaster Pro"
              value={formData.projectName}
              onChange={(e) => updateField('projectName', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pitch">Em uma frase, o que faz? (elevator pitch)</Label>
            <Textarea
              id="pitch"
              placeholder="Ex: Um gerenciador de tarefas para equipes que sincroniza em tempo real..."
              value={formData.pitch}
              onChange={(e) => updateField('pitch', e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Quem vai usar? (público-alvo)</Label>
            <Input
              id="targetAudience"
              placeholder="Ex: Desenvolvedores, equipes de marketing, pequenas empresas..."
              value={formData.targetAudience}
              onChange={(e) => updateField('targetAudience', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mainAction">Principal ação do usuário</Label>
            <Input
              id="mainAction"
              placeholder="Ex: Criar e gerenciar tarefas, comprar produtos, visualizar relatórios..."
              value={formData.mainAction}
              onChange={(e) => updateField('mainAction', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Funcionalidades */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Funcionalidades Principais</h3>
        </div>

        <Card className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {featureOptions.map((feature) => (
              <div key={feature.value} className="flex items-start space-x-3">
                <Checkbox
                  id={`feature-${feature.value}`}
                  checked={formData.features.includes(feature.value)}
                  onCheckedChange={() => toggleArrayField('features', feature.value)}
                />
                <Label
                  htmlFor={`feature-${feature.value}`}
                  className="text-sm font-normal cursor-pointer leading-tight"
                >
                  {feature.label}
                </Label>
              </div>
            ))}
          </div>
        </Card>

        {/* Autenticação */}
        <div className="space-y-3">
          <Label>Tem login/contas de usuário?</Label>
          <RadioGroup
            value={formData.hasAuth}
            onValueChange={(v) => updateField('hasAuth', v as 'sim' | 'nao')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="auth-sim" />
              <Label htmlFor="auth-sim" className="cursor-pointer">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id="auth-nao" />
              <Label htmlFor="auth-nao" className="cursor-pointer">Não</Label>
            </div>
          </RadioGroup>

          {formData.hasAuth === 'sim' && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
              <div className="flex flex-wrap gap-2">
                {['Email/Senha', 'OAuth (Google/GitHub)', 'Magic Link', 'SSO', 'Biometria'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateField('authType', type)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${formData.authType === type
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-muted/50 border-primary/10 hover:border-primary/30 text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <Input
                placeholder="Ou digite outro tipo customizado..."
                value={formData.authType}
                onChange={(e) => updateField('authType', e.target.value)}
                className="mt-2 h-9 text-sm"
              />
            </div>
          )}
        </div>

        {/* Armazenamento */}
        <div className="space-y-3">
          <Label>Armazena dados?</Label>
          <RadioGroup
            value={formData.storesData}
            onValueChange={(v) => updateField('storesData', v as 'sim' | 'nao')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="data-sim" />
              <Label htmlFor="data-sim" className="cursor-pointer">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id="data-nao" />
              <Label htmlFor="data-nao" className="cursor-pointer">Não</Label>
            </div>
          </RadioGroup>

          {formData.storesData === 'sim' && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
              <div className="flex flex-wrap gap-2">
                {['PostgreSQL', 'MongoDB', 'PocketBase', 'SQLite', 'Supabase', 'Redis'].map((db) => (
                  <button
                    key={db}
                    type="button"
                    onClick={() => updateField('storageType', db)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${formData.storageType === db
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-muted/50 border-primary/10 hover:border-primary/30 text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {db}
                  </button>
                ))}
              </div>
              <Input
                placeholder="Ou digite outro banco de dados..."
                value={formData.storageType}
                onChange={(e) => updateField('storageType', e.target.value)}
                className="mt-2 h-9 text-sm"
              />
            </div>
          )}
        </div>

        {/* Integrações */}
        <div className="space-y-3">
          <Label htmlFor="integrations">Integrações externas (APIs, serviços)</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {['Stripe', 'SendGrid', 'Google Maps', 'AWS S3', 'OpenAI', 'WhatsApp'].map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => {
                  const current = formData.integrations.split(',').map(s => s.trim()).filter(Boolean);
                  if (current.includes(service)) {
                    updateField('integrations', current.filter(s => s !== service).join(', '));
                  } else {
                    updateField('integrations', [...current, service].join(', '));
                  }
                }}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${formData.integrations.includes(service)
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-muted/50 border-primary/10 hover:border-primary/30 text-muted-foreground hover:text-foreground'
                  }`}
              >
                {service}
              </button>
            ))}
          </div>
          <Input
            id="integrations"
            placeholder="Ex: Stripe, SendGrid, Google Maps, AWS S3... (ou 'nenhuma')"
            value={formData.integrations}
            onChange={(e) => updateField('integrations', e.target.value)}
            className="h-9 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
