"use client";

import { useState } from "react";
import { useCreateGalleryImage, useDeleteGalleryImage, useGalleryImages } from "@/lib/hooks/useContent";

export default function AdminGalleryPage() {
  const { data: images, isLoading, isError } = useGalleryImages();
  const createImage = useCreateGalleryImage();
  const deleteImage = useDeleteGalleryImage();

  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  const handleAdd = () => {
    if (!category || !imageUrl) return;
    createImage.mutate({ category, imageUrl, caption });
    setCategory("");
    setImageUrl("");
    setCaption("");
  };

  return (
    <main className="px-6 py-6">
      <h1 className="font-heading text-3xl text-charcoal">Inspiration Gallery</h1>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-sage/30 bg-white p-4 shadow-sm sm:grid-cols-4">
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (e.g. MEHNDI)"
          className="rounded-full border border-sage/30 px-4 py-2 text-sm"
        />
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          className="rounded-full border border-sage/30 px-4 py-2 text-sm sm:col-span-2"
        />
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Caption (optional)"
          className="rounded-full border border-sage/30 px-4 py-2 text-sm"
        />
        <button
          onClick={handleAdd}
          className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-ivory sm:col-span-4"
        >
          Add Image
        </button>
      </div>

      {isLoading && <p className="mt-6 text-sm text-charcoal/50">Loading gallery…</p>}
      {isError && (
        <p className="mt-6 text-sm text-charcoal/50">
          Could not reach the admin API yet — connect <code>NEXT_PUBLIC_API_URL</code> and sign
          in with an admin account to manage the live gallery here.
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images?.map((img) => (
          <div key={img.id} className="overflow-hidden rounded-2xl border border-sage/30 bg-white shadow-sm">
            <div className="aspect-square bg-sage/10" />
            <div className="p-3">
              <p className="text-xs uppercase tracking-wide text-gold">{img.category}</p>
              {img.caption && <p className="text-sm text-charcoal">{img.caption}</p>}
              <button
                onClick={() => deleteImage.mutate(img.id)}
                className="mt-2 text-xs font-medium text-charcoal/50"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
