"use client";

import React, { useState, useRef, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiShield, FiCamera, FiPlus } from "react-icons/fi";
import { handleAdminCreateUser } from "@/lib/actions/auth.actions";
import { AdminCreateUserData, adminCreateUserSchema } from "@/app/(auth)/schema";


export default function CreateUserPage() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AdminCreateUserData>({
        resolver: zodResolver(adminCreateUserSchema),
        defaultValues: {
            role: "user"
        }
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (values: AdminCreateUserData) => {
        setError(null);
        startTransition(async () => {
            try {
                const formData = new FormData();
                // Append all text values
                Object.entries(values).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                // Append image if selected
                const file = fileInputRef.current?.files?.[0];
                if (file) {
                    formData.append("image", file);
                }

                const result = await handleAdminCreateUser(formData);
                if (result.success) {
                    alert("User created successfully!");
                    router.push("/admin/users");
                } else {
                    setError(result.message || "Failed to create user");
                }
            } catch (err: any) {
                setError(err.message || "An error occurred");
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 p-4 md:p-8 pb-20">
            <Link href="/admin/users" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors font-bold group">
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Users
            </Link>

            <div className="bg-neutral-900 rounded-[40px] shadow-2xl border border-white/10 overflow-hidden">
                <div className="p-8 md:p-16">
                    <header className="mb-12 border-b border-white/5 pb-8">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white" style={{ fontFamily: "serif" }}>Register Account</h2>
                        <p className="text-gray-500 mt-4 text-lg md:text-xl">Create and provision a new system profile with assigned logic.</p>
                    </header>

                    {error && (
                        <div className="mb-8 p-6 bg-red-950/20 text-red-400 rounded-3xl text-sm font-medium border border-red-500/20 italic backdrop-blur-md">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                        {/* Image Upload Component */}
                        <div className="flex flex-col items-center gap-6">
                            <div
                                className="relative w-40 h-40 md:w-48 md:h-48 rounded-[40px] bg-white/5 overflow-hidden border-2 border-dashed border-white/20 cursor-pointer hover:border-white/40 ring-offset-4 ring-offset-black transition-all group shadow-2xl"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {previewImage ? (
                                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 gap-2 text-center p-4">
                                        <FiCamera className="text-4xl" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Select Image</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-sm">
                                    <FiCamera className="text-3xl mb-1" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Change</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] text-center">Identity Asset (Optional)</p>
                        </div>

                        {/* Form Fields Component */}
                        <div className="lg:col-span-2 space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                                {/* Name */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Full Name</label>
                                    <div className="relative group">
                                        <FiUser className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-xl group-focus-within:text-white transition-colors" />
                                        <input
                                            {...register("name")}
                                            className="w-full bg-white/5 border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-lg text-white focus:bg-white/10 focus:border-white/20 outline-none transition-all placeholder:text-gray-700"
                                            placeholder="Enter name"
                                        />
                                    </div>
                                    {errors.name?.message && <p className="text-xs text-red-500/80 ml-4 italic">{errors.name.message}</p>}
                                </div>

                                {/* Username */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Unique Username</label>
                                    <div className="relative group">
                                        <FiUser className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-xl group-focus-within:text-white transition-colors" />
                                        <input
                                            {...register("username")}
                                            className="w-full bg-white/5 border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-lg text-white focus:bg-white/10 focus:border-white/20 outline-none transition-all placeholder:text-gray-700"
                                            placeholder="username"
                                        />
                                    </div>
                                    {errors.username?.message && <p className="text-xs text-red-500/80 ml-4 italic">{errors.username.message}</p>}
                                </div>

                                {/* Email */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Email Connection</label>
                                    <div className="relative group">
                                        <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-xl group-focus-within:text-white transition-colors" />
                                        <input
                                            {...register("email")}
                                            className="w-full bg-white/5 border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-lg text-white focus:bg-white/10 focus:border-white/20 outline-none transition-all placeholder:text-gray-700"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                    {errors.email?.message && <p className="text-xs text-red-500/80 ml-4 italic">{errors.email.message}</p>}
                                </div>

                                {/* Role */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Access Tier</label>
                                    <div className="relative group">
                                        <FiShield className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-xl group-focus-within:text-white transition-colors" />
                                        <select
                                            {...register("role")}
                                            className="w-full bg-white/5 border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-lg text-white focus:bg-white/10 focus:border-white/20 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="user" className="bg-neutral-900 text-white">USER</option>
                                            <option value="seller" className="bg-neutral-900 text-white">SELLER</option>
                                            <option value="admin" className="bg-neutral-900 text-white">ADMIN</option>
                                        </select>
                                    </div>
                                    {errors.role?.message && <p className="text-xs text-red-500/80 ml-4 italic">{errors.role.message}</p>}
                                </div>

                                {/* Password */}
                                <div className="space-y-3 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Temporary Credential</label>
                                    <div className="relative group">
                                        <FiLock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-xl group-focus-within:text-white transition-colors" />
                                        <input
                                            type="password"
                                            {...register("password")}
                                            className="w-full bg-white/5 border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-lg text-white focus:bg-white/10 focus:border-white/20 outline-none transition-all placeholder:text-gray-700"
                                            placeholder="Secure password"
                                        />
                                    </div>
                                    {errors.password?.message && <p className="text-xs text-red-500/80 ml-4 italic">{errors.password.message}</p>}
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/5">
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="flex items-center justify-center gap-4 w-full bg-white text-black text-xl font-black py-7 rounded-3xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                >
                                    {isPending ? (
                                        <div className="w-6 h-6 border-4 border-black/10 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <><FiPlus className="text-2xl" /> Provision User</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
