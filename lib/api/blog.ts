import axios from "./axios";
import { API } from "./endpoints";

export const getAllBlogs = async () => {
  try {
    const response = await axios.get(API.BLOG.LIST);
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Fetching Blogs Failed"
    );
  }
};

export const getBlogById = async (id: string) => {
  try {
    const response = await axios.get(API.BLOG.GET_ONE(id));
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Fetching Blog Failed"
    );
  }
};

export const createBlog = async (blogData: any) => {
  try {
    const response = await axios.post(API.BLOG.CREATE, blogData);
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Blog Creation Failed"
    );
  }
};

export const updateBlog = async (id: string, blogData: any) => {
  try {
    const response = await axios.put(API.BLOG.UPDATE(id), blogData);
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Blog Update Failed"
    );
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const response = await axios.delete(API.BLOG.DELETE(id));
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Blog Deletion Failed"
    );
  }
};
