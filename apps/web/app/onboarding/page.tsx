"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateWedding, useCurrentWedding } from "@/lib/hooks/useWedding";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: existingWedding, isLoading } = useCurrentWedding();
  const createWedding = useCreateWedding();

  const [brideName, setBrideName] = useState("");
  const [groomName, setGroomName] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [city, setCity] = useState("");
  const [totalBudget, setTotalBudget] = useState(30000);

  useEffect(() => {
    if (existingWedding) router.replace("/dashboard");
  }, [existingWedding, router]);

  const handleCreate = async () => {
    await createWedding.mutateAsync({
      brideName,
      groomName,
      weddingDate: weddingDate || undefined,
      country,
      city,
      totalBudget: String(totalBudget),
    });
    router.push("/dashboard");
  };

  if (isLoading) {
    return <main className="px-6 py-16 text-center text-sm text-charcoal/50">Loading…</main>;
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="font-heading text-3xl text-charcoal">Tell us about your wedding</h1>
      <p className="mt-2 text-sm text-charcoal/60">
        This sets up your couple dashboard — you can change everything later.
      </p>

      <div className="mt-8 space-y-4 rounded-2xl border border-sage/30 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            value={brideName}
            onChange={(e) => setBrideName(e.target.value)}
            placeholder="Bride's Name"
            className="rounded-full border border-sage/30 px-4 py-2 text-sm"
          />
          <input
            value={groomName}
            onChange={(e) => setGroomName(e.target.value)}
            placeholder="Groom's Name"
            className="rounded-full border border-sage/30 px-4 py-2 text-sm"
          />
        </div>
        <input
          type="date"
          value={weddingDate}
          onChange={(e) => setWeddingDate(e.target.value)}
          className="w-full rounded-full border border-sage/30 px-4 py-2 text-sm"
        />
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
        <input
          type="number"
          value={totalBudget}
          onChange={(e) => setTotalBudget(Number(e.target.value))}
          placeholder="Total Budget"
          className="w-full rounded-full border border-sage/30 px-4 py-2 text-sm"
        />
        <button
          onClick={handleCreate}
          disabled={createWedding.isPending}
          className="w-full rounded-full bg-gold px-6 py-3 text-sm font-medium text-ivory"
        >
          {createWedding.isPending ? "Creating…" : "Create My Wedding Dashboard"}
        </button>
      </div>
    </main>
  );
}
