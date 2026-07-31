import React from 'react';
import Link from 'next/link';
import { FaHeart, FaStar, FaChevronLeft, FaChevronRight, FaExchangeAlt, FaArrowRight, FaCalculator } from 'react-icons/fa';
import Header from '../_components/Header';

const filterPills = [
  { name: "All Tablets", active: true },
  { name: "Professional", active: false },
  { name: "Budget-Friendly", active: false },
  { name: "Accessories", active: false },
  { name: "Android", active: false },
  { name: "iPadOS", active: false }
];

const featuredPicks = [
  {
    id: 1,
    brand: "APPLE",
    name: "iPad Pro M2 12.9\"",
    price: "$1,099.00",
    rating: "4.9",
    reviews: "3k+",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    brand: "SAMSUNG",
    name: "Galaxy Tab S9 Ultra",
    price: "$1,199.00",
    rating: "4.8",
    reviews: "1.2k+",
    image: "https://images.unsplash.com/photo-1589739900266-43b2843f4c12?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    brand: "MICROSOFT",
    name: "Surface Pro 9",
    price: "$999.00",
    rating: "4.7",
    reviews: "850",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    brand: "GOOGLE",
    name: "Pixel Tablet + Dock",
    price: "$499.00",
    rating: "4.5",
    reviews: "210",
    image: "https://images.unsplash.com/photo-1527698266440-12104e498b76?auto=format&fit=crop&w=400&q=80"
  }
];

const budgetOptions = [
  {
    id: 1,
    name: "iPad 10th Gen",
    price: "From $449.00",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Galaxy Tab A9+",
    price: "From $219.00",
    image: "https://images.unsplash.com/photo-1589739900266-43b2843f4c12?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Fire HD 10",
    price: "From $139.00",
    image: "https://images.unsplash.com/photo-1527698266440-12104e498b76?auto=format&fit=crop&w=200&q=80"
  }
];

export default function TabletsPage() {
  return (
    <>
      <div className="fixed top-0 w-full z-50">
        <div className="fixed top-0 w-full z-50"><Header /></div>
      </div>
      <div className="min-h-screen bg-white pb-20 pt-24">
      
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>&gt;</span>
          <span className="text-blue-600 font-semibold">Tablets</span>
        </div>
      </div>

      {/* Hero Section - Split Layout */}
      <section className="max-w-7xl mx-auto px-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Main Hero Card */}
          <div className="lg:col-span-2 bg-[#09111e] rounded-3xl p-8 lg:p-12 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
            {/* Background graphic/image */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1200&q=80" 
                alt="Premium Tablets" 
                className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#09111e] via-[#09111e]/80 to-transparent"></div>
            </div>
            
            <div className="relative z-10 max-w-lg">
              <span className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-4 block">New Arrivals</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Premium Tablets.<br/>Unrivaled Power.
              </h1>
              <p className="text-gray-300 text-sm md:text-base mb-8 max-w-md leading-relaxed">
                Experience the next generation of productivity with the latest iPad Pro and Galaxy Tab S9 Series.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">
                  Shop iPad Pro
                </button>
                <button className="border border-white/40 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white/10 transition-colors">
                  Galaxy Tab S9
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Stacked Banners */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            {/* Trade-in Banner */}
            <div className="bg-blue-600 rounded-3xl p-8 flex-1 relative overflow-hidden flex flex-col justify-center group hover:bg-blue-700 transition-colors cursor-pointer">
              <div className="relative z-10">
                <h3 className="text-white text-2xl font-extrabold mb-2">Trade-in & Save</h3>
                <p className="text-blue-100 text-sm mb-6 max-w-[200px]">
                  Get up to $500 credit towards your new tablet.
                </p>
                <span className="text-white font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More <FaArrowRight />
                </span>
              </div>
              <FaExchangeAlt className="absolute right-[-20px] bottom-[-20px] text-white/20 text-9xl transform -rotate-45 group-hover:scale-110 transition-transform duration-500" />
            </div>

            {/* Education Pricing Banner */}
            <div className="bg-[#EEF2F8] rounded-3xl p-8 flex-1 flex flex-col justify-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-[#122238] text-xl font-extrabold mb-2">Education Pricing</h3>
              <p className="text-gray-600 text-sm mb-6">
                Special discounts for students and teachers.
              </p>
              <button className="bg-[#122238] text-white px-6 py-2.5 rounded-full font-bold text-sm w-max hover:bg-gray-800 transition-colors">
                Verify Status
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Pills */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {filterPills.map((pill, idx) => (
          <button 
            key={idx}
            className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
              pill.active 
                ? "bg-[#122238] text-white shadow-md" 
                : "bg-blue-50/50 text-gray-600 hover:bg-blue-100 hover:text-blue-900 border border-transparent"
            }`}
          >
            {pill.name}
          </button>
        ))}
      </div>

      {/* Featured Picks */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-extrabold text-[#122238]">Featured Picks</h2>
          <Link href="#" className="text-blue-600 font-bold text-xs flex items-center gap-1 hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPicks.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col relative group p-1">
              
              <button className="absolute top-4 right-4 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition-colors">
                <FaHeart className="text-xs" />
              </button>
              
              <div className="h-48 bg-[#EEF2F8] rounded-xl mb-4 flex items-center justify-center p-6 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="object-contain h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                />
              </div>

              <div className="p-4 pt-0 flex-1 flex flex-col">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{product.brand}</span>
                <h3 className="font-extrabold text-[#122238] text-base mb-3 leading-tight">{product.name}</h3>
                
                <div className="mt-auto">
                  <span className="font-black text-blue-600 text-lg block mb-2">{product.price}</span>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-red-500 text-[10px]" />
                    <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                    <span className="text-[10px] text-gray-400">({product.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Budget-Friendly Options */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-[#122238]">Budget-Friendly Options</h2>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <FaChevronLeft className="text-xs" />
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {budgetOptions.map((option) => (
            <div key={option.id} className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow group">
              <div className="w-20 h-20 bg-white rounded-xl p-2 flex shrink-0 items-center justify-center shadow-sm">
                <img src={option.image} alt={option.name} className="object-contain h-full mix-blend-multiply group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#122238] text-sm mb-1">{option.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{option.price}</p>
                <Link href="#" className="text-blue-600 font-bold text-xs hover:underline">
                  View Deal
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Upgrade Banner */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#09111e] rounded-3xl p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
              Upgrade to the latest tech for less.
            </h2>
            <p className="text-gray-300 text-sm mb-8 leading-relaxed">
              Trade in your eligible tablet, smartphone, or laptop and get instant credit towards a brand new premium tablet. It's good for your wallet and the planet.
            </p>
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                Estimate Value <FaCalculator />
              </button>
              <button className="border border-white/30 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-white/10 transition-colors">
                How it Works
              </button>
            </div>
          </div>
          
          <div className="relative z-10 w-full md:w-1/2 rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80" 
              alt="Unboxing Tablet" 
              className="w-full h-auto object-cover rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
            />
          </div>
          
          {/* Decorative background glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
        </div>
      </section>

    </div>
    </>
  );
}

