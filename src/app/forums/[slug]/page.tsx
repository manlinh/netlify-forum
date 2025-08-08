import { db } from "@/db/client";
import { forums, topics } from "@/db/schema";
import Link from "next/link";
import NewTopicForm from "@/components/NewTopicForm";

export default async function ForumPage(
  { params }: { params: Promise<{ slug: string }> }  // <- params is a Promise now
) {
  const { slug } = await params;                      // <- await it

  const [forum] = await db.select().from(forums).where((f, { eq }) => eq(f.slug, slug));
  if (!forum) return <div style={{ padding: 24 }}>Forum not found.</div>;

  const ts = await db.select().from(topics).where((t, { eq }) => eq(t.forumId, forum.id));

  return (
    <main style={{ padding: 24 }}>
      <h2>{forum.title}</h2>
      <p>{forum.description}</p>
      <NewTopicForm forumId={forum.id} />
      <ul>
        {ts.map((t) => (
          <li key={t.id}><Link href={`/topic/${t.id}`}>{t.title}</Link></li>
        ))}
      </ul>
    </main>
  );
}
