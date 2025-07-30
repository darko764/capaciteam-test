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
  TablePagination
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Bill, BillTableProps } from '../types/bill';

const BillTable: React.FC<BillTableProps> = ({ bills, currentPage, currentLimit, totalCount }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Convert from 1-indexed (API) to 0-indexed (Material UI pagination)
  const [page, setPage] = useState(currentPage - 1);
  const [rowsPerPage, setRowsPerPage] = useState(currentLimit);

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

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bill Number</TableCell>
              <TableCell>Bill Type</TableCell>
              <TableCell>Bill Status</TableCell>
              <TableCell>Sponsor</TableCell>
              <TableCell>Favourite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map((bill, idx) => (
              <TableRow key={idx} hover>
                <TableCell>{bill.billNo}</TableCell>
                <TableCell>{bill.billType}</TableCell>
                <TableCell>{bill.status}</TableCell>
                <TableCell>{bill.sponsor}</TableCell>
                <TableCell>
                  <IconButton>
                    <StarBorderIcon color={'inherit'} />
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
  );
};

export default BillTable;