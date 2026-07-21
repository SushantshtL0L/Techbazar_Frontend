"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSettings, FiMoon, FiSun, FiLock, FiLogOut, FiChevronRight, FiUser } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";

export default function SettingsDropdown({ customTrigger }: { customTrigger?: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { logout, user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const isDarkMode = theme === 'dark';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {customTrigger ? customTrigger : (
                    <motion.button
                        whileHover={{ rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-[var(--card-bg)] rounded-2xl flex items-center justify-center shadow-xl shadow-black/5 border border-[var(--border-color)] text-[var(--foreground)] hover:bg-[var(--sidebar-bg)] transition-all"
                    >
                        <FiSettings className="text-xl" />
                    </motion.button>
                )}
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-4 w-80 bg-[var(--card-bg)] rounded-[32px] shadow-2xl shadow-black/10 border border-[var(--border-color)] p-6 z-50 overflow-hidden text-[var(--foreground)]"
                    >
                        {/* User Header Section */}
                        <div className="flex items-center gap-4 mb-6 p-2">
                            <div className="w-12 h-12 bg-[var(--foreground)] text-[var(--background)] rounded-2xl flex items-center justify-center text-xl font-bold">
                                {user?.name?.[0] || 'U'}
                            </div>
                            <div className="flex flex-col">
                                <h4 className="font-black text-[var(--foreground)] leading-none mb-1">{user?.name || 'User'}</h4>
                                <p className="text-[10px] font-bold text-neutral-400 truncate w-32">{user?.email || 'user@example.com'}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-2 px-2">Account Management</p>

                            {/* Profile Section */}
                            <button
                                onClick={() => router.push("/profile")}
                                className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--sidebar-bg)] transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[var(--sidebar-bg)] rounded-xl flex items-center justify-center text-neutral-500 group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-all">
                                        <FiUser />
                                    </div>
                                    <span className="font-bold text-[var(--foreground)] text-sm">View Profile</span>
                                </div>
                                <FiChevronRight className="text-neutral-300 group-hover:text-[var(--foreground)]" />
                            </button>

                            {/* Dark Mode Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--sidebar-bg)] transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[var(--sidebar-bg)] rounded-xl flex items-center justify-center text-neutral-500 group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-all">
                                        {isDarkMode ? <FiSun /> : <FiMoon />}
                                    </div>
                                    <span className="font-bold text-[var(--foreground)] text-sm">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                                </div>
                                <div className={`w-10 h-5 rounded-full transition-colors relative ${isDarkMode ? 'bg-green-500' : 'bg-neutral-300'}`}>
                                    <motion.div
                                        animate={{ x: isDarkMode ? 20 : 0 }}
                                        className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-sm"
                                    />
                                </div>
                            </button>

                            {/* Change Password */}
                            <button
                                onClick={() => router.push("/profile?action=change-password")}
                                className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--sidebar-bg)] transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[var(--sidebar-bg)] rounded-xl flex items-center justify-center text-neutral-500 group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-all">
                                        <FiLock />
                                    </div>
                                    <span className="font-bold text-[var(--foreground)] text-sm">Change Password</span>
                                </div>
                                <FiChevronRight className="text-neutral-300 group-hover:text-[var(--foreground)]" />
                            </button>

                            <div className="h-px bg-[var(--border-color)] my-2" />

                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-red-500/10 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                                        <FiLogOut />
                                    </div>
                                    <span className="font-bold text-red-600 text-sm">Logout</span>
                                </div>
                            </button>
                        </div>

                        {/* Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)] rounded-full blur-3xl -mr-16 -mt-16 opacity-10 z-[-1]"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
