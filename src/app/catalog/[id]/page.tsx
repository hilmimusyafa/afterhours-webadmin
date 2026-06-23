"use client"

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FetchProductInfo, DeleteProduct } from "@/src/actions/product.action";
import { Product } from "@/src/types/product.types";

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
}

export default function CatalogItemPage() {
    const params = useParams();
    const router = useRouter();
    const productId = params?.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        async function loadProduct() {
            setLoading(true);
            setError(null);
            try {
                const res = await FetchProductInfo(productId);
                setProduct(res.data);
            } catch (err: any) {
                setError(err?.message || "Failed to load product");
            } finally {
                setLoading(false);
            }
        }
        if (productId) loadProduct();
    }, [productId]);

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this product?")) return;
        setDeleting(true);
        try {
            await DeleteProduct(productId);
            router.push("/catalog");
        } catch (err: any) {
            alert(err?.message || "Failed to delete product");
        } finally {
            setDeleting(false);
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
                <div className="text-sm text-[#cfcfcf] font-mono">Loading product...</div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
                <div className="text-sm text-[#d42b2b] font-mono">{error || "Product not found"}</div>
                <button onClick={() => router.push("/catalog")} className="px-6 py-2 border border-[#333] text-[#888] font-mono text-sm uppercase rounded-sm hover:bg-[#1a1a1a] transition-colors cursor-pointer">
                    Back to Catalog
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 w-full relative">
            <div className="flex flex-col gap-2 w-full text-left">
                <h1 className="font-['Ndot57Caps'] text-[2rem] tracking-[0.1em] text-center text-[#f0ece4] uppercase">
                    CATALOG <span className="text-[#d42b2b]">ITEM</span>
                </h1>
                <div className="w-fit mx-auto px-3 py-1 bg-[#0f0f0f] border border-[#1a1a1a] text-[#d42b2b] text-[0.65rem] tracking-[0.2em] uppercase font-mono rounded-sm text-center">
                    Details
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">
                <div className="relative overflow-hidden rounded-sm border border-[#1a1a1a] bg-[#0f0f0f] w-full h-full min-h-[300px]">
                    {product.image_url ? (
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover block opacity-90"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-[#111]" />
                    )}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{ backgroundImage: 'radial-gradient(#d42b2b 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }}
                    />
                    <div className="absolute bottom-6 left-6 flex flex-col gap-1 bg-[#0f0f0f]/90 p-3 border border-[#1a1a1a] backdrop-blur-md rounded-sm">
                        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">Preview</p>
                        <p className="text-sm text-[#f0ece4] font-mono">{product.name}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-6 p-8 rounded-sm border border-[#1a1a1a] bg-[#0f0f0f] text-[#f0ece4] min-h-[500px] md:min-h-[600px] justify-start h-full">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-3xl font-semibold tracking-wide">{product.name}</h2>
                        <div>
                            <span className="px-3 py-1.5 bg-[#1a1a1a] border border-[#333] text-[#a0a0a0] text-[0.65rem] tracking-[0.2em] uppercase font-mono rounded-sm">
                                Category: {product.category}
                            </span>
                        </div>
                    </div>

                    <p className="text-sm md:text-md text-[#cfcfcf] font-mono leading-relaxed mt-2">
                        {product.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                        <div className="flex gap-10">
                            <div className="flex flex-col gap-1">
                                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">Price</p>
                                <p className="text-2xl font-semibold text-[#f0ece4]">{formatCurrency(product.price)}</p>
                            </div>

                            <div className="flex flex-col gap-1">
                                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">Stock</p>
                                <p className="text-2xl font-semibold text-[#f0ece4]">{product.stock}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full sm:w-auto">
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="px-6 py-3 border border-[#333] text-[#888] font-mono text-sm tracking-[0.1em] uppercase rounded-sm hover:bg-[#1a1a1a] hover:text-[#d42b2b] transition-colors cursor-pointer disabled:opacity-50"
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                            <Link
                                href={`/catalog/${product.id}/edit`}
                                className="px-8 py-3 bg-[#d42b2b] text-white font-mono text-sm tracking-[0.1em] uppercase rounded-sm hover:bg-[#b02020] transition-colors text-center no-underline"
                            >
                                Edit Item
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
