"use server"

import { ProductsListResponse, ProductInfoResponse, ProductMutationResponse, ProductDeleteResponse } from "@/src/types/product.types";
import { getAuthToken } from "@/src/utils/auth";

const backend_url = process.env.BACKEND_URL || "http://localhost:8000";

export async function FetchProducts(): Promise<ProductsListResponse> {
    try {
        const token = await getAuthToken();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`${backend_url}/api/admin/products/`, {
            method: "GET",
            headers,
            credentials: "include",
        });

        const result: ProductsListResponse = await response.json();

        if (!response.ok) {
            console.log("Failed to fetch products:", result);
        }

        return result;
    } catch (error) {
        throw error;
    }
}

export async function FetchProductInfo(productId: string): Promise<ProductInfoResponse> {
    try {
        const token = await getAuthToken();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`${backend_url}/api/admin/products/${productId}/`, {
            method: "GET",
            headers,
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch product info: ${response.status} ${response.statusText}`);
        }
        
        return (await response.json()) as ProductInfoResponse;
    }
    catch (error) {
        throw error;
    }
}

export async function CreateProduct(data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    image_url?: string;
}): Promise<ProductMutationResponse> {
    try {
        const token = await getAuthToken();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`${backend_url}/api/admin/products/`, {
            method: "POST",
            headers,
            credentials: "include",
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to create product");
        }

        return result as ProductMutationResponse;
    } catch (error) {
        throw error;
    }
}

export async function UpdateProduct(productId: string, data: {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    category?: string;
    image_url?: string;
}): Promise<ProductMutationResponse> {
    try {
        const token = await getAuthToken();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`${backend_url}/api/admin/products/${productId}/`, {
            method: "PUT",
            headers,
            credentials: "include",
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to update product");
        }

        return result as ProductMutationResponse;
    } catch (error) {
        throw error;
    }
}

export async function DeleteProduct(productId: string): Promise<ProductDeleteResponse> {
    try {
        const token = await getAuthToken();
        const headers: Record<string, string> = {
            "Accept": "application/json",
        };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`${backend_url}/api/admin/products/${productId}/`, {
            method: "DELETE",
            headers,
            credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to delete product");
        }

        return result as ProductDeleteResponse;
    } catch (error) {
        throw error;
    }
}

export async function FetchStockAlerts(): Promise<ProductsListResponse> {
    try {
        const token = await getAuthToken();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`${backend_url}/api/admin/stock-alerts/`, {
            method: "GET",
            headers,
            credentials: "include",
        });

        const result: ProductsListResponse = await response.json();
        
        if (!response.ok) {
            console.log("Failed to fetch stock alerts:", result);
        }

        return result;
    } catch (error) {
        throw error;
    }
}
