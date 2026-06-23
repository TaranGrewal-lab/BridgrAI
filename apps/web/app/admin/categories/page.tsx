"use client";

import { useState } from "react";
import { useCreateVendorCategory, useDeleteVendorCategory, useVendorCategories } from "@/lib/hooks/useContent";

export default function AdminCategoriesPage() {
  const { data: categories, isLoading, isError } = useVendorCategories();
  const createCategory = useCreateVendorCategory();
  const deleteCategory = useDeleteVendorCategory();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const handleAdd = () => {
    if (!name || !slug) return;
    createCategory.mutate({ name, slug });
    setName("");
    setSlug("");
  };

  return (
    <main className="px-6 py-6">
      <h1 className="font-heading text-3xl text-charcoal">Vendor Categories</h1>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-sage/30 bg-white p-4 shadow-sm sm:grid-cols-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="rounded-full border border-sage/30 px-4 py-2 text-sm"
        />
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Slug"
          className="rounded-full border border-sage/30 px-4 py-2 text-sm"
        />
        <button onClick={handleAdd} className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-ivory">
          Add Category
        </button>
      </div>

      {isLoading && <p className="mt-6 text-sm text-charcoal/50">Loading categories…</p>}
      {isError && (
        <p className="mt-6 text-sm text-charcoal/50">
          Could not reach the admin API yet — connect <code>NEXT_PUBLIC_API_URL</code> and sign
          in with an admin account to manage live categories here.
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-sage/30 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-sage/30 bg-blush/20 text-charcoal/70">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((c) => (
              <tr key={c.id} className="border-b border-sage/20">
                <td className="px-4 py-3 font-medium text-charcoal">{c.name}</td>
                <td className="px-4 py-3 text-charcoal/60">{c.slug}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => deleteCategory.mutate(c.id)}
                    className="rounded-full border border-charcoal/20 px-3 py-1 text-xs text-charcoal"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
