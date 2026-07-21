"use client";

import React from "react";
import Sidebar from "../_components/Sidebar";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import {
    FiMessageCircle,
    FiMail,
    FiPhone,
    FiChevronRight,
    FiHelpCircle,
    FiTruck,
    FiRefreshCcw,
    FiShield
} from "react-icons/fi";

const SupportCard = ({ iconPath, title, description, color, theme }: { iconPath: React.ReactNode, title: string, description: string, color: string, theme: string }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className={`p-10 rounded-[40px] shadow-sm flex flex-col items-start gap-6 cursor-pointer group border transition-colors ${theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-100'
            }`}
    >
        <div className={`p-6 rounded-3xl ${color} bg-opacity-10 text-2xl group-hover:scale-110 transition-transform duration-300`}>
            {iconPath}
        </div>
        <div>
            <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
            <p className="text-gray-500 leading-relaxed text-lg">{description}</p>
        </div>
    </motion.div>
);

const FAQItem = ({ question, answer, theme }: { question: string, answer: string, theme: string }) => (
    <div className={`py-8 border-b group cursor-pointer ${theme === 'dark' ? 'border-neutral-800' : 'border-gray-100'}`}>
        <div className="flex items-center justify-between">
            <h4 className={`text-xl font-bold transition-colors ${theme === 'dark' ? 'text-neutral-200 group-hover:text-teal-400' : 'text-gray-800 group-hover:text-teal-500'}`}>{question}</h4>
            <FiChevronRight className={`text-2xl transition-transform group-hover:translate-x-2 ${theme === 'dark' ? 'text-neutral-600' : 'text-gray-300'}`} />
        </div>
        <p className={`mt-4  hidden group-hover:block transition-all ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>
            {answer}
        </p>
    </div>
);

export default function SupportPage() {
    const { theme } = useTheme();

    return (
        <div className={`flex min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#fcfcfc]'}`}>
            <Sidebar activePage="support" />

            <main className={`flex-1 p-8 md:p-20 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-24 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`text-7xl font-bold tracking-tighter mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                            style={{ fontFamily: 'serif' }}
                        >
                            How can we <span className="text-teal-400">help?</span>
                        </motion.h1>
                        <p className="text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Search our knowledge base or connect with our support team to get your questions answered.
                        </p>
                    </div>

                    {/* Quick Contact Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
                        <SupportCard
                            theme={theme}
                            iconPath={<FiMessageCircle className="text-teal-500" />}
                            title="Live Chat"
                            description="Chat with our expert sneakerheads for instant help with your orders."
                            color="bg-teal-500"
                        />
                        <SupportCard
                            theme={theme}
                            iconPath={<FiMail className="text-blue-500" />}
                            title="Email Support"
                            description="Send us an email at help@sneakfit.com and we'll reply within 24 hours."
                            color="bg-blue-500"
                        />
                        <SupportCard
                            theme={theme}
                            iconPath={<FiPhone className="text-purple-500" />}
                            title="Call Center"
                            description="Available Mon-Fri, 9am - 6pm. Direct support for urgent issues."
                            color="bg-purple-500"
                        />
                    </div>

                    {/* Categories */}
                    <div className="mb-32">
                        <h2 className={`text-3xl font-bold mb-12 flex items-center gap-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            <span className="w-12 h-1 bg-teal-400 rounded-full"></span>
                            Browse by Category
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { icon: <FiTruck />, label: "Shipping" },
                                { icon: <FiRefreshCcw />, label: "Returns" },
                                { icon: <FiShield />, label: "Verification" },
                                { icon: <FiHelpCircle />, label: "General" }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f9f9f9' }}
                                    className={`p-8 rounded-3xl border flex items-center gap-5 cursor-pointer transition-colors ${theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'border-gray-100'
                                        }`}
                                >
                                    <div className="text-2xl text-teal-400">{item.icon}</div>
                                    <span className={`text-lg font-bold ${theme === 'dark' ? 'text-neutral-300' : 'text-gray-700'}`}>{item.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className={`p-16 rounded-[60px] border transition-colors ${theme === 'dark' ? 'bg-neutral-900/50 border-neutral-800' : 'bg-[#fcfcfc] border-gray-100'}`}>
                        <h2 className={`text-4xl font-bold mb-16 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions</h2>
                        <div className="space-y-2">
                            <FAQItem
                                theme={theme}
                                question="How do I verify the authenticity of my sneakers?"
                                answer="Every pair listed on SneakFit goes through a multi-step digital and physical verification process by our experts."
                            />
                            <FAQItem
                                theme={theme}
                                question="What is the average shipping time?"
                                answer="Orders typically arrive within 3-5 business days depending on your location and the seller's responsiveness."
                            />
                            <FAQItem
                                theme={theme}
                                question="Can I return a thrifted item?"
                                answer="Thrifted items are sold 'as-is' unless they significantly differ from the description and photos provided by the seller."
                            />
                            <FAQItem
                                theme={theme}
                                question="How do I become a featured seller?"
                                answer="Mainain a 4.5+ rating and completing at least 20 successful sales will automatically qualify you for featured status."
                            />
                        </div>
                    </div>

                    {/* Footer Contact */}
                    <div className="mt-32 text-center py-20 bg-teal-400 rounded-[50px] text-white">
                        <h2 className="text-4xl font-bold mb-6">Didn't find what you're looking for?</h2>
                        <p className="text-xl opacity-90 mb-10">Our team is standby to help you with anything.</p>
                        <button className="bg-white text-teal-400 px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                            Contact Support Now
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
