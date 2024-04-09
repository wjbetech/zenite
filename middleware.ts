import { authMiddleware } from "@clerk/nextjs";

// publicRoutes sets bypass for auth
// TODO: only serve main content when user is authenticated
export default authMiddleware({});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
