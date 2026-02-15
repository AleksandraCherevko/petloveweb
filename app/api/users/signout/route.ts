import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://petlove.b.goit.study/api";

export async function POST(req: NextRequest) {
  try {
    const token =
      req.cookies.get("token")?.value ?? req.cookies.get("accessToken")?.value;

    if (token) {
      await fetch(`${API_BASE}/users/signout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set("token", "", { path: "/", maxAge: 0 });
    response.cookies.set("accessToken", "", { path: "/", maxAge: 0 });
    return response;
  } catch {
    const response = NextResponse.json({ ok: true });
    response.cookies.set("token", "", { path: "/", maxAge: 0 });
    response.cookies.set("accessToken", "", { path: "/", maxAge: 0 });
    return response;
  }
}
