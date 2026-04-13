// app/dashboard/orders/page.tsx
"use client";

import { useState } from "react";
import styles from "./page.module.css";

const ORDERS = [
  { id: "27/03/2142", name: "~ NEO STUDIO 60HE+", customer: "abdul.1ahmiques", status: "COMPLETED" },
  { id: "17/03/2142", name: "~ NEO STUDIO 60HE+", customer: "abdul.1ahmiques", status: "COMPLETED" },
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");

  const filtered = ORDERS.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>
        ORDER <span>MANAGER</span>
      </h1>

      <div className={styles.searchWrap}>
        <span className={styles.searchTilde}>~</span>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={styles.searchBtn}>⊕</button>
      </div>

      <div className={styles.orderList}>
        {filtered.map((order, i) => (
          <div key={i} className={styles.orderCard}>
            <div className={styles.orderImg} />
            <div className={styles.orderInfo}>
              <div className={styles.orderId}>{order.id}</div>
              <div className={styles.orderName}>{order.name}</div>
              <div className={styles.orderCustomer}>
                <span className={styles.dot} />
                {order.customer}
              </div>
            </div>
            <div className={styles.orderStatus}>{order.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}