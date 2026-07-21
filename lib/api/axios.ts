import axios from "axios";

const isBrowser = typeof window !== "undefined";

const BASE_URL = isBrowser
  ? (process.env.NEXT_PUBLIC_API_BASE_URL ?? "")
  : (process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "http://127.0.0.1:5050");

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

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
        // Ignored
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
