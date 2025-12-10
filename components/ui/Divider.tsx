
import React from 'react';
import { cn } from '../../lib/utils';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "shrink-0 bg-slate-200",
          orientation === 'horizontal' ? "h-[1px] w-full my-4" : "h-full w-[1px] mx-4",
          className
        )}
        {...props}
      />
    );
  }
);
Divider.displayName = 'Divider';

export { Divider };
