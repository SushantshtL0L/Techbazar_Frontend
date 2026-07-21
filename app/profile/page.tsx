"use client";

import React, { useState, useRef, Suspense } from "react";
import { FiCamera, FiUser, FiMail, FiArrowRight, FiShield, FiPackage, FiArrowLeft, FiLogOut } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import ChangePasswordForm from "./_components/ChangePasswordForm";
import OrdersTab from "./_components/OrdersTab";
import Sidebar from "@/app/dashboard/_components/Sidebar";

type ProfileTab = "account" | "orders" | "security";

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfilePageContent />
    </Suspense>
  );
}

function ProfileLoading() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className={`flex min-h-screen font-sans ${isDark ? "bg-[#0a0a0a]" : "bg-[#f8f9fa]"}`}>
      <main className={`flex-1 flex items-center justify-center ${isDark ? "bg-[#0a0a0a]" : "bg-white"}`}>
        <div className={`w-12 h-12 border-4 rounded-full animate-spin ${isDark ? "border-neutral-800 border-t-white" : "border-neutral-100 border-t-neutral-900"}`} />
      </main>
    </div>
  );
}

function ProfilePageContent() {
  const { user, checkAuth, logout } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDark = theme === "dark";

  const initialTab: ProfileTab =
    searchParams.get("action") === "change-password" ? "security" : searchParams.get("action") === "orders" ? "orders" : "account";
  const [activeTab, setActiveTab] = useState<ProfileTab>(initialTab);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const getImageUrl = (path: string | null | undefined) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `http://localhost:5050${path}`;
  };

  const handleTabChange = (tab: ProfileTab) => {
    setActiveTab(tab);
    if (tab === "security") {
      router.replace("/profile?action=change-password", { scroll: false });
    } else if (tab === "orders") {
      router.replace("/profile?action=orders", { scroll: false });
    } else {
      router.replace("/profile", { scroll: false });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const formData = new FormData();
      if (nameRef.current) formData.append("name", nameRef.current.value);
      const file = fileInputRef.current?.files?.[0];
      if (file) formData.append("image", file);

      const { handleUpdateProfile } = await import("@/lib/actions/auth.actions");
      const result = await handleUpdateProfile(formData);

      if (result.success) {
        await checkAuth();
        toast.success("Profile updated successfully!");
      } else {
        toast.error(result.message || "Failed to update profile");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to update profile";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = `w-full border-none rounded-2xl py-4 pl-12 pr-4 outline-none transition-all focus:ring-2 focus:ring-teal-400 font-medium ${
    isDark ? "bg-neutral-800 text-white placeholder-neutral-500" : "bg-neutral-100 text-neutral-900 placeholder-neutral-400"
  }`;

  const tabs = [
    { key: "account" as ProfileTab, label: "Account Details", icon: FiUser },
    { key: "orders" as ProfileTab, label: "My Orders", icon: FiPackage },
    { key: "security" as ProfileTab, label: "Change Password", icon: FiShield },
  ];

  return (
    <div className={`flex min-h-screen font-sans transition-colors duration-300 ${isDark ? "bg-[#0a0a0a]" : "bg-[#f8f9fa]"}`}>
      {(user?.role === 'admin' || user?.role === 'seller') && <Sidebar activePage="profile" />}
      <main className={`flex-1 overflow-y-auto transition-colors duration-300 ${isDark ? "bg-[#0a0a0a]" : "bg-white"}`}>
        {/* Navigation Bar */}
        {(user?.role !== 'admin' && user?.role !== 'seller') && (
        <nav className="bg-[#0A2540] text-white shadow-md px-10 py-5 flex items-center justify-between">
          <Link 
            href={user?.role === 'admin' || user?.role === 'seller' ? '/dashboard' : '/'} 
            className="flex items-center gap-3 font-bold hover:scale-105 transition-transform text-gray-300 hover:text-white"
          >
            <FiArrowLeft className="text-xl" />
            {user?.role === 'admin' || user?.role === 'seller' ? 'Back to Dashboard' : 'Back to Home'}
          </Link>

          <button 
            onClick={logout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors bg-white/10 text-white hover:bg-red-500 hover:text-white"
          >
            <FiLogOut />
            Logout
          </button>
        </nav>
        )}

        <div className="max-w-4xl mx-auto p-10 lg:p-16">
          {/* Header */}
          <header className="flex justify-between items-center mb-12">
            <div>
              <p className={`text-xs font-bold uppercase tracking-[0.3em] mb-2 ${isDark ? "text-teal-400" : "text-teal-600"}`}>
                My Account
              </p>
              <h1 className={`text-5xl font-black tracking-tighter uppercase ${isDark ? "text-white" : "text-neutral-900"}`}>
                Profile<span className="text-neutral-300">.</span>
              </h1>
            </div>
          </header>

          {/* Tab Switcher */}
          <div className={`flex flex-wrap gap-2 mb-12 p-1.5 rounded-3xl w-fit ${isDark ? "bg-neutral-900" : "bg-neutral-100"}`}>
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={`relative px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeTab === key
                    ? isDark
                      ? "bg-white text-black shadow-xl"
                      : "bg-neutral-900 text-white shadow-xl shadow-neutral-200"
                    : isDark
                      ? "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800"
                      : "text-neutral-400 hover:text-neutral-700 hover:bg-white"
                }`}
              >
                <Icon className="text-lg" />
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "account" ? (
              <motion.div
                key="account"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`relative overflow-hidden rounded-[40px] border transition-colors shadow-2xl ${isDark ? "bg-neutral-900 border-neutral-800 shadow-black/50" : "bg-white border-neutral-100 shadow-neutral-200/50"}`}>
                  
                  {/* Decorative Banner Background */}
                  <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-r from-teal-500/20 via-blue-500/20 to-purple-500/20 blur-2xl"></div>
                  <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-br ${isDark ? "from-neutral-800" : "from-neutral-100"} to-transparent opacity-50`}></div>

                  <div className="relative z-10 p-10 lg:p-12">
                    {/* Avatar Row */}
                    <div className="flex flex-col sm:flex-row items-center gap-8 mb-12">
                      <div
                        className="relative group cursor-pointer flex-shrink-0"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="absolute inset-0 bg-teal-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                        <div className={`relative w-40 h-40 rounded-[2rem] overflow-hidden border-8 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 ${isDark ? "bg-neutral-800 border-neutral-900" : "bg-neutral-50 border-white"}`}>
                          {profileImage || getImageUrl(user?.image) ? (
                            <img
                              src={profileImage || getImageUrl(user?.image)!}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className={`w-full h-full flex items-center justify-center ${isDark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                              <FiUser className={`text-6xl ${isDark ? "text-neutral-700" : "text-neutral-300"}`} />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                            <FiCamera className="text-white text-4xl transform scale-50 group-hover:scale-100 transition-transform duration-300" />
                          </div>
                        </div>
                        <div className={`absolute -bottom-3 -right-3 w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110 ${isDark ? "bg-white text-black" : "bg-neutral-900 text-white"}`}>
                          <FiCamera className="text-xl" />
                        </div>
                      </div>

                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />

                      <div className="text-center sm:text-left mt-4 sm:mt-0">
                        <h2 className={`text-4xl font-black tracking-tight mb-2 ${isDark ? "text-white" : "text-neutral-900"}`}>
                          {user?.name || "Your Name"}
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
                          <p className={`text-lg font-medium flex items-center gap-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                            <FiMail className="text-teal-500" />
                            {user?.email || "your@email.com"}
                          </p>
                          <span className="hidden sm:block text-neutral-300 dark:text-neutral-700">•</span>
                          <span className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-sm ${
                            user?.role === "admin"
                              ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                              : user?.role === "seller"
                                ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20"
                                : isDark ? "bg-neutral-800 text-neutral-300 border-neutral-700" : "bg-white text-neutral-600 border-neutral-200"
                          }`}>
                            <div className={`w-2 h-2 rounded-full animate-pulse ${
                              user?.role === "admin" ? "bg-purple-500" : user?.role === "seller" ? "bg-teal-500" : "bg-neutral-400"
                            }`}></div>
                            {user?.role || "user"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-px mb-10 bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent"></div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="group">
                        <label className={`block text-[10px] font-black uppercase tracking-widest mb-3 transition-colors ${isDark ? "text-neutral-500 group-focus-within:text-teal-400" : "text-neutral-400 group-focus-within:text-teal-600"}`}>
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-0 bg-teal-500/5 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                          <FiUser className={`absolute left-5 top-1/2 -translate-y-1/2 text-xl transition-colors z-10 ${isDark ? "text-neutral-500 group-focus-within:text-teal-400" : "text-neutral-400 group-focus-within:text-teal-600"}`} />
                          <input
                            type="text"
                            ref={nameRef}
                            defaultValue={user?.name || ""}
                            placeholder="Enter your name"
                            className={`relative z-10 w-full border-2 border-transparent rounded-2xl py-5 pl-14 pr-5 outline-none transition-all focus:border-teal-400/50 font-bold ${
                              isDark ? "bg-neutral-900/80 text-white placeholder-neutral-600 focus:bg-neutral-800" : "bg-neutral-50 text-neutral-900 placeholder-neutral-400 focus:bg-white"
                            }`}
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className={`block text-[10px] font-black uppercase tracking-widest mb-3 ${isDark ? "text-neutral-600" : "text-neutral-400"}`}>
                          Email Address
                        </label>
                        <div className="relative opacity-60">
                          <FiMail className={`absolute left-5 top-1/2 -translate-y-1/2 text-xl ${isDark ? "text-neutral-600" : "text-neutral-400"}`} />
                          <input
                            type="email"
                            defaultValue={user?.email || ""}
                            disabled
                            className={`w-full border-2 border-transparent rounded-2xl py-5 pl-14 pr-5 outline-none font-bold cursor-not-allowed ${
                              isDark ? "bg-neutral-900/30 text-neutral-500" : "bg-neutral-50/50 text-neutral-500"
                            }`}
                          />
                          <div className="absolute right-5 top-1/2 -translate-y-1/2">
                            <FiShield className={`text-lg ${isDark ? "text-neutral-600" : "text-neutral-300"}`} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Save */}
                    <div className="mt-12 flex justify-end">
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`group relative overflow-hidden flex items-center gap-3 px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${
                          isDark
                            ? "bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                            : "bg-neutral-900 text-white shadow-[0_0_40px_rgba(0,0,0,0.15)] hover:shadow-[0_0_40px_rgba(0,0,0,0.25)]"
                        }`}
                      >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        {isSaving ? (
                          <>
                            <span className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin relative z-10 ${isDark ? "border-black" : "border-white"}`} />
                            <span className="relative z-10">Saving...</span>
                          </>
                        ) : (
                          <>
                            <span className="relative z-10">Save Changes</span>
                            <FiArrowRight className="text-xl relative z-10 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === "orders" ? (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <OrdersTab isDark={isDark} />
              </motion.div>
            ) : (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <ChangePasswordForm isDark={isDark} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
