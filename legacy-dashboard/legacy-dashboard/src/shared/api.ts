const API_BASE_URL = "http://localhost:8080/api/v1";

type RequestOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: any;
    params?: Record<string, any>;
    headers?: Record<string, string>;
};

export const api = {
    async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const {method = "GET", params = {}, body, headers = {}} = options;

        const searchParams = new URLSearchParams();
        Object.entries(params)?.forEach(([param, value]) => searchParams.append(param, value));

        const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}${searchParams.size ? `?${searchParams}` : ''}`;

        const requestHeaders: Record<string, string> = {
            ...headers
        };

        if (body && !headers["Content-Type"]) {
            requestHeaders["Content-Type"] = "application/json";
        }

        const config: RequestInit = {
            method,
            headers: requestHeaders,
            body: body ? JSON.stringify(body) : undefined,
        };

        const response = await fetch(url, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({message: "An unknown error occurred"}));
            throw new Error(errorData.message || `Request failed with status ${response.status}`);
        }

        if (response.status === 204) {
            return {} as T;
        }

        return await response.json() as T;
    },

    get<T>(endpoint: string, options?: Omit<RequestOptions, "method" | "body">) {
        return this.request<T>(endpoint, {...options, method: "GET"});
    },

    post<T>(endpoint: string, options?: Omit<RequestOptions, "method">) {
        return this.request<T>(endpoint, {...options, method: "POST"});
    },

    put<T>(endpoint: string, options?: Omit<RequestOptions, "method">) {
        return this.request<T>(endpoint, {...options, method: "PUT"});
    },

    delete<T>(endpoint: string, options?: Omit<RequestOptions, "method">) {
        return this.request<T>(endpoint, {...options, method: "DELETE"});
    }
};
