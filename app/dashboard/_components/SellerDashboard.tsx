"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPackage, FiShoppingCart, FiTrendingUp, FiShoppingBag, FiArrowUpRight, FiDollarSign } from "react-icons/fi";
import { handleGetAllProducts } from "@/lib/actions/product.actions";
import { handleGetAllOrders, handleGetChartData } from "@/lib/actions/order.actions";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

import DashboardChart from "./DashboardChart";

interface Stats {
    products: number;
    orders: number;
    sales: number;
    cart: number;
}

export default function SellerDashboard() {
    const { user } = useAuth();
    const { theme } = useTheme();
    const userRole = user?.role?.toLowerCase() || "";
    const [stats, setStats] = useState<Stats>({
        products: 0,
        orders: 0,
        sales: 0,
        cart: 0
    });
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                // Robust ID extraction — handles ObjectId, BSON $oid, plain string
                const getRawId = (u: any): string | undefined => {
                    if (!u) return undefined;
                    const raw = u.id || u._id;
                    if (!raw) return undefined;
                    if (typeof raw === 'string') return raw;
                    if (raw.$oid) return raw.$oid;
                    return raw.toString?.();
                };
                const userId = getRawId(user);
                // Admin sees ALL products — no seller filter
                const sellerFilter = userRole === "seller" ? userId : undefined;

                // Parallel fetching of all necessary dashboard data
                const [productRes, orderRes, chartRes] = await Promise.all([
                    handleGetAllProducts(1, 999, "", sellerFilter),
                    handleGetAllOrders(1, 1),
                    handleGetChartData()
                ]);

                // 1. Process Product Stats
                const productCount = productRes.success
                    ? (productRes.data?.total ?? productRes.data?.products?.length ?? productRes.data?.length ?? 0)
                    : 0;

                // 2. Process Order Stats (from handleGetAllOrders)
                const orderStats = orderRes.success ? orderRes.stats : null;

                setStats({
                    products: productCount,
                    orders: orderStats?.all || 0,
                    sales: orderStats?.revenue || 0,
                    cart: orderStats?.pending || 0
                });

                // 3. Process Chart Data
                if (chartRes.success) {
                    setChartData(chartRes.data);
                }
            } catch (error) {
                console.error("Failed to fetch seller stats", error);
            }
            setLoading(false);
        };

        if (user) fetchStats();
    }, [user, userRole]);

    const isDark = theme === 'dark';

    const StatCard = ({ label, value, icon: Icon, color, suffix = "" }: any) => (
        <motion.div
            whileHover={{ y: -5 }}
            className={`p-8 rounded-[32px] border transition-all relative overflow-hidden ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-100 shadow-sm'
                }`}
        >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${color} bg-opacity-10 text-xl`}>
                <Icon className={color.replace('bg-', 'text-')} />
            </div>

            <div className="flex flex-col">
                <span className="text-neutral-500 text-xs font-black uppercase tracking-widest mb-1">{label}</span>
                <div className="flex items-baseline gap-1">
                    <h4 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        {suffix && suffix === 'Rs. ' ? suffix : ''}
                        {typeof value === 'number' ? value.toLocaleString() : value}
                        {suffix && suffix !== 'Rs. ' ? suffix : ''}
                    </h4>
                </div>
            </div>

            <div className="absolute top-6 right-6">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-50 text-neutral-400'}`}>
                    <FiArrowUpRight />
                </div>
            </div>

            {/* Decorative background circle */}
            <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-[0.03] ${color}`}></div>
        </motion.div>
    );

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`h-48 rounded-[32px] animate-pulse ${isDark ? 'bg-neutral-900' : 'bg-neutral-100'}`}></div>
                ))}
            </div>
        );
    }

    return (
        <div className="mb-16">
            <h3 className={`text-xl font-bold tracking-tight mb-8 transition-colors ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {userRole === 'admin' ? 'Platform Overview' : 'Seller Performance Overview'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label={userRole === 'admin' ? 'Total Products' : 'Your Products'}
                    value={stats.products}
                    icon={FiShoppingBag}
                    color="bg-blue-500"
                    suffix=" Items"
                />
                <StatCard
                    label={userRole === 'admin' ? 'Total Orders' : 'Product Orders'}
                    value={stats.orders}
                    icon={FiPackage}
                    color="bg-teal-500"
                    suffix=" Orders"
                />
                <StatCard
                    label={userRole === 'admin' ? 'Total Revenue' : 'Total Sales'}
                    value={stats.sales}
                    icon={FiDollarSign}
                    color="bg-orange-500"
                    suffix="Rs. "
                />
                <StatCard
                    label={userRole === 'admin' ? 'Pending Orders' : 'Active Cart'}
                    value={stats.cart}
                    icon={FiShoppingCart}
                    color={userRole === 'admin' ? 'bg-yellow-500' : 'bg-neutral-500'}
                    suffix={userRole === 'admin' ? ' Pending' : ' (Disabled)'}
                />
            </div>

            {/* Visual Charts Section */}
            <DashboardChart isDark={isDark} data={chartData} />
        </div>
    );
}

