'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Bill } from '../types/bill';

interface BillModalProps {
  open: boolean;
  onClose: () => void;
  bill: Bill | null;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`bill-tabpanel-${index}`}
      aria-labelledby={`bill-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const BillModal: React.FC<BillModalProps> = ({ open, onClose, bill }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClose = () => {
    setTabValue(0); // Reset tab when closing
    onClose();
  };

  if (!bill) return null;

  // Data-driven bill information for English
  const englishBillInfo = [
    { label: 'Bill Number', value: bill.billNo },
    { label: 'Bill Year', value: bill.billYear },
    { label: 'Bill Type', value: bill.billType },
    { label: 'Status', value: bill.status },
    { label: 'Sponsor', value: bill.sponsor },
    { label: 'Source', value: bill.source },
    { label: 'Method', value: bill.method },
    { label: 'Last Updated', value: new Date(bill.lastUpdated).toLocaleDateString() },
  ];

  // Data-driven bill information for Irish
  const irishBillInfo = [
    { label: 'Uimhir an Bhille', value: bill.billNo },
    { label: 'Bliain an Bhille', value: bill.billYear },
    { label: 'Cineál an Bhille', value: bill.billType },
    { label: 'Stádas', value: bill.status },
    { label: 'Urraitheoir', value: bill.sponsor },
    { label: 'Foinse', value: bill.source },
    { label: 'Modh', value: bill.method },
    { label: 'Nuashonrú Deireanach', value: new Date(bill.lastUpdated).toLocaleDateString() },
  ];

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="span">
          Bill Details - {bill.billNo}/{bill.billYear}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="bill language tabs">
            <Tab label="English" />
            <Tab label="Gaeilge" />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            {bill.shortTitleEn || 'No English title available'}
          </Typography>
          
          {bill.longTitleEn && (
            <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', color: 'text.secondary' }}>
              {bill.longTitleEn.replace(/<[^>]*>/g, '') || 'No long title available'}
            </Typography>
          )}
          
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Bill Information
          </Typography>
          <Box sx={{ '& > *': { mb: 2 } }}>
            {englishBillInfo.map(({ label, value }) => (
              <Typography key={label} variant="body2">
                <strong>{label}:</strong> {value || 'Not available'}
              </Typography>
            ))}
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            {bill.shortTitleGa || 'Níl teideal Gaeilge ar fáil'}
          </Typography>
          
          {bill.longTitleGa && (
            <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', color: 'text.secondary' }}>
              {bill.longTitleGa.replace(/<[^>]*>/g, '') || 'Níl teideal fada ar fáil'}
            </Typography>
          )}
          
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Eolas faoin mBille
          </Typography>
          <Box sx={{ '& > *': { mb: 2 } }}>
            {irishBillInfo.map(({ label, value }) => (
              <Typography key={label} variant="body2">
                <strong>{label}:</strong> {value || 'Níl ar fáil'}
              </Typography>
            ))}
          </Box>
        </TabPanel>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BillModal;

