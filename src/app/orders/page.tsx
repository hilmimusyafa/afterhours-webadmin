"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FetchOrders } from "@/src/actions/order.action";
import { Order } from "@/src/types/order.types";

const STATUS_COLORS: Record<string, string> = {
	pending: "bg-yellow-500",
	processing: "bg-blue-500",
	shipped: "bg-purple-500",
	delivered: "bg-green-500",
	cancelled: "bg-red-500",
};

function formatCurrency(amount: number): string {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0,
	}).format(amount);
}

function formatDate(dateStr: string): string {
	return new Date(dateStr).toLocaleDateString("en-US", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
}

export default function OrdersPage() {
	const [data, setData] = useState<Order[]>([]);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const res = await FetchOrders({ per_page: 50 });
				if (mounted) setData(res?.data ?? []);
			} catch {
				if (mounted) setData([]);
			} finally {
				if (mounted) setLoading(false);
			}
		})();
		return () => {
			mounted = false;
		};
	}, []);

	const filtered = (data || []).filter((o) => {
		const q = search.toLowerCase();
		return (
			o.id?.toLowerCase().includes(q) ||
			(o.shipping_address ?? "").toLowerCase().includes(q) ||
			(o.user?.name ?? "").toLowerCase().includes(q) ||
			(o.status ?? "").toLowerCase().includes(q)
		);
	});

	if (loading) {
		return <div className="text-center py-8 font-mono text-sm text-[#777]">Loading orders...</div>;
	}

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
					placeholder="Search by Order ID, Name, Status..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>

			<div className="flex flex-col gap-3 w-full py-6 max-w-none">
				{filtered.map((order) => (
					<Link
						key={order.id}
						href={`/orders/${order.id}`}
						className="flex items-center gap-4 bg-[#0f0f0f] border border-[#1a1a1a] p-4 cursor-pointer transition-colors duration-200 hover:border-[#333] w-full no-underline"
					>
						<div className="w-[100px] h-[80px] bg-[#1e1612] flex-shrink-0 flex items-center justify-center">
							<span className="font-mono text-[0.65rem] text-[#444] uppercase">{order.items?.length ?? 0} items</span>
						</div>
						<div className="flex-1 flex flex-col gap-1">
							<div className="flex items-center gap-3 font-mono text-[0.85rem] tracking-[0.05em] text-[#888]">
								<span className="text-[#d42b2b]">{formatDate(order.created_at)}</span>
								<span>|</span>
								<span>ID: {order.id?.slice(0, 8)}...</span>
							</div>
							<div className="text-[1rem] font-normal tracking-[0.05em] text-[#f0ece4]">
								{order.user ? order.user.name : "Unknown Customer"}
							</div>
							<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 font-mono text-[0.75rem] text-[#666]">
								<span>{formatCurrency(order.total_amount ?? 0)}</span>
								<span className="hidden sm:inline">•</span>
								<div className="flex items-center gap-1.5 truncate">
									<span className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_COLORS[order.status] || "bg-[#d42b2b]"}`} />
									<span className="truncate">{order.shipping_address}</span>
								</div>
							</div>
						</div>
						<div className="font-mono text-[0.8rem] tracking-[0.15em] text-[#f0ece4] text-right uppercase">
							{order.status}
						</div>
					</Link>
				))}
				{filtered.length === 0 && <div className="text-center text-sm text-[#777] font-mono py-8">No orders found</div>}
			</div>
		</div>
	);
}
