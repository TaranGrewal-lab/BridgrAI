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

export interface PublicWeddingEvent {
  id: string;
  name: string;
  date: string | null;
  side: string;
}

export interface PublicWeddingSite extends WeddingWebsite {
  wedding: {
    brideName: string | null;
    groomName: string | null;
    weddingDate: string | null;
    city: string | null;
    country: string | null;
    coverImageUrl: string | null;
    events: PublicWeddingEvent[];
  };
}

export function usePublicWebsite(subdomain: string) {
  return useQuery({
    queryKey: ["public-website", subdomain],
    queryFn: () => api.get<PublicWeddingSite>(`/public/w/${subdomain}`),
    enabled: Boolean(subdomain),
    retry: false,
  });
}

export interface RsvpInput {
  guestName: string;
  email?: string;
  phone?: string;
  eventIds: string[];
  rsvpStatus: "ATTENDING" | "DECLINED";
  plusOnes?: number;
  mealPreference?: string;
}

export function useSubmitRsvp(subdomain: string) {
  return useMutation({
    mutationFn: (data: RsvpInput) => api.post(`/public/w/${subdomain}/rsvp`, data),
  });
}
