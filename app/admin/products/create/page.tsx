"use client";

import React, { useState, useRef, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiBox, FiDollarSign, FiTag, FiFileText, FiCamera, FiPlus, FiLayers } from "react-icons/fi";
import { handleCreateProduct } from "@/lib/actions/product.actions";

export default function CreateProductPage() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        brand: "",
        condition: "new"
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const file = fileInputRef.current?.files?.[0];
        if (!file) {
            setError("Product image is required");
            return;
        }

        startTransition(async () => {
            try {
                const data = new FormData();
                data.append("name", formData.name);
                data.append("description", formData.description);
                data.append("price", formData.price);
                data.append("brand", formData.brand);
                data.append("condition", formData.condition);
                data.append("image", file);

                const result = await handleCreateProduct(data);

                if (result.success) {
                    alert("Product created successfully!");
                    router.push("/admin/products");
                } else {
                    setError(result.message || "Failed to create product");
                }
            } catch (err: any) {
                setError(err.message || "An error occurred");
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 p-4 md:p-8 pb-20">
            <Link href="/admin/products" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors font-bold group">
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Products
            </Link>

            <div className="bg-neutral-900 rounded-[40px] shadow-2xl border border-white/10 overflow-hidden">
                <div className="p-8 md:p-16">
                    <header className="mb-12 border-b border-white/5 pb-8">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white" style={{ fontFamily: "serif" }}>List Product</h2>
                        <p className="text-gray-500 mt-4 text-lg md:text-xl">Add a new item to the platform inventory.</p>
                    </header>

                    {error && (
                        <div className="mb-8 p-6 bg-red-950/20 text-red-400 rounded-3xl text-sm font-medium border border-red-500/20 italic backdrop-blur-md">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                        {/* Image Upload Component */}
                        <div className="flex flex-col items-center gap-6">
                            <div
                                className="relative w-full aspect-square lg:w-full rounded-[40px] bg-white/5 overflow-hidden border-2 border-dashed border-white/20 cursor-pointer hover:border-white/40 ring-offset-4 ring-offset-neutral-900 transition-all group shadow-2xl"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {previewImage ? (
                                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 gap-2 text-center p-4">
                                        <FiCamera className="text-4xl" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Upload Photo</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-sm">
                                    <FiCamera className="text-3xl mb-1" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Change</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] text-center">Product Image (Required)</p>
                        </div>

                        {/* Form Fields Component */}
                        <div className="lg:col-span-2 space-y-10">
                            <div className="space-y-8">
                                {/* Name */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Product Name</label>
                                    <div className="relative group">
                                        <FiBox className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-xl group-focus-within:text-white transition-colors" />
                                        <input
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-lg text-white focus:bg-white/10 focus:border-white/20 outline-none transition-all placeholder:text-gray-700"
                                            placeholder="e.g. Nike Air Max"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Brand */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Brand</label>
                                        <div className="relative group">
                                            <FiTag className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-xl group-focus-within:text-white transition-colors" />
                                            <input
                                                value={formData.brand}
                                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                                className="w-full bg-white/5 border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-lg text-white focus:bg-white/10 focus:border-white/20 outline-none transition-all placeholder:text-gray-700"
                                                placeholder="e.g. Nike"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Price (Rs.)</label>
                                        <div className="relative group">
                                            <FiDollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-xl group-focus-within:text-white transition-colors" />
                                            <input
                                                type="number"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                className="w-full bg-white/5 border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-lg text-white focus:bg-white/10 focus:border-white/20 outline-none transition-all placeholder:text-gray-700"
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Condition */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Condition</label>
                                    <div className="relative group">
                                        <FiLayers className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-xl group-focus-within:text-white transition-colors" />
                                        <select
                                            value={formData.condition}
                                            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                                            className="w-full bg-white/5 border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-lg text-white focus:bg-white/10 focus:border-white/20 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="new" className="bg-neutral-900 text-white">New</option>
                                            <option value="thrift" className="bg-neutral-900 text-white">Thrift</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Description</label>
                                    <div className="relative group">
                                        <FiFileText className="absolute left-6 top-6 text-gray-500 text-xl group-focus-within:text-white transition-colors" />
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full bg-white/5 border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-lg text-white focus:bg-white/10 focus:border-white/20 outline-none transition-all placeholder:text-gray-700 min-h-[150px] resize-none"
                                            placeholder="Describe the product details..."
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/5">
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="flex items-center justify-center gap-4 w-full bg-white text-black text-xl font-black py-7 rounded-3xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                >
                                    {isPending ? (
                                        <div className="w-6 h-6 border-4 border-black/10 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <><FiPlus className="text-2xl" /> Create Product</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
