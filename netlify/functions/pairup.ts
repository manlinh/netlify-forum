import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../../src/db/schema";

// Runs daily at 02:00 UTC (10:00 Taipei)
export const config = { schedule: "0 2 * * *" } as const;

export default async function handler() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  // Users who opted in
  const users = await db
    .select()
    .from(schema.profiles)
    .where(eq(schema.profiles.optInPair, true));

  // Pair: user0-user1, user2-user3, ...
  const pairs: { userA: string; userB: string }[] = [];
  for (let i = 0; i + 1 < users.length; i += 2) {
    pairs.push({ userA: users[i].userId, userB: users[i + 1].userId });
  }

  if (pairs.length) {
    await db.insert(schema.matches).values(
      pairs.map((p) => ({
        userA: p.userA,
        userB: p.userB,
        score: 1,
        status: "proposed",
      })),
    );
  }

  return new Response(`paired ${pairs.length} pairs`);
}
