'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Tabs,
  Tab,
  Badge
} from '@mui/material';

import { Bill, BillTableProps } from '../types/bill';
import Filter from './Filter';
import BillTableCore from './BillTableCore';
import FavouriteBillsTab from './FavouriteBillsTab';
import { useFavouritesContext } from '../contexts/FavouritesContext';



/**
 * BillTable Component
 * 
 * Main presentation component for displaying Irish legislation bills.
 * Handles UI interactions, pagination, filtering, and favourites management.
 * 
 * Features:
 * - Tabbed interface (All Bills vs Favourites)
 * - Real-time filtering by bill source
 * - Pagination with customizable page sizes
 * - Skeleton loading states
 * - Favourites toggle functionality
 * - Responsive design with optimized spacing
 * 
 * @param bills - Array of bill data to display
 * @param currentPage - Current page number (1-indexed from API)
 * @param currentLimit - Number of items per page
 * @param totalCount - Total number of bills available
 * @param currentBillSource - Current filter selection
 * @param isLoading - Loading state for showing skeleton
 */
const BillTable: React.FC<BillTableProps> = ({ bills, currentPage, currentLimit, totalCount, currentBillSource, isLoading = false }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Convert from 1-indexed (API) to 0-indexed (Material UI pagination)
  const [page, setPage] = useState(currentPage - 1);
  const [rowsPerPage, setRowsPerPage] = useState(currentLimit);



  // Tab state
  const [activeTab, setActiveTab] = useState(0);
  
  // Filter state for favourites tab
  const [favouritesBillSource, setFavouritesBillSource] = useState('');
  
  // Optimistic loading state for immediate user feedback on interactions
  const [isNavigating, setIsNavigating] = useState(false);

  const { isFavourited, toggleFavourite, getFavouritedCount } = useFavouritesContext();

  // Reset navigation state when loading completes
  useEffect(() => {
    if (!isLoading) {
      setIsNavigating(false);
    }
  }, [isLoading]);

  // Combined loading state: shows skeleton for both API loading and navigation
  const showLoading = isLoading || isNavigating;

  const handleChangePage = (event: unknown, newPage: number) => {
    const newPageOneIndexed = newPage + 1; // Convert back to 1-indexed for API
    setPage(newPage);
    setIsNavigating(true);
    
    const params = new URLSearchParams(searchParams);
    params.set('page', newPageOneIndexed.toString());
    router.push(`?${params.toString()}`);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    setRowsPerPage(newLimit);
    setPage(0);
    setIsNavigating(true);
    
    const params = new URLSearchParams(searchParams);
    params.set('limit', newLimit.toString());
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handleBillSourceChange = (billSource: string) => {
    setIsNavigating(true);
    
    const params = new URLSearchParams(searchParams);
    if (billSource) {
      params.set('bill_source', billSource);
    } else {
      params.delete('bill_source');
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handleFavouriteClick = (bill: Bill, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavourite(bill);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
      {/* Tabs with Filter */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Tabs section with border that stops before filter */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', flex: 1, mr: 2 }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="bill table tabs">
            <Tab label="All Bills" />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>Favourites</span>
                  {getFavouritedCount() > 0 && (
                    <Badge 
                      badgeContent={getFavouritedCount()} 
                      color="warning"
                      sx={{
                        '& .MuiBadge-badge': {
                          position: 'static',
                          transform: 'none',
                          fontSize: '0.75rem',
                          minWidth: '18px',
                          height: '18px'
                        }
                      }}
                    />
                  )}
                </Box>
              } 
            />
          </Tabs>
        </Box>
        
        {/* Show appropriate filter for each tab */}
        <Filter 
          billSource={activeTab === 0 ? currentBillSource : favouritesBillSource} 
          onBillSourceChange={activeTab === 0 ? handleBillSourceChange : setFavouritesBillSource} 
        />
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && (
        <BillTableCore
          bills={bills}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={totalCount}
          isLoading={showLoading}
          isFavourited={isFavourited}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onFavouriteClick={handleFavouriteClick}
        />
      )}

      {activeTab === 1 && (
        <FavouriteBillsTab billSourceFilter={favouritesBillSource} isLoading={showLoading} />
      )}
    </Box>
  );
};

export default BillTable;