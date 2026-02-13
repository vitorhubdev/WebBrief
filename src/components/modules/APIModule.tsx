import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Server, Database } from 'lucide-react';
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
        <Label htmlFor="api-framework">Framework específico (Opcional)</Label>
        <Input
          id="api-framework"
          placeholder="Ex: Fiber v3, FastAPI, Axum, ASP.NET Core 10..."
          value={formData.apiFramework}
          onChange={(e) => updateField('apiFramework', e.target.value)}
        />
        <p className="text-[10px] text-muted-foreground italic">
          O prompt será adaptado para as melhores práticas deste framework.
        </p>
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
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <Database className="w-4 h-4 text-primary" />
            Banco de Dados Principal
          </Label>
          <div className="flex flex-wrap gap-2">
            {['PostgreSQL', 'MongoDB', 'SQLite', 'PocketBase', 'Supabase', 'MySQL', 'Redis'].map((db) => (
              <button
                key={db}
                type="button"
                onClick={() => updateField('apiDatabase', db as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${formData.apiDatabase === db
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-muted/50 border-primary/10 hover:border-primary/30 text-muted-foreground hover:text-foreground'
                  }`}
              >
                {db}
              </button>
            ))}
          </div>
          <Input
            placeholder="Ou digite outro banco de dados customizado..."
            value={formData.apiDatabase}
            onChange={(e) => updateField('apiDatabase', e.target.value as any)}
            className="h-9 text-sm"
          />
        </div>

        <div className="space-y-4">
          <Label>Sistema de Cache</Label>
          <div className="flex flex-wrap gap-2">
            {['Redis', 'Memcached', 'In-Memory', 'Dragonfly'].map((cache) => (
              <button
                key={cache}
                type="button"
                onClick={() => updateField('apiCache', cache as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${formData.apiCache === cache
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-muted/50 border-primary/10 hover:border-primary/30 text-muted-foreground hover:text-foreground'
                  }`}
              >
                {cache}
              </button>
            ))}
          </div>
          <Input
            placeholder="Ou digite outro sistema de cache..."
            value={formData.apiCache}
            onChange={(e) => updateField('apiCache', e.target.value as any)}
            className="h-9 text-sm"
          />
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

      <div className="space-y-3">
        <Label htmlFor="api-schema" className="flex items-center gap-2">
          <Database className="w-4 h-4 text-primary" />
          Schema do Banco de Dados / Entidades (Opcional)
        </Label>
        <Textarea
          id="api-schema"
          placeholder="Cole aqui seu schema SQL, definições Prisma, modelos Mongoose ou apenas as entidades e seus campos..."
          className="min-h-[200px] font-mono text-xs bg-muted/30"
          value={formData.apiSchema}
          onChange={(e) => updateField('apiSchema', e.target.value)}
        />
        <p className="text-[10px] text-muted-foreground italic">
          Fornecer o schema ajuda a IA a gerar repositórios e serviços mais precisos.
        </p>
      </div>
    </div>
  );
}
