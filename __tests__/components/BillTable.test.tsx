import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useRouter, useSearchParams } from 'next/navigation';
import { BillTable } from '../../components/bills';
import { FavouritesProvider } from '../../contexts/FavouritesContext';
import { Bill } from '../../types/bill';

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

// Helper to wrap components with required providers
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

// Mock bill data
const mockBills: Bill[] = [
  {
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
  },
  {
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
  },
];

describe('BillTable Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  it('renders the bill table with correct data', () => {
    renderWithProviders(
      <BillTable 
        bills={mockBills}
        currentPage={1}
        currentLimit={10}
        totalCount={2}
        currentBillSource=""
      />
    );

    // Check headers
    expect(screen.getByText('Bill Number')).toBeInTheDocument();
    expect(screen.getByText('Bill Type')).toBeInTheDocument();
    expect(screen.getByText('Sponsor')).toBeInTheDocument();

    // Check data
    expect(screen.getByText('B1')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('opens modal when bill row is clicked', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(
      <BillTable 
        bills={mockBills}
        currentPage={1}
        currentLimit={10}
        totalCount={2}
        currentBillSource=""
      />
    );

    // Click on first bill row
    const billRow = screen.getByText('B1').closest('tr');
    await user.click(billRow!);

    // Check if modal opened
    expect(screen.getByText('Bill Details - B1/2024')).toBeInTheDocument();
  });

  it('handles favourite button click', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(
      <BillTable 
        bills={mockBills}
        currentPage={1}
        currentLimit={10}
        totalCount={2}
        currentBillSource=""
      />
    );

    // Click on favourite button
    const starButtons = screen.getAllByRole('button').filter(button => 
      button.querySelector('svg[data-testid="StarBorderIcon"]')
    );
    
    await user.click(starButtons[0]);

    // Check if star changed to filled
    expect(screen.getByTestId('StarIcon')).toBeInTheDocument();
  });
});