'use client';

import React, { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Bill } from '../types/bill';
import { useFavouritesContext } from '../contexts/FavouritesContext';
import BillTableCore from './BillTableCore';



interface FavouriteBillsTabProps {
  billSourceFilter: string;
  isLoading?: boolean;
}

const FavouriteBillsTab: React.FC<FavouriteBillsTabProps> = ({ billSourceFilter, isLoading = false }) => {
  const { isFavourited, toggleFavourite, getFavouritedBills, getFavouritedCount } = useFavouritesContext();
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Get favourited bills and apply filter
  const allFavouritedBills = getFavouritedBills();
  const filteredFavouritedBills = billSourceFilter 
    ? allFavouritedBills.filter(bill => bill.source === billSourceFilter)
    : allFavouritedBills;
  
  // Apply pagination
  const favouritedBills = filteredFavouritedBills.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  const favouritedCount = getFavouritedCount();

  const handleFavouriteClick = (bill: Bill, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click when clicking star
    toggleFavourite(bill);
  };

  // Reset to first page when filter changes
  React.useEffect(() => {
    setPage(0);
  }, [billSourceFilter]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  // Handle different empty states
  if (favouritedCount === 0) {
    return (
      <BillTableCore
        bills={[]}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={0}
        isLoading={isLoading}
        isFavourited={() => true}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onFavouriteClick={handleFavouriteClick}
        emptyState={{
          title: "No Favourited Bills",
          description: "Click the star icon next to any bill to add it to your favourites."
        }}
      />
    );
  }

  if (filteredFavouritedBills.length === 0 && favouritedCount > 0) {
    return (
      <BillTableCore
        bills={[]}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={0}
        isLoading={isLoading}
        isFavourited={() => true}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onFavouriteClick={handleFavouriteClick}
        emptyState={{
          title: "No Bills Match Filter",
          description: "Try changing the filter or clear it to see all favourited bills."
        }}
      />
    );
  }

  return (
    <BillTableCore
      bills={favouritedBills}
      page={page}
      rowsPerPage={rowsPerPage}
      totalCount={filteredFavouritedBills.length}
      isLoading={isLoading}
      isFavourited={() => true} // All bills in favourites tab are favourited
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      onFavouriteClick={handleFavouriteClick}
    />
  );
};

export default FavouriteBillsTab;
