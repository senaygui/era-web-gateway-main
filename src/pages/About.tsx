
import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  // Mock data for organizational structure
  const leadershipTeam = [
    {
      name: 'Eng Mohammed Abdurahman',
      position: 'Director General',
      image: 'https://media.licdn.com/dms/image/v2/C4D03AQHbZftmXsydrg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1626751942563?e=1749686400&v=beta&t=XCiNBeocMNoTW1NgHNSS7UtUfSf_J0QbzqFjQTSQKuw',
      bio: 'Mohammed Abdurahman has over 20 years of experience in infrastructure development and has led ERA since 2020.'
    },
    {
      name: 'Ato Daniel Mengestie',
      position: 'Head of Director General Office',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s',
      bio: 'Ato Daniel Mengestie oversees the technical operations and project implementation across all regions.'
    },
    {
      name: 'Daniel Getachew',
      position: 'Chief Engineer',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s',
      bio: 'Daniel Getachew leads the engineering team and ensures all road designs meet international standards.'
    },
    {
      name: 'Sara Mohammed',
      position: 'Director of Finance',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s',
      bio: 'Sara Mohammed manages ERA\'s budget and financial operations, ensuring transparent use of resources.'
    }
  ];

  // Timeline data
  const timelineEvents = [
    {
      year: '1951',
      title: 'Establishment',
      description: 'The Imperial Highway Authority, predecessor to ERA, was established.'
    },
    {
      year: '1968',
      title: 'Expansion',
      description: 'The organization was restructured to expand its mandate and scope of operations.'
    },
    {
      year: '1997',
      title: 'Reform',
      description: 'Renamed as Ethiopian Roads Administration with a renewed mission to modernize road infrastructure.'
    },
    {
      year: '2005',
      title: 'RSDP Phase I',
      description: 'Launched the Road Sector Development Program, a comprehensive plan for national road network.'
    },
    {
      year: '2015',
      title: 'Modernization',
      description: 'Implemented new technologies and methods in road construction and maintenance.'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Began digital transformation initiative to enhance efficiency and transparency.'
    }
  ];

  return (
    <>
      <PageHeader
        title="About Ethiopian Roads Administration"
        description="Connecting Ethiopia through sustainable road infrastructure development and maintenance."
        breadcrumbItems={[{ label: 'About Us', href: '/about' }]}
      />

      <section className="py-12 bg-white">
        <div className="container-custom">
          <Tabs defaultValue="mission">
            <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
              <TabsTrigger value="mission">Mission & Vision</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="structure">Structure</TabsTrigger>
            </TabsList>

            {/* Mission & Vision Tab */}
            <TabsContent value="mission" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <SectionHeading title="Our Mission" />
                  <p className="text-era-gray mb-6">
                    The Ethiopian Roads Administration is mandated to develop and administer the country's road network in a manner that is compatible with the nation's development policies and priorities.
                  </p>
                  <p className="text-era-gray mb-6">
                    We are committed to providing safe, efficient, and sustainable road infrastructure that connects communities, facilitates commerce, and drives economic growth throughout Ethiopia.
                  </p>
                  <div className="bg-era-blue/5 p-6 rounded-lg border-l-4 border-era-blue">
                    <p className="text-era-dark italic">
                      "We strive to connect every corner of Ethiopia through quality roads that stand the test of time."
                    </p>
                  </div>
                </div>
                <div>
                  <img 
                    src="https://www.era.gov.et/documents/20182/21705/abbay+bridge/bfa6e473-8126-485f-9283-9e1b339be737?version=1.0&t=1717133982000"
                    alt="Road infrastructure"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
                <div className="order-2 lg:order-1">
                  <img 
                    src="https://www.era.gov.et/documents/20182/21901/photo_2025-03-27_09-56-51.jpg/76252460-10db-439f-b987-96cca2a04d0f?t=1743146821232"
                    alt="Future vision"
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <SectionHeading title="Our Vision" />
                  <p className="text-era-gray mb-6">
                    To be a world-class road authority that provides a safe, reliable, and sustainable road network that supports Ethiopia's growth and transformation.
                  </p>
                  <p className="text-era-gray mb-6">
                    We envision an Ethiopia where all communities are connected through high-quality roads, providing access to essential services, markets, and opportunities.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-era-light p-4 rounded-lg">
                      <div className="font-bold text-xl text-era-blue mb-2">Sustainable Development</div>
                      <p className="text-era-gray text-sm">Integrating environmental considerations into all our road projects</p>
                    </div>
                    <div className="bg-era-light p-4 rounded-lg">
                      <div className="font-bold text-xl text-era-blue mb-2">Community Focus</div>
                      <p className="text-era-gray text-sm">Prioritizing road projects that deliver maximum benefit to communities</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-era-light p-8 rounded-lg mt-12">
                <SectionHeading title="Our Core Values" align="center" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                  <Card className="border-t-4 border-era-blue">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-xl mb-2">Excellence</h3>
                      <p className="text-era-gray text-sm">
                        We are committed to excellence in all our projects and services, adhering to international standards.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-t-4 border-era-green">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-xl mb-2">Integrity</h3>
                      <p className="text-era-gray text-sm">
                        We maintain the highest standards of honesty, transparency, and ethical conduct.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-t-4 border-era-gold">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-xl mb-2">Innovation</h3>
                      <p className="text-era-gray text-sm">
                        We embrace new technologies and methodologies to improve our road infrastructure.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-t-4 border-era-red">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-xl mb-2">Collaboration</h3>
                      <p className="text-era-gray text-sm">
                        We work together with stakeholders, communities, and partners to achieve shared goals.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-9">
              <div className="max-w-3xl mx-auto mb-12">
                <SectionHeading 
                  title="Our History" 
                  subtitle="Since 1951, the Ethiopian Roads Administration has been at the forefront of developing Ethiopia's road infrastructure."
                  align="center" 
                />
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-era-blue/20"></div>
                
                <div className="space-y-12">
                  {timelineEvents.map((event, index) => (
                    <div key={event.year} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      {/* Timeline content */}
                      <div className="w-5/12"></div>
                      
                      {/* Center dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-era-blue flex items-center justify-center z-10">
                        <div className="w-4 h-4 rounded-full bg-white"></div>
                      </div>
                      
                      {/* Content card */}
                      <div className={`w-5/12 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-era-blue animate-fade-in">
                          <div className="text-era-blue font-bold text-2xl mb-2">{event.year}</div>
                          <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                          <p className="text-era-gray">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-era-light p-8 rounded-lg mt-12">
                <SectionHeading 
                  title="Major Achievements" 
                  subtitle="Over the decades, ERA has accomplished significant milestones in Ethiopia's road development."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-era-blue mb-3">15,000+</div>
                    <h3 className="font-semibold text-lg mb-2">Kilometers of Roads</h3>
                    <p className="text-era-gray text-sm">
                      Successfully constructed and maintained over 15,000 kilometers of roads across Ethiopia.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-era-blue mb-3">85%</div>
                    <h3 className="font-semibold text-lg mb-2">Increased Connectivity</h3>
                    <p className="text-era-gray text-sm">
                      Increased the road network density by 85% over the past two decades.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-era-blue mb-3">200+</div>
                    <h3 className="font-semibold text-lg mb-2">Major Projects</h3>
                    <p className="text-era-gray text-sm">
                      Completed over 200 major road construction and rehabilitation projects.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Organizational Structure Tab */}
            <TabsContent value="structure" className="space-y-8">
              <div className="max-w-3xl mx-auto mb-12">
                <SectionHeading 
                  title="Organizational Structure" 
                  subtitle="Our structure is designed to ensure efficient planning, implementation, and maintenance of road infrastructure."
                  align="center" 
                />
              </div>

              {/* Organizational Chart */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-12">
                <h3 className="text-xl font-bold mb-6 text-center">ERA Organizational Chart</h3>
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-col items-center">
                    {/* Director General */}
                    <div className="w-64 p-4 bg-era-blue text-white rounded-lg text-center mb-6">
                      <div className="font-bold">Director General</div>
                    </div>
                    
                    {/* Connect Line */}
                    <div className="w-1 h-8 bg-era-gray"></div>
                    
                    {/* Deputy Directors */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full">
                      <div className="w-full p-3 bg-era-blue/80 text-white rounded-lg text-center">
                        <div className="font-medium">Deputy Director<br />(Technical)</div>
                      </div>
                      <div className="w-full p-3 bg-era-blue/80 text-white rounded-lg text-center">
                        <div className="font-medium">Deputy Director<br />(Operations)</div>
                      </div>
                      <div className="w-full p-3 bg-era-blue/80 text-white rounded-lg text-center">
                        <div className="font-medium">Deputy Director<br />(Administration)</div>
                      </div>
                    </div>
                    
                    {/* Connect Lines */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-6">
                      <div className="flex flex-col items-center">
                        <div className="w-1 h-8 bg-era-gray"></div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-1 h-8 bg-era-gray"></div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-1 h-8 bg-era-gray"></div>
                      </div>
                    </div>
                    
                    {/* Departments */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                      <div className="w-full p-3 bg-era-light border border-era-blue/20 rounded-lg text-center">
                        <div className="font-medium text-era-dark">Engineering & Design</div>
                      </div>
                      <div className="w-full p-3 bg-era-light border border-era-blue/20 rounded-lg text-center">
                        <div className="font-medium text-era-dark">Project Management</div>
                      </div>
                      <div className="w-full p-3 bg-era-light border border-era-blue/20 rounded-lg text-center">
                        <div className="font-medium text-era-dark">Planning & Research</div>
                      </div>
                      <div className="w-full p-3 bg-era-light border border-era-blue/20 rounded-lg text-center">
                        <div className="font-medium text-era-dark">Road Maintenance</div>
                      </div>
                      <div className="w-full p-3 bg-era-light border border-era-blue/20 rounded-lg text-center">
                        <div className="font-medium text-era-dark">Regional Offices</div>
                      </div>
                      <div className="w-full p-3 bg-era-light border border-era-blue/20 rounded-lg text-center">
                        <div className="font-medium text-era-dark">Quality Control</div>
                      </div>
                      <div className="w-full p-3 bg-era-light border border-era-blue/20 rounded-lg text-center">
                        <div className="font-medium text-era-dark">Human Resources</div>
                      </div>
                      <div className="w-full p-3 bg-era-light border border-era-blue/20 rounded-lg text-center">
                        <div className="font-medium text-era-dark">Finance & Procurement</div>
                      </div>
                      <div className="w-full p-3 bg-era-light border border-era-blue/20 rounded-lg text-center">
                        <div className="font-medium text-era-dark">Communications</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leadership Team */}
              <div>
                <SectionHeading title="Leadership Team" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {leadershipTeam.map((leader) => (
                    <Card key={leader.name} className="overflow-hidden">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={leader.image} 
                          alt={leader.name}
                          className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                      <CardContent className="pt-6">
                        <h3 className="font-bold text-xl mb-1">{leader.name}</h3>
                        <div className="text-era-blue font-medium mb-3">{leader.position}</div>
                        <p className="text-era-gray text-sm">{leader.bio}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default About;
