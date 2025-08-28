const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = async <T>(endpoint: string) => {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const API_KEY = import.meta.env.VITE_API_KEY;

  const response = await fetch(url, {
    headers: {
      'X-Api-Key': API_KEY,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error ${response.status}: ${text}`);
  }

  return (await response.json()) as T;
};
