import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Globe, ArrowLeft } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { useDistrict } from '@/hooks/useDistricts';
import { ImageViewer } from '@/components/ui/image-viewer';
import { getSocialMediaInfo } from '@/utils/social-media';

const DistrictDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { district, loading, error } = useDistrict(id || '');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (error || !district) {
    return (
      <div className="container-custom py-12">
        <div className="text-center text-red-500">
          <p className="mb-4">{error || 'District not found'}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate('/districts')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Districts
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={district.name}
        description={district.district_overview}
        breadcrumbItems={[
          { label: 'Districts', href: '/districts' },
          { label: district.name, href: `/districts/${district.id}` }
        ]}
      />

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image */}
            {district.main_image_url && (
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <img
                      src={district.main_image_url}
                      alt={district.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Overview Section */}
            <Card>
              <CardContent className="pt-6">
                <SectionHeading title="Overview" />
                <div className="prose max-w-none">
                  <p className="text-justify">{district.district_overview}</p>
                </div>
              </CardContent>
            </Card>

            {/* Detail Description Section */}
            <Card>
              <CardContent className="pt-6">
                <SectionHeading title="About The Districts" />
                <div className="prose max-w-none">
                  <p className="text-justify">{district.detail_description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Gallery Section */}
            {district.gallery_images_urls && district.gallery_images_urls.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <SectionHeading title="Gallery" />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {district.gallery_images_urls.map((imageUrl, index) => (
                      <div 
                        key={index} 
                        className="aspect-square relative rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setSelectedImage(imageUrl)}
                      >
                        <img
                          src={imageUrl}
                          alt={`${district.name} gallery image ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardContent className="pt-6">
                <SectionHeading title="Contact Information" />
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 text-era-blue flex-shrink-0 mt-0.5" />
                    <span className="text-era-gray">{district.address}</span>
                  </div>
                  {district.phone_numbers.length > 0 && (
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 mr-2 text-era-blue flex-shrink-0 mt-0.5" />
                      <div className="text-era-gray">
                        {district.phone_numbers.join(', ')}
                      </div>
                    </div>
                  )}
                  {district.emails.length > 0 && (
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 mr-2 text-era-blue flex-shrink-0 mt-0.5" />
                      <div className="text-era-gray">
                        {district.emails.join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Map Section */}
            {district.map_embed && (
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video w-full h-96">
                    <div 
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{ __html: district.map_embed }} 
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Social Media Links */}
            {district.social_media_links.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <SectionHeading title="Social Media Links" />
                  <div className="space-y-2">
                    {district.social_media_links.map((link, index) => {
                      const { icon: Icon, label } = getSocialMediaInfo(link);
                      return (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center hover:text-era-blue transition-colors"
                        >
                          <Icon className="h-5 w-5 mr-2 text-era-blue flex-shrink-0" />
                          <span>{label}</span>
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Image Viewer */}
      {selectedImage && (
        <ImageViewer
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage}
          imageAlt={`${district.name} gallery image`}
        />
      )}
    </div>
  );
};

export default DistrictDetail; 