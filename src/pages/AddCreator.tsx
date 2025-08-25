
import React, { useState } from "react";
import { supabase } from "../client";

interface CreatorForm {
    name: string;
    description?: string;
    imageUrl?: string;
    tiktokUrl?: string;
    youtubeUrl?: string;
    instagramUrl?: string;
}

import { useNavigate } from "react-router-dom";

export const AddCreator: React.FC = () => {
    const [form, setForm] = useState<CreatorForm>({ name: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) {
            setError("Name is required");
            return;
        }
        setError("");
        // Insert into Supabase
        const { error } = await supabase.from('creators').insert([form]);
        if (error) {
            setError("Failed to add creator: " + error.message);
        } else {
            navigate("/");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Add Creator</h2>
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
                        value={form.description || ""}
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
                        value={form.imageUrl || ""}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block font-medium">TikTok URL</label>
                    <input
                        type="url"
                        name="tiktokUrl"
                        value={form.tiktokUrl || ""}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block font-medium">YouTube URL</label>
                    <input
                        type="url"
                        name="youtubeUrl"
                        value={form.youtubeUrl || ""}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block font-medium">Instagram URL</label>
                    <input
                        type="url"
                        name="instagramUrl"
                        value={form.instagramUrl || ""}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Creator</button>
            </form>
        </div>
    );
};
