"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import {
  getOrderById,
  getOrderItems,
} from "../../../lib/services/order.service";
import { getProductById } from "../../../lib/services/product.service";

const STATUS_STYLES: Record<string, string> = {
  pending: "text-amber-400 border-amber-900 bg-amber-950",
  shipped: "text-blue-400 border-blue-900 bg-blue-950",
  delivered: "text-emerald-400 border-emerald-900 bg-emerald-950",
  cancelled: "text-[#d42b2b] border-[#3a0d0d] bg-[#1a0505]",
};

export default function OrderViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const order = getOrderById(id);

  if (!order) {
    return <div className="text-white font-mono">Order not found</div>;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(order.status);
  const [selectedStatus, setSelectedStatus] = useState(order.status);

  const orderItems = getOrderItems(id);

  const mappedItems = orderItems.map((item) => {
    const product = getProductById(item.product_id);

    return {
      ...item,
      product_name: product?.name ?? "Unknown Product",
      product_image: product?.image_url ?? "",
    };
  });

  const grandTotal = mappedItems.reduce(
    (acc, item) => acc + item.price_at_purchase * item.quantity,
    0
  );

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-['Ndot57Caps'] text-[2rem] tracking-[0.1em] text-[#f0ece4] uppercase">
          ORDER <span className="text-[#d42b2b]">DETAIL</span>
        </h1>
      </div>

      {/* Back */}
      <Link
        href="/orders"
        className="w-fit flex items-center gap-2 px-4 py-2 border border-[#1e1e1e] font-mono text-[11px] tracking-widest text-[#555] uppercase hover:text-[#d42b2b] hover:border-[#3a0d0d] transition-all"
      >
        ← orders
      </Link>

      {/* Summary */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-4">
          <p className="font-mono text-[10px] tracking-widest text-[#444] uppercase mb-2">
            Order ID
          </p>
          <p className="font-mono text-sm text-[#f0ece4]">{order.id}</p>
        </div>

        <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-4">
          <p className="font-mono text-[10px] tracking-widest text-[#444] uppercase mb-2">
            Items
          </p>
          <p className="font-mono text-sm text-[#f0ece4]">
            {mappedItems.length} products
          </p>
        </div>

        <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-4">
          <p className="font-mono text-[10px] tracking-widest text-[#444] uppercase mb-2">
            Total
          </p>
          <p className="font-mono text-sm text-[#d42b2b]">
            ${grandTotal.toFixed(2)}
          </p>
        </div>

        <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-4">
          <p className="font-mono text-[10px] tracking-widest text-[#444] uppercase mb-2">
            Status
          </p>

          <span
            className={`font-mono text-[10px] tracking-widest uppercase border px-2 py-1 ${STATUS_STYLES[status]}`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Customer + Shipping */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-5">
          <p className="font-mono text-[10px] tracking-widest text-[#444] uppercase mb-4">
            Customer
          </p>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d42b2b]" />
            <p className="font-mono text-sm text-[#f0ece4]">{order.user}</p>
          </div>

          <p className="font-mono text-[10px] text-[#444] mt-2 tracking-widest">
            {new Date(order.created_at).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-5">
          <p className="font-mono text-[10px] tracking-widest text-[#444] uppercase mb-4">
            Shipping Address
          </p>

          <p className="font-mono text-sm text-[#f0ece4] leading-relaxed">
            {order.shipping_address}
          </p>

          <div className="flex gap-4 mt-3">
            <p className="font-mono text-[10px] text-[#444]">
              lat: {order.shipping_lat}
            </p>
            <p className="font-mono text-[10px] text-[#444]">
              lng: {order.shipping_lng}
            </p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 font-mono text-[10px] tracking-widest uppercase text-[#444]">
          <span>Product</span>
          <span>Qty</span>
          <span>Price</span>
          <span>Subtotal</span>
        </div>

        {mappedItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center bg-[#0f0f0f] border border-[#1a1a1a] px-4 py-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#111] border border-[#1a1a1a] overflow-hidden">
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="font-mono text-sm text-[#f0ece4]">
                {item.product_name}
              </span>
            </div>

            <span className="font-mono text-sm text-[#666]">
              {item.quantity}
            </span>

            <span className="font-mono text-sm text-[#666]">
              ${item.price_at_purchase.toFixed(2)}
            </span>

            <span className="font-mono text-sm text-[#d42b2b]">
              ${(item.price_at_purchase * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}

        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center bg-[#0f0f0f] border border-[#1a1a1a] px-4 py-4">
          <span />
          <span />
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#444]">
            Grand Total
          </span>
          <span className="font-mono text-sm font-bold text-[#d42b2b]">
            ${grandTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-[#d42b2b] hover:bg-[#b02020] text-white font-mono text-[11px] tracking-widest uppercase transition-colors"
        >
          Manage Order
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-8 w-full max-w-md flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="font-mono text-[11px] tracking-widest uppercase text-[#f0ece4]">
                Manage Order
              </h2>

              <button
                onClick={() => setIsModalOpen(false)}
                className="font-mono text-[#555] hover:text-[#f0ece4]"
              >
                ✕
              </button>
            </div>

            <div className="h-px bg-[#1a1a1a]" />

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] tracking-widest uppercase text-[#444]">
                Update Status
              </label>

              <div className="flex flex-col gap-2">
                {["pending", "shipped", "delivered", "cancelled"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedStatus(s)}
                    className={`flex items-center gap-3 px-4 py-3 border font-mono text-[11px] tracking-widest uppercase transition-all ${
                      selectedStatus === s
                        ? STATUS_STYLES[s]
                        : "border-[#1a1a1a] text-[#555] hover:border-[#333]"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        selectedStatus === s ? "bg-current" : "bg-[#333]"
                      }`}
                    />

                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-[#1a1a1a]" />

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#0f0f0f] border border-[#1e1e1e] hover:border-[#555] text-[#555] font-mono text-[11px] tracking-widest uppercase py-3"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setStatus(selectedStatus);
                  setIsModalOpen(false);
                }}
                className="bg-[#d42b2b] hover:bg-[#bb2222] text-white font-mono text-[11px] tracking-widest uppercase py-3"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}