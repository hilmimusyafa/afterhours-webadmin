// app/orders/page.tsx
"use client";

import { useState } from "react";

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
    <div className="flex flex-col gap-8 w-full">
      <h1 className="font-['Ndot57Caps'] text-[2rem] tracking-[0.1em] text-center text-[#f0ece4] uppercase">
        ORDER <span className="text-[#d42b2b]">MANAGER</span>
      </h1>

      <div className="flex items-center w-full max-w-md bg-[#0f0f0f] border border-[#1a1a1a] px-4 py-3 gap-3 rounded-sm mx-auto">
        <span className="font-mono text-[0.8rem] text-[#d42b2b]">~</span>
        <input
          className="flex-1 bg-transparent outline-none text-[#f0ece4] font-mono text-sm tracking-[0.05em] placeholder:text-[#444]"
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-transparent text-[#d42b2b] text-lg leading-none hover:text-[#f0ece4] transition-colors">
          ⊕
        </button>
      </div>

      <div className="flex flex-col gap-3 w-full py-6 max-w-none">
        {filtered.map((order) => (
          <div
            key={order.id}
            className="flex items-center gap-4 bg-[#0f0f0f] border border-[#1a1a1a] p-4 cursor-pointer transition-colors duration-200 hover:border-[#333] w-full"
          >
            <div className="w-[100px] h-[80px] bg-[#1e1612] flex-shrink-0" />
            <div className="flex-1 flex flex-col gap-1">
              <div className="font-mono text-[0.85rem] tracking-[0.05em] text-[#444]">
                {order.id}
              </div>
              <div className="text-[1rem] font-normal tracking-[0.05em] text-[#f0ece4]">
                {order.name}
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[0.75rem] text-[#666]">
                <span className="w-2 h-2 rounded-full bg-[#d42b2b] flex-shrink-0" />
                {order.customer}
              </div>
            </div>
            <div className="font-mono text-[0.8rem] tracking-[0.15em] text-[#f0ece4] text-right">
              {order.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}