'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Bill, FavouritesContextType } from '../types/bill';

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

interface FavouritesProviderProps {
  children: ReactNode;
}

export const FavouritesProvider: React.FC<FavouritesProviderProps> = ({ children }) => {
  // Track favourited bills by storing the full bill objects
  const [favouritedBills, setFavouritedBills] = useState<Map<string, Bill>>(new Map());

  // Helper function to generate unique bill ID
  const getBillId = (bill: Bill): string => {
    return `${bill.billNo}/${bill.billYear}`;
  };

  // Check if a bill is favourited
  const isFavourited = (bill: Bill): boolean => {
    const billId = getBillId(bill);
    return favouritedBills.has(billId);
  };

    // Toggle favourite status
  const toggleFavourite = (bill: Bill): void => {
    const billId = getBillId(bill);
    const isCurrentlyFavourited = favouritedBills.has(billId);

    if (isCurrentlyFavourited) {
      // Unfavourite the bill
      setFavouritedBills(prev => {
        const newMap = new Map(prev);
        newMap.delete(billId);
        return newMap;
      });
      console.log(`Request to unfavourite bill ${billId} was dispatched to the server`);
    } else {
      // Favourite the bill
      setFavouritedBills(prev => new Map(prev).set(billId, bill));
      console.log(`Request to favourite bill ${billId} was dispatched to the server`);
    }
  };

  // Get all favourited bills from stored Map
  const getFavouritedBills = (): Bill[] => {
    return Array.from(favouritedBills.values());
  };

  // Get count of favourited bills
  const getFavouritedCount = (): number => {
    return favouritedBills.size;
  };

  const value: FavouritesContextType = {
    favouritedBills,
    isFavourited,
    toggleFavourite,
    getFavouritedBills,
    getFavouritedCount,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = (): FavouritesContextType => {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
}; 