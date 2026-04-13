// app/dashboard/layout.tsx
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import styles from "./layout.module.css";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}