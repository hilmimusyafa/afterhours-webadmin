"use server"

import { OrdersListResponse, OrderInfoResponse, OrderUpdateStatusResponse } from "@/src/types/order.types";
import { getAuthToken } from "@/src/utils/auth";

const backend_url = process.env.BACKEND_URL || "http://localhost:8000";

export async function FetchOrders(params?: {
    page?: number;
    per_page?: number;
    status?: string;
}): Promise<OrdersListResponse> {
    try {
        const token = await getAuthToken();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const query = new URLSearchParams();
        if (params?.page) query.set("page", String(params.page));
        if (params?.per_page) query.set("per_page", String(params.per_page));
        if (params?.status) query.set("status", params.status);
        query.set("include", "items.product,user");

        const response = await fetch(`${backend_url}/api/admin/orders/?${query.toString()}`, {
            method: "GET",
            headers,
            credentials: "include",
        });

        const result: OrdersListResponse = await response.json();

        if (!response.ok) {
            console.log("Failed to fetch orders:", result);
        }

        return result;
    } catch (error) {
        throw error;
    }
}

export async function FetchOrderInfo(orderId: string): Promise<OrderInfoResponse> {
    try {
        const token = await getAuthToken();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`${backend_url}/api/admin/orders/${orderId}/?include=items.product,user`, {
            method: "GET",
            headers,
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch order info: ${response.status} ${response.statusText}`);
        }

        return (await response.json()) as OrderInfoResponse;
    } catch (error) {
        throw error;
    }
}

export async function UpdateOrderStatus(orderId: string, status: string): Promise<OrderUpdateStatusResponse> {
    try {
        const token = await getAuthToken();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`${backend_url}/api/admin/orders/update-status/${orderId}/`, {
            method: "PUT",
            headers,
            credentials: "include",
            body: JSON.stringify({ status }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to update order status");
        }

        return result as OrderUpdateStatusResponse;
    } catch (error) {
        throw error;
    }
}

export async function FetchOrderStats(): Promise<{
    total_orders: number;
    status_counts: Record<string, number>;
    chart_data: { day: string; orders: number | null }[];
}> {
    try {
        const token = await getAuthToken();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`${backend_url}/api/admin/orders/stats/`, {
            method: "GET",
            headers,
            credentials: "include",
        });

        if (!response.ok) {
            const errBody = await response.json().catch(() => null);
            throw new Error(errBody?.message || `Failed to fetch order stats: ${response.status} ${response.statusText}`);
        }

        return (await response.json()) as {
            total_orders: number;
            status_counts: Record<string, number>;
            chart_data: { day: string; orders: number | null }[];
        };
    } catch (error) {
        throw error;
    }
}