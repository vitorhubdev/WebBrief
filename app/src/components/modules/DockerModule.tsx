import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Container } from 'lucide-react';
import type { FormData } from '@/types';

interface DockerModuleProps {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}

export function DockerModule({ formData, updateField }: DockerModuleProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Container className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Configurações do Container</h3>
      </div>

      <div className="space-y-3">
        <Label>O que será containerizado?</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { value: 'api', label: 'API/Backend' },
            { value: 'web', label: 'Web/Frontend' },
            { value: 'worker', label: 'Worker/Job' },
            { value: 'banco', label: 'Banco de dados' },
            { value: 'fullstack', label: 'Fullstack (tudo)' },
          ].map((type) => (
            <div
              key={type.value}
              onClick={() => updateField('dockerType', type.value)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors text-center ${
                formData.dockerType === type.value ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
              }`}
            >
              <span className="text-sm font-medium">{type.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="docker-ports">Portas expostas</Label>
        <Input
          id="docker-ports"
          placeholder="Ex: 8080, 3000, 5432..."
          value={formData.dockerPorts}
          onChange={(e) => updateField('dockerPorts', e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <Label>Volumes (persistência de dados)?</Label>
        <RadioGroup
          value={formData.dockerVolumes}
          onValueChange={(v) => updateField('dockerVolumes', v as 'sim' | 'nao')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sim" id="vol-sim" />
            <Label htmlFor="vol-sim" className="cursor-pointer text-sm">Sim</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nao" id="vol-nao" />
            <Label htmlFor="vol-nao" className="cursor-pointer text-sm">Não</Label>
          </div>
        </RadioGroup>
        {formData.dockerVolumes === 'sim' && (
          <Input
            placeholder="Paths: /data, /app/uploads, /var/log..."
            value={formData.dockerVolumePaths}
            onChange={(e) => updateField('dockerVolumePaths', e.target.value)}
          />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="docker-env">Variáveis de ambiente essenciais</Label>
        <Input
          id="docker-env"
          placeholder="Ex: DATABASE_URL, API_KEY, PORT..."
          value={formData.dockerEnvVars}
          onChange={(e) => updateField('dockerEnvVars', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label>Healthcheck?</Label>
          <RadioGroup
            value={formData.dockerHealthcheck}
            onValueChange={(v) => updateField('dockerHealthcheck', v as 'sim' | 'nao')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="health-sim" />
              <Label htmlFor="health-sim" className="cursor-pointer text-sm">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id="health-nao" />
              <Label htmlFor="health-nao" className="cursor-pointer text-sm">Não</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Usuário non-root?</Label>
          <RadioGroup
            value={formData.dockerNonRoot}
            onValueChange={(v) => updateField('dockerNonRoot', v as 'sim' | 'nao')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="root-sim" />
              <Label htmlFor="root-sim" className="cursor-pointer text-sm">Sim (seguro)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id="root-nao" />
              <Label htmlFor="root-nao" className="cursor-pointer text-sm">Não</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Multi-stage build?</Label>
        <RadioGroup
          value={formData.dockerMultistage}
          onValueChange={(v) => updateField('dockerMultistage', v as 'sim' | 'nao')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sim" id="multistage-sim" />
            <Label htmlFor="multistage-sim" className="cursor-pointer text-sm">Sim (imagem menor)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nao" id="multistage-nao" />
            <Label htmlFor="multistage-nao" className="cursor-pointer text-sm">Não</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>Docker Compose?</Label>
        <RadioGroup
          value={formData.dockerCompose}
          onValueChange={(v) => updateField('dockerCompose', v as 'sim' | 'nao')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sim" id="compose-sim" />
            <Label htmlFor="compose-sim" className="cursor-pointer text-sm">Sim</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nao" id="compose-nao" />
            <Label htmlFor="compose-nao" className="cursor-pointer text-sm">Não</Label>
          </div>
        </RadioGroup>
        {formData.dockerCompose === 'sim' && (
          <Input
            placeholder="Serviços: db, cache, nginx..."
            value={formData.dockerServices}
            onChange={(e) => updateField('dockerServices', e.target.value)}
          />
        )}
      </div>
    </div>
  );
}
