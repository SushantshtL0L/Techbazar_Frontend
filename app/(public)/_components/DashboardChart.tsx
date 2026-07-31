"use client";

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';
import { motion } from 'framer-motion';

export default function DashboardChart({ isDark, data = [] }: { isDark: boolean; data: any[] }) {
    // If data is empty, show empty state or handle gracefully
    const hasData = data && data.length > 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {/* Revenue Trend Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-8 rounded-[32px] border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-100 shadow-sm'}`}
            >
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Revenue Trend</h4>
                        <p className="text-neutral-500 text-xs font-medium uppercase tracking-wider">Weekly performance</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span className="text-xs font-bold text-neutral-500">Revenue (Rs.)</span>
                    </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#262626' : '#f0f0f0'} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#737373', fontSize: 12, fontWeight: 600 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#737373', fontSize: 12, fontWeight: 600 }}
                                tickFormatter={(value) => `Rs.${value / 1000}k`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#171717' : '#fff',
                                    border: 'none',
                                    borderRadius: '16px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                    color: isDark ? '#fff' : '#000'
                                }}
                                itemStyle={{ fontWeight: 'bold' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#3b82f6"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorRevenue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Orders Distribution Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`p-8 rounded-[32px] border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-100 shadow-sm'}`}
            >
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Order Volume</h4>
                        <p className="text-neutral-500 text-xs font-medium uppercase tracking-wider">Orders per day</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-teal-500"></span>
                        <span className="text-xs font-bold text-neutral-500">Orders</span>
                    </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#262626' : '#f0f0f0'} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#737373', fontSize: 12, fontWeight: 600 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#737373', fontSize: 12, fontWeight: 600 }}
                            />
                            <Tooltip
                                cursor={{ fill: isDark ? '#262626' : '#f9fafb' }}
                                contentStyle={{
                                    backgroundColor: isDark ? '#171717' : '#fff',
                                    border: 'none',
                                    borderRadius: '16px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                    color: isDark ? '#fff' : '#000'
                                }}
                            />
                            <Bar dataKey="orders" fill="#14b8a6" radius={[6, 6, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
}
