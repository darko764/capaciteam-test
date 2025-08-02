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
      <TableCell sx={{ 
        minWidth: 90, 
        width: { xs: '15%', md: '12%' }, 
        py: 1.5, 
        pr: 1 
      }}>
        <Skeleton variant="text" width="60%" height={20} />
      </TableCell>
      <TableCell sx={{ 
        minWidth: 100, 
        width: { xs: '18%', md: '15%' }, 
        py: 1.5, 
        px: 1 
      }}>
        <Skeleton variant="text" width="80%" height={20} />
      </TableCell>
      <TableCell sx={{ 
        minWidth: 120, 
        width: { xs: '20%', md: '18%' }, 
        py: 1.5, 
        px: 1 
      }}>
        <Skeleton variant="text" width="70%" height={20} />
      </TableCell>
      <TableCell sx={{ 
        minWidth: 200, 
        width: { xs: '37%', md: '45%' }, 
        py: 1.5, 
        px: 1 
      }}>
        <Skeleton variant="text" width="85%" height={20} />
      </TableCell>
      <TableCell sx={{ 
        minWidth: 80, 
        width: '10%', 
        py: 1.5, 
        px: 1,
        textAlign: 'center' 
      }}>
        <Skeleton variant="circular" width={40} height={40} />
      </TableCell>
    </TableRow>
  ))}</>
);

export default BillTableSkeleton;