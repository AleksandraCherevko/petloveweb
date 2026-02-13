import { NextResponse } from "next/server";

const BASE_URL = "https://petlove.b.goit.study/api";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const res = await fetch(`${BASE_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("LOGIN RESPONSE:", data);

    if (!res.ok) {
      return NextResponse.json(
        { message: data.message || "Login failed" },
        { status: res.status },
      );
    }

    if (!data.token) {
      return NextResponse.json(
        { message: "No token received" },
        { status: 500 },
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("accessToken", data.token, {
      httpOnly: true,
      secure: false, // обязательно для localhost
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
