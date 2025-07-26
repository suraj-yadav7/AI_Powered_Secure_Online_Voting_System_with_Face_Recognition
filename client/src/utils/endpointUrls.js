const base_url = import.meta.env.VITE_BASE_URL

export const api = {
  login:`${base_url}/auth/login`,
  signup:`${base_url}/auth/register`,
};