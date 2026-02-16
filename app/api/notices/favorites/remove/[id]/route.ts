import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://petlove.b.goit.study/api";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${API_BASE}/notices/favorites/remove/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) return NextResponse.json(data, { status: res.status });

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}
