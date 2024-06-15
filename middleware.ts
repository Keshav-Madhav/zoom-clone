import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req)=>{
  if(protectedRoutes(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

const protectedRoutes = createRouteMatcher([
  '/',
  '/upcoming',
  '/previous',
  '/account',
  '/personal-room',
  '/meeting(.*)',
]);