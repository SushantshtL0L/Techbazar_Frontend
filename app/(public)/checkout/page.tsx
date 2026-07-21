"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaLock, FaArrowLeft, FaCheckCircle, FaShieldAlt, FaTruck, FaPhoneAlt } from "react-icons/fa";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("esewa");

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* MINIMAL HEADER */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 lg:px-12 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-black text-xl text-[#0A2540] tracking-tight">TechBazar</Link>
            <div className="h-6 w-px bg-gray-300 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
              <FaLock /> Secure Checkout
            </div>
          </div>
          <Link href="/products" className="text-sm font-bold text-gray-600 hover:text-[#0A2540] flex items-center gap-2 transition-colors">
            <FaArrowLeft /> Back to Shop
          </Link>
        </div>
      </header>

      {/* MAIN CHECKOUT CONTENT */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10 w-full flex-grow flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: FORMS */}
        <div className="w-full lg:w-2/3 space-y-6">
          
          {/* STEP 1: SHIPPING DETAILS */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#0A2540] text-white flex items-center justify-center font-bold">1</div>
              <h2 className="text-xl font-bold text-gray-900">Shipping Details</h2>
            </div>
            
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Full Name</label>
                  <input type="text" placeholder="e.g. Rahul hero" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A2540] focus:ring-1 focus:ring-[#0A2540] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Mobile Number</label>
                  <input type="text" placeholder="98XXXXXXX" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A2540] focus:ring-1 focus:ring-[#0A2540] transition-colors" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Delivery Address</label>
                <input type="text" placeholder="Street name, House No., Landmark" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A2540] focus:ring-1 focus:ring-[#0A2540] transition-colors" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">City</label>
                  <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A2540] focus:ring-1 focus:ring-[#0A2540] bg-white text-gray-900 transition-colors">
                    <option>Kathmandu</option>
                    <option>Lalitpur</option>
                    <option>Bhaktapur</option>
                    <option>Pokhara</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Area</label>
                  <input type="text" placeholder="e.g. New Baneshwor" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A2540] focus:ring-1 focus:ring-[#0A2540] transition-colors" />
                </div>
              </div>
            </form>
          </div>

          {/* STEP 2: PAYMENT METHOD */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#0A2540] text-white flex items-center justify-center font-bold">2</div>
              <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* eSewa */}
              <div 
                onClick={() => setPaymentMethod('esewa')}
                className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all ${paymentMethod === 'esewa' ? 'border-[#0A2540] bg-[#0A2540]/5' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl tracking-tighter">eS</div>
                <span className="text-sm font-bold text-gray-900">eSewa Wallet</span>
              </div>
              
              {/* Khalti */}
              <div 
                onClick={() => setPaymentMethod('khalti')}
                className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all ${paymentMethod === 'khalti' ? 'border-[#0A2540] bg-[#0A2540]/5' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xl tracking-tighter">K</div>
                <span className="text-sm font-bold text-gray-900">Khalti Wallet</span>
              </div>
              
              {/* COD */}
              <div 
                onClick={() => setPaymentMethod('cod')}
                className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all ${paymentMethod === 'cod' ? 'border-[#0A2540] bg-[#0A2540]/5' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-xl"><FaTruck /></div>
                <span className="text-sm font-bold text-gray-900">Cash on Delivery</span>
              </div>
            </div>
          </div>
          
          {/* TRUST BADGES */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] sm:text-xs font-bold text-gray-400 mt-8 mb-4">
            <span className="flex items-center gap-1.5"><FaLock className="text-green-500" /> SSL SECURE ENCRYPTION</span>
            <span className="flex items-center gap-1.5"><FaShieldAlt className="text-blue-500" /> AUTHENTICITY GUARANTEED</span>
            <span className="flex items-center gap-1.5"><FaCheckCircle className="text-emerald-500" /> SAFE DELIVERY</span>
          </div>
          
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
            
            {/* Items */}
            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-100 p-1">
                  <Image src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=200&auto=format&fit=crop" alt="iPhone 15 Pro" width={50} height={50} className="object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">iPhone 15 Pro, 256GB</h4>
                  <p className="text-[10px] text-gray-500 mt-1 mb-1">Condition: Brand New</p>
                  <p className="text-sm font-black text-[#0A2540]">Rs. 1,85,000</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-100 p-1">
                  <Image src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=200&auto=format&fit=crop" alt="Sony Headphones" width={50} height={50} className="object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">Sony WH-1000XM5</h4>
                  <p className="text-[10px] text-gray-500 mt-1 mb-1">Condition: Like New</p>
                  <p className="text-sm font-black text-[#0A2540]">Rs. 42,500</p>
                </div>
              </div>
            </div>
            
            {/* Totals */}
            <div className="border-t border-b border-gray-100 py-4 mb-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold text-gray-900">Rs. 227,500</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery Fee</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax (VAT 13%)</span>
                <span className="font-bold text-gray-900">Included</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-2xl font-black text-[#0A2540]">Rs. 227,500</span>
            </div>
            
            <button className="w-full bg-[#0A2540] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#164070] transition-colors shadow-lg">
              <FaLock /> Place Order Securely
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-4 leading-relaxed">
              By placing your order, you agree to Gadget Pasale's <Link href="#" className="underline">Terms of Service</Link>.
            </p>

            {/* Help Widget */}
            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
              <FaPhoneAlt className="text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-[#0A2540] mb-1">Need Help?</h4>
                <p className="text-xs text-blue-800/70 mb-2">Our support team is available 24/7 for sales assistance.</p>
                <p className="text-sm font-black text-blue-600">+977-97-8438007</p>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#0A2540] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-xs">
            <h4 className="font-bold text-lg mb-2">Gadget Pasale</h4>
            <p className="text-xs text-slate-400">Nepal's most trusted marketplace for premium gadgets and certified pre-owned electronics.</p>
          </div>
          <div className="flex gap-16">
            <div>
              <h4 className="font-bold text-sm mb-4">Quick Links</h4>
              <ul className="text-xs text-slate-400 space-y-2">
                <li><Link href="#" className="hover:text-white">About Us</Link></li>
                <li><Link href="#" className="hover:text-white">Shipping Info</Link></li>
                <li><Link href="#" className="hover:text-white">Warranty Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4">Legal</h4>
              <ul className="text-xs text-slate-400 space-y-2">
                <li><Link href="#" className="hover:text-white">Authenticity Guarantee</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of Use</Link></li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Secure Payments</h4>
            <div className="flex gap-2 mb-4">
               {/* Placeholder icons for payment methods */}
               <div className="w-8 h-5 bg-white/20 rounded"></div>
               <div className="w-8 h-5 bg-white/20 rounded"></div>
               <div className="w-8 h-5 bg-white/20 rounded"></div>
            </div>
            <p className="text-[10px] text-slate-500">© 2024 Gadget Pasale Nepal. Authenticity Guaranteed.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
