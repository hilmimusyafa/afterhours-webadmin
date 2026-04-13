"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const NAV = [
  { label: "DASH", href: "/dashboard" },
  { label: "CTLG", href: "/dashboard/catalog" },
  { label: "ORDR", href: "/dashboard/orders" },
  { label: "APIM", href: "/dashboard/apim" },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <header className={styles.navbar}>
      <Link href="/dashboard" className={styles.brand}>
        <span className={styles.brandAfter}>AFTER</span>
        <span className={styles.brandHours}>HOURS</span>
        <span className={styles.brandAdmin}>ADMIN</span>
      </Link>

      <div className={styles.right}>
        <nav className={styles.nav}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${isActive(item.href) ? styles.active : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.avatar}>S</div>
      </div>
    </header>
  );
}