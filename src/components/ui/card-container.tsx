
import React from 'react';
import { cn } from '@/lib/utils';

interface CardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContainer: React.FC<CardContainerProps> = ({ 
  children, 
  className, 
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};
