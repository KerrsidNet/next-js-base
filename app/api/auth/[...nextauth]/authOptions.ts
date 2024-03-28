import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from 'bcrypt'
import prisma from "@/lib/prisma";

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, req) {
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
                        throw new Error("User account not found!");
                    }

                    const passwordMatch = await compare(credentials?.password || "", user.password);

                    if (!passwordMatch) {
                        throw new Error("Wrong email or password!");
                    }
                    return {
                        id: user.id,
                        email: user.email,
                        role: user?.role,
                    };
                } catch (error: any) {
                    console.error("Authorization error: ", error?.message || '');
                    return { error: error?.message || '' } as any;
                }
            },
        }),
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
        async signIn({ user, account, profile, email, credentials }: any) {
            if (user?.error) {
                throw new Error(user?.error || "");
            }
            return true;
        },

        async jwt({ token, user }: any) {
            if (user) {
                const newToken = {
                    ...token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                };
                return newToken;
            } else {
                return token;
            }
        },

        async session({ session, token }: any) {
            const newSession = {
                ...session,
                user: {
                    id: token?.user.id ?? 'test',
                    name: token?.user.name ?? 'test',
                    email: token?.user.email ?? 'test',
                    role: token?.user?.role ?? null,
                },
            };
            return newSession;
        },
    }
};


export default authOptions;