"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiBell, FiX, FiPackage, FiTag, FiInfo, FiZap, FiTrash2, FiSend, FiChevronDown
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { handleGetNotifications, handleCreateNotification, handleDeleteNotification } from "@/lib/actions/notification.actions";
import { markAllNotificationsRead } from "@/lib/api/notification";
import { toast } from "react-toastify";

interface Notification {
    _id: string;
    title: string;
    message: string;
    type: "offer" | "announcement" | "general" | "order";
    isRead: boolean;
    createdAt: string;
}

const TYPE_CONFIG: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
    order: { icon: <FiPackage />, color: "text-blue-500", bg: "bg-blue-500/10" },
    offer: { icon: <FiTag />, color: "text-orange-500", bg: "bg-orange-500/10" },
    announcement: { icon: <FiZap />, color: "text-purple-500", bg: "bg-purple-500/10" },
    general: { icon: <FiInfo />, color: "text-teal-500", bg: "bg-teal-500/10" },
};

export default function NotificationPanel() {
    const { user } = useAuth();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const isAdmin = user?.role?.toLowerCase() === "admin";

    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: "", message: "", type: "general" });
    const [sending, setSending] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const fetchNotifications = async () => {
        setLoading(true);
        const res = await handleGetNotifications();
        if (res.success) setNotifications(res.data || []);
        setLoading(false);
    };

    useEffect(() => {
        if (user) fetchNotifications();
    }, [user]);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleDelete = async (id: string) => {
        await handleDeleteNotification(id);
        setNotifications(prev => prev.filter(n => n._id !== id));
        toast.success("Notification deleted");
    };

    const handleSend = async () => {
        if (!form.title.trim() || !form.message.trim()) {
            toast.error("Title and message are required");
            return;
        }
        setSending(true);
        const res = await handleCreateNotification(form);
        if (res.success) {
            toast.success("Broadcast notification sent!");
            setForm({ title: "", message: "", type: "general" });
            setShowForm(false);
            await fetchNotifications();
        } else {
            toast.error(res.message || "Failed to send notification");
        }
        setSending(false);
    };

    const timeAgo = (dateStr: string) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return "Just now";
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        return `${Math.floor(hrs / 24)}d ago`;
    };

    // Bell Button
    const togglePanel = async () => {
        const next = !open;
        setOpen(next);
        if (next && unreadCount > 0) {
            // Mark all as read optimistically, then call backend
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            try { await markAllNotificationsRead(); } catch { /* silent */ }
        }
    };

    return (
        <div className="relative" ref={panelRef}>
            {/* Bell Button */}
            <button
                onClick={togglePanel}
                className={`relative w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${isDark
                    ? "bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700"
                    : "bg-neutral-100 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200"
                    }`}
                title="Notifications"
            >
                <FiBell className="text-lg" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute right-0 top-14 w-[380px] rounded-[28px] shadow-2xl border z-50 overflow-hidden ${isDark
                            ? "bg-neutral-900 border-neutral-800 shadow-black/50"
                            : "bg-white border-neutral-100 shadow-neutral-200/80"
                            }`}
                    >
                        {/* Header */}
                        <div className={`flex items-center justify-between px-6 py-5 border-b ${isDark ? "border-neutral-800" : "border-neutral-100"}`}>
                            <div>
                                <h3 className={`text-base font-black tracking-tight ${isDark ? "text-white" : "text-neutral-900"}`}>
                                    Notifications
                                </h3>
                                <p className="text-xs text-neutral-400 mt-0.5">
                                    {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {isAdmin && (
                                    <button
                                        onClick={() => setShowForm(f => !f)}
                                        className="text-xs font-bold px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-500 hover:bg-purple-500 hover:text-white transition-all"
                                    >
                                        {showForm ? "Cancel" : "+ Broadcast"}
                                    </button>
                                )}
                                <button
                                    onClick={() => setOpen(false)}
                                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isDark ? "hover:bg-neutral-800 text-neutral-400" : "hover:bg-neutral-100 text-neutral-400"}`}
                                >
                                    <FiX />
                                </button>
                            </div>
                        </div>

                        {/* Admin Broadcast Form */}
                        <AnimatePresence>
                            {isAdmin && showForm && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className={`border-b overflow-hidden ${isDark ? "border-neutral-800 bg-neutral-800/40" : "border-neutral-100 bg-neutral-50"}`}
                                >
                                    <div className="p-5 flex flex-col gap-3">
                                        <p className="text-xs font-black uppercase tracking-widest text-purple-500">Send Broadcast to All Users</p>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={form.title}
                                            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                            className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none focus:ring-2 focus:ring-purple-500/30 transition-all ${isDark ? "bg-neutral-900 border-neutral-700 text-white placeholder-neutral-500" : "bg-white border-neutral-200 text-neutral-900 placeholder-neutral-400"}`}
                                        />
                                        <textarea
                                            placeholder="Message"
                                            value={form.message}
                                            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                            rows={2}
                                            className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none focus:ring-2 focus:ring-purple-500/30 transition-all resize-none ${isDark ? "bg-neutral-900 border-neutral-700 text-white placeholder-neutral-500" : "bg-white border-neutral-200 text-neutral-900 placeholder-neutral-400"}`}
                                        />
                                        <div className="flex items-center gap-3">
                                            <div className="relative flex-1">
                                                <select
                                                    value={form.type}
                                                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                                                    className={`w-full appearance-none px-4 py-2.5 rounded-xl text-sm border outline-none cursor-pointer ${isDark ? "bg-neutral-900 border-neutral-700 text-white" : "bg-white border-neutral-200 text-neutral-900"}`}
                                                >
                                                    <option value="general">General</option>
                                                    <option value="offer">Offer</option>
                                                    <option value="announcement">Announcement</option>
                                                    <option value="order">Order</option>
                                                </select>
                                                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                                            </div>
                                            <button
                                                onClick={handleSend}
                                                disabled={sending}
                                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500 text-white text-sm font-bold hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <FiSend className="text-sm" />
                                                {sending ? "Sending..." : "Send"}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Notification List */}
                        <div className="max-h-[360px] overflow-y-auto">
                            {loading ? (
                                <div className="flex flex-col gap-3 p-5">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={`h-16 rounded-2xl animate-pulse ${isDark ? "bg-neutral-800" : "bg-neutral-100"}`} />
                                    ))}
                                </div>
                            ) : notifications.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 gap-3">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${isDark ? "bg-neutral-800 text-neutral-600" : "bg-neutral-100 text-neutral-300"}`}>
                                        <FiBell />
                                    </div>
                                    <p className="text-sm font-medium text-neutral-400">No notifications yet</p>
                                </div>
                            ) : (
                                <div className="p-3 flex flex-col gap-2">
                                    {notifications.map(notif => {
                                        const cfg = TYPE_CONFIG[notif.type] || TYPE_CONFIG.general;
                                        return (
                                            <motion.div
                                                key={notif._id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={`group flex items-start gap-4 p-4 rounded-2xl transition-all relative ${isDark ? "hover:bg-neutral-800" : "hover:bg-neutral-50"
                                                    }`}
                                            >
                                                {/* Type Icon */}
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.bg} ${cfg.color}`}>
                                                    {cfg.icon}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm font-bold leading-snug ${isDark ? "text-white" : "text-neutral-900"}`}>
                                                        {notif.title}
                                                    </p>
                                                    <p className="text-xs text-neutral-400 mt-0.5 line-clamp-2 leading-relaxed">
                                                        {notif.message}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1.5">
                                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${cfg.bg} ${cfg.color}`}>
                                                            {notif.type}
                                                        </span>
                                                        <span className="text-[10px] text-neutral-400">{timeAgo(notif.createdAt)}</span>
                                                    </div>
                                                </div>

                                                {/* Delete (admin only) */}
                                                {isAdmin && (
                                                    <button
                                                        onClick={() => handleDelete(notif._id)}
                                                        className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
                                                    >
                                                        <FiTrash2 className="text-sm" />
                                                    </button>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {notifications.length > 0 && (
                            <div className={`px-6 py-4 border-t ${isDark ? "border-neutral-800" : "border-neutral-100"}`}>
                                <p className="text-xs text-center text-neutral-400">
                                    Showing last {notifications.length} notifications
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
