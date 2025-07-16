import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the Bid type based on the frontend data structure
export interface Bid {
  id: string;
  bid_number?: string;
  title: string;
  category: string;
  type: string;
  status: string;
  publishDate: Date | string;
  deadlineDate: Date | string;
  budget: string;
  fundingSource: string;
  description: string;
  eligibility: string[];
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  awardStatus?: string;
  awardedTo?: string;
  awardDate?: Date | string;
  contractValue?: string;
  cancellationReason?: string;
  documents?: {
    id?: string;
    name: string;
    size: string;
    type: string;
    url?: string;
    filename?: string;
    content_type?: string;
  }[];
}

// API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// Hook for fetching all bids
export function useBids() {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/bids`);
        setBids(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching bids:', err);
        setError('Failed to fetch bids. Please try again later.');
        setBids([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  return { bids, loading, error };
}

// Hook for fetching active bids
export function useActiveBids() {
  const [activeBids, setActiveBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveBids = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/bids/active`);
        setActiveBids(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching active bids:', err);
        setError('Failed to fetch active bids. Please try again later.');
        setActiveBids([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveBids();
  }, []);

  return { activeBids, loading, error };
}

// Hook for fetching closed bids
export function useClosedBids() {
  const [closedBids, setClosedBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClosedBids = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/bids/closed`);
        setClosedBids(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching closed bids:', err);
        setError('Failed to fetch closed bids. Please try again later.');
        setClosedBids([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClosedBids();
  }, []);

  return { closedBids, loading, error };
}

// Hook for fetching a single bid by ID
export function useBid(id: string) {
  const [bid, setBid] = useState<Bid | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBid = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/bids/${id}`);
        setBid(response.data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching bid with ID ${id}:`, err);
        setError('Failed to fetch bid details. Please try again later.');
        setBid(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBid();
  }, [id]);

  return { bid, loading, error };
}

// Hook for filtering bids by category and type
export function useFilteredBids(category?: string, type?: string) {
  const [filteredBids, setFilteredBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilteredBids = async () => {
      try {
        setLoading(true);
        let url = `${API_BASE_URL}/bids`;
        const params = new URLSearchParams();
        
        if (category && category !== 'All Categories') {
          params.append('category', category);
        }
        
        if (type && type !== 'All Types') {
          params.append('type', type);
        }
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        
        const response = await axios.get(url);
        setFilteredBids(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching filtered bids:', err);
        setError('Failed to fetch filtered bids. Please try again later.');
        setFilteredBids([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredBids();
  }, [category, type]);

  return { filteredBids, loading, error };
}
