
import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
    separator?: React.ReactNode;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, separator = <ChevronRight className="h-4 w-4" />, children, ...props }, ref) => {
    const validChildren = React.Children.toArray(children).filter(React.isValidElement);
    
    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={cn("flex flex-wrap items-center text-sm text-slate-500", className)}
        {...props}
      >
        <ol className="flex flex-wrap items-center gap-2">
            {validChildren.map((child, index) => (
                <li key={index} className="inline-flex items-center gap-2">
                    {child}
                    {index < validChildren.length - 1 && (
                        <span className="text-slate-400" aria-hidden="true">{separator}</span>
                    )}
                </li>
            ))}
        </ol>
      </nav>
    );
  }
);
Breadcrumb.displayName = 'Breadcrumb';

export interface BreadcrumbItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    active?: boolean;
    href?: string;
}

const BreadcrumbItem = React.forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(
    ({ className, active, href, children, ...props }, ref) => {
        const Comp = href ? 'a' : 'span';
        return (
            <Comp
                ref={ref as any}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                    "transition-colors hover:text-slate-900",
                    active ? "font-medium text-slate-900 pointer-events-none" : "",
                    !href && !active ? "pointer-events-none" : "",
                    className
                )}
                {...props}
            >
                {children}
            </Comp>
        )
    }
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

export { Breadcrumb, BreadcrumbItem };
