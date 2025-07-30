import styles from "./page.module.css";
import BillTable from "../components/BillTable";
import { fetchBills } from "../utils/api";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
  const limit = typeof params.limit === 'string' ? parseInt(params.limit) : 10;
  
  const { bills, totalCount } = await fetchBills(page, limit);
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <BillTable 
          bills={bills} 
          currentPage={page} 
          currentLimit={limit} 
          totalCount={totalCount}
        />
      </main>
    </div>
  );
}