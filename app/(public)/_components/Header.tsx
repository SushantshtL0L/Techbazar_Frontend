"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FaSearch, FaBell, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import SettingsDropdown from "@/app/dashboard/_components/SettingsDropdown";

const categories = [
  { name: "Home", href: "/" },
  { name: "New PCs", href: "/products?category=new-pc" },
  { name: "Used Laptops", href: "/used-phones" },
  { name: "Used PCs", href: "/products?category=used-pc" },
  { name: "Gaming", href: "/products?category=gaming" },
  { name: "Accessories", href: "/accessories" },
  { name: "Dell", href: "/redmi" },
  { name: "HP", href: "/samsung" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSignIn = () => {
    const redirectTo = pathname && pathname !== "/login" ? pathname : "/";
    router.push(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  };

  return (
    <>
      {/* ── NAV / SEARCH BAR ── */}
      <div className="bg-[#0A2540] text-white shadow-md relative z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="font-black text-lg tracking-tight shrink-0 hidden md:block">
            TechBazar
          </Link>

          {/* Search */}
          <div className="relative flex-1 max-w-2xl">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search for laptops, PCs, gaming rigs..."
              className="w-full bg-white text-gray-900 rounded-full py-2.5 pl-10 pr-28 outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0A2540] text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#164070] transition-colors"
            >
              Search
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5 shrink-0">
            <button
              onClick={() => router.push("/notifications")}
              className="text-gray-300 hover:text-white cursor-pointer text-lg transition-colors"
              aria-label="Notifications"
            >
              <FaBell />
            </button>
            <button
              onClick={() => router.push("/dashboard/cart")}
              className="relative text-gray-300 hover:text-white cursor-pointer text-lg transition-colors"
              aria-label="Cart"
            >
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
            {/* Profile / Auth */}
            <div className="relative">
              {!isAuthenticated ? (
                <button
                  onClick={handleSignIn}
                  className="text-gray-300 hover:text-white cursor-pointer text-xl transition-colors flex items-center gap-2"
                  aria-label="Sign In"
                >
                  <FaUserCircle />
                </button>
              ) : (
                <SettingsDropdown
                  customTrigger={
                    <button
                      className="text-gray-300 hover:text-white cursor-pointer text-xl transition-colors flex items-center gap-2"
                      aria-label="Account Menu"
                    >
                      <FaUserCircle />
                      {user?.name && (
                        <span className="text-sm hidden sm:block font-medium truncate max-w-[100px]">{user.name.split(' ')[0]}</span>
                      )}
                    </button>
                  }
                />
              )}
            </div>
          </div>
        </div>

        {/* Category Pill Strip */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="whitespace-nowrap text-xs font-semibold text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full transition-all shrink-0"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
