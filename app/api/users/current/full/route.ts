import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://petlove.b.goit.study/api";

export async function GET(req: NextRequest) {
  try {
    const token =
      req.cookies.get("token")?.value ?? req.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${API_BASE}/users/current/full`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      const out = NextResponse.json(data, { status: res.status });
      if (res.status === 401) {
        out.cookies.set("token", "", { path: "/", maxAge: 0 });
        out.cookies.set("accessToken", "", { path: "/", maxAge: 0 });
      }
      return out;
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}
