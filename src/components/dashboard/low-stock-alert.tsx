"use client";

import React, { useState } from "react";
import { Product } from "@/src/types/product.types";
import Link from "next/link";

export default function LowStockAlert({ products }: { products: Product[] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div 
                className="flex flex-col gap-3 bg-[#0f0f0f] border border-[#1a1a1a] p-6 rounded-sm cursor-pointer hover:border-[#d42b2b] transition-colors group"
                onClick={() => setIsOpen(true)}
            >
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#888] group-hover:text-[#d42b2b] transition-colors">
                    Low Stock Alerts
                </div>
                <div className={`font-['Ndot57Caps'] text-[1.8rem] ${products.length > 0 ? "text-[#d42b2b]" : "text-[#f0ece4]"}`}>
                    {products.length}
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-sm p-8 w-full max-w-lg flex flex-col gap-6 max-h-[80vh]">
                        <div className="flex justify-between items-center border-b border-[#1a1a1a] pb-4">
                            <h2 className="font-['Ndot57Caps'] text-[1.2rem] tracking-[0.1em] text-[#f0ece4] uppercase">
                                LOW STOCK <span className="text-[#d42b2b]">PRODUCTS</span>
                            </h2>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="text-[#888] hover:text-[#d42b2b] transition-colors font-mono"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                            {products.length === 0 ? (
                                <p className="text-[#888] font-mono text-sm text-center py-8">No low stock items!</p>
                            ) : (
                                products.map(product => (
                                    <div key={product.id} className="flex justify-between items-center p-3 border border-[#1a1a1a] bg-[#111] rounded-sm">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[#cfcfcf] text-sm font-mono truncate max-w-[200px] sm:max-w-[250px]">{product.name}</span>
                                            <span className="text-[#666] text-xs font-mono">{product.category}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[#d42b2b] font-mono font-bold">{product.stock} left</span>
                                            <Link href={`/catalog/${product.id}/edit`} className="text-[#888] hover:text-[#f0ece4] text-xs font-mono underline">Edit</Link>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
