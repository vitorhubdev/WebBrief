import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center py-4 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-3">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center group">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-500 transform-gpu ${isActive
                    ? 'bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30 ring-4 ring-primary/10'
                    : isCompleted
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted/50 text-muted-foreground border border-primary/5'
                    }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span
                  className={`mt-2 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${isActive ? 'text-primary scale-105 opacity-100' : 'text-muted-foreground opacity-50'
                    }`}
                >
                  {step.title}
                </span>
              </div>
              {!isLast && (
                <div className="w-8 sm:w-16 h-[2px] mx-1 rounded-full bg-muted/30 relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-primary transition-transform duration-700 ease-in-out origin-left ${isCompleted ? 'scale-x-100' : 'scale-x-0'
                      }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
