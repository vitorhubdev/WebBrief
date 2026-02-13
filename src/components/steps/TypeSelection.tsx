import { Globe, Smartphone, Apple, Terminal, Monitor, Container, Server, Sparkles, ChevronRight, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AppType, Stack, Preset } from '@/types';
import { appTypeOptions, stackOptions, presets, stackCompatibility } from '@/types';

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

  // Filtrar stacks compatíveis com o tipo selecionado
  const compatibleStacks = selectedType
    ? stackOptions.filter(opt => stackCompatibility[selectedType].includes(opt.value as Stack))
    : [];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Tipo de Aplicação */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">1. O que vamos construir hoje?</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {appTypeOptions.map((option) => {
            const Icon = iconMap[option.icon] || Globe;
            const isSelected = selectedType === option.value;
            return (
              <div
                key={option.value}
                onClick={() => onSelectType(option.value as AppType)}
                className={`group p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${isSelected
                  ? 'border-primary bg-primary/[0.03] shadow-lg shadow-primary/10'
                  : 'border-muted bg-muted/20 hover:border-primary/30 hover:bg-muted/30'
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl transition-colors duration-300 ${isSelected ? 'bg-primary text-primary-foreground shadow-md' : 'bg-background text-muted-foreground group-hover:text-primary'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-base">{option.label}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{option.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stack/Linguagem - Filtrado por compatibilidade */}
      {selectedType && (
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">2. Escolha sua tecnologia</h3>
          </div>

          {compatibleStacks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {compatibleStacks.map((option) => {
                const isSelected = selectedStack === option.value;
                return (
                  <Button
                    key={option.value}
                    variant={isSelected ? 'default' : 'outline'}
                    onClick={() => onSelectStack(option.value as Stack)}
                    className={`h-auto py-4 px-5 justify-start text-left rounded-xl transition-all duration-300 border-2 ${isSelected
                      ? 'border-primary shadow-md'
                      : 'border-muted hover:border-primary/40 bg-muted/10'
                      }`}
                  >
                    <div className="space-y-1 w-full overflow-hidden">
                      <p className="font-bold text-sm tracking-tight whitespace-normal break-words leading-tight">
                        {option.label}
                      </p>
                      <p className="text-[10px] opacity-70 font-medium leading-tight break-words whitespace-normal">
                        {option.desc}
                      </p>
                    </div>
                  </Button>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center glass rounded-3xl border-2 border-dashed border-muted">
              <Ban className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
              <p className="text-sm font-bold text-muted-foreground">Nenhuma stack disponível</p>
            </div>
          )}
        </div>
      )}

      {/* Presets */}
      {selectedType && (
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-700">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                {filteredPresets.length}
              </div>
              <h3 className="text-xl font-bold tracking-tight">Comece com um Exemplo</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPresets.map((preset) => {
              const Icon = iconMap[preset.icon] || Sparkles;
              return (
                <div
                  key={preset.id}
                  onClick={() => onLoadPreset(preset)}
                  className="group p-6 rounded-3xl cursor-pointer transition-all duration-300 glass hover:scale-[1.02] hover:shadow-2xl hover:border-primary/40 border-2 border-transparent relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <Icon className="w-24 h-24 -mr-8 -mt-8" />
                  </div>
                  <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-lg leading-tight tracking-tight">{preset.name}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{preset.description}</p>
                      <div className="pt-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10">
                          {preset.stack}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
