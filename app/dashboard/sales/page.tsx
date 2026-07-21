"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../_components/Sidebar";
import ProductCard from "../_components/ProductCard";
import NotificationPanel from "../_components/NotificationPanel";
import SettingsDropdown from "../_components/SettingsDropdown";
import { handleGetAllProducts } from "@/lib/actions/product.actions";
import { useTheme } from "@/context/ThemeContext";
import { FiTrendingUp } from "react-icons/fi";

export default function SalesPage() {
    const { theme } = useTheme();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopProducts = async () => {
            setLoading(true);
            try {
                // Fetching products to show as most sales
                const result = await handleGetAllProducts(1, 12);
                if (result.success) {
                    setProducts(result.data.products || result.data || []);
                }
            } catch (error) {
                console.error("Error fetching sales data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopProducts();
    }, []);

    return (
        <div className={`flex min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-[#f8f9fa] text-neutral-900'}`}>
            {/* Left Sidebar */}
            <Sidebar activePage="sales" />

            {/* Main Content Area */}
            <main className={`flex-1 p-8 lg:p-12 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>

                {/* Header Section */}
                <header className="flex justify-between items-center mb-10 pb-6 border-b border-neutral-100 dark:border-neutral-800">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-red-600">
                            <FiTrendingUp className="text-xl" />
                            <span className="text-xs font-bold uppercase tracking-widest">Trending Now</span>
                        </div>
                        <h1 className="text-4xl font-black uppercase tracking-tight">
                            Most <span className="text-red-600">Sales</span> Items
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <NotificationPanel />
                        <SettingsDropdown />
                    </div>
                </header>

                {/* Content Section */}
                {loading ? (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div key={product._id || product.id} className="relative">
                                {/* Simple Badge to denote it's a top seller */}
                                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                                    TOP SELLER
                                </div>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}

                {!loading && products.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-neutral-500">No popular items found at the moment.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
