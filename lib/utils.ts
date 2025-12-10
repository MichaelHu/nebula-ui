import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simulated syntax highlighting for the code blocks
export const highlightCode = (code: string) => {
  // Very basic highlighting for demo purposes
  return code
    .replace(/import|from|const|return|function|export|default/g, '<span class="text-purple-600 font-semibold">$&</span>')
    .replace(/'[^']*'/g, '<span class="text-green-600">$&</span>')
    .replace(/"[^"]*"/g, '<span class="text-green-600">$&</span>')
    .replace(/<([A-Z][a-zA-Z0-9]*)/g, '<span class="text-blue-600 font-semibold"><$1</span>')
    .replace(/<\/([A-Z][a-zA-Z0-9]*)/g, '<span class="text-blue-600 font-semibold"></$1</span>')
    .replace(/([a-zA-Z0-9]+)=/g, '<span class="text-sky-600">$1</span>=');
};