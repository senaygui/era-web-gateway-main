
import { cn } from '@/lib/utils';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbItems: {
    label: string;
    href: string;
  }[];
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  breadcrumbItems,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div className={cn("bg-era-orange/5 py-8 md:py-12", className)}>
      <div className="container-custom">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-era-dark mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-era-gray max-w-3xl">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
