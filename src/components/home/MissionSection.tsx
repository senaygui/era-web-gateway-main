
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/SectionHeading';

const MissionSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-era-orange opacity-10 rounded-tl-3xl"></div>
              <img 
                src="https://www.era.gov.et/documents/20182/21705/abbay+bridge/bfa6e473-8126-485f-9283-9e1b339be737?version=1.0&t=1717133982000" 
                alt="ERA Mission" 
                className="rounded-lg shadow-lg relative z-10"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-era-blue opacity-10 rounded-br-3xl"></div>
            </div>
          </div>
          <div>
            <SectionHeading 
              title="Our Mission" 
              subtitle="Connecting Ethiopia through sustainable road infrastructure"
            />
            <div className="space-y-4 text-era-gray">
              <p>
                The Ethiopian Roads Administration is dedicated to developing, expanding, and maintaining a safe and sustainable road network that improves the quality of life for all Ethiopians.
              </p>
              <p>
                We work tirelessly to connect communities, facilitate commerce, and drive economic growth through innovative road infrastructure solutions.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-era-orange/5 p-4 rounded-lg">
                <div className="text-3xl font-bold text-era-orange mb-2">15,000+</div>
                <div className="text-era-gray">Kilometers of roads maintained</div>
              </div>
              <div className="bg-era-blue/5 p-4 rounded-lg">
                <div className="text-3xl font-bold text-era-blue mb-2">200+</div>
                <div className="text-era-gray">Projects completed nationwide</div>
              </div>
            </div>
            <div className="mt-8">
              <Link to="/about">
                <Button className="bg-era-orange hover:bg-era-orange/90">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
