
// This file is deprecated, use the breadcrumb components from '@/components/ui/breadcrumb' instead
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  items: {
    label: string;
    href: string;
  }[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-1 text-sm", className)}>
      <ol className="flex items-center space-x-1">
        <li className="flex items-center">
          <Link to="/" className="text-era-gray hover:text-era-blue transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-era-gray mx-1" />
              {isLast ? (
                <span className="font-medium text-era-dark">{item.label}</span>
              ) : (
                <Link 
                  to={item.href}
                  className="text-era-gray hover:text-era-blue transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
