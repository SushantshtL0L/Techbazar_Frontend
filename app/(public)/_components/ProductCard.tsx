"use client";

import React from "react";
import { FiHeart, FiStar, FiTrash2, FiArrowRight, FiEdit } from "react-icons/fi";
import { motion } from "framer-motion";
import { handleDeleteProduct } from "@/lib/actions/product.actions";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useWishlist } from "@/context/WishlistContext";

const ProductCard = ({ product, currentUserId, onDeleted }: { product: any, currentUserId?: string, onDeleted?: (id: string) => void }) => {
    const { user } = useAuth();
    const router = useRouter();
    const { theme } = useTheme();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const wishlisted = isInWishlist(product._id || product.id);

    const imageUrl = product.image.startsWith("http")
        ? product.image
        : `http://localhost:5050${product.image}`;

    // Safely extract plain string IDs — prevents [object Object] comparisons with Mongoose ObjectIds
    const getRawId = (val: any): string | undefined => {
        if (!val) return undefined;
        if (typeof val === 'string') return val;
        if (val.$oid) return val.$oid;
        return typeof val.toString === 'function' ? val.toString() : undefined;
    };
    const currentId = getRawId(user?.id || user?._id);
    const sellerId = getRawId(
        typeof product.seller === 'string'
            ? product.seller
            : (product.seller?._id || product.seller?.id || product.seller)
    );

    const isOwner = !!(currentId && sellerId && currentId === sellerId);

    const isAdmin = user?.role?.toLowerCase() === "admin";
    const canManage = isOwner || isAdmin;

    const navigateToDetail = () => {
        router.push(`/product/${product._id || product.id}`);
    };

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const id = product._id || product.id;
        if (wishlisted) {
            removeFromWishlist(id);
            toast.info("Removed from wishlist");
        } else {
            addToWishlist({
                id,
                name: product.name,
                price: Number(product.price || product.Value || 0),
                image: product.image,
                brand: product.brand || "Gadget",
                condition: product.condition,
                description: product.description || "",
                size: product.size
            });
            toast.success("Added to wishlist!");
        }
    };

    const onDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;
        try {
            const result = await handleDeleteProduct(product._id || product.id);
            if (result.success) {
                toast.success("Product deleted successfully");
                if (onDeleted) onDeleted(product._id || product.id);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Failed to delete product");
        }
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group cursor-pointer"
            onClick={navigateToDetail}
        >
            <div className="block">
                <div className={`relative aspect-square rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 border ${theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-100'}`}>
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Condition Badge */}
                    <div className="absolute top-4 left-4">
                        <span className={`
                            px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm
                            ${product.condition === 'new' ? theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white' : 'bg-blue-600 text-white'}
                        `}>
                            {product.condition || 'Pre-owned'}
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                        <button
                            onClick={handleWishlistToggle}
                            className={`w-10 h-10 backdrop-blur-md rounded-xl flex items-center justify-center transition-all shadow-sm ${wishlisted
                                    ? "bg-red-500 text-white shadow-red-500/30"
                                    : theme === "dark" ? "bg-neutral-800/80 text-neutral-400 hover:text-red-500" : "bg-white/80 text-neutral-400 hover:text-red-500"
                                    }`}
                                title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                            >
                                <FiHeart className={`text-xl ${wishlisted ? "fill-white" : ""}`} />
                            </button>

                        {canManage && (
                            <>
                                <Link
                                    href={`/product/${product._id || product.id}/edit`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-10 h-10 bg-blue-500/10 backdrop-blur-md rounded-xl flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                                >
                                    <FiEdit className="text-xl" />
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onDelete();
                                    }}
                                    className="w-10 h-10 bg-red-500/10 backdrop-blur-md rounded-xl flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                >
                                    <FiTrash2 className="text-xl" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Featured Label */}
                    {(product.isNew || product.rating > 4.5) && (
                        <div className="absolute bottom-4 left-4">
                            <div className={`flex items-center gap-1 backdrop-blur-md px-2 py-1 rounded-md shadow-sm border ${theme === 'dark' ? 'bg-neutral-800/80 text-white border-neutral-700' : 'bg-white/80 text-neutral-900 border-neutral-100'}`}>
                                <FiStar className="text-yellow-400 fill-yellow-400 text-[10px]" />
                                <span className="text-[9px] font-bold tracking-wider">TOP RATED</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-4 px-1">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col w-full">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-blue-500 uppercase tracking-wide">
                                    {product.brand || "Gadget"}
                                </span>
                                {product.size && (
                                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-500'}`}>
                                        {product.size}
                                    </span>
                                )}
                            </div>
                            <h3 className={`text-base font-semibold leading-tight transition-colors line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-neutral-800 group-hover:text-blue-600'}`}>
                                {product.name}
                            </h3>
                        </div>
                    </div>

                    <div className={`flex items-center justify-between mt-3 p-3 rounded-xl border transition-all duration-300 ${theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-100 group-hover:bg-white group-hover:border-blue-100 group-hover:shadow-sm'}`}>
                        <div className="flex flex-col">
                            <span className={`text-[10px] font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>Price</span>
                            <span className={`text-lg font-bold transition-colors ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                                Rs. {(() => {
                                    const rawPrice = product.price || product.Value;
                                    const priceToFormat = typeof rawPrice === 'string' ? parseFloat(rawPrice) : rawPrice;
                                    return priceToFormat?.toLocaleString() || "0";
                                })()}
                            </span>
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm transform group-hover:translate-x-1 transition-transform duration-300 ${theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-blue-50 text-blue-600'}`}>
                            <FiArrowRight className="text-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
