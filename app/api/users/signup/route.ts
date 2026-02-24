import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://petlove.b.goit.study/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(`${API_BASE}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

  
    const token = data?.token;
    const response = NextResponse.json(data);

    if (token) {
      response.cookies.set("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    }

    return response;
  } catch {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
