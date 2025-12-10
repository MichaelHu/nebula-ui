import React from 'react';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const uniqueId = id || React.useId();
    
    return (
      <div className="flex items-center space-x-2">
        <div className="relative flex items-center">
            <input
                type="checkbox"
                id={uniqueId}
                className={cn(
                    "peer h-4 w-4 shrink-0 rounded-sm border border-slate-300 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary-600 checked:border-primary-600 appearance-none cursor-pointer",
                    className
                )}
                ref={ref}
                {...props}
            />
            <Check className="absolute top-0 left-0 h-4 w-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" strokeWidth={3} />
        </div>
        
        {label && (
          <label
            htmlFor={uniqueId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-slate-900"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };