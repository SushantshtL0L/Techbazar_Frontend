"use client";

import React, { useEffect, useState } from "react";
import DashboardChart from "../../dashboard/_components/DashboardChart";
import { handleGetChartData } from "@/lib/actions/order.actions";

export default function AdminCharts() {
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChart = async () => {
            setLoading(true);
            try {
                const res = await handleGetChartData();
                if (res.success) {
                    setChartData(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch admin chart data", error);
            }
            setLoading(false);
        };
        fetchChart();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                <div className="h-[400px] rounded-[32px] bg-neutral-900 animate-pulse border border-white/5"></div>
                <div className="h-[400px] rounded-[32px] bg-neutral-900 animate-pulse border border-white/5"></div>
            </div>
        );
    }

    return (
        <div className="mt-12">
            <h3 className="text-gray-500 font-medium uppercase tracking-widest text-sm mb-6">System Performance Trend</h3>
            <DashboardChart isDark={true} data={chartData} />
        </div>
    );
}
