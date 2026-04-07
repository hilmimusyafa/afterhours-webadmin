"use client";

import { useState, useEffect } from "react";

export default function Home() {
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
    alert(`Logging in as ${email}`);
  };

  return (
    <div className="page">
      {/* Logo — slides from center to left */}
      <div className={`logo-wrap ${moved ? "moved" : ""}`}>
        <div className="logo-after">AFTER</div>
        <div className="logo-hours">HOURS</div>
        <div className="logo-sub">Admin</div>
      </div>

      {/* Divider */}
      <div className={`divider ${formVisible ? "visible" : ""}`} />

      {/* Login form */}
      <div className={`form-panel ${formVisible ? "visible" : ""}`}>
        <div className="form-heading">
          <span>*ADMIN</span>LOGIN
        </div>

        <div className="field-group">
          <div>
            <div className="field-label">Email</div>
            <input
              className="field-input"
              type="email"
              placeholder="your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="field-label">Password</div>
            <input
              className="field-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button className="btn-proceed" onClick={handleProceed}>
          Proceed
        </button>

        <div className="form-footer">
          Want to buy?{" "}
          <a href="#">Click here</a>
        </div>
      </div>
    </div>
  );
}