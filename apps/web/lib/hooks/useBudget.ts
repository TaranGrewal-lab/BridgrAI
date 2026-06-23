"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { BudgetItem } from "@/lib/types";

export function useBudgetItems(eventId: string) {
  return useQuery({
    queryKey: ["budget-items", eventId],
    queryFn: () => api.get<BudgetItem[]>(`/events/${eventId}/budget-items`),
    enabled: Boolean(eventId),
  });
}

export function useCreateBudgetItem(eventId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<BudgetItem>) =>
      api.post<BudgetItem>(`/events/${eventId}/budget-items`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["budget-items", eventId] }),
  });
}

export interface BudgetSummary {
  weddingId: string;
  totalEstimated: string;
  totalActual: string;
  totalDeposits: string;
  totalRemaining: string;
}

export function useBudgetSummary(weddingId: string) {
  return useQuery({
    queryKey: ["budget-summary", weddingId],
    queryFn: () => api.get<BudgetSummary>(`/weddings/${weddingId}/budget-summary`),
    enabled: Boolean(weddingId),
  });
}
