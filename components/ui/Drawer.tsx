import React, { useEffect } from 'react';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  title?: string;
  children?: React.ReactNode;
}

export function Drawer({ isOpen, onClose, position = 'right', title, children }: DrawerProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const slideClass = position === 'right' 
    ? (isOpen ? 'translate-x-0' : 'translate-x-full') 
    : (isOpen ? 'translate-x-0' : '-translate-x-full');

  const positionClass = position === 'right' ? 'right-0 top-0 h-full border-l' : 'left-0 top-0 h-full border-r';

  return (
    <div className={cn("fixed inset-0 z-50 flex", isOpen ? "pointer-events-auto" : "pointer-events-none")}>
      {/* Backdrop */}
      <div 
        className={cn(
            "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300", 
            isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={cn(
          "fixed w-[300px] sm:w-[400px] bg-white shadow-xl transition-transform duration-300 ease-in-out p-6",
          positionClass,
          slideClass
      )}>
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button 
                onClick={onClose}
                className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
        <div className="overflow-y-auto h-full pb-20">
            {children}
        </div>
      </div>
    </div>
  );
}