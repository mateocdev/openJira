// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/entries/")) {
    const id = req.nextUrl.pathname.split("/").pop() || "";
    const checkMongoIDRegex = new RegExp("^[0-9a-fA-F]{24}$");
    if (!checkMongoIDRegex.test(id)) {
      const url = req.nextUrl.clone();
      url.pathname = "/api/bad-request";
      url.search = `?message=${id} is not a valid ID`;
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/entries/:path*"],
};
