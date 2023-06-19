import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard"],
};

export default withAuth(function middleware(req: NextRequest) {
  return NextResponse.next();
});
