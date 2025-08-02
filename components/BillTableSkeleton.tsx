import React from 'react';
import { TableCell, TableRow, Skeleton } from '@mui/material';

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
      <TableCell sx={{ minWidth: 100, width: '12%', py: 1.5, pr: 2 }}>
        <Skeleton variant="text" width="60%" height={20} />
      </TableCell>
      <TableCell sx={{ minWidth: 120, width: '15%', py: 1.5, px: 2 }}>
        <Skeleton variant="text" width="80%" height={20} />
      </TableCell>
      <TableCell sx={{ minWidth: 140, width: '18%', py: 1.5, px: 2 }}>
        <Skeleton variant="text" width="70%" height={20} />
      </TableCell>
      <TableCell sx={{ minWidth: 250, width: '45%', py: 1.5, px: 2 }}>
        <Skeleton variant="text" width="85%" height={20} />
      </TableCell>
      <TableCell sx={{ minWidth: 70, width: '10%', py: 1.5, px: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
      </TableCell>
    </TableRow>
  ))}</>
);

export default BillTableSkeleton;