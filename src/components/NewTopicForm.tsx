"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewTopicForm({ forumId }: { forumId: number }) {
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        const res = await fetch("/api/topics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ forumId, title }),
        });
        setBusy(false);
        if (res.ok) { setTitle(""); router.refresh(); }
        else { alert("Failed to create topic"); }
      }}
    >
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New topic title" />
      <button disabled={busy || !title.trim()}>{busy ? "Creating…" : "Create Topic"}</button>
    </form>
  );
}
