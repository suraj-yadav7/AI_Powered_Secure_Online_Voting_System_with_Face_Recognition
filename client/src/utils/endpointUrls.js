const base_url = import.meta.env.VITE_BASE_URL

export const api = {
  login:`${base_url}/auth/login`,
  signup:`${base_url}/auth/register`,
  voter_register:`${base_url}/voter/register`,
  generic_fetch:`${base_url}/generic/fetch`,
  update_user:`${base_url}/user/update`,
  generic_count:`${base_url}/generic/fetch-count`
};