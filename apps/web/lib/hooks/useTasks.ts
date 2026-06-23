"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Task {
  id: string;
  weddingId: string;
  title: string;
  notes: string | null;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "TODO" | "IN_PROGRESS" | "DONE";
  dueDate: string | null;
}

export function useTasks(weddingId: string) {
  return useQuery({
    queryKey: ["tasks", weddingId],
    queryFn: () => api.get<Task[]>(`/weddings/${weddingId}/tasks`),
    enabled: Boolean(weddingId),
  });
}

export function useCreateTask(weddingId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Task>) => api.post<Task>(`/weddings/${weddingId}/tasks`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks", weddingId] }),
  });
}

export function useUpdateTask(weddingId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) => api.patch<Task>(`/tasks/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks", weddingId] }),
  });
}
