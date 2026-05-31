"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateProduct } from "@/src/actions/product.action";

const CATEGORIES = ["peripherals", "furniture", "desk_accessories", "audio", "eyewear"];

export default function CreateCatalogItemPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    const [name, setName] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        try {
            const result = await CreateProduct({
                name,
                description,
                price,
                stock,
                category,
                image_url: imageUrl || undefined,
            });
            router.push(`/catalog/${result.data.id}`);
        } catch (err: any) {
            alert(err?.message || "Failed to create product");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="flex flex-col gap-8 w-full relative">
            <div className="flex flex-col gap-2 w-full text-left">
                <h1 className="font-['Ndot57Caps'] text-[2rem] tracking-[0.1em] text-center text-[#f0ece4] uppercase">
                    NEW <span className="text-[#d42b2b]">ITEM</span>
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">
                <div className="relative overflow-hidden rounded-sm border border-[#1a1a1a] bg-[#0f0f0f] w-full h-full min-h-[400px] group">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={name || "New product"}
                            className="absolute inset-0 w-full h-full object-cover block opacity-30 grayscale"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-[#111]" />
                    )}

                    <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{ backgroundImage: 'radial-gradient(#d42b2b 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }}
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center border border-[#1a1a1a] m-4 rounded-sm bg-[#0f0f0f]/70 p-6">
                        <svg
                            className="w-12 h-12 text-[#444] mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <p className="text-[#888] font-mono text-xs tracking-[0.2em] uppercase mb-4">Image URL</p>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full max-w-xs bg-[#1a1a1a] border border-[#333] px-3 py-2 text-[#cfcfcf] text-sm font-mono outline-none focus:border-[#d42b2b] rounded-sm text-center"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-6 p-8 rounded-sm border border-[#1a1a1a] bg-[#0b0b0b] text-[#f0ece4] min-h-[500px] md:min-h-[600px]">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">Item Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Product name"
                                required
                                className="bg-transparent border-b border-[#333] text-3xl font-semibold tracking-wide py-2 outline-none focus:border-[#d42b2b] transition-colors text-[#f0ece4] placeholder:text-[#333]"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                className="bg-[#1a1a1a] border border-[#333] px-3 py-2 text-[#cfcfcf] text-sm font-mono outline-none focus:border-[#d42b2b] rounded-sm w-fit"
                            >
                                {CATEGORIES.map((c) => (
                                    <option key={c} value={c}>{c.replace("_", " ").toUpperCase()}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">Description</label>
                        <textarea
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Product description..."
                            required
                            className="bg-transparent border border-[#333] p-4 text-sm md:text-md text-[#cfcfcf] font-mono leading-relaxed outline-none focus:border-[#d42b2b] transition-colors rounded-sm resize-none placeholder:text-[#333]"
                        />
                    </div>

                    <div className="mt-auto pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                        <div className="flex gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">Price (IDR)</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    min={0}
                                    required
                                    className="bg-transparent border-b border-[#333] text-2xl font-semibold text-[#f0ece4] outline-none focus:border-[#d42b2b] transition-colors w-40"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">Stock</label>
                                <input
                                    type="number"
                                    value={stock}
                                    onChange={(e) => setStock(Number(e.target.value))}
                                    min={0}
                                    required
                                    className="bg-transparent border-b border-[#333] text-2xl font-semibold text-[#f0ece4] outline-none focus:border-[#d42b2b] transition-colors w-20"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 w-full sm:w-auto">
                            <button
                                type="button"
                                onClick={() => router.push("/catalog")}
                                className="flex-1 sm:flex-none px-6 py-3 border border-[#333] text-[#888] font-mono text-sm tracking-[0.1em] uppercase rounded-sm hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 sm:flex-none px-8 py-3 bg-[#d42b2b] text-white font-mono text-sm tracking-[0.1em] uppercase rounded-sm hover:bg-[#b02020] transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                {saving ? "Creating..." : "Create Item"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
