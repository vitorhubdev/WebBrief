import { WebsiteModule } from '@/components/modules/WebsiteModule';
import { AndroidModule } from '@/components/modules/AndroidModule';
import { IOSModule } from '@/components/modules/iOSModule';
import { CLIModule } from '@/components/modules/CLIModule';
import { GUIModule } from '@/components/modules/GUIModule';
import { DockerModule } from '@/components/modules/DockerModule';
import { APIModule } from '@/components/modules/APIModule';
import type { FormData } from '@/types';
import { useI18n } from '@/i18n/context';

interface SpecificModuleProps {
  appType: string;
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  toggleArrayField: <K extends keyof FormData>(field: K, value: string) => void;
}

export function SpecificModule({ appType, formData, updateField, toggleArrayField }: SpecificModuleProps) {
  const { t } = useI18n();

  switch (appType) {
    case 'website':
      return <WebsiteModule formData={formData} updateField={updateField} toggleArrayField={toggleArrayField} />;
    case 'android':
      return <AndroidModule formData={formData} updateField={updateField} toggleArrayField={toggleArrayField} />;
    case 'ios':
      return <IOSModule formData={formData} updateField={updateField} toggleArrayField={toggleArrayField} />;
    case 'cli':
      return <CLIModule formData={formData} updateField={updateField} toggleArrayField={toggleArrayField} />;
    case 'gui':
      return <GUIModule formData={formData} updateField={updateField} />;
    case 'docker':
      return <DockerModule formData={formData} updateField={updateField} />;
    case 'api':
      return <APIModule formData={formData} updateField={updateField} />;
    default:
      return (
        <div className="text-center py-12 text-muted-foreground">
          {t('specificModule.empty')}
        </div>
      );
  }
}
