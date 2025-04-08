
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export interface BidItem {
  id: number;
  title: string;
  deadline: string;
  category: string;
}

interface BidsTabProps {
  bids: BidItem[];
}

const BidsTab: React.FC<BidsTabProps> = ({ bids }) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y">
          {bids.map((bid) => (
            <div key={bid.id} className="p-4 md:p-6 hover:bg-era-orange/5 transition-colors">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="mb-3 md:mb-0">
                  <h3 className="font-medium text-lg mb-1">{bid.title}</h3>
                  <div className="text-era-gray text-sm">{bid.category}</div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <div className="text-red-500 font-medium text-sm">
                    Deadline: {bid.deadline}
                  </div>
                  <Link to={`/bids/${bid.id}`}>
                    <Button size="sm" className="w-full md:w-auto bg-era-orange hover:bg-era-orange/90">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/bids">
          <Button className="bg-era-orange hover:bg-era-orange/90">
            View All Bids
          </Button>
        </Link>
      </div>
    </>
  );
};

export default BidsTab;
