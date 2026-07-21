"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiUser, FiMail, FiShield, FiClock, FiEdit3 } from "react-icons/fi";
import { handleAdminGetUserById } from "@/lib/actions/auth.actions";
import { toast } from "react-toastify";

export default function ViewUserPage() {
    const { id } = useParams();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return;
            setLoading(true);
            const result = await handleAdminGetUserById(id as string);
            if (result.success) {
                setUser(result.data);
            } else {
                toast.error(result.message || "Failed to fetch user");
                router.push("/admin/users");
            }
            setLoading(false);
        };
        fetchUser();
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium">Fetching profile details...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="flex justify-between items-center">
                <Link href="/admin/users" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors font-bold group">
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Users
                </Link>
                <Link
                    href={`/admin/users/${id}/edit`}
                    className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-transform"
                >
                    <FiEdit3 /> Edit User
                </Link>
            </div>

            <div className="bg-neutral-900 rounded-[40px] shadow-2xl border border-white/10 overflow-hidden">
                {/* Header/Cover Section */}
                <div className="h-32 bg-gradient-to-r from-purple-900/20 via-neutral-900 to-blue-900/20 border-b border-white/5"></div>

                <div className="px-12 pb-12 -mt-16">
                    <div className="flex flex-col md:flex-row items-end gap-6 mb-12">
                        <div className="w-40 h-40 rounded-[40px] bg-neutral-900 border-4 border-neutral-900 ring-1 ring-white/10 flex items-center justify-center text-gray-300 overflow-hidden shadow-2xl backdrop-blur-xl">
                            {user.image ? (
                                <img src={user.image.startsWith('http') ? user.image : `http://localhost:5050${user.image}`} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <FiUser className="text-6xl" />
                            )}
                        </div>
                        <div className="pb-4">
                            <h2 className="text-5xl font-bold text-white tracking-tight" style={{ fontFamily: "serif" }}>{user.name}</h2>
                            <p className="text-gray-500 mt-2 font-mono uppercase text-xs tracking-[0.3em]">System ID: {user._id}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 bg-white/5 rounded-[32px] border border-white/5 space-y-3 group hover:bg-white/[0.07] transition-colors">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">
                                <FiMail className="text-blue-400" /> Email Address
                            </div>
                            <div className="text-xl font-bold text-white break-all">{user.email}</div>
                        </div>

                        <div className="p-8 bg-white/5 rounded-[32px] border border-white/5 space-y-3 group hover:bg-white/[0.07] transition-colors">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">
                                <FiShield className="text-purple-400" /> Account Role
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${user.role === 'admin' ? 'bg-purple-900/30 text-purple-400 border border-purple-500/30' : 'bg-blue-900/30 text-blue-400 border border-blue-500/30'
                                    }`}>
                                    {user.role}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 bg-white/5 rounded-[32px] border border-white/5 space-y-3 group hover:bg-white/[0.07] transition-colors">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">
                                <FiClock className="text-green-400" /> Member Since
                            </div>
                            <div className="text-xl font-bold text-white">
                                {new Date(user.createdAt).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>

                        <div className="p-8 bg-white/5 rounded-[32px] border border-white/5 space-y-3 group hover:bg-white/[0.07] transition-colors">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">
                                <FiUser className="text-orange-400" /> Username
                            </div>
                            <div className="text-xl font-bold text-white">@{user.username || 'n/a'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
