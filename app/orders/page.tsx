"use client";

import Link from "next/link";
import { useState } from "react";
import { getOrders } from "../../lib/services/order.service";

const STATUS_STYLES: Record<string, string> = {
  pending: "text-amber-400 border-amber-900 bg-amber-950",
  shipped: "text-blue-400 border-blue-900 bg-blue-950",
  delivered: "text-emerald-400 border-emerald-900 bg-emerald-950",
  cancelled: "text-[#d42b2b] border-[#3a0d0d] bg-[#1a0505]",
};

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const orders = getOrders();

  const filtered = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.user.toLowerCase().includes(search.toLowerCase()) ||
      o.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 w-full">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-['Ndot57Caps'] text-[2rem] tracking-[0.1em] text-[#f0ece4] uppercase">
          ORDER <span className="text-[#d42b2b]">MANAGER</span>
        </h1>
        <span className="font-mono text-[11px] text-[#444] tracking-widest uppercase">
          {filtered.length} orders
        </span>
      </div>

      {/* Search */}
      <div className="flex items-center w-full bg-[#0f0f0f] border border-[#1a1a1a] px-4 py-3 gap-3">
        <span className="font-mono text-base text-[#d42b2b]">~</span>
        <input
          className="flex-1 bg-transparent outline-none text-[#f0ece4] font-mono text-sm placeholder:text-[#333]"
          type="text"
          placeholder="Search by order id, customer, status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[1fr_2fr_2fr_1fr_1fr] gap-4 px-4 font-mono text-[10px] tracking-widest uppercase text-[#444]">
        <span>Order ID</span>
        <span>Customer</span>
        <span>Shipping Address</span>
        <span>Total</span>
        <span>Status</span>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-2 w-full">
        {filtered.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="grid grid-cols-[1fr_2fr_2fr_1fr_1fr] gap-4 items-center bg-[#0f0f0f] border border-[#1a1a1a] px-4 py-4 hover:border-[#333] transition-all cursor-pointer"
          >
            <span className="font-mono text-[11px] text-[#555] tracking-widest uppercase">
              {order.id}
            </span>

            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d42b2b] flex-shrink-0" />
              <span className="font-mono text-sm text-[#f0ece4]">
                {order.user}
              </span>
            </div>

            <span className="font-mono text-[11px] text-[#555] truncate">
              {order.shipping_address}
            </span>

            <span className="font-mono text-sm text-[#d42b2b]">
              ${order.total_amount.toFixed(2)}
            </span>

            <span
              className={`font-mono text-[10px] tracking-widest uppercase border px-2 py-1 w-fit ${STATUS_STYLES[order.status]}`}
            >
              {order.status}
            </span>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="text-center font-mono text-[12px] text-[#333] tracking-widest py-20 uppercase">
            No orders found
          </div>
        )}
      </div>
    </div>
  );
}