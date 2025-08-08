import { db } from "@/db/client";
import { forums, topics } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import NewTopicForm from "@/components/NewTopicForm";

export default async function ForumPage(
  { params }: { params: Promise<{ slug: string }> } // Next 15: params is a Promise
) {
  const { slug } = await params;

  // Use helper form: where(eq(table.column, value))
  const [forum] = await db
    .select()
    .from(forums)
    .where(eq(forums.slug, slug));

  if (!forum) {
    return <div style={{ padding: 24 }}>Forum not found.</div>;
  }

  const ts = await db
    .select()
    .from(topics)
    .where(eq(topics.forumId, forum.id));

  return (
    <main style={{ padding: 24 }}>
      <h2>{forum.title}</h2>
      {forum.description && <p>{forum.description}</p>}

      <NewTopicForm forumId={forum.id} />

      <ul>
        {ts.map((t) => (
          <li key={t.id}>
            <Link href={`/topic/${t.id}`}>{t.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
