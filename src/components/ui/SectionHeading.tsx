
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeading({ 
  title, 
  subtitle, 
  align = 'left',
  className 
}: SectionHeadingProps) {
  return (
    <div 
      className={cn(
        "mb-8 lg:mb-12", 
        {
          'text-center': align === 'center',
          'text-right': align === 'right',
        },
        className
      )}
    >
      <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-era-dark">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-era-gray max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
