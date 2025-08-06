import styles from "./page.module.css";
import { BillTableWithData } from "../components/bills";
import { Box } from "@mui/material";
import { Suspense } from "react";

export default function Home() {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      padding: 3,
      width: '100%',
      backgroundColor: 'background.default',
      color: 'text.primary'
    }}>
      <Suspense fallback={null}>
        <BillTableWithData />
      </Suspense>
    </Box>
  );
}