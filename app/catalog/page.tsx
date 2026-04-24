// app/dashboard/catalog/page.tsx
"use client";

import { useState } from "react";

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
    <div className="flex flex-col items-center gap-6 pt-3 min-h-screen overflow-y-scroll">
      <h1 className="text-[2.0rem] py-6 font-normal tracking-[0.1em] text-[#f0ece4]">
        CATALOG <span className="text-[#d42b2b]">MANAGER</span>
      </h1>

      <div className="flex items-center w-full max-w-[480px] bg-[#111] border border-[#222] px-3 py-2 gap-2">
        <span className="font-mono text-[0.8rem] text-[#444]">~</span>
        <input
          className="flex-1 bg-transparent outline-none text-[#f0ece4] font-mono text-[0.75rem] tracking-[0.05em] placeholder:text-[#333]"
          type="text"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-transparent border-none text-[#d42b2b] text-base cursor-pointer leading-none">
          ⊕
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 py-10 w-full">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-[#111] border border-[#1a1a1a] overflow-hidden cursor-pointer transition-colors duration-200 hover:border-[#333]"
          >
            <div className="w-full aspect-square bg-[#1e1612]" />
            <div className="px-3 py-2.5 font-mono text-[0.75em] tracking-[0.08em] text-[#888] border-t border-[#1a1a1a]">
              {product.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}