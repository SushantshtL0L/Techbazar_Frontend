"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllProducts } from "@/lib/api/product";
import ProductCard from "@/app/dashboard/_components/ProductCard";
import { FiTrendingUp, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const TopSales = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                // Fetching limited products to represent "Most Sales"
                const data = await getAllProducts(1, 4);
                setProducts(data.products || []);
            } catch (error) {
                console.error("Error fetching top sales:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopProducts();
    }, []);

    if (loading) {
        return (
            <div className="py-20 flex justify-center">
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (products.length === 0) return null;

    return (
        <section className="py-24 px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-red-600/10 rounded-xl flex items-center justify-center text-red-600">
                                <FiTrendingUp className="text-xl" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-red-600">
                                Best Sellers
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tighter uppercase">
                            Most <span className="text-red-600">Sales</span> Items
                        </h2>
                    </motion.div>

                    <div className="flex flex-col items-end gap-4">
                        <motion.p
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-md text-neutral-400 text-lg leading-relaxed text-right"
                        >
                            Check out our most popular kicks that are flying off the shelves.
                        </motion.p>
                        <Link href="/dashboard" className="text-red-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                            View all products <FiArrowRight />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id || product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopSales;
