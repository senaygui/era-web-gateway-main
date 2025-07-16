import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const About = () => {
  // State for about us data from API
  const [aboutData, setAboutData] = useState({
    mission: '',
    vision: '',
    values_title: '',
    values: [],
    mission_image_url: '',
    vision_image_url: '',
    org_structure_image_url: '',
    team_members: [],
    milestones: [],
    achievements: [],
    achievements_description: '',
    team_description: '',
    loading: true,
    error: null,
    // Add default vision highlights
    vision_highlights: [
      {
        title: 'Sustainable Development',
        description: 'Integrating environmental considerations into all our road projects'
      },
      {
        title: 'Community Focus',
        description: 'Prioritizing road projects that deliver maximum benefit to communities'
      }
    ]
  });

  // Fetch about us data from API
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        console.log('Attempting to fetch data from API...');
        const response = await fetch('/api/v1/about', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          mode: 'cors' // Explicitly set CORS mode
        });
        
        console.log('API Response status:', response.status);
        console.log('API Response headers:', response.headers);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error response:', errorText);
          throw new Error(`Failed to fetch about data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('API data received:', data);
        
        // Preserve vision highlights since they're not in the API response
        setAboutData({
          ...data,
          loading: false,
          error: null,
          vision_highlights: aboutData.vision_highlights // Keep the default vision highlights
        });
      } catch (error) {
        console.error('Error fetching about data:', error);
        // Display more detailed error information
        setAboutData(prev => ({
          ...prev,
          loading: false,
          error: `${error.message}. Please check the console for more details.`
        }));
      }
    };

    fetchAboutData();
  }, []);

  // Use API data for leadership team or fallback to mock data
  const leadershipTeam = aboutData.team_members && aboutData.team_members.length > 0
    ? aboutData.team_members.map(member => ({
        name: member.name,
        position: member.title || 'Team Member',
        job_title: member.title || 'Team Member',
        secondary_title: '',
        image: member.image_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s',
        bio: member.description || ''
      }))
    : [
      {
        name: 'Eng Mohammed Abdurahman',
        position: 'Director General',
        job_title: 'Director General',
        secondary_title: '',
        image: 'https://media.licdn.com/dms/image/v2/C4D03AQHbZftmXsydrg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1626751942563?e=1749686400&v=beta&t=XCiNBeocMNoTW1NgHNSS7UtUfSf_J0QbzqFjQTSQKuw',
        bio: 'Mohammed Abdurahman has over 20 years of experience in infrastructure development and has led ERA since 2020.'
      },
      {
        name: 'Ato Daniel Mengestie',
        position: 'Head of Director General Office',
        job_title: 'Head of Director General Office',
        secondary_title: '',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s',
        bio: 'Ato Daniel Mengestie oversees the technical operations and project implementation across all regions.'
      },
      {
        name: 'Daniel Getachew',
        position: 'Chief Engineer',
        job_title: 'Chief Engineer',
        secondary_title: '',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s',
        bio: 'Daniel Getachew leads the engineering team and ensures all road designs meet international standards.'
      }
    ];

  // Use API data for timeline or fallback to mock data
  const timelineEvents = aboutData.milestones && aboutData.milestones.length > 0 
    ? aboutData.milestones.map(milestone => ({
        year: milestone.year,
        title: milestone.title,
        description: milestone.description
      }))
    : [
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

      <motion.section 
        className="py-12 bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
                  {aboutData.loading ? (
                    <div className="animate-pulse">
                      <div className="h-4 bg-era-light rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-era-light rounded w-full mb-4"></div>
                      <div className="h-4 bg-era-light rounded w-5/6 mb-4"></div>
                    </div>
                  ) : aboutData.error ? (
                    <p className="text-era-red mb-6">Error loading mission data. Please try again later.</p>
                  ) : (
                    <div>
                      <p className="text-era-gray mb-6">{aboutData.mission}</p>
                    </div>
                  )}
                  <div className="bg-era-blue/5 p-6 rounded-lg border-l-4 border-era-blue">
                    <p className="text-era-dark italic">
                      "We strive to connect every corner of Ethiopia through quality roads that stand the test of time."
                    </p>
                  </div>
                </div>
                <div>
                  <img 
                    src={aboutData.mission_image_url || "https://www.era.gov.et/documents/20182/21705/abbay+bridge/bfa6e473-8126-485f-9283-9e1b339be737?version=1.0&t=1717133982000"}
                    alt="Road infrastructure"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
                <div className="order-2 lg:order-1">
                  <img 
                    src={aboutData.vision_image_url || "https://www.era.gov.et/documents/20182/21901/photo_2025-03-27_09-56-51.jpg/76252460-10db-439f-b987-96cca2a04d0f?t=1743146821232"}
                    alt="Future vision"
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <SectionHeading title="Our Vision" />
                  {aboutData.loading ? (
                    <div className="animate-pulse">
                      <div className="h-4 bg-era-light rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-era-light rounded w-full mb-4"></div>
                      <div className="h-4 bg-era-light rounded w-5/6 mb-4"></div>
                    </div>
                  ) : aboutData.error ? (
                    <p className="text-era-red mb-6">Error loading vision data. Please try again later.</p>
                  ) : (
                    <div>
                      <p className="text-era-gray mb-6">{aboutData.vision}</p>
                    </div>
                  )}
                  {!aboutData.loading && !aboutData.error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {aboutData.vision_highlights && aboutData.vision_highlights.map((highlight, index) => (
                        <div key={index} className="bg-era-light p-4 rounded-lg">
                          <div className="font-bold text-xl text-era-blue mb-2">{highlight.title}</div>
                          <p className="text-era-gray text-sm">{highlight.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-era-light p-8 rounded-lg mt-12">
                <SectionHeading title={aboutData.values_title || "Our Core Values"} align="center" />
                {aboutData.loading ? (
                  <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="h-32 bg-era-light rounded"></div>
                    ))}
                  </div>
                ) : aboutData.error ? (
                  <p className="text-era-red text-center mt-8">Error loading values data. Please try again later.</p>
                ) : aboutData.values && aboutData.values.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                    {aboutData.values.map((value, index) => {
                      // Define border colors based on index
                      const borderColors = ['border-era-blue', 'border-era-green', 'border-era-gold', 'border-era-red'];
                      const borderColor = borderColors[index % borderColors.length];
                      
                      return (
                        <Card key={index} className={`border-t-4 ${borderColor}`}>
                          <CardContent className="pt-6">
                            <h3 className="font-bold text-xl mb-2">{value.title}</h3>
                            <p className="text-era-gray text-sm">{value.description}</p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-era-gray">No core values found. Please add values in the admin panel.</p>
                  </div>
                )}
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
              <div className="relative max-w-4xl mx-auto py-10">
                {/* Vertical line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-era-blue"></div>
                
                <div className="space-y-24">
                  {timelineEvents.map((event, index) => (
                    <div key={event.year} className="relative">
                      {/* Timeline node */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-era-blue border-4 border-white z-10 shadow-md"></div>
                      
                      {/* Content */}
                      <div className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <div className={`w-5/12 ${index % 2 === 0 ? 'pr-16' : 'pl-16'} text-left`}>
                          <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-era-blue font-bold text-2xl mb-2">{event.year}</div>
                            <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                            <p className="text-era-gray">{event.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Mobile Timeline (vertical, single column) */}
                <div className="md:hidden mt-8">
                  <div className="space-y-12">
                    {timelineEvents.map((event) => (
                      <div key={event.year} className="flex">
                        <div className="mr-4 relative">
                          <div className="h-full w-1 bg-era-blue"></div>
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-era-blue border-2 border-white"></div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-white p-4 rounded-lg shadow-md">
                            <div className="text-era-blue font-bold text-xl mb-1">{event.year}</div>
                            <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                            <p className="text-era-gray text-sm">{event.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-era-light p-8 rounded-lg mt-12">
                <SectionHeading 
                  title="Major Achievements" 
                  subtitle={aboutData.achievements_description || "Over the decades, ERA has accomplished significant milestones in Ethiopia's road development."}
                  align="center"
                />
                {aboutData.loading ? (
                  <div className="animate-pulse grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="h-40 bg-white rounded-lg opacity-60"></div>
                    ))}
                  </div>
                ) : aboutData.error ? (
                  <p className="text-era-red text-center mt-8">Error loading achievements data. Please try again later.</p>
                ) : aboutData.achievements && aboutData.achievements.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {aboutData.achievements.map((achievement, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="text-3xl font-bold text-era-blue mb-3">{achievement.stats || achievement.title}</div>
                        <h3 className="font-semibold text-lg mb-2">{achievement.title || "Achievement"}</h3>
                        <p className="text-era-gray text-sm">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
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
                      <h3 className="font-semibold text-lg mb-2">Bridges Constructed</h3>
                      <p className="text-era-gray text-sm">
                        Built over 200 bridges connecting previously isolated communities.
                      </p>
                    </div>
                  </div>
                )}
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
                
                {aboutData.loading ? (
                  <div className="animate-pulse flex justify-center">
                    <div className="h-96 w-full max-w-4xl bg-gray-200 rounded"></div>
                  </div>
                ) : aboutData.error ? (
                  <div className="text-center text-era-red p-4">
                    <p>Error loading organizational structure. Please try again later.</p>
                  </div>
                ) : aboutData.org_structure_image_url ? (
                  <div className="flex justify-center">
                    <img 
                      src={aboutData.org_structure_image_url} 
                      alt="ERA Organizational Structure" 
                      className="max-w-full h-auto rounded-lg shadow-sm"
                    />
                  </div>
                ) : (
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
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Leadership Team */}
              <div>
                <SectionHeading 
                  title="Leadership Team" 
                  subtitle={aboutData.team_description || "Meet the dedicated professionals leading ERA's mission to develop Ethiopia's road infrastructure."}
                  align="center"
                />
                
                {aboutData.loading ? (
                  <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="bg-white rounded-lg overflow-hidden shadow-sm">
                        <div className="aspect-square bg-gray-200"></div>
                        <div className="p-6 space-y-3">
                          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-16 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : aboutData.error ? (
                  <div className="text-center text-era-red p-4 mt-8">
                    <p>Error loading team data. Please try again later.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    {leadershipTeam.map((leader) => (
                      <div key={leader.name} className="overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                        {/* Image Section */}
                        <div className="aspect-square overflow-hidden">
                          <img 
                            src={leader.image} 
                            alt={leader.name}
                            className="object-cover w-full h-full"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/300x300?text=ERA';
                            }}
                          />
                        </div>
                        
                        {/* Content Section */}
                        <div className="p-6 pb-8">
                          {/* Name */}
                          <h3 className="font-bold text-2xl text-gray-900 mb-2">{leader.name}</h3>
                          
                          {/* Job Title */}
                          <div className="text-era-blue font-medium text-xl mb-4">
                            {leader.position}
                          </div>
                          
                          {/* Job Description */}
                          <p className="text-gray-500 text-sm">{leader.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>
    </>
  );
};

export default About;
