"use server";

import { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from "../api/blog";
import { revalidatePath } from "next/cache";

export async function handleGetAllBlogs() {
  try {
    const result = await getAllBlogs();
    return {
      success: true,
      data: result.data || result,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleGetBlogById(id: string) {
  try {
    const result = await getBlogById(id);
    return {
      success: true,
      data: result.data || result,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleCreateBlog(blogData: any) {
  try {
    const result = await createBlog(blogData);
    revalidatePath("/blogs");
    return {
      success: true,
      message: "Blog created successfully",
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleUpdateBlog(id: string, blogData: any) {
  try {
    const result = await updateBlog(id, blogData);
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${id}`);
    return {
      success: true,
      message: "Blog updated successfully",
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleDeleteBlog(id: string) {
  try {
    const result = await deleteBlog(id);
    revalidatePath("/blogs");
    return {
      success: true,
      message: "Blog deleted successfully",
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
