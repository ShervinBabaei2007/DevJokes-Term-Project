import { AuthForm } from "#/components/AuthForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signin")({
  component: SigninPage,
});

function SigninPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-10 sm:pt-14">
      <AuthForm mode="signin" />
    </main>
  );
}
