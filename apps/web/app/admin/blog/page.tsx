"use client";

import { useState } from "react";
import { useBlogPosts, useCreateBlogPost, useDeleteBlogPost, usePublishBlogPost } from "@/lib/hooks/useContent";

export default function AdminBlogPage() {
  const { data: posts, isLoading, isError } = useBlogPosts();
  const createPost = useCreateBlogPost();
  const publishPost = usePublishBlogPost();
  const deletePost = useDeleteBlogPost();

  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleAdd = () => {
    if (!slug || !title || !body) return;
    createPost.mutate({ slug, title, body });
    setSlug("");
    setTitle("");
    setBody("");
  };

  return (
    <main className="px-6 py-6">
      <h1 className="font-heading text-3xl text-charcoal">Blog</h1>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-sage/30 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug (e.g. mehndi-ideas-2026)"
            className="rounded-full border border-sage/30 px-4 py-2 text-sm"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="rounded-full border border-sage/30 px-4 py-2 text-sm"
          />
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Post body…"
          rows={4}
          className="rounded-2xl border border-sage/30 px-4 py-3 text-sm"
        />
        <button onClick={handleAdd} className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-ivory">
          Create Draft
        </button>
      </div>

      {isLoading && <p className="mt-6 text-sm text-charcoal/50">Loading posts…</p>}
      {isError && (
        <p className="mt-6 text-sm text-charcoal/50">
          Could not reach the admin API yet — connect <code>NEXT_PUBLIC_API_URL</code> and sign
          in with an admin account to manage live posts here.
        </p>
      )}

      <div className="mt-6 space-y-3">
        {posts?.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded-2xl border border-sage/30 bg-white p-4 shadow-sm">
            <div>
              <p className="font-medium text-charcoal">{p.title}</p>
              <p className="text-xs text-charcoal/50">
                /{p.slug} · {p.publishedAt ? "Published" : "Draft"}
              </p>
            </div>
            <div className="flex gap-2">
              {!p.publishedAt && (
                <button
                  onClick={() => publishPost.mutate(p.id)}
                  className="rounded-full bg-charcoal px-3 py-1 text-xs text-ivory"
                >
                  Publish
                </button>
              )}
              <button
                onClick={() => deletePost.mutate(p.id)}
                className="rounded-full border border-charcoal/20 px-3 py-1 text-xs text-charcoal"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
