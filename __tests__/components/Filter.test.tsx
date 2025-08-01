import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Filter from '../../components/Filter';

// Helper to wrap components with MUI theme
const renderWithTheme = (component: React.ReactElement) => {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Filter Component', () => {
  const mockOnBillSourceChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct label', () => {
    renderWithTheme(
      <Filter billSource="" onBillSourceChange={mockOnBillSourceChange} />
    );

    expect(screen.getByLabelText('Bill Source')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('calls onBillSourceChange when option is selected', async () => {
    const user = userEvent.setup();
    
    renderWithTheme(
      <Filter billSource="" onBillSourceChange={mockOnBillSourceChange} />
    );

    // Click on the select dropdown
    const select = screen.getByRole('combobox');
    await user.click(select);

    // Click on "Government Bills" option
    const governmentOption = screen.getByRole('option', { name: 'Government Bills' });
    await user.click(governmentOption);

    expect(mockOnBillSourceChange).toHaveBeenCalledWith('Government');
  });
});