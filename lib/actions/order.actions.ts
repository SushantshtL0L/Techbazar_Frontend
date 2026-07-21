import { getAuthToken } from "../cookie";

const API_URL = "http://localhost:5050/api/orders";

export async function handleCreateOrder(orderData: any) {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    return await response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function handleGetMyOrders(page?: number, limit?: number) {
  try {
    const token = await getAuthToken();
    let url = `${API_URL}/my-orders`;
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());
    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    return await response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function handleGetAllOrders(page?: number, limit?: number, status?: string) {
  try {
    const token = await getAuthToken();
    let url = `${API_URL}/all`;
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());
    if (status) params.append("status", status);
    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    return await response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function handleUpdateOrderStatus(orderId: string, status: string) {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    return await response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function handleDeleteOrder(orderId: string) {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/${orderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
export async function handleGetChartData() {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/chart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    return await response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
