import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { FormData } from '@/types';

interface EasyStoryProps {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}

export function EasyStory({ formData, updateField }: EasyStoryProps) {
  return (
    <div className="space-y-8">
      <p className="text-muted-foreground">
        Escreva como se fosse para um amigo. Quanto mais concreto, melhor o agente acerta.
      </p>

      <div className="space-y-2">
        <Label htmlFor="projectName">Nome do projeto *</Label>
        <Input
          id="projectName"
          placeholder="Ex: Studio Aurora"
          value={formData.projectName}
          onChange={(e) => updateField('projectName', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pitch">O que isso faz, em uma frase? *</Label>
        <Textarea
          id="pitch"
          placeholder="Ex: Página para alunas de yoga agendarem aula experimental pelo WhatsApp."
          value={formData.pitch}
          onChange={(e) => updateField('pitch', e.target.value)}
          className="min-h-[88px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetAudience">Quem vai usar?</Label>
        <Input
          id="targetAudience"
          placeholder="Ex: mulheres 25–45 na minha cidade"
          value={formData.targetAudience}
          onChange={(e) => updateField('targetAudience', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mainAction">A ação mais importante *</Label>
        <Input
          id="mainAction"
          placeholder="Ex: clicar em Agendar e abrir o WhatsApp"
          value={formData.mainAction}
          onChange={(e) => updateField('mainAction', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Tem algo que o agente NÃO deve fazer?</Label>
        <Textarea
          id="notes"
          placeholder="Ex: sem estoque, sem login, cores calmas, texto em português do Brasil."
          value={formData.notes}
          onChange={(e) => updateField('notes', e.target.value)}
        />
      </div>

    </div>
  );
}
