import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { forums } from "@/db/schema";
import { z } from "zod";

const ForumCreate = z.object({ slug: z.string().min(1), title: z.string().min(1), description: z.string().optional() });

export async function GET() {
  const data = await db.select().from(forums);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  let body: unknown = {};
  try { body = await req.json(); } catch {}
  const parsed = ForumCreate.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const inserted = await db.insert(forums).values(parsed.data).returning();
  return NextResponse.json(inserted[0]);
}
