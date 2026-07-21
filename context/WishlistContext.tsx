"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
    brand: string;
    condition?: string;
    description?: string;
    size?: string;
}

interface WishlistContextType {
    wishlistItems: WishlistItem[];
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: string) => void;
    isInWishlist: (id: string) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load wishlist from localStorage when user changes
    useEffect(() => {
        if (loading) return;

        setIsInitialized(false);

        const key = user && (user._id || user.id) ? `wishlist_${user._id || user.id}` : "wishlist";
        const saved = localStorage.getItem(key);

        if (saved) {
            try {
                setWishlistItems(JSON.parse(saved));
            } catch {
                setWishlistItems([]);
            }
        } else {
            setWishlistItems([]);
        }

        setIsInitialized(true);
    }, [user, loading]);

    // Persist wishlist to localStorage
    useEffect(() => {
        if (loading || !isInitialized) return;

        const key = user && (user._id || user.id) ? `wishlist_${user._id || user.id}` : "wishlist";
        localStorage.setItem(key, JSON.stringify(wishlistItems));
    }, [wishlistItems, user, loading, isInitialized]);

    const addToWishlist = (item: WishlistItem) => {
        setWishlistItems((prev) => {
            if (prev.find((i) => i.id === item.id)) return prev;
            return [...prev, item];
        });
    };

    const removeFromWishlist = (id: string) => {
        setWishlistItems((prev) => prev.filter((i) => i.id !== id));
    };

    const isInWishlist = (id: string) => {
        return wishlistItems.some((i) => i.id === id);
    };

    const clearWishlist = () => setWishlistItems([]);

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};
