"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateVendor, useCurrentVendor } from "@/lib/hooks/useVendors";
import { useVendorCategories } from "@/lib/hooks/useContent";

export default function VendorOnboardingPage() {
  const router = useRouter();
  const { data: existingVendor, isLoading } = useCurrentVendor();
  const { data: categories } = useVendorCategories();
  const createVendor = useCreateVendor();

  const [businessName, setBusinessName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");

  useEffect(() => {
    if (existingVendor) router.replace("/vendor-dashboard");
  }, [existingVendor, router]);

  const handleCreate = async () => {
    await createVendor.mutateAsync({
      businessName,
      categoryId,
      country,
      city,
      description: description || undefined,
      phone: phone || undefined,
      email: email || undefined,
      websiteUrl: websiteUrl || undefined,
      instagramUrl: instagramUrl || undefined,
    });
    router.push("/vendor-dashboard");
  };

  if (isLoading) {
    return <main className="px-6 py-16 text-center text-sm text-charcoal/50">Loading…</main>;
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="font-heading text-3xl text-charcoal">List your business</h1>
      <p className="mt-2 text-sm text-charcoal/60">
        Sada Vyah is a directory — couples discover and contact you directly. We never take bookings or fees on your behalf.
      </p>

      <div className="mt-8 space-y-4 rounded-2xl border border-sage/30 bg-white p-6 shadow-sm">
        <input
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="Business Name"
          className="w-full rounded-full border border-sage/30 px-4 py-2 text-sm"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full rounded-full border border-sage/30 px-4 py-2 text-sm"
        >
          <option value="">Select a category</option>
          {categories?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            className="rounded-full border border-sage/30 px-4 py-2 text-sm"
          />
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="rounded-full border border-sage/30 px-4 py-2 text-sm"
          />
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell couples about your business"
          rows={3}
          className="w-full rounded-2xl border border-sage/30 px-4 py-2 text-sm"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="rounded-full border border-sage/30 px-4 py-2 text-sm"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded-full border border-sage/30 px-4 py-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="Website URL"
            className="rounded-full border border-sage/30 px-4 py-2 text-sm"
          />
          <input
            value={instagramUrl}
            onChange={(e) => setInstagramUrl(e.target.value)}
            placeholder="Instagram URL"
            className="rounded-full border border-sage/30 px-4 py-2 text-sm"
          />
        </div>
        <button
          onClick={handleCreate}
          disabled={createVendor.isPending || !businessName || !categoryId || !city}
          className="w-full rounded-full bg-gold px-6 py-3 text-sm font-medium text-ivory disabled:opacity-50"
        >
          {createVendor.isPending ? "Creating…" : "Create My Vendor Listing"}
        </button>
      </div>
    </main>
  );
}
