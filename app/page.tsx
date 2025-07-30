import styles from "./page.module.css";
import BillTable from "../components/BillTable";
import { fetchBills } from "../utils/api";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: HomeProps) {
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const limit = typeof searchParams.limit === 'string' ? parseInt(searchParams.limit) : 10;
  
  const { bills, totalCount } = await fetchBills(page, limit);
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <BillTable bills={bills} currentPage={page} currentLimit={limit} totalCount={totalCount} />
      </main>
    </div>
  );
}
