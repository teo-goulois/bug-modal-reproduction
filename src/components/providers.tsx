"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";
import { useRouter } from "next/navigation";
import { RouterProvider } from "react-aria-components";
import { useState } from "react";

declare module "react-aria-components" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider navigate={router.push}>
        <ThemeProvider enableSystem attribute="class">
          {children}
        </ThemeProvider>
      </RouterProvider>
    </QueryClientProvider>
  );
}
