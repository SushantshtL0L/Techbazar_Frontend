"use server";

import { createProduct, getAllProducts, deleteProduct, getProductById, updateProduct } from "../api/product";
import { revalidatePath } from "next/cache";

export async function handleCreateProduct(formData: FormData) {
  try {
    const result = await createProduct(formData);
    revalidatePath("/dashboard");
    return {
      success: true,
      message: result.message || "Product created successfully",
      data: result.product,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleGetAllProducts(page?: number, limit?: number, search?: string, seller?: string, sort?: string, condition?: string, category?: string) {
  try {
    const products = await getAllProducts(page, limit, search, seller, sort, condition, category);
    return {
      success: true,
      data: products,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleGetProductById(id: string) {
  try {
    const product = await getProductById(id);
    return {
      success: true,
      data: product,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleDeleteProduct(id: string) {
  try {
    const result = await deleteProduct(id);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/thrifts");
    revalidatePath("/admin/products");
    return {
      success: true,
      message: result.message || "Product deleted successfully",
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleUpdateProduct(id: string, formData: FormData) {
  try {
    const result = await updateProduct(id, formData);
    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/product/${id}`);
    revalidatePath("/admin/products");
    return {
      success: true,
      message: result.message || "Product updated successfully",
      data: result.product,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
