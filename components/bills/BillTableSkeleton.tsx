import React from 'react';
import { TableCell, TableRow, Skeleton, Box } from '@mui/material';
import { ROW_COLUMN_STYLES } from './BillTableCore';

interface BillTableSkeletonProps {
  rowCount: number;
}

/**
 * BillTableSkeleton Component
 * 
 * Renders skeleton loading rows that match the exact dimensions and styling
 * of actual bill table rows for seamless loading transitions.
 * 
 * @param rowCount - Number of skeleton rows to display (matches pagination size)
 */
const BillTableSkeleton: React.FC<BillTableSkeletonProps> = ({ rowCount }) => (
  <>{[...Array(rowCount)].map((_, index) => (
    <TableRow key={index} sx={{ height: 56 }}>
      <TableCell sx={ROW_COLUMN_STYLES.billNumber}>
        <Skeleton variant="text" width="60%" height={20} />
      </TableCell>
      <TableCell sx={ROW_COLUMN_STYLES.billType}>
        <Skeleton variant="text" width="80%" height={20} />
      </TableCell>
      <TableCell sx={ROW_COLUMN_STYLES.billStatus}>
        <Skeleton variant="text" width="70%" height={20} />
      </TableCell>
      <TableCell sx={ROW_COLUMN_STYLES.sponsor}>
        <Skeleton variant="text" width="85%" height={20} />
      </TableCell>
      <TableCell sx={ROW_COLUMN_STYLES.favourite}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
      </TableCell>
    </TableRow>
  ))}</>
);

export default BillTableSkeleton;