import { NextRequest, NextResponse } from "next/server";
import { createUserWithPassword } from "@/server/actions/auth";

export async function POST(request: NextRequest) {
  try {
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

