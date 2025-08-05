import { ChipProps } from '@mui/material';

export type BillStatus = 'Current' | 'Withdrawn' | 'Enacted' | 'Rejected' | 'Defeated' | 'Lapsed';

export interface StatusColorConfig {
  color: ChipProps['color'];
  variant: ChipProps['variant'];
}

export const getStatusColor = (status: string): StatusColorConfig => {
  const normalizedStatus = status.trim();
  
  switch (normalizedStatus) {
    case 'Current':
      return { color: 'primary', variant: 'filled' as const };
    case 'Enacted':
      return { color: 'success', variant: 'filled' as const };
    case 'Rejected':
      return { color: 'error', variant: 'filled' as const };
    case 'Defeated':
      return { color: 'error', variant: 'filled' as const };
    case 'Withdrawn':
      return { color: 'warning', variant: 'filled' as const };
    case 'Lapsed':
      return { color: 'default', variant: 'outlined' as const };
    default:
      return { color: 'default', variant: 'outlined' as const };
  }
}; 