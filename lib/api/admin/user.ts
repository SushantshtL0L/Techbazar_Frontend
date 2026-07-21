import axios from "../axios";
import { API } from "../endpoints";

export const createUser = async (userData: any) => {
  try {
    const response = await axios.post(API.ADMIN.USER.CREATE, userData, {
      headers: {
        "Content-Type": "multipart/form-data", // for file upload/multer
      },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Create user failed",
    );
  }
};

export const getAllUsers = async (page: number = 1, limit: number = 10, role: string = 'all') => {
  try {
    const response = await axios.get(API.ADMIN.USER.LIST, {
      params: { page, limit, role },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Fetch users failed",
    );
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(API.ADMIN.USER.GET(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Fetch user failed",
    );
  }
};

export const updateUser = async (id: string, userData: any) => {
  try {
    const response = await axios.put(API.ADMIN.USER.UPDATE(id), userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Update user failed",
    );
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(API.ADMIN.USER.DELETE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Delete user failed",
    );
  }
};