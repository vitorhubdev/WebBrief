import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Monitor } from 'lucide-react';
import type { FormData } from '@/types';

interface GUIModuleProps {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}

export function GUIModule({ formData, updateField }: GUIModuleProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Monitor className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Configurações da GUI Desktop</h3>
      </div>

      <div className="space-y-3">
        <Label>Framework preferido</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { value: 'tauri', label: 'Tauri', desc: 'Rust + Web' },
            { value: 'electron', label: 'Electron', desc: 'Node.js' },
            { value: 'flutter', label: 'Flutter', desc: 'Dart' },
            { value: 'qt', label: 'Qt', desc: 'C++' },
            { value: 'maui', label: '.NET MAUI', desc: 'C#' },
            { value: 'outro', label: 'Outro', desc: 'Especificar' },
          ].map((fw) => (
            <div
              key={fw.value}
              onClick={() => updateField('guiFramework', fw.value)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors overflow-hidden ${formData.guiFramework === fw.value ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
            >
              <p className="font-medium text-sm truncate">{fw.label}</p>
              <p className="text-xs text-muted-foreground whitespace-normal break-words leading-tight">{fw.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gui-flow">Fluxo principal da interface</Label>
        <Input
          id="gui-flow"
          placeholder="Ex: Tela inicial → Configurações → Execução → Resultados"
          value={formData.guiFlow}
          onChange={(e) => updateField('guiFlow', e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <Label>Trabalha com arquivos locais?</Label>
        <RadioGroup
          value={formData.guiFiles}
          onValueChange={(v) => updateField('guiFiles', v as 'sim' | 'nao')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sim" id="files-sim" />
            <Label htmlFor="files-sim" className="cursor-pointer text-sm">Sim</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nao" id="files-nao" />
            <Label htmlFor="files-nao" className="cursor-pointer text-sm">Não</Label>
          </div>
        </RadioGroup>
        {formData.guiFiles === 'sim' && (
          <Input
            placeholder="Formatos: .txt, .json, .csv..."
            value={formData.guiFileFormats}
            onChange={(e) => updateField('guiFileFormats', e.target.value)}
          />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label>Atalhos de teclado?</Label>
          <RadioGroup
            value={formData.guiShortcuts}
            onValueChange={(v) => updateField('guiShortcuts', v as 'sim' | 'nao')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="shortcuts-sim" />
              <Label htmlFor="shortcuts-sim" className="cursor-pointer text-sm">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id="shortcuts-nao" />
              <Label htmlFor="shortcuts-nao" className="cursor-pointer text-sm">Não</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Auto-update?</Label>
          <RadioGroup
            value={formData.guiAutoUpdate}
            onValueChange={(v) => updateField('guiAutoUpdate', v as 'sim' | 'nao')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="autoupdate-sim" />
              <Label htmlFor="autoupdate-sim" className="cursor-pointer text-sm">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id="autoupdate-nao" />
              <Label htmlFor="autoupdate-nao" className="cursor-pointer text-sm">Não</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Persistência de dados</Label>
        <RadioGroup
          value={formData.guiPersistence}
          onValueChange={(v) => updateField('guiPersistence', v as 'nenhum' | 'config' | 'banco')}
          className="flex gap-4 flex-wrap"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nenhum" id="persist-none" />
            <Label htmlFor="persist-none" className="cursor-pointer text-sm">Nenhum</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="config" id="persist-config" />
            <Label htmlFor="persist-config" className="cursor-pointer text-sm">Config local</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="banco" id="persist-db" />
            <Label htmlFor="persist-db" className="cursor-pointer text-sm">Banco local</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>Empacotamento</Label>
        <RadioGroup
          value={formData.guiPackaging}
          onValueChange={(v) => updateField('guiPackaging', v as 'installer' | 'portable' | 'ambos')}
          className="flex gap-4 flex-wrap"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="installer" id="pkg-installer" />
            <Label htmlFor="pkg-installer" className="cursor-pointer text-sm">Installer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="portable" id="pkg-portable" />
            <Label htmlFor="pkg-portable" className="cursor-pointer text-sm">Portable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ambos" id="pkg-ambos" />
            <Label htmlFor="pkg-ambos" className="cursor-pointer text-sm">Ambos</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
