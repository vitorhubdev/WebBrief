import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Apple } from 'lucide-react';
import type { FormData } from '@/types';

interface IOSModuleProps {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  toggleArrayField: <K extends keyof FormData>(field: K, value: string) => void;
}

const iosPermissions = [
  { value: 'camera', label: 'Câmera/Fotos' },
  { value: 'localizacao', label: 'Localização' },
  { value: 'notificacoes', label: 'Notificações' },
  { value: 'health', label: 'HealthKit' },
  { value: 'faceid', label: 'Face ID/Touch ID' },
  { value: 'microfone', label: 'Microfone' },
];

export function IOSModule({ formData, updateField, toggleArrayField }: IOSModuleProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Apple className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Configurações do iOS</h3>
      </div>

      <div className="space-y-3">
        <Label>Versão mínima do iOS</Label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {['15', '16', '17', '18'].map((version) => (
            <div
              key={version}
              onClick={() => updateField('iosMinVersion', version)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors text-center ${formData.iosMinVersion === version ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
            >
              <span className="text-sm font-medium">iOS {version}+</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-bold">Arquitetura de UI e Framework</Label>
        <RadioGroup
          value={formData.iosUI}
          onValueChange={(v) => updateField('iosUI', v as any)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-start space-x-3 p-4 rounded-2xl border-2 border-primary/5 hover:border-primary/20 hover:bg-primary/5 cursor-pointer transition-all">
            <RadioGroupItem value="swiftui" id="ios-ui-swiftui" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="ios-ui-swiftui" className="cursor-pointer font-bold flex items-center gap-2">
                SwiftUI
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase">Apple</span>
              </Label>
              <p className="text-xs text-muted-foreground mt-1">Moderno, declarativo. Recomendado para novos projetos.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-2xl border-2 border-primary/5 hover:border-primary/20 hover:bg-primary/5 cursor-pointer transition-all">
            <RadioGroupItem value="uikit" id="ios-ui-uikit" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="ios-ui-uikit" className="cursor-pointer font-bold">UIKit</Label>
              <p className="text-xs text-muted-foreground mt-1">Imperativo, maduro. Ideal para controle total e sistemas complexos.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-2xl border-2 border-primary/5 hover:border-primary/20 hover:bg-primary/5 cursor-pointer transition-all">
            <RadioGroupItem value="flutter" id="ios-ui-flutter" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="ios-ui-flutter" className="cursor-pointer font-bold flex items-center gap-2">
                Flutter
                <span className="text-[10px] bg-sky-500/10 text-sky-600 px-2 py-0.5 rounded-full uppercase italic">Cross-platform</span>
              </Label>
              <p className="text-xs text-muted-foreground mt-1">Dart. Alta performance com renderização própria Custom UI.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-2xl border-2 border-primary/5 hover:border-primary/20 hover:bg-primary/5 cursor-pointer transition-all">
            <RadioGroupItem value="maui" id="ios-ui-maui" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="ios-ui-maui" className="cursor-pointer font-bold flex items-center gap-2">
                .NET MAUI
                <span className="text-[10px] bg-purple-500/10 text-purple-600 px-2 py-0.5 rounded-full uppercase">Microsoft</span>
              </Label>
              <p className="text-xs text-muted-foreground mt-1">C#. Único código compartilhado com Android e Windows Desktop.</p>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>Suporte a iPad?</Label>
        <RadioGroup
          value={formData.iosIpad}
          onValueChange={(v) => updateField('iosIpad', v as 'sim' | 'nao')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sim" id="ipad-sim" />
            <Label htmlFor="ipad-sim" className="cursor-pointer text-sm">Sim</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nao" id="ipad-nao" />
            <Label htmlFor="ipad-nao" className="cursor-pointer text-sm">Não (iPhone only)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>Permissões necessárias</Label>
        <Card className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {iosPermissions.map((perm) => (
              <div key={perm.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`ios-perm-${perm.value}`}
                  checked={formData.iosPermissions.includes(perm.value)}
                  onCheckedChange={() => toggleArrayField('iosPermissions', perm.value)}
                />
                <Label htmlFor={`ios-perm-${perm.value}`} className="text-sm cursor-pointer">
                  {perm.label}
                </Label>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        <Label>Push notifications (APNs)</Label>
        <RadioGroup
          value={formData.iosPush}
          onValueChange={(v) => updateField('iosPush', v as 'sim' | 'nao')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sim" id="ios-push-sim" />
            <Label htmlFor="ios-push-sim" className="cursor-pointer text-sm">Sim</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nao" id="ios-push-nao" />
            <Label htmlFor="ios-push-nao" className="cursor-pointer text-sm">Não</Label>
          </div>
        </RadioGroup>
        {formData.iosPush === 'sim' && (
          <Input
            placeholder="Tipo: promocional, transacional..."
            value={formData.iosPushType}
            onChange={(e) => updateField('iosPushType', e.target.value)}
          />
        )}
      </div>

      <div className="space-y-3">
        <Label>Autenticação</Label>
        <RadioGroup
          value={formData.iosAuth}
          onValueChange={(v) => updateField('iosAuth', v as 'nenhuma' | 'email' | 'apple' | 'outros')}
          className="flex gap-4 flex-wrap"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nenhuma" id="ios-auth-none" />
            <Label htmlFor="ios-auth-none" className="cursor-pointer text-sm">Nenhuma</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="ios-auth-email" />
            <Label htmlFor="ios-auth-email" className="cursor-pointer text-sm">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="apple" id="ios-auth-apple" />
            <Label htmlFor="ios-auth-apple" className="cursor-pointer text-sm">Sign in with Apple</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="outros" id="ios-auth-outros" />
            <Label htmlFor="ios-auth-outros" className="cursor-pointer text-sm">Outros</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>Distribuição</Label>
        <RadioGroup
          value={formData.iosDistribution}
          onValueChange={(v) => updateField('iosDistribution', v as 'testflight' | 'appstore' | 'ambas')}
          className="flex gap-4 flex-wrap"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="testflight" id="ios-dist-tf" />
            <Label htmlFor="ios-dist-tf" className="cursor-pointer text-sm">TestFlight</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="appstore" id="ios-dist-as" />
            <Label htmlFor="ios-dist-as" className="cursor-pointer text-sm">App Store</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ambas" id="ios-dist-ambas" />
            <Label htmlFor="ios-dist-ambas" className="cursor-pointer text-sm">Ambas</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>Tela de privacidade/explicações</Label>
        <RadioGroup
          value={formData.iosPrivacyScreen}
          onValueChange={(v) => updateField('iosPrivacyScreen', v as 'sim' | 'nao')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sim" id="ios-privacy-sim" />
            <Label htmlFor="ios-privacy-sim" className="cursor-pointer text-sm">Sim (recomendado)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nao" id="ios-privacy-nao" />
            <Label htmlFor="ios-privacy-nao" className="cursor-pointer text-sm">Não</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
