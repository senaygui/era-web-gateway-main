import React, { useState, useEffect } from 'react';
import useVacancies from '@/hooks/useVacancies';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Briefcase, Calendar, MapPin, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Vacancies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const { toast } = useToast();
  
  // Use the useVacancies hook to fetch data
  const { 
    vacancies: apiVacancies, 
    loading, 
    error,
    getActiveVacancies 
  } = useVacancies();
  
  // Update vacancies when API data is loaded
  const [vacancies, setVacancies] = React.useState(apiVacancies);
  
  // Update vacancies when API data is loaded
  React.useEffect(() => {
    if (apiVacancies && apiVacancies.length > 0) {
      setVacancies(apiVacancies);
    } else if (error) {
      console.error('Error fetching vacancies:', error);
      toast({
        title: "Warning",
        description: "Could not load vacancies.",
        variant: "destructive"
      });
    }
  }, [apiVacancies, error, toast]);
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-era-blue"></div>
        <span className="ml-4 text-lg">Loading vacancies...</span>
      </div>
    );
  }

  // Filter vacancies based on search and filters
  const filteredVacancies = vacancies.filter(vacancy => {
    const matchesSearch = searchQuery === '' || 
      vacancy.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      vacancy.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vacancy.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = selectedLocation === 'all' || vacancy.location === selectedLocation;
    const matchesType = selectedType === 'all' || vacancy.type === selectedType;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  // Get unique locations and types for filters
  const locations = [...new Set(vacancies.map(v => v.location))];
  const types = [...new Set(vacancies.map(v => v.type))];

  // Handle application submission
  const handleApply = (vacancyId: number) => {
    toast({
      title: "Application Received",
      description: "Your application has been submitted successfully. We will contact you if you are shortlisted.",
    });
    console.log("Applied for vacancy ID:", vacancyId);
  };

  return (
    <div>
      <PageHeader
        title="Career Opportunities"
        description="Join our team at the Ethiopian Roads Administration and contribute to the development of Ethiopia's road infrastructure."
        breadcrumbItems={[{ label: 'Vacancies', href: '/vacancies' }]}
      />

      <div className="container-custom py-12">
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search positions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          </div>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {types.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Vacancies List */}
        <div className="space-y-6">
          {filteredVacancies.length > 0 ? (
            filteredVacancies.map(vacancy => (
              <Card key={vacancy.id} className="hover:border-era-blue transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-era-dark">{vacancy.title}</CardTitle>
                      <CardDescription className="text-base mt-1">{vacancy.department}</CardDescription>
                    </div>
                    <div className="bg-era-blue/10 py-1 px-3 rounded-full text-era-blue text-sm font-medium">
                      {vacancy.type}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">{vacancy.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-era-blue" />
                        <span>{vacancy.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-era-blue" />
                        <span>Posted: {vacancy.postedDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-era-blue" />
                        <span>Deadline: {vacancy.deadline}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View Details</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl">{vacancy.title}</DialogTitle>
                        <DialogDescription className="text-base">
                          {vacancy.department} | {vacancy.location} | {vacancy.type}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 mt-4">
                        <div>
                          <h4 className="font-semibold mb-2">Job Description</h4>
                          <p>{vacancy.description}</p>
                        </div>
                        
                        {/* Requirements Section */}
                        <div>
                          <h4 className="font-semibold mb-2">Requirements</h4>
                          {Array.isArray(vacancy.requirements) && vacancy.requirements.length > 0 ? (
                            <ul className="list-disc pl-5 space-y-1">
                              {vacancy.requirements.map((req: any, index: number) => {
                                // Convert to string and trim, in case it's not already a string
                                const requirement = String(req || '').trim();
                                return requirement ? <li key={index}>{requirement}</li> : null;
                              })}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground">No specific requirements listed.</p>
                          )}
                        </div>
                        
                        {/* Responsibilities Section */}
                        <div>
                          <h4 className="font-semibold mb-2">Responsibilities</h4>
                          {Array.isArray(vacancy.responsibilities) && vacancy.responsibilities.length > 0 ? (
                            <ul className="list-disc pl-5 space-y-1">
                              {vacancy.responsibilities.map((resp: any, index: number) => {
                                // Convert to string and trim, in case it's not already a string
                                const responsibility = String(resp || '').trim();
                                return responsibility ? <li key={index}>{responsibility}</li> : null;
                              })}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground">No specific responsibilities listed.</p>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Compensation & Benefits</h4>
                          <p><span className="font-medium">Salary:</span> {vacancy.salary}</p>
                          <p className="font-medium mt-2">Benefits:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            {vacancy.benefits.map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Application Timeline</h4>
                          <p><span className="font-medium">Posted Date:</span> {vacancy.postedDate}</p>
                          <p><span className="font-medium">Application Deadline:</span> {vacancy.deadline}</p>
                        </div>
                      </div>
                      
                      <DialogFooter className="mt-6">
                        <Button onClick={() => handleApply(vacancy.id)}>
                          Apply Now
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Button onClick={() => handleApply(vacancy.id)}>
                    <Briefcase className="mr-2 h-4 w-4" />
                    Apply Now
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No Vacancies Found</h3>
              <p className="text-muted-foreground">
                No positions matching your criteria are currently available. 
                Please try different search terms or check back later.
              </p>
            </div>
          )}
        </div>

        {/* Application Information */}
        <div className="mt-12 bg-muted/50 rounded-lg p-6 md:p-8">
          <SectionHeading 
            title="How to Apply" 
            subtitle="Follow these guidelines to submit your application for positions at the Ethiopian Roads Administration."
          />
          
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h4 className="font-semibold text-lg">Application Requirements</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Updated CV/Resume (PDF format)</li>
                  <li>Cover Letter specifically addressing the position requirements</li>
                  <li>Copies of academic credentials and certifications</li>
                  <li>Professional references</li>
                  <li>Valid ID or passport copy</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-lg">Selection Process</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Application screening</li>
                  <li>Written examination (for technical positions)</li>
                  <li>Interview with selection committee</li>
                  <li>Reference checks</li>
                  <li>Final selection and job offer</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-yellow-800">
                <span className="font-semibold">Important Note:</span> The Ethiopian Roads Administration does not charge any fees during the recruitment process. Beware of fraudulent job offers requesting payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vacancies;
