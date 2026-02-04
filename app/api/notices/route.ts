import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") ?? "1";
  const perPage = searchParams.get("perPage") ?? "6";
  const query = searchParams.get("query") ?? "";

  try {
    const res = await axios.get("https://petlove.b.goit.study/api/notices", {
      params: {
        page,
        perPage,
        ...(query ? { query } : {}),
      },
    });

    return NextResponse.json(res.data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch notices" },
      { status: 500 },
    );
  }
}
