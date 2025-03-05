
import { cn } from "@/lib/utils";
import React from "react";

interface CardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function CardContainer({ 
  children, 
  className, 
  ...props 
}: CardContainerProps) {
  return (
    <div 
      className={cn(
        "max-w-md w-full p-8 bg-white rounded-xl shadow-card", 
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}
