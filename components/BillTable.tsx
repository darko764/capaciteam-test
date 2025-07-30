'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Bill } from '../utils/api';

interface BillTableProps {
  bills: Bill[];
}

const BillTable: React.FC<BillTableProps> = ({ bills }) => {
  return (
    <TableContainer component={Paper}>
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
  );
};

export default BillTable;
