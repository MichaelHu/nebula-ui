
import React from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  title?: string;
  icon?: boolean;
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', title, children, icon = true, onClose, ...props }, ref) => {
    const variants = {
      default: 'bg-slate-100 text-slate-800 border-slate-200',
      destructive: 'bg-red-50 text-red-900 border-red-200 [&>svg]:text-red-600',
      success: 'bg-green-50 text-green-900 border-green-200 [&>svg]:text-green-600',
      warning: 'bg-yellow-50 text-yellow-900 border-yellow-200 [&>svg]:text-yellow-600',
    };

    const icons = {
      default: <Info className="h-4 w-4" />,
      destructive: <AlertCircle className="h-4 w-4" />,
      success: <CheckCircle className="h-4 w-4" />,
      warning: <AlertCircle className="h-4 w-4" />,
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-slate-950',
          variants[variant],
          className
        )}
        {...props}
      >
        {icon && icons[variant]}
        <div className={cn(icon ? "pl-7" : "", onClose ? "pr-6" : "")}>
            {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
            <div className="text-sm opacity-90">{children}</div>
        </div>
        
        {onClose && (
            <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </button>
        )}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

export { Alert };
