"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { setApiTokenGetter } from "@/lib/api";

function ClerkApiTokenSync() {
  const { getToken } = useAuth();

  useEffect(() => {
    setApiTokenGetter(() => getToken());
    return () => setApiTokenGetter(null);
  }, [getToken]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 30_000, refetchOnWindowFocus: false } },
  }));

  return (
    <QueryClientProvider client={client}>
      <ClerkApiTokenSync />
      {children}
    </QueryClientProvider>
  );
}
