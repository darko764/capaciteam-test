/**
 * FavouritesContext
 * 
 * React Context that integrates with the useFavourites hook to provide
 * global favourites state management with full Bill object storage.
 * 
 * Features:
 * - Integrates with useFavourites hook
 * - Session-based storage (in memory)
 * - Stores full Bill objects for easy access
 * - Real-time updates across components
 * - Optimistic UI updates
 */

'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Bill, FavouritesContextType } from '../types/bill';
import { useFavourites as useBaseFavourites } from '../hooks/useFavourites';

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

interface FavouritesProviderProps {
  children: ReactNode;
}

export const FavouritesProvider: React.FC<FavouritesProviderProps> = ({ children }) => {
  // Use the base hook for core functionality
  const baseFavourites = useBaseFavourites();
  
  // Store full Bill objects for easy access (Map<billId, Bill>)
  const [billStorage, setBillStorage] = useState<Map<string, Bill>>(new Map());

  // Helper function to generate unique bill ID (same as hook)
  const getBillId = (bill: Bill): string => {
    return `${bill.billNo}/${bill.billYear}`;
  };

  // Enhanced toggle that stores full Bill objects
  const toggleFavourite = (bill: Bill): void => {
    const billId = getBillId(bill);
    const wasCurrentlyFavourited = baseFavourites.isFavourited(bill);
    
    // Use base hook's toggle logic
    baseFavourites.toggleFavourite(bill);
    
    // Update our Bill storage based on previous state
    if (wasCurrentlyFavourited) {
      // Bill was favourited, now being unfavourited
      setBillStorage(prev => {
        const newMap = new Map(prev);
        newMap.delete(billId);
        return newMap;
      });
    } else {
      // Bill was not favourited, now being favourited
      setBillStorage(prev => new Map(prev).set(billId, bill));
    }
  };

  // Get all favourited bills from stored Map
  const getFavouritedBills = (): Bill[] => {
    return Array.from(billStorage.values());
  };

  const value: FavouritesContextType = {
    favouritedBills: billStorage,
    isFavourited: baseFavourites.isFavourited,
    toggleFavourite,
    getFavouritedBills,
    getFavouritedCount: baseFavourites.getFavouritedCount,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavouritesContext = (): FavouritesContextType => {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error('useFavouritesContext must be used within a FavouritesProvider');
  }
  return context;
}; 