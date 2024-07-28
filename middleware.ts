import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define specific routes that need protection
const isProtectedRoute = createRouteMatcher([
  "/checkout",
  "/account",
  "/orders",
]);

export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) {
    auth().protect(); // Protect only the defined routes
  }

  return NextResponse.next(); // Allow access to other routes
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
