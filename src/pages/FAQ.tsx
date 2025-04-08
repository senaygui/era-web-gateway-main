
import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Input } from '@/components/ui/input';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';

// FAQ Schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  question: z.string().min(10, { message: 'Question must be at least 10 characters.' }),
});

const faqItems = [
  {
    id: "general-1",
    question: "What is the role of the Ethiopian Roads Administration?",
    answer: "The Ethiopian Roads Administration (ERA) is responsible for the construction, upgrade, rehabilitation, and maintenance of federal roads across Ethiopia. We provide technical support to regional governments and build capacity in the road sector."
  },
  {
    id: "general-2",
    question: "How can I find information about ongoing road projects?",
    answer: "Information about ongoing road projects can be found on our website under the 'Projects' section. You can also contact our office directly for specific inquiries about particular projects."
  },
  {
    id: "bids-1",
    question: "How can I participate in road construction bids?",
    answer: "To participate in bids, you need to monitor our 'Bids' page regularly. All active tenders are listed there with detailed information on requirements, submission deadlines, and contact details for queries."
  },
  {
    id: "bids-2",
    question: "What are the qualification requirements for contractors?",
    answer: "Qualification requirements vary depending on the project scope and complexity. Generally, contractors need to be registered businesses with relevant experience, financial capacity, and technical expertise. Specific requirements are detailed in each bid document."
  },
  {
    id: "employment-1",
    question: "How can I apply for a job at ERA?",
    answer: "Job opportunities at ERA are advertised on our 'Vacancies' page. Each listing includes application instructions, required qualifications, and submission deadlines. All applications must follow the specified procedure to be considered."
  },
  {
    id: "employment-2",
    question: "Does ERA offer internship opportunities?",
    answer: "Yes, ERA offers internship opportunities for students and recent graduates in fields related to civil engineering, project management, and other relevant disciplines. Internship openings are posted on our 'Vacancies' page when available."
  },
  {
    id: "technical-1",
    question: "What standards does ERA follow for road construction?",
    answer: "ERA follows Ethiopian Road Design Standards alongside international best practices. We regularly update our standards to incorporate advancements in road engineering and sustainability practices."
  },
  {
    id: "technical-2",
    question: "How does ERA address environmental concerns in road projects?",
    answer: "Environmental impact assessments are conducted for all major road projects. ERA implements mitigation measures to minimize negative environmental impacts and promotes sustainable practices in road construction and maintenance."
  }
];

// FAQ categories
const categories = [
  { id: "all", name: "All Questions" },
  { id: "general", name: "General Information" },
  { id: "bids", name: "Bids & Tenders" },
  { id: "employment", name: "Employment" },
  { id: "technical", name: "Technical" }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { toast } = useToast();

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      question: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast({
      title: "Question Submitted",
      description: "Thank you for your question. We'll respond to you shortly.",
    });
    console.log(values);
    form.reset();
  };

  // Filter FAQs based on search and category
  const filteredFAQs = faqItems.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || faq.id.startsWith(activeCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <PageHeader
        title="Frequently Asked Questions"
        description="Find answers to commonly asked questions about the Ethiopian Roads Administration, our services, and operations."
        breadcrumbItems={[{ label: 'FAQ', href: '/faq' }]}
      />

      <div className="container-custom py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="mb-2"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto mb-12">
          {filteredFAQs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-lg">No matching questions found. Try a different search term or category.</p>
            </div>
          )}
        </div>

        {/* Ask a Question Form */}
        <div className="bg-muted/50 rounded-lg p-6 md:p-8 max-w-4xl mx-auto">
          <SectionHeading 
            title="Ask a Question" 
            subtitle="Didn't find what you were looking for? Submit your question and our team will get back to you."
            align="center"
            className="mb-6"
          />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Question</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Type your question here..." 
                        rows={5}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center mt-6">
                <Button type="submit" size="lg" className="min-w-[160px]">
                  Submit Question
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
