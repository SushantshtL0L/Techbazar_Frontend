import React from 'react';
import Link from 'next/link';
import Header from '../_components/Header';
import { FaLaptop, FaCheckCircle, FaShieldAlt, FaStar } from 'react-icons/fa';

const usedLaptops = [
  {
    id: 1,
    brand: "Dell",
    name: "Dell Inspiron 15 (Used)",
    condition: "Good",
    cpu: "Intel Core i5-8250U",
    ram: "8GB",
    storage: "256GB SSD",
    price: "Rs. 38,000",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    brand: "HP",
    name: "HP Pavilion 14 (Used)",
    condition: "Like New",
    cpu: "AMD Ryzen 5 4500U",
    ram: "8GB",
    storage: "512GB SSD",
    price: "Rs. 45,000",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    brand: "Lenovo",
    name: "Lenovo ThinkPad E14 (Used)",
    condition: "Good",
    cpu: "Intel Core i7-10510U",
    ram: "16GB",
    storage: "512GB SSD",
    price: "Rs. 58,000",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    brand: "Asus",
    name: "Asus VivoBook 15 (Used)",
    condition: "Fair",
    cpu: "Intel Core i3-1115G4",
    ram: "8GB",
    storage: "256GB SSD",
    price: "Rs. 28,000",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80",
  },
];

const conditionColors: Record<string, string> = {
  "Like New": "bg-emerald-500",
  "Good": "bg-blue-500",
  "Fair": "bg-orange-400",
};

const trustPoints = [
  { icon: <FaCheckCircle />, title: "50-Point Inspection", desc: "Every laptop is checked before listing." },
  { icon: <FaShieldAlt />, title: "3-Month Warranty", desc: "All used laptops come with a 90-day warranty." },
  { icon: <FaLaptop />, title: "Verified Specs", desc: "CPU, RAM, and storage are tested and confirmed." },
];

export default function UsedLaptopsPage() {
  return (
    <>
      <div className="fixed top-0 w-full z-50">
        <div className="fixed top-0 w-full z-50"><Header /></div>
      </div>

      <div className="min-h-screen bg-[#F5F7FA] pt-24">

        {/* Hero Banner */}
        <div className="bg-[#0A2540] flex flex-col items-center justify-center py-20 px-6 relative overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30"></div>
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30"></div>

          <div className="z-10 text-center max-w-2xl">
            <span className="inline-block bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              Certified Pre-Owned
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
              Used Laptops
            </h1>
            <p className="text-xl text-gray-300 font-medium max-w-lg mx-auto leading-relaxed mb-10">
              Tested, verified, and ready to use. Get a great laptop at a fraction of the price â€” with warranty.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/products?condition=used" className="px-8 py-3 bg-white text-[#0A2540] rounded-full font-bold text-sm hover:bg-gray-100 hover:shadow-lg transition-all active:scale-95">
                Browse All Used Laptops
              </Link>
              <Link href="/sell" className="px-8 py-3 border border-white/40 text-white rounded-full font-bold text-sm hover:bg-white/10 transition-all">
                Sell Your Laptop
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Points */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustPoints.map((point, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mb-4">
                  {point.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{point.title}</h4>
                <p className="text-sm text-gray-500">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <main className="max-w-7xl mx-auto px-6 pb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Available Used Laptops</h2>
              <p className="text-gray-500 text-sm mt-1">All verified and in stock</p>
            </div>
            <Link href="/products?condition=used" className="text-blue-600 font-bold text-sm hover:underline">
              View All â†’
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {usedLaptops.map((laptop) => (
              <div key={laptop.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-44 bg-gray-50 flex items-center justify-center p-4">
                  <span className={`absolute top-3 left-3 ${conditionColors[laptop.condition] || "bg-gray-400"} text-white text-[10px] font-bold px-2.5 py-1 rounded-full`}>
                    {laptop.condition}
                  </span>
                  <img
                    src={laptop.image}
                    alt={laptop.name}
                    className="h-full object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                  />
                </div>

                {/* Info */}
                <div className="p-4">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{laptop.brand}</span>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight mt-1 mb-2 line-clamp-1">{laptop.name}</h3>
                  <div className="text-xs text-gray-500 space-y-0.5 mb-3">
                    <p>ðŸ”² {laptop.cpu}</p>
                    <p>ðŸ’¾ {laptop.ram} RAM Â· {laptop.storage}</p>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <FaStar className="text-yellow-400 text-xs" />
                    <span className="text-xs font-bold text-gray-700">{laptop.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-black text-gray-900">{laptop.price}</p>
                    <button className="text-xs bg-[#0A2540] text-white px-3 py-1.5 rounded-full font-bold hover:bg-blue-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

