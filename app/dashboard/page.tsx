import Link from "next/link";
import styles from "./page.module.css";

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <div className={styles.card}>
          <h1 className={styles.cardTitle}>
            DASHBOARD <span>HOME</span>
          </h1>
          <p>Review orders, catalog, and API status from the dashboard home.</p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>QUICK LINKS</h2>
          <div className={styles.orderList}>
            <Link href="/dashboard/orders">Orders</Link>
            <Link href="/dashboard/catalog">Catalog</Link>
            <Link href="/dashboard/apim">API Management</Link>
          </div>
        </div>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statItem}>
          <div className={styles.statLabel}>Total Orders</div>
          <div className={styles.statValue}>12</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statLabel}>Open Catalog Items</div>
          <div className={styles.statValue}>8</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statLabel}>API Uptime</div>
          <div className={styles.statValue}>99.9%</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statLabel}>Pending Tasks</div>
          <div className={styles.statValue}>3</div>
        </div>
      </section>
    </div>
  );
}
