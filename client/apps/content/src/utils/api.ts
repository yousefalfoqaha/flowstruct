const API_DOMAIN = import.meta.env.VITE_API_DOMAIN
  ? import.meta.env.VITE_API_DOMAIN
  : 'localhost:8080';

const SECURE = import.meta.env.VITE_SECURE ? import.meta.env.VITE_SECURE : false;
const PROTOCOL = SECURE ? 'https' : 'http';

export const api = async <T>(endpoint: string) => {
  const url = `${PROTOCOL}://${API_DOMAIN}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const API_KEY = import.meta.env.VITE_API_KEY
    ? import.meta.env.VITE_API_KEY
    : 'super-secret-api-key';

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
