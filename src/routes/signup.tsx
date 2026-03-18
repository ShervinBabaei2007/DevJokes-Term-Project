import { AuthForm } from "#/components/AuthForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  return (
    <main className="mx-auto w-full max-w-[72rem] px-4 pb-12 pt-10 sm:pt-14">
      <AuthForm mode="signup" />
    </main>
  );
}
