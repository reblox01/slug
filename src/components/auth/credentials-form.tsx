"use client";

import { useState } from "react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { signIn } from "next-auth/react";
import type { SignInOptions } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { toast } from "sonner";

const CredentialsForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") ?? DEFAULT_LOGIN_REDIRECT_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const options = {
        redirect: false,
        callbackUrl,
        // credentials are sent alongside options for credentials provider
        email,
        password,
      } as unknown as SignInOptions;

      const res = await signIn("credentials", options);

      if (res && "error" in res && res.error) {
        toast.error(res.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      router.push(callbackUrl);
    } catch (err) {
      toast.error("An error occurred while signing in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full grid gap-2">
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign in with email"}
      </Button>
    </form>
  );
};

export default CredentialsForm;

