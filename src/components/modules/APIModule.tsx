import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Server } from 'lucide-react';
import type { FormData } from '@/types';

interface APIModuleProps {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}

export function APIModule({ formData, updateField }: APIModuleProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Server className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Configurações da API</h3>
      </div>

      <div className="space-y-3">
        <Label>Tipo de API</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: 'rest', label: 'REST' },
            { value: 'graphql', label: 'GraphQL' },
            { value: 'grpc', label: 'gRPC' },
            { value: 'websocket', label: 'WebSocket' },
          ].map((type) => (
            <div
              key={type.value}
              onClick={() => updateField('apiType', type.value as 'rest' | 'graphql' | 'grpc' | 'websocket')}
              className={`p-2 rounded-lg border cursor-pointer transition-colors text-center overflow-hidden flex items-center justify-center min-h-[44px] ${formData.apiType === type.value ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
            >
              <span className="text-sm font-medium leading-tight whitespace-normal break-words">{type.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="api-domain">Domínio do negócio</Label>
        <Input
          id="api-domain"
          placeholder="Ex: E-commerce, agendamento, finanças pessoais..."
          value={formData.apiDomain}
          onChange={(e) => updateField('apiDomain', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="api-resources">Recursos principais (entidades)</Label>
        <Input
          id="api-resources"
          placeholder="Ex: users, orders, products, appointments..."
          value={formData.apiResources}
          onChange={(e) => updateField('apiResources', e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <Label>Autenticação/Autorização</Label>
        <RadioGroup
          value={formData.apiAuth}
          onValueChange={(v) => updateField('apiAuth', v as 'nenhuma' | 'jwt' | 'oauth' | 'apikey' | 'rbac')}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {[
            { value: 'nenhuma', label: 'Nenhuma' },
            { value: 'jwt', label: 'JWT' },
            { value: 'oauth', label: 'OAuth2' },
            { value: 'apikey', label: 'API Key' },
            { value: 'rbac', label: 'RBAC' },
          ].map((auth) => (
            <div key={auth.value} className="flex items-center space-x-2">
              <RadioGroupItem value={auth.value} id={`auth-${auth.value}`} />
              <Label htmlFor={`auth-${auth.value}`} className="cursor-pointer text-sm">{auth.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label>Banco de dados</Label>
          <RadioGroup
            value={formData.apiDatabase}
            onValueChange={(v) => updateField('apiDatabase', v as 'nenhum' | 'sqlite' | 'postgres' | 'mysql' | 'mongodb' | 'redis')}
            className="space-y-2"
          >
            {[
              { value: 'nenhum', label: 'Nenhum (stateless)' },
              { value: 'sqlite', label: 'SQLite' },
              { value: 'postgres', label: 'PostgreSQL' },
              { value: 'mysql', label: 'MySQL' },
              { value: 'mongodb', label: 'MongoDB' },
              { value: 'redis', label: 'Redis' },
            ].map((db) => (
              <div key={db.value} className="flex items-center space-x-2">
                <RadioGroupItem value={db.value} id={`db-${db.value}`} />
                <Label htmlFor={`db-${db.value}`} className="cursor-pointer text-sm">{db.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Cache</Label>
          <RadioGroup
            value={formData.apiCache}
            onValueChange={(v) => updateField('apiCache', v as 'nenhum' | 'redis' | 'outro')}
            className="space-y-2"
          >
            {[
              { value: 'nenhum', label: 'Nenhum' },
              { value: 'redis', label: 'Redis' },
              { value: 'outro', label: 'Outro' },
            ].map((cache) => (
              <div key={cache.value} className="flex items-center space-x-2">
                <RadioGroupItem value={cache.value} id={`cache-${cache.value}`} />
                <Label htmlFor={`cache-${cache.value}`} className="cursor-pointer text-sm">{cache.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="space-y-3">
          <Label>Paginação?</Label>
          <RadioGroup
            value={formData.apiPagination}
            onValueChange={(v) => updateField('apiPagination', v as 'sim' | 'nao')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="pag-sim" />
              <Label htmlFor="pag-sim" className="cursor-pointer text-sm">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id="pag-nao" />
              <Label htmlFor="pag-nao" className="cursor-pointer text-sm">Não</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Rate limiting?</Label>
          <RadioGroup
            value={formData.apiRateLimit}
            onValueChange={(v) => updateField('apiRateLimit', v as 'sim' | 'nao')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="rl-sim" />
              <Label htmlFor="rl-sim" className="cursor-pointer text-sm">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id="rl-nao" />
              <Label htmlFor="rl-nao" className="cursor-pointer text-sm">Não</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Versionamento?</Label>
          <RadioGroup
            value={formData.apiVersioning}
            onValueChange={(v) => updateField('apiVersioning', v as 'sim' | 'nao')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="ver-sim" />
              <Label htmlFor="ver-sim" className="cursor-pointer text-sm">Sim (/v1)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id="ver-nao" />
              <Label htmlFor="ver-nao" className="cursor-pointer text-sm">Não</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Documentação?</Label>
          <RadioGroup
            value={formData.apiDocs}
            onValueChange={(v) => updateField('apiDocs', v as 'sim' | 'nao')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="docs-sim" />
              <Label htmlFor="docs-sim" className="cursor-pointer text-sm">Sim (OpenAPI)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id="docs-nao" />
              <Label htmlFor="docs-nao" className="cursor-pointer text-sm">Não</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Jobs assíncronos/fila?</Label>
        <RadioGroup
          value={formData.apiJobs}
          onValueChange={(v) => updateField('apiJobs', v as 'sim' | 'nao')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sim" id="jobs-sim" />
            <Label htmlFor="jobs-sim" className="cursor-pointer text-sm">Sim (fila/cron)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nao" id="jobs-nao" />
            <Label htmlFor="jobs-nao" className="cursor-pointer text-sm">Não</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
