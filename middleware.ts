import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  // "/" will be accessible to all users
  publicRoutes: [
  "/",
  "/questions/:id",
  "/tags",
  "/tags/:id",
  "/profile/:id",
  "/community",
  "/jobs"
  ],
  
  ignoredRoutes: [
    "/api/chatgpt"
  ],
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};