"use client";

import React, { useState, useRef, useEffect, useTransition, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiBox, FiDollarSign, FiTag, FiFileText, FiCamera, FiSave, FiLayers, FiRotateCcw } from "react-icons/fi";
import { handleGetProductById, handleUpdateProduct } from "@/lib/actions/product.actions";
import { toast } from "react-toastify";
import Sidebar from "../../../_components/Sidebar";
import { useTheme } from "@/context/ThemeContext";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { theme } = useTheme();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [initialData, setInitialData] = useState<any>(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        brand: "",
        condition: "new"
    });

    useEffect(() => {
        const fetchProduct = async () => {
            const result = await handleGetProductById(id);
            if (result.success) {
                const p = result.data;
                const data = {
                    name: p.name || "",
                    description: p.description || "",
                    price: p.price?.toString() || "",
                    brand: p.brand || "",
                    condition: p.condition || "new"
                };
                setFormData(data);
                setInitialData(data);
                setPreviewImage(p.image.startsWith("http") ? p.image : `http://localhost:5050${p.image}`);
            } else {
                setError("Failed to fetch product data");
                toast.error("Failed to fetch product data");
            }
        };
        fetchProduct();
    }, [id]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleReset = () => {
        if (initialData) {
            setFormData(initialData);
            toast.info("Form reset to original values");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        startTransition(async () => {
            try {
                const data = new FormData();
                data.append("name", formData.name);
                data.append("description", formData.description);
                data.append("price", formData.price);
                data.append("brand", formData.brand);
                data.append("condition", formData.condition);

                const file = fileInputRef.current?.files?.[0];
                if (file) {
                    data.append("image", file);
                }

                const result = await handleUpdateProduct(id, data);

                if (result.success) {
                    toast.success("Product updated successfully!");
                    router.push(`/dashboard/product/${id}`);
                } else {
                    setError(result.message || "Failed to update product");
                    toast.error(result.message || "Failed to update product");
                }
            } catch (err: any) {
                setError(err.message || "An error occurred");
                toast.error(err.message || "An error occurred");
            }
        });
    };

    if (!initialData && !error) {
        return (
            <div className={`flex min-h-screen items-center justify-center transition-colors ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#fcfcfc]'}`}>
                <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${theme === 'dark' ? 'border-white' : 'border-gray-900'}`}></div>
            </div>
        );
    }

    return (
        <div className={`flex min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#fcfcfc]'}`}>
            <Sidebar activePage="thrifts" />

            <main className={`flex-1 p-8 md:p-16 overflow-y-auto transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                <div className="max-w-4xl mx-auto space-y-12">
                    <Link href={`/dashboard/product/${id}`} className={`flex items-center gap-2 transition-colors font-bold group ${theme === 'dark' ? 'text-neutral-500 hover:text-white' : 'text-gray-500 hover:text-black'}`}>
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Product
                    </Link>

                    <div className={`rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border overflow-hidden transition-colors ${theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-100'}`}>
                        <div className="p-8 md:p-16">
                            <header className={`mb-12 border-b pb-8 flex justify-between items-end transition-colors ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-100'}`}>
                                <div>
                                    <h2 className={`text-4xl font-bold tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>Edit Product</h2>
                                    <p className="text-neutral-500 mt-4 text-lg">Update product details, pricing, and appearance.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="flex items-center gap-2 text-neutral-400 hover:text-neutral-900 font-bold transition-colors uppercase text-xs tracking-widest"
                                >
                                    <FiRotateCcw /> Reset Changes
                                </button>
                            </header>

                            {error && (
                                <div className="mb-8 p-6 bg-red-50 text-red-500 rounded-3xl text-sm font-medium border border-red-100 italic">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                                {/* Image Upload */}
                                <div className="flex flex-col items-center gap-6">
                                    <div
                                        className={`relative w-full aspect-square rounded-[40px] overflow-hidden border-2 border-dashed cursor-pointer transition-all group shadow-sm ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 hover:border-neutral-500' : 'bg-neutral-50 border-neutral-200 hover:border-neutral-400'
                                            }`}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        {previewImage ? (
                                            <img src={previewImage} alt="Preview" className="w-full h-full object-contain p-4" />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 gap-2 text-center p-4">
                                                <FiCamera className="text-4xl" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Upload Photo</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-sm">
                                            <FiCamera className="text-3xl mb-1" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Change Image</span>
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <p className="text-neutral-400 text-[10px] font-black uppercase tracking-[0.2em] text-center">Product Image</p>
                                </div>

                                {/* Form Fields */}
                                <div className="lg:col-span-2 space-y-10">
                                    <div className="space-y-8">
                                        {/* Name */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-1">Product Name</label>
                                            <div className="relative group">
                                                <FiBox className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 text-xl group-focus-within:text-neutral-900 transition-colors" />
                                                <input
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className={`w-full border rounded-3xl py-6 pl-16 pr-6 text-lg outline-none transition-all placeholder:text-neutral-300 focus:ring-2 focus:ring-teal-400 ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-neutral-50 border-neutral-100 text-neutral-900'
                                                        }`}
                                                    placeholder="Product Name"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Brand */}
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-1">Brand</label>
                                                <div className="relative group">
                                                    <FiTag className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 text-xl group-focus-within:text-neutral-900 transition-colors" />
                                                    <input
                                                        value={formData.brand}
                                                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                                        className={`w-full border rounded-3xl py-6 pl-16 pr-6 text-lg outline-none transition-all placeholder:text-neutral-300 focus:ring-2 focus:ring-teal-400 ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-neutral-50 border-neutral-100 text-neutral-900'
                                                            }`}
                                                        placeholder="Brand"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-1">Price (Rs.)</label>
                                                <div className="relative group">
                                                    <FiDollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 text-xl group-focus-within:text-neutral-900 transition-colors" />
                                                    <input
                                                        type="number"
                                                        value={formData.price}
                                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                        className={`w-full border rounded-3xl py-6 pl-16 pr-6 text-lg outline-none transition-all placeholder:text-neutral-300 focus:ring-2 focus:ring-teal-400 ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-neutral-50 border-neutral-100 text-neutral-900'
                                                            }`}
                                                        placeholder="0.00"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Condition */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-1">Condition</label>
                                            <div className="relative group">
                                                <FiLayers className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 text-xl group-focus-within:text-neutral-900 transition-colors" />
                                                <select
                                                    value={formData.condition}
                                                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                                                    className={`w-full border rounded-3xl py-6 pl-16 pr-6 text-lg outline-none transition-all appearance-none cursor-pointer focus:ring-2 focus:ring-teal-400 ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-neutral-50 border-neutral-100 text-neutral-900'
                                                        }`}
                                                >
                                                    <option value="new">New</option>
                                                    <option value="thrift">Thrift</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-1">Description</label>
                                            <div className="relative group">
                                                <FiFileText className="absolute left-6 top-6 text-neutral-400 text-xl group-focus-within:text-neutral-900 transition-colors" />
                                                <textarea
                                                    value={formData.description}
                                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                    className={`w-full border rounded-3xl py-6 pl-16 pr-6 text-lg outline-none transition-all placeholder:text-neutral-300 min-h-[150px] resize-none focus:ring-2 focus:ring-teal-400 ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-neutral-50 border-neutral-100 text-neutral-900'
                                                        }`}
                                                    placeholder="Product description..."
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`pt-8 border-t transition-colors ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-100'}`}>
                                        <button
                                            type="submit"
                                            disabled={isPending}
                                            className={`flex items-center justify-center gap-4 w-full text-xl font-black py-7 rounded-3xl shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 ${theme === 'dark' ? 'bg-white text-black hover:bg-neutral-200 shadow-black/10' : 'bg-neutral-900 text-white hover:bg-black shadow-neutral-100'
                                                }`}
                                        >
                                            {isPending ? (
                                                <div className={`w-6 h-6 border-4 rounded-full animate-spin ${theme === 'dark' ? 'border-neutral-200 border-t-black' : 'border-white/10 border-t-white'}`} />
                                            ) : (
                                                <><FiSave className="text-2xl" /> Save Changes</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
