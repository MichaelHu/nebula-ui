
import React from 'react';
import { cn } from '../../lib/utils';

interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg' | number;
  align?: 'start' | 'end' | 'center' | 'baseline';
  wrap?: boolean;
}

const Space = React.forwardRef<HTMLDivElement, SpaceProps>(
  ({ className, direction = 'horizontal', size = 'md', align = 'center', wrap = false, ...props }, ref) => {
    
    const gapMap: Record<string, string> = {
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-8'
    };

    const alignMap = {
        start: 'items-start',
        end: 'items-end',
        center: 'items-center',
        baseline: 'items-baseline'
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          direction === 'vertical' ? "flex-col" : "flex-row",
          wrap && direction === 'horizontal' ? "flex-wrap" : "",
          typeof size === 'string' ? gapMap[size] : "",
          alignMap[align],
          className
        )}
        style={typeof size === 'number' ? { gap: size } : undefined}
        {...props}
      />
    );
  }
);
Space.displayName = 'Space';

export { Space };
