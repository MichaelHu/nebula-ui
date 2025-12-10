import React from 'react';
import { cn } from '../../lib/utils';

export interface RadioGroupProps {
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function RadioGroup({ name, options, value, onChange, className }: RadioGroupProps) {
  return (
    <div className={cn("grid gap-2", className)} role="radiogroup">
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-all",
            value === option.value 
                ? "border-primary-600 bg-primary-50 text-primary-900" 
                : "border-slate-200 hover:bg-slate-50 text-slate-900"
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange?.(e.target.value)}
            className="text-primary-600 focus:ring-primary-500 h-4 w-4 border-gray-300 accent-primary-600"
          />
          <span className="text-sm font-medium">{option.label}</span>
        </label>
      ))}
    </div>
  );
}