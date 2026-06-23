"use client"

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FetchOrderInfo, UpdateOrderStatus } from "@/src/actions/order.action";
import { Order } from "@/src/types/order.types";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/src/components/maps/maps"), { ssr: false });

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"];

const STATUS_COLORS: Record<string, string> = {
    pending: "text-yellow-400",
    processing: "text-blue-400",
    shipped: "text-purple-400",
    delivered: "text-green-400",
    cancelled: "text-red-400",
};

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
}

export default function OrderViewPage() {
    const params = useParams();
    const router = useRouter();
    const orderId = params?.id as string;

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        async function loadOrder() {
            setLoading(true);
            setError(null);
            try {
                const res = await FetchOrderInfo(orderId);
                setOrder(res.data);
                setSelectedStatus(res.data.status);
            } catch (err: any) {
                setError(err?.message || "Failed to load order");
            } finally {
                setLoading(false);
            }
        }
        if (orderId) loadOrder();
    }, [orderId]);

    async function handleStatusUpdate() {
        if (!order || selectedStatus === order.status) return;
        setUpdating(true);
        try {
            await UpdateOrderStatus(orderId, selectedStatus);
            setOrder({ ...order, status: selectedStatus });
            setIsModalOpen(false);
        } catch (err: any) {
            alert(err?.message || "Failed to update status");
        } finally {
            setUpdating(false);
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
                <div className="text-sm text-[#cfcfcf] font-mono">Loading order...</div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
                <div className="text-sm text-[#d42b2b] font-mono">{error || "Order not found"}</div>
                <button onClick={() => router.push("/orders")} className="px-6 py-2 border border-[#333] text-[#888] font-mono text-sm uppercase rounded-sm hover:bg-[#1a1a1a] transition-colors">
                    Back to Orders
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 w-full relative">
            <div className="flex flex-col gap-2 w-full text-left">
                <h1 className="font-['Ndot57Caps'] text-[2rem] tracking-[0.1em] text-center text-[#f0ece4] uppercase">
                    ORDER <span className="text-[#d42b2b]">DETAILS</span>
                </h1>
                <div className={`w-fit mx-auto px-3 py-1 bg-[#0f0f0f] border border-[#1a1a1a] text-[0.65rem] tracking-[0.2em] uppercase font-mono rounded-sm text-center ${STATUS_COLORS[order.status] || "text-[#d42b2b]"}`}>
                    Status: {order.status}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-stretch">

                <div className="relative z-0 overflow-hidden rounded-sm border border-[#1a1a1a] bg-[#0f0f0f] w-full min-h-[350px]">
                    <div className="absolute inset-0 z-0 bg-[#111]">
                        {order.shipping_lat && order.shipping_lng && (
                            <Map lat={order.shipping_lat} lng={order.shipping_lng} />
                        )}
                    </div>

                    <div className="absolute bottom-6 left-6 flex flex-col gap-1 bg-[#0f0f0f]/90 p-4 border border-[#1a1a1a] backdrop-blur-md rounded-sm">
                        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">Destination</p>
                        {order.user && (
                            <p className="text-sm font-semibold text-[#d42b2b] font-mono mb-1">{order.user.name}</p>
                        )}
                        <p className="text-sm text-[#f0ece4] font-mono">{order.shipping_address}</p>
                        {order.shipping_lat && order.shipping_lng && (
                            <p className="text-[0.6rem] text-[#555] font-mono mt-1">
                                {order.shipping_lat.toFixed(4)}, {order.shipping_lng.toFixed(4)}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-8 p-8 rounded-sm border border-[#1a1a1a] bg-[#0f0f0f] text-[#f0ece4] h-full">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2">
                            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#d42b2b] font-mono">Order Info</p>
                            <div className="text-sm text-[#888] font-mono space-y-1">
                                <p>ID: {order.id.slice(0, 8)}...</p>
                                <p>Created: {new Date(order.created_at).toLocaleDateString("id-ID")}</p>
                                {order.updated_at && <p>Updated: {new Date(order.updated_at).toLocaleDateString("id-ID")}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#d42b2b] font-mono">Shipping to</p>
                            <p className="text-sm text-[#888] leading-relaxed font-mono">
                                {order.user ? (
                                    <>
                                        <span className="text-[#cfcfcf]">{order.user.name}</span> <br/>
                                        <span className="text-xs text-[#555]">{order.user.email}</span> <br/>
                                        <span className="mt-1 block">{order.shipping_address}</span>
                                    </>
                                ) : (
                                    order.shipping_address
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">Ordered Items</p>
                        <div className="space-y-3 font-mono text-sm border-t border-b border-[#1a1a1a] py-4">
                            {order.items && order.items.length > 0 ? (
                                order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-[#cfcfcf]">
                                        <span>{item.quantity}x {item.product?.name || item.product_id}</span>
                                        <span>{formatCurrency(item.subtotal)}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-[#555] text-center">No items</div>
                            )}
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                        <div className="flex flex-col gap-2">
                            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">Grand Total</p>
                            <p className="text-2xl font-semibold text-[#f0ece4]">{formatCurrency(order.total_amount)}</p>
                        </div>

                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-full sm:w-auto px-8 py-3 bg-[#d42b2b] text-white font-mono text-sm tracking-[0.1em] uppercase rounded-sm hover:bg-[#b02020] transition-colors cursor-pointer"
                        >
                            Manage Order
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-sm p-8 w-full max-w-md flex flex-col gap-6">
                        <h2 className="font-['Ndot57Caps'] text-[1.2rem] tracking-[0.1em] text-[#f0ece4] uppercase">
                            Update <span className="text-[#d42b2b]">Status</span>
                        </h2>

                        <div className="flex flex-col gap-2">
                            <label className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">New Status</label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="bg-[#1a1a1a] border border-[#333] px-3 py-2 text-[#cfcfcf] text-sm font-mono outline-none focus:border-[#d42b2b] rounded-sm"
                            >
                                {STATUS_OPTIONS.map((s) => (
                                    <option key={s} value={s}>{s.toUpperCase()}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-4 justify-end pt-4 border-t border-[#1a1a1a]">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-3 border border-[#333] text-[#888] font-mono text-sm tracking-[0.1em] uppercase rounded-sm hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleStatusUpdate}
                                disabled={updating || selectedStatus === order.status}
                                className="px-8 py-3 bg-[#d42b2b] text-white font-mono text-sm tracking-[0.1em] uppercase rounded-sm hover:bg-[#b02020] transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                            >
                                {updating ? "Updating..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
