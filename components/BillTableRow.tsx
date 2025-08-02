import React from 'react';
import { TableCell, TableRow, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Bill } from '../types/bill';

interface BillTableRowProps {
  bill: Bill;
  index: number;
  isFavourited: (bill: Bill) => boolean;
  onRowClick: (bill: Bill) => void;
  onFavouriteClick: (bill: Bill, event: React.MouseEvent) => void;
}

const BillTableRow: React.FC<BillTableRowProps> = ({
  bill,
  index,
  isFavourited,
  onRowClick,
  onFavouriteClick
}) => {
  return (
    <TableRow 
      key={index} 
      hover
      onClick={() => onRowClick(bill)}
      sx={{ cursor: 'pointer', height: 56 }}
    >
      <TableCell sx={{ 
        minWidth: 90, 
        width: { xs: '15%', md: '12%' }, 
        py: 1.5, 
        pr: 1,
        whiteSpace: 'nowrap'
      }}>
        {bill.billNo}
      </TableCell>
      <TableCell sx={{ 
        minWidth: 100, 
        width: { xs: '18%', md: '15%' }, 
        py: 1.5, 
        px: 1,
        whiteSpace: 'nowrap'
      }}>
        {bill.billType}
      </TableCell>
      <TableCell sx={{ 
        minWidth: 120, 
        width: { xs: '20%', md: '18%' }, 
        py: 1.5, 
        px: 1,
        whiteSpace: 'nowrap'
      }}>
        {bill.status}
      </TableCell>
      <TableCell sx={{ 
        minWidth: 200, 
        width: { xs: '37%', md: '45%' }, 
        py: 1.5, 
        px: 1
      }}>
        {bill.sponsor}
      </TableCell>
      <TableCell sx={{ 
        minWidth: 80, 
        width: '10%', 
        py: 1.5, 
        px: 1,
        textAlign: 'center'
      }}>
        <IconButton 
          onClick={(e) => onFavouriteClick(bill, e)}
          sx={{ 
            color: isFavourited(bill) ? 'warning.main' : 'inherit',
            '&:hover': {
              color: 'warning.main'
            }
          }}
        >
          {isFavourited(bill) ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default BillTableRow;