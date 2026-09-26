import { Check, AlertCircle } from 'lucide-react';
import { useI18n } from '@/i18n/context';

interface Step {
  id: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
  invalidSteps?: number[];
}

export function StepIndicator({ steps, currentStep, onStepClick, invalidSteps = [] }: StepIndicatorProps) {
  const { t } = useI18n();

  return (
    <div className="flex items-center justify-center py-4 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-3">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isInvalid = invalidSteps.includes(step.id);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              <button
                type="button"
                onClick={() => onStepClick?.(step.id)}
                aria-current={isActive ? 'step' : undefined}
                aria-label={t('steps.stepAria', {
                  id: step.id,
                  title: step.title,
                  invalid: isInvalid ? t('steps.incomplete') : '',
                })}
                className="flex flex-col items-center group cursor-pointer border-none bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-medium ${isActive
                    ? isInvalid
                      ? 'bg-destructive text-destructive-foreground'
                      : 'bg-primary text-primary-foreground'
                    : isInvalid
                      ? 'bg-destructive/15 text-destructive'
                      : isCompleted
                        ? 'bg-foreground text-background'
                        : 'bg-background text-muted-foreground'
                    }`}
                >
                  {isInvalid ? <AlertCircle className="w-4 h-4" /> : isCompleted ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span
                  className={`mt-1.5 text-[12px] font-medium ${isActive ? (isInvalid ? 'text-destructive' : 'text-foreground') : isInvalid ? 'text-destructive' : 'text-muted-foreground'
                    }`}
                >
                  {step.title}
                </span>
              </button>
              {!isLast && (
                <div className="w-8 sm:w-16 h-[2px] mx-1 rounded-full bg-muted/30 relative overflow-hidden">
                  <div
                    className={`absolute inset-0 transition-transform duration-700 ease-in-out origin-left ${isCompleted ? 'scale-x-100 bg-primary' : 'scale-x-0'
                      }`}
                  />
                  {isInvalid && !isCompleted && (
                    <div className="absolute inset-0 bg-destructive/30 animate-pulse" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
