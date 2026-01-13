 "use client";
 
 import { useRef, useState, useEffect } from "react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import SignupForm from "./signup-form";
import { signIn } from "next-auth/react";
import type { SignInOptions } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const AuthFlow = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [step, setStep] = useState<1 | 2>(1); // login steps: 1=email, 2=password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") ?? DEFAULT_LOGIN_REDIRECT_URL;
  const [emailValid, setEmailValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  useEffect(() => {
    setEmailValid(validateEmail(email));
    if (validateEmail(email) && step === 1) {
      const t = setTimeout(() => {
        setStep(2);
        setTimeout(() => passwordRef.current?.focus(), 50);
      }, 400);
      return () => clearTimeout(t);
    }
    if (!validateEmail(email) && step === 2) {
      setStep(1);
    }
  }, [email]);

  const goToPassword = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!emailValid) {
      toast.error("Please enter a valid email");
      return;
    }
    setStep(2);
    setTimeout(() => passwordRef.current?.focus(), 50);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    setLoading(true);
    const options: SignInOptions & Record<string, unknown> = {
      redirect: false,
      callbackUrl: callbackUrl,
      email,
      password,
    };

    const res = await signIn("credentials", options as SignInOptions);

    let message: string | null = null;
    if (res && typeof res === "object" && "error" in res && typeof res.error === "string") {
      const code = res.error;
      const friendlyMap: Record<string, string> = {
        CredentialsSignin: "Invalid email or password.",
        OAuthSignin: "Error during OAuth signin.",
        OAuthCallback: "Error during OAuth callback.",
        OAuthCreateAccount: "Error creating OAuth account.",
        EmailCreateAccount: "Error creating email account.",
        OAuthAccountNotLinked: "Account already linked with different provider.",
        SessionRequired: "Session is required.",
        AccessDenied: "Access denied.",
        Configuration: "Server configuration error.",
        Verification: "Verification failed.",
      };
      message = friendlyMap[code] ?? code;
    }

    if (message) {
      setPasswordError(message);
      toast.error(message);
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

  if (mode === "signup") {
    return (
      <div className="w-full">
        <div className="text-sm text-neutral-500 mb-2">Create an account</div>
        <SignupForm />
        <div className="mt-2 text-sm text-neutral-500">
          Already have an account?{" "}
          <button
            type="button"
            className="text-primary-600 underline"
            onClick={() => {
              setMode("login");
              setStep(1);
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {step === 1 && (
        <form onSubmit={goToPassword} className="w-full grid gap-2">
          <div className="text-sm text-neutral-500">Or sign in with email</div>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" onClick={goToPassword} disabled={!emailValid}>
            Continue
          </Button>
          <div className="my-2 border-t border-neutral-800/40" />
          <div className="text-sm text-neutral-500">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-primary-600 underline"
              onClick={() => setMode("signup")}
            >
              Create one
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleLogin} className="w-full grid gap-2">
          <div className="text-sm text-neutral-500">Sign in</div>
          <Input value={email} disabled />
          <div className="relative">
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              ref={passwordRef}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError(null);
              }}
              className={passwordError ? "border-red-500 dark:border-red-400" : ""}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-neutral-400"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Button type="button" variant="ghost" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in with email"}
            </Button>
          </div>
          <div className="my-2 border-t border-neutral-800/40" />
          <div className="text-sm text-neutral-500">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-primary-600 underline"
              onClick={() => setMode("signup")}
            >
              Create one
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AuthFlow;

