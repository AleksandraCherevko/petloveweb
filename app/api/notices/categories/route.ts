import { NextResponse } from "next/server";

const API_BASE = "https://petlove.b.goit.study/api";

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/notices/categories`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}
