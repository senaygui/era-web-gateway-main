import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  headingClassName?: string;
}

export function SectionHeading({ 
  title, 
  subtitle, 
  align = 'left',
  className,
  headingClassName,
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
      <h2 className={cn("font-bold text-2xl md:text-3xl lg:text-4xl text-era-dark", headingClassName)}>
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
