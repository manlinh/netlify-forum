import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db/client";
import { forums, topics, posts } from "@/db/schema";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return <div style={{ padding: 24 }}>Admins only.</div>;

  const [fs, ts, ps] = await Promise.all([
    db.select().from(forums),
    db.select().from(topics),
    db.select().from(posts),
  ]);

  return (
    <main style={{ padding: 24 }}>
      <h2>Admin</h2>
      <h3>Forums</h3>
      <pre>{JSON.stringify(fs, null, 2)}</pre>
      <h3>Topics</h3>
      <pre>{JSON.stringify(ts, null, 2)}</pre>
      <h3>Posts</h3>
      <pre>{JSON.stringify(ps, null, 2)}</pre>
      <p>(Wire React-Admin later for full CRUD UX.)</p>
    </main>
  );
}
