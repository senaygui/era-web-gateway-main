import React, { useState, useEffect } from 'react';
import { useBids, useActiveBids, useClosedBids, useFilteredBids, Bid } from '@/hooks/useBids';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Search, 
  Download, 
  Calendar, 
  FileText, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Sample bids data - will be used as fallback if API fails
const sampleBidsList: Bid[] = [
  {
    id: "ICB-2025-01",
    title: "Design and Construction of Adama-Awash Expressway (90km)",
    category: "Road Construction",
    type: "International Competitive Bidding",
    status: "active",
    publishDate: new Date(2025, 2, 15), // March 15, 2025
    deadlineDate: new Date(2025, 4, 15), // May 15, 2025
    budget: "$320 million",
    fundingSource: "World Bank",
    documents: [
      { name: "Bid Document", size: "4.2 MB", type: "pdf" },
      { name: "Technical Specifications", size: "8.7 MB", type: "pdf" },
      { name: "Drawings Package", size: "15.3 MB", type: "zip" },
      { name: "Addendum No.1", size: "1.2 MB", type: "pdf" }
    ],
    description: "The Ethiopian Roads Administration (ERA) invites sealed bids from eligible bidders for the Design and Construction of Adama-Awash Expressway. This project involves the design and construction of a 90km expressway connecting Adama and Awash, including bridges, interchanges, and service areas.",
    eligibility: [
      "International contractors with experience in expressway construction",
      "Minimum average annual construction turnover of $100 million",
      "Experience in at least two similar projects in the last 10 years",
      "Bid security of $3 million required"
    ],
    contactPerson: "Director, Procurement Directorate",
    contactEmail: "procurement@era.gov.et",
    contactPhone: "+251 11 551 7170"
  },
  {
    id: "NCB-2025-03",
    title: "Rehabilitation of Nekemte-Bure Road (120km)",
    category: "Road Rehabilitation",
    type: "National Competitive Bidding",
    status: "active",
    publishDate: new Date(2025, 3, 5), // April 5, 2025
    deadlineDate: new Date(2025, 4, 20), // May 20, 2025
    budget: "ETB 1.5 billion",
    fundingSource: "Government of Ethiopia",
    documents: [
      { name: "Bid Document", size: "3.8 MB", type: "pdf" },
      { name: "Technical Specifications", size: "6.2 MB", type: "pdf" },
      { name: "Bill of Quantities", size: "2.1 MB", type: "xlsx" }
    ],
    description: "The Ethiopian Roads Administration (ERA) invites sealed bids from eligible bidders for the Rehabilitation of Nekemte-Bure Road. This project involves the rehabilitation of a 120km road section including drainage structures, bridges, and roadside facilities.",
    eligibility: [
      "Category 1 licensed road contractors registered in Ethiopia",
      "Minimum average annual construction turnover of ETB 500 million",
      "Experience in at least two similar rehabilitation projects in the last 5 years",
      "Bid security of ETB 15 million required"
    ],
    contactPerson: "Director, Procurement Directorate",
    contactEmail: "procurement@era.gov.et",
    contactPhone: "+251 11 551 7170"
  },
  {
    id: "ICB-2025-02",
    title: "Construction Supervision for Dire Dawa-Dewele Road Project (220km)",
    category: "Consultancy Services",
    type: "International Competitive Bidding",
    status: "active",
    publishDate: new Date(2025, 3, 10), // April 10, 2025
    deadlineDate: new Date(2025, 5, 10), // June 10, 2025
    budget: "$5.2 million",
    fundingSource: "African Development Bank",
    documents: [
      { name: "Request for Proposals", size: "2.9 MB", type: "pdf" },
      { name: "Terms of Reference", size: "1.8 MB", type: "pdf" }
    ],
    description: "The Ethiopian Roads Administration (ERA) invites proposals from eligible consulting firms for Construction Supervision Services for the Dire Dawa-Dewele Road Project. The assignment includes supervision of construction works, quality control, contract administration, and environmental monitoring.",
    eligibility: [
      "International consulting firms with experience in road construction supervision",
      "Minimum average annual turnover of $2 million",
      "Experience in at least three similar supervision assignments in the last 10 years",
      "Proposal security of $50,000 required"
    ],
    contactPerson: "Director, Procurement Directorate",
    contactEmail: "procurement@era.gov.et",
    contactPhone: "+251 11 551 7170"
  },
  {
    id: "NCB-2025-04",
    title: "Supply of Road Maintenance Equipment",
    category: "Goods",
    type: "National Competitive Bidding",
    status: "active",
    publishDate: new Date(2025, 3, 20), // April 20, 2025
    deadlineDate: new Date(2025, 4, 25), // May 25, 2025
    budget: "ETB 120 million",
    fundingSource: "Government of Ethiopia",
    documents: [
      { name: "Bid Document", size: "2.4 MB", type: "pdf" },
      { name: "Technical Specifications", size: "1.5 MB", type: "pdf" }
    ],
    description: "The Ethiopian Roads Administration (ERA) invites sealed bids from eligible suppliers for the Supply of Road Maintenance Equipment including motor graders, wheel loaders, excavators, and rollers. The equipment will be used for routine and periodic maintenance of federal roads.",
    eligibility: [
      "Licensed suppliers registered in Ethiopia",
      "Minimum average annual turnover of ETB 60 million",
      "Experience in supplying similar equipment in the last 3 years",
      "Bid security of ETB 1.2 million required",
      "Must provide after-sales service and spare parts availability"
    ],
    contactPerson: "Director, Procurement Directorate",
    contactEmail: "procurement@era.gov.et",
    contactPhone: "+251 11 551 7170"
  },
  {
    id: "ICB-2024-09",
    title: "Upgrading of Jimma-Bonga Road (120km)",
    category: "Road Construction",
    type: "International Competitive Bidding",
    status: "closed",
    publishDate: new Date(2024, 9, 15), // October 15, 2024
    deadlineDate: new Date(2024, 11, 15), // December 15, 2024
    budget: "$85 million",
    fundingSource: "European Investment Bank",
    documents: [
      { name: "Bid Document", size: "3.5 MB", type: "pdf" },
      { name: "Technical Specifications", size: "7.2 MB", type: "pdf" },
      { name: "Drawings Package", size: "12.8 MB", type: "zip" }
    ],
    description: "The Ethiopian Roads Administration (ERA) invited sealed bids for the Upgrading of Jimma-Bonga Road. The project involved upgrading a 120km gravel road to asphalt concrete standard, including bridges and drainage structures.",
    eligibility: [
      "International contractors with experience in road construction",
      "Minimum average annual construction turnover of $40 million",
      "Experience in at least two similar projects in the last 7 years",
      "Bid security of $1.5 million required"
    ],
    contactPerson: "Director, Procurement Directorate",
    contactEmail: "procurement@era.gov.et",
    contactPhone: "+251 11 551 7170",
    awardStatus: "awarded",
    awardedTo: "Global Road Builders Consortium",
    awardDate: new Date(2025, 0, 15), // January 15, 2025
    contractValue: "$82.3 million"
  },
  {
    id: "NCB-2024-12",
    title: "Routine Maintenance of Addis Ababa-Ambo Road (110km)",
    category: "Road Maintenance",
    type: "National Competitive Bidding",
    status: "closed",
    publishDate: new Date(2024, 10, 5), // November 5, 2024
    deadlineDate: new Date(2024, 11, 5), // December 5, 2024
    budget: "ETB 45 million",
    fundingSource: "Government of Ethiopia",
    documents: [
      { name: "Bid Document", size: "2.6 MB", type: "pdf" },
      { name: "Technical Specifications", size: "3.1 MB", type: "pdf" },
      { name: "Bill of Quantities", size: "1.4 MB", type: "xlsx" }
    ],
    description: "The Ethiopian Roads Administration (ERA) invited sealed bids for Routine Maintenance of Addis Ababa-Ambo Road. The project involved pothole patching, drainage cleaning, shoulder repairs, and other routine maintenance activities.",
    eligibility: [
      "Category 3 or higher licensed road contractors registered in Ethiopia",
      "Minimum average annual turnover of ETB 20 million",
      "Experience in at least two similar maintenance projects in the last 3 years",
      "Bid security of ETB 450,000 required"
    ],
    contactPerson: "Director, Procurement Directorate",
    contactEmail: "procurement@era.gov.et",
    contactPhone: "+251 11 551 7170",
    awardStatus: "cancelled",
    cancellationReason: "Re-evaluation of maintenance strategy required"
  },
  {
    id: "ICB-2024-10",
    title: "Construction of Bridges on Modjo-Hawassa Expressway",
    category: "Bridge Construction",
    type: "International Competitive Bidding",
    status: "closed",
    publishDate: new Date(2024, 9, 20), // October 20, 2024
    deadlineDate: new Date(2024, 11, 20), // December 20, 2024
    budget: "$28 million",
    fundingSource: "African Development Bank",
    documents: [
      { name: "Bid Document", size: "3.2 MB", type: "pdf" },
      { name: "Technical Specifications", size: "5.8 MB", type: "pdf" },
      { name: "Drawings Package", size: "9.5 MB", type: "zip" }
    ],
    description: "The Ethiopian Roads Administration (ERA) invited sealed bids for the Construction of Bridges on Modjo-Hawassa Expressway. The project involved the construction of 5 major bridges including approach roads and associated works.",
    eligibility: [
      "International contractors with experience in bridge construction",
      "Minimum average annual construction turnover of $15 million",
      "Experience in at least two similar bridge projects in the last 7 years",
      "Bid security of $500,000 required"
    ],
    contactPerson: "Director, Procurement Directorate",
    contactEmail: "procurement@era.gov.et",
    contactPhone: "+251 11 551 7170",
    awardStatus: "awarded",
    awardedTo: "Ethiopian-Korean Joint Venture",
    awardDate: new Date(2025, 0, 25), // January 25, 2025
    contractValue: "$26.8 million"
  }
];

// Categories for filtering
const categories = [
  "All Categories",
  "Road Construction",
  "Road Rehabilitation",
  "Road Maintenance",
  "Bridge Construction",
  "Consultancy Services",
  "Goods"
];

// Types for filtering
const types = [
  "All Types",
  "International Competitive Bidding",
  "National Competitive Bidding"
];

const Bids = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Fetch bids from API
  const { bids: allBids, loading: allLoading, error: allError } = useBids();
  const { activeBids, loading: activeLoading, error: activeError } = useActiveBids();
  const { closedBids, loading: closedLoading, error: closedError } = useClosedBids();
  const { filteredBids, loading: filterLoading } = useFilteredBids(
    selectedCategory !== 'All Categories' ? selectedCategory : undefined,
    selectedType !== 'All Types' ? selectedType : undefined
  );

  // Use API data or fall back to sample data if API fails
  const bidsList = allError ? sampleBidsList : allBids;
  const activeBidsList = activeError ? sampleBidsList.filter(bid => bid.status === 'active') : activeBids;
  const closedBidsList = closedError ? sampleBidsList.filter(bid => bid.status === 'closed') : closedBids;
  const filteredBidsList = filterLoading ? bidsList : filteredBids;

  // Filter bids based on search, category, and type
  const filterBids = (bidList: Bid[], status: 'active' | 'closed') => {
    return bidList.filter(bid => {
      const matchesSearch = bid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (bid.id?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
                          ((bid.bid_number || '').toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All Categories' || bid.category === selectedCategory;
      const matchesType = selectedType === 'All Types' || bid.type === selectedType;
      const matchesStatus = bid.status === status;
      return matchesSearch && matchesCategory && matchesType && matchesStatus;
    });
  };

  // Apply search filter to the appropriate bid list
  const displayedBids = searchQuery ? filteredBidsList.filter(bid => {
    return bid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           ((bid.bid_number || '').toLowerCase().includes(searchQuery.toLowerCase())) ||
           (bid.id?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
  }) : filteredBidsList;

  // Handle document download
  const handleDownload = (document: any) => {
    // In a real app, this would trigger a download from the URL
    const url = document.url;
    if (url) {
      window.open(url, '_blank');
      toast({
        title: "Download Started",
        description: `Downloading ${document.name || document.filename || 'document'}...`
      });
    } else {
      toast({
        title: "Download Failed",
        description: "Document URL not available",
        variant: "destructive"
      });
    }
  };

  // Open bid details dialog
  const openBidDetails = (bid: Bid) => {
    setSelectedBid(bid);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <PageHeader
        title="Bids & Tenders"
        description="Browse current and past bidding opportunities for road construction, rehabilitation, and consultancy services."
        breadcrumbItems={[{ label: 'Bids', href: '/bids' }]}
      />

      <div className="container-custom py-12">
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search bids..."
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
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {types.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabs for Active and Closed Bids */}
        <Tabs defaultValue="active" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="active">Active Bids</TabsTrigger>
            <TabsTrigger value="closed">Closed Bids</TabsTrigger>
          </TabsList>
          
          {/* Active Bids Tab */}
          <TabsContent value="active" className="mt-6">
            {displayedBids.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">Bid No.</TableHead>
                      <TableHead className="min-w-[250px]">Title</TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead className="hidden md:table-cell">Published</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedBids.map((bid) => (
                      <TableRow key={bid.id}>
                        <TableCell className="font-medium">{bid.bid_number || bid.id}</TableCell>
                        <TableCell>{bid.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{bid.category}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Published: {bid.publishDate ? format(new Date(bid.publishDate), 'MMM d, yyyy') : 'N/A'}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openBidDetails(bid)}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              <span className="hidden sm:inline">Details</span>
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleDownload(bid.documents[0])}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              <span className="hidden sm:inline">Download</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Active Bids Found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  There are no active bids matching your criteria. 
                  Please try different search terms or check the closed bids.
                </p>
              </div>
            )}
          </TabsContent>
          
          {/* Closed Bids Tab */}
          <TabsContent value="closed" className="mt-6">
            {closedBidsList.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">Bid No.</TableHead>
                      <TableHead className="min-w-[250px]">Title</TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead className="hidden md:table-cell">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {closedBidsList.map((bid) => (
                      <TableRow key={bid.id}>
                        <TableCell className="font-medium">{bid.bid_number || bid.id}</TableCell>
                        <TableCell>{bid.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{bid.category}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {bid.awardStatus === 'awarded' ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Awarded
                            </Badge>
                          ) : bid.awardStatus === 'cancelled' ? (
                            <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">
                              <XCircle className="h-3 w-3 mr-1" />
                              Cancelled
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                              <Clock className="h-3 w-3 mr-1" />
                              Under Review
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openBidDetails(bid)}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Details</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Closed Bids Found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  There are no closed bids matching your criteria. 
                  Please try different search terms.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Bid Details Dialog */}
        {selectedBid && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedBid.id}: {selectedBid.title}</DialogTitle>
                <DialogDescription className="text-base">
                  {selectedBid.category} | {selectedBid.type}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p>{selectedBid?.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Key Information</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="font-medium min-w-32">Status:</span>
                        {selectedBid.status === 'active' ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                        ) : selectedBid.awardStatus === 'awarded' ? (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Awarded</Badge>
                        ) : selectedBid.awardStatus === 'cancelled' ? (
                          <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Closed</Badge>
                        )}
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium min-w-32">Published:</span>
                        {format(new Date(selectedBid.publishDate), "MMMM d, yyyy")}
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium min-w-32">Deadline:</span>
                        {format(new Date(selectedBid.deadlineDate), "MMMM d, yyyy")}
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium min-w-32">Budget:</span>
                        {selectedBid.budget}
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium min-w-32">Funding:</span>
                        {selectedBid.fundingSource}
                      </li>
                      {selectedBid.awardStatus === 'awarded' && (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="font-medium min-w-32">Awarded To:</span>
                            {selectedBid.awardedTo}
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-medium min-w-32">Award Date:</span>
                            {format(new Date(selectedBid.awardDate!), "MMMM d, yyyy")}
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-medium min-w-32">Contract Value:</span>
                            {selectedBid.contractValue}
                          </li>
                        </>
                      )}
                      {selectedBid.awardStatus === 'cancelled' && (
                        <li className="flex items-start gap-2">
                          <span className="font-medium min-w-32">Cancellation Reason:</span>
                          {selectedBid.cancellationReason}
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Eligibility Criteria</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {(selectedBid?.eligibility || []).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <ul className="space-y-1">
                    <li><span className="font-medium">Contact Person:</span> {selectedBid.contactPerson}</li>
                    <li><span className="font-medium">Email:</span> {selectedBid.contactEmail}</li>
                    <li><span className="font-medium">Phone:</span> {selectedBid.contactPhone}</li>
                  </ul>
                </div>
                
                {selectedBid.status === 'active' && (
                  <div>
                    <h4 className="font-semibold mb-2">Bid Documents</h4>
                    <div className="space-y-2">
                      {(selectedBid.documents || []).map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-era-blue" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-muted-foreground">{doc.size} • {doc.type.toUpperCase()}</p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownload(doc)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedBid.status === 'active' && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                    <div className="flex gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-800 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-800">Important Notice</h4>
                        <p className="text-yellow-800">
                          Bids must be delivered to the address below on or before {format(selectedBid.deadlineDate, "MMMM d, yyyy")} at 2:30 PM.
                          Late bids will be rejected. Bids will be opened in the presence of bidders' representatives who choose to attend.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Bidding Guidelines */}
        <div className="mt-12 bg-muted/50 rounded-lg p-6 md:p-8">
          <SectionHeading 
            title="Bidding Guidelines" 
            subtitle="Follow these guidelines when participating in tenders issued by the Ethiopian Roads Administration."
          />
          
          <div className="mt-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">How to Participate</h4>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Regularly check our website for new bid announcements</li>
                  <li>Download the bid documents for the opportunities you're interested in</li>
                  <li>Carefully review the eligibility requirements and scope of work</li>
                  <li>Prepare your bid according to the instructions in the bid document</li>
                  <li>Submit your bid before the specified deadline</li>
                  <li>Attend the bid opening session if possible</li>
                </ol>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Common Requirements</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Valid business license and registration</li>
                  <li>Tax clearance certificate</li>
                  <li>Financial statements for the required period</li>
                  <li>Evidence of similar experience</li>
                  <li>Bid security in the specified amount and form</li>
                  <li>Power of attorney for the bid signatory</li>
                  <li>Joint venture agreement (if applicable)</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Bid Evaluation Process</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">1. Preliminary Examination</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Checking completeness of bids, bid security, and other formal requirements. Non-compliant bids are rejected at this stage.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">2. Technical Evaluation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Assessment of bidder qualifications, experience, methodology, and compliance with technical specifications.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">3. Financial Evaluation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Comparison of bid prices, correction of arithmetic errors, and application of any preference margins.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-2 text-blue-800">Contact Information</h4>
              <p className="text-blue-800 mb-2">
                For any questions regarding bids and tenders, please contact:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-blue-800">Ethiopian Roads Administration</p>
                  <p className="text-blue-800">Procurement Directorate</p>
                  <p className="text-blue-800">Africa Avenue (Bole Road), Addis Ababa, Ethiopia</p>
                </div>
                <div>
                  <p className="text-blue-800"><span className="font-medium">Email:</span> procurement@era.gov.et</p>
                  <p className="text-blue-800"><span className="font-medium">Phone:</span> +251 11 551 7170</p>
                  <p className="text-blue-800"><span className="font-medium">Fax:</span> +251 11 554 4934</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bids;
