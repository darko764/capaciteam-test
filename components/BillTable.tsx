'use client';

import React, { useState } from 'react';
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
  Box
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Bill, BillTableProps } from '../types/bill';
import Filter from './Filter';
import BillModal from './BillModal';
import { useFavourites } from '../hooks/useFavourites';

const BillTable: React.FC<BillTableProps> = ({ bills, currentPage, currentLimit, totalCount, currentBillSource }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Convert from 1-indexed (API) to 0-indexed (Material UI pagination)
  const [page, setPage] = useState(currentPage - 1);
  const [rowsPerPage, setRowsPerPage] = useState(currentLimit);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  const { isFavourited, toggleFavourite } = useFavourites();

  const handleChangePage = (event: unknown, newPage: number) => {
    const newPageOneIndexed = newPage + 1; // Convert back to 1-indexed for API
    setPage(newPage);
    
    const params = new URLSearchParams(searchParams);
    params.set('page', newPageOneIndexed.toString());
    router.push(`?${params.toString()}`);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    setRowsPerPage(newLimit);
    setPage(0);
    
    const params = new URLSearchParams(searchParams);
    params.set('limit', newLimit.toString());
    params.set('page', '1'); // Reset to first page when changing limit
    router.push(`?${params.toString()}`);
  };

  const handleBillSourceChange = (billSource: string) => {
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

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
      <Box sx={{ mb: 2, width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Filter 
          billSource={currentBillSource} 
          onBillSourceChange={handleBillSourceChange} 
        />
      </Box>
      <Paper>
        <TableContainer>
          <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 120, width: '15%', fontWeight: 600 }}>Bill Number</TableCell>
                <TableCell sx={{ minWidth: 100, width: '15%', fontWeight: 600 }}>Bill Type</TableCell>
                <TableCell sx={{ minWidth: 120, width: '20%', fontWeight: 600 }}>Bill Status</TableCell>
                <TableCell sx={{ minWidth: 200, width: '35%', fontWeight: 600 }}>Sponsor</TableCell>
                <TableCell sx={{ minWidth: 80, width: '15%', fontWeight: 600 }}>Favourite</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bills.map((bill, idx) => (
                <TableRow 
                  key={idx} 
                  hover
                  onClick={() => handleRowClick(bill)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell sx={{ minWidth: 120, width: '15%' }}>{bill.billNo}</TableCell>
                  <TableCell sx={{ minWidth: 100, width: '15%' }}>{bill.billType}</TableCell>
                  <TableCell sx={{ minWidth: 120, width: '20%' }}>{bill.status}</TableCell>
                  <TableCell sx={{ minWidth: 200, width: '35%' }}>{bill.sponsor}</TableCell>
                  <TableCell sx={{ minWidth: 80, width: '15%' }}>
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
              ))}
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
      
      <BillModal 
        open={modalOpen}
        onClose={handleModalClose}
        bill={selectedBill}
      />
    </Box>
  );
};

export default BillTable;