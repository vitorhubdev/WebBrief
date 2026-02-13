import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Smartphone } from 'lucide-react';
import type { FormData } from '@/types';

interface AndroidModuleProps {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  toggleArrayField: <K extends keyof FormData>(field: K, value: string) => void;
}

const androidPermissions = [
  { value: 'camera', label: 'Câmera' },
  { value: 'localizacao', label: 'Localização' },
  { value: 'notificacoes', label: 'Notificações' },
  { value: 'armazenamento', label: 'Armazenamento' },
  { value: 'bluetooth', label: 'Bluetooth' },
  { value: 'microfone', label: 'Microfone' },
];

export function AndroidModule({ formData, updateField, toggleArrayField }: AndroidModuleProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Smartphone className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Configurações do Android</h3>
      </div>

      {/* Versão mínima */}
      <div className="space-y-3">
        <Label>Versão mínima do Android</Label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {['8', '9', '10', '11', '12', '13', '14'].map((version) => (
            <div
              key={version}
              onClick={() => updateField('androidMinVersion', version)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors text-center ${formData.androidMinVersion === version ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
            >
              <span className="text-sm font-medium">API {version}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-bold">Arquitetura de UI e Framework</Label>
        <RadioGroup
          value={formData.androidUI}
          onValueChange={(v) => updateField('androidUI', v as any)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-start space-x-3 p-4 rounded-2xl border-2 border-primary/5 hover:border-primary/20 hover:bg-primary/5 cursor-pointer transition-all group">
            <RadioGroupItem value="compose" id="ui-compose" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="ui-compose" className="cursor-pointer font-bold flex items-center gap-2">
                Jetpack Compose
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase">Google</span>
              </Label>
              <p className="text-xs text-muted-foreground mt-1">Nativo moderno com Kotlin. Recomendado para novos apps.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-2xl border-2 border-primary/5 hover:border-primary/20 hover:bg-primary/5 cursor-pointer transition-all">
            <RadioGroupItem value="xml" id="ui-xml" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="ui-xml" className="cursor-pointer font-bold">XML (Tradicional)</Label>
              <p className="text-xs text-muted-foreground mt-1">Abordagem clássica imperativa. Ideal para suporte a sistemas legados.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-2xl border-2 border-primary/5 hover:border-primary/20 hover:bg-primary/5 cursor-pointer transition-all">
            <RadioGroupItem value="flutter" id="ui-flutter" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="ui-flutter" className="cursor-pointer font-bold flex items-center gap-2">
                Flutter
                <span className="text-[10px] bg-sky-500/10 text-sky-600 px-2 py-0.5 rounded-full uppercase italic">Cross-platform</span>
              </Label>
              <p className="text-xs text-muted-foreground mt-1">Dart. Performance nativa com renderização própria e UI rica.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-2xl border-2 border-primary/5 hover:border-primary/20 hover:bg-primary/5 cursor-pointer transition-all">
            <RadioGroupItem value="maui" id="ui-maui" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="ui-maui" className="cursor-pointer font-bold flex items-center gap-2">
                .NET MAUI
                <span className="text-[10px] bg-purple-500/10 text-purple-600 px-2 py-0.5 rounded-full uppercase">Microsoft</span>
              </Label>
              <p className="text-xs text-muted-foreground mt-1">C#. Evolução do Xamarin. Único código para Android, iOS e Windows.</p>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Tablet e Orientação */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label>Suporte a tablets?</Label>
          <RadioGroup
            value={formData.androidTablet}
            onValueChange={(v) => updateField('androidTablet', v as 'sim' | 'nao')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="tablet-sim" />
              <Label htmlFor="tablet-sim" className="cursor-pointer text-sm">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id="tablet-nao" />
              <Label htmlFor="tablet-nao" className="cursor-pointer text-sm">Não</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Orientação da tela</Label>
          <RadioGroup
            value={formData.androidOrientation}
            onValueChange={(v) => updateField('androidOrientation', v as 'portrait' | 'landscape' | 'ambos')}
            className="flex gap-4 flex-wrap"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="portrait" id="orient-portrait" />
              <Label htmlFor="orient-portrait" className="cursor-pointer text-sm">Retrato</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="landscape" id="orient-landscape" />
              <Label htmlFor="orient-landscape" className="cursor-pointer text-sm">Paisagem</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ambos" id="orient-ambos" />
              <Label htmlFor="orient-ambos" className="cursor-pointer text-sm">Ambos</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Permissões */}
      <div className="space-y-3">
        <Label>Permissões necessárias</Label>
        <Card className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {androidPermissions.map((perm) => (
              <div key={perm.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`perm-${perm.value}`}
                  checked={formData.androidPermissions.includes(perm.value)}
                  onCheckedChange={() => toggleArrayField('androidPermissions', perm.value)}
                />
                <Label htmlFor={`perm-${perm.value}`} className="text-sm cursor-pointer">
                  {perm.label}
                </Label>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Push notifications */}
      <div className="space-y-3">
        <Label>Push notifications</Label>
        <RadioGroup
          value={formData.androidPush}
          onValueChange={(v) => updateField('androidPush', v as 'sim' | 'nao')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sim" id="push-sim" />
            <Label htmlFor="push-sim" className="cursor-pointer text-sm">Sim</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nao" id="push-nao" />
            <Label htmlFor="push-nao" className="cursor-pointer text-sm">Não</Label>
          </div>
        </RadioGroup>
        {formData.androidPush === 'sim' && (
          <Input
            placeholder="Tipo: promocional, transacional, chat..."
            value={formData.androidPushType}
            onChange={(e) => updateField('androidPushType', e.target.value)}
          />
        )}
      </div>

      {/* Offline */}
      <div className="space-y-3">
        <Label>Suporte offline</Label>
        <RadioGroup
          value={formData.androidOffline}
          onValueChange={(v) => updateField('androidOffline', v as 'nao' | 'cache' | 'sync')}
          className="grid grid-cols-3 gap-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nao" id="offline-nao" />
            <Label htmlFor="offline-nao" className="cursor-pointer text-sm">Não</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cache" id="offline-cache" />
            <Label htmlFor="offline-cache" className="cursor-pointer text-sm">Cache</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sync" id="offline-sync" />
            <Label htmlFor="offline-sync" className="cursor-pointer text-sm">Sync</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Auth */}
      <div className="space-y-3">
        <Label>Autenticação</Label>
        <RadioGroup
          value={formData.androidAuth}
          onValueChange={(v) => updateField('androidAuth', v as 'nenhuma' | 'email' | 'social' | 'sso')}
          className="flex gap-4 flex-wrap"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nenhuma" id="auth-none" />
            <Label htmlFor="auth-none" className="cursor-pointer text-sm">Nenhuma</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="auth-email" />
            <Label htmlFor="auth-email" className="cursor-pointer text-sm">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="social" id="auth-social" />
            <Label htmlFor="auth-social" className="cursor-pointer text-sm">Social</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sso" id="auth-sso" />
            <Label htmlFor="auth-sso" className="cursor-pointer text-sm">SSO</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Distribuição */}
      <div className="space-y-3">
        <Label>Distribuição</Label>
        <RadioGroup
          value={formData.androidDistribution}
          onValueChange={(v) => updateField('androidDistribution', v as 'apk' | 'playstore' | 'ambas')}
          className="flex gap-4 flex-wrap"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="apk" id="dist-apk" />
            <Label htmlFor="dist-apk" className="cursor-pointer text-sm">APK interno</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="playstore" id="dist-playstore" />
            <Label htmlFor="dist-playstore" className="cursor-pointer text-sm">Google Play</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ambas" id="dist-ambas" />
            <Label htmlFor="dist-ambas" className="cursor-pointer text-sm">Ambas</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Telemetria */}
      <div className="space-y-3">
        <Label>Telemetria/Analytics</Label>
        <RadioGroup
          value={formData.androidTelemetry}
          onValueChange={(v) => updateField('androidTelemetry', v as 'nenhum' | 'crash' | 'analytics')}
          className="flex gap-4 flex-wrap"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nenhum" id="tel-none" />
            <Label htmlFor="tel-none" className="cursor-pointer text-sm">Nenhum</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="crash" id="tel-crash" />
            <Label htmlFor="tel-crash" className="cursor-pointer text-sm">Crash reporting</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="analytics" id="tel-analytics" />
            <Label htmlFor="tel-analytics" className="cursor-pointer text-sm">Analytics completo</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
