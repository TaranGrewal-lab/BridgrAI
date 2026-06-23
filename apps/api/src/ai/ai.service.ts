import { Injectable, BadGatewayException } from "@nestjs/common";
import { CHECKLIST_SYSTEM_PROMPT } from "./prompts/checklist.prompt";
import { BUDGET_SYSTEM_PROMPT } from "./prompts/budget.prompt";
import { GUEST_GROUPING_SYSTEM_PROMPT } from "./prompts/guest.prompt";
import { VENDOR_RECOMMENDER_SYSTEM_PROMPT } from "./prompts/vendor.prompt";
import { getTemplateItems } from "../events/event-templates";

const MODEL = "claude-sonnet-4-6";

@Injectable()
export class AiService {
  // Single entry point: sends a system prompt + user payload to Claude and
  // parses the structured JSON response. Falls back to a static rule-based
  // result if the AI call fails or returns malformed output — the assistant
  // is advisory only and must never block planning.
  private async complete<T>(systemPrompt: string, userPayload: unknown, fallback: () => T): Promise<T> {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return fallback();

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 1024,
          system: systemPrompt,
          messages: [{ role: "user", content: JSON.stringify(userPayload) }],
        }),
      });
      if (!res.ok) throw new BadGatewayException("AI provider error");
      const data = await res.json();
      const text = data.content?.[0]?.text ?? "{}";
      return JSON.parse(text) as T;
    } catch {
      return fallback();
    }
  }

  getChecklist(eventType: string) {
    return this.complete<{ items: string[] }>(
      CHECKLIST_SYSTEM_PROMPT,
      { eventType },
      () => ({ items: getTemplateItems(eventType) }),
    );
  }

  getBudgetRecommendation(totalBudget: number, eventTypes: string[]) {
    const equalShare = Math.round(100 / Math.max(eventTypes.length, 1));
    return this.complete<{ allocations: Record<string, number> }>(
      BUDGET_SYSTEM_PROMPT,
      { totalBudget, eventTypes },
      () => ({
        allocations: Object.fromEntries(eventTypes.map((t) => [t, equalShare])),
      }),
    );
  }

  getGuestGrouping(guests: { id: string; relationship?: string; side?: string; tags?: string[] }[]) {
    return this.complete<{ suggestions: { guestId: string; eventTypes: string[] }[] }>(
      GUEST_GROUPING_SYSTEM_PROMPT,
      { guests },
      () => ({
        suggestions: guests.map((g) => ({
          guestId: g.id,
          eventTypes: ["ANAND_KARAJ", "RECEPTION"],
        })),
      }),
    );
  }

  getVendorRecommendation(
    candidates: { id: string; name: string; ratingAverage?: number }[],
  ) {
    return this.complete<{ rankedVendorIds: string[] }>(
      VENDOR_RECOMMENDER_SYSTEM_PROMPT,
      { candidates },
      () => ({
        rankedVendorIds: [...candidates]
          .sort((a, b) => (b.ratingAverage ?? 0) - (a.ratingAverage ?? 0))
          .map((c) => c.id),
      }),
    );
  }
}
