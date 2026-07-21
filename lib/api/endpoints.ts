export const API = {
    AUTH:{
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
        LOGOUT: "/api/auth/logout",
        WHOAMI: "/api/auth/whoami",
        UPDATEPROFILE: "/api/users/profile",
        FORGOT_PASSWORD: "/api/auth/forgot-password",
        RESET_PASSWORD: "/api/auth/reset-password",
        CHANGE_PASSWORD: "/api/auth/change-password",
    },

    PRODUCT: {
      CREATE: "/api/products",
      LIST: "/api/products",
      GET_ONE: (id: string) => `/api/products/${id}`,
      DELETE: (id: string) => `/api/products/${id}`,
    },

    ORDER: {
        LIST: "/api/orders/all",
        USER_ORDERS: "/api/orders/user",
        CREATE: "/api/orders",
        UPDATE_STATUS: (id: string) => `/api/orders/${id}/status`,
        DELETE: (id: string) => `/api/orders/${id}`,
    },

    NOTIFICATION: {
        LIST: "/api/notifications",
        CREATE: "/api/notifications",
        DELETE: (id: string) => `/api/notifications/${id}`,
    },

    ADMIN:{
        USER:{
            LIST: "/api/admin/users",
            GET: (id: string) => `/api/admin/users/${id}`,
            CREATE: "/api/admin/users",
            UPDATE: (id: string) => `/api/admin/users/${id}`,
            DELETE: (id: string) => `/api/admin/users/${id}`,
        }
    },

    BLOG: {
      LIST: "/api/blogs",
      GET_ONE: (id: string) => `/api/blogs/${id}`,
      CREATE: "/api/blogs",
      UPDATE: (id: string) => `/api/blogs/${id}`,
      DELETE: (id: string) => `/api/blogs/${id}`,
    }   
};
