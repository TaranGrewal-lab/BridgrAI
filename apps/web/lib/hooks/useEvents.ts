"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Event, ChecklistItem } from "@/lib/types";

export function useEvents(weddingId: string) {
  return useQuery({
    queryKey: ["events", weddingId],
    queryFn: () => api.get<Event[]>(`/weddings/${weddingId}/events`),
    enabled: Boolean(weddingId),
  });
}

export function useCreateEvent(weddingId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Event>) => api.post<Event>(`/weddings/${weddingId}/events`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events", weddingId] }),
  });
}

export function useApplyEventTemplate(eventId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.post<ChecklistItem[]>(`/events/${eventId}/template`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["checklist", eventId] }),
  });
}

export function useChecklist(eventId: string) {
  return useQuery({
    queryKey: ["checklist", eventId],
    queryFn: () => api.get<ChecklistItem[]>(`/events/${eventId}/checklist`),
    enabled: Boolean(eventId),
  });
}
