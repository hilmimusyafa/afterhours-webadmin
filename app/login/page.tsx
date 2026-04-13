"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function Home() {
  const router = useRouter();
  const [moved, setMoved] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const t1 = setTimeout(() => setMoved(true), 2000);
    const t2 = setTimeout(() => setFormVisible(true), 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleProceed = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className={styles.page}>
      {/* Logo — slides from center to left */}
      <div className={`${styles.logoWrap} ${moved ? styles.moved : ""}`}>
        <div className={styles.logoAfter}>AFTER</div>
        <div className={styles.logoHours}>HOURS</div>
        <div className={styles.logoSub}>Admin</div>
      </div>

      {/* Divider */}
      <div className={`${styles.divider} ${formVisible ? styles.visible : ""}`} />

      {/* Login form */}
      <div className={`${styles.formPanel} ${formVisible ? styles.visible : ""}`}>
        <div className={styles.formHeading}>
          <span>*ADMIN </span>LOGIN
        </div>

        <div className={styles.fieldGroup}>
          <div>
            <div className={styles.fieldLabel}>Email</div>
            <input
              className={styles.fieldInput}
              type="email"
              placeholder="your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className={styles.fieldLabel}>Password</div>
            <input
              className={styles.fieldInput}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && router.push("/dashboard")}
            />
          </div>
        </div>

        <button className={styles.btnProceed} onClick={handleProceed}>
          Proceed
        </button>

      </div>
    </div>
  );
}