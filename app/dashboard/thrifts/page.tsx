"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../_components/Sidebar";
import ProductCard from "../_components/ProductCard";
import SupportSection from "../_components/SupportSection";
import { handleGetAllProducts } from "@/lib/actions/product.actions";
import { getUserData } from "@/lib/cookie";
import { useTheme } from "@/context/ThemeContext";

export default function ThriftsPage() {
    const { theme } = useTheme();
    const [liveProducts, setLiveProducts] = useState<any[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string | undefined>();

    const dummyThrifts = [
        {
            id: "d3",
            brand: "ADIDAS",
            name: "Men Black Solid Adivat Running Shoes",
            price: "1619",
            rating: "4.7",
            sold: "4500",
            image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400",
            isNew: false,
            condition: "thrift"
        },
    ];

    useEffect(() => {
        const fetchInitialData = async () => {
            const [productsResult, userData] = await Promise.all([
                handleGetAllProducts(),
                getUserData()
            ]);

            if (productsResult.success) {
                // Only keep thrifts from live data
                const thriftsOnly = productsResult.data.filter((p: any) => p.condition === "thrift");
                setLiveProducts(thriftsOnly);
            }
            if (userData && (userData.id || userData._id)) {
                setCurrentUserId(userData.id || userData._id);
            }
        };
        fetchInitialData();
    }, []);

    const allThrifts = [...liveProducts, ...dummyThrifts];

    const handleProductDeleted = (id: string) => {
        setLiveProducts(prev => prev.filter(p => (p._id || p.id) !== id));
    };

    return (
        <div className={`flex min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#fcfcfc]'}`}>
            <Sidebar activePage="thrifts" />

            {/* Main Content */}
            <main className={`flex-1 p-20 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                <header className="flex justify-between items-center mb-20 px-4">
                    <h2 className={`text-2xl font-bold tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Thrift Collection</h2>
                    <div className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                        {allThrifts.length} items found
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-28 px-4">
                    {allThrifts.map((product, index) => (
                        <ProductCard
                            key={product.id || index}
                            product={product}
                            currentUserId={currentUserId}
                            onDeleted={handleProductDeleted}
                        />
                    ))}
                    {allThrifts.length === 0 && (
                        <div className="col-span-full text-center py-20">
                            <p className="text-2xl text-gray-400 font-medium">No thrift items available right now.</p>
                        </div>
                    )}
                </div>

                <SupportSection />
            </main>
        </div>
    );
}
