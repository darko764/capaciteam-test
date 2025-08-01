'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Box,
  Tabs,
  Tab,
  Badge,
  Skeleton
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Bill, BillTableProps } from '../types/bill';
import Filter from './Filter';
import BillModal from './BillModal';
import FavouriteBillsTab from './FavouriteBillsTab';
import { useFavourites } from '../contexts/FavouritesContext';

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

const BillTable: React.FC<BillTableProps> = ({ bills, currentPage, currentLimit, totalCount, currentBillSource, isLoading = false }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Convert from 1-indexed (API) to 0-indexed (Material UI pagination)
  const [page, setPage] = useState(currentPage - 1);
  const [rowsPerPage, setRowsPerPage] = useState(currentLimit);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  // Tab state
  const [activeTab, setActiveTab] = useState(0);
  
  // Filter state for favourites tab
  const [favouritesBillSource, setFavouritesBillSource] = useState('');
  
  // Optimistic loading state for immediate feedback
  const [isNavigating, setIsNavigating] = useState(false);

  const { isFavourited, toggleFavourite, getFavouritedCount } = useFavourites();

  // Reset navigation state when loading completes
  useEffect(() => {
    if (!isLoading) {
      setIsNavigating(false);
    }
  }, [isLoading]);

  // Combined loading state for immediate feedback
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
    params.set('page', '1'); // Reset to first page when changing limit
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
    params.set('page', '1'); // Reset to first page when filtering
    router.push(`?${params.toString()}`);
  };

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
        <>
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
                  {showLoading ? (
                    <TableSkeleton rowCount={rowsPerPage} columnCount={5} />
                  ) : (
                    bills.map((bill, idx) => (
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
                              color: isFavourited(bill) ? 'warning.main' : 'inherit',
                              '&:hover': {
                                color: isFavourited(bill) ? 'warning.dark' : 'warning.main'
                              }
                            }}
                          >
                            {isFavourited(bill) ? (
                              <StarIcon color="inherit" />
                            ) : (
                              <StarBorderIcon color="inherit" />
                            )}
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
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </>
      )}

                  {activeTab === 1 && (
              <FavouriteBillsTab billSourceFilter={favouritesBillSource} isLoading={showLoading} />
            )}
      
      <BillModal 
        open={modalOpen}
        onClose={handleModalClose}
        bill={selectedBill}
      />
    </Box>
  );
};

export default BillTable;