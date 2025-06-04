const API_BASE_URL = "http://localhost:8080/api/v1";

export const api = async <T>(endpoint: string) => {
    const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const response = await fetch(url, {
        headers: {
            'X-Backend-Api-Key': import.meta.env.VITE_BACKEND_API_KEY
        },
        credentials: 'include'
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`API error ${response.status}: ${text}`);
    }

    return await response.json() as T;
}
