"use client";

import React, { useEffect, useState } from "react";
import { handleGetAllBlogs, handleDeleteBlog } from "@/lib/actions/blog.actions";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        setLoading(true);
        const result = await handleGetAllBlogs();
        if (result.success) {
            setBlogs(result.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const onDelete = async (id: string) => {
        if (confirm("Delete this post?")) {
            const result = await handleDeleteBlog(id);
            if (result.success) {
                fetchBlogs();
            }
        }
    };

    return (
        <div className="space-y-10">
            <header className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white">Blogs</h2>
                    <p className="text-neutral-500 text-sm mt-1">Manage simple text updates.</p>
                </div>
                <Link
                    href="/admin/blogs/create"
                    className="bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-neutral-200 transition-all"
                >
                    New Post
                </Link>
            </header>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2].map(i => (
                        <div key={i} className="h-20 bg-neutral-900 animate-pulse rounded-2xl" />
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    <AnimatePresence>
                        {blogs.map((blog) => (
                            <motion.div
                                key={blog._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-neutral-900 border border-white/5 p-6 rounded-2xl flex items-center justify-between group"
                            >
                                <div>
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                        <span className="text-red-600">{blog.category}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white">{blog.title}</h3>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/blogs/${blog._id}`}
                                        target="_blank"
                                        className="p-2 text-neutral-400 hover:text-white"
                                    >
                                        <FiEye />
                                    </Link>
                                    <button
                                        onClick={() => onDelete(blog._id)}
                                        className="p-2 text-neutral-500 hover:text-red-500 transition-colors"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {blogs.length === 0 && (
                        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                            <p className="text-neutral-600 font-medium">No blog posts yet.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
