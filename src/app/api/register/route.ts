import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_AUTH}/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const rawCookie = response.headers.get("set-cookie");
  const res = NextResponse.json(await response.json(), {
    status: response.status,
  });

  if (rawCookie) {
    res.headers.set("Set-Cookie", rawCookie.replace(/Domain=[^;]+;/, ""));
  }
  return res;
}
