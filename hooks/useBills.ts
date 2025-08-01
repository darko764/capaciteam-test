/**
 * useBills Hook
 * 
 * Custom React hook for fetching bills data from the Oireachtas API.
 * Manages loading states, error handling, and automatic refetching when parameters change.
 * 
 * Features:
 * - Automatic data fetching when dependencies change
 * - Loading state management with immediate feedback
 * - Error handling with user-friendly messages
 * - Optimistic loading states for better UX
 */

'use client';

import { useState, useEffect } from 'react';
import { Bill } from '../types/bill';
import { fetchBills } from '../utils/api';

interface UseBillsProps {
  page: number;
  pageSize: number;
  billSource?: string;
}

interface UseBillsReturn {
  bills: Bill[];
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useBills({ page, pageSize, billSource }: UseBillsProps): UseBillsReturn {
  const [bills, setBills] = useState<Bill[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track previous parameters to trigger immediate loading states on changes
  const [prevParams, setPrevParams] = useState({ page, pageSize, billSource });

  const fetchData = async () => {
    try {
      setError(null);
      
      const response = await fetchBills(page, pageSize, billSource);
      setBills(response.bills);
      setTotalCount(response.totalCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bills');
      setBills([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Immediately set loading when params change
  useEffect(() => {
    const paramsChanged = 
      prevParams.page !== page || 
      prevParams.pageSize !== pageSize || 
      prevParams.billSource !== billSource;

    if (paramsChanged) {
      setIsLoading(true);
      setPrevParams({ page, pageSize, billSource });
    }

    fetchData();
  }, [page, pageSize, billSource]);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return {
    bills,
    totalCount,
    isLoading,
    error,
    refetch
  };
}