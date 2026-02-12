import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "@/app/lib/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post("users/signin", body);

    const { token } = apiRes.data;

    const response = NextResponse.json(apiRes.data);

    response.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: false, // для localhost
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Login failed",
      },
      { status: (error as ApiError).status ?? 500 }
    );
  }
}
