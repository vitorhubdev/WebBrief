import { Check, AlertCircle } from 'lucide-react';

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
                className="flex flex-col items-center group cursor-pointer border-none bg-transparent outline-none focus:ring-0"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-500 transform-gpu ${isActive
                    ? isInvalid
                      ? 'bg-destructive text-destructive-foreground scale-110 shadow-lg shadow-destructive/30 ring-4 ring-destructive/10'
                      : 'bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30 ring-4 ring-primary/10'
                    : isInvalid
                      ? 'bg-destructive/20 text-destructive border border-destructive/20 animate-pulse'
                      : isCompleted
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted/50 text-muted-foreground border border-primary/5'
                    }`}
                >
                  {isInvalid ? <AlertCircle className="w-4 h-4" /> : isCompleted ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span
                  className={`mt-2 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${isActive ? (isInvalid ? 'text-destructive' : 'text-primary') + ' scale-105 opacity-100' : isInvalid ? 'text-destructive opacity-100' : 'text-muted-foreground opacity-50'
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
