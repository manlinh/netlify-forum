import type { Config } from "@netlify/functions";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../../src/db/schema";

export const config: Config = { schedule: "0 2 * * *" }; // 02:00 UTC = 10:00 Taipei

export default async () => {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });
  const users = await db.select().from(schema.profiles).where((p, { eq }) => eq(p.optInPair, true));
  const pairs: { userA: string; userB: string }[] = [];
  for (let i = 0; i + 1 < users.length; i += 2) pairs.push({ userA: users[i].userId, userB: users[i + 1].userId });
  if (pairs.length) await db.insert(schema.matches).values(pairs.map((p) => ({ userA: p.userA, userB: p.userB, score: 1, status: "proposed" })));
  return new Response(`paired ${pairs.length} pairs`);
};
