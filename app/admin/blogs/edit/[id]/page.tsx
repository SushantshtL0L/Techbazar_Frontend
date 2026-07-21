"use client";

import React, { useEffect, useState } from "react";
import { handleGetBlogById, handleUpdateBlog } from "@/lib/actions/blog.actions";
import { useRouter, useParams } from "next/navigation";
import { FiChevronLeft, FiSave } from "react-icons/fi";

export default function EditBlogPage() {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "Sneaker Culture",
    });

    useEffect(() => {
        async function fetchBlog() {
            if (!id) return;
            const result = await handleGetBlogById(id as string);
            if (result.success) {
                setFormData({
                    title: result.data.title,
                    content: result.data.content,
                    category: result.data.category || "Sneaker Culture",
                });
            }
            setFetching(false);
        }
        fetchBlog();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = await handleUpdateBlog(id as string, formData);
        if (result.success) {
            router.push("/admin/blogs");
        } else {
            alert(result.message);
        }
        setLoading(false);
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-t-white border-neutral-800 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white mb-10 transition-colors"
            >
                <FiChevronLeft /> Cancel
            </button>

            <header className="mb-12">
                <h2 className="text-3xl font-bold text-white tracking-tight">Edit Post</h2>
                <p className="text-neutral-500 mt-2">Modify the existing narrative.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Title</label>
                    <input
                        required
                        type="text"
                        className="w-full bg-neutral-900 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 transition-all font-medium"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Category</label>
                    <select
                        className="w-full bg-neutral-900 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 transition-all appearance-none font-medium"
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
                        rows={15}
                        className="w-full bg-neutral-900 border border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-white/20 transition-all resize-none leading-relaxed font-medium"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-white text-black py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-neutral-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                    {loading ? "Saving Changes..." : "Update Post"} <FiSave />
                </button>
            </form>
        </div>
    );
}
