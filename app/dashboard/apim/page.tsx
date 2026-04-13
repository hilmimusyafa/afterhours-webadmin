"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function ApimPage() {
  const [search, setSearch] = useState("");

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>
        API <span>MANAGER</span>
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

      <div className={styles.panels}>
        <div className={styles.panel}>
          <div className={styles.panelLabel}>ENDPOINTS</div>
        </div>
        <div className={styles.panel}>
          <div className={styles.panelLabel}>LOGS</div>
        </div>
      </div>
    </div>
  );
}