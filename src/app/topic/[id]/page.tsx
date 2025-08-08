import { db } from "@/db/client";
import { posts, topics } from "@/db/schema";
import NewPostForm from "@/components/NewPostForm";

export default async function TopicPage(
  { params }: { params: Promise<{ id: string }> }   // <- params is a Promise
) {
  const { id } = await params;                       // <- await it
  const topicId = Number(id);

  const [topic] = await db.select().from(topics).where((t, { eq }) => eq(t.id, topicId));
  if (!topic) return <div style={{ padding: 24 }}>Topic not found.</div>;

  const ps = await db.select().from(posts).where((p, { eq }) => eq(p.topicId, topicId));

  return (
    <main style={{ padding: 24 }}>
      <h2>{topic.title}</h2>
      <NewPostForm topicId={topicId} />
      <ul>
        {ps.map((p) => (
          <li key={p.id} dangerouslySetInnerHTML={{ __html: p.content }} />
        ))}
      </ul>
    </main>
  );
}
