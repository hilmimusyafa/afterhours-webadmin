import Link from "next/link";
import { FetchProducts, FetchStockAlerts } from "@/src/actions/product.action";
import { FetchOrders, FetchOrderStats } from "@/src/actions/order.action";
import { ChartLineDefault } from "@/src/components/line-chart/line-chart";
import LowStockAlert from "@/src/components/dashboard/low-stock-alert";
import { Product } from "@/src/types/product.types";
import { Order } from "@/src/types/order.types";

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export default async function Page() {
    let totalProducts = 0;
    let totalOrders = 0;
    let pendingOrders = 0;
    let lowStockProducts: Product[] = [];
    let recentOrders: Order[] = [];
    let chartData: { day: string; orders: number | null }[] = [];

    try {
        const [productsRes, ordersRes, statsRes, stockRes] = await Promise.all([
            FetchProducts(),
            FetchOrders({ per_page: 5 }),
            FetchOrderStats(),
            FetchStockAlerts(),
        ]);
        totalProducts = productsRes.data?.length ?? 0;
        totalOrders = statsRes.total_orders ?? 0;
        pendingOrders = statsRes.status_counts?.pending ?? 0;
        chartData = statsRes.chart_data ?? [];
        lowStockProducts = Array.isArray(stockRes) ? stockRes : (stockRes?.data ?? []);
        recentOrders = Array.isArray(ordersRes) ? ordersRes.slice(0, 5) : (ordersRes?.data ?? []).slice(0, 5);
    } catch (error) {
        console.error("Failed to fetch dashboard data", error);
    }

    return (
        <div className="flex flex-col gap-6 w-full h-full min-h-[calc(100vh-6rem)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-[#1a1a1a] bg-[#0f0f0f] rounded-sm flex flex-col justify-center min-h-[250px] h-full">
                    <ChartLineDefault chartData={chartData} />
                </div>

                <div className="border border-[#1a1a1a] bg-[#0f0f0f] p-6 rounded-sm flex flex-col h-full">
                    <h3 className="font-['Ndot57Caps'] text-[#f0ece4] tracking-[0.1em] text-lg m-0">
                        RECENT <span className="text-[#d42b2b]">ORDERS</span>
                    </h3>

                    <div className="mt-3 flex flex-col gap-2 flex-1 overflow-y-auto pr-2">
                        {recentOrders.length === 0 ? (
                            <div className="font-mono text-sm text-[#cfcfcf] py-4">No recent orders</div>
                        ) : (
                            recentOrders.map((order) => {
                                const isPending = order.status === "pending";
                                return (
                                    <Link
                                        key={order.id}
                                        href={`/orders/${order.id}`}
                                        className="flex items-center justify-between gap-4 p-3 rounded-sm hover:bg-[#111] border border-transparent hover:border-[#1a1a1a] transition-colors no-underline"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <div className="font-mono text-sm text-[#f0ece4]">Order {order.id.slice(0, 8)}</div>
                                            <div className="font-mono text-[0.65rem] text-[#888]">{formatDate(order.created_at)} • {order.user?.name || order.shipping_address.split(',')[0]}</div>
                                        </div>
                                        <div
                                            className={`font-mono text-[0.65rem] uppercase tracking-[0.1em] ${isPending ? "text-[#d42b2b]" : "text-[#6fc36b]"
                                                }`}
                                        >
                                            {order.status}
                                        </div>
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {[
                    { label: "Total Orders", val: String(totalOrders) },
                    { label: "Catalog Items", val: String(totalProducts) },
                    { label: "Pending Orders", val: String(pendingOrders) },
                ].map((stat, i) => (
                    <div key={i} className="flex flex-col gap-3 bg-[#0f0f0f] border border-[#1a1a1a] p-6 rounded-sm">
                        <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#888]">
                            {stat.label}
                        </div>
                        <div className="font-['Ndot57Caps'] text-[1.8rem] text-[#f0ece4]">{stat.val}</div>
                    </div>
                ))}
                <LowStockAlert products={lowStockProducts} />
            </section>
        </div>
    );
}