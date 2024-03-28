import NextAuth from "next-auth";
import authOptions from "./authOptions";


/**
 * AuthOptions for NextAuth.js authentication.
 * 
 * Defines the authentication providers, session strategy, callbacks, 
 * and other options for authentication in the app.
 * 
 * The main provider is CredentialsProvider which handles email/password login.
 * It authorizes against the database with Prisma and returns user details.
 * 
 * JWT is used for sessions with user details encoded in the token.
 * 
 * Callbacks handle logic on signin, serializing the JWT, and populating the session.
 * 
 * Secret and other config is loaded from environment variables.
 * 
 * Exported as the main authOptions constant to pass to NextAuth initialization.
 */


const handler = NextAuth(authOptions);


export { handler as GET, handler as POST }