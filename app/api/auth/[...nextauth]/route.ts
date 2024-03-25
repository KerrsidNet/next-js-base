import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from 'bcrypt'
import prisma from "@/utils/prismaClient";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: AuthOptions = {
    // adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Missing required fields!");
                    }

                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials?.email,
                        },
                        include: {
                            role: true,
                        }
                    }).finally(() => {
                        prisma.$disconnect();
                    });

                    if (!user) {
                        throw new Error("Wrong email or password!");
                    }

                    const passwordMatch = await compare(credentials?.password || "", user.password);

                    if (!passwordMatch) {
                        throw new Error("Wrong email or password!");
                    }
                    return {
                        id: user.id,
                        email: user.email,
                        role: user?.role,
                    }
                } catch (error: any) {
                    console.error("Authorization error: ", error?.message || '');
                    return { error: error?.message || '' };
                }
            },
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const newToken = {
                    ...token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                }
                return newToken;
            } else {
                return token;
            }
        },
        async session({ session, token }) {
            const newSession = {
                ...session,
                user: {
                    id: token?.user.id ?? 'test',
                    name: token?.user.name ?? 'test',
                    email: token?.user.email ?? 'test',
                    role: token?.user?.role ?? null,
                },
            }
            return newSession;
        },
    }
}

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST }