import React from 'react';
import { cn } from '../../lib/utils';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    className?: string;
    variant?: 'default' | 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

function Tag({ className, variant = 'default', ...props }: TagProps) {
    const variants = {
        default: "bg-slate-100 text-slate-800 border-slate-200",
        blue: "bg-blue-50 text-blue-700 border-blue-200",
        green: "bg-green-50 text-green-700 border-green-200",
        red: "bg-red-50 text-red-700 border-red-200",
        yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
        purple: "bg-purple-50 text-purple-700 border-purple-200"
    };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Tag };