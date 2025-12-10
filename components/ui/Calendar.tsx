
import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

export interface CalendarProps {
  className?: string;
  value?: Date;
  onChange?: (date: Date) => void;
}

export function Calendar({ className, value, onChange }: CalendarProps) {
  // View state tracks which month/year is currently visible
  const [viewDate, setViewDate] = useState(value || new Date());
  
  // Sync view if value changes externally
  useEffect(() => {
    if (value) {
      setViewDate(value);
    }
  }, [value]);

  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Helper: Get number of days in a specific month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper: Get day of week (0-6) for the first day of the month
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onChange?.(newDate);
  };

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();
  
  const numDays = getDaysInMonth(currentYear, currentMonth);
  const startDay = getFirstDayOfMonth(currentYear, currentMonth);
  
  const dates = Array.from({ length: numDays }, (_, i) => i + 1);
  const emptyStart = Array.from({ length: startDay }, (_, i) => i);

  // Helper: Check if two dates are the same day
  const isSameDate = (d1: Date, d2?: Date) => {
    if (!d2) return false;
    return d1.getDate() === d2.getDate() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getFullYear() === d2.getFullYear();
  };

  const today = new Date();

  return (
    <div className={cn("p-4 w-[300px] border border-slate-200 rounded-lg bg-white shadow-sm select-none", className)}>
        <div className="flex items-center justify-between space-x-4 pb-4">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handlePrevMonth}>
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-semibold text-slate-900">
                {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map(day => (
                <div key={day} className="text-[0.8rem] text-slate-500 font-medium text-center w-8 h-8 flex items-center justify-center">
                    {day}
                </div>
            ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
            {emptyStart.map((_, i) => <div key={`empty-${i}`} />)}
            {dates.map(date => {
                const currentDateObj = new Date(currentYear, currentMonth, date);
                const isSelected = isSameDate(currentDateObj, value);
                const isToday = isSameDate(currentDateObj, today);
                
                return (
                    <div 
                        key={date} 
                        onClick={() => handleDateClick(date)}
                        className={cn(
                            "h-9 w-9 text-sm p-0 font-normal flex items-center justify-center rounded-md cursor-pointer transition-all duration-200",
                            isSelected 
                                ? "bg-primary-600 text-white hover:bg-primary-700 shadow-sm" 
                                : "hover:bg-slate-100 text-slate-900",
                            !isSelected && isToday && "text-primary-600 font-bold bg-primary-50 ring-1 ring-primary-200"
                        )}
                    >
                        {date}
                    </div>
                )
            })}
        </div>
    </div>
  );
}
