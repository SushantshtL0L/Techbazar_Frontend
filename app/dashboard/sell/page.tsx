"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/api/product";
import { toast } from "react-toastify";
import Sidebar from "../_components/Sidebar";
import { useTheme } from "@/context/ThemeContext";

export default function SellPage() {
    const router = useRouter();
    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);
    const [condition, setCondition] = useState("new");

    const isBrandNew = condition === "new";

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const readers = files.map(file => {
                return new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(file);
                });
            });
            Promise.all(readers).then(results => {
                setPreviews(prev => [...prev, ...results].slice(0, 5));
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        // 1. Map conditions: backend only supports 'new' or 'used'
        if (condition === "new") {
            formData.set("condition", "new");
            // Auto-apply brand new values
            formData.set("batteryHealth", "100");
            formData.set("warranty", "active");
        } else {
            formData.set("condition", "used");
        }

        // 2. Set backend expected image file key to singular 'image' instead of plural 'images'
        const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            formData.set("image", fileInput.files[0]);
        }
        formData.delete("images");

        // 3. Remove 'category' since the backend schema expects an ObjectId or undefined (passing a string like 'Smartphone' throws CastError)
        formData.delete("category");

        try {
            await createProduct(formData);
            toast.success("Phone listed successfully!");
            setPreviews([]);
            setCondition("new");
            (e.target as HTMLFormElement).reset();
            router.push("/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Failed to list phone. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = `w-full border-none rounded-2xl py-4 px-6 outline-none transition-all focus:ring-2 focus:ring-teal-400 ${theme === "dark" ? "bg-neutral-800 text-white placeholder-neutral-500" : "bg-[#f5f5f5] text-gray-800"}`;
    const disabledInputClass = `w-full border-none rounded-2xl py-4 px-6 outline-none transition-all cursor-not-allowed opacity-60 ${theme === "dark" ? "bg-neutral-800/50 text-teal-400" : "bg-teal-50 text-teal-700 font-semibold"}`;
    const labelClass = `block text-sm font-bold uppercase tracking-wider mb-3 ${theme === "dark" ? "text-neutral-400" : "text-gray-700"}`;

    return (
        <div className={`flex min-h-screen font-sans transition-colors duration-300 ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-[#fcfcfc]"}`}>
            <Sidebar activePage="sell" />

            <main className={`flex-1 p-10 lg:p-20 overflow-y-auto transition-colors duration-300 ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-white"}`}>
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <p className={`text-sm font-semibold uppercase tracking-[0.3em] mb-3 ${theme === "dark" ? "text-teal-400" : "text-teal-600"}`}>Seller Hub</p>
                        <h1 className={`text-4xl font-bold transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}>List a Mobile Phone</h1>
                        <p className={`mt-3 text-lg ${theme === "dark" ? "text-neutral-400" : "text-gray-600"}`}>Fill in the details below to list your phone on the marketplace.</p>
                    </div>

                    <form onSubmit={handleSubmit} className={`space-y-8 p-8 rounded-[40px] shadow-sm border transition-colors ${theme === "dark" ? "bg-neutral-900 border-neutral-800" : "bg-white border-gray-100"}`}>

                        {/* Row 1: Phone Name + Brand */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>Phone Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="e.g. iPhone 15 Pro Max"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Brand</label>
                                <input
                                    type="text"
                                    name="brand"
                                    required
                                    placeholder="e.g. Apple, Samsung, Xiaomi"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Row 2: Condition + Storage + Price */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className={labelClass}>Condition</label>
                                <select
                                    name="condition"
                                    required
                                    value={condition}
                                    onChange={(e) => setCondition(e.target.value)}
                                    className={`${inputClass} appearance-none cursor-pointer`}
                                >
                                    <option value="new">Brand New</option>
                                    <option value="like new">Like New</option>
                                    <option value="excellent">Excellent</option>
                                    <option value="good">Good</option>
                                    <option value="fair">Fair</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Storage</label>
                                <input
                                    type="text"
                                    name="storage"
                                    required
                                    placeholder="e.g. 128GB"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Price (Rs.)</label>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    min={1}
                                    placeholder="0.00"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Row 3: RAM + Battery Health + Warranty */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className={labelClass}>RAM</label>
                                <input
                                    type="text"
                                    name="ram"
                                    placeholder="e.g. 8GB"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>
                                    Battery Health (%)
                                    {isBrandNew && (
                                        <span className="ml-2 text-teal-500 normal-case font-normal text-xs tracking-normal">Auto: 100%</span>
                                    )}
                                </label>
                                {isBrandNew ? (
                                    <div className={disabledInputClass}>100%</div>
                                ) : (
                                    <input
                                        type="number"
                                        name="batteryHealth"
                                        min={1}
                                        max={100}
                                        placeholder="e.g. 95"
                                        className={inputClass}
                                    />
                                )}
                            </div>
                            <div>
                                <label className={labelClass}>
                                    Warranty
                                    {isBrandNew && (
                                        <span className="ml-2 text-teal-500 normal-case font-normal text-xs tracking-normal">Auto: Active</span>
                                    )}
                                </label>
                                {isBrandNew ? (
                                    <div className={disabledInputClass}>Active Warranty ✓</div>
                                ) : (
                                    <select
                                        name="warranty"
                                        className={`${inputClass} appearance-none cursor-pointer`}
                                    >
                                        <option value="none">Out of Warranty</option>
                                        <option value="active">Active Warranty</option>
                                    </select>
                                )}
                            </div>
                        </div>

                        {/* Row 4: Color (full width) */}
                        <div>
                            <label className={labelClass}>Color</label>
                            <input
                                type="text"
                                name="color"
                                placeholder="e.g. Midnight Black, Pearl White"
                                className={inputClass}
                            />
                        </div>

                        {/* Row 5: Description */}
                        <div>
                            <label className={labelClass}>Description</label>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                placeholder="Mention screen condition, accessories included, any defects or repairs..."
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        {/* Row 6: Images */}
                        <div>
                            <label className={labelClass}>Phone Photos (Up to 5)</label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    name="images"
                                    accept="image/*"
                                    multiple
                                    required={previews.length === 0}
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className={`w-full min-h-[180px] p-6 rounded-[30px] border-2 border-dashed flex flex-wrap items-center justify-center gap-4 transition-all group-hover:border-teal-400 ${theme === "dark" ? "bg-neutral-800 border-neutral-700 group-hover:bg-neutral-800/80" : "bg-[#f5f5f5] border-gray-200 group-hover:bg-[#f0f9f9]"}`}>
                                    {previews.length > 0 ? (
                                        previews.map((src, index) => (
                                            <div key={index} className="relative w-28 h-28 rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100">
                                                <img src={src} alt={`Preview ${index}`} className="w-full h-full object-contain" />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-300 mb-4 group-hover:text-teal-400 transition-colors">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                            </svg>
                                            <p className="text-gray-400 font-medium text-center">Click to upload up to 5 photos<br /><span className="text-sm">Include screen, back, and sides</span></p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-teal-400 hover:bg-teal-500 text-white font-bold py-5 rounded-[25px] text-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${theme === "dark" ? "shadow-black/20" : "shadow-teal-100"}`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-3">
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Listing...
                                </span>
                            ) : "List Phone Now"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
