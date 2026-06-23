"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface AdminVendor {
  id: string;
  businessName: string;
  category: { name: string };
  verification: "VERIFIED" | "REJECTED" | "PENDING" | "UNVERIFIED";
  isFeatured: boolean;
  subscription: { plan: string } | null;
}

export interface AdminReview {
  id: string;
  rating: number;
  body: string;
  vendor: { businessName: string };
  user: { email: string };
}

export interface AdminAnalyticsOverview {
  weddings: number;
  vendors: number;
  paidVendors: number;
}

export function useAdminAnalyticsOverview() {
  return useQuery({
    queryKey: ["admin-analytics-overview"],
    queryFn: () => api.get<AdminAnalyticsOverview>("/admin/analytics/overview"),
  });
}

export function useAdminVendors() {
  return useQuery({
    queryKey: ["admin-vendors"],
    queryFn: () => api.get<AdminVendor[]>("/admin/vendors"),
  });
}

export function useVerifyVendor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, verification }: { id: string; verification: AdminVendor["verification"] }) =>
      api.patch(`/admin/vendors/${id}/verify`, { verification }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-vendors"] }),
  });
}

export function useFeatureVendor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isFeatured }: { id: string; isFeatured: boolean }) =>
      api.patch(`/admin/vendors/${id}/feature`, { isFeatured }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-vendors"] }),
  });
}

export function useAdminReviews() {
  return useQuery({
    queryKey: ["admin-reviews"],
    queryFn: () => api.get<AdminReview[]>("/admin/reviews"),
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/admin/reviews/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-reviews"] }),
  });
}
