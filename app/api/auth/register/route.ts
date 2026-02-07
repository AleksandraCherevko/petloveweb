import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { ApiError } from "@/app/lib/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Проксируем запрос к внешнему API
    const apiRes = await axios.post(
      "https://petlove.b.goit.study/api/users/signup",
      body,
      {
        withCredentials: true,
      },
    );

    const res = NextResponse.json(apiRes.data);

    if (apiRes.data.token) {
      res.cookies.set("accessToken", apiRes.data.token, {
        httpOnly: true,
        path: "/",
      });
    }

    return res;
  } catch (error: unknown) {
    const err = error as ApiError;
    return NextResponse.json(
      {
        error:
          err.response?.data?.error || (err as Error).message || "Server error",
      },
      { status: err.response?.status || 500 },
    );
  }
}
