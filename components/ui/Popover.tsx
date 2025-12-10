
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface PopoverProps {
    trigger: React.ReactNode;
    content: React.ReactNode;
    className?: string;
}

export function Popover({ trigger, content, className }: PopoverProps) {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={popoverRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger}
            </div>
            {isOpen && (
                <div 
                    className={cn(
                        "absolute z-50 mt-2 w-64 rounded-md border border-slate-200 bg-white p-4 shadow-md outline-none animate-in fade-in zoom-in-95 duration-200",
                        "left-1/2 -translate-x-1/2", // Center align
                        className
                    )}
                >
                    {content}
                </div>
            )}
        </div>
    );
}
