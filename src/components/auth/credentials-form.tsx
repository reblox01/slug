"use client";

import { useState, useEffect } from "react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { signIn } from "next-auth/react";
import type { SignInOptions } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { toast } from "sonner";
import { cn } from "@/utils";

const CredentialsForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [formError, setFormError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") ?? DEFAULT_LOGIN_REDIRECT_URL;

  useEffect(() => {
    if (lockoutTime <= 0) return;

    const interval = setInterval(() => {
      setLockoutTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutTime]);

  useEffect(() => {
    if (lockoutTime === 0 && formError?.includes("Too many failed attempts")) {
      setFormError(null);
    }
  }, [lockoutTime, formError]);

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
        // NextAuth v5 might return "CredentialsSignin" or the code
        if (res.error === "rate-limit" || res.error === "CredentialsSignin") {
          // Note: Since we can't easily get the exact remaining time from the server response here without a custom API,
          // we default to 60s when we hit the rate limit error.
          setLockoutTime(60);
          setFormError("Too many failed attempts. Please try again in 60 seconds.");
          toast.error("Too many failed attempts.");
        } else {
          setFormError("Invalid email or password");
          toast.error("Invalid email or password");
        }
        setLoading(false);
        return;
      }

      setFormError(null);

      router.push(callbackUrl);
    } catch (err) {
      toast.error("An error occurred while signing in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full grid gap-2">
      <div className="grid gap-2">
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading || lockoutTime > 0}
          className={cn(formError && "border-red-500 focus-visible:ring-red-500")}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading || lockoutTime > 0}
          className={cn(formError && "border-red-500 focus-visible:ring-red-500")}
        />
        {formError && (
          <p className="text-xs font-medium text-red-500">
            {lockoutTime > 0
              ? `Too many failed attempts. Please try again in ${lockoutTime} seconds.`
              : formError}
          </p>
        )}
      </div>
      <Button
        type="submit"
        disabled={loading || lockoutTime > 0}
        variant={lockoutTime > 0 ? "secondary" : "default"}
      >
        {loading ? "Signing in..." : lockoutTime > 0 ? `Locked (${lockoutTime}s)` : "Sign in"}
      </Button>
    </form>
  );
};

export default CredentialsForm;

