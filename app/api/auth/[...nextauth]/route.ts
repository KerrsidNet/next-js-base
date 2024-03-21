import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from 'bcrypt'
import prisma from "@/utils/prismaClient";


const credentialsProvider = CredentialsProvider({
    name: "Credentials",
    credentials: {
        email: {},
        password: {},
    },
    async authorize(credentials) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: credentials?.email,
                },
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
            };
        } catch (error: any) {
            console.error("Authorization error: ", error?.message || '');
            return { error: error?.message || '' };
        }
    },
});

const handler = NextAuth({
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: "/login",
    },
    providers: [credentialsProvider],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (user?.error) {
                throw new Error(user?.error || "");
            }
            return true
        }
    }
});


export { handler as GET, handler as POST }