
import React, { useState } from 'react';
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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Search, 
  FileText, 
  Download, 
  Calendar, 
  Eye, 
  BookOpen, 
  FileArchive,
  File,
  FileSpreadsheet,
  FileImage
} from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Sample publications data
const publicationsList = [
  {
    id: 1,
    title: "Ethiopian Road Design Manual 2025",
    category: "Technical Manual",
    year: 2025,
    publishDate: new Date(2025, 2, 15), // March 15, 2025
    fileSize: "24.5 MB",
    fileType: "pdf",
    author: "Ethiopian Roads Administration",
    thumbnail: "https://placehold.co/400x500/e5edff/1a44b8?text=Road+Design+Manual",
    description: "This comprehensive manual provides guidelines and standards for road design in Ethiopia. It covers geometric design, pavement design, drainage, bridges, and road safety features. The manual is aligned with international best practices while addressing the specific conditions and requirements of Ethiopia.",
    downloadCount: 1250,
    isNew: true
  },
  {
    id: 2,
    title: "Annual Performance Report 2024",
    category: "Report",
    year: 2024,
    publishDate: new Date(2024, 11, 20), // December 20, 2024
    fileSize: "8.2 MB",
    fileType: "pdf",
    author: "Ethiopian Roads Administration",
    thumbnail: "https://placehold.co/400x500/e5edff/1a44b8?text=Annual+Report+2024",
    description: "The Annual Performance Report provides a comprehensive overview of ERA's achievements, challenges, and financial performance for the fiscal year 2024. It includes details on completed projects, ongoing works, budget utilization, and future plans.",
    downloadCount: 872,
    isNew: true
  },
  {
    id: 3,
    title: "Road Network Condition Survey 2024",
    category: "Research",
    year: 2024,
    publishDate: new Date(2024, 10, 10), // November 10, 2024
    fileSize: "15.8 MB",
    fileType: "pdf",
    author: "ERA Planning Department",
    thumbnail: "https://placehold.co/400x500/e5edff/1a44b8?text=Network+Survey",
    description: "This research document presents the findings of the nationwide road condition survey conducted in 2024. It provides data on the current state of Ethiopia's federal road network, including pavement condition, structures, and road furniture. The report identifies maintenance needs and priorities for future interventions.",
    downloadCount: 645,
    isNew: false
  },
  {
    id: 4,
    title: "Road Asset Management Guidelines",
    category: "Guidelines",
    year: 2024,
    publishDate: new Date(2024, 8, 5), // September 5, 2024
    fileSize: "6.4 MB",
    fileType: "pdf",
    author: "ERA Maintenance Directorate",
    thumbnail: "https://placehold.co/400x500/e5edff/1a44b8?text=Asset+Management",
    description: "These guidelines provide a framework for the management of road assets in Ethiopia. They cover inventory management, condition assessment, maintenance planning, and budget allocation. The document aims to improve the efficiency and effectiveness of road maintenance operations.",
    downloadCount: 523,
    isNew: false
  },
  {
    id: 5,
    title: "Road Construction Cost Index 2024",
    category: "Statistical Data",
    year: 2024,
    publishDate: new Date(2024, 7, 15), // August 15, 2024
    fileSize: "4.2 MB",
    fileType: "xlsx",
    author: "ERA Cost Management Team",
    thumbnail: "https://placehold.co/400x500/e5edff/1a44b8?text=Cost+Index+2024",
    description: "This Excel spreadsheet provides detailed information on road construction costs in Ethiopia for 2024. It includes unit rates for various work items, regional cost variations, and historical trends. The data is useful for project planning, budgeting, and cost estimation.",
    downloadCount: 489,
    isNew: false
  },
  {
    id: 6,
    title: "Bridge Design Specifications",
    category: "Technical Manual",
    year: 2023,
    publishDate: new Date(2023, 5, 20), // June 20, 2023
    fileSize: "18.6 MB",
    fileType: "pdf",
    author: "ERA Bridge Department",
    thumbnail: "https://placehold.co/400x500/e5edff/1a44b8?text=Bridge+Design",
    description: "These specifications provide technical requirements for the design and construction of bridges on Ethiopia's road network. The document covers structural design, materials, construction methods, quality control, and maintenance considerations for various types of bridges.",
    downloadCount: 732,
    isNew: false
  },
  {
    id: 7,
    title: "Road Safety Strategy 2023-2030",
    category: "Strategy Document",
    year: 2023,
    publishDate: new Date(2023, 3, 10), // April 10, 2023
    fileSize: "5.8 MB",
    fileType: "pdf",
    author: "ERA Safety Department",
    thumbnail: "https://placehold.co/400x500/e5edff/1a44b8?text=Safety+Strategy",
    description: "This strategy document outlines ERA's approach to improving road safety on Ethiopia's federal road network from 2023 to 2030. It identifies key challenges, sets targets, and defines interventions across engineering, education, enforcement, and emergency response aspects of road safety.",
    downloadCount: 856,
    isNew: false
  },
  {
    id: 8,
    title: "Environmental and Social Impact Assessment Framework",
    category: "Guidelines",
    year: 2023,
    publishDate: new Date(2023, 1, 15), // February 15, 2023
    fileSize: "7.2 MB",
    fileType: "pdf",
    author: "ERA Environmental Management Unit",
    thumbnail: "https://placehold.co/400x500/e5edff/1a44b8?text=ESIA+Framework",
    description: "This framework provides guidelines for conducting Environmental and Social Impact Assessments (ESIA) for road projects in Ethiopia. It covers screening, scoping, impact assessment, mitigation measures, and monitoring plans in accordance with national regulations and international standards.",
    downloadCount: 614,
    isNew: false
  },
  {
    id: 9,
    title: "Road Network Map of Ethiopia 2023",
    category: "Map",
    year: 2023,
    publishDate: new Date(2023, 0, 25), // January 25, 2023
    fileSize: "45.3 MB",
    fileType: "jpg",
    author: "ERA GIS Department",
    thumbnail: "https://placehold.co/400x500/e5edff/1a44b8?text=Road+Network+Map",
    description: "This high-resolution map shows Ethiopia's classified road network as of January 2023. It includes federal highways, regional roads, and key rural links. The map is color-coded by road class and surface type, and includes major settlements, administrative boundaries, and terrain features.",
    downloadCount: 1876,
    isNew: false
  },
  {
    id: 10,
    title: "Road Maintenance Manual",
    category: "Technical Manual",
    year: 2022,
    publishDate: new Date(2022, 5, 10), // June 10, 2022
    fileSize: "16.4 MB",
    fileType: "pdf",
    author: "ERA Maintenance Directorate",
    thumbnail: "https://placehold.co/400x500/e5edff/1a44b8?text=Maintenance+Manual",
    description: "This manual provides guidelines and procedures for routine and periodic maintenance of roads in Ethiopia. It covers pavement maintenance, drainage systems, bridges, road furniture, and emergency works. The document includes specifications, best practices, and quality control procedures.",
    downloadCount: 924,
    isNew: false
  },
  {
    id: 11,
    title: "Standard Specifications for Road Works",
    category: "Technical Manual",
    year: 2022,
    publishDate: new Date(2022, 2, 15), // March 15, 2022
    fileSize: "22.8 MB",
    fileType: "pdf",
    author: "Ethiopian Roads Administration",
    thumbnail: "https://placehold.co/400x500/e5edff/1a44b8?text=Standard+Specifications",
    description: "These specifications provide technical requirements for road construction in Ethiopia. The document covers materials, construction methods, testing procedures, and quality control for various work items including earthworks, pavements, drainage structures, and road furniture.",
    downloadCount: 1245,
    isNew: false
  },
  {
    id: 12,
    title: "Climate Resilient Road Design Guidelines",
    category: "Guidelines",
    year: 2022,
    publishDate: new Date(2022, 1, 5), // February 5, 2022
    fileSize: "8.6 MB",
    fileType: "pdf",
    author: "ERA Design Department",
    thumbnail: "https://placehold.co/400x500/e5edff/1a44b8?text=Climate+Resilient",
    description: "These guidelines provide recommendations for designing climate-resilient road infrastructure in Ethiopia. The document addresses various climate-related hazards such as flooding, landslides, and extreme temperatures, and suggests adaptation measures to enhance the resilience of road assets.",
    downloadCount: 687,
    isNew: false
  }
];

// Categories for filtering
const categories = [
  "All Categories",
  "Technical Manual",
  "Report",
  "Research",
  "Guidelines",
  "Statistical Data",
  "Strategy Document",
  "Map"
];

// Years for filtering
const years = [...new Set(publicationsList.map(pub => pub.year))].sort((a, b) => b - a);

// File type icons
const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case 'pdf':
      return <File className="h-5 w-5" />;
    case 'xlsx':
      return <FileSpreadsheet className="h-5 w-5" />;
    case 'jpg':
    case 'png':
      return <FileImage className="h-5 w-5" />;
    case 'zip':
      return <FileArchive className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

const Publications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [selectedPublication, setSelectedPublication] = useState<typeof publicationsList[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Filter publications based on search, category, and year
  const filteredPublications = publicationsList.filter(publication => {
    const matchesSearch = searchQuery === '' || 
      publication.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      publication.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || publication.category === selectedCategory;
    const matchesYear = selectedYear === 'All Years' || publication.year.toString() === selectedYear;
    
    return matchesSearch && matchesCategory && matchesYear;
  });

  // Handle document download
  const handleDownload = (publication: typeof publicationsList[0]) => {
    toast({
      title: "Download Started",
      description: `${publication.title} is being downloaded.`,
    });
    console.log("Downloading publication:", publication.title);
  };

  // View publication details
  const viewPublicationDetails = (publication: typeof publicationsList[0]) => {
    setSelectedPublication(publication);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <PageHeader
        title="Publications & Resources"
        description="Access technical manuals, research papers, reports, and other publications from the Ethiopian Roads Administration."
        breadcrumbItems={[{ label: 'Publications', href: '/publications' }]}
      />

      <div className="container-custom py-12">
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search publications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Categories">All Categories</SelectItem>
              {categories.filter(cat => cat !== "All Categories").map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Years">All Years</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>{year.toString()}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Publications List */}
        {filteredPublications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPublications.map((publication) => (
              <Card key={publication.id} className="flex flex-col h-full hover:border-era-blue transition-colors">
                <CardHeader className="pb-4">
                  <div className="relative">
                    <img 
                      src={publication.thumbnail} 
                      alt={publication.title} 
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                    {publication.isNew && (
                      <Badge className="absolute top-2 right-2 bg-era-blue text-white">
                        New
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="line-clamp-2 h-14">{publication.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{format(publication.publishDate, "MMMM d, yyyy")}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4 flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-muted">
                      {publication.category}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Download className="h-3.5 w-3.5 mr-1" />
                      <span>{publication.downloadCount}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground line-clamp-3 mb-3">
                    {publication.description}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    {getFileIcon(publication.fileType)}
                    <span className="ml-1 uppercase">{publication.fileType}</span>
                    <span className="mx-2">•</span>
                    <span>{publication.fileSize}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex w-full gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => viewPublicationDetails(publication)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Details
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => handleDownload(publication)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No Publications Found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              There are no publications matching your search criteria. 
              Please try different search terms or filters.
            </p>
          </div>
        )}

        {/* Publication Details Dialog */}
        {selectedPublication && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedPublication.title}</DialogTitle>
                <DialogDescription className="text-base">
                  {selectedPublication.category} | Published on {format(selectedPublication.publishDate, "MMMM d, yyyy")}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div>
                  <img 
                    src={selectedPublication.thumbnail} 
                    alt={selectedPublication.title} 
                    className="w-full rounded-md"
                  />
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="font-medium w-24">File Type:</span>
                      <div className="flex items-center">
                        {getFileIcon(selectedPublication.fileType)}
                        <span className="ml-1 uppercase">{selectedPublication.fileType}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <span className="font-medium w-24">Size:</span>
                      <span>{selectedPublication.fileSize}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <span className="font-medium w-24">Downloads:</span>
                      <span>{selectedPublication.downloadCount}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <span className="font-medium w-24">Author:</span>
                      <span>{selectedPublication.author}</span>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        className="w-full"
                        onClick={() => handleDownload(selectedPublication)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Publication
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="font-semibold text-lg mb-2">Description</h4>
                  <p className="text-muted-foreground mb-6">
                    {selectedPublication.description}
                  </p>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-semibold mb-2">Citation Information</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedPublication.author} ({selectedPublication.year}). <em>{selectedPublication.title}</em>. Ethiopian Roads Administration, Addis Ababa, Ethiopia.
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold text-lg mb-2">Related Publications</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {publicationsList
                        .filter(pub => 
                          pub.id !== selectedPublication.id && 
                          (pub.category === selectedPublication.category || pub.year === selectedPublication.year)
                        )
                        .slice(0, 4)
                        .map(relatedPub => (
                          <div 
                            key={relatedPub.id} 
                            className="flex items-start gap-2 p-2 rounded-md hover:bg-muted cursor-pointer"
                            onClick={() => {
                              setSelectedPublication(relatedPub);
                            }}
                          >
                            {getFileIcon(relatedPub.fileType)}
                            <div>
                              <p className="font-medium line-clamp-2 text-sm">{relatedPub.title}</p>
                              <p className="text-xs text-muted-foreground">{relatedPub.year}</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Publications Categories */}
        <div className="mt-16">
          <SectionHeading 
            title="Publication Categories" 
            subtitle="Browse our publications by category to find the resources you need."
            align="center"
            className="mb-8"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.filter(cat => cat !== "All Categories").map((category) => {
              const count = publicationsList.filter(pub => pub.category === category).length;
              return (
                <Card key={category} 
                  className={`cursor-pointer hover:border-era-blue transition-colors ${selectedCategory === category ? 'border-era-blue' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{category}</CardTitle>
                    <CardDescription>{count} publication{count !== 1 ? 's' : ''}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {category === "Technical Manual" && "Standards, specifications, and procedures for road engineering and construction."}
                      {category === "Report" && "Annual reports, progress reports, and project completion reports."}
                      {category === "Research" && "Research papers, studies, and surveys on various aspects of road infrastructure."}
                      {category === "Guidelines" && "Best practices, procedures, and methodologies for various road sector activities."}
                      {category === "Statistical Data" && "Numerical data, indices, and statistics related to roads and transportation."}
                      {category === "Strategy Document" && "Strategic plans, policies, and frameworks for road sector development."}
                      {category === "Map" && "Road network maps, project location maps, and other spatial information."}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Most Downloaded */}
        <div className="mt-16 bg-muted/50 rounded-lg p-6 md:p-8">
          <SectionHeading 
            title="Most Downloaded Resources" 
            subtitle="Popular publications and resources from our library."
          />
          
          <div className="mt-6 divide-y">
            {publicationsList
              .sort((a, b) => b.downloadCount - a.downloadCount)
              .slice(0, 5)
              .map((publication, index) => (
                <div key={publication.id} className="py-4 flex items-start gap-4">
                  <div className="font-bold text-2xl text-era-blue/70 w-8">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1 hover:text-era-blue cursor-pointer" onClick={() => viewPublicationDetails(publication)}>
                      {publication.title}
                    </h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{publication.year}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        <span>{publication.category}</span>
                      </div>
                      <div className="flex items-center">
                        <Download className="h-3.5 w-3.5 mr-1" />
                        <span>{publication.downloadCount} downloads</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(publication)}
                  >
                    <Download className="mr-1 h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publications;
