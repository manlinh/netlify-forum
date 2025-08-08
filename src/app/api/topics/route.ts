import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { topics } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/auth";

const TopicCreate = z.object({ forumId: z.number(), title: z.string().min(1) });

export async function GET(req: NextRequest) {
  const forumId = Number(new URL(req.url).searchParams.get("forumId"));
  const data = Number.isFinite(forumId)
    ? await db.select().from(topics).where(eq(topics.forumId, forumId))
    : await db.select().from(topics);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = TopicCreate.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const [inserted] = await db
    .insert(topics)
    .values({ forumId: parsed.data.forumId, title: parsed.data.title, authorId: session.user.id })
    .returning();

  return NextResponse.json(inserted);
}
