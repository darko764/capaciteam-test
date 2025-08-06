'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Typography
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Bill } from '../../types/bill';
import BillTableRow from './BillTableRow';
import BillTableSkeleton from './BillTableSkeleton';
import BillModal from './BillModal';

export interface BillTableCoreProps {
  /** Array of bills to display */
  bills: Bill[];
  /** Current page (0-indexed for pagination component) */
  page: number;
  /** Number of rows per page */
  rowsPerPage: number;
  /** Total count for pagination */
  totalCount: number;
  /** Whether the table is in loading state */
  isLoading?: boolean;
  /** Function to check if a bill is favourited */
  isFavourited: (bill: Bill) => boolean;
  /** Callback when page changes */
  onPageChange: (event: unknown, newPage: number) => void;
  /** Callback when rows per page changes */
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Callback when favourite button is clicked */
  onFavouriteClick: (bill: Bill, event: React.MouseEvent) => void;
  /** Empty state configuration */
  emptyState?: {
    icon?: React.ReactNode;
    title: string;
    description: string;
  };
}

// Centralized column styling - SINGLE SOURCE OF TRUTH
export const COLUMN_STYLES = {
  billNumber: {
    minWidth: 90,
    width: { xs: '14%', md: '12%' },
    py: 3,
    pr: 1,
    fontSize: '0.875rem',
    whiteSpace: 'nowrap' as const
  },
  billType: {
    minWidth: 100,
    width: { xs: '16%', md: '15%' },
    py: 3,
    px: 1,
    fontSize: '0.875rem',
    whiteSpace: 'nowrap' as const
  },
  billStatus: {
    minWidth: 120,
    width: { xs: '18%', md: '18%' },
    py: 3,
    px: 1,
    fontSize: '0.875rem',
    whiteSpace: 'nowrap' as const
  },
  sponsor: {
    minWidth: 200,
    width: { xs: '32%', md: '45%' },
    py: 3,
    px: 1,
    fontSize: '0.875rem'
  },
  favourite: {
    minWidth: 80,
    width: { xs: '20%', md: '10%' },
    py: 3,
    px: 1,
    fontSize: '0.875rem',
    textAlign: 'center' as const
  }
};

// Row variants of the same styles
export const ROW_COLUMN_STYLES = {
  billNumber: { ...COLUMN_STYLES.billNumber, py: 1.5, fontWeight: 400 },
  billType: { ...COLUMN_STYLES.billType, py: 1.5, fontWeight: 400 },
  billStatus: { ...COLUMN_STYLES.billStatus, py: 1.5, fontWeight: 400 },
  sponsor: { ...COLUMN_STYLES.sponsor, py: 1.5, fontWeight: 400 },
  favourite: { ...COLUMN_STYLES.favourite, py: 1.5, fontWeight: 400 }
};

/**
 * BillTableCore Component
 * 
 * A unified table component that handles both main bills and favourites display.
 * Provides consistent styling, pagination, and interactions across different contexts.
 */
const BillTableCore: React.FC<BillTableCoreProps> = ({
  bills,
  page,
  rowsPerPage,
  totalCount,
  isLoading = false,
  isFavourited,
  onPageChange,
  onRowsPerPageChange,
  onFavouriteClick,
  emptyState
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  const handleRowClick = (bill: Bill) => {
    setSelectedBill(bill);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedBill(null);
  };

  // Show empty state if no bills and not loading
  if (bills.length === 0 && !isLoading && emptyState) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        color: 'text.secondary'
      }}>
        {emptyState.icon || <StarIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />}
        <Typography variant="h6" gutterBottom>
          {emptyState.title}
        </Typography>
        <Typography variant="body2">
          {emptyState.description}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper>
        <TableContainer>
          <Table sx={{ 
            tableLayout: 'fixed', 
            width: '100%', 
            minWidth: 800, // Ensure minimum table width
            '& .MuiTableCell-root:first-of-type': { pl: 3 } 
          }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...COLUMN_STYLES.billNumber, fontWeight: 600 }}>
                  Bill Number
                </TableCell>
                <TableCell sx={{ ...COLUMN_STYLES.billType, fontWeight: 600 }}>
                  Bill Type
                </TableCell>
                <TableCell sx={{ ...COLUMN_STYLES.billStatus, fontWeight: 600 }}>
                  Bill Status
                </TableCell>
                <TableCell sx={{ ...COLUMN_STYLES.sponsor, fontWeight: 600 }}>
                  Sponsor
                </TableCell>
                <TableCell sx={{ ...COLUMN_STYLES.favourite, fontWeight: 600 }}>
                  Favourite
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <BillTableSkeleton rowCount={rowsPerPage} />
              ) : (
                bills.map((bill, idx) => (
                  <BillTableRow
                    key={idx}
                    bill={bill}
                    index={idx}
                    isFavourited={isFavourited}
                    onRowClick={handleRowClick}
                    onFavouriteClick={onFavouriteClick}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </Paper>

      <BillModal
        open={modalOpen}
        onClose={handleModalClose}
        bill={selectedBill}
      />
    </Box>
  );
};

export default BillTableCore;