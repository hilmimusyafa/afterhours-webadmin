"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FetchProducts } from "@/src/actions/product.action";
import { Product } from "@/src/types/product.types";

function formatCurrency(amount: number): string {
	return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
}

export default function CatalogPage() {
	const [data, setData] = useState<Product[]>([]);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const res = await FetchProducts();
				if (mounted) setData(res?.data ?? []);
			} catch (err) {
				if (mounted) setData([]);
			} finally {
				if (mounted) setLoading(false);
			}
		})();
		return () => {
			mounted = false;
		};
	}, []);

	const filtered = (data || []).filter(
		(p) =>
		p.name.toLowerCase().includes(search.toLowerCase()) ||
		p.category.toLowerCase().includes(search.toLowerCase())
	);

	if (loading) {
		return <div className="text-center py-8 font-mono text-sm text-[#777]">Loading catalog...</div>;
	}

	return (
		<div className="flex flex-col gap-8 w-full">
			<h1 className="font-['Ndot57Caps'] text-[2rem] tracking-[0.1em] text-center text-[#f0ece4] uppercase">
				CATALOG <span className="text-[#d42b2b]">MANAGER</span>
			</h1>

			<div className="flex items-center justify-center w-full max-w-4xl mx-auto gap-3">
				<div className="flex items-center max-w-md w-full bg-[#0f0f0f] border border-[#1a1a1a] px-4 py-3 gap-3 rounded-sm">
					<span className="font-mono text-[0.8rem] text-[#d42b2b]">~</span>
					<input
						className="w-full bg-transparent outline-none text-[#f0ece4] font-mono text-sm tracking-[0.05em] placeholder:text-[#444]"
						type="text"
						placeholder="Search catalog..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				<Link
					href="/catalog/create"
					className="flex items-center px-4 py-3.5 bg-[#d42b2b] text-white font-mono text-xs tracking-[0.1em] uppercase hover:bg-[#b02020] transition-colors whitespace-nowrap rounded-sm no-underline justify-center"
				>
					+ ADD PRODUCT
				</Link>
			</div>
			
			<div className="grid grid-cols-2 md:grid-cols-3 py-6 lg:grid-cols-4 gap-6 w-full">
				{filtered.map((product) => (
					<Link
						key={product.id}
						href={`/catalog/${product.id}`}
						className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-sm overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#d42b2b] group no-underline"
					>
						<div className="w-full aspect-square bg-[#111] group-hover:bg-[#1a1a1a] transition-colors">
							{product.image_url ? (
								<img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
							) : null}
						</div>
						<div className="px-4 py-3 font-mono text-[0.75rem] tracking-[0.08em] text-[#cfcfcf] border-t border-[#1a1a1a]">
							<div>{product.name}</div>
							<div className="text-[#888] text-[0.65rem] mt-1">{formatCurrency(product.price)}</div>
						</div>
					</Link>
				))}
				{filtered.length === 0 && (
					<div className="col-span-full text-center text-sm text-[#777]">No products found</div>
				)}
			</div>
		</div>
	);
}
