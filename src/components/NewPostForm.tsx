"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPostForm({ topicId }: { topicId: number }) {
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        const res = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topicId, content }),
        });
        setBusy(false);
        if (res.ok) { setContent(""); router.refresh(); }
        else { alert("Failed to post"); }
      }}
    >
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write something…" />
      <button disabled={busy || !content.trim()}>{busy ? "Posting…" : "Post"}</button>
    </form>
  );
}
