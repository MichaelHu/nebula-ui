import React from 'react';
import { cn } from '../../lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', ...props }, ref) => {
    const sizeClasses = {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-base"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full bg-slate-100",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src ? (
             <img
                src={src}
                alt={alt}
                className="aspect-square h-full w-full object-cover"
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    // Very basic fallback handling
                    e.currentTarget.parentElement?.querySelector('.fallback')?.classList.remove('hidden');
                }}
            />
        ) : null}
       
        <div className={cn(
            "fallback flex h-full w-full items-center justify-center rounded-full bg-slate-100 font-medium text-slate-600",
            src ? "hidden" : ""
        )}>
            {fallback || alt?.slice(0, 2).toUpperCase() || "UI"}
        </div>
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

export { Avatar };