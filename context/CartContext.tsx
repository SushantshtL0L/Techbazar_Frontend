"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    brand: string;
    quantity: number;
    size: string;
    color: string;
    description: string;
    condition?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string, size: string) => void;
    updateQuantity: (id: string, size: string, quantity: number) => void;
    updateSize: (id: string, oldSize: string, newSize: string) => void;
    clearCart: () => void;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);



export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (loading) return;

        setIsInitialized(false);

        const guestCartData = localStorage.getItem("cart");
        let guestCartItems: CartItem[] = [];
        if (guestCartData) {
            try {
                guestCartItems = JSON.parse(guestCartData);
            } catch (e) {}
        }

        if (user && (user._id || user.id)) {
            const userKey = `cart_${user._id || user.id}`;
            const savedUserCart = localStorage.getItem(userKey);
            let userCartItems: CartItem[] = [];
            
            if (savedUserCart) {
                try {
                    userCartItems = JSON.parse(savedUserCart);
                } catch (e) {}
            }

            // Merge guest cart into user cart if guest cart has items
            if (guestCartItems.length > 0) {
                guestCartItems.forEach(guestItem => {
                    const existingItemIndex = userCartItems.findIndex(i => i.id === guestItem.id && i.size === guestItem.size);
                    if (existingItemIndex > -1) {
                        userCartItems[existingItemIndex].quantity += guestItem.quantity;
                    } else {
                        userCartItems.push(guestItem);
                    }
                });
                // Clear the guest cart now that it's merged
                localStorage.removeItem("cart");
                // Save the merged cart back to the user key
                localStorage.setItem(userKey, JSON.stringify(userCartItems));
            }

            setCartItems(userCartItems);
        } else {
            setCartItems(guestCartItems);
        }

        setIsInitialized(true);
    }, [user, loading]);

    useEffect(() => {
        if (loading || !isInitialized) return;

        const key = user && (user._id || user.id) ? `cart_${user._id || user.id}` : "cart";
        localStorage.setItem(key, JSON.stringify(cartItems));
    }, [cartItems, user, loading, isInitialized]);

    const addToCart = (item: CartItem) => {
        setCartItems((prev) => {
            const existingItem = prev.find((i) => i.id === item.id && i.size === item.size);
            if (existingItem) {
                return prev.map((i) =>
                    i.id === item.id && i.size === item.size
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (id: string, size: string) => {
        setCartItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
    };

    const updateQuantity = (id: string, size: string, quantity: number) => {
        if (quantity < 1) return;
        setCartItems((prev) =>
            prev.map((i) =>
                i.id === id && i.size === size ? { ...i, quantity } : i
            )
        );
    };

    const updateSize = (id: string, oldSize: string, newSize: string) => {
        setCartItems((prev) => {
            // Check if an item with the new size already exists
            const existingItemWithNewSize = prev.find(i => i.id === id && i.size === newSize);

            if (existingItemWithNewSize) {
                // If it exists, find the old item, add its quantity to the new item, and remove old item
                const oldItem = prev.find(i => i.id === id && i.size === oldSize);
                if (!oldItem) return prev;

                return prev
                    .map(i => i.id === id && i.size === newSize
                        ? { ...i, quantity: i.quantity + oldItem.quantity }
                        : i)
                    .filter(i => !(i.id === id && i.size === oldSize));
            }

            // Otherwise just update the size
            return prev.map((i) =>
                i.id === id && i.size === oldSize ? { ...i, size: newSize } : i
            );
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                updateSize,
                clearCart,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
