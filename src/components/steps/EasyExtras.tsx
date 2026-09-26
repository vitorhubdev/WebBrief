import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import type { FormData, PromptTarget, WorkflowMode } from '@/types';
import { SpecificModule } from '@/components/steps/SpecificModule';
import { listUseCaseSkills } from '@/lib/useCaseSkills';
import { useI18n } from '@/i18n/context';
import {
  getFeatureOptions,
  getLoopModeOptions,
  getPromptTargetOptions,
  getWorkflowModeOptions,
  tokenTipsFor,
} from '@/i18n/options';

interface EasyExtrasProps {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  toggleArrayField: <K extends keyof FormData>(field: K, value: string) => void;
}

export function EasyExtras({ formData, updateField, toggleArrayField }: EasyExtrasProps) {
  const { locale, t } = useI18n();
  const skills = listUseCaseSkills(formData);
  const promptTargetOptions = getPromptTargetOptions(locale);
  const groups = [...new Set(promptTargetOptions.map((option) => option.group))];
  const tips = tokenTipsFor(locale, formData);
  const loopOptions = getLoopModeOptions(locale);
  const workflowModeOptions = getWorkflowModeOptions(locale);
  const featureOptions = getFeatureOptions(locale);

  return (
    <div className="space-y-8">
      <div className="rounded-[20px] bg-secondary p-5 space-y-3">
        <p className="font-semibold text-sm">{t('easyExtras.skillsTitle')}</p>
        <p className="text-xs text-muted-foreground">{t('easyExtras.skillsHint')}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {skills.map((skill) => (
            <li key={skill.id} className="rounded-xl bg-background/70 px-3 py-2 border border-primary/10">
              <span className="font-mono text-xs text-primary">{skill.name}</span>
              <p className="text-xs text-muted-foreground mt-0.5">{skill.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label>{t('easyExtras.harnessLabel')}</Label>
          <p className="text-xs text-muted-foreground">{t('easyExtras.harnessHint')}</p>
        </div>
        {groups.map((group) => (
          <div key={group} className="space-y-2">
            <p className="text-[12px] text-muted-foreground">{group}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {promptTargetOptions
                .filter((option) => option.group === group)
                .map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField('promptTarget', option.value as PromptTarget)}
                    className={`p-3 rounded-[16px] text-left text-sm ${
                      formData.promptTarget === option.value ? 'bg-background ring-1 ring-primary' : 'bg-secondary/70'
                    }`}
                  >
                    <span className="font-semibold">{option.label}</span>
                    <p className="text-xs text-muted-foreground mt-1">{option.desc}</p>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[20px] bg-secondary p-5 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="font-semibold text-sm">{t('easyExtras.jevTitle')}</p>
            <p className="text-xs text-muted-foreground">{t('easyExtras.jevHint')}</p>
          </div>
          <Switch
            checked={formData.useJev}
            onCheckedChange={(checked) => updateField('useJev', checked)}
            aria-label={t('easyExtras.jevAria')}
          />
        </div>
        <ul className="space-y-1.5 text-sm">
          {tips.map((tip) => (
            <li key={tip} className="text-foreground/90">
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <Label>{t('easyExtras.loopIntroTitle')}</Label>
          <p className="text-xs text-muted-foreground">{t('easyExtras.loopIntroBody')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {loopOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateField('loopMode', option.value)}
              className={`p-4 rounded-[20px] text-left ${
                formData.loopMode === option.value ? 'bg-background ring-1 ring-primary' : 'bg-background/70'
              }`}
            >
              <p className="font-bold text-sm">{option.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{option.desc}</p>
            </button>
          ))}
        </div>
        {formData.loopMode === 'gauntlet' && (
          <div className="space-y-2">
            <Label htmlFor="qualityBar">{t('easyExtras.qualityBar')}</Label>
            <Input
              id="qualityBar"
              placeholder={t('easyExtras.qualityPlaceholder')}
              value={formData.qualityBar}
              onChange={(e) => updateField('qualityBar', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">{t('easyExtras.qualityHint')}</p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <Label>{t('easyExtras.workflowLabel')}</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {workflowModeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateField('workflowMode', option.value as WorkflowMode)}
              className={`p-4 rounded-[20px] text-left ${
                formData.workflowMode === option.value ? 'bg-background ring-1 ring-primary' : 'bg-background/70'
              }`}
            >
              <p className="font-bold text-sm">{option.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{option.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>{t('easyExtras.authLabel')}</Label>
        <RadioGroup
          value={formData.hasAuth}
          onValueChange={(v) => updateField('hasAuth', v as 'sim' | 'nao')}
          className="flex gap-4"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="nao" id="easy-auth-nao" />
            <Label htmlFor="easy-auth-nao">{t('common.no')}</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="sim" id="easy-auth-sim" />
            <Label htmlFor="easy-auth-sim">{t('common.yes')}</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>{t('easyExtras.featuresLabel')}</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {featureOptions.map((feature) => (
            <label key={feature.value} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={formData.features.includes(feature.value)}
                onCheckedChange={() => toggleArrayField('features', feature.value)}
              />
              {feature.label}
            </label>
          ))}
        </div>
      </div>

      <details className="rounded-2xl border border-dashed border-primary/20 p-4">
        <summary className="cursor-pointer font-semibold">{t('easyExtras.moreDetails')}</summary>
        <div className="mt-6">
          <SpecificModule
            appType={formData.appType}
            formData={formData}
            updateField={updateField}
            toggleArrayField={toggleArrayField}
          />
        </div>
      </details>
    </div>
  );
}
