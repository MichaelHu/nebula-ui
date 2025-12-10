
import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from './Button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  
  const renderPageNumbers = () => {
    const pages = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        pages.push(1);
        if (showEllipsisStart) pages.push('...');
        
        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);
        
        if (currentPage <= 3) { start = 2; end = 4; }
        if (currentPage >= totalPages - 2) { start = totalPages - 3; end = totalPages - 1; }

        for (let i = start; i <= end; i++) pages.push(i);

        if (showEllipsisEnd) pages.push('...');
        pages.push(totalPages);
    }

    return pages.map((page, idx) => {
        if (page === '...') {
            return (
                <span key={`ellipsis-${idx}`} className="flex h-9 w-9 items-center justify-center text-slate-400">
                    <MoreHorizontal className="h-4 w-4" />
                </span>
            );
        }
        return (
            <Button
                key={page}
                variant={currentPage === page ? 'primary' : 'outline'}
                size="sm"
                className={cn("w-9 px-0", currentPage === page ? "" : "border-slate-200 text-slate-600 hover:bg-slate-50")}
                onClick={() => onPageChange(page as number)}
            >
                {page}
            </Button>
        );
    });
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="outline"
        size="sm"
        className="px-2 border-slate-200 text-slate-600"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        上一页
      </Button>
      
      <div className="flex items-center gap-1">
        {renderPageNumbers()}
      </div>

      <Button
        variant="outline"
        size="sm"
        className="px-2 border-slate-200 text-slate-600"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        下一页
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
