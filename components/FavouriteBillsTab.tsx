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
  Typography
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Bill } from '../types/bill';
import { useFavourites } from '../contexts/FavouritesContext';
import BillModal from './BillModal';

interface FavouriteBillsTabProps {
  allBills: Bill[];
}

const FavouriteBillsTab: React.FC<FavouriteBillsTabProps> = ({ allBills }) => {
  const { isFavourited, toggleFavourite, getFavouritedBills, getFavouritedCount } = useFavourites();
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  // Get favourited bills
  const favouritedBills = getFavouritedBills(allBills);
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

  // Show empty state if no favourited bills
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
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <StarIcon sx={{ color: 'warning.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Favourited Bills ({favouritedCount})
        </Typography>
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
              {favouritedBills.map((bill, idx) => (
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      <BillModal 
        open={modalOpen}
        onClose={handleModalClose}
        bill={selectedBill}
      />
    </Box>
  );
};

export default FavouriteBillsTab;
