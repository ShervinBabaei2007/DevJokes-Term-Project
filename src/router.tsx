import { MutationCache, QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen";
import { type MyRouterContext } from "./routes/__root";

export function getRouter() {
  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onSuccess: async () => {
        await queryClient.invalidateQueries();
      },
    }),
  });

  const router = createTanStackRouter({
    routeTree,
    context: {
      queryClient,
      user: null,
    } as MyRouterContext,
    scrollRestoration: true,
    defaultPreload: false,
    defaultPreloadStaleTime: 0,
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
