import React from 'react';
import { cn } from '../../lib/utils';

export interface TooltipProps {
  content: string;
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({ content, children, position = 'top', className }: TooltipProps) {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-slate-900 border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-900 border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-slate-900 border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-slate-900 border-y-transparent border-l-transparent',
  };

  return (
    <div className={cn("group relative inline-block", className)}>
      {children}
      <div 
        className={cn(
            "absolute z-50 hidden group-hover:block whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-xs text-white shadow-md animate-in fade-in zoom-in-95 duration-200",
            positionClasses[position]
        )}
      >
        {content}
        {/* Arrow */}
        <div 
            className={cn(
                "absolute border-4",
                arrowClasses[position]
            )} 
        />
      </div>
    </div>
  );
}