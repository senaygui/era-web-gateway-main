
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export interface QuickLinkItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

interface QuickLinksProps {
  links: QuickLinkItem[];
}

const QuickLinks: React.FC<QuickLinksProps> = ({ links }) => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link, index) => (
            <Link to={link.link} key={index}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="mb-2">{link.icon}</div>
                  <CardTitle className="text-xl">{link.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-era-gray">{link.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="text-era-orange p-0 hover:bg-transparent hover:underline">
                    <span>View More</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
