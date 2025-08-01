/**
 * Type Definitions
 * 
 * TypeScript interfaces for bills data, API responses, and component props.
 * Ensures type safety across the application.
 */

/**
 * Bill interface representing Irish legislation data
 * Based on Oireachtas API response structure
 */
export interface Bill {
  billNo: string;
  billYear: string;
  billType: string;
  status: string;
  sponsor: string;
  shortTitleEn: string;
  shortTitleGa: string;
  longTitleEn: string;
  longTitleGa: string;
  source: string;
  method: string;
  lastUpdated: string;
}

/**
 * API response structure for bills endpoint
 */
export interface BillsResponse {
  bills: Bill[];
  totalCount: number;
}

/**
 * Props for the main BillTable component
 */
export interface BillTableProps {
  bills: Bill[];
  currentPage: number;
  currentLimit: number;
  totalCount: number;
  currentBillSource: string;
  isLoading?: boolean;
}

/**
 * Context type for session-based favourites management
 */
export interface FavouritesContextType {
  favouritedBills: Map<string, Bill>;
  isFavourited: (bill: Bill) => boolean;
  toggleFavourite: (bill: Bill) => void;
  getFavouritedBills: () => Bill[];
  getFavouritedCount: () => number;
}
