"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface GalleryImage {
  id: string;
  category: string;
  imageUrl: string;
  caption: string | null;
  vendorId: string | null;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  coverImage: string | null;
  publishedAt: string | null;
}

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  content: string;
}

export interface VendorCategory {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
}

export function useGalleryImages(category?: string) {
  return useQuery({
    queryKey: ["gallery-images", category],
    queryFn: () => api.get<GalleryImage[]>(`/gallery${category ? `?category=${category}` : ""}`),
  });
}

export function useCreateGalleryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<GalleryImage>) => api.post<GalleryImage>("/admin/gallery", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-images"] }),
  });
}

export function useDeleteGalleryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/admin/gallery/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-images"] }),
  });
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ["blog-posts"],
    queryFn: () => api.get<BlogPost[]>("/blog"),
  });
}

export function useCreateBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<BlogPost>) => api.post<BlogPost>("/admin/blog", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blog-posts"] }),
  });
}

export function usePublishBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/admin/blog/${id}/publish`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blog-posts"] }),
  });
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/admin/blog/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blog-posts"] }),
  });
}

export function useCmsPages() {
  return useQuery({
    queryKey: ["cms-pages"],
    queryFn: () => api.get<CmsPage[]>("/admin/cms-pages"),
  });
}

export function useUpdateCmsPage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: Partial<CmsPage> }) =>
      api.patch<CmsPage>(`/admin/cms-pages/${slug}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cms-pages"] }),
  });
}

export function useVendorCategories() {
  return useQuery({
    queryKey: ["vendor-categories"],
    queryFn: () => api.get<VendorCategory[]>("/vendor-categories"),
  });
}

export function useCreateVendorCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<VendorCategory>) => api.post<VendorCategory>("/admin/vendor-categories", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vendor-categories"] }),
  });
}

export function useDeleteVendorCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/admin/vendor-categories/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vendor-categories"] }),
  });
}
