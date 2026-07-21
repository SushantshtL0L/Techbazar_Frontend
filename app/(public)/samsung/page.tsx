import React from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaFilter, FaTh, FaHeadset } from 'react-icons/fa';
import Header from '../_components/Header';

const products = [
  {
    id: 1,
    name: "HP Pavilion 15",
    price: "Rs. 78,000",
    specs: "Intel i5 12th Gen · 8GB · 512GB SSD",
    colors: ["bg-gray-800", "bg-gray-100", "bg-blue-300"],
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "HP Envy x360",
    price: "Rs. 1,45,000",
    specs: "AMD Ryzen 7 · 16GB · 1TB NVMe SSD",
    colors: ["bg-yellow-400", "bg-black", "bg-gray-300"],
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "HP Spectre x360",
    price: "Rs. 2,20,000",
    specs: "Intel i7 13th Gen · 16GB · 1TB SSD",
    colors: ["bg-slate-800", "bg-gray-800", "bg-gray-400"],
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "HP OMEN 16",
    price: "Rs. 1,85,000",
    specs: "Intel i7 13th Gen · 16GB DDR5 · RTX 4060",
    colors: ["bg-gray-900", "bg-gray-400", "bg-red-600"],
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=400&q=80"
  }
];

const subNavLinks = [
  "HP Pavilion",
  "HP Envy",
  "HP Spectre",
  "HP OMEN (Gaming)",
  "HP Workstations"
];

export default function HPLaptopsPage() {
  return (
    <>
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>
      <div className="min-h-screen bg-white pt-24">

        {/* Hero Section */}
        <section className="bg-[#0b1016] text-white pt-16 pb-20 px-6 lg:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="flex-1 max-w-xl">
              <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-6">
                New Arrival
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2">
                HP OMEN 16
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-200 mb-6">
                Built to dominate.
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                Powered by 13th Gen Intel Core i7 and NVIDIA RTX 4060. The HP OMEN 16 is engineered for serious gaming with a 165Hz QHD display.
              </p>
              <div className="flex items-center gap-4">
                <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                  Buy Now
                </button>
                <button className="border border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80"
                  alt="HP OMEN 16"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b1016] via-transparent to-transparent opacity-80 md:hidden"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Sub Navigation */}
        <div className="border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-md z-30">
          <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
            <div className="flex justify-center min-w-max gap-8">
              {subNavLinks.map((link, idx) => (
                <button
                  key={idx}
                  className={`py-4 text-sm font-semibold transition-colors border-b-2 ${
                    idx === 0
                      ? "border-[#0A2540] text-[#0A2540]"
                      : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">HP Laptop Lineup</h2>
              <p className="text-gray-500">From everyday productivity to high-performance gaming.</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors" aria-label="Filter">
                <FaFilter />
              </button>
              <button className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors" aria-label="Grid View">
                <FaTh />
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {products.map((product) => (
              <div key={product.id} className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                {/* Image Container */}
                <div className="relative h-48 bg-gray-50 rounded-xl mb-5 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain h-36 w-auto mix-blend-darken group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Add to Cart Hover Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-end justify-center pb-4 transition-all duration-300">
                    <button className="bg-[#0b1016] text-white px-5 py-2.5 rounded-full font-semibold text-xs flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-gray-800">
                      <FaShoppingCart /> Add to Cart
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{product.name}</h3>
                  <span className="font-bold text-blue-600 text-sm text-right ml-1">{product.price}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">{product.specs}</p>

                {/* Colors */}
                <div className="flex gap-2 mb-6 mt-auto">
                  {product.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className={`w-5 h-5 rounded-full ${color} border border-gray-200 shadow-sm cursor-pointer hover:scale-110 transition-transform`}
                      title="Color variant"
                    />
                  ))}
                </div>

                {/* Compare Button */}
                <button className="w-full py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors">
                  Compare Models
                </button>
              </div>
            ))}
          </div>

          {/* Bottom Banners */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Trade-in Banner */}
            <div className="md:col-span-2 bg-[#0b1016] text-white rounded-3xl p-10 flex flex-col justify-center items-start relative overflow-hidden">
              <div className="relative z-10 max-w-md">
                <h3 className="text-3xl font-bold mb-4">Trade-in and save.</h3>
                <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                  Get up to Rs. 30,000 credit toward a new HP laptop when you trade in your old device. Limited time offer.
                </p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-blue-700 transition-colors">
                  Estimate My Trade-In
                </button>
              </div>
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -mr-20 -mb-20"></div>
            </div>

            {/* Help Banner */}
            <div className="bg-blue-50 rounded-3xl p-10 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-6">
                <FaHeadset />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-6">
                Our laptop experts are here to help you pick the right HP model for your needs.
              </p>
              <Link href="/support" className="text-blue-600 font-bold text-sm hover:underline">
                Chat with an Expert
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
