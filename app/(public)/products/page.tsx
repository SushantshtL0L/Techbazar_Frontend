"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../_components/Header";
import { handleGetAllProducts } from "@/lib/actions/product.actions";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import { FaShoppingCart, FaFilter, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

const CONDITIONS = ["All", "New", "Like New", "Excellent", "Good", "Fair"];
const BRANDS = ["All", "Apple", "Samsung", "Google", "Xiaomi", "Other"];
const STORAGES = ["All", "64GB", "128GB", "256GB", "512GB", "1TB"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedStorage, setSelectedStorage] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("newest");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { addToCart } = useCart();
  const limit = 12;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const condition = selectedCondition === "All" ? "" : selectedCondition;
      const result = await handleGetAllProducts(page, limit, search, undefined, sortBy, condition);
      if (result.success) {
        const data = result.data;
        const items = data.products || data;
        setProducts(Array.isArray(items) ? items : []);
        setTotalPages(data.totalPages || 1);
        setTotalProducts(data.total || (Array.isArray(items) ? items.length : 0));
      } else {
        setProducts([]);
      }
    } catch {
      setProducts([]);
    }
    setLoading(false);
  }, [page, search, selectedCondition, sortBy]);

  useEffect(() => {
    setPage(1);
  }, [search, selectedCondition, sortBy, selectedBrand, selectedStorage, priceRange]);

  useEffect(() => {
    fetchProducts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [fetchProducts]);

  const handleAddToCart = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    const price = typeof item.price === "number" ? item.price : parseInt(String(item.price).replace(/,/g, "")) || 0;
    addToCart({
      id: item._id || item.id,
      name: item.name,
      price,
      image: item.images?.[0] || item.image || "",
      brand: item.brand || "",
      quantity: 1,
      size: item.storage || "N/A",
      color: item.color || "N/A",
      description: `Condition: ${item.condition || "N/A"}`,
      condition: item.condition,
    });
    toast.success("Added to cart!");
  };

  const handleMakeOffer = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    toast.info(`Offer system opening for ${item.name}...`);
  };

  const conditionColor = (condition: string) => {
    if (!condition) return "bg-gray-100 text-gray-600";
    if (condition.toLowerCase() === "new") return "bg-emerald-100 text-emerald-700";
    if (condition.toLowerCase() === "like new") return "bg-blue-100 text-blue-700";
    if (condition.toLowerCase() === "excellent") return "bg-indigo-100 text-indigo-700";
    if (condition.toLowerCase() === "good") return "bg-amber-100 text-amber-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pt-32">
      <div className="fixed top-0 w-full z-50">
        <div className="fixed top-0 w-full z-50"><Header /></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#0A2540]">
              {search ? `Results for "${search}"` : category ? `${category.replace(/-/g, " ")}` : "Browse Marketplace"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {loading ? "Loading..." : `${totalProducts} product${totalProducts !== 1 ? "s" : ""} found`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden flex items-center gap-2 bg-[#0A2540] text-white px-4 py-2 rounded-full text-sm font-bold"
            >
              <FaFilter /> Filters
            </button>
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`w-64 flex-shrink-0 ${sidebarOpen ? "block" : "hidden"} md:block`}>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-36">
              <h3 className="font-bold text-lg mb-5 text-[#0A2540]">Filters</h3>

              <div className="mb-6">
                <h4 className="font-semibold text-xs text-gray-500 mb-3 uppercase tracking-wider">Condition</h4>
                <div className="space-y-2">
                  {CONDITIONS.map((cond) => (
                    <label key={cond} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="condition"
                        className="accent-[#0A2540] w-4 h-4"
                        checked={selectedCondition === cond}
                        onChange={() => setSelectedCondition(cond)}
                      />
                      <span className={`text-sm transition-colors ${selectedCondition === cond ? "text-[#0A2540] font-bold" : "text-gray-600 group-hover:text-gray-900"}`}>
                        {cond}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-xs text-gray-500 mb-3 uppercase tracking-wider">Brand</h4>
                <div className="space-y-2">
                  {BRANDS.map((brand) => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="brand"
                        className="accent-[#0A2540] w-4 h-4"
                        checked={selectedBrand === brand}
                        onChange={() => setSelectedBrand(brand)}
                      />
                      <span className={`text-sm transition-colors ${selectedBrand === brand ? "text-[#0A2540] font-bold" : "text-gray-600 group-hover:text-gray-900"}`}>
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-xs text-gray-500 mb-3 uppercase tracking-wider">Storage</h4>
                <div className="space-y-2">
                  {STORAGES.map((storage) => (
                    <label key={storage} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="storage"
                        className="accent-[#0A2540] w-4 h-4"
                        checked={selectedStorage === storage}
                        onChange={() => setSelectedStorage(storage)}
                      />
                      <span className={`text-sm transition-colors ${selectedStorage === storage ? "text-[#0A2540] font-bold" : "text-gray-600 group-hover:text-gray-900"}`}>
                        {storage}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-xs text-gray-500 mb-3 uppercase tracking-wider">Price Range (Rs.)</h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0A2540]"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0A2540]"
                  />
                </div>
              </div>

              <button
                onClick={() => { setSelectedCondition("All"); setSelectedBrand("All"); setSelectedStorage("All"); setPriceRange({ min: "", max: "" }); setSortBy("newest"); }}
                className="w-full text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors text-left"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-xl mb-4" />
                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
                    <div className="h-4 bg-gray-200 rounded mb-4 w-1/2" />
                    <div className="h-10 bg-gray-200 rounded-xl" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-6xl mb-4">ðŸ”</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">
                  {search ? `No results for "${search}". Try a different search.` : "No products match your filters."}
                </p>
                <button
                  onClick={() => { setSelectedCondition("All"); setSelectedBrand("All"); setSelectedStorage("All"); router.push("/products"); }}
                  className="bg-[#0A2540] text-white px-6 py-3 rounded-full font-bold hover:bg-[#164070] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((item) => (
                    <Link
                      href={`/products/${item._id || item.id}`}
                      key={item._id || item.id}
                      className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
                    >
                      <div className="relative h-52 bg-gray-50 overflow-hidden">
                        {(item.images?.[0] || item.image) ? (
                          <Image
                            src={item.images?.[0] || item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl">ðŸ“±</div>
                        )}
                        {item.condition && (
                          <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${conditionColor(item.condition)}`}>
                            {item.condition}
                          </span>
                        )}
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        {item.brand && (
                          <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider mb-1">{item.brand}</span>
                        )}
                        <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2 leading-snug">{item.name}</h4>
                        {item.storage && (
                          <p className="text-xs text-gray-400 mb-2">{item.storage}</p>
                        )}
                        <p className="text-[#0A2540] font-black text-lg mb-4 mt-auto">
                          Rs. {typeof item.price === "number" ? item.price.toLocaleString() : item.price}
                        </p>
                        <div className="flex gap-2 w-full mt-auto">
                          <button
                            onClick={(e) => handleAddToCart(e, item)}
                            className="flex-1 bg-[#0A2540] text-white font-bold py-2.5 rounded-xl hover:bg-[#164070] transition-colors flex items-center justify-center gap-2 text-sm"
                          >
                            <FaShoppingCart /> Add to Cart
                          </button>
                          {(item.condition && item.condition.toLowerCase() !== "new" && item.condition.toLowerCase() !== "brand new") && (
                            <button
                              onClick={(e) => handleMakeOffer(e, item)}
                              className="flex-1 bg-white border border-[#0A2540] text-[#0A2540] font-bold py-2.5 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center text-sm"
                            >
                              Make Offer
                            </button>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-12">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0A2540] hover:text-white hover:border-[#0A2540] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <FaChevronLeft size={12} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-full text-sm font-bold transition-colors ${
                          page === p
                            ? "bg-[#0A2540] text-white"
                            : "border border-gray-200 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0A2540] hover:text-white hover:border-[#0A2540] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <FaChevronRight size={12} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-[#0A2540] text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-sm text-slate-400">
          <p>Â© 2026 TechBazar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#0A2540] border-t-transparent rounded-full animate-spin" /></div>}>
      <ProductsPageContent />
    </Suspense>
  );
}

