import axios from "axios";

const isBrowser = typeof window !== "undefined";

const BASE_URL = isBrowser
  ? (process.env.NEXT_PUBLIC_API_BASE_URL ?? "")
  : (process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "http://127.0.0.1:5050");

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let csrfToken: string | null = null;

const fetchCsrfToken = async () => {
  if (!csrfToken && typeof window !== "undefined") {
    try {
      const res = await axiosInstance.get('/api/csrf-token');
      csrfToken = res.data.csrfToken;
    } catch (error) {
      console.warn("Could not fetch CSRF token");
    }
  }
  return csrfToken;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token") || undefined;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        
      }
      }

    
    if (typeof window !== "undefined" && ['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() || '')) {
      const token = await fetchCsrfToken();
      if (token) {
        config.headers['CSRF-Token'] = token;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
