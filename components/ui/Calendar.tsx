
import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

// NOTE: This is a visual-only implementation for demonstration purposes
// A real calendar needs complex date logic (date-fns or dayjs)

export function Calendar({ className }: { className?: string }) {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const dates = Array.from({ length: 31 }, (_, i) => i + 1);
    
    // Simulate current month starts on Wednesday (index 3)
    const emptyStart = Array.from({ length: 3 }, (_, i) => i);

    return (
        <div className={cn("p-3 w-fit border border-slate-200 rounded-lg bg-white shadow-sm", className)}>
            <div className="flex items-center justify-between space-x-4 pb-4">
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><ChevronLeft className="h-4 w-4" /></Button>
                <div className="text-sm font-medium">October 2025</div>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><ChevronRight className="h-4 w-4" /></Button>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {days.map(day => (
                    <div key={day} className="text-[0.8rem] text-slate-500 font-medium text-center w-8 py-1">
                        {day}
                    </div>
                ))}
                {emptyStart.map(i => <div key={`empty-${i}`} />)}
                {dates.map(date => (
                    <div 
                        key={date} 
                        className={cn(
                            "h-8 w-8 text-sm p-0 font-normal flex items-center justify-center rounded-md cursor-pointer hover:bg-slate-100",
                            date === 24 ? "bg-primary-600 text-white hover:bg-primary-700" : ""
                        )}
                    >
                        {date}
                    </div>
                ))}
            </div>
        </div>
    );
}
