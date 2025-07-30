export interface Bill {
  billNo: string;
  billYear: string;
  billType: string;
  status: string;
  sponsor: string;
  shortTitleEn: string;
  shortTitleGa: string;
  longTitleEn: string;
  longTitleGa: string;
  source: string;
  method: string;
  lastUpdated: string;
}

export interface BillsResponse {
  bills: Bill[];
  totalCount: number;
}

export interface BillTableProps {
  bills: Bill[];
  currentPage: number;
  currentLimit: number;
  totalCount: number;
  currentBillSource: string;
}
