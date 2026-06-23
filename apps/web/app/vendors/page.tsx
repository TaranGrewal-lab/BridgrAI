"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { useVendorSearch } from "@/lib/hooks/useVendors";

const CATEGORIES = [
  "Photography",
  "Venues",
  "Catering",
  "Decor",
  "Bridal Wear",
  "Makeup & Hair",
  "DJ & Music",
  "Mehndi Artists",
];

const CITIES = ["London", "Birmingham", "Toronto", "New York", "Mumbai", "Sydney"];

export default function VendorSearchPage() {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"rating" | "popular" | "newest" | "featured">("featured");

  const { data: vendors, isLoading, isError } = useVendorSearch({ category, city, q, sort });

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="font-heading text-3xl text-charcoal">Find a Punjabi Wedding Vendor</h1>
        <p className="mt-2 text-sm text-charcoal/60">
          Browse our directory and contact vendors directly — Sada Vyah never handles bookings
          or messages on your behalf.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-sage/30 bg-white p-4 shadow-sm sm:grid-cols-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search vendors…"
            className="rounded-full border border-sage/30 px-4 py-2 text-sm outline-none focus:border-gold"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-sage/30 px-4 py-2 text-sm outline-none focus:border-gold"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-full border border-sage/30 px-4 py-2 text-sm outline-none focus:border-gold"
          >
            <option value="">All Cities</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-full border border-sage/30 px-4 py-2 text-sm outline-none focus:border-gold"
          >
            <option value="featured">Featured</option>
            <option value="rating">Top Rated</option>
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {isLoading && <p className="mt-8 text-sm text-charcoal/50">Loading vendors…</p>}
        {isError && (
          <p className="mt-8 text-sm text-charcoal/50">
            Could not reach the vendor directory yet — connect <code>NEXT_PUBLIC_API_URL</code>{" "}
            to see live results here.
          </p>
        )}

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vendors?.map((v) => (
            <Link
              key={v.id}
              href={`/vendors/profile/${v.slug}`}
              className="rounded-2xl border border-sage/30 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-gold">{v.category.name}</p>
                {v.subscription && v.subscription.plan !== "FREE" && (
                  <span className="rounded-full bg-blush/40 px-2 py-0.5 text-xs text-charcoal">
                    {v.subscription.plan}
                  </span>
                )}
              </div>
              <p className="mt-1 font-heading text-lg text-charcoal">{v.businessName}</p>
              <p className="text-xs text-charcoal/50">{v.city}</p>
              <p className="mt-2 text-sm text-charcoal/70">
                ★ {v.ratingAverage} ({v.ratingCount} reviews)
              </p>
              {v.priceRangeMin && (
                <p className="text-xs text-charcoal/50">From £{v.priceRangeMin}</p>
              )}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
