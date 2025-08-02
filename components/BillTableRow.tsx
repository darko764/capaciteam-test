import React from 'react';
import { TableCell, TableRow, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Bill } from '../types/bill';
import { ROW_COLUMN_STYLES } from './BillTableCore';

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
      <TableCell sx={ROW_COLUMN_STYLES.billNumber}>
        {bill.billNo}
      </TableCell>
      <TableCell sx={ROW_COLUMN_STYLES.billType}>
        {bill.billType}
      </TableCell>
      <TableCell sx={ROW_COLUMN_STYLES.billStatus}>
        {bill.status}
      </TableCell>
      <TableCell sx={ROW_COLUMN_STYLES.sponsor}>
        {bill.sponsor}
      </TableCell>
      <TableCell sx={ROW_COLUMN_STYLES.favourite}>
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