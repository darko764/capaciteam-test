import { Bill, BillsResponse } from '../types/bill';

export async function fetchBills(page: number = 1, pageSize: number = 10): Promise<BillsResponse> {
  // Use absolute URL on the server, relative on the client
  const isServer = typeof window === 'undefined';
  const baseUrl = isServer
    ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    : '';
  const url = `${baseUrl}/api/bills?page=${page}&limit=${pageSize}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch bills');
  const data = await res.json();

  // Parse the API response to extract required fields from results[].bill
  const bills = (data.results || []).map((item: any) => {
    const bill = item.bill;
    return {
      billNo: bill.billNo,
      billYear: bill.billYear,
      billType: bill.billType,
      status: bill.mostRecentStage?.event?.stageOutcome || '',
      sponsor: bill.originHouse?.showAs || '',
      shortTitleEn: bill.shortTitleEn || '',
      shortTitleGa: bill.shortTitleGa || '',
    };
  });

  // Extract total count from the API response
  const totalCount = data.head?.counts?.billCount || 0;

  return { bills, totalCount };
}
