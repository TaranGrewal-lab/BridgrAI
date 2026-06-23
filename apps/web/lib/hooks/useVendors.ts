"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface VendorSummary {
  id: string;
  businessName: string;
  slug: string;
  city: string;
  category: { name: string; slug: string };
  ratingAverage: string;
  ratingCount: number;
  priceRangeMin: string | null;
  subscription: { plan: string } | null;
}

export interface VendorSearchParams {
  category?: string;
  city?: string;
  rating?: string;
  q?: string;
  sort?: "rating" | "popular" | "newest" | "featured";
}

export function useVendorSearch(params: VendorSearchParams) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => Boolean(v)) as [string, string][],
  ).toString();

  return useQuery({
    queryKey: ["vendors", params],
    queryFn: () => api.get<VendorSummary[]>(`/vendors${query ? `?${query}` : ""}`),
  });
}

export interface VendorAnalyticsEntry {
  type: string;
  _count: number;
}

export function useVendorAnalytics(vendorId: string) {
  return useQuery({
    queryKey: ["vendor-analytics", vendorId],
    queryFn: () => api.get<VendorAnalyticsEntry[]>(`/vendors/${vendorId}/analytics`),
    enabled: Boolean(vendorId),
  });
}

export interface CurrentVendor extends VendorSummary {
  description: string | null;
  phone: string | null;
  email: string | null;
  websiteUrl: string | null;
  instagramUrl: string | null;
  verification: string;
}

export function useCurrentVendor() {
  return useQuery({
    queryKey: ["current-vendor"],
    queryFn: () => api.get<CurrentVendor | null>("/vendors/me"),
  });
}

export interface CreateVendorInput {
  businessName: string;
  categoryId: string;
  country: string;
  city: string;
  description?: string;
  phone?: string;
  email?: string;
  websiteUrl?: string;
  instagramUrl?: string;
}

export function useCreateVendor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateVendorInput) => api.post<CurrentVendor>("/vendors", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["current-vendor"] }),
  });
}
