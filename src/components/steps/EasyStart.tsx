import { Globe, Smartphone, Terminal, Monitor, Server, Sparkles, User, Cpu, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AppType, ProductPattern, Stack } from '@/types';
import {
  productPatterns,
  recommendedFramework,
  recommendedStack,
  stackCompatibility,
} from '@/types';
import { patternSkillChips } from '@/lib/useCaseSkills';
import { useI18n } from '@/i18n/context';
import { getAppTypeOptions, getPatternDisplay, getStackOptions } from '@/i18n/options';

interface EasyStartProps {
  selectedType: AppType | '';
  selectedStack: Stack | '';
  patternId: string;
  framework: string;
  onSelectType: (type: AppType) => void;
  onSelectStack: (stack: Stack) => void;
  onLoadPattern: (pattern: ProductPattern) => void;
  onUpdateFramework: (value: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Terminal,
  Monitor,
  Server,
  User,
  Cpu,
  Sparkles,
  LayoutDashboard,
};

export function EasyStart({
  selectedType,
  selectedStack,
  patternId,
  framework,
  onSelectType,
  onSelectStack,
  onLoadPattern,
  onUpdateFramework,
}: EasyStartProps) {
  const { locale, t } = useI18n();
  const appTypeOptions = getAppTypeOptions(locale);
  const compatible = selectedType
    ? getStackOptions(locale, stackCompatibility[selectedType])
    : [];
  const rec = selectedType ? recommendedStack[selectedType] : null;
  const recLabel = rec ? getStackOptions(locale, [rec])[0]?.label : '';

  return (
    <div className="space-y-10">
      <div className="rounded-[20px] bg-secondary p-5 text-[15px] leading-relaxed">
        <p className="font-semibold text-foreground">{t('easyStart.introTitle')}</p>
        <p className="text-muted-foreground mt-1">{t('easyStart.introBody')}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">{t('easyStart.whatBuild')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {productPatterns.map((pattern) => {
            const Icon = iconMap[pattern.icon] || Sparkles;
            const active = patternId === pattern.id;
            const display = getPatternDisplay(locale, pattern.id, { name: pattern.name, blurb: pattern.blurb });
            return (
              <button
                key={pattern.id}
                type="button"
                onClick={() => onLoadPattern(pattern)}
                className={`p-5 rounded-[20px] text-left transition-colors ${
                  active ? 'bg-secondary ring-1 ring-primary' : 'bg-secondary/60 hover:bg-secondary'
                }`}
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-background text-foreground flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold">{display.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{display.blurb}</p>
                    <p className="text-[12px] text-muted-foreground mt-2">
                      {pattern.framework} · {pattern.stack}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(patternSkillChips[pattern.id] || []).slice(3).map((chip) => (
                        <span
                          key={chip}
                          className="text-[11px] px-2 py-0.5 rounded-full bg-background text-muted-foreground"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold">{t('easyStart.orType')}</h3>
        <div className="flex flex-wrap gap-2">
          {appTypeOptions.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={selectedType === option.value && !patternId ? 'default' : 'outline'}
              className="rounded-xl"
              onClick={() => onSelectType(option.value as AppType)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {selectedType && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-bold">{t('easyStart.language')}</h3>
            {rec && recLabel && (
              <Button type="button" variant="secondary" size="sm" className="rounded-xl" onClick={() => onSelectStack(rec)}>
                {t('easyStart.dontKnow', { stack: recLabel })}
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {compatible.map((option) => {
              const isRec = option.value === rec;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onSelectStack(option.value as Stack);
                    if (!framework && recommendedFramework[option.value as Stack]) {
                      onUpdateFramework(recommendedFramework[option.value as Stack] || '');
                    }
                  }}
                  className={`p-3 rounded-[16px] text-left text-sm ${
                    selectedStack === option.value ? 'bg-secondary ring-1 ring-primary' : 'bg-secondary/50'
                  }`}
                >
                  <span className="font-semibold">{option.label}</span>
                  {isRec && (
                    <span className="ml-2 text-[10px] uppercase text-primary font-bold">{t('common.recommended')}</span>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">{option.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
