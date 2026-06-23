"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LoginResponse } from "../types/auth.type";
import { readJsonBody } from "../utils/api";

const backend_url = process.env.BACKEND_URL || "http://127.0.0.1:8000";

export async function LoginAction(formData: FormData): Promise<{ error?: string }> {
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
        return { error: "Email and password are required" };
    }

    try {
        const response = await fetch(`${backend_url}/api/admin/auth/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await readJsonBody<LoginResponse>(response);

        if (!response.ok) {
            return { error: "Login failed: Invalid credentials" };
        }

        if (!result) {
            return { error: "Login failed: Invalid server response" };
        }

        if (result.user?.role !== "admin") {
            return { error: "Access denied: Not an admin" };
        }

        if (!result.token) {
            return { error: "Login failed: Missing authentication token" };
        }

        const cookieStore = await cookies();
        cookieStore.set({
            name: "token",
            value: result.token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day
        });
    } catch (error) {
        console.error("Login error:", error);
        return { error: "An unexpected error occurred" };
    }

    redirect("/");
}

export async function LogoutAction() {
    const cookieStore = await cookies();

    try {
        const token = cookieStore.get("token")?.value;

        if (token) {
            await fetch(`${backend_url}/api/admin/auth/logout/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });
        }
    } catch (error) {
        console.error("Logout error:", error);
    } finally {
        cookieStore.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 0,
        });
    }

    redirect("/login");
}
