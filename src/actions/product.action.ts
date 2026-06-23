"use server"

import { ProductsListResponse, ProductInfoResponse, ProductMutationResponse, ProductDeleteResponse } from "@/src/types/product.types";
import { getAuthToken } from "@/src/utils/auth";
import { getApiError, readJsonBody } from "@/src/utils/api";

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

        const result = await readJsonBody<ProductsListResponse>(response);

        if (!response.ok) {
            throw getApiError(response, result, "Failed to fetch products");
        }

        if (!result) {
            throw new Error("Failed to fetch products: Invalid server response");
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

        const result = await readJsonBody<ProductInfoResponse>(response);

        if (!response.ok) {
            throw getApiError(response, result, "Failed to fetch product info");
        }

        if (!result) {
            throw new Error("Failed to fetch product info: Invalid server response");
        }
        
        return result;
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

        const bodyPayload = JSON.stringify(data);

        const response = await fetch(`${backend_url}/api/admin/products/`, {
            method: "POST",
            headers,
            credentials: "include",
            body: bodyPayload,
        });

        const result = await readJsonBody<ProductMutationResponse>(response);

        if (!response.ok) {
            throw getApiError(response, result, "Failed to create product");
        }

        if (!result) {
            throw new Error("Failed to create product: Invalid server response");
        }

        return result;
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

        const result = await readJsonBody<ProductMutationResponse>(response);

        if (!response.ok) {
            throw getApiError(response, result, "Failed to update product");
        }

        if (!result) {
            throw new Error("Failed to update product: Invalid server response");
        }

        return result;
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

        const result = await readJsonBody<Partial<ProductDeleteResponse>>(response);

        if (!response.ok) {
            return {
                success: false,
                message: getApiError(response, result, "Failed to delete product").message,
            };
        }

        return {
            success: true,
            message: result?.message || "Product deleted successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to delete product",
        };
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

        const result = await readJsonBody<ProductsListResponse>(response);
        
        if (!response.ok) {
            throw getApiError(response, result, "Failed to fetch stock alerts");
        }

        if (!result) {
            throw new Error("Failed to fetch stock alerts: Invalid server response");
        }

        return result;
    } catch (error) {
        throw error;
    }
}
