import React from "react";
import { motion } from "framer-motion";
import {
    FiMessageCircle,
    FiMail,
    FiPhone,
} from "react-icons/fi";

const SupportCard = ({ iconPath, title, description, color }: { iconPath: React.ReactNode, title: string, description: string, color: string }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="bg-[var(--card-bg)] p-10 rounded-[40px] shadow-sm border border-[var(--border-color)] flex flex-col items-start gap-6 cursor-pointer group"
    >
        <div className={`p-6 rounded-3xl ${color} bg-opacity-10 text-2xl group-hover:scale-110 transition-transform duration-300`}>
            {iconPath}
        </div>
        <div>
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">{title}</h3>
            <p className="text-neutral-500 leading-relaxed text-lg">{description}</p>
        </div>
    </motion.div>
);

const SupportSection = () => {
    return (
        <section className="mt-40 pt-40 border-t border-[var(--border-color)]">
            <div className="max-w-6xl mx-auto">
                <div className="mb-24 text-center">
                    <h2 className="text-6xl font-bold tracking-tighter text-[var(--foreground)] mb-8">
                        How can we <span className="text-teal-400">help?</span>
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Have a question? We're here to help you get the best out of SneakFit.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
                    <SupportCard
                        iconPath={<FiMessageCircle className="text-teal-500" />}
                        title="Live Chat"
                        description="Instant help with your orders."
                        color="bg-teal-500"
                    />
                    <SupportCard
                        iconPath={<FiMail className="text-blue-500" />}
                        title="Email Support"
                        description="Reply within 24 hours."
                        color="bg-blue-500"
                    />
                    <SupportCard
                        iconPath={<FiPhone className="text-purple-500" />}
                        title="Call Center"
                        description="Urgent issue support."
                        color="bg-purple-500"
                    />
                </div>
            </div>
        </section>
    );
};

export default SupportSection;
