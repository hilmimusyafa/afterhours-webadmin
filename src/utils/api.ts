export async function readJsonBody<T>(response: Response): Promise<T | null> {
    const text = await response.text();

    if (!text) {
        return null;
    }

    try {
        return JSON.parse(text) as T;
    } catch {
        return null;
    }
}

export function getApiError(
    response: Response,
    body: unknown,
    fallback: string,
): Error {
    const message = getStringProperty(body, "message") || getStringProperty(body, "error");
    return new Error(message || `${fallback} (${response.status})`);
}

function getStringProperty(value: unknown, property: string): string | undefined {
    if (typeof value !== "object" || value === null || !(property in value)) {
        return undefined;
    }

    const propertyValue = (value as Record<string, unknown>)[property];
    return typeof propertyValue === "string" ? propertyValue : undefined;
}
