import Google from "next-auth/providers/google"
import type { NextAuthConfig } from 'next-auth';
import Credentials from "next-auth/providers/credentials"
import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
import { z } from "zod";

export const authConfig = { 
  
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },

  providers: [
    Google,

    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);
 
        if (!parsedCredentials.success) {
          throw new Error("Invalid credentials.");

        }

        const { email, password } = parsedCredentials.data;
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("Invalid credentials.")
        }

        if (!user.password) {
          throw new Error("Invalid credentials.")
        }

        const passwordMatch = await bcryptjs.compare(password, user.password)

        if (!passwordMatch) {
          throw new Error("Invalid credentials.")
        }

        const { password: _, ...userWithoutPassword } = user // eslint-disable-line

        return userWithoutPassword;

      },
    }),
  ],
  
} satisfies NextAuthConfig;