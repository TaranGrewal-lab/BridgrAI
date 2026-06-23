"use client";

import { useState } from "react";

const FIELDS = [
  { key: "businessName", label: "Business Name", placeholder: "Royal Regency Venue" },
  { key: "city", label: "City", placeholder: "London" },
  { key: "phone", label: "Phone", placeholder: "+44 7000 000000" },
  { key: "email", label: "Email", placeholder: "hello@vendor.com" },
  { key: "website", label: "Website", placeholder: "https://vendor.com" },
  { key: "instagram", label: "Instagram", placeholder: "@vendor" },
];

export default function VendorProfilePage() {
  const [form, setForm] = useState<Record<string, string>>({});

  return (
    <main className="px-6 py-6">
      <h1 className="font-heading text-3xl text-charcoal">Business Profile</h1>
      <p className="mt-2 text-sm text-charcoal/60">
        These details appear on your public listing so couples can contact you directly — Sada
        Vyah never messages on your behalf.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-sage/30 bg-white p-6 shadow-sm sm:grid-cols-2">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="text-xs font-medium text-charcoal/60">{f.label}</label>
            <input
              value={form[f.key] ?? ""}
              onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
              placeholder={f.placeholder}
              className="mt-1 w-full rounded-full border border-sage/30 px-4 py-2 text-sm outline-none focus:border-gold"
            />
          </div>
        ))}
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-charcoal/60">About</label>
          <textarea
            value={form.about ?? ""}
            onChange={(e) => setForm((prev) => ({ ...prev, about: e.target.value }))}
            rows={4}
            placeholder="Tell couples about your business…"
            className="mt-1 w-full rounded-2xl border border-sage/30 px-4 py-3 text-sm outline-none focus:border-gold"
          />
        </div>
        <div className="sm:col-span-2">
          <button className="rounded-full bg-gold px-6 py-2 text-sm font-medium text-ivory">
            Save Profile
          </button>
        </div>
      </div>
    </main>
  );
}
