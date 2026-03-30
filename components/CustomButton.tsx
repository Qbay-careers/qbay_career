'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CustomButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function CustomButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
}: CustomButtonProps) {
  const baseStyles =
    'font-medium rounded-lg transition-all duration-300 hover:scale-105 active:scale-95';

  const variants = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl',
    secondary:
      'bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl',
    outline:
      'border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
}
