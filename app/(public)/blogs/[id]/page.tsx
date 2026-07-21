"use client";

import React, { useEffect, useState } from "react";
import { handleGetBlogById } from "@/lib/actions/blog.actions";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function BlogDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlog() {
            if (!id) return;
            const result = await handleGetBlogById(id as string);
            if (result.success) {
                setBlog(result.data);
            }
            setLoading(false);
        }
        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-t-red-600 border-neutral-800 rounded-full animate-spin" />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                <button onClick={() => router.back()} className="text-red-600 font-bold">Return</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-16 pb-40">
            <main className="max-w-3xl mx-auto px-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white mb-12 transition-colors"
                >
                    <FiArrowLeft /> Back to Journal
                </button>

                <header className="mb-12">
                    <div className="flex items-center gap-4 text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6">
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        <span className="w-1 h-1 bg-neutral-800 rounded-full"></span>
                        <span className="text-red-600">{blog.category}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                        {blog.title}
                    </h1>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center text-[10px] font-bold text-neutral-400">
                            {blog.author?.username?.substring(0, 2).toUpperCase() || "SF"}
                        </div>
                        <span className="text-sm text-neutral-400">Written by {blog.author?.username || "Admin"}</span>
                    </div>
                </header>

                <div className="prose prose-invert prose-red max-w-none">
                    <div className="text-neutral-300 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                        {blog.content}
                    </div>
                </div>
            </main>
        </div>
    );
}
