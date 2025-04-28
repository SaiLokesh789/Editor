import { getCurrentUser } from "@/auth/nextjs/currentUser";

export async function SignedIn({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  if (currentUser === null) {
    return null;
  }
  return <div>{children}</div>;
}

export async function SignedOut({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  if (currentUser !== null) {
    return null;
  }
  return <div>{children}</div>;
}
