import type { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/client";
import * as authSchema from "@/db/auth-schema";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db, {
    usersTable: authSchema.users,
    accountsTable: authSchema.accounts,
    sessionsTable: authSchema.sessions,
    verificationTokensTable: authSchema.verificationTokens,
    authenticatorsTable: authSchema.authenticators,
  }) as Adapter,
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER!,
      from: process.env.EMAIL_FROM!,
    }),
  ],
  session: { strategy: "database" },
  trustHost: true,
  debug: false,
};
