"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiTag, FiZap, FiShoppingBag } from "react-icons/fi";

const OFFERS = [
    {
        id: 1,
        title: "Limited Thrift Drop",
        description: "Curated vintage sneakers from top collectors. Authenticity guaranteed.",
        badge: "Thrift Offer",
        color: "bg-orange-500",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop",
        cta: "Shop Thrift"
    },
    {
        id: 2,
        title: "Season End Sale",
        description: "Get up to 40% off on latest Nike and Adidas models. Valid this week.",
        badge: "New Sales",
        color: "bg-blue-600",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop",
        cta: "Explore Deals"
    }
];

export default function FeaturedOffers() {
    return (
        <section className="mb-16 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {OFFERS.map((offer, index) => (
                    <motion.div
                        key={offer.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative h-[300px] rounded-[40px] overflow-hidden group cursor-pointer"
                    >
                        {/* Background Image */}
                        <img
                            src={offer.image}
                            alt={offer.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-10 flex flex-col justify-end">
                            <div className="mb-4">
                                <span className={`${offer.color} text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full`}>
                                    {offer.badge}
                                </span>
                            </div>

                            <h2 className="text-3xl font-black text-white mb-2 leading-tight tracking-tighter">
                                {offer.title}
                            </h2>
                            <p className="text-white/70 text-sm max-w-[300px] mb-6 font-medium">
                                {offer.description}
                            </p>

                            <div className="flex">
                                <button className="bg-white text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-neutral-200 transition-colors group/btn">
                                    {offer.cta}
                                    <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Top Right Icon Decoration */}
                        <div className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white text-xl">
                            {offer.id === 1 ? <FiTag /> : <FiZap />}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
