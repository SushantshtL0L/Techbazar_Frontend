"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FiGrid, FiUsers, FiShoppingBag, FiLogOut, FiArrowRight, FiPackage, FiType } from "react-icons/fi";

const ADMIN_LINKS = [
    { href: "/admin", label: "Dashboard", icon: FiGrid },
    { href: "/admin/users", label: "Users", icon: FiUsers },
    { href: "/admin/products", label: "Products", icon: FiShoppingBag },
    { href: "/admin/orders", label: "Orders", icon: FiPackage },
    { href: "/admin/blogs", label: "Blogs", icon: FiType },
];

const SidebarItem = ({
    label,
    active,
    href,
    icon: Icon
}: {
    label: string,
    active?: boolean,
    href: string,
    icon: any
}) => (
    <Link href={href} className="relative group">
        <motion.div
            whileHover={{ x: 4 }}
            className={`
                px-6 py-4 rounded-2xl flex items-center justify-between transition-all duration-300
                ${active
                    ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'}
            `}
        >
            <div className="flex items-center gap-4">
                <div className={`
                    p-2 rounded-xl transition-colors
                    ${active ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-400 group-hover:text-white group-hover:bg-neutral-700'}
                `}>
                    <Icon className="text-xl" />
                </div>
                <span className="text-lg font-medium tracking-wide font-sans">{label}</span>
            </div>

            {active && (
                <motion.div
                    layoutId="active-pill"
                    className="w-1.5 h-6 bg-white rounded-full ml-auto"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
            {!active && (
                <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 transform -translate-x-2 group-hover:translate-x-0" />
            )}
        </motion.div>
    </Link>
);

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (href: string) => href === "/admin" ? pathname === href : pathname?.startsWith(href);

    return (
        <aside className="w-[320px] bg-black flex flex-col h-screen sticky top-0 hidden xl:flex border-r border-white/5">
            <div className="p-10 flex flex-col h-full">
                <div className="mb-12 px-4">
                    <Link href="/admin">
                        <div className="flex flex-col gap-0">
                            <h1 className="text-2xl font-bold tracking-tight text-white cursor-pointer group flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <span className="font-black text-xs text-white">TB</span>
                                </div>
                                <span>TechBazar<span className="text-blue-400/70 font-light">.Admin</span></span>
                            </h1>
                        </div>
                    </Link>
                </div>

                <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-6 px-6 opacity-60">
                        Management
                    </div>
                    <nav className="flex flex-col gap-2">
                        {ADMIN_LINKS.map(link => (
                            <SidebarItem
                                key={link.href}
                                label={link.label}
                                active={isActive(link.href)}
                                href={link.href}
                                icon={link.icon}
                            />
                        ))}
                    </nav>
                </div>

                <div className="mt-auto border-t border-white/5 pt-8 px-2">
                    <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all duration-300 group">
                        <div className="p-2 rounded-xl bg-red-500/5 group-hover:bg-red-500/20 transition-colors">
                            <FiLogOut className="text-xl" />
                        </div>
                        <span className="text-lg font-medium">Logout</span>
                    </button>

                    <div className="mt-6 px-4 flex items-center gap-3 opacity-40">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs text-neutral-500 uppercase tracking-widest font-bold">System Online</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
