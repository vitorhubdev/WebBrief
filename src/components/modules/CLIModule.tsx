import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Terminal } from 'lucide-react';
import type { FormData } from '@/types';

interface CLIModuleProps {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  toggleArrayField: <K extends keyof FormData>(field: K, value: string) => void;
}

const platforms = [
  { value: 'linux', label: 'Linux' },
  { value: 'macos', label: 'macOS' },
  { value: 'windows', label: 'Windows' },
];

export function CLIModule({ formData, updateField, toggleArrayField }: CLIModuleProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Terminal className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Configurações da CLI</h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cli-purpose">Propósito da ferramenta</Label>
        <Input
          id="cli-purpose"
          placeholder="Ex: Automação de deploys, processamento de logs..."
          value={formData.cliPurpose}
          onChange={(e) => updateField('cliPurpose', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cli-commands">Comandos principais</Label>
        <Input
          id="cli-commands"
          placeholder="Ex: init, build, deploy, status..."
          value={formData.cliCommands}
          onChange={(e) => updateField('cliCommands', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label>Entrada de dados</Label>
          <RadioGroup
            value={formData.cliInput}
            onValueChange={(v) => updateField('cliInput', v as 'stdin' | 'arquivos' | 'args' | 'ambos')}
            className="space-y-2"
          >
            {[
              { value: 'args', label: 'Argumentos' },
              { value: 'stdin', label: 'stdin' },
              { value: 'arquivos', label: 'Arquivos' },
              { value: 'ambos', label: 'Ambos' },
            ].map((opt) => (
              <div key={opt.value} className="flex items-center space-x-2">
                <RadioGroupItem value={opt.value} id={`input-${opt.value}`} />
                <Label htmlFor={`input-${opt.value}`} className="cursor-pointer text-sm">{opt.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Saída de dados</Label>
          <RadioGroup
            value={formData.cliOutput}
            onValueChange={(v) => updateField('cliOutput', v as 'texto' | 'json' | 'ambos')}
            className="space-y-2"
          >
            {[
              { value: 'texto', label: 'Texto humano' },
              { value: 'json', label: 'JSON' },
              { value: 'ambos', label: 'Ambos' },
            ].map((opt) => (
              <div key={opt.value} className="flex items-center space-x-2">
                <RadioGroupItem value={opt.value} id={`output-${opt.value}`} />
                <Label htmlFor={`output-${opt.value}`} className="cursor-pointer text-sm">{opt.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Configuração</Label>
        <RadioGroup
          value={formData.cliConfig}
          onValueChange={(v) => updateField('cliConfig', v as 'flags' | 'arquivo' | 'env')}
          className="flex gap-4 flex-wrap"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="flags" id="config-flags" />
            <Label htmlFor="config-flags" className="cursor-pointer text-sm">Flags</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="arquivo" id="config-arquivo" />
            <Label htmlFor="config-arquivo" className="cursor-pointer text-sm">Arquivo (yaml/toml)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="env" id="config-env" />
            <Label htmlFor="config-env" className="cursor-pointer text-sm">Env vars</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>Interativo (prompts)?</Label>
        <RadioGroup
          value={formData.cliInteractive}
          onValueChange={(v) => updateField('cliInteractive', v as 'sim' | 'nao')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sim" id="interactive-sim" />
            <Label htmlFor="interactive-sim" className="cursor-pointer text-sm">Sim</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nao" id="interactive-nao" />
            <Label htmlFor="interactive-nao" className="cursor-pointer text-sm">Não (scriptável)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>Plataformas suportadas</Label>
        <Card className="p-4">
          <div className="flex gap-6">
            {platforms.map((p) => (
              <div key={p.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`plat-${p.value}`}
                  checked={formData.cliPlatforms.includes(p.value)}
                  onCheckedChange={() => toggleArrayField('cliPlatforms', p.value)}
                />
                <Label htmlFor={`plat-${p.value}`} className="cursor-pointer">{p.label}</Label>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        <Label>Método de instalação</Label>
        <RadioGroup
          value={formData.cliInstall}
          onValueChange={(v) => updateField('cliInstall', v as 'binario' | 'package' | 'script')}
          className="flex gap-4 flex-wrap"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="binario" id="install-bin" />
            <Label htmlFor="install-bin" className="cursor-pointer text-sm">Binário único</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="package" id="install-pkg" />
            <Label htmlFor="install-pkg" className="cursor-pointer text-sm">Package manager</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="script" id="install-script" />
            <Label htmlFor="install-script" className="cursor-pointer text-sm">Script</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
