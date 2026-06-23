"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Wedding {
  id: string;
  brideName: string | null;
  groomName: string | null;
  weddingDate: string | null;
  country: string | null;
  city: string | null;
  totalBudget: string;
  currency: string;
  slug: string;
}

export function useCurrentWedding() {
  return useQuery({
    queryKey: ["current-wedding"],
    queryFn: () => api.get<Wedding | null>("/weddings/me"),
  });
}

export function useCreateWedding() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Wedding>) => api.post<Wedding>("/weddings", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["current-wedding"] }),
  });
}
