"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
    const { user } = useAuth();
    const router = useRouter();

    const handleRemove = (id: string, size: string) => {
        removeFromCart(id, size);
        toast.info("Item removed from cart");
    };

    const handleQuantityChange = (id: string, size: string, currentQty: number, delta: number) => {
        if (currentQty + delta > 0) {
            updateQuantity(id, size, currentQty + delta);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            {/* Header Area */}
            <div className="bg-[#0A2540] text-white py-8 px-6 lg:px-8 shadow-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-3xl font-black">Your Cart</h1>
                    <Link href="/" className="text-white hover:text-gray-300 font-semibold flex items-center gap-2 transition-colors">
                        ← Back to Shopping
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-8 py-12 flex flex-col">
                {cartItems.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-6 py-20">
                        <FiShoppingBag className="text-8xl opacity-50" />
                        <h2 className="text-3xl font-bold text-[#0A2540]">Your cart is empty</h2>
                        <p className="text-lg">Looks like you haven't added anything yet.</p>
                        <Link href="/products" className="mt-4 px-8 py-4 bg-[#0A2540] text-white rounded-full font-bold hover:bg-[#164070] transition-colors">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Cart Items List */}
                        <div className="w-full lg:w-2/3 flex flex-col gap-6">
                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={`${item.id}-${item.size}-${item.color}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="bg-white rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-8 shadow-sm border border-gray-100 relative group"
                                    >
                                        {/* Product Image */}
                                        <div className="w-40 h-40 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                                            <img
                                                src={item.image.startsWith("http") ? item.image : `http://localhost:5050${item.image}`}
                                                alt={item.name}
                                                className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 flex flex-col w-full">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-[#0A2540]">{item.brand}</h3>
                                                    <p className="text-lg text-gray-600 font-medium">{item.name}</p>
                                                    <p className="text-xl font-bold text-[#0A2540] mt-2">Rs {item.price.toLocaleString()}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleRemove(item.id, item.size)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                                    title="Remove item"
                                                >
                                                    <FiTrash2 className="text-2xl" />
                                                </button>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-4 mt-6">
                                                {/* Specs */}
                                                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl">
                                                    <span className="text-sm font-semibold text-gray-600">Color:</span>
                                                    <span className="text-sm font-bold text-[#0A2540]">{item.color || "Default"}</span>
                                                </div>
                                                {item.size && (
                                                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl">
                                                        <span className="text-sm font-semibold text-gray-600">Storage/Size:</span>
                                                        <span className="text-sm font-bold text-[#0A2540]">{item.size}</span>
                                                    </div>
                                                )}

                                                <div className="flex-1 flex justify-end min-w-[120px]">
                                                    {/* Quantity Control */}
                                                    <div className="flex items-center bg-[#0A2540] rounded-full px-4 py-2 gap-4">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.size, item.quantity, -1)}
                                                            className="text-white hover:text-gray-300 transition-colors"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <FiMinus />
                                                        </button>
                                                        <span className="text-white font-bold min-w-[20px] text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.size, item.quantity, 1)}
                                                            className="text-white hover:text-gray-300 transition-colors"
                                                        >
                                                            <FiPlus />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary sidebar */}
                        <div className="w-full lg:w-1/3">
                            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-8">
                                <h2 className="text-2xl font-bold text-[#0A2540] mb-6">Order Summary</h2>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span className="font-semibold">Rs {totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="font-semibold text-green-600">Free</span>
                                    </div>
                                    <div className="h-px bg-gray-100 my-4" />
                                    <div className="flex justify-between text-xl">
                                        <span className="font-bold text-[#0A2540]">Total</span>
                                        <span className="font-black text-[#0A2540]">Rs {totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        if (user?.role === "seller") {
                                            toast.error("Seller accounts are not allowed to place orders.");
                                            return;
                                        }
                                        router.push("/dashboard/checkout");
                                    }}
                                    disabled={user?.role === "seller"}
                                    className={`w-full py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-2 ${
                                        user?.role === "seller"
                                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            : "bg-[#0A2540] text-white hover:bg-[#164070]"
                                    }`}
                                >
                                    {user?.role === "seller" ? "Sellers Cannot Order" : "Proceed to Checkout"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
