/**
 * Exports NextAuth middleware and configures it to handle auth 
* for the /dashboard/:path* and / routes.
*/
export { default } from 'next-auth/middleware'

export const config = { matcher: ['/dashboard/:path*', '/'] }