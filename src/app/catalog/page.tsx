"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FetchProducts } from "@/src/actions/product.action";
import ProductImage from "@/src/components/product-image";
import { Product } from "@/src/types/product.types";

function formatCurrency(amount: number): string {
	return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
}

export default function CatalogPage() {
	const [data, setData] = useState<Product[]>([]);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [perPage, setPerPage] = useState(20);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let mounted = true;
		const timeout = setTimeout(async () => {
			setLoading(true);
			setError("");
			try {
				const res = await FetchProducts({
					page,
					per_page: 20,
					keywords: search,
				});
				if (mounted) {
					setData(res?.data ?? []);
					setPage(res?.current_page ?? page);
					setLastPage(res?.last_page ?? 1);
					setPerPage(res?.per_page ?? 20);
					setTotal(res?.total ?? 0);
				}
			} catch (fetchError) {
				if (mounted) {
					setData([]);
					setLastPage(1);
					setTotal(0);
					setError(fetchError instanceof Error ? fetchError.message : "Failed to load catalog");
				}
			} finally {
				if (mounted) setLoading(false);
			}
		}, 300);

		return () => {
			mounted = false;
			clearTimeout(timeout);
		};
	}, [page, search]);

	const handleSearch = (value: string) => {
		setSearch(value);
		setPage(1);
	};

	const firstItem = total === 0 ? 0 : (page - 1) * perPage + 1;
	const lastItem = total === 0 ? 0 : Math.min(page * perPage, total);

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
						onChange={(e) => handleSearch(e.target.value)}
					/>
				</div>

				<Link
					href="/catalog/create"
					className="flex items-center px-4 py-3.5 bg-[#d42b2b] text-white font-mono text-xs tracking-[0.1em] uppercase hover:bg-[#b02020] transition-colors whitespace-nowrap rounded-sm no-underline justify-center"
				>
					+ ADD PRODUCT
				</Link>
			</div>

			<div className="flex min-h-5 items-center justify-center font-mono text-[0.7rem] uppercase tracking-[0.08em] text-[#777]">
				{loading ? (
					<span>Loading catalog...</span>
				) : error ? (
					<span className="text-[#d42b2b]">{error}</span>
				) : (
					<span>
						Showing {firstItem}-{lastItem} of {total} product{total === 1 ? "" : "s"}
					</span>
				)}
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 py-6 lg:grid-cols-4 gap-6 w-full">
				{data.map((product) => (
					<Link
						key={product.id}
						href={`/catalog/${product.id}`}
						className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-sm overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#d42b2b] group no-underline"
					>
						<div className="relative w-full aspect-square bg-[#111] group-hover:bg-[#1a1a1a] transition-colors">
							{product.image_url ? (
								<ProductImage src={product.image_url} alt={product.name} className="object-cover" />
							) : null}
						</div>
						<div className="px-4 py-3 font-mono text-[0.75rem] tracking-[0.08em] text-[#cfcfcf] border-t border-[#1a1a1a]">
							<div>{product.name}</div>
							<div className="text-[#888] text-[0.65rem] mt-1">{formatCurrency(product.price)}</div>
						</div>
					</Link>
				))}
				{!loading && !error && data.length === 0 && (
					<div className="col-span-full text-center text-sm text-[#777]">No products found</div>
				)}
			</div>

			{!error && lastPage > 1 && (
				<div className="flex items-center justify-center gap-4 font-mono text-xs">
					<button
						type="button"
						disabled={page === 1 || loading}
						onClick={() => setPage((current) => Math.max(1, current - 1))}
						className="border border-[#333] px-4 py-2 text-[#cfcfcf] disabled:cursor-not-allowed disabled:opacity-40 hover:border-[#d42b2b]"
					>
						PREV
					</button>
					<span className="text-[#777]">
						PAGE {page} OF {lastPage}
					</span>
					<button
						type="button"
						disabled={page === lastPage || loading}
						onClick={() => setPage((current) => Math.min(lastPage, current + 1))}
						className="border border-[#333] px-4 py-2 text-[#cfcfcf] disabled:cursor-not-allowed disabled:opacity-40 hover:border-[#d42b2b]"
					>
						NEXT
					</button>
				</div>
			)}
		</div>
	);
}
