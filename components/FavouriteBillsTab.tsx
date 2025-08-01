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
  IconButton,
  Box,
  Typography,
  TablePagination,
  Skeleton
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Bill } from '../types/bill';
import { useFavourites } from '../contexts/FavouritesContext';
import BillModal from './BillModal';

// Skeleton loading component for table rows
const TableSkeleton: React.FC<{ rowCount: number; columnCount: number }> = ({ rowCount, columnCount }) => (
  <>{[...Array(rowCount)].map((_, index) => (
    <TableRow key={index} sx={{ height: 80 }}>
      <TableCell sx={{ minWidth: 100, width: '12%', py: 2.5, pr: 2 }}>
        <Skeleton variant="text" width="60%" height={20} />
      </TableCell>
      <TableCell sx={{ minWidth: 120, width: '15%', py: 2.5, px: 2 }}>
        <Skeleton variant="text" width="80%" height={20} />
      </TableCell>
      <TableCell sx={{ minWidth: 140, width: '18%', py: 2.5, px: 2 }}>
        <Skeleton variant="text" width="70%" height={20} />
      </TableCell>
      <TableCell sx={{ minWidth: 250, width: '45%', py: 2.5, px: 2 }}>
        <Skeleton variant="text" width="85%" height={20} />
      </TableCell>
      <TableCell sx={{ minWidth: 70, width: '10%', py: 2.5, px: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
      </TableCell>
    </TableRow>
  ))}</>
);

interface FavouriteBillsTabProps {
  billSourceFilter: string;
  isLoading?: boolean;
}

const FavouriteBillsTab: React.FC<FavouriteBillsTabProps> = ({ billSourceFilter, isLoading = false }) => {
  const { isFavourited, toggleFavourite, getFavouritedBills, getFavouritedCount } = useFavourites();
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  
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

  const handleRowClick = (bill: Bill) => {
    setSelectedBill(bill);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedBill(null);
  };

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

  // Show empty state if no favourited bills at all
  if (favouritedCount === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        py: 8,
        color: 'text.secondary'
      }}>
        <StarIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
        <Typography variant="h6" gutterBottom>
          No Favourited Bills
        </Typography>
        <Typography variant="body2">
          Click the star icon next to any bill to add it to your favourites.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
      
      {/* Show empty state if no bills match the filter */}
      {filteredFavouritedBills.length === 0 && favouritedCount > 0 ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          py: 8,
          color: 'text.secondary'
        }}>
          <StarIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
          <Typography variant="h6" gutterBottom>
            No Bills Match Filter
          </Typography>
          <Typography variant="body2">
            Try changing the filter or clear it to see all favourited bills.
          </Typography>
        </Box>
      ) : (
        <Paper>
        <TableContainer>
          <Table sx={{ tableLayout: 'fixed', width: '100%', '& .MuiTableCell-root:first-of-type': { pl: 3 } }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 100, width: '12%', fontWeight: 600, py: 3, pr: 2, fontSize: '0.875rem' }}>Bill Number</TableCell>
                <TableCell sx={{ minWidth: 120, width: '15%', fontWeight: 600, py: 3, px: 2, fontSize: '0.875rem' }}>Bill Type</TableCell>
                <TableCell sx={{ minWidth: 140, width: '18%', fontWeight: 600, py: 3, px: 2, fontSize: '0.875rem' }}>Bill Status</TableCell>
                <TableCell sx={{ minWidth: 250, width: '45%', fontWeight: 600, py: 3, px: 2, fontSize: '0.875rem' }}>Sponsor</TableCell>
                <TableCell sx={{ minWidth: 70, width: '10%', fontWeight: 600, py: 3, px: 2, fontSize: '0.875rem' }}>Favourite</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableSkeleton rowCount={rowsPerPage} columnCount={5} />
              ) : (
                favouritedBills.map((bill, idx) => (
                  <TableRow 
                    key={idx} 
                    hover
                    onClick={() => handleRowClick(bill)}
                    sx={{ cursor: 'pointer', height: 80 }}
                  >
                    <TableCell sx={{ minWidth: 100, width: '12%', py: 2.5, pr: 2 }}>{bill.billNo}</TableCell>
                    <TableCell sx={{ minWidth: 120, width: '15%', py: 2.5, px: 2 }}>{bill.billType}</TableCell>
                    <TableCell sx={{ minWidth: 140, width: '18%', py: 2.5, px: 2 }}>{bill.status}</TableCell>
                    <TableCell sx={{ minWidth: 250, width: '45%', py: 2.5, px: 2 }}>{bill.sponsor}</TableCell>
                    <TableCell sx={{ minWidth: 70, width: '10%', py: 2.5, px: 2 }}>
                      <IconButton 
                        onClick={(e) => handleFavouriteClick(bill, e)}
                        sx={{ 
                          color: 'warning.main',
                          '&:hover': {
                            color: 'warning.dark'
                          }
                        }}
                      >
                        <StarIcon color="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredFavouritedBills.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
      )}
      
      <BillModal 
        open={modalOpen}
        onClose={handleModalClose}
        bill={selectedBill}
      />
    </Box>
  );
};

export default FavouriteBillsTab;
