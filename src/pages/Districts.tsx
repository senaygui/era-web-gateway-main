import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import useDistricts from '@/hooks/useDistricts';
import { Spinner } from '@/components/ui/spinner';

const Districts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { districts, loading, error } = useDistricts();

  const filteredDistricts = districts.filter(district =>
    district.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    district.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-12">
        <div className="text-center text-red-500">
          <p>Error loading districts. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="ERA Districts"
        description="Explore our district offices across Ethiopia and find contact information for each location."
        breadcrumbItems={[{ label: 'Districts', href: '/districts' }]}
      />

      <div className="container-custom py-12">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Input
            type="text"
            placeholder="Search districts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        </div>

        {/* Districts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDistricts.map((district) => (
            <Card key={district.id} className="h-full flex flex-col">
              {/* Main Image */}
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                {district.main_image_url ? (
                  <img
                    src={district.main_image_url}
                    alt={district.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{district.name}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {district.district_overview}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-5 w-5 text-era-blue flex-shrink-0 mt-0.5" />
                  <span className="text-era-gray line-clamp-2">{district.address}</span>
                </div>
              </CardContent>

              <CardFooter>
                <Link 
                  to={`/districts/${district.id}`}
                  className="w-full"
                >
                  <Button 
                    className="w-full group"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredDistricts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-era-gray">No districts found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Districts; 