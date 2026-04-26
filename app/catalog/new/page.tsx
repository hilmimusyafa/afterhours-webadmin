"use client";

import Link from "next/link";

export default function AddProductPage() {
  return (
    <div className="text-[#f0ece4] flex flex-col gap-10 w-full">

      {/* Back */}
      <Link
        href="/catalog"
        className="w-fit flex items-center gap-2 px-4 py-2 border border-[#1e1e1e] font-mono text-[11px] tracking-widest text-[#555] uppercase hover:text-[#d42b2b] hover:border-[#3a0d0d] transition-all"
      >
        ← catalog
      </Link>

      <div className="grid md:grid-cols-2 gap-16 items-start">

        {/* Image Upload Placeholder */}
        <div className="relative w-full aspect-square bg-[#0f0f0f] border border-dashed border-[#2a2a2a] flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#d42b2b] transition-all group">
          <span className="text-4xl text-[#2a2a2a] group-hover:text-[#3a0d0d] transition-colors">+</span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#333] group-hover:text-[#555] transition-colors">
            Upload Image
          </span>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-8">

          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-semibold tracking-tight">Add Product</h1>
            <p className="text-[#555] font-mono text-[11px] tracking-widest uppercase">New catalog entry</p>
          </div>

          <div className="h-px bg-[#1a1a1a]" />

          {/* Fields */}
          <div className="flex flex-col gap-5">

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] tracking-widest uppercase text-[#444]">
                Product Name
              </label>
              <input
                type="text"
                placeholder="e.g. NEO STUDIO 60HE+"
                className="bg-[#0f0f0f] border border-[#1a1a1a] px-4 py-3 text-sm text-[#f0ece4] font-mono placeholder:text-[#333] outline-none focus:border-[#d42b2b] transition-all"
              />
            </div>

            {/* Price + Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] tracking-widest uppercase text-[#444]">
                  Price (USD)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="bg-[#0f0f0f] border border-[#1a1a1a] px-4 py-3 text-sm text-[#f0ece4] font-mono placeholder:text-[#333] outline-none focus:border-[#d42b2b] transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] tracking-widest uppercase text-[#444]">
                  Stock
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="bg-[#0f0f0f] border border-[#1a1a1a] px-4 py-3 text-sm text-[#f0ece4] font-mono placeholder:text-[#333] outline-none focus:border-[#d42b2b] transition-all"
                />
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] tracking-widest uppercase text-[#444]">
                Category
              </label>
              <select className="bg-[#0f0f0f] border border-[#1a1a1a] px-4 py-3 text-sm text-[#f0ece4] font-mono outline-none focus:border-[#d42b2b] transition-all appearance-none cursor-pointer">
                <option value="" disabled selected className="text-[#333]">Select category</option>
                <option value="peripherals">Peripherals</option>
                <option value="furniture">Furniture</option>
                <option value="audio">Audio</option>
                <option value="desk_accessories">Desk Accessories</option>
                <option value="eyewear">Eyewear</option>
              </select>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] tracking-widest uppercase text-[#444]">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Product description..."
                className="bg-[#0f0f0f] border border-[#1a1a1a] px-4 py-3 text-sm text-[#f0ece4] font-mono placeholder:text-[#333] outline-none focus:border-[#d42b2b] transition-all resize-none"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] tracking-widest uppercase text-[#444]">
                Tags
              </label>
              <input
                type="text"
                placeholder="e.g. Hall Effect, 60%, Hot-swap"
                className="bg-[#0f0f0f] border border-[#1a1a1a] px-4 py-3 text-sm text-[#f0ece4] font-mono placeholder:text-[#333] outline-none focus:border-[#d42b2b] transition-all"
              />
              <span className="font-mono text-[9px] text-[#333] tracking-widest">
                Separate with commas
              </span>
            </div>

          </div>

          <div className="h-px bg-[#1a1a1a]" />

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/catalog"
              className="text-center bg-[#0f0f0f] border border-[#1e1e1e] hover:border-[#555] text-[#555] font-mono text-[11px] tracking-widest uppercase py-4 transition-all"
            >
              Cancel
            </Link>
            <button className="bg-[#d42b2b] hover:bg-[#bb2222] text-white font-mono text-[11px] tracking-widest uppercase py-4 transition-colors">
              Save Product
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}