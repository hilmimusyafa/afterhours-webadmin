"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LoginResponse } from "../types/auth.type";

const backend_url = process.env.BACKEND_URL || "http://127.0.0.1:8000";

export async function LoginAction(formData: FormData): Promise<{ error?: string }> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const response = await fetch(`${backend_url}/api/admin/auth/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const result: LoginResponse = await response.json();

        if (!response.ok) {
            return { error: "Login failed: Invalid credentials" };
        }

        if (result.user?.role !== "admin") {
            return { error: "Access denied: Not an admin" };
        }

        const cookieStore = await cookies() as any;
        cookieStore.set({
            name: "token",
            value: result.token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1 day
        });
    } catch (error) {
        console.error("Login error:", error);
        return { error: "An unexpected error occurred" };
    }

    redirect("/");
}

export async function LogoutAction() {
    try {
        const cookieStore = await cookies() as any;
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

        cookieStore.delete("token");
    } catch (error) {
        console.error("Logout error:", error);
    }

    redirect("/login");
}