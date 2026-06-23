"use client";

import { useState } from "react";
import {
  useAiBudgetRecommendation,
  useAiChecklist,
  useAiGuestGrouping,
  useAiVendorRecommendation,
} from "@/lib/hooks/useAi";

const EVENT_TYPES = [
  "ROKA",
  "ENGAGEMENT",
  "MAIYAN_BRIDE",
  "MAIYAN_GROOM",
  "MEHNDI",
  "JAGGO_BRIDE",
  "JAGGO_GROOM",
  "CHOORA",
  "ANAND_KARAJ",
  "RECEPTION",
  "CIVIL_CEREMONY",
];

function ToolCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-sage/30 bg-white p-6 shadow-sm">
      <p className="font-heading text-lg text-charcoal">{title}</p>
      <p className="mt-2 text-sm text-charcoal/60">{description}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ChecklistTool() {
  const [eventType, setEventType] = useState(EVENT_TYPES[0]);
  const checklist = useAiChecklist();

  return (
    <ToolCard
      title="AI Wedding Assistant"
      description="Generate checklists, timelines, and planning advice for any ceremony."
    >
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="rounded-full border border-sage/30 px-3 py-1.5 text-xs"
        >
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t.replace(/_/g, " ")}
            </option>
          ))}
        </select>
        <button
          onClick={() => checklist.mutate(eventType)}
          className="rounded-full bg-blush px-5 py-2 text-sm font-medium text-charcoal"
        >
          {checklist.isPending ? "Generating…" : "Ask Assistant"}
        </button>
      </div>
      {checklist.data && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-charcoal/70">
          {checklist.data.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </ToolCard>
  );
}

function BudgetTool() {
  const [totalBudget, setTotalBudget] = useState(30000);
  const budget = useAiBudgetRecommendation();

  return (
    <ToolCard
      title="AI Budget Planner"
      description="Get a recommended cost allocation across your selected events."
    >
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="number"
          value={totalBudget}
          onChange={(e) => setTotalBudget(Number(e.target.value))}
          className="w-32 rounded-full border border-sage/30 px-3 py-1.5 text-xs"
        />
        <button
          onClick={() =>
            budget.mutate({
              totalBudget,
              eventTypes: ["ANAND_KARAJ", "RECEPTION", "MEHNDI", "MAIYAN_BRIDE"],
            })
          }
          className="rounded-full bg-blush px-5 py-2 text-sm font-medium text-charcoal"
        >
          {budget.isPending ? "Planning…" : "Plan My Budget"}
        </button>
      </div>
      {budget.data && (
        <ul className="mt-4 space-y-1 text-sm text-charcoal/70">
          {Object.entries(budget.data.allocations).map(([type, pct]) => (
            <li key={type} className="flex justify-between">
              <span>{type.replace(/_/g, " ")}</span>
              <span>{pct}%</span>
            </li>
          ))}
        </ul>
      )}
    </ToolCard>
  );
}

function GuestGroupingTool() {
  const grouping = useAiGuestGrouping();

  return (
    <ToolCard
      title="AI Guest Planner"
      description="Get suggested invitation groups based on relationship and side."
    >
      <button
        onClick={() =>
          grouping.mutate({
            guests: [
              { id: "g1", relationship: "Cousin", side: "BRIDE" },
              { id: "g2", relationship: "Colleague", side: "GROOM" },
            ],
          })
        }
        className="rounded-full bg-blush px-5 py-2 text-sm font-medium text-charcoal"
      >
        {grouping.isPending ? "Suggesting…" : "Suggest Groups"}
      </button>
      {grouping.data && (
        <ul className="mt-4 space-y-1 text-sm text-charcoal/70">
          {grouping.data.suggestions.map((s) => (
            <li key={s.guestId}>
              {s.guestId}: {s.eventTypes.join(", ")}
            </li>
          ))}
        </ul>
      )}
    </ToolCard>
  );
}

function VendorRecommenderTool() {
  const recommend = useAiVendorRecommendation();

  return (
    <ToolCard
      title="AI Vendor Recommender"
      description="Rank saved vendors by location, budget, style, and rating."
    >
      <button
        onClick={() =>
          recommend.mutate({
            candidates: [
              { id: "v1", name: "Royal Regency", ratingAverage: 4.9 },
              { id: "v2", name: "Dream Decor", ratingAverage: 4.8 },
            ],
          })
        }
        className="rounded-full bg-blush px-5 py-2 text-sm font-medium text-charcoal"
      >
        {recommend.isPending ? "Ranking…" : "Recommend Vendors"}
      </button>
      {recommend.data && (
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-charcoal/70">
          {recommend.data.rankedVendorIds.map((id) => (
            <li key={id}>{id}</li>
          ))}
        </ol>
      )}
    </ToolCard>
  );
}

export default function AiAssistantPage() {
  return (
    <main className="px-6 py-6">
      <h1 className="font-heading text-3xl text-charcoal">AI Wedding Assistant</h1>
      <p className="mt-1 text-sm text-charcoal/50">
        Advisory only — suggestions never auto-book vendors, message guests, or move money.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ChecklistTool />
        <BudgetTool />
        <GuestGroupingTool />
        <VendorRecommenderTool />
      </div>
    </main>
  );
}
