import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/auth";
import sanitizeHtml from "sanitize-html";

const PostCreate = z.object({
  topicId: z.number(),
  content: z.string().min(1).max(8000),
});

export async function GET(req: NextRequest) {
  const topicId = Number(new URL(req.url).searchParams.get("topicId"));
  if (!Number.isFinite(topicId)) {
    return NextResponse.json({ error: "topicId required" }, { status: 400 });
  }

  const data = await db
    .select()
    .from(posts)
    .where(eq(posts.topicId, topicId));

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = PostCreate.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const clean = sanitizeHtml(parsed.data.content, {
    allowedTags: ["b", "i", "em", "strong", "a", "code", "pre", "p", "ul", "ol", "li", "br"],
    allowedAttributes: { a: ["href", "rel", "target"] },
  });

  const [inserted] = await db
    .insert(posts)
    .values({
      topicId: parsed.data.topicId,
      content: clean,
      authorId: session.user.id,
    })
    .returning();

  return NextResponse.json(inserted);
}
