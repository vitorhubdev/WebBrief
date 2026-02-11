import { Globe, Smartphone, Apple, Terminal, Monitor, Container, Server, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { AppType, Stack, Preset } from '@/types';
import { appTypeOptions, stackOptions, presets } from '@/types';

interface TypeSelectionProps {
  selectedType: AppType | '';
  selectedStack: Stack | '';
  onSelectType: (type: AppType) => void;
  onSelectStack: (stack: Stack) => void;
  onLoadPreset: (preset: Preset) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Apple,
  Terminal,
  Monitor,
  Container,
  Server,
};

export function TypeSelection({
  selectedType,
  selectedStack,
  onSelectType,
  onSelectStack,
  onLoadPreset,
}: TypeSelectionProps) {
  const filteredPresets = presets.filter(p => !selectedType || p.appType === selectedType);

  return (
    <div className="space-y-8">
      {/* Tipo de Aplicação */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">1. Que tipo de aplicação você quer criar?</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {appTypeOptions.map((option) => {
            const Icon = iconMap[option.icon] || Globe;
            const isSelected = selectedType === option.value;
            return (
              <Card
                key={option.value}
                onClick={() => onSelectType(option.value as AppType)}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  isSelected
                    ? 'border-2 border-primary bg-primary/5'
                    : 'border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.desc}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Stack/Linguagem */}
      {selectedType && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2">
            <ChevronRight className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">2. Qual linguagem/stack preferida?</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {stackOptions.map((option) => {
              const isSelected = selectedStack === option.value;
              return (
                <Button
                  key={option.value}
                  variant={isSelected ? 'default' : 'outline'}
                  onClick={() => onSelectStack(option.value as Stack)}
                  className={`h-auto py-3 px-4 justify-start text-left ${
                    isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                >
                  <div>
                    <p className="font-medium">{option.label}</p>
                    <p className="text-xs opacity-80">{option.desc}</p>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Presets */}
      {selectedType && selectedStack && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Ou use um preset rápido:</h3>
            <span className="text-sm text-muted-foreground">
              {filteredPresets.length} disponíveis
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredPresets.map((preset) => {
              const Icon = iconMap[preset.icon] || Sparkles;
              return (
                <Card
                  key={preset.id}
                  onClick={() => onLoadPreset(preset)}
                  className="p-4 cursor-pointer transition-all hover:shadow-md hover:border-primary/50 border"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{preset.name}</p>
                      <p className="text-sm text-muted-foreground">{preset.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
