"use client";

import React, { useEffect, useState } from "react";
import { Check, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import {
    CreateCategory,
    DeleteCategory,
    FetchCategories,
    UpdateCategory,
} from "@/src/actions/category.action";
import { Category } from "@/src/types/category.types";
import { getErrorMessage } from "@/src/utils/error";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingName, setEditingName] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    async function loadCategories() {
        setError("");
        try {
            const result = await FetchCategories();
            setCategories(result.data);
        } catch (error: unknown) {
            setCategories([]);
            setError(getErrorMessage(error, "Failed to load categories"));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let mounted = true;

        (async () => {
            if (mounted) {
                await loadCategories();
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        const trimmedName = name.trim();
        if (!trimmedName) return;

        setSaving(true);
        try {
            await CreateCategory(trimmedName);
            setName("");
            setIsCreateOpen(false);
            await loadCategories();
        } catch (error: unknown) {
            alert(getErrorMessage(error, "Failed to create category"));
        } finally {
            setSaving(false);
        }
    }

    function startEdit(category: Category) {
        setEditingId(category.id);
        setEditingName(category.name);
    }

    function cancelEdit() {
        setEditingId(null);
        setEditingName("");
    }

    async function handleUpdate(categoryId: number) {
        const trimmedName = editingName.trim();
        if (!trimmedName) return;

        setSaving(true);
        try {
            await UpdateCategory(categoryId, trimmedName);
            cancelEdit();
            await loadCategories();
        } catch (error: unknown) {
            alert(getErrorMessage(error, "Failed to update category"));
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(category: Category) {
        if (!confirm(`Delete category "${category.name}"? Products in this category will be unassigned.`)) {
            return;
        }

        setSaving(true);
        try {
            const result = await DeleteCategory(category.id);

            if (!result.success) {
                alert(result.message);
                return;
            }

            if (editingId === category.id) {
                cancelEdit();
            }

            await loadCategories();
        } catch (error: unknown) {
            alert(getErrorMessage(error, "Failed to delete category"));
        } finally {
            setSaving(false);
        }
    }

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(search.trim().toLowerCase())
    );

    return (
        <div className="flex flex-col gap-8 w-full">
            <h1 className="font-['Ndot57Caps'] text-[2rem] tracking-[0.1em] text-center text-[#f0ece4] uppercase">
                CATEGORY <span className="text-[#d42b2b]">MANAGER</span>
            </h1>

            <div
                className="flex flex-col sm:flex-row items-stretch justify-center w-full max-w-2xl mx-auto gap-3"
            >
                <div className="flex items-center flex-1 bg-[#0f0f0f] border border-[#1a1a1a] px-4 py-3 gap-3 rounded-sm">
                    <Search size={15} className="text-[#d42b2b]" aria-hidden />
                    <input
                        className="w-full bg-transparent outline-none text-[#f0ece4] font-mono text-sm tracking-[0.05em] placeholder:text-[#444]"
                        type="text"
                        placeholder="Search categories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <button
                    type="button"
                    onClick={() => setIsCreateOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-[#d42b2b] text-white font-mono text-xs tracking-[0.1em] uppercase hover:bg-[#b02020] transition-colors whitespace-nowrap rounded-sm"
                >
                    <Plus size={15} aria-hidden />
                    Add Category
                </button>
            </div>

            <div className="flex min-h-5 items-center justify-center font-mono text-[0.7rem] uppercase tracking-[0.08em] text-[#777]">
                {loading ? (
                    <span>Loading categories...</span>
                ) : error ? (
                    <span className="text-[#d42b2b]">{error}</span>
                ) : (
                    <span>
                        {filteredCategories.length} of {categories.length} categor{categories.length === 1 ? "y" : "ies"}
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-3 w-full py-6">
                {filteredCategories.map((category) => {
                    const isEditing = editingId === category.id;

                    return (
                        <div
                            key={category.id}
                            className="flex flex-col sm:flex-row sm:items-center gap-4 bg-[#0f0f0f] border border-[#1a1a1a] p-4 transition-colors duration-200 hover:border-[#333] w-full rounded-sm"
                        >
                            <div className="w-16 font-mono text-[0.7rem] tracking-[0.12em] text-[#666]">
                                #{category.id}
                            </div>

                            <div className="flex-1">
                                {isEditing ? (
                                    <input
                                        value={editingName}
                                        onChange={(e) => setEditingName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") handleUpdate(category.id);
                                            if (e.key === "Escape") cancelEdit();
                                        }}
                                        className="w-full bg-transparent border-b border-[#333] py-2 text-[#f0ece4] font-mono text-sm tracking-[0.05em] outline-none focus:border-[#d42b2b]"
                                        maxLength={100}
                                        autoFocus
                                    />
                                ) : (
                                    <div className="font-mono text-sm tracking-[0.08em] text-[#f0ece4] uppercase">
                                        {category.name.replaceAll("_", " ")}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                {isEditing ? (
                                    <>
                                        <button
                                            type="button"
                                            title="Save category"
                                            onClick={() => handleUpdate(category.id)}
                                            disabled={saving || !editingName.trim()}
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-[#d42b2b] text-white hover:bg-[#b02020] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Check size={16} aria-hidden />
                                        </button>
                                        <button
                                            type="button"
                                            title="Cancel edit"
                                            onClick={cancelEdit}
                                            disabled={saving}
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[#333] text-[#888] hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <X size={16} aria-hidden />
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        title="Edit category"
                                        onClick={() => startEdit(category)}
                                        disabled={saving}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[#333] text-[#cfcfcf] hover:border-[#d42b2b] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Pencil size={15} aria-hidden />
                                    </button>
                                )}

                                <button
                                    type="button"
                                    title="Delete category"
                                    onClick={() => handleDelete(category)}
                                    disabled={saving}
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[#333] text-[#888] hover:border-[#d42b2b] hover:text-[#d42b2b] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Trash2 size={15} aria-hidden />
                                </button>
                            </div>
                        </div>
                    );
                })}

                {!loading && !error && categories.length === 0 && (
                    <div className="text-center text-sm text-[#777] font-mono py-8">
                        No categories found
                    </div>
                )}

                {!loading && !error && categories.length > 0 && filteredCategories.length === 0 && (
                    <div className="text-center text-sm text-[#777] font-mono py-8">
                        No matching categories
                    </div>
                )}
            </div>

            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
                    <div className="w-full max-w-md rounded-sm border border-[#1a1a1a] bg-[#0b0b0b] p-6 text-[#f0ece4] shadow-2xl">
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <h2 className="font-['Ndot57Caps'] text-[1.4rem] tracking-[0.1em] uppercase">
                                NEW <span className="text-[#d42b2b]">CATEGORY</span>
                            </h2>
                            <button
                                type="button"
                                title="Close"
                                onClick={() => {
                                    setIsCreateOpen(false);
                                    setName("");
                                }}
                                disabled={saving}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[#333] text-[#888] hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <X size={16} aria-hidden />
                            </button>
                        </div>

                        <form onSubmit={handleCreate} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-mono">
                                    Category Name
                                </label>
                                <input
                                    className="bg-transparent border-b border-[#333] py-3 text-[#f0ece4] font-mono text-sm tracking-[0.05em] outline-none focus:border-[#d42b2b] placeholder:text-[#333]"
                                    type="text"
                                    placeholder="category_name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    maxLength={100}
                                    autoFocus
                                    required
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsCreateOpen(false);
                                        setName("");
                                    }}
                                    disabled={saving}
                                    className="flex-1 px-5 py-3 border border-[#333] text-[#888] font-mono text-xs tracking-[0.1em] uppercase rounded-sm hover:bg-[#1a1a1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving || !name.trim()}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#d42b2b] text-white font-mono text-xs tracking-[0.1em] uppercase hover:bg-[#b02020] transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
                                >
                                    <Plus size={15} aria-hidden />
                                    {saving ? "Saving..." : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
