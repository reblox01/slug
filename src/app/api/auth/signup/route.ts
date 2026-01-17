import { type NextRequest, NextResponse } from "next/server";
import { createUserWithPassword } from "@/server/actions/auth";
import { rateLimiter } from "@/utils/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    try {
      await rateLimiter.check(5, ip); // 5 signups per minute per IP
    } catch {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { email, password, name } = body as {
      email?: string;
      password?: string;
      name?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password." },
        { status: 400 },
      );
    }

    const result = await createUserWithPassword({ email, password, name });

    if (result?.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    if (!result?.user) {
      return NextResponse.json(
        { error: "Failed to create user." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      user: { id: result.user.id, email: result.user.email },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

