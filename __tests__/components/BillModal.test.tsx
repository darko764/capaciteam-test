import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import BillModal from '../../components/BillModal';
import { Bill } from '../../types/bill';

// Helper to wrap components with MUI theme
const renderWithTheme = (component: React.ReactElement) => {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

// Mock bill data
const mockBill: Bill = {
  billNo: 'B123',
  billYear: '2024',
  billType: 'Government',
  status: 'First Stage',
  sponsor: 'John Doe',
  shortTitleEn: 'Test Bill English Title',
  shortTitleGa: 'Teideal Gaeilge Tástála',
  longTitleEn: 'This is a long English title for the test bill',
  longTitleGa: 'Seo teideal fada Gaeilge don bhille tástála',
  source: 'Government',
  method: 'standard',
  lastUpdated: '2024-01-15T10:30:00Z',
};

describe('BillModal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when open with bill data', () => {
    renderWithTheme(
      <BillModal open={true} onClose={mockOnClose} bill={mockBill} />
    );

    expect(screen.getByText('Bill Details - B123/2024')).toBeInTheDocument();
    expect(screen.getByText('Test Bill English Title')).toBeInTheDocument();
  });

  it('switches between English and Gaeilge tabs', async () => {
    const user = userEvent.setup();
    
    renderWithTheme(
      <BillModal open={true} onClose={mockOnClose} bill={mockBill} />
    );

    // Check English content is shown by default
    expect(screen.getByText('Test Bill English Title')).toBeInTheDocument();

    // Click on Gaeilge tab
    const gaeilgeTab = screen.getByRole('tab', { name: 'Gaeilge' });
    await user.click(gaeilgeTab);

    // Check Gaeilge content is now shown
    expect(screen.getByText('Teideal Gaeilge Tástála')).toBeInTheDocument();
  });
});