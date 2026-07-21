import axios from "./axios";
import { API } from "./endpoints";

export const createProduct = async (formData: FormData) => {
  try {
    const response = await axios.post(API.PRODUCT.CREATE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Product Creation Failed"
    );
  }
};

export const getAllProducts = async (page?: number, limit?: number, search?: string, seller?: string, sort?: string, condition?: string, category?: string) => {
  try {
    const params: any = {};
    if (page !== undefined) params.page = page;
    if (limit !== undefined) params.limit = limit;
    if (search !== undefined) params.search = search;
    if (seller !== undefined) params.seller = seller;
    if (sort !== undefined) params.sort = sort;
    if (condition !== undefined) params.condition = condition;
    if (category !== undefined) params.category = category;
    
    const response = await axios.get(API.PRODUCT.LIST, { params });
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Fetching Products Failed"
    );
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await axios.get(API.PRODUCT.GET_ONE(id));
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Fetching Product Failed"
    );
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(API.PRODUCT.DELETE(id));
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Product Deletion Failed"
    );
  }
};

export const updateProduct = async (id: string, formData: FormData) => {
  try {
    const response = await axios.put(API.PRODUCT.GET_ONE(id), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Product Update Failed"
    );
  }
};
