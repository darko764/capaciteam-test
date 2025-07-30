import styles from "./page.module.css";
import BillTable from "../components/BillTable";
import { fetchBills } from "../utils/api";

export default async function Home() {
  const bills = await fetchBills();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <BillTable bills={bills} />
      </main>
    </div>
  );
}
