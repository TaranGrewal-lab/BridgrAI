import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ivory px-6 py-16">
      <SignUp path="/signup" signInUrl="/login" fallbackRedirectUrl="/onboarding" />
    </main>
  );
}
