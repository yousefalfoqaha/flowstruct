import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8080/api/v1";

type RequestOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: any;
    params?: Record<string, any>;
    headers?: Record<string, string>;
};

export const api = {
    async request<T>(endpointSegments: unknown[] | string, options: RequestOptions = {}): Promise<T> {
        const endpoint = Array.isArray(endpointSegments)
            ? endpointSegments.map(segment => String(segment)).join('/')
            : endpointSegments;

        const {method = "GET", params = {}, body, headers = {}} = options;

        const searchParams = new URLSearchParams();
        Object.entries(params)?.forEach(([param, value]) => searchParams.append(param, value));

        const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}${searchParams.size ? `?${searchParams}` : ''}`;

        const token = Cookies.get('token');

        const requestHeaders: Record<string, string> = {
            ...headers,
            ...(token ? {Authorization: `Bearer ${token}`} : {})
        };

        if (body && !headers["Content-Type"]) {
            requestHeaders["Content-Type"] = "application/json";
        }

        const config: RequestInit = {
            method,
            headers: requestHeaders,
            body: body ? JSON.stringify(body) : undefined,
            credentials: 'include'
        };

        const response = await fetch(url, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({message: "An unknown error occurred."}));
            throw new Error(errorData.message || `Request failed with status ${response.status}`);
        }

        if (response.status === 204) {
            return {} as T;
        }

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            return await response.json() as T;
        }

        return await response.text() as T;
    },

    get<T>(endpointSegments: unknown[] | string, options?: Omit<RequestOptions, "method" | "body">) {
        return this.request<T>(endpointSegments, {...options, method: "GET"});
    },

    post<T>(endpointSegments: unknown[] | string, options?: Omit<RequestOptions, "method">) {
        return this.request<T>(endpointSegments, {...options, method: "POST"});
    },

    put<T>(endpointSegments: unknown[] | string, options?: Omit<RequestOptions, "method">) {
        return this.request<T>(endpointSegments, {...options, method: "PUT"});
    },

    delete<T>(endpointSegments: unknown[] | string, options?: Omit<RequestOptions, "method">) {
        return this.request<T>(endpointSegments, {...options, method: "DELETE"});
    }
};
