import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logout successful" }, { status: 200 });


  res.headers.set(
    "Set-Cookie",
    "token=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0"
  );
  

  return res;
}
