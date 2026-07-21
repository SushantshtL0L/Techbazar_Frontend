"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiUser, FiMail, FiShield, FiSave, FiHash, FiCamera } from "react-icons/fi";
import { handleAdminGetUserById, handleAdminUpdateUser } from "@/lib/actions/auth.actions";
import { toast } from "react-toastify";

export default function EditUserPage() {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        role: "user"
    });
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return;
            setLoading(true);
            const result = await handleAdminGetUserById(id as string);
            if (result.success) {
                setFormData({
                    name: result.data.name || "",
                    email: result.data.email || "",
                    username: result.data.username || "",
                    role: result.data.role || "user"
                });
                if (result.data.image) {
                    setPreview(result.data.image.startsWith('http') ? result.data.image : `http://localhost:5050${result.data.image}`);
                }
            } else {
                toast.error(result.message || "Failed to fetch user");
                router.push("/admin/users");
            }
            setLoading(false);
        };
        fetchUser();
    }, [id]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("username", formData.username);
        data.append("role", formData.role);
        if (image) data.append("image", image);

        const result = await handleAdminUpdateUser(id as string, data);
        if (result.success) {
            toast.success("User updated successfully");
            router.push(`/admin/users/${id}`);
        } else {
            toast.error(result.message || "Update failed");
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium">Loading user settings...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
            <Link href={`/admin/users/${id}`} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors font-bold group">
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Discard Changes
            </Link>

            <div className="bg-neutral-900 rounded-[40px] shadow-2xl border border-white/10 overflow-hidden">
                <div className="p-12">
                    <header className="mb-12 border-b border-white/5 pb-8">
                        <h2 className="text-4xl font-bold tracking-tight text-white mb-2" style={{ fontFamily: "serif" }}>Edit Account</h2>
                        <p className="text-gray-500">Update identification and system permissions for <span className="text-white font-medium">{formData.name}</span></p>
                    </header>

                    <form onSubmit={onSubmit} className="space-y-10">
                        {/* Avatar Upload */}
                        <div className="flex flex-col items-center gap-6 pb-6">
                            <div className="relative group">
                                <div className="w-40 h-40 rounded-[40px] bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center text-gray-500 overflow-hidden transition-all group-hover:border-white/40 ring-offset-4 ring-offset-black transition-all">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <FiUser className="text-6xl" />
                                    )}
                                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all backdrop-blur-sm">
                                        <FiCamera className="text-3xl text-white mb-2" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Change Photo</span>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Full Name</label>
                                <div className="relative group">
                                    <FiUser className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-xl group-focus-within:text-white transition-colors" />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-lg text-white focus:bg-white/10 focus:border-white/20 outline-none transition-all placeholder:text-gray-700"
                                        placeholder="Enter name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Username</label>
                                <div className="relative group">
                                    <FiHash className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-xl group-focus-within:text-white transition-colors" />
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-lg text-white focus:bg-white/10 focus:border-white/20 outline-none transition-all placeholder:text-gray-700"
                                        placeholder="username"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Email Address</label>
                                <div className="relative group">
                                    <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-xl group-focus-within:text-white transition-colors" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-lg text-white focus:bg-white/10 focus:border-white/20 outline-none transition-all placeholder:text-gray-700"
                                        placeholder="email@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Account Role</label>
                                <div className="relative group">
                                    <FiShield className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-xl group-focus-within:text-white transition-colors" />
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-lg text-white focus:bg-white/10 focus:border-white/20 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="user" className="bg-neutral-900">USER</option>
                                        <option value="seller" className="bg-neutral-900">SELLER</option>
                                        <option value="admin" className="bg-neutral-900">ADMIN</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center justify-center gap-3 w-full bg-white text-black text-xl font-black py-7 rounded-3xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
                            >
                                {saving ? (
                                    <div className="w-6 h-6 border-4 border-black/10 border-t-black rounded-full animate-spin"></div>
                                ) : (
                                    <><FiSave /> Save Changes</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
