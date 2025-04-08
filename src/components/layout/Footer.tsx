
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-era-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-era-orange flex items-center justify-center text-white font-bold">
                ERA
              </div>
              <h3 className="text-lg font-bold">Ethiopian Roads Administration</h3>
            </div>
            <p className="text-gray-300 mb-4">
              The Ethiopian Roads Administration (ERA) is responsible for the construction and maintenance of 
              the country's federal road network, contributing to Ethiopia's development.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 bg-era-orange hover:bg-era-orange/80 rounded-full flex items-center justify-center transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-era-orange hover:bg-era-orange/80 rounded-full flex items-center justify-center transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-era-orange hover:bg-era-orange/80 rounded-full flex items-center justify-center transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-era-orange hover:bg-era-orange/80 rounded-full flex items-center justify-center transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-era-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-era-orange transition-colors">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-era-orange transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/publications" className="text-gray-300 hover:text-era-orange transition-colors">
                  Publications
                </Link>
              </li>
              <li>
                <Link to="/vacancies" className="text-gray-300 hover:text-era-orange transition-colors">
                  Vacancies
                </Link>
              </li>
              <li>
                <Link to="/bids" className="text-gray-300 hover:text-era-orange transition-colors">
                  Bids & Tenders
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-era-orange transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-era-orange transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-3 text-era-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  Ethiopian Roads Administration Building,<br />
                  Africa Avenue (Bole Road),<br />
                  Addis Ababa, Ethiopia
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-era-orange h-5 w-5 flex-shrink-0" />
                <a href="tel:+251115516888" className="text-gray-300 hover:text-era-orange transition-colors">
                  +251 11 551 6888
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-era-orange h-5 w-5 flex-shrink-0" />
                <a href="mailto:info@era.gov.et" className="text-gray-300 hover:text-era-orange transition-colors">
                  info@era.gov.et
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Stay updated with our latest news, events, and announcements.
            </p>
            <form className="space-y-3">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-era-orange text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-era-orange hover:bg-era-orange/90 text-white py-2 px-4 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-black/20">
        <div className="container-custom py-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="text-gray-400 mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Ethiopian Roads Administration. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-gray-400 hover:text-era-orange transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-era-orange transition-colors">
              Terms of Use
            </Link>
            <Link to="/accessibility" className="text-gray-400 hover:text-era-orange transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
