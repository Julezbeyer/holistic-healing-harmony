import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  action?: React.ReactNode;
}

export default function FeatureCard({ title, description, icon: Icon, className, action }: FeatureCardProps) {
  return (
    <div className={cn(
      "bg-white p-8 rounded-xl shadow-card hover-lift flex flex-col", 
      className
    )}>
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-christiane-soft-blue mb-6">
        <Icon className="h-6 w-6 text-christiane-medium-blue" />
      </div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-muted-foreground text-pretty mb-4">{description}</p>
      {action && (
        <div className="mt-auto pt-4">
          {action}
        </div>
      )}
    </div>
  );
}
