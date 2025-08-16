import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const publicRoute = ["/dashboard", "/create", "/my-blogs"];
  const privateRoute = ["/login", "/register"];
  const route = request.nextUrl.pathname;

  if (token && privateRoute.includes(route)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && publicRoute.includes(route)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/create", "/login", "/register", "/my-blogs" , "/"],
};
