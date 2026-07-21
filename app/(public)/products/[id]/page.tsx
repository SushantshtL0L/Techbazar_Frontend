"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaShieldAlt, FaMapMarkerAlt, FaClock, FaTruck, FaUndo } from "react-icons/fa";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import Header from "../../_components/Header";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "react-toastify";
import { getProductById } from "@/lib/api/product";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data.product || data);
      } catch (err) {
        console.error("Failed to load product:", err);
        toast.error("Product not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-32">
        <div className="fixed top-0 w-full z-50"><Header /></div>
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 pt-32">
        <div className="fixed top-0 w-full z-50"><Header /></div>
        <p className="text-2xl font-bold text-gray-900">Product not found.</p>
        <Link href="/" className="text-blue-600 hover:underline text-sm font-semibold">← Back to Home</Link>
      </div>
    );
  }

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `http://localhost:5050${product.image}`;

  const wishlisted = isInWishlist(product._id || product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product._id || product.id,
      name: product.name,
      price: Number(product.price || 0),
      image: imageUrl,
      brand: product.brand || "Gadget",
      quantity: 1,
      size: product.size || "N/A",
      color: product.color || "",
      description: product.description || "",
      condition: product.condition || "new",
    });
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/dashboard/checkout");
  };

  const handleWishlistToggle = () => {
    const pid = product._id || product.id;
    if (wishlisted) {
      removeFromWishlist(pid);
      toast.info("Removed from wishlist");
    } else {
      addToWishlist({
        id: pid,
        name: product.name,
        price: Number(product.price || 0),
        image: imageUrl,
        brand: product.brand || "Gadget",
        condition: product.condition,
        description: product.description || "",
        size: product.size,
      });
      toast.success("Added to wishlist!");
    }
  };

  const conditionColor =
    product.condition === "new" ? "bg-emerald-500" :
    product.condition === "like-new" ? "bg-blue-500" :
    product.condition === "good" ? "bg-gray-500" : "bg-orange-500";

  const sellerInitials = product.seller?.name
    ? product.seller.name.substring(0, 2).toUpperCase()
    : "GP";

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pt-32">
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* BREADCRUMBS */}
        <div className="text-xs font-medium text-gray-400 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>›</span>
          {product.category && (
            <>
              <Link href={`/?category=${product.category}`} className="hover:text-gray-600 capitalize">{product.category}</Link>
              <span>›</span>
            </>
          )}
          <span className="text-gray-800 line-clamp-1">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* LEFT: IMAGE */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="bg-gray-100/50 rounded-[2rem] p-12 h-[450px] w-full relative mb-6 flex items-center justify-center">
              {/* Condition badge */}
              <div className={`absolute top-6 left-6 ${conditionColor} text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm`}>
                <FaShieldAlt size={10} /> {product.condition || "Pre-owned"}
              </div>
              {/* Wishlist button */}
              <button
                onClick={handleWishlistToggle}
                className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center shadow transition-all z-10 ${
                  wishlisted ? "bg-red-500 text-white" : "bg-white/80 text-gray-400 hover:text-red-500"
                }`}
                title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <FiHeart className={`text-lg ${wishlisted ? "fill-white" : ""}`} />
              </button>
              <img
                src={imageUrl}
                alt={product.name}
                className="max-h-full max-w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="w-full lg:w-1/2">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black text-blue-600 tracking-wider uppercase">
                  {product.brand || "Gadget"}
                </span>
                <FaShieldAlt className="text-blue-400 text-[10px]" />
              </div>
              <h1 className="text-3xl md:text-[2.5rem] font-black text-[#0A2540] mb-3 tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <p className="text-2xl font-black text-[#0A2540]">
                  Rs. {Number(product.price || 0).toLocaleString()}
                </p>
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-md border border-gray-200 capitalize">
                  {product.condition || "Pre-owned"}
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-lg">
                  {product.description}
                </p>
              )}

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {product.size && (
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-gray-600">💾</div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Storage / Size</p>
                      <p className="font-bold text-gray-900">{product.size}</p>
                    </div>
                  </div>
                )}
                {product.color && (
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-gray-600">🎨</div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Color</p>
                      <p className="font-bold text-gray-900">{product.color}</p>
                    </div>
                  </div>
                )}
                {product.category && (
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">📦</div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Category</p>
                      <p className="font-bold text-gray-900 capitalize">{product.category}</p>
                    </div>
                  </div>
                )}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600">
                    <FaShieldAlt size={14} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Verified</p>
                    <p className="font-bold text-gray-900">TechBazar</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mb-8">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#0A2540] text-white font-bold text-lg py-4 rounded-xl hover:bg-[#164070] transition-colors shadow-lg"
                >
                  ⚡ Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-white border-2 border-[#0A2540] text-[#0A2540] font-bold text-lg py-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <FiShoppingBag /> Add to Cart
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`w-full border-2 font-bold text-base py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                    wishlisted
                      ? "bg-red-50 border-red-300 text-red-500 hover:bg-red-100"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <FiHeart className={wishlisted ? "fill-red-500" : ""} />
                  {wishlisted ? "Saved to Wishlist" : "Save to Wishlist"}
                </button>
              </div>

              {/* SELLER INFO */}
              {product.seller && (
                <div className="border border-gray-100 rounded-2xl p-5 mb-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A2540] to-[#164070] flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                        {sellerInitials}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm flex items-center gap-1">
                          {product.seller?.name || "TechBazar Seller"} <FaShieldAlt className="text-blue-500 text-xs" />
                        </p>
                        <p className="text-xs text-gray-500">Verified Seller</p>
                      </div>
                    </div>
                  </div>
                  {product.seller?.location && (
                    <div className="flex items-center gap-6 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><FaMapMarkerAlt /> {product.seller.location}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Delivery & Returns */}
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <FaTruck className="text-gray-400 text-lg flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900 mb-0.5">Available for Delivery</p>
                    <p className="text-gray-500 text-xs leading-relaxed">Inside Ring Road (Kathmandu): 24 hours. Outside: 2–3 days via courier.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaUndo className="text-gray-400 text-lg flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900 mb-0.5">7-Day Return Policy</p>
                    <p className="text-gray-500 text-xs leading-relaxed">Certified verification by Gadget Pasale. Refund guaranteed if product mismatch.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0A2540] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 border-t border-white/10 text-center text-xs text-slate-400">
          <p>© 2024 Gadget Pasale Nepal. Authenticity Guaranteed.</p>
        </div>
      </footer>
    </div>
  );
}
