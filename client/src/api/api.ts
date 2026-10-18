import axios from 'axios'

export const api = axios.create({
    baseURL : 'http://localhost:3001',
    withCredentials: true
})


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.cookieStore.delete('access_token');
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);