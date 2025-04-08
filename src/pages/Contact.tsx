
import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock
} from 'lucide-react';

const Contact = () => {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Get in touch with the Ethiopian Roads Administration. We're here to answer your questions and provide information."
        breadcrumbItems={[{ label: 'Contact', href: '/contact' }]}
      />

      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-xl">
                    <MapPin className="h-5 w-5 mr-2 text-era-blue" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-era-gray">
                    Ethiopian Roads Administration Building,<br />
                    Africa Avenue (Bole Road),<br />
                    Addis Ababa, Ethiopia
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-xl">
                    <Phone className="h-5 w-5 mr-2 text-era-blue" />
                    Phone Numbers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <div className="text-sm text-era-gray">Main Office:</div>
                    <a href="tel:+251115516888" className="hover:text-era-blue transition-colors">
                      +251 11 551 6888
                    </a>
                  </div>
                  <div>
                    <div className="text-sm text-era-gray">Customer Service:</div>
                    <a href="tel:+251115516889" className="hover:text-era-blue transition-colors">
                      +251 11 551 6889
                    </a>
                  </div>
                  <div>
                    <div className="text-sm text-era-gray">Fax:</div>
                    <span>+251 11 551 5665</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-xl">
                    <Mail className="h-5 w-5 mr-2 text-era-blue" />
                    Email Addresses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <div className="text-sm text-era-gray">General Inquiries:</div>
                    <a href="mailto:info@era.gov.et" className="hover:text-era-blue transition-colors">
                      info@era.gov.et
                    </a>
                  </div>
                  <div>
                    <div className="text-sm text-era-gray">Bids & Tenders:</div>
                    <a href="mailto:bids@era.gov.et" className="hover:text-era-blue transition-colors">
                      bids@era.gov.et
                    </a>
                  </div>
                  <div>
                    <div className="text-sm text-era-gray">Career Opportunities:</div>
                    <a href="mailto:hr@era.gov.et" className="hover:text-era-blue transition-colors">
                      hr@era.gov.et
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-xl">
                    <Clock className="h-5 w-5 mr-2 text-era-blue" />
                    Working Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <div className="text-sm text-era-gray">Monday to Friday:</div>
                    <div>8:30 AM - 5:30 PM</div>
                  </div>
                  <div>
                    <div className="text-sm text-era-gray">Saturday:</div>
                    <div>8:30 AM - 12:30 PM</div>
                  </div>
                  <div>
                    <div className="text-sm text-era-gray">Sunday & Public Holidays:</div>
                    <div>Closed</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <Input 
                          id="name" 
                          placeholder="Enter your full name" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Enter your email address" 
                          required 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </label>
                        <Input 
                          id="phone" 
                          placeholder="Enter your phone number" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <Input 
                          id="subject" 
                          placeholder="Enter message subject" 
                          required 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="department" className="text-sm font-medium">
                        Department <span className="text-red-500">*</span>
                      </label>
                      <select 
                        id="department" 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-era-blue"
                        required
                      >
                        <option value="" disabled selected>Select a department</option>
                        <option value="general">General Inquiry</option>
                        <option value="projects">Projects & Engineering</option>
                        <option value="bids">Bids & Tenders</option>
                        <option value="hr">Human Resources</option>
                        <option value="media">Media & Communications</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <Textarea 
                        id="message" 
                        placeholder="Type your message here..." 
                        rows={6}
                        required 
                      />
                    </div>

                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="consent" 
                        className="h-4 w-4 text-era-blue focus:ring-era-blue border-gray-300 rounded" 
                        required
                      />
                      <label htmlFor="consent" className="ml-2 block text-sm text-era-gray">
                        I consent to having this website store my submitted information so they can respond to my inquiry.
                      </label>
                    </div>

                    <Button type="submit" className="w-full md:w-auto bg-era-blue hover:bg-era-blue/90">
                      Submit Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-era-light">
        <div className="container-custom">
          <SectionHeading 
            title="Find Us on the Map" 
            subtitle="Visit our headquarters located in the heart of Addis Ababa"
          />
          <div className="rounded-lg overflow-hidden shadow-lg h-[400px] bg-white">
            {/* Placeholder for the map - In a real implementation, this would be a Google Maps integration */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center relative">
              <img 
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c8bf?auto=format&fit=crop&w=1200&h=600" 
                alt="Map location"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-md max-w-md">
                  <h3 className="font-bold text-lg mb-2">Ethiopian Roads Administration</h3>
                  <p className="text-era-gray">
                    Africa Avenue (Bole Road), Addis Ababa, Ethiopia
                  </p>
                  <div className="mt-3">
                    <a 
                      href="https://goo.gl/maps/YourActualGoogleMapsLink" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-era-blue hover:underline text-sm font-medium"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-white p-2 rounded text-sm">
                This is a placeholder for Google Maps integration
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Offices */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <SectionHeading 
            title="Regional Offices" 
            subtitle="We have offices throughout Ethiopia to better serve different regions"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Amhara", "Oromia", "Tigray", "SNNPR", "Afar", "Somali"].map((region) => (
              <Card key={region} className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{region} Regional Office</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 text-era-blue flex-shrink-0 mt-0.5" />
                    <span className="text-era-gray">
                      ERA {region} Branch Office, {region} Region
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-era-blue flex-shrink-0" />
                    <a href={`tel:+2511234${Math.floor(Math.random() * 10000)}`} className="hover:text-era-blue transition-colors">
                      +251 12 345 {Math.floor(Math.random() * 10000)}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-era-blue flex-shrink-0" />
                    <a href={`mailto:${region.toLowerCase()}@era.gov.et`} className="hover:text-era-blue transition-colors">
                      {region.toLowerCase()}@era.gov.et
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-12 bg-era-blue text-white">
        <div className="container-custom text-center">
          <SectionHeading 
            title="Connect With Us" 
            subtitle="Follow us on social media for updates and announcements"
            align="center"
            className="text-white [&>h2]:text-white [&>p]:text-white/80"
          />
          <div className="flex justify-center space-x-6 mt-8">
            {["Facebook", "Twitter", "LinkedIn", "YouTube"].map((platform) => (
              <a 
                key={platform}
                href="#" 
                className="bg-white/10 hover:bg-white/20 w-16 h-16 rounded-full flex items-center justify-center transition-colors"
                aria-label={platform}
              >
                <span className="sr-only">{platform}</span>
                {platform === "Facebook" && (
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                )}
                {platform === "Twitter" && (
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                )}
                {platform === "LinkedIn" && (
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                )}
                {platform === "YouTube" && (
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
