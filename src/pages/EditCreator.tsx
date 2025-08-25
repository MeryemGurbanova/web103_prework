import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../client";

export const EditCreator = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const creator = location.state?.creator;
    const [form, setForm] = useState({
        name: creator?.name || "",
        description: creator?.description || "",
        imageUrl: creator?.imageUrl || "",
        tiktokUrl: creator?.tiktokUrl || "",
        youtubeUrl: creator?.youtubeUrl || "",
        instagramUrl: creator?.instagramUrl || "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (!creator) {
        return <div className="text-red-500">No creator data found.</div>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        // Update by name (assuming name is unique)
        const { error } = await supabase
            .from('creators')
            .update(form)
            .eq('name', creator.name);
        setLoading(false);
        if (error) {
            setError("Failed to update: " + error.message);
        } else {
            navigate(`/${encodeURIComponent(form.name)}`, { state: { creator: form } });
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this creator?")) return;
        setLoading(true);
        const { error } = await supabase
            .from('creators')
            .delete()
            .eq('name', creator.name);
        setLoading(false);
        if (error) {
            setError("Failed to delete: " + error.message);
        } else {
            navigate("/", { replace: true });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Edit Creator</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Name<span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        rows={2}
                    />
                </div>
                <div>
                    <label className="block font-medium">Image URL</label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block font-medium">TikTok URL</label>
                    <input
                        type="url"
                        name="tiktokUrl"
                        value={form.tiktokUrl}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block font-medium">YouTube URL</label>
                    <input
                        type="url"
                        name="youtubeUrl"
                        value={form.youtubeUrl}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block font-medium">Instagram URL</label>
                    <input
                        type="url"
                        name="instagramUrl"
                        value={form.instagramUrl}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                        type="button"
                        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </form>
        </div>
    );
};