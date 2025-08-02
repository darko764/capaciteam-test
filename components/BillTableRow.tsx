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
      <TableCell sx={{ minWidth: 100, width: '12%', py: 1.5, pr: 2 }}>
        {bill.billNo}
      </TableCell>
      <TableCell sx={{ minWidth: 120, width: '15%', py: 1.5, px: 2 }}>
        {bill.billType}
      </TableCell>
      <TableCell sx={{ minWidth: 140, width: '18%', py: 1.5, px: 2 }}>
        {bill.status}
      </TableCell>
      <TableCell sx={{ minWidth: 250, width: '45%', py: 1.5, px: 2 }}>
        {bill.sponsor}
      </TableCell>
      <TableCell sx={{ minWidth: 70, width: '10%', py: 1.5, px: 2 }}>
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