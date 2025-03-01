
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  className?: string;
}

export default function TestimonialCard({ quote, author, role, className }: TestimonialCardProps) {
  return (
    <div className={cn(
      "bg-white p-8 rounded-xl shadow-subtle relative", 
      className
    )}>
      <div className="text-4xl text-christiane-light-blue absolute top-4 left-6">"</div>
      <p className="text-lg italic text-pretty mb-6 pt-4">{quote}</p>
      <div>
        <p className="font-medium">{author}</p>
        {role && <p className="text-sm text-muted-foreground">{role}</p>}
      </div>
    </div>
  );
}
