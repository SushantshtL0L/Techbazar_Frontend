"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../_components/Sidebar";
import { handleGetAllOrders, handleUpdateOrderStatus } from "@/lib/actions/order.actions";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
    FiPackage,
    FiCalendar,
    FiUser,
    FiChevronDown,
    FiChevronUp,
    FiRefreshCw,
    FiCheck,
} from "react-icons/fi";

const STATUS_OPTIONS = ["processing", "shipped", "delivered", "cancelled"] as const;
type OrderStatus = typeof STATUS_OPTIONS[number];

const STATUS_COLORS: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    processing: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    shipped: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    delivered: "bg-green-500/10 text-green-400 border-green-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function ManageOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);
    const limit = 10;
    const { theme } = useTheme();
    const { user } = useAuth();

    const fetchOrders = async () => {
        setLoading(true);
        const result = await handleGetAllOrders(page, limit);
        if (result.success) {
            setOrders(result.data);
            setPagination(result.pagination);
        } else {
            toast.error("Failed to load orders");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, [page]);

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        setUpdatingId(orderId);
        const result = await handleUpdateOrderStatus(orderId, newStatus);
        if (result.success) {
            toast.success(`Order status updated to "${newStatus}"`);
            setOrders((prev) =>
                prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
            );
        } else {
            toast.error(result.message || "Failed to update status");
        }
        setUpdatingId(null);
    };

    const isDark = theme === "dark";
    const cardBg = isDark ? "bg-neutral-900 border-neutral-800" : "bg-[#f9f9f9] border-neutral-100";
    const textPrimary = isDark ? "text-white" : "text-neutral-900";
    const textSub = "text-neutral-500";

    return (
        <div className={`flex min-h-screen font-sans transition-colors duration-300 ${isDark ? "bg-[#0a0a0a]" : "bg-[#fcfcfc]"}`}>
            <Sidebar activePage="manage-orders" />

            <main className={`flex-1 p-10 lg:p-20 overflow-y-auto ${isDark ? "bg-[#0a0a0a]" : "bg-white"}`}>
                <div className="max-w-5xl mx-auto">
                    <header className="mb-14 flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h2 className={`text-5xl font-bold tracking-tighter ${textPrimary}`}>
                                Manage Orders<span className="text-teal-500">.</span>
                            </h2>
                            <p className={`mt-3 text-lg ${textSub}`}>
                                Update delivery status for orders containing your products.
                            </p>
                        </div>
                        <button
                            onClick={fetchOrders}
                            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all ${isDark ? "bg-neutral-800 text-white hover:bg-neutral-700" : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"}`}
                        >
                            <FiRefreshCw className={loading ? "animate-spin" : ""} />
                            Refresh
                        </button>
                    </header>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <div className={`w-12 h-12 border-4 rounded-full animate-spin ${isDark ? "border-white/10 border-t-white" : "border-neutral-200 border-t-neutral-900"}`} />
                            <p className={textSub}>Loading orders...</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className={`flex flex-col items-center justify-center py-24 rounded-[50px] border border-dashed ${isDark ? "border-neutral-800 bg-neutral-900/30" : "border-neutral-200 bg-neutral-50"}`}>
                            <FiPackage className="text-7xl text-neutral-400 mb-6" />
                            <h3 className={`text-2xl font-bold ${textPrimary}`}>No orders yet</h3>
                            <p className={`mt-2 ${textSub}`}>Orders for your products will appear here.</p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {orders.map((order) => (
                                <div
                                    key={order._id}
                                    className={`rounded-[36px] border overflow-hidden transition-all ${cardBg}`}
                                >
                                    {/* Header */}
                                    <div
                                        className="p-7 cursor-pointer flex flex-wrap items-center justify-between gap-5"
                                        onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                                <FiPackage className="text-2xl text-teal-500" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-0.5">Order</p>
                                                <p className={`text-base font-bold ${textPrimary}`}>#{order._id.slice(-8).toUpperCase()}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-6 ml-auto">
                                            {/* Customer */}
                                            {order.user && (
                                                <div className="hidden md:flex items-center gap-2 text-neutral-500 font-semibold text-sm">
                                                    <FiUser />
                                                    <span>{order.user.name || order.user.email || "Customer"}</span>
                                                </div>
                                            )}

                                            {/* Date */}
                                            <div className="hidden sm:flex items-center gap-2 text-neutral-500 font-semibold text-sm">
                                                <FiCalendar />
                                                <span>{new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}</span>
                                            </div>

                                            {/* Total */}
                                            <p className={`text-lg font-black ${textPrimary}`}>
                                                Rs {order.totalAmount?.toLocaleString()}
                                            </p>

                                            {/* Status Badge */}
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${STATUS_COLORS[order.status] || STATUS_COLORS.processing}`}>
                                                {order.status}
                                            </span>

                                            {expandedOrder === order._id
                                                ? <FiChevronUp className="text-xl text-neutral-400" />
                                                : <FiChevronDown className="text-xl text-neutral-400" />
                                            }
                                        </div>
                                    </div>

                                    {/* Expanded Panel */}
                                    <AnimatePresence>
                                        {expandedOrder === order._id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className={`border-t ${isDark ? "border-neutral-800 bg-black/10" : "border-neutral-100 bg-white"}`}
                                            >
                                                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
                                                    {/* Items */}
                                                    <div>
                                                        <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-5">Items in Order</p>
                                                        <div className="space-y-4">
                                                            {order.items.map((item: any, idx: number) => (
                                                                <div key={idx} className="flex items-center gap-4">
                                                                    <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center p-2 overflow-hidden ${isDark ? "bg-neutral-800 border-neutral-700" : "bg-neutral-50 border-neutral-100"}`}>
                                                                        <img
                                                                            src={item.image?.startsWith("http") ? item.image : `http://localhost:5050${item.image}`}
                                                                            alt={item.name}
                                                                            className="w-full h-full object-contain"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <p className={`font-bold text-sm ${textPrimary}`}>{item.name}</p>
                                                                        <p className="text-xs text-neutral-500 font-medium">
                                                                            Size: {item.size} &bull; Qty: {item.quantity}
                                                                        </p>
                                                                        <p className="text-teal-500 font-bold text-sm">Rs {item.price?.toLocaleString()}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Shipping Address */}
                                                        {order.shippingAddress && (
                                                            <div className={`mt-6 p-5 rounded-2xl ${isDark ? "bg-neutral-800/60" : "bg-neutral-50"}`}>
                                                                <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-3">Ship To</p>
                                                                <p className={`font-bold ${textPrimary}`}>{order.shippingAddress.fullName}</p>
                                                                <p className="text-sm text-neutral-500">{order.shippingAddress.address}, {order.shippingAddress.city}</p>
                                                                <p className="text-sm text-neutral-500">📞 {order.shippingAddress.phone}</p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Status Update Panel */}
                                                    <div>
                                                        <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-5">Update Status</p>
                                                        <div className="space-y-3">
                                                            {STATUS_OPTIONS.map((s) => {
                                                                const isActive = order.status === s;
                                                                const isLoading = updatingId === order._id;
                                                                return (
                                                                    <button
                                                                        key={s}
                                                                        onClick={() => !isActive && !isLoading && handleStatusChange(order._id, s)}
                                                                        disabled={isActive || isLoading}
                                                                        className={`
                                                                            w-full flex items-center justify-between px-6 py-4 rounded-2xl border font-bold text-sm uppercase tracking-widest transition-all
                                                                            ${isActive
                                                                                ? `${STATUS_COLORS[s]} cursor-default`
                                                                                : isDark
                                                                                    ? "border-neutral-700 text-neutral-500 hover:border-neutral-500 hover:text-white hover:bg-neutral-800 cursor-pointer"
                                                                                    : "border-neutral-200 text-neutral-400 hover:border-neutral-400 hover:text-neutral-800 hover:bg-neutral-50 cursor-pointer"
                                                                            }
                                                                            disabled:opacity-60
                                                                        `}
                                                                    >
                                                                        <span>{s}</span>
                                                                        {isActive && <FiCheck className="text-lg" />}
                                                                        {isLoading && !isActive && <FiRefreshCw className="animate-spin text-base" />}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>

                                                        <div className={`mt-6 p-5 rounded-2xl ${isDark ? "bg-neutral-800/40" : "bg-neutral-50"}`}>
                                                            <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-1">Payment</p>
                                                            <p className={`font-black uppercase tracking-widest ${textPrimary}`}>{order.paymentMethod}</p>
                                                            <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mt-3 mb-1">Total</p>
                                                            <p className="text-teal-500 font-black text-xl">Rs {order.totalAmount?.toLocaleString()}</p>
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
                                <div className={`pt-10 flex items-center justify-between border-t ${isDark ? 'border-neutral-800' : 'border-neutral-100'}`}>
                                    <p className={`text-sm ${textSub} font-medium`}>
                                        Showing page <span className={`${textPrimary} font-bold`}>{pagination.page}</span> of <span className={`${textPrimary} font-bold`}>{pagination.pages}</span>
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            disabled={pagination.page === 1}
                                            className={`px-6 py-3 rounded-2xl text-sm font-bold border transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed ${isDark ? "bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700" : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50"}`}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                                            disabled={pagination.page === pagination.pages}
                                            className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 ${isDark ? "bg-white text-black" : "bg-neutral-900 text-white"}`}
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
