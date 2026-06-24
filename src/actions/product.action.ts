"use server"

import { ProductsListResponse, ProductInfoResponse, ProductMutationResponse, ProductDeleteResponse } from "@/src/types/product.types";
import { getAuthToken } from "@/src/utils/auth";
import { getApiError, readJsonBody } from "@/src/utils/api";

const backend_url = process.env.BACKEND_URL || "http://localhost:8000";

type ProductsApiResponse = Partial<ProductsListResponse> & {
    data?: ProductsListResponse["data"];
};

export async function FetchProducts(params?: {
    page?: number;
    per_page?: number;
    keywords?: string;
    category?: string;
}): Promise<ProductsListResponse> {
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
        if (params?.keywords?.trim()) query.set("keywords", params.keywords.trim());
        if (params?.category?.trim()) query.set("category", params.category.trim());

        const queryString = query.toString();
        const url = `${backend_url}/api/admin/products${queryString ? `?${queryString}` : ""}`;
        const response = await fetch(url, {
            method: "GET",
            headers,
            credentials: "include",
            cache: "no-store",
        });

        const result = await readJsonBody<ProductsApiResponse>(response);

        if (!response.ok) {
            throw getApiError(response, result, "Failed to fetch products");
        }

        if (!result) {
            throw new Error("Failed to fetch products: Invalid server response");
        }

        const data = Array.isArray(result.data) ? result.data : [];
        const currentPage = Number(result.current_page) || params?.page || 1;
        const lastPage = Number(result.last_page) || 1;
        const perPage = Number(result.per_page) || params?.per_page || 20;
        let total = Number(result.total);

        if (!Number.isFinite(total)) {
            if (currentPage === lastPage) {
                total = (lastPage - 1) * perPage + data.length;
            } else {
                const lastPageQuery = new URLSearchParams(query);
                lastPageQuery.set("page", String(lastPage));

                const lastPageResponse = await fetch(
                    `${backend_url}/api/admin/products?${lastPageQuery.toString()}`,
                    {
                        method: "GET",
                        headers,
                        credentials: "include",
                        cache: "no-store",
                    }
                );
                const lastPageResult = await readJsonBody<ProductsApiResponse>(lastPageResponse);

                if (!lastPageResponse.ok) {
                    throw getApiError(lastPageResponse, lastPageResult, "Failed to fetch product total");
                }

                const lastPageData = Array.isArray(lastPageResult?.data) ? lastPageResult.data : [];
                total = (lastPage - 1) * perPage + lastPageData.length;
            }
        }

        return {
            data,
            current_page: currentPage,
            last_page: lastPage,
            per_page: perPage,
            total,
        };
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
    category?: string;
    category_id?: number | null;
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
    category?: string | null;
    category_id?: number | null;
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
