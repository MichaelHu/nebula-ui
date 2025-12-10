import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onToggle, className }) => {
    return (
        <div className={cn("border-b border-slate-200", className)}>
            <button
                onClick={onToggle}
                className="flex flex-1 w-full items-center justify-between py-4 font-medium transition-all hover:text-primary-600 [&[data-state=open]>svg]:rotate-180"
                data-state={isOpen ? "open" : "closed"}
            >
                {title}
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-slate-500" />
            </button>
            <div
                className={cn(
                    "overflow-hidden text-sm transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-[500px] pb-4 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="text-slate-600 pt-0">{children}</div>
            </div>
        </div>
    );
}

interface AccordionProps {
    items: { title: string; content: React.ReactNode }[];
    className?: string;
    allowMultiple?: boolean;
}

export function Accordion({ items, className, allowMultiple = false }: AccordionProps) {
    const [openIndices, setOpenIndices] = useState<number[]>([]);

    const handleToggle = (index: number) => {
        if (allowMultiple) {
            setOpenIndices(prev => 
                prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
            );
        } else {
            setOpenIndices(prev => prev.includes(index) ? [] : [index]);
        }
    };

    return (
        <div className={cn("w-full", className)}>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    isOpen={openIndices.includes(index)}
                    onToggle={() => handleToggle(index)}
                >
                    {item.content}
                </AccordionItem>
            ))}
        </div>
    );
}