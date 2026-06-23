"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface WeddingWebsite {
  id: string;
  weddingId: string;
  subdomain: string;
  customDomain: string | null;
  theme: string;
  storyContent: string | null;
  venueInfo: string | null;
  mapEmbedUrl: string | null;
  registryLinks: Record<string, unknown> | null;
  accommodation: string | null;
  isPublished: boolean;
}

export function useWebsite(weddingId: string) {
  return useQuery({
    queryKey: ["website", weddingId],
    queryFn: () => api.get<WeddingWebsite>(`/weddings/${weddingId}/website`),
    enabled: Boolean(weddingId),
  });
}

export function useUpdateWebsite(weddingId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<WeddingWebsite>) =>
      api.patch<WeddingWebsite>(`/weddings/${weddingId}/website`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["website", weddingId] }),
  });
}
