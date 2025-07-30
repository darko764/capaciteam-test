'use client';

import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface FilterProps {
  billSource: string;
  onBillSourceChange: (billSource: string) => void;
}

const Filter: React.FC<FilterProps> = ({ billSource, onBillSourceChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onBillSourceChange(event.target.value);
  };

  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel id="bill-source-filter-label">Bill Source</InputLabel>
      <Select
        labelId="bill-source-filter-label"
        id="bill-source-filter"
        value={billSource}
        label="Bill Source"
        onChange={handleChange}
      >
        <MenuItem value="">All Bills</MenuItem>
        <MenuItem value="Government">Government Bills</MenuItem>
        <MenuItem value="Private">Private Bills</MenuItem>
        <MenuItem value="Public">Public Bills</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Filter;
