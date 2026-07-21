"use client";

import React, { useEffect, useState } from "react";
import { handleGetAllOrders, handleUpdateOrderStatus, handleDeleteOrder } from "@/lib/actions/order.actions";
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
    FiFilter,
    FiTrash2,
} from "react-icons/fi";

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"] as const;
type OrderStatus = typeof STATUS_OPTIONS[number];

const STATUS_COLORS: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    processing: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    shipped: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    delivered: "bg-green-500/10 text-green-400 border-green-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);
    const [stats, setStats] = useState<any>({});
    const limit = 10;

    const fetchOrders = async () => {
        setLoading(true);
        const result = await handleGetAllOrders(page, limit, statusFilter);
        if (result.success) {
            setOrders(result.data);
            setPagination(result.pagination);
            setStats(result.stats || {});
        } else {
            toast.error("Failed to load orders");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page, statusFilter]);

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        setUpdatingId(orderId);
        const result = await handleUpdateOrderStatus(orderId, newStatus);
        if (result.success) {
            toast.success(`Order updated to "${newStatus}"`);
            setOrders((prev) =>
                prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
            );
        } else {
            toast.error(result.message || "Failed to update status");
        }
        setUpdatingId(null);
    };

    const handleDelete = async (orderId: string) => {
        if (!window.confirm("Are you sure you want to permanently delete this order? This action cannot be undone.")) return;

        setUpdatingId(orderId);
        const result = await handleDeleteOrder(orderId);
        if (result.success) {
            toast.success("Order deleted successfully");
            setOrders((prev) => prev.filter((o) => o._id !== orderId));
        } else {
            toast.error(result.message || "Failed to delete order");
        }
        setUpdatingId(null);
    };

    const summaryCount = (s: string) => stats[s] || 0;

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "serif" }}>
                        Order Management
                    </h2>
                    <p className="text-gray-500 mt-2">
                        View and update delivery status for all platform orders.
                    </p>
                </div>
                <button
                    onClick={() => { setPage(1); fetchOrders(); }}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm bg-neutral-800 text-white hover:bg-neutral-700 transition-all"
                >
                    <FiRefreshCw className={loading ? "animate-spin" : ""} />
                    Refresh
                </button>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {STATUS_OPTIONS.map((s) => (
                    <button
                        key={s}
                        onClick={() => {
                            setStatusFilter(statusFilter === s ? "all" : s);
                            setPage(1);
                        }}
                        className={`p-5 rounded-2xl border text-left transition-all hover:scale-105 ${statusFilter === s
                            ? STATUS_COLORS[s] + " border-current"
                            : "bg-neutral-900 border-white/5 text-white/60 hover:border-white/20"
                            }`}
                    >
                        <p className="text-3xl font-light mb-1" style={{ fontFamily: "serif" }}>
                            {summaryCount(s)}
                        </p>
                        <p className="text-xs uppercase tracking-widest font-bold opacity-70">{s}</p>
                    </button>
                ))}
            </div>

            {/* Filter bar */}
            <div className="flex items-center gap-3 flex-wrap">
                <FiFilter className="text-neutral-500" />
                <button
                    onClick={() => { setStatusFilter("all"); setPage(1); }}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${statusFilter === "all" ? "bg-white text-black" : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"}`}
                >
                    All ({stats.all || 0})
                </button>
                {STATUS_OPTIONS.map((s) => (
                    <button
                        key={s}
                        onClick={() => { setStatusFilter(s); setPage(1); }}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${statusFilter === s ? STATUS_COLORS[s] + " border-current" : "border-transparent bg-neutral-800 text-neutral-400 hover:bg-neutral-700"}`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <div className="w-12 h-12 border-4 rounded-full animate-spin border-white/10 border-t-white" />
                    <p className="text-neutral-500">Loading orders...</p>
                </div>
            ) : orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 bg-neutral-900/60 rounded-[40px] border border-dashed border-neutral-800">
                    <FiPackage className="text-7xl text-neutral-600 mb-6" />
                    <h3 className="text-2xl font-bold text-white">No orders found</h3>
                    <p className="text-neutral-500 mt-2">Try adjusting your filters.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="rounded-[32px] border border-white/5 bg-neutral-900 overflow-hidden transition-all hover:border-white/10"
                        >
                            {/* Order Header Row */}
                            <div
                                className="p-6 cursor-pointer flex flex-wrap items-center justify-between gap-4"
                                onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <FiPackage className="text-xl text-neutral-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-0.5">Order ID</p>
                                        <p className="text-sm font-bold text-white">#{order._id.slice(-10).toUpperCase()}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-5 ml-auto">
                                    {order.user && (
                                        <div className="hidden md:flex items-center gap-2 text-neutral-400 text-sm font-semibold">
                                            <FiUser className="text-neutral-600" />
                                            <span>{order.user.name || order.user.email || "—"}</span>
                                        </div>
                                    )}
                                    <div className="hidden sm:flex items-center gap-2 text-neutral-500 text-xs font-semibold">
                                        <FiCalendar />
                                        {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                    </div>
                                    <p className="text-white font-black text-base">
                                        Rs {order.totalAmount?.toLocaleString()}
                                    </p>
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${STATUS_COLORS[order.status]}`}>
                                        {order.status}
                                    </span>
                                    {expandedOrder === order._id
                                        ? <FiChevronUp className="text-neutral-400" />
                                        : <FiChevronDown className="text-neutral-400" />
                                    }
                                </div>
                            </div>

                            {/* Expanded Details */}
                            <AnimatePresence>
                                {expandedOrder === order._id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="border-t border-white/5 bg-black/20"
                                    >
                                        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
                                            {/* Left: Items + Shipping */}
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-5">Ordered Items</p>
                                                <div className="space-y-4 mb-6">
                                                    {order.items.map((item: any, idx: number) => (
                                                        <div key={idx} className="flex items-center gap-4">
                                                            <div className="w-14 h-14 bg-neutral-800 border border-white/5 rounded-xl flex items-center justify-center p-1.5 overflow-hidden flex-shrink-0">
                                                                <img
                                                                    src={item.image?.startsWith("http") ? item.image : `http://localhost:5050${item.image}`}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-contain"
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="text-white font-bold text-sm">{item.name}</p>
                                                                <p className="text-neutral-500 text-xs font-medium">Size {item.size} &bull; Qty {item.quantity}</p>
                                                                <p className="text-teal-400 font-bold text-sm">Rs {item.price?.toLocaleString()}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {order.shippingAddress && (
                                                    <div className="p-5 bg-neutral-800/50 rounded-2xl">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-3">Ship To</p>
                                                        <p className="text-white font-bold">{order.shippingAddress.fullName}</p>
                                                        <p className="text-neutral-400 text-sm mt-1">{order.shippingAddress.address}, {order.shippingAddress.city}</p>
                                                        <p className="text-neutral-500 text-sm">📞 {order.shippingAddress.phone}</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Right: Status Changer */}
                                            <div>
                                                <div className="flex justify-between items-center mb-5">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Set Order Status</p>
                                                    <button
                                                        onClick={() => handleDelete(order._id)}
                                                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors"
                                                    >
                                                        <FiTrash2 /> Delete Order
                                                    </button>
                                                </div>
                                                <div className="space-y-3 mb-6">
                                                    {STATUS_OPTIONS.map((s) => {
                                                        const isActive = order.status === s;
                                                        const isLoading = updatingId === order._id;
                                                        return (
                                                            <button
                                                                key={s}
                                                                onClick={() => !isActive && !isLoading && handleStatusChange(order._id, s)}
                                                                disabled={isActive || isLoading}
                                                                className={`
                                                                    w-full flex items-center justify-between px-6 py-4 rounded-2xl border text-sm font-black uppercase tracking-widest transition-all
                                                                    ${isActive
                                                                        ? STATUS_COLORS[s] + " border-current cursor-default"
                                                                        : "border-white/5 text-neutral-500 hover:border-white/20 hover:text-white hover:bg-white/5 cursor-pointer"
                                                                    }
                                                                    disabled:opacity-60
                                                                `}
                                                            >
                                                                <span>{s}</span>
                                                                {isActive && <FiCheck />}
                                                                {isLoading && !isActive && <FiRefreshCw className="animate-spin" />}
                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                                <div className="p-5 bg-neutral-800/50 rounded-2xl flex justify-between items-center">
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">Payment</p>
                                                        <p className="text-white font-black uppercase text-sm">{order.paymentMethod}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">Total</p>
                                                        <p className="text-teal-400 font-black text-xl">Rs {order.totalAmount?.toLocaleString()}</p>
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
                        <div className="pt-10 flex items-center justify-between border-t border-white/5">
                            <p className="text-sm text-neutral-500 font-medium">
                                Showing page <span className="text-white font-bold">{pagination.page}</span> of <span className="text-white font-bold">{pagination.pages}</span>
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={pagination.page === 1}
                                    className="px-6 py-3 rounded-2xl text-sm font-bold bg-neutral-800 text-white border border-white/5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-700 transition-all flex items-center gap-2"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                                    disabled={pagination.page === pagination.pages}
                                    className="px-6 py-3 rounded-2xl text-sm font-bold bg-white text-black hover:scale-105 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
