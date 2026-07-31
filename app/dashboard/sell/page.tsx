"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/api/product";
import { toast } from "react-toastify";
import Sidebar from "@/app/(public)/_components/Sidebar";
import { useTheme } from "@/context/ThemeContext";
import { FiMonitor, FiCpu, FiHardDrive, FiPackage } from "react-icons/fi";

type ProductType = "new-pc" | "used-laptop" | "used-pc" | "accessories";

const PRODUCT_TYPES: { id: ProductType; label: string; sublabel: string; icon: any }[] = [
    { id: "new-pc", label: "New PC", sublabel: "Desktop / Tower", icon: FiMonitor },
    { id: "used-laptop", label: "Used Laptop", sublabel: "Pre-owned notebook", icon: FiCpu },
    { id: "used-pc", label: "Used PC", sublabel: "Pre-owned desktop", icon: FiHardDrive },
    { id: "accessories", label: "Accessories", sublabel: "Peripherals & parts", icon: FiPackage },
];

const OS_OPTIONS = ["Windows 11", "Windows 10", "Windows 11 Pro", "Windows 10 Pro", "No OS / FreeDOS", "Linux"];
const SSD_OPTIONS = ["NVMe SSD", "SATA SSD", "HDD", "NVMe + HDD", "SSD + HDD"];

export default function SellPage() {
    const router = useRouter();
    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);
    const [condition, setCondition] = useState("new");
    const [productType, setProductType] = useState<ProductType>("new-pc");

    const isAccessory = productType === "accessories";
    const isBrandNew = condition === "new";

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const readers = files.map(file =>
                new Promise<string>(resolve => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(file);
                })
            );
            Promise.all(readers).then(results => {
                setPreviews(prev => [...prev, ...results].slice(0, 5));
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        // Map condition
        formData.set("condition", isBrandNew ? "new" : condition === "refurbished" ? "refurbished" : "used");

        // productType
        formData.set("productType", productType);

        // Handle image key
        const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput?.files?.length) {
            formData.set("image", fileInput.files[0]);
        }
        formData.delete("images");
        formData.delete("category");

        try {
            await createProduct(formData);
            toast.success("Product listed successfully!");
            setPreviews([]);
            setCondition("new");
            setProductType("new-pc");
            (e.target as HTMLFormElement).reset();
            router.push("/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Failed to list product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const dark = theme === "dark";

    const inputClass = `w-full border-none rounded-2xl py-4 px-6 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500 ${dark ? "bg-neutral-800 text-white placeholder-neutral-500" : "bg-[#f4f4f8] text-gray-800 placeholder-gray-400"}`;
    const selectClass = `${inputClass} appearance-none cursor-pointer`;
    const labelClass = `block text-xs font-bold uppercase tracking-widest mb-2 ${dark ? "text-neutral-400" : "text-gray-500"}`;
    const sectionClass = `space-y-6 p-7 rounded-3xl border transition-colors ${dark ? "bg-neutral-900/60 border-neutral-800" : "bg-white border-gray-100 shadow-sm"}`;

    return (
        <div className={`flex min-h-screen font-sans transition-colors duration-300 ${dark ? "bg-[#0a0a0a]" : "bg-[#f6f6fa]"}`}>
            <Sidebar activePage="sell" />

            <main className={`flex-1 p-8 lg:p-16 overflow-y-auto`}>
                <div className="max-w-3xl mx-auto">

                    {/* Header */}
                    <div className="mb-10">
                        <p className={`text-xs font-black uppercase tracking-[0.35em] mb-3 ${dark ? "text-indigo-400" : "text-indigo-600"}`}>
                            Seller Hub
                        </p>
                        <h1 className={`text-4xl font-black tracking-tight mb-3 ${dark ? "text-white" : "text-gray-900"}`}>
                            List a Product
                        </h1>
                        <p className={`text-base ${dark ? "text-neutral-400" : "text-gray-500"}`}>
                            Choose a category and fill in the details to list your item on TechBazar.
                        </p>
                    </div>

                    {/* Category Selector */}
                    <div className="mb-8">
                        <p className={labelClass}>Product Category</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {PRODUCT_TYPES.map(({ id, label, sublabel, icon: Icon }) => {
                                const active = productType === id;
                                return (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => setProductType(id)}
                                        className={`flex flex-col items-center gap-2 py-5 px-3 rounded-2xl border-2 font-semibold transition-all duration-200 group
                                            ${active
                                                ? dark
                                                    ? "bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-900/30"
                                                    : "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200"
                                                : dark
                                                    ? "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-indigo-700 hover:text-white"
                                                    : "bg-white border-gray-200 text-gray-500 hover:border-indigo-400 hover:text-indigo-600"
                                            }`}
                                    >
                                        <Icon className="text-2xl" />
                                        <span className="text-sm font-bold">{label}</span>
                                        <span className={`text-[10px] font-medium ${active ? "text-indigo-100" : dark ? "text-neutral-600" : "text-gray-400"}`}>
                                            {sublabel}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* ── Section 1: Basic Info ── */}
                        <div className={sectionClass}>
                            <p className={`text-[11px] font-black uppercase tracking-widest mb-4 ${dark ? "text-indigo-400" : "text-indigo-600"}`}>
                                Basic Information
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClass}>Product Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder={isAccessory ? "e.g. Logitech MX Master 3" : "e.g. Dell XPS 15 9530"}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Brand *</label>
                                    <input
                                        type="text"
                                        name="brand"
                                        required
                                        placeholder={isAccessory ? "e.g. Logitech, Corsair" : "e.g. Dell, Asus, HP, Lenovo"}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClass}>Condition *</label>
                                    <select
                                        name="condition"
                                        required
                                        value={condition}
                                        onChange={e => setCondition(e.target.value)}
                                        className={selectClass}
                                    >
                                        <option value="new">Brand New (Sealed)</option>
                                        <option value="like new">Like New</option>
                                        <option value="excellent">Excellent</option>
                                        <option value="good">Good</option>
                                        <option value="fair">Fair</option>
                                        <option value="refurbished">Refurbished</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Price (Rs.) *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        required
                                        min={1}
                                        placeholder="e.g. 85000"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Color</label>
                                <input
                                    type="text"
                                    name="color"
                                    placeholder="e.g. Space Grey, Platinum Silver"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* ── Section 2: PC / Laptop Specs (hidden for accessories) ── */}
                        {!isAccessory && (
                            <div className={sectionClass}>
                                <p className={`text-[11px] font-black uppercase tracking-widest mb-4 ${dark ? "text-indigo-400" : "text-indigo-600"}`}>
                                    Technical Specifications
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className={labelClass}>CPU / Processor *</label>
                                        <input
                                            type="text"
                                            name="cpu"
                                            required={!isAccessory}
                                            placeholder="e.g. Intel Core i7-12700H"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>GPU / Graphics</label>
                                        <input
                                            type="text"
                                            name="gpu"
                                            placeholder="e.g. NVIDIA RTX 4060, Intel Iris Xe"
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div>
                                        <label className={labelClass}>RAM *</label>
                                        <input
                                            type="text"
                                            name="ram"
                                            required={!isAccessory}
                                            placeholder="e.g. 16GB DDR5"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Storage *</label>
                                        <input
                                            type="text"
                                            name="storage"
                                            required={!isAccessory}
                                            placeholder="e.g. 512GB, 1TB"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Storage Type</label>
                                        <select name="ssdType" className={selectClass}>
                                            <option value="">Select type</option>
                                            {SSD_OPTIONS.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div>
                                        <label className={labelClass}>Processor Generation</label>
                                        <input
                                            type="text"
                                            name="processorGen"
                                            placeholder="e.g. 12th Gen, Ryzen 7000"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Display Size</label>
                                        <input
                                            type="text"
                                            name="displaySize"
                                            placeholder={`e.g. ${productType === "used-laptop" ? '15.6"' : '27"'}`}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Operating System</label>
                                        <select name="os" className={selectClass}>
                                            <option value="">Select OS</option>
                                            {OS_OPTIONS.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── Section 3: Warranty ── */}
                        {!isAccessory && (
                            <div className={sectionClass}>
                                <p className={`text-[11px] font-black uppercase tracking-widest mb-4 ${dark ? "text-indigo-400" : "text-indigo-600"}`}>
                                    Warranty
                                </p>
                                <div>
                                    <label className={labelClass}>
                                        Warranty Status
                                        {isBrandNew && (
                                            <span className="ml-2 text-indigo-400 normal-case font-normal text-xs tracking-normal">Auto: Active</span>
                                        )}
                                    </label>
                                    {isBrandNew ? (
                                        <div className={`w-full rounded-2xl py-4 px-6 text-indigo-500 font-semibold ${dark ? "bg-indigo-900/30" : "bg-indigo-50"}`}>
                                            Active Warranty ✓
                                        </div>
                                    ) : (
                                        <select name="warranty" className={selectClass}>
                                            <option value="none">Out of Warranty</option>
                                            <option value="active">Active Warranty</option>
                                            <option value="partial">Partial Warranty</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ── Section 4: Description ── */}
                        <div className={sectionClass}>
                            <p className={`text-[11px] font-black uppercase tracking-widest mb-4 ${dark ? "text-indigo-400" : "text-indigo-600"}`}>
                                Description
                            </p>
                            <div>
                                <label className={labelClass}>Description *</label>
                                <textarea
                                    name="description"
                                    required
                                    rows={4}
                                    placeholder={
                                        isAccessory
                                            ? "Describe the accessory — compatibility, condition, included items..."
                                            : "Describe the condition, included accessories (charger, mouse, bag), any upgrades or repairs done..."
                                    }
                                    className={`${inputClass} resize-none`}
                                />
                            </div>
                        </div>

                        {/* ── Section 5: Photos ── */}
                        <div className={sectionClass}>
                            <p className={`text-[11px] font-black uppercase tracking-widest mb-4 ${dark ? "text-indigo-400" : "text-indigo-600"}`}>
                                Product Photos
                            </p>
                            <div>
                                <label className={labelClass}>Photos (Up to 5) *</label>
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
                                    <div className={`w-full min-h-[180px] p-6 rounded-3xl border-2 border-dashed flex flex-wrap items-center justify-center gap-4 transition-all group-hover:border-indigo-400 ${dark ? "bg-neutral-800 border-neutral-700 group-hover:bg-neutral-800/80" : "bg-[#f4f4f8] border-gray-200 group-hover:bg-indigo-50/50"}`}>
                                        {previews.length > 0 ? (
                                            previews.map((src, i) => (
                                                <div key={i} className="relative w-28 h-28 rounded-xl overflow-hidden bg-white shadow border border-gray-100">
                                                    <img src={src} alt={`Preview ${i}`} className="w-full h-full object-contain" />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex flex-col items-center gap-3">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${dark ? "bg-neutral-700 group-hover:bg-indigo-900/40" : "bg-gray-200 group-hover:bg-indigo-100"}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-7 h-7 transition-colors ${dark ? "text-neutral-400 group-hover:text-indigo-400" : "text-gray-400 group-hover:text-indigo-500"}`}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                                    </svg>
                                                </div>
                                                <div className="text-center">
                                                    <p className={`font-semibold text-sm ${dark ? "text-neutral-300" : "text-gray-600"}`}>Click to upload photos</p>
                                                    <p className={`text-xs mt-1 ${dark ? "text-neutral-500" : "text-gray-400"}`}>
                                                        Include front, back, ports & screen — up to 5 images
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Submit ── */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-black py-5 rounded-2xl text-lg tracking-wide transition-all duration-200 shadow-xl shadow-indigo-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-3">
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Listing your product...
                                </span>
                            ) : (
                                `List ${PRODUCT_TYPES.find(t => t.id === productType)?.label ?? "Product"} →`
                            )}
                        </button>

                    </form>
                </div>
            </main>
        </div>
    );
}
