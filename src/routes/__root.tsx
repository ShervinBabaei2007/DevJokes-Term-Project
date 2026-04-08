import type { auth } from "#/lib/auth";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import appCss from "../styles.css?url";

// Extracting types from Better Auth
type Session = typeof auth.$Infer.Session;
type User = Session["user"];

export interface MyRouterContext {
  queryClient: QueryClient;
  user: User | null;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DevJokes" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen antialiased wrap-anywhere">
        <Header />
        <Outlet />
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}
