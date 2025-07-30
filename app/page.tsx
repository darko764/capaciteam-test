import styles from "./page.module.css";
import BillTable from "../components/BillTable";
import { fetchBills } from "../utils/api";
import { Box } from "@mui/material";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
  const limit = typeof params.limit === 'string' ? parseInt(params.limit) : 10;
  const billSource = typeof params.bill_source === 'string' ? params.bill_source : '';
  
  const { bills, totalCount } = await fetchBills(page, limit, billSource);
  
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      padding: 3,
      width: '100%',
      backgroundColor: 'background.default',
      color: 'text.primary'
    }}>
      <BillTable 
        bills={bills} 
        currentPage={page} 
        currentLimit={limit} 
        totalCount={totalCount}
        currentBillSource={billSource}
      />
    </Box>
  );
}