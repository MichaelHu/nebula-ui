
import React from 'react';
import { cn } from '../../lib/utils';

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = 16 / 9, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative w-full overflow-hidden rounded-lg bg-slate-100", className)}
        style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
        {...props}
      >
        <div className="absolute inset-0 flex items-center justify-center">
            {children}
        </div>
      </div>
    );
  }
);
AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
