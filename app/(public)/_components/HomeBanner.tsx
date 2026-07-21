"use client";

import React from "react";
import Image from "next/image";

const HomeBanner = () => {
    return (
        <section className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
            {/* GOLDSTAR TEXT - TOP (Massive and Bold) */}
            <div className="absolute top-[18%] md:top-[12%] w-full flex justify-center z-0">
                <h1
                    className="text-[25vw] md:text-[20vw] font-[900] text-[#dc2626] uppercase leading-none tracking-tighter select-none"
                    style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
                >
                    GOLDSTAR
                </h1>
            </div>

            {/* THE NEW / 2025 OUTLINED TEXT (Middle-Bottom Layer) */}
            <div className="absolute top-[40%] md:top-[35%] w-full flex flex-col items-center z-10 pointer-events-none opacity-40">
                <h2
                    className="text-[22vw] md:text-[18vw] font-[900] uppercase tracking-tighter leading-none select-none text-transparent mb-[-4%]"
                    style={{
                        WebkitTextStroke: '2px white',
                        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                    }}
                >
                    THE NEW
                </h2>
                <h2
                    className="text-[22vw] md:text-[18vw] font-[900] uppercase tracking-tighter leading-none select-none text-transparent"
                    style={{
                        WebkitTextStroke: '2px white',
                        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                    }}
                >
                    2025
                </h2>
            </div>

            {/* SHOE IMAGE - TOP LAYER */}
            <div className="relative z-20 w-full max-w-[1200px] flex items-center justify-center pt-[10%]">
                <div className="relative w-[95%] md:w-[85%] aspect-[4/3]">
                    <Image
                        src="/images/shoe.png"
                        alt="Goldstar Shoe"
                        fill
                        className="object-contain rotate-[-15deg] drop-shadow-[0_40px_80px_rgba(220,38,38,0.25)]"
                        priority
                    />
                </div>
            </div>

            {/* TAGLINE - VERY BOTTOM */}
            <div className="absolute bottom-6 w-full text-center z-30">
                <p className="text-white text-base md:text-2xl font-bold tracking-tight">
                    Aba ko Hidai Hami Sanga
                </p>
            </div>
        </section>
    );
};

export default HomeBanner;

