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
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center gap-2">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                      : isCompleted
                      ? 'bg-primary/90 text-primary-foreground'
                      : 'bg-muted text-muted-foreground border-2 border-muted'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <span
                  className={`mt-2 text-xs font-medium transition-colors ${
                    isActive ? 'text-primary' : isCompleted ? 'text-primary/80' : 'text-muted-foreground'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {!isLast && (
                <div
                  className={`w-12 h-0.5 mx-2 transition-colors ${
                    isCompleted ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
