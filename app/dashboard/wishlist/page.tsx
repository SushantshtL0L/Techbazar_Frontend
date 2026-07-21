"use client";

import React from "react";
import Sidebar from "../_components/Sidebar";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiShoppingBag, FiTrash2, FiArrowRight } from "react-icons/fi";
import { toast } from "react-toastify";
import Link from "next/link";

export default function WishlistPage() {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { theme } = useTheme();

    const handleAddToCart = (item: any) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            brand: item.brand,
            quantity: 1,
            size: item.size || "42",
            color: "White",
            description: item.description || "",
            condition: item.condition || "new",
        });
        toast.success(`${item.name} added to cart!`);
    };

    const handleRemove = (id: string, name: string) => {
        removeFromWishlist(id);
        toast.info(`${name} removed from wishlist`);
    };

    return (
        <div className={`flex min-h-screen font-sans transition-colors duration-300 ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-[#f5f5f5]"}`}>
            <Sidebar activePage="wishlist" />

            <main className={`flex-1 flex flex-col transition-colors duration-300 ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-white"}`}>
                <div className="p-10 lg:p-16 max-w-6xl mx-auto w-full">

                    {/* Header */}
                    <header className="mb-16">
                        <div className="flex items-center gap-4 mb-3">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme === "dark" ? "bg-red-500/10" : "bg-red-50"}`}>
                                <FiHeart className="text-red-500 text-2xl fill-red-500" />
                            </div>
                            <h1 className={`text-5xl font-black tracking-tighter uppercase ${theme === "dark" ? "text-white" : "text-neutral-900"}`}>
                                My Wishlist<span className="text-red-500">.</span>
                            </h1>
                        </div>
                        <p className={`text-sm font-bold uppercase tracking-widest ml-16 ${theme === "dark" ? "text-neutral-500" : "text-neutral-400"}`}>
                            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
                        </p>
                    </header>

                    {wishlistItems.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center justify-center py-40 gap-8"
                        >
                            <div className={`w-32 h-32 rounded-[40px] flex items-center justify-center ${theme === "dark" ? "bg-neutral-900" : "bg-neutral-100"}`}>
                                <FiHeart className={`text-6xl ${theme === "dark" ? "text-neutral-700" : "text-neutral-300"}`} />
                            </div>
                            <div className="text-center">
                                <h2 className={`text-3xl font-black tracking-tight mb-3 ${theme === "dark" ? "text-white" : "text-neutral-900"}`}>
                                    Your wishlist is empty
                                </h2>
                                <p className={`text-base ${theme === "dark" ? "text-neutral-500" : "text-neutral-400"}`}>
                                    Tap the heart icon on any product to save it here.
                                </p>
                            </div>
                            <Link href="/dashboard">
                                <button className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all shadow-lg ${theme === "dark" ? "bg-white text-black hover:bg-neutral-200" : "bg-neutral-900 text-white hover:bg-neutral-800"}`}>
                                    Browse Gadgets <FiArrowRight />
                                </button>
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {wishlistItems.map((item, index) => {
                                    const imageUrl = item.image.startsWith("http")
                                        ? item.image
                                        : `http://localhost:5050${item.image}`;

                                    return (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={`group rounded-2xl overflow-hidden border transition-all duration-300 shadow-sm hover:shadow-md ${theme === "dark" ? "bg-neutral-900 border-neutral-800 hover:border-neutral-700" : "bg-white border-neutral-100 hover:border-neutral-200"}`}
                                        >
                                            {/* Image */}
                                            <div className={`relative aspect-square overflow-hidden ${theme === "dark" ? "bg-neutral-800" : "bg-neutral-50"}`}>
                                                <img
                                                    src={imageUrl}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                                                />
                                                {/* Condition badge */}
                                                <div className="absolute top-4 left-4">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${item.condition === "new" ? (theme === "dark" ? "bg-white text-black" : "bg-black text-white") : "bg-blue-600 text-white"}`}>
                                                        {item.condition || "Pre-owned"}
                                                    </span>
                                                </div>
                                                {/* Remove button */}
                                                <button
                                                    onClick={() => handleRemove(item.id, item.name)}
                                                    className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:scale-110 shadow-lg shadow-red-500/30"
                                                    title="Remove from wishlist"
                                                >
                                                    <FiTrash2 className="text-base" />
                                                </button>
                                            </div>

                                            {/* Info */}
                                            <div className="p-4">
                                                <div className="mb-3">
                                                    <span className={`text-xs font-bold uppercase tracking-wide text-blue-500`}>
                                                        {item.brand || "Gadget"}
                                                    </span>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <h3 className={`text-base font-semibold leading-tight line-clamp-1 ${theme === "dark" ? "text-white" : "text-neutral-900"}`}>
                                                            {item.name}
                                                        </h3>
                                                        {item.size && (
                                                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-500'}`}>
                                                                {item.size}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <span className={`text-2xl font-black ${theme === "dark" ? "text-white" : "text-neutral-900"}`}>
                                                        Rs. {Number(item.price).toLocaleString()}
                                                    </span>

                                                    <div className="flex gap-2">
                                                        <Link href={`/dashboard/product/${item.id}`}>
                                                            <button className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all text-sm border ${theme === "dark" ? "border-neutral-700 text-neutral-400 hover:border-white hover:text-white" : "border-neutral-200 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900"}`}>
                                                                <FiArrowRight />
                                                            </button>
                                                        </Link>
                                                        <button
                                                            onClick={() => handleAddToCart(item)}
                                                            className="flex items-center gap-2 px-4 h-10 rounded-2xl bg-[#6db56f] text-white text-sm font-bold hover:bg-[#5da061] transition-all active:scale-95 shadow-lg shadow-green-500/20"
                                                        >
                                                            <FiShoppingBag className="text-sm" />
                                                            Add to Cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
