"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useAiChecklist() {
  return useMutation({
    mutationFn: (eventType: string) =>
      api.post<{ items: string[] }>("/ai/checklist", { eventType }),
  });
}

export function useAiBudgetRecommendation() {
  return useMutation({
    mutationFn: (data: { totalBudget: number; eventTypes: string[] }) =>
      api.post<{ allocations: Record<string, number> }>("/ai/budget-recommendation", data),
  });
}

export function useAiGuestGrouping() {
  return useMutation({
    mutationFn: (data: { guests: { id: string; relationship?: string; side?: string }[] }) =>
      api.post<{ suggestions: { guestId: string; eventTypes: string[] }[] }>(
        "/ai/guest-grouping",
        data,
      ),
  });
}

export function useAiVendorRecommendation() {
  return useMutation({
    mutationFn: (data: { candidates: { id: string; name: string; ratingAverage?: number }[] }) =>
      api.post<{ rankedVendorIds: string[] }>("/ai/vendor-recommendation", data),
  });
}
