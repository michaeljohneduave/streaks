import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { Account, DefaultSession, NextAuthOptions, Profile } from "next-auth";
import { prisma } from "@/lib/db";

export const authOptions = {
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID || "",
    //   clientSecret: process.env.GITHUB_SECRET || "",
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || "",
      clientSecret: process.env.FACEBOOK_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: DefaultSession["user"];
      account: Account;
      profile: Profile;
    }): Promise<boolean> {
      // create user if not exists
      // we only check for the email and upsert accordingly
      try {
        const email = user?.email || profile.email || "";

        if (!email) {
          return false;
        }

        await prisma.user.upsert({
          where: { email: email },
          update: {},
          create: {
            email: email,
            name: profile.name || "",
          },
        });
      } catch (e) {
        console.log(e);
      }

      return true;
    },
  },
} as NextAuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
