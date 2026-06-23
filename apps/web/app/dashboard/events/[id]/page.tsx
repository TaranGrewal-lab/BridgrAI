"use client";

import { useApplyEventTemplate, useChecklist } from "@/lib/hooks/useEvents";

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const { data: checklist, isLoading } = useChecklist(params.id);
  const applyTemplate = useApplyEventTemplate(params.id);

  return (
    <main className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl text-charcoal">Event Checklist</h1>
        <button
          onClick={() => applyTemplate.mutate()}
          disabled={applyTemplate.isPending}
          className="rounded-full bg-gold px-6 py-2 text-sm font-medium text-ivory disabled:opacity-50"
        >
          {applyTemplate.isPending ? "Generating…" : "Generate Smart Template"}
        </button>
      </div>
      <p className="mt-1 text-sm text-charcoal/50">
        Generates the recommended checklist for this ceremony — remove, edit, or add custom items
        freely.
      </p>

      {isLoading && <p className="mt-6 text-sm text-charcoal/50">Loading checklist…</p>}

      <div className="mt-6 space-y-2">
        {checklist?.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-sage/30 bg-white px-4 py-3"
          >
            <span className={item.isComplete ? "text-charcoal/40 line-through" : "text-charcoal"}>
              {item.name}
            </span>
            <input type="checkbox" defaultChecked={item.isComplete} className="accent-gold" />
          </div>
        ))}
        {checklist?.length === 0 && (
          <p className="text-sm text-charcoal/50">No checklist items yet — generate a template to get started.</p>
        )}
      </div>
    </main>
  );
}
