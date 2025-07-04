import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("token")?.value;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboar"],
};
