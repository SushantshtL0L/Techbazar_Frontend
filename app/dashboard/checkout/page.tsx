"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleCreateOrder } from "@/lib/actions/order.actions";
import Image from "next/image";

const PAYMENT_METHODS = [
    { id: 'cod', name: 'Cash on Delivery', description: 'Pay at doorstep' },
    { id: 'esewa', name: 'eSewa', description: 'Pay using eSewa Wallet' },
    { id: 'khalti', name: 'Khalti', description: 'Pay using Khalti Wallet' }
];

export default function CheckoutPage() {
    const { cartItems, totalPrice, clearCart } = useCart();
    const { user, loading } = useAuth();
    const router = useRouter();

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        address: user?.location || "",
        city: "Kathmandu",
        paymentMethod: "cod"
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: prev.name || user.name || "",
                phone: prev.phone || user.phone || "",
                address: prev.address || user.location || ""
            }));
        }
    }, [user]);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login?redirectTo=/dashboard/checkout");
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (cartItems.length === 0 && !isSuccess) {
            router.push("/dashboard/cart");
        }
    }, [cartItems, isSuccess, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const processOrder = async () => {
        if (!formData.name || !formData.phone || !formData.address) {
            toast.warning("Please fill in all shipping details");
            return;
        }

        setIsProcessing(true);

        try {
            const orderData = {
                items: cartItems.map(item => ({
                    product: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    size: item.size,
                    image: item.image
                })),
                totalAmount: totalPrice,
                paymentMethod: formData.paymentMethod,
                shippingAddress: {
                    fullName: formData.name,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city
                }
            };

            const result = await handleCreateOrder(orderData);

            if (result.success) {
                setIsProcessing(false);
                setIsSuccess(true);
                clearCart();
                toast.success("Order Placed Successfully!");
            } else {
                setIsProcessing(false);
                toast.error(result.message || "Failed to place order");
            }
        } catch (error) {
            setIsProcessing(false);
            toast.error("An error occurred while placing your order");
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-white">
                <main className="max-w-3xl mx-auto px-6 py-20 text-center">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-5xl text-green-600">✓</span>
                    </div>
                    <h2 className="text-4xl font-black text-[#0A2540] mb-4">Order Placed!</h2>
                    <p className="text-gray-500 mb-8">Thank you for your purchase. Your order is being processed.</p>
                    <Link href="/products" className="bg-[#0A2540] text-white px-8 py-3 rounded-full font-bold hover:bg-[#164070] transition-colors">
                        Continue Shopping
                    </Link>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="bg-[#0A2540] text-white py-8 px-6 lg:px-8 shadow-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-3xl font-black">Checkout</h1>
                    <Link href="/" className="text-white hover:text-gray-300 font-semibold flex items-center gap-2 transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* LEFT COLUMN: DETAILS */}
                    <div className="w-full lg:w-2/3 space-y-8">
                        {/* Shipping Details */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-[#0A2540] mb-6 flex items-center gap-2">
                                <span className="bg-[#0A2540] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">1</span> 
                                Shipping Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        className="w-full border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-[#0A2540] focus:ring-1 focus:ring-[#0A2540]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="98XXXXXXXX"
                                        className="w-full border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-[#0A2540] focus:ring-1 focus:ring-[#0A2540]"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                                    <input
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Building, Street, Area"
                                        className="w-full border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-[#0A2540] focus:ring-1 focus:ring-[#0A2540]"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                                    <select
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-[#0A2540] focus:ring-1 focus:ring-[#0A2540] bg-white"
                                    >
                                        <option>Kathmandu</option>
                                        <option>Lalitpur</option>
                                        <option>Bhaktapur</option>
                                        <option>Pokhara</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-[#0A2540] mb-6 flex items-center gap-2">
                                <span className="bg-[#0A2540] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">2</span> 
                                Payment Method
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {PAYMENT_METHODS.map((method) => (
                                    <label 
                                        key={method.id} 
                                        className={`border rounded-xl p-4 cursor-pointer transition-colors ${formData.paymentMethod === method.id ? 'border-[#0A2540] bg-blue-50/30' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <input 
                                                type="radio" 
                                                name="paymentMethod" 
                                                value={method.id} 
                                                checked={formData.paymentMethod === method.id}
                                                onChange={handleInputChange}
                                                className="accent-[#0A2540] w-4 h-4"
                                            />
                                            <span className="font-bold text-gray-900">{method.name}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 pl-7">{method.description}</p>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: SUMMARY */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-32">
                            <h3 className="text-xl font-bold text-[#0A2540] mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-6">
                                {cartItems.map((item) => (
                                    <div key={`${item.id}-${item.size}`} className="flex items-center gap-4 border-b border-gray-100 pb-4">
                                        <div className="w-16 h-16 bg-gray-50 rounded-xl p-1 relative flex-shrink-0">
                                            <img
                                                src={item.image.startsWith("http") ? item.image : `http://localhost:5050${item.image}`}
                                                alt={item.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <h4 className="font-bold text-gray-900 text-sm truncate">{item.name}</h4>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            <p className="font-black text-[#0A2540] text-sm">Rs {(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-bold">Rs {totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-bold text-green-600">Free</span>
                                </div>
                                <div className="h-px bg-gray-200 my-2" />
                                <div className="flex justify-between text-lg">
                                    <span className="font-bold text-gray-900">Total</span>
                                    <span className="font-black text-[#0A2540]">Rs {totalPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={processOrder}
                                disabled={isProcessing}
                                className="w-full bg-[#0A2540] text-white py-4 rounded-xl font-bold hover:bg-[#164070] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                {isProcessing ? 'Processing...' : 'Confirm Order'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
