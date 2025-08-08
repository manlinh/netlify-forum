import { db } from "@/db/client";
import { posts, topics } from "@/db/schema";
import { eq } from "drizzle-orm";
import NewPostForm from "@/components/NewPostForm";

export default async function TopicPage(
  { params }: { params: Promise<{ id: string }> }  // Next 15: params is a Promise
) {
  const { id } = await params;
  const topicId = Number(id);

  const [topic] = await db
    .select()
    .from(topics)
    .where(eq(topics.id, topicId));

  if (!topic) return <div style={{ padding: 24 }}>Topic not found.</div>;

  const ps = await db
    .select()
    .from(posts)
    .where(eq(posts.topicId, topicId));

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
