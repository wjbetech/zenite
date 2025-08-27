import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in", "/sign-up"]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    // `auth` is the middleware auth handler object provided by Clerk.
    // Call the `protect` method directly instead of invoking auth as a function.
    auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
