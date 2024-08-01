import NextAuth, { type DefaultSession } from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"
import { UserRole } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"

// export type ExtendedUser = DefaultSession["user"] & {
//     role: "ADMIN" | "USER"
// }

// declare module "next-auth" {
//     /***
//      * 
//      */
//     interface Session {
//         user: ExtendedUser;
//     }
// }


export const {
    auth,
    handlers: { GET, POST },
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            // Allow OAuth without email verification.
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id || "");

            if (!existingUser?.emailVerified) return false;

            // TODO: Add 2FA check.
            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                console.log({
                    twoFactorConfirmation,
                })
                if (!twoFactorConfirmation) return false;

                // Delete two factor confirmation for next sign in.
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                });
            }

            return true
        },
        async session({ token, session }) {
            // console.log(token)
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as any;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})