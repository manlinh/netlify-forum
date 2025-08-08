import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { topics } from "@/db/schema";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const TopicCreate = z.object({ forumId: z.number(), title: z.string().min(1) });

export async function GET(req: NextRequest) {
  const forumId = Number(new URL(req.url).searchParams.get("forumId"));
  const data = isFinite(forumId)
    ? await db.select().from(topics).where((t, { eq }) => eq(t.forumId, forumId))
    : await db.select().from(topics);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any = {};
  try { body = await req.json(); } catch {}
  const parsed = TopicCreate.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const inserted = await db.insert(topics).values({
    forumId: parsed.data.forumId,
    title: parsed.data.title,
    authorId: session.user.id,
  }).returning();
  return NextResponse.json(inserted[0]);
}
