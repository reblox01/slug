 "use client";
 
 import { useState } from "react";
 import { Input } from "@/ui/input";
 import { Button } from "@/ui/button";
 import { signIn } from "next-auth/react";
 import type { SignInOptions } from "next-auth/react";
 import { useRouter, useSearchParams } from "next/navigation";
 import { toast } from "sonner";
 import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? DEFAULT_LOGIN_REDIRECT_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error ?? "Unable to create account");
        setLoading(false);
        return;
      }

      // Automatically sign in the user after signup
      const options: SignInOptions & Record<string, unknown> = {
        redirect: false,
        email,
        password,
        callbackUrl,
      };

      const signInRes = await signIn("credentials", options as SignInOptions);

      if (
        signInRes &&
        typeof signInRes === "object" &&
        "error" in signInRes &&
        typeof signInRes.error === "string"
      ) {
        toast.error(signInRes.error || "Account created but failed to sign in");
        setLoading(false);
        return;
      }

      router.push(callbackUrl);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full grid gap-2">
      <Input
        placeholder="Full name (optional)"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        {loading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
};

export default SignupForm;

