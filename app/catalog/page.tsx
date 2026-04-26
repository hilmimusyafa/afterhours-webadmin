"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "../../lib/services/product.service";

export default function CatalogPage() {
  const products = getProducts();
  const [search, setSearch] = useState("");
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 w-full">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-['Ndot57Caps'] text-[2rem] tracking-[0.1em] text-[#f0ece4] uppercase">
          CATALOG <span className="text-[#d42b2b]">MANAGER</span>
        </h1>
        <Link
          href="/catalog/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#d42b2b] hover:bg-[#bb2222] text-white font-mono text-[11px] tracking-widest uppercase transition-colors"
        >
          + Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center w-full bg-[#0f0f0f] border border-[#1a1a1a] px-4 py-3 gap-3">
        <span className="font-mono text-base text-[#d42b2b]">~</span>
        <input
          className="flex-1 bg-transparent outline-none text-[#f0ece4] font-mono text-base placeholder:text-[#333]"
          type="text"
          placeholder="Search catalog..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="font-mono text-sm text-[#333] tracking-widest">
          {filtered.length} RESULTS
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {filtered.map((product) => {
          const isLowStock = product.stock <= 5;
          return (
            <Link
              key={product.id}
              href={`/catalog/${product.id}`}
              className="bg-[#0f0f0f] border border-[#1a1a1a] overflow-hidden transition-all duration-200 hover:border-[#d42b2b] group flex flex-col"
            >
              {/* Image */}
              <div className="w-full aspect-square bg-[#111] group-hover:bg-[#161616] transition-colors relative overflow-hidden">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {isLowStock && (
                  <span className="absolute top-2 left-2 font-mono text-[8px] tracking-widest uppercase bg-amber-950 text-amber-400 border border-amber-900 px-1.5 py-0.5 z-10">
                    Low Stock
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="px-3 py-3 border-t border-[#1a1a1a] flex flex-col gap-1.5">
                <span className="font-mono text-sm tracking-widest text-[#555] uppercase">
                  {product.category.replace("_", " ")}
                </span>
                <span className="font-mono text-base text-[#cfcfcf] leading-tight">
                  {product.name}
                </span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-mono text-sm text-[#d42b2b]">
                    ${product.price}
                  </span>
                  <span className={`font-mono text-sm ${isLowStock ? "text-amber-400" : "text-[#444]"}`}>
                    {product.stock} pcs
                  </span>
                </div>
              </div>
            </Link>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full text-center font-mono text-base text-[#333] tracking-widest py-20 uppercase">
            No products found
          </div>
        )}
      </div>
    </div>
  );
}