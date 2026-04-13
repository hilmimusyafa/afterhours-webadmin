// app/dashboard/catalog/page.tsx
"use client";

import { useState } from "react";
import styles from "./page.module.css";

const PRODUCTS = [
  { id: 1, name: "~ NEO STUDIO 60HE+", img: "/placeholder.jpg" },
  { id: 2, name: "~ NEO STUDIO 60HE+", img: "/placeholder.jpg" },
  { id: 3, name: "~ NEO STUDIO 60HE+", img: "/placeholder.jpg" },
  { id: 4, name: "~ NEO STUDIO 60HE+", img: "/placeholder.jpg" },
];

export default function CatalogPage() {
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>
        CATALOG <span>MANAGER</span>
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

      <div className={styles.grid}>
        {filtered.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImg} />
            <div className={styles.productName}>{product.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}