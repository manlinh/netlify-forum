import { pgTable, serial, varchar, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

export const forums = pgTable("forums", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 64 }).unique().notNull(),
  title: varchar("title", { length: 128 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  forumId: integer("forum_id").notNull(),
  authorId: text("author_id").notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  topicId: integer("topic_id").notNull(),
  authorId: text("author_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const profiles = pgTable("profiles", {
  userId: text("user_id").primaryKey(),
  bio: text("bio"),
  interests: text("interests"),
  gender: varchar("gender", { length: 32 }),
  seekingGender: varchar("seeking_gender", { length: 32 }),
  age: integer("age"),
  location: varchar("location", { length: 128 }),
  optInPair: boolean("opt_in_pair").default(false),
});

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  userA: text("user_a").notNull(),
  userB: text("user_b").notNull(),
  score: integer("score").default(0),
  status: varchar("status", { length: 24 }).default("proposed"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
