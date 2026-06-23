"use client";

import { useEffect, useState } from "react";
import { useCmsPages, useUpdateCmsPage } from "@/lib/hooks/useContent";

export default function AdminSeoPage() {
  const { data: pages, isLoading, isError } = useCmsPages();
  const updatePage = useUpdateCmsPage();

  const [selectedSlug, setSelectedSlug] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const page = pages?.find((p) => p.slug === selectedSlug);
    if (page) {
      setTitle(page.title);
      setContent(page.content);
    }
  }, [pages, selectedSlug]);

  return (
    <main className="px-6 py-6">
      <h1 className="font-heading text-3xl text-charcoal">SEO & CMS Pages</h1>
      <p className="mt-2 text-sm text-charcoal/60">
        Edit titles and content for static marketing pages (homepage copy, FAQ, legal pages).
      </p>

      {isLoading && <p className="mt-6 text-sm text-charcoal/50">Loading pages…</p>}
      {isError && (
        <p className="mt-6 text-sm text-charcoal/50">
          Could not reach the admin API yet — connect <code>NEXT_PUBLIC_API_URL</code> and sign
          in with an admin account to manage live CMS pages here.
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-2 rounded-2xl border border-sage/30 bg-white p-4 shadow-sm">
          {pages?.map((p) => (
            <button
              key={p.slug}
              onClick={() => setSelectedSlug(p.slug)}
              className={`block w-full rounded-xl px-3 py-2 text-left text-sm ${
                selectedSlug === p.slug ? "bg-blush text-charcoal" : "text-charcoal/60 hover:bg-sage/10"
              }`}
            >
              /{p.slug}
            </button>
          ))}
          {(!pages || pages.length === 0) && (
            <p className="text-sm text-charcoal/40">No CMS pages yet.</p>
          )}
        </div>

        <div className="space-y-3 rounded-2xl border border-sage/30 bg-white p-5 shadow-sm lg:col-span-2">
          <input
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            placeholder="Page slug (e.g. faq)"
            className="w-full rounded-full border border-sage/30 px-4 py-2 text-sm"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Page title"
            className="w-full rounded-full border border-sage/30 px-4 py-2 text-sm"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Page content…"
            rows={8}
            className="w-full rounded-2xl border border-sage/30 px-4 py-3 text-sm"
          />
          <button
            onClick={() => selectedSlug && updatePage.mutate({ slug: selectedSlug, data: { title, content } })}
            className="rounded-full bg-gold px-6 py-2 text-sm font-medium text-ivory"
          >
            Save Page
          </button>
        </div>
      </div>
    </main>
  );
}
