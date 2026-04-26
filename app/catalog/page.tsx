"use client";
import { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "NEO STUDIO 60HE+", img: "/placeholder.jpg" },
  { id: 2, name: "NEO STUDIO 60HE+", img: "/placeholder.jpg" },
  { id: 3, name: "NEO STUDIO 60HE+", img: "/placeholder.jpg" },
  { id: 4, name: "NEO STUDIO 60HE+", img: "/placeholder.jpg" },
];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const filtered = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 w-full">
      <h1 className="font-['Ndot57Caps'] text-[2rem] tracking-[0.1em] text-center text-[#f0ece4] uppercase">
        CATALOG <span className="text-[#d42b2b]">MANAGER</span>
      </h1>

      {/* Search Bar - Standar Form */}
      <div className="flex items-center w-full max-w-md bg-[#0f0f0f] border border-[#1a1a1a] px-4 py-3 gap-3 rounded-sm mx-auto">
        <span className="font-mono text-[0.8rem] text-[#d42b2b]">~</span>
        <input
          className="flex-1 bg-transparent outline-none text-[#f0ece4] font-mono text-sm tracking-[0.05em] placeholder:text-[#444]"
          type="text"
          placeholder="Search catalog..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-transparent text-[#d42b2b] text-lg leading-none hover:text-[#f0ece4] transition-colors">
          ⊕
        </button>
      </div>

      {/* Grid Standar */}
      <div className="grid grid-cols-2 md:grid-cols-3 py-6 lg:grid-cols-4 gap-6 w-full">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-sm overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#d42b2b] group"
          >
            <div className="w-full aspect-square bg-[#111] group-hover:bg-[#1a1a1a] transition-colors" />
            <div className="px-4 py-3 font-mono text-[0.75rem] tracking-[0.08em] text-[#cfcfcf] border-t border-[#1a1a1a]">
              {product.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}