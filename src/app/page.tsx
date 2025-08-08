import { db } from "@/db/client";
import { forums } from "@/db/schema";
import Link from "next/link";

export default async function Home() {
  const fs = await db.select().from(forums);
  return (
    <main style={{ padding: 24 }}>
      <h1>Netlify Forum Starter</h1>
      <p>Pick a forum:</p>
      <ul>
        {fs.map((f) => (
          <li key={f.id}><Link href={`/forums/${f.slug}`}>{f.title}</Link></li>
        ))}
      </ul>
      <p style={{ marginTop: 24 }}>
        Tip: Seed one forum by POSTing to <code>/api/forums</code> with <code>{'{"slug":"general","title":"General"}'}</code>
      </p>
    </main>
  );
}
