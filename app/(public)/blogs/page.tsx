"use client";

import React, { useEffect, useState } from "react";
import { handleGetAllBlogs } from "@/lib/actions/blog.actions";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogs() {
            const result = await handleGetAllBlogs();
            if (result.success) {
                setBlogs(result.data);
            }
            setLoading(false);
        }
        fetchBlogs();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white pt-16">
            <main className="max-w-4xl mx-auto px-6">
                <header className="mb-20">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Journal</h1>
                    <p className="text-neutral-500 font-medium">Updates, stories and notes from SneakFit.</p>
                </header>

                {loading ? (
                    <div className="space-y-12">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse space-y-4">
                                <div className="h-4 bg-neutral-900 w-24 rounded"></div>
                                <div className="h-8 bg-neutral-900 w-3/4 rounded"></div>
                                <div className="h-20 bg-neutral-900 w-full rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : blogs.length > 0 ? (
                    <div className="space-y-16">
                        {blogs.map((blog) => (
                            <motion.article
                                key={blog._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group block"
                            >
                                <Link href={`/blogs/${blog._id}`}>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                            <span className="w-1 h-1 bg-neutral-800 rounded-full"></span>
                                            <span className="text-red-600">{blog.category || "General"}</span>
                                        </div>

                                        <h2 className="text-2xl font-bold group-hover:text-red-600 transition-colors">
                                            {blog.title}
                                        </h2>

                                        <p className="text-neutral-400 leading-relaxed max-w-2xl">
                                            {blog.content.substring(0, 180)}...
                                        </p>

                                        <span className="text-sm font-bold text-white mt-2 inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                                            Read story <span className="text-red-600">→</span>
                                        </span>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center border-t border-white/5">
                        <p className="text-neutral-600 font-medium">No posts found.</p>
                    </div>
                )}
            </main>

            <footer className="mt-40 py-20 border-t border-white/5 text-center">
                <p className="text-xs text-neutral-600 font-bold uppercase tracking-widest">© 2026 Goldstar Journal</p>
            </footer>
        </div>
    );
}
