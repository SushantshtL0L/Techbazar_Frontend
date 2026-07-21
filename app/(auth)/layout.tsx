import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white flex">
            {/* Left Column: Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24">
                <div className="w-full max-w-md">
                    {/* Brand / Logo placeholder for mobile, though it's inside forms too */}
                    <div className="mb-8 flex justify-start">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-[#0A2540] rounded-lg flex items-center justify-center">
                                <span className="font-black text-sm text-white">TB</span>
                            </div>
                            <span className="text-xl font-bold text-[#0A2540]">TechBazar</span>
                        </Link>
                    </div>
                    {children}
                </div>
            </div>

            {/* Right Column: Image & Overlay */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#0A2540]">
                {/* Background Image Placeholder */}
                <Image
                    src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop"
                    alt="Gadget Workspace"
                    fill
                    className="object-cover opacity-80 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/90 to-transparent flex items-center justify-center p-12">
                    <div className="max-w-lg w-full bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-3xl shadow-2xl">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Nepal's PC & Laptop Store
                        </h2>
                        <p className="text-white/80 text-lg">
                            Join TechBazar — Nepal's premier marketplace for new PCs and certified used laptops. Buy with confidence, sell with ease.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
