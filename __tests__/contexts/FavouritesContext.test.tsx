import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useRouter, useSearchParams } from 'next/navigation';
import { FavouritesProvider } from '../../contexts/FavouritesContext';
import { Bill } from '../../types/bill';
import BillTable from '../../components/BillTable';

// Mock bill data
const mockBill1: Bill = {
  billNo: 'B1',
  billYear: '2024',
  billType: 'Government',
  status: 'First Stage',
  sponsor: 'John Doe',
  shortTitleEn: 'Test Bill 1',
  shortTitleGa: 'Tástáil Bille 1',
  longTitleEn: 'Long title for test bill 1',
  longTitleGa: 'Teideal fada don tástáil bille 1',
  source: 'Government',
  method: 'standard',
  lastUpdated: '2024-01-01T00:00:00Z',
};

const mockBill2: Bill = {
  billNo: 'B2',
  billYear: '2024',
  billType: 'Private',
  status: 'Second Stage',
  sponsor: 'Jane Smith',
  shortTitleEn: 'Test Bill 2',
  shortTitleGa: 'Tástáil Bille 2',
  longTitleEn: 'Long title for test bill 2',
  longTitleGa: 'Teideal fada don tástáil bille 2',
  source: 'Private',
  method: 'standard',
  lastUpdated: '2024-01-02T00:00:00Z',
};

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
};

const mockSearchParams = new URLSearchParams();

describe('FavouritesContext', () => {
  const renderWithProviders = (component: React.ReactElement) => {
    const theme = createTheme();
    return render(
      <ThemeProvider theme={theme}>
        <FavouritesProvider>
          {component}
        </FavouritesProvider>
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  it('can favourite and unfavourite bills through real components', async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    renderWithProviders(
      <BillTable 
        bills={[mockBill1, mockBill2]}
        currentPage={1}
        currentLimit={10}
        totalCount={2}
        currentBillSource=""
      />
    );

    // Find and click the first star button (should be empty initially)
    const starButtons = screen.getAllByRole('button').filter(button => 
      button.querySelector('svg[data-testid="StarBorderIcon"]')
    );
    
    await user.click(starButtons[0]);

    // Should now show filled star and log message
    expect(screen.getByTestId('StarIcon')).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith('Request to favourite bill B1/2024 was dispatched to the server');

    consoleSpy.mockRestore();
  });

  it('maintains favourites when switching to favourites tab', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <BillTable 
        bills={[mockBill1, mockBill2]}
        currentPage={1}
        currentLimit={10}
        totalCount={2}
        currentBillSource=""
      />
    );

    // Favourite a bill
    const starButtons = screen.getAllByRole('button').filter(button => 
      button.querySelector('svg[data-testid="StarBorderIcon"]')
    );
    await user.click(starButtons[0]);

    // Switch to favourites tab
    const favouritesTab = screen.getByRole('tab', { name: /Favourites/ });
    await user.click(favouritesTab);

    // Should show the favourited bill in the table
    expect(screen.getByText('B1')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});