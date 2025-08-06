'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Alert } from '@mui/material';
import BillTable from './BillTable';
import { useBills } from '../../hooks/useBills';

const BillTableWithData: React.FC = () => {
  const searchParams = useSearchParams();
  
  // Extract URL parameters
  const page = parseInt(searchParams?.get('page') || '1');
  const limit = parseInt(searchParams?.get('limit') || '10');
  const billSource = searchParams?.get('bill_source') || '';

  // Fetch bills data with loading state
  const { bills, totalCount, isLoading, error } = useBills({
    page,
    pageSize: limit,
    billSource
  });

  // Show error state if fetch failed
  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading bills: {error}
        </Alert>
      </Box>
    );
  }

  return (
    <BillTable 
      bills={bills}
      currentPage={page}
      currentLimit={limit}
      totalCount={totalCount}
      currentBillSource={billSource}
      isLoading={isLoading}
    />
  );
};

export default BillTableWithData;