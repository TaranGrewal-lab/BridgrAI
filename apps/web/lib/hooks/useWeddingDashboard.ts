"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface WeddingDashboard {
  wedding: { id: string; totalBudget: string; weddingDate: string | null };
  widgets: {
    weddingProgress: number;
    budgetUsed: string;
    totalBudget: string;
    guestCount: number;
    upcomingEvents: number;
    tasksRemaining: number;
    savedVendorsCount: number;
    countdownDays: number | null;
  };
}

export function useWeddingDashboard(weddingId: string) {
  return useQuery({
    queryKey: ["wedding-dashboard", weddingId],
    queryFn: () => api.get<WeddingDashboard>(`/weddings/${weddingId}/dashboard`),
    enabled: Boolean(weddingId),
  });
}
