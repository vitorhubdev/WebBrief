import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { FormData } from '@/types';
import { useI18n } from '@/i18n/context';

interface EasyStoryProps {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}

export function EasyStory({ formData, updateField }: EasyStoryProps) {
  const { t } = useI18n();

  return (
    <div className="space-y-8">
      <p className="text-muted-foreground">{t('easyStory.hint')}</p>

      <div className="space-y-2">
        <Label htmlFor="projectName">{t('easyStory.projectName')}</Label>
        <Input
          id="projectName"
          placeholder={t('easyStory.projectPlaceholder')}
          value={formData.projectName}
          onChange={(e) => updateField('projectName', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pitch">{t('easyStory.pitch')}</Label>
        <Textarea
          id="pitch"
          placeholder={t('easyStory.pitchPlaceholder')}
          value={formData.pitch}
          onChange={(e) => updateField('pitch', e.target.value)}
          className="min-h-[88px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetAudience">{t('easyStory.audience')}</Label>
        <Input
          id="targetAudience"
          placeholder={t('easyStory.audiencePlaceholder')}
          value={formData.targetAudience}
          onChange={(e) => updateField('targetAudience', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mainAction">{t('easyStory.mainAction')}</Label>
        <Input
          id="mainAction"
          placeholder={t('easyStory.mainActionPlaceholder')}
          value={formData.mainAction}
          onChange={(e) => updateField('mainAction', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">{t('easyStory.notes')}</Label>
        <Textarea
          id="notes"
          placeholder={t('easyStory.notesPlaceholder')}
          value={formData.notes}
          onChange={(e) => updateField('notes', e.target.value)}
        />
      </div>

    </div>
  );
}
