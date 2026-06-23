import { cookies } from "next/headers";

export async function getAuthToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    return token?.value || null;
}
