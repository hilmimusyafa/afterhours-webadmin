"use server"

import {
    CategoriesListResponse,
    CategoryDeleteResponse,
    CategoryMutationResponse,
} from "@/src/types/category.types";
import { getApiError, readJsonBody } from "@/src/utils/api";
import { getAuthToken } from "@/src/utils/auth";

const backend_url = process.env.BACKEND_URL || "http://localhost:8000";

async function getHeaders(hasBody = false): Promise<Record<string, string>> {
    const token = await getAuthToken();
    const headers: Record<string, string> = {
        Accept: "application/json",
    };

    if (hasBody) {
        headers["Content-Type"] = "application/json";
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
}

export async function FetchCategories(): Promise<CategoriesListResponse> {
    const response = await fetch(`${backend_url}/api/admin/categories`, {
        method: "GET",
        headers: await getHeaders(),
        credentials: "include",
        cache: "no-store",
    });

    const result = await readJsonBody<CategoriesListResponse>(response);

    if (!response.ok) {
        throw getApiError(response, result, "Failed to fetch categories");
    }

    if (!result) {
        throw new Error("Failed to fetch categories: Invalid server response");
    }

    return {
        data: Array.isArray(result.data) ? result.data : [],
    };
}

export async function CreateCategory(name: string): Promise<CategoryMutationResponse> {
    const response = await fetch(`${backend_url}/api/admin/categories`, {
        method: "POST",
        headers: await getHeaders(true),
        credentials: "include",
        body: JSON.stringify({ name }),
    });

    const result = await readJsonBody<CategoryMutationResponse>(response);

    if (!response.ok) {
        throw getApiError(response, result, "Failed to create category");
    }

    if (!result) {
        throw new Error("Failed to create category: Invalid server response");
    }

    return result;
}

export async function UpdateCategory(id: number, name: string): Promise<CategoryMutationResponse> {
    const response = await fetch(`${backend_url}/api/admin/categories/${id}`, {
        method: "PUT",
        headers: await getHeaders(true),
        credentials: "include",
        body: JSON.stringify({ name }),
    });

    const result = await readJsonBody<CategoryMutationResponse>(response);

    if (!response.ok) {
        throw getApiError(response, result, "Failed to update category");
    }

    if (!result) {
        throw new Error("Failed to update category: Invalid server response");
    }

    return result;
}

export async function DeleteCategory(id: number): Promise<CategoryDeleteResponse> {
    try {
        const response = await fetch(`${backend_url}/api/admin/categories/${id}`, {
            method: "DELETE",
            headers: await getHeaders(),
            credentials: "include",
        });

        const result = await readJsonBody<Partial<CategoryDeleteResponse>>(response);

        if (!response.ok) {
            return {
                success: false,
                message: getApiError(response, result, "Failed to delete category").message,
            };
        }

        return {
            success: true,
            message: result?.message || "Category deleted successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to delete category",
        };
    }
}
