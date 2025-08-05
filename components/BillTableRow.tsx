import React from 'react';
import { TableCell, TableRow, IconButton, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Bill } from '../types/bill';
import { ROW_COLUMN_STYLES } from './BillTableCore';
import { getStatusColor } from '../utils/statusColors';

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
  const statusConfig = getStatusColor(bill.status);

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
        <Chip
          label={bill.status}
          color={statusConfig.color}
          variant={statusConfig.variant}
          size="small"
          sx={{ 
            fontSize: '0.75rem',
            height: 24,
            '& .MuiChip-label': {
              px: 1
            }
          }}
        />
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