"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Guest {
  id: string;
  weddingId: string;
  name: string;
  phone: string | null;
  email: string | null;
  relationship: string | null;
  side: "BRIDE" | "GROOM" | "SHARED";
  invites: { eventId: string; isInvited: boolean; rsvpStatus: string }[];
}

export function useGuests(weddingId: string) {
  return useQuery({
    queryKey: ["guests", weddingId],
    queryFn: () => api.get<Guest[]>(`/weddings/${weddingId}/guests`),
    enabled: Boolean(weddingId),
  });
}

export function useCreateGuest(weddingId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Guest>) => api.post<Guest>(`/weddings/${weddingId}/guests`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["guests", weddingId] }),
  });
}

export function useAssignGuestToEvent(weddingId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, guestId }: { eventId: string; guestId: string }) =>
      api.post(`/events/${eventId}/invites`, { guestId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["guests", weddingId] }),
  });
}

export function useUpdateInvite(weddingId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ inviteId, data }: { inviteId: string; data: Record<string, unknown> }) =>
      api.patch(`/invites/${inviteId}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["guests", weddingId] }),
  });
}
