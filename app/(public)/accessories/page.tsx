import React from 'react';
import Link from 'next/link';
import { 
  FaHeadphones, FaMobile, FaBolt, FaClock, FaKeyboard, 
  FaStar, FaShoppingCart, FaPlus, FaTruck, FaShieldAlt, 
  FaHeadset, FaUndo, FaArrowRight, FaFilter, FaChevronDown 
} from 'react-icons/fa';
import Header from '../_components/Header';

const categories = [
  { name: "All Categories", icon: null, active: true },
  { name: "Headphones", icon: <FaHeadphones />, active: false },
  { name: "Cases & Protection", icon: <FaMobile />, active: false },
  { name: "Fast Charging", icon: <FaBolt />, active: false },
  { name: "Wearables", icon: <FaClock />, active: false },
  { name: "Peripherals", icon: <FaKeyboard />, active: false },
];

const trendingProducts = [
  {
    id: 1,
    tag: "Fast Charging",
    name: "HyperCharge 65W GaN",
    desc: "Dual USB-C, PPS Support",
    features: ["0-50% in 30 mins", "Overheat Protection"],
    price: "$49.00",
    oldPrice: "$69.00",
    discount: "-28%",
    badge: "",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    tag: "Wearables",
    name: "AuraWatch Sport x2",
    desc: "1.4\" AMOLED, SpO2 Tracking",
    features: ["14 Days Battery", "5ATM Water Resistant"],
    price: "$189.00",
    oldPrice: null,
    discount: null,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    tag: "Peripherals",
    name: "Nexus 11-in-1 Hub",
    desc: "4K HDMI, 100W Pass-through",
    features: ["Dual 4K Monitor Support", "10Gbps Data Transfer"],
    price: "$99.00",
    oldPrice: null,
    discount: null,
    badge: "",
    image: "https://images.unsplash.com/photo-1616867332219-0b1a03e7eeb6?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    tag: "Cases",
    name: "MagShield Pro Case",
    desc: "Military Grade Drop Protection",
    features: ["MagSafe Compatible", "Anti-yellowing Tech"],
    price: "$34.99",
    oldPrice: null,
    discount: null,
    badge: "",
    image: "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=400&q=80"
  }
];

export default function AccessoriesPage() {
  return (
    <>
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>
      <div className="min-h-screen bg-gray-50 pb-20 pt-24">
      
      <div className="max-w-7xl mx-auto px-6 pt-4 pb-2">
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>&gt;</span>
          <span className="text-blue-600 font-semibold">Tech Accessories</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-8">
        <div className="bg-[#122238] rounded-3xl p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-lg text-white">
            <span className="inline-block bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md mb-6">
              Summer Refresh 2024
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Elevate Your Desk Setup
            </h1>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Discover our curated collection of high-performance tech accessories designed for modern workflows and premium entertainment.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-[#122238] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Shop Best Sellers
              </button>
              <button className="border border-white/30 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                New Arrivals
              </button>
            </div>
          </div>
          <div className="relative z-10 w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80" 
              alt="Tech Accessories" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Filter Pills */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat, idx) => (
          <button 
            key={idx}
            className={`whitespace-nowrap flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              cat.active 
                ? "bg-[#122238] text-white shadow-md" 
                : "bg-blue-50 text-blue-900 hover:bg-blue-100"
            }`}
          >
            {cat.icon && <span className="text-blue-500">{cat.icon}</span>}
            {cat.name}
          </button>
        ))}
      </div>

      {/* Top Rated Audio Gear */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900">Top Rated Audio Gear</h2>
          <Link href="#" className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline">
            View All <FaArrowRight className="text-[10px]" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-auto lg:h-[400px]">
          {/* Main Featured Card */}
          <div className="lg:col-span-3 bg-gradient-to-br from-gray-800 to-black rounded-3xl p-10 flex flex-col justify-end relative overflow-hidden group shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" 
              alt="SonicMax Ultra Wireless" 
              className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            
            <div className="relative z-10 text-white mt-40">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400 text-sm">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                <span className="text-xs text-gray-300 font-medium">4.8 (500+ Reviews)</span>
              </div>
              <h3 className="text-3xl font-black mb-3">SonicMax Ultra Wireless</h3>
              <p className="text-gray-300 text-sm mb-6 max-w-md leading-relaxed">
                Industry-leading noise cancellation with 40-hour battery life and spatial audio support.
              </p>
              <div className="flex items-center gap-6">
                <span className="text-3xl font-black">$299.00</span>
                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-5 border border-gray-100 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow h-full">
              <div className="w-1/3 bg-gray-50 rounded-2xl h-full min-h-[120px] flex items-center justify-center p-2">
                <img src="https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=300&q=80" alt="Earbuds" className="object-contain h-24 mix-blend-multiply" />
              </div>
              <div className="w-2/3 flex flex-col justify-center relative">
                <h4 className="font-extrabold text-gray-900 text-lg mb-1">AirPulse Buds Pro</h4>
                <p className="text-xs text-gray-500 mb-4">Deep bass, IPX7 Waterproof</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="font-black text-blue-600 text-xl">$129.00</span>
                  <button className="w-8 h-8 bg-gray-100 text-gray-600 hover:text-white hover:bg-[#122238] rounded-full flex items-center justify-center transition-colors">
                    <FaShoppingCart className="text-xs" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-gray-100 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow h-full">
              <div className="w-1/3 bg-gray-50 rounded-2xl h-full min-h-[120px] flex items-center justify-center p-2">
                <img src="https://images.unsplash.com/photo-1608223652618-9759fb964177?auto=format&fit=crop&w=300&q=80" alt="Speaker" className="object-contain h-24 mix-blend-multiply" />
              </div>
              <div className="w-2/3 flex flex-col justify-center relative">
                <h4 className="font-extrabold text-gray-900 text-lg mb-1">TitanSound Go</h4>
                <p className="text-xs text-gray-500 mb-4">30W Output, 24h Playtime</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="font-black text-blue-600 text-xl">$79.00</span>
                  <button className="w-8 h-8 bg-gray-100 text-gray-600 hover:text-white hover:bg-[#122238] rounded-full flex items-center justify-center transition-colors">
                    <FaShoppingCart className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Essentials */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-4 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-extrabold text-gray-900">Trending Essentials</h2>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Sort by:</span>
              <button className="font-bold flex items-center gap-1 hover:text-blue-600">
                Popularity <FaChevronDown className="text-[10px]" />
              </button>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold border border-gray-300 rounded-full px-4 py-1.5 hover:bg-gray-50">
              <FaFilter className="text-gray-500" /> Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {trendingProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative group">
              {product.discount && (
                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-sm">
                  {product.discount}
                </div>
              )}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded shadow-sm">
                  {product.badge}
                </div>
              )}
              
              <div className="h-48 bg-[#F8FAFC] rounded-2xl mb-5 flex items-center justify-center p-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="object-contain h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                />
              </div>

              <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mb-1">{product.tag}</span>
              <h3 className="font-extrabold text-gray-900 text-base mb-1">{product.name}</h3>
              <p className="text-xs text-gray-500 mb-4">{product.desc}</p>
              
              <ul className="text-xs text-gray-500 mb-6 space-y-1">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gray-400"></span> {feat}
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto flex items-end justify-between border-t border-gray-100 pt-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-gray-900 text-lg">{product.price}</span>
                    {product.oldPrice && (
                      <span className="text-xs text-gray-400 line-through">{product.oldPrice}</span>
                    )}
                  </div>
                </div>
                <button className="w-10 h-10 bg-[#122238] text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-md">
                  <FaPlus className="text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="border-2 border-gray-300 text-gray-700 font-bold px-8 py-3 rounded-full hover:border-gray-800 hover:text-gray-900 transition-colors">
            Load More Products
          </button>
        </div>
      </section>

      {/* Bottom Banner Section */}
      <section className="max-w-7xl mx-auto px-6 mb-10">
        <div className="bg-[#EEF2F8] rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row gap-10 items-center">
          {/* Newsletter */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-extrabold text-[#122238] mb-4">Join the Gadget Community</h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Subscribe for exclusive early access to new tech accessory drops, weekly guides, and member-only discounts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-[#122238] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
            <div className="bg-white rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-sm">
              <FaTruck className="text-blue-500 text-2xl mb-3" />
              <h4 className="font-bold text-gray-900 text-sm mb-1">Free Shipping</h4>
              <p className="text-[10px] text-gray-500">On orders over $50</p>
            </div>
            <div className="bg-white rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-sm">
              <FaShieldAlt className="text-blue-500 text-2xl mb-3" />
              <h4 className="font-bold text-gray-900 text-sm mb-1">2-Year Warranty</h4>
              <p className="text-[10px] text-gray-500">Guaranteed protection</p>
            </div>
            <div className="bg-white rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-sm">
              <FaHeadset className="text-blue-500 text-2xl mb-3" />
              <h4 className="font-bold text-gray-900 text-sm mb-1">Expert Support</h4>
              <p className="text-[10px] text-gray-500">24/7 Tech assistance</p>
            </div>
            <div className="bg-white rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-sm">
              <FaUndo className="text-blue-500 text-2xl mb-3" />
              <h4 className="font-bold text-gray-900 text-sm mb-1">Easy Returns</h4>
              <p className="text-[10px] text-gray-500">30-day money back</p>
            </div>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}
