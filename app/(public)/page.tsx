"use client";

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/api/product";
import {
  FaCheckCircle,
  FaHandshake,
  FaCreditCard,
  FaHeadset,
  FaShieldAlt,
  FaTag,
  FaChevronRight,
  FaStar,
  FaDesktop,
  FaLaptop,
} from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import Link from "next/link";
import Header from "./_components/Header";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "react-toastify";

const categories = [
  { name: "New PCs", href: "/products?category=new-pc" },
  { name: "Used Laptops", href: "/used-phones" },
  { name: "Used PCs", href: "/products?category=used-pc" },
  { name: "Gaming", href: "/products?category=gaming" },
  { name: "Workstations", href: "/products?category=workstation" },
  { name: "Accessories", href: "/accessories" },
  { name: "Monitors", href: "/products?category=monitors" },
  { name: "Components", href: "/products?category=components" },
];

const catCards = [
  {
    name: "New PCs",
    sub: "Desktops & Towers",
    href: "/products?category=new-pc",
    img: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Used Laptops",
    sub: "Certified Pre-Owned",
    href: "/used-phones",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Gaming Rigs",
    sub: "High-Performance",
    href: "/products?category=gaming",
    img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Workstations",
    sub: "Professional Grade",
    href: "/products?category=workstation",
    img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=400&auto=format&fit=crop",
  },
];

const sellCategories = [
  { name: "Laptops", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=200&auto=format&fit=crop" },
  { name: "Desktops", img: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=200&auto=format&fit=crop" },
  { name: "Gaming PCs", img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=200&auto=format&fit=crop" },
  { name: "Components", img: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?q=80&w=200&auto=format&fit=crop" },
];

const whyUs = [
  { icon: <FaCheckCircle size={28} />, name: "checklist", title: "Verified Listings", desc: "Every PC and laptop is tested and verified before listing on our platform." },
  { icon: <FaHandshake size={28} />, name: "handshake", title: "Trusted Sellers", desc: "Verified buyers and sellers with ratings, reviews, and transaction history." },
  { icon: <FaCreditCard size={28} />, name: "payments", title: "Secure Payments", desc: "eSewa, Khalti & Cash on Delivery with full buyer protection guaranteed." },
  { icon: <FaTag size={28} />, name: "percent", title: "Best Prices", desc: "Market-competitive prices on all new PCs, used laptops, and accessories." },
  { icon: <FaShieldAlt size={28} />, name: "shield", title: "Warranty Support", desc: "Original warranty documentation verified on all new PC listings." },
  { icon: <FaHeadset size={28} />, name: "support", title: "Expert Support", desc: "Our tech team is available 24/7 to help you find the right machine." },
];

const HeroBannerContent = () => (
  <div className="w-1/2 p-8 md:p-14 flex flex-col md:flex-row items-center justify-between relative shrink-0">
    {/* Left content */}
    <div className="md:w-1/2 z-10 text-white">
      <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest mb-3">Nepal's #1 PC & Laptop Store</p>
      <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black mb-4 leading-[1.1]">
        Power. Performance.<br />Best Price.
      </h1>
      <p className="text-blue-200 text-lg mb-2 font-semibold">New PCs & Certified Used Laptops</p>
      <p className="text-slate-400 text-sm mb-8 max-w-xs">
        Browse hundreds of desktops, gaming rigs, and pre-owned laptops — all verified and ready to ship across Nepal.
      </p>
      <div className="flex gap-3 flex-wrap">
        <Link
          href="/products?category=new-pc"
          className="inline-block bg-white text-[#0A2540] font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg text-sm"
        >
          Shop New PCs
        </Link>
        <Link
          href="/used-phones"
          className="inline-block border border-white/40 text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-colors text-sm"
        >
          View Used
        </Link>
      </div>
    </div>

    {/* Right: laptop/PC images */}
    <div className="md:w-1/2 mt-10 md:mt-0 relative h-[280px] md:h-[360px] w-full z-10 flex items-center justify-center">
      {/* Back PC */}
      <div className="absolute right-16 top-8 w-[150px] h-[220px] md:w-[180px] md:h-[280px] rotate-6 opacity-80">
        <Image
          src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=400&auto=format&fit=crop"
          alt="Desktop PC"
          fill
          className="object-contain drop-shadow-2xl"
        />
      </div>
      {/* Middle laptop */}
      <div className="absolute right-8 top-4 w-[160px] h-[240px] md:w-[200px] md:h-[320px] rotate-2">
        <Image
          src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400&auto=format&fit=crop"
          alt="Laptop"
          fill
          className="object-contain drop-shadow-2xl"
        />
      </div>
      {/* Front gaming PC */}
      <div className="absolute left-4 md:left-16 top-6 w-[140px] h-[220px] md:w-[170px] md:h-[280px] -rotate-6 opacity-70">
        <Image
          src="https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=400&auto=format&fit=crop"
          alt="Gaming PC"
          fill
          className="object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  </div>
);

export default function HomePage() {
  const { loading } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [liveProducts, setLiveProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts(1, 8);
        setLiveProducts(data.products || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleWishlistToggle = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    const id = product._id || product.id;
    if (isInWishlist(id)) {
      removeFromWishlist(id);
      toast.info("Removed from wishlist");
    } else {
      const imageUrl = product.image?.startsWith("http")
        ? product.image
        : `http://localhost:5050${product.image}`;
      addToWishlist({
        id,
        name: product.name,
        price: Number(product.price || product.Value || 0),
        image: imageUrl,
        brand: product.brand || "TechBazar",
        condition: product.condition,
        description: product.description || "",
        size: product.size,
      });
      toast.success("Added to wishlist!");
    }
  };

  if (loading) return null;

  return (
    <>
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden pt-32">
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

        {/* ── HERO BANNER ── */}
        <section className="bg-[#0A2540] rounded-[2rem] shadow-2xl relative overflow-hidden mb-12">
          {/* Decorative blur */}
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />

          {/* Scrolling Marquee Container */}
          <div className="flex w-[200%] animate-hero-marquee hover:[animation-play-state:paused]">
            <HeroBannerContent />
            <HeroBannerContent />
          </div>
        </section>

        {/* ── SHOP BY CATEGORY ── */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Shop by Category</h2>
            <p className="text-gray-500 mt-2 text-sm">New PCs, used laptops, gaming rigs and more</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {catCards.map((cat) => (
              <Link
                href={cat.href}
                key={cat.name}
                className="group relative bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-black text-white text-base leading-tight">{cat.name}</p>
                  <p className="text-blue-200 text-xs">{cat.sub}</p>
                </div>
                <div className="absolute top-3 right-3 w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <FaChevronRight className="text-white text-xs" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── SELL YOUR OLD PC / LAPTOP ── */}
        <section className="mb-16 bg-[#f8fafc] rounded-3xl border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-1">Sell your old PC or laptop fast</h3>
              <p className="text-gray-500 text-sm max-w-sm">Get instant cash for your used laptops and desktops. Free pickup across Kathmandu Valley.</p>
            </div>
            <Link
              href="/register"
              className="shrink-0 bg-[#0A2540] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#164070] transition-colors shadow-lg text-sm whitespace-nowrap"
            >
              Sell on TechBazar – Join Now
            </Link>
          </div>

          {/* Device category row */}
          <div className="border-t border-gray-200 px-8 py-5 flex gap-8 overflow-x-auto no-scrollbar">
            {sellCategories.map((sc) => (
              <div key={sc.name} className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer">
                <div className="w-14 h-14 bg-white rounded-xl border border-gray-200 relative overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                  <Image src={sc.img} alt={sc.name} fill className="object-cover" />
                </div>
                <span className="text-xs font-semibold text-gray-600">{sc.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURED LISTINGS ── */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">Featured Listings</h2>
              <p className="text-gray-500 text-sm mt-1">Top picks this week</p>
            </div>
            <Link href="/dashboard" className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline">
              View All <FaChevronRight size={10} />
            </Link>
          </div>

          {productsLoading ? (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : liveProducts.length === 0 ? (
            <p className="text-center text-gray-400 py-16">No products listed yet.</p>
          ) : (
            <div className="flex gap-5 overflow-x-auto no-scrollbar pb-2">
              {liveProducts.map((item) => {
                const id = item._id || item.id;
                const imageUrl = item.image?.startsWith("http")
                  ? item.image
                  : `http://localhost:5050${item.image}`;
                const wishlisted = isInWishlist(id);
                const conditionColor =
                  item.condition === "new" ? "bg-emerald-500" :
                  item.condition === "refurbished" ? "bg-blue-500" :
                  item.condition === "used" ? "bg-orange-500" : "bg-gray-500";

                return (
                  <div key={id} className="group relative shrink-0 w-[220px]">
                    <Link
                      href={`/product/${id}`}
                      className="block bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Image */}
                      <div className="relative h-48 bg-gray-50 flex items-center justify-center">
                        <div className={`absolute top-3 left-3 ${conditionColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10`}>
                          {item.condition || "Pre-owned"}
                        </div>
                        {/* Wishlist button */}
                        <button
                          onClick={(e) => handleWishlistToggle(e, item)}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center z-10 shadow transition-all ${
                            wishlisted
                              ? "bg-red-500 text-white"
                              : "bg-white/80 text-gray-400 hover:text-red-500"
                          }`}
                          title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          <FiHeart className={`text-sm ${wishlisted ? "fill-white" : ""}`} />
                        </button>
                        <img
                          src={imageUrl}
                          alt={item.name}
                          className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-[10px] font-black text-blue-600 tracking-wider">{item.brand || "TechBazar"}</span>
                          <FaShieldAlt className="text-blue-400 text-[9px]" />
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1 line-clamp-1">{item.name}</h4>
                        {item.description && (
                          <p className="text-xs text-gray-400 mb-3 line-clamp-1">{item.description}</p>
                        )}
                        <div className="flex items-center justify-between">
                          <p className="text-[#0A2540] font-black text-base">
                            Rs. {Number(item.price || item.Value || 0).toLocaleString()}
                          </p>
                          {item.rating && (
                            <div className="flex items-center gap-0.5 text-yellow-400 text-xs">
                              <FaStar /><span className="text-gray-500 font-medium ml-1">{item.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── WHY TECHBAZAR ── */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Why TechBazar?</h2>
            <p className="text-gray-500 mt-2 text-sm">Trusted by thousands of buyers and sellers across Nepal</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {whyUs.map((item) => (
              <div key={item.name} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-[#0A2540] group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.name}</p>
                <h4 className="font-black text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0A2540] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="font-black text-sm text-[#0A2540]">TB</span>
              </div>
              <span className="text-lg font-bold">TechBazar</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-[200px]">
              Nepal's most trusted marketplace for new PCs, used laptops, and refurbished computers.
            </p>
            <div className="flex gap-2 mt-6">
              <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer flex items-center justify-center transition-colors">
                <span className="text-xs font-bold">f</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer flex items-center justify-center transition-colors">
                <span className="text-xs font-bold">in</span>
              </div>
            </div>
          </div>

          {/* Columns */}
          {[
            { heading: "Categories", links: [{ label: "New PCs", href: "/products?category=new-pc" }, { label: "Used Laptops", href: "/used-phones" }, { label: "Used PCs", href: "/products?category=used-pc" }, { label: "Gaming Rigs", href: "/products?category=gaming" }, { label: "Accessories", href: "/accessories" }] },
            { heading: "Sell", links: [{ label: "Sell Your Laptop", href: "/sell" }, { label: "Get a Quote", href: "/sell#quote" }, { label: "Trade In", href: "/sell#trade" }, { label: "Bulk Sales", href: "/sell#bulk" }] },
            { heading: "Help", links: [{ label: "FAQ", href: "/faq" }, { label: "Shipping Info", href: "/shipping" }, { label: "Returns", href: "/returns" }, { label: "Warranty Policy", href: "/warranty" }, { label: "Contact Support", href: "/contact" }] },
            { heading: "About", links: [{ label: "About Us", href: "/about" }, { label: "Blog", href: "/blogs" }, { label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Use", href: "/terms" }, { label: "Authenticity", href: "/authenticity" }] },
          ].map((col) => (
            <div key={col.heading}>
              <h4 className="font-bold text-sm mb-4">{col.heading}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">© 2024 TechBazar Nepal. All Rights Reserved.</p>
          <div className="flex gap-2">
            <div className="w-10 h-6 bg-white/10 rounded text-center text-[10px] font-bold leading-6 text-slate-300">eS</div>
            <div className="w-10 h-6 bg-white/10 rounded text-center text-[10px] font-bold leading-6 text-slate-300">K</div>
            <div className="w-10 h-6 bg-white/10 rounded text-center text-[10px] font-bold leading-6 text-slate-300">COD</div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
