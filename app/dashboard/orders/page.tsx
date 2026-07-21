"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../_components/Sidebar";
import { handleGetMyOrders } from "@/lib/actions/order.actions";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiPackage, FiCalendar, FiCreditCard, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);
    const limit = 10;
    const { theme } = useTheme();

    const fetchOrders = async () => {
        setLoading(true);
        const result = await handleGetMyOrders(page, limit);
        if (result.success) {
            setOrders(result.data);
            setPagination(result.pagination);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, [page]);

    const toggleOrder = (id: string) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500/10 text-yellow-500';
            case 'processing': return 'bg-teal-500/10 text-teal-500';
            case 'shipped': return 'bg-blue-500/10 text-blue-500';
            case 'delivered': return 'bg-green-500/10 text-green-600';
            case 'cancelled': return 'bg-red-500/10 text-red-500';
            default: return 'bg-gray-500/10 text-gray-500';
        }
    };

    return (
        <div className={`flex min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#fcfcfc]'}`}>
            <Sidebar activePage="orders" />

            <main className={`flex-1 p-10 lg:p-20 overflow-y-auto transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                <div className="max-w-5xl mx-auto">
                    <header className="mb-16">
                        <h2 className={`text-6xl font-bold tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>My Orders<span className="text-teal-500">.</span></h2>
                        <p className="text-neutral-500 text-xl mt-4">Track and manage your recent purchases.</p>
                    </header>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className={`w-12 h-12 border-4 rounded-full animate-spin ${theme === 'dark' ? 'border-white/10 border-t-white' : 'border-neutral-200 border-t-neutral-900'}`} />
                            <p className="text-neutral-500 font-medium">Crunching order data...</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-neutral-50 rounded-[50px] border border-dashed border-neutral-200">
                            <FiPackage className="text-7xl text-neutral-300 mb-6" />
                            <h3 className="text-2xl font-bold text-neutral-600">No orders yet</h3>
                            <p className="text-neutral-400 mt-2">Your shopping journey starts here.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div
                                    key={order._id}
                                    className={`rounded-[40px] overflow-hidden transition-all border ${theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-[#f9f9f9] border-neutral-100 hover:border-neutral-200'
                                        }`}
                                >
                                    {/* Order Header */}
                                    <div
                                        onClick={() => toggleOrder(order._id)}
                                        className="p-8 cursor-pointer flex flex-wrap items-center justify-between gap-6"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center">
                                                <FiPackage className="text-3xl text-teal-500" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-1">Order ID</p>
                                                <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>#{order._id.slice(-8).toUpperCase()}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-12">
                                            <div className="hidden md:block">
                                                <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-1">Date</p>
                                                <div className="flex items-center gap-2 text-neutral-500 font-bold">
                                                    <FiCalendar />
                                                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                                </div>
                                            </div>

                                            <div className="hidden sm:block">
                                                <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-1">Total</p>
                                                <p className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>Rs {order.totalAmount.toLocaleString()}</p>
                                            </div>

                                            <span className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>

                                            <button className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-white'} transition-colors`}>
                                                {expandedOrder === order._id ? <FiChevronUp className="text-2xl" /> : <FiChevronDown className="text-2xl" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Order Details (Expanded) */}
                                    <AnimatePresence>
                                        {expandedOrder === order._id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className={`transition-colors ${theme === 'dark' ? 'bg-black/20' : 'bg-white'}`}
                                            >
                                                <div className="p-8 border-t border-neutral-100 dark:border-neutral-800">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                                        {/* Items List */}
                                                        <div className="space-y-6">
                                                            <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-4">Items Ordered</h4>
                                                            {order.items.map((item: any, idx: number) => (
                                                                <div key={idx} className="flex items-center gap-4 group">
                                                                    <div className={`w-20 h-20 rounded-2xl overflow-hidden p-2 flex items-center justify-center border ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : 'bg-[#f5f5f5] border-neutral-100'}`}>
                                                                        <img
                                                                            src={item.image.startsWith('http') ? item.image : `http://localhost:5050${item.image}`}
                                                                            alt={item.name}
                                                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <h5 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{item.name}</h5>
                                                                        <p className="text-sm text-neutral-500 font-medium">Size: {item.size} • Qty: {item.quantity}</p>
                                                                        <p className="text-teal-500 font-bold">Rs {item.price.toLocaleString()}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Summary & Payment */}
                                                        <div className="bg-neutral-50/50 dark:bg-neutral-800/30 rounded-3xl p-8 h-fit">
                                                            <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-6">Order Summary</h4>
                                                            <div className="space-y-4">
                                                                <div className="flex justify-between items-center pb-4 border-b border-dashed border-neutral-200 dark:border-neutral-700">
                                                                    <span className="text-neutral-500 font-bold flex items-center gap-2"><FiCreditCard /> Payment Method</span>
                                                                    <span className={`font-black uppercase tracking-widest text-xs ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{order.paymentMethod}</span>
                                                                </div>
                                                                <div className="flex justify-between items-start pb-4 border-b border-dashed border-neutral-200 dark:border-neutral-700">
                                                                    <span className="text-neutral-500 font-bold flex items-center gap-2 mt-1">Shipping Address</span>
                                                                    <span className={`text-xs font-bold text-right max-w-[200px] ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                                                                        {order.shippingAddress ? (
                                                                            typeof order.shippingAddress === 'string' ? (
                                                                                order.shippingAddress
                                                                            ) : (
                                                                                <>
                                                                                    {order.shippingAddress.fullName}<br />
                                                                                    {order.shippingAddress.address}, {order.shippingAddress.city}<br />
                                                                                    {order.shippingAddress.phone}
                                                                                </>
                                                                            )
                                                                        ) : "Not specified"}
                                                                    </span>
                                                                </div>
                                                                <div className="flex justify-between items-center text-xl pt-2">
                                                                    <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>Total Amount</span>
                                                                    <span className="text-teal-500 font-black">Rs {order.totalAmount.toLocaleString()}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}

                            {/* Pagination Controls */}
                            {pagination && pagination.pages > 1 && (
                                <div className={`pt-10 flex items-center justify-between border-t ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-100'}`}>
                                    <p className="text-sm text-neutral-500 font-medium">
                                        Showing page <span className={`${theme === 'dark' ? 'text-white' : 'text-neutral-900'} font-bold`}>{pagination.page}</span> of <span className={`${theme === 'dark' ? 'text-white' : 'text-neutral-900'} font-bold`}>{pagination.pages}</span>
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            disabled={pagination.page === 1}
                                            className={`px-6 py-3 rounded-2xl text-sm font-bold border transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed ${theme === 'dark' ? 'bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700' : 'bg-white text-neutral-900 border-neutral-200 hover:bg-neutral-50'
                                                }`}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                                            disabled={pagination.page === pagination.pages}
                                            className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 ${theme === 'dark' ? 'bg-white text-black' : 'bg-neutral-900 text-white'
                                                }`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
