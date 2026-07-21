import React from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaHeart, FaStar, FaMicrochip, FaMemory, FaHdd, FaChevronDown } from 'react-icons/fa';
import Header from '../_components/Header';

const dellProducts = [
  {
    id: 1,
    series: "INSPIRON SERIES",
    name: "Dell Inspiron 15 3000",
    rating: "4.8",
    reviews: "210",
    price: "Rs. 85,000",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80",
    badge: "Best Seller",
    specs: { cpu: "Intel Core i5-1235U", ram: "8GB DDR4", storage: "512GB SSD" }
  },
  {
    id: 2,
    series: "XPS SERIES",
    name: "Dell XPS 15 9530",
    rating: "4.9",
    reviews: "98",
    price: "Rs. 2,15,000",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80",
    badge: "Premium",
    specs: { cpu: "Intel Core i7-13700H", ram: "16GB DDR5", storage: "1TB NVMe SSD" }
  },
  {
    id: 3,
    series: "VOSTRO SERIES",
    name: "Dell Vostro 15 3530",
    rating: "4.7",
    reviews: "145",
    oldPrice: "Rs. 75,000",
    price: "Rs. 65,000",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80",
    badge: "",
    specs: { cpu: "Intel Core i3-1305U", ram: "8GB DDR4", storage: "256GB SSD" }
  },
  {
    id: 4,
    series: "GAMING SERIES",
    name: "Dell G15 Gaming",
    rating: "4.8",
    reviews: "176",
    price: "Rs. 1,55,000",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=400&q=80",
    badge: "Gaming",
    specs: { cpu: "Intel Core i7-12700H", ram: "16GB DDR5", storage: "512GB NVMe SSD" }
  }
];

const filterPills = [
  "All Models",
  "Dell Inspiron",
  "Dell XPS",
  "Dell Vostro",
  "Dell Gaming (G Series)"
];

export default function DellLaptopsPage() {
  return (
    <>
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>
      <div className="min-h-screen bg-[#F5F7FA] pt-24">

        {/* Hero Section */}
        <section className="relative w-full h-[600px] bg-[#0A1118] text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1920&q=80"
              alt="Dell XPS Laptop"
              className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1118] via-[#0A1118]/80 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 lg:px-12">
            <div className="max-w-2xl">
              <div className="inline-block bg-blue-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                CERTIFIED DELL LAPTOPS
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
                Dell XPS 15
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
                Engineered for professionals. The XPS 15 9530 features a stunning 15.6" OLED display, 13th Gen Intel Core i7, and all-day battery life.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Starting From</p>
                  <p className="text-3xl font-black">Rs. 65,000</p>
                </div>
                <div className="flex items-center gap-4 ml-2">
                  <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl">
                    Buy Now
                  </button>
                  <button className="border border-white/40 bg-black/20 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Hero Feature Cards */}
            <div className="absolute bottom-8 right-6 lg:right-12 hidden md:flex gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col items-center justify-center w-32 h-32 hover:bg-white/20 transition-colors">
                <FaMicrochip className="text-blue-400 text-3xl mb-2" />
                <span className="font-bold text-lg">i7-13H</span>
                <span className="text-[10px] text-gray-300 uppercase text-center">13th Gen CPU</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col items-center justify-center w-32 h-32 hover:bg-white/20 transition-colors">
                <FaMemory className="text-blue-400 text-3xl mb-2" />
                <span className="font-bold text-lg">16GB</span>
                <span className="text-[10px] text-gray-300 uppercase text-center">DDR5 RAM</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col items-center justify-center w-32 h-32 hover:bg-white/20 transition-colors">
                <FaHdd className="text-blue-400 text-3xl mb-2" />
                <span className="font-bold text-lg">1TB</span>
                <span className="text-[10px] text-gray-300 uppercase text-center">NVMe SSD</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Sort Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar pb-2 sm:pb-0">
              {filterPills.map((pill, idx) => (
                <button
                  key={idx}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold transition-colors ${
                    idx === 0
                      ? "bg-[#1A202C] text-white shadow-md"
                      : "bg-blue-50 text-blue-900 hover:bg-blue-100"
                  }`}
                >
                  {pill}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 w-full sm:w-auto justify-end">
              <span>Sort by:</span>
              <button className="font-bold flex items-center gap-1 hover:text-black">
                Latest Arrivals <FaChevronDown className="text-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid Content */}
        <main className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Featured Side Banner */}
            <div className="lg:col-span-1 rounded-3xl overflow-hidden relative h-[500px] lg:h-auto shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=600&q=80"
                alt="Dell Laptop deal"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1118] via-[#0A1118]/60 to-transparent"></div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md w-max mb-3">
                  HOT DEAL
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-2">Dell Vostro Series</h2>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  Business-grade reliability starting at just Rs. 65,000. Limited stock available.
                </p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-blue-700 transition-colors w-max shadow-lg shadow-blue-500/30">
                  Explore Offers
                </button>
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {dellProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative">
                  {/* Wishlist */}
                  <div className="absolute top-5 right-5 z-10">
                    <button className="w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm">
                      <FaHeart className="text-sm" />
                    </button>
                  </div>

                  {product.badge && (
                    <div className="absolute top-5 left-5 z-10 bg-[#0A1118] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
                      {product.badge}
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative h-48 bg-blue-50/50 rounded-2xl mb-5 flex items-center justify-center overflow-hidden p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-contain h-full w-auto group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                    />
                  </div>

                  {/* Product Info */}
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-1">{product.series}</p>
                  <h3 className="font-extrabold text-gray-900 text-lg mb-1">{product.name}</h3>

                  {/* Specs */}
                  <div className="flex flex-col gap-0.5 mb-3">
                    <span className="text-xs text-gray-500">🔲 {product.specs.cpu}</span>
                    <span className="text-xs text-gray-500">💾 {product.specs.ram} · {product.specs.storage}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    <FaStar className="text-yellow-400 text-xs" />
                    <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviews} Reviews)</span>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      {product.oldPrice && (
                        <p className="text-xs text-gray-400 line-through mb-0.5">{product.oldPrice}</p>
                      )}
                      <span className="font-black text-gray-900 text-xl">{product.price}</span>
                    </div>
                    <button className="w-10 h-10 bg-[#0A1118] text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg transform active:scale-95 group-hover:-translate-y-1">
                      <FaShoppingCart className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compare Banner */}
          <div className="mt-12 bg-[#0A1118] rounded-3xl overflow-hidden relative flex flex-col md:flex-row items-center justify-between p-8 md:p-12 shadow-2xl">
            <div className="relative z-10 max-w-lg mb-6 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Compare Dell Models</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Not sure which Dell fits your needs? Use our comparison tool to find your perfect laptop in seconds.
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                Compare Now
              </button>
            </div>

            {/* Decorative Dotted Pattern */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 hidden md:block">
              <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2.5px)', backgroundSize: '24px 24px' }}></div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
