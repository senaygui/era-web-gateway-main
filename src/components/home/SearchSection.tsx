
import React from 'react';
import { Search } from 'lucide-react';

const SearchSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-era-orange">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Find What You're Looking For</h2>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          Search our site for information on roads, projects, bids, publications, and more.
        </p>
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Search the website..."
            className="w-full py-3 px-6 pr-12 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-era-orange text-white p-1 rounded-full">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
