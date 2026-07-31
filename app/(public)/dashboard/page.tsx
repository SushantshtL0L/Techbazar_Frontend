"use client";

import React, { useEffect, useState, Suspense } from "react";
import Sidebar from "../_components/Sidebar";
import ProductCard from "../_components/ProductCard";
import Pagination from "../_components/Pagination";
import SupportSection from "../_components/SupportSection";
import FeaturedOffers from "../_components/FeaturedOffers";
import SellerDashboard from "../_components/SellerDashboard";
import SettingsDropdown from "../_components/SettingsDropdown";
import NotificationPanel from "../_components/NotificationPanel";
import { handleGetAllProducts } from "@/lib/actions/product.actions";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { FiFilter, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardPageContent />
    </Suspense>
  );
}

function DashboardLoading() {
  const { theme } = useTheme();

  return (
    <div className={`flex min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-[#f8f9fa] text-neutral-900'}`}>
            <Sidebar activePage="shoes" />
      <main className={`flex-1 p-10 lg:p-16 overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className={`w-12 h-12 border-4 rounded-full ${theme === 'dark' ? 'border-neutral-800 border-t-white' : 'border-neutral-100 border-t-neutral-900'}`}
          />
          <p className="text-neutral-400 font-bold uppercase tracking-widest text-xs">Loading dashboard...</p>
        </div>
      </main>
    </div>
  );
}

function DashboardPageContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const { theme } = useTheme();

  const [liveProducts, setLiveProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortBy, setSortBy] = useState("newest");
  const [filterCondition, setFilterCondition] = useState("");
  const limit = 6;

  const { user } = useAuth();
  const userRole = user?.role?.toLowerCase() || "";


  const getRawId = (u: any): string | undefined => {
    if (!u) return undefined;
    const raw = u.id || u._id;
    if (!raw) return undefined;
    if (typeof raw === 'string') return raw;
    if (raw.$oid) return raw.$oid;
    return raw.toString();
  };
  const currentUserId = getRawId(user);

  const fetchProducts = async () => {
    if (!user) return;
    setLoading(true);
    const sellerFilter = userRole === "seller" ? currentUserId : undefined;
    const result = await handleGetAllProducts(page, limit, search, sellerFilter, sortBy, filterCondition);
    if (result.success) {
      if (result.data.products) {
        setLiveProducts(result.data.products);
        setTotalPages(result.data.totalPages);
        setTotalProducts(result.data.total);
      } else {
        setLiveProducts(result.data);
        setTotalPages(1);
        setTotalProducts(result.data.length);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, search, user, sortBy, filterCondition]);

  const handleProductDeleted = (id: string) => {
    fetchProducts();
  };

  return (
    <div className={`flex min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-[#f8f9fa] text-neutral-900'}`}>
            <Sidebar activePage="shoes" />
      {/* Main Content */}
      <main className={`flex-1 p-10 lg:p-16 overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 px-4 gap-6">
          <div className="flex flex-col gap-2">
            <h2 className={`text-4xl font-black tracking-tighter uppercase transition-colors ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              {userRole === 'seller' ? 'Inventory' : userRole === 'admin' ? 'All Products' : 'New Drops'}<span className="text-neutral-300">.</span>
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                Showing {liveProducts.length} of {totalProducts} items
              </span>
              <div className="h-1 w-1 rounded-full bg-neutral-300"></div>
              {userRole === 'buyer' && (
                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full transition-colors ${theme === 'dark' ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-900'}`}>
                  Spring '24 Collection
                </span>
              )}
              {userRole === 'admin' && (
                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full transition-colors bg-purple-100 text-purple-700`}>
                  Admin View
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {userRole !== 'seller' && (
              <>
                <div className="relative group">
                  <select
                    value={filterCondition}
                    onChange={(e) => setFilterCondition(e.target.value)}
                    className={`appearance-none flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all outline-none cursor-pointer ${theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800' : 'bg-neutral-50 border-neutral-100 text-neutral-600 hover:bg-neutral-100'}`}
                  >
                    <option value="">All Conditions</option>
                    <option value="new">Brand New</option>
                    <option value="used">Used / Thrift</option>
                  </select>
                  <FiFilter className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                </div>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`appearance-none flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl outline-none cursor-pointer ${theme === 'dark' ? 'bg-white text-black hover:bg-neutral-200' : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-neutral-200'}`}
                  >
                    <option value="newest">Newest First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="name_asc">A - Z</option>
                  </select>
                  <FiChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${theme === 'dark' ? 'text-black' : 'text-white'}`} />
                </div>
              </>
            )}
            <NotificationPanel />
            <SettingsDropdown />
          </div>
        </header>

        {/* Featured Section - Only for Buyers */}
        {userRole === 'buyer' && <FeaturedOffers />}

        <div className="px-4">
          {(userRole === "seller" || userRole === "admin") && <SellerDashboard />}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className={`w-12 h-12 border-4 rounded-full ${theme === 'dark' ? 'border-neutral-800 border-t-white' : 'border-neutral-100 border-t-neutral-900'}`}
            />
            <p className="text-neutral-400 font-bold uppercase tracking-widest text-xs">Summoning Kicks...</p>
          </div>
        ) : (
          <div className="px-4">
            <div className="flex items-center justify-between mb-10">
              <h3 className={`text-xl font-bold tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                {userRole === 'seller' ? 'My Products' : userRole === 'admin' ? 'All Products' : 'Marketplace'}
              </h3>
              {userRole === 'buyer' && (
                <button className="text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                  View Trends
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {liveProducts.map((product, index) => (
                <ProductCard
                  key={product._id || product.id || index}
                  product={product}
                  currentUserId={currentUserId}
                  onDeleted={handleProductDeleted}
                />
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p: any) => setPage(p)}
            />

            {userRole === 'buyer' && (
              <div className={`mt-20 border-t pt-20 transition-colors ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-50'}`}>
                <SupportSection />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

