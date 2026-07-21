"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiTrash2, FiEye, FiBox, FiEdit } from "react-icons/fi";
import { handleGetAllProducts, handleDeleteProduct } from "@/lib/actions/product.actions";
import { toast } from "react-toastify";

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        setLoading(true);
        const result = await handleGetAllProducts();
        if (result.success) {
            setProducts(result.data);
        } else {
            toast.error(result.message || "Failed to fetch products");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const onDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            const result = await handleDeleteProduct(id);
            if (result.success) {
                toast.success("Product deleted successfully");
                fetchProducts();
            } else {
                toast.error(result.message || "Failed to delete product");
            }
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "serif" }}>Product Management</h2>
                    <p className="text-gray-500 mt-2">Manage all products listed on the platform.</p>
                </div>
                <Link
                    href="/admin/products/create"
                    className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                    <FiPlus /> Create New Product
                </Link>
            </div>

            <div className="bg-neutral-900 rounded-3xl shadow-sm border border-white/10 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10 text-xs font-black uppercase tracking-widest text-gray-400">
                            <th className="px-8 py-6">Product</th>
                            <th className="px-8 py-6">Price</th>
                            <th className="px-8 py-6">Condition</th>
                            <th className="px-8 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-8 py-10 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        <span>Loading products...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-8 py-10 text-center text-gray-500">No products found.</td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product._id} className="hover:bg-white/5 transition-colors text-white">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center text-gray-400 overflow-hidden">
                                                {product.image ? (
                                                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <FiBox className="text-2xl" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-white">{product.name}</div>
                                                <div className="text-sm text-gray-500">{product.brand}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-medium">
                                        Rs. {product.price}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${product.condition === 'New'
                                            ? 'bg-green-900/30 text-green-400'
                                            : 'bg-amber-900/30 text-amber-400'
                                            }`}>
                                            {product.condition}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/dashboard/product/${product._id}`} title="View" target="_blank">
                                                <div className="p-2 text-gray-500 hover:text-white transition-colors">
                                                    <FiEye className="text-lg" />
                                                </div>
                                            </Link>
                                            <Link href={`/dashboard/product/${product._id}/edit`} title="Edit">
                                                <div className="p-2 text-gray-500 hover:text-blue-500 transition-colors">
                                                    <FiEdit className="text-lg" />
                                                </div>
                                            </Link>
                                            <button
                                                onClick={() => onDelete(product._id)}
                                                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                                title="Delete"
                                            >
                                                <FiTrash2 className="text-lg" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
