"use client";

import React, { useState } from "react";
import { handleCreateBlog } from "@/lib/actions/blog.actions";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiSend } from "react-icons/fi";

export default function CreateBlogPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "Sneaker Culture",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = await handleCreateBlog(formData);
        if (result.success) {
            router.push("/admin/blogs");
        } else {
            alert(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-3xl">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white mb-10 transition-colors"
            >
                <FiChevronLeft /> Back
            </button>

            <header className="mb-12">
                <h2 className="text-3xl font-bold text-white tracking-tight">Create Blog Post</h2>
                <p className="text-neutral-500 mt-2">Write a simple text-based update.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Title</label>
                    <input
                        required
                        type="text"
                        className="w-full bg-neutral-900 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 transition-all"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Category</label>
                    <select
                        className="w-full bg-neutral-900 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 transition-all appearance-none"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value="Sneaker Culture">Sneaker Culture</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Trends">Trends</option>
                        <option value="Announcements">Announcements</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Content</label>
                    <textarea
                        required
                        rows={10}
                        className="w-full bg-neutral-900 border border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-white/20 transition-all resize-none leading-relaxed"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-white text-black py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-neutral-200 transition-all flex items-center justify-center gap-3"
                >
                    {loading ? "Publishing..." : "Publish Blog"} <FiSend />
                </button>
            </form>
        </div>
    );
}
