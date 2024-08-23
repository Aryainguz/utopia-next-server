import { NextRequest, NextResponse } from "next/server";

const VALID_API_KEY = process.env.API_KEY 

export function middleware(req: NextRequest) {
    
  if (req.nextUrl.pathname.startsWith("/api/v1")) {
    const authorizationHeader = req.headers.get("authorization");

    // Check if the Authorization header is missing or doesn't start with Bearer
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const token = authorizationHeader.split("Bearer ")[1];

    if (token !== VALID_API_KEY) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }

  const res = NextResponse.next();

  // Set Cache-Control header to prevent caching
  res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0');

  // Optionally, add other headers for legacy cache control
  res.headers.set('Pragma', 'no-cache');
  res.headers.set('Expires', '0');

  return res;
}
