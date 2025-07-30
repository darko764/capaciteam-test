export interface Bill {
  billNo: string;
  billYear: string;
  billType: string;
  status: string;
  sponsor: string;
  shortTitleEn: string;
  shortTitleGa: string;
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
}
