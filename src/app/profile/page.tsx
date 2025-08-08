import { db } from "@/db/client";
import { profiles } from "@/db/schema";
import { auth } from "@/auth";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) return <div style={{ padding: 24 }}>Please sign in.</div>;

  const userId = session.user.id;
  const [p] = await db.select().from(profiles).where((pr, { eq }) => eq(pr.userId, userId));

  return (
    <main style={{ padding: 24 }}>
      <h2>Profile</h2>
      <pre>{JSON.stringify(p ?? { userId, optInPair: false }, null, 2)}</pre>
      <p>(Implement client forms to update bio/interests and toggle opt-in.)</p>
    </main>
  );
}
