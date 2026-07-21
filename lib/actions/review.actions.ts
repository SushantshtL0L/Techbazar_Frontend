import { getAuthToken } from "../cookie";

const API_URL = "http://localhost:5050/api/reviews";

export async function handleCreateReview(reviewData: { product: string; rating: number; comment: string }) {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    });

    return await response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function handleGetProductReviews(productId: string) {
  try {
    const response = await fetch(`${API_URL}/product/${productId}`);
    return await response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function handleDeleteReview(reviewId: string) {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/${reviewId}`, {
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
