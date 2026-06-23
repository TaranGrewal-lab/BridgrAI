const TOOLS = [
  {
    title: "AI Wedding Assistant",
    description: "Generate checklists, timelines, and planning advice for any ceremony.",
    cta: "Ask Assistant",
  },
  {
    title: "AI Budget Planner",
    description: "Get a recommended cost allocation across your selected events.",
    cta: "Plan My Budget",
  },
  {
    title: "AI Guest Planner",
    description: "Get suggested invitation groups based on relationship and side.",
    cta: "Suggest Groups",
  },
  {
    title: "AI Vendor Recommender",
    description: "Rank saved vendors by location, budget, style, and rating.",
    cta: "Recommend Vendors",
  },
];

export default function AiAssistantPage() {
  return (
    <main className="px-6 py-6">
      <h1 className="font-heading text-3xl text-charcoal">AI Wedding Assistant</h1>
      <p className="mt-1 text-sm text-charcoal/50">
        Advisory only — suggestions never auto-book vendors, message guests, or move money.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <div key={tool.title} className="rounded-2xl border border-sage/30 bg-white p-6 shadow-sm">
            <p className="font-heading text-lg text-charcoal">{tool.title}</p>
            <p className="mt-2 text-sm text-charcoal/60">{tool.description}</p>
            <button className="mt-4 rounded-full bg-blush px-5 py-2 text-sm font-medium text-charcoal">
              {tool.cta}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
