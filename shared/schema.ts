import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  points: integer("points").notNull().default(10),
  plan: text("plan").notNull().default('free'), // 'free', 'basic', 'premium'
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: varchar("title", { length: 255 }),
  text: text("text").notNull(),
  duration: integer("duration").notNull(), // in seconds
  format: varchar("format", { length: 20 }).notNull(), // 'landscape', 'vertical', 'square', 'wide'
  aspectRatio: varchar("aspect_ratio", { length: 10 }).notNull(), // '16:9', '9:16', '1:1', '21:9'
  style: varchar("style", { length: 50 }).notNull(), // 'presentation', 'educational', 'social', 'cinematic', etc.
  withVoice: boolean("with_voice").default(true),
  withMusic: boolean("with_music").default(true),
  pointsCost: integer("points_cost").notNull(),
  status: varchar("status", { length: 20 }).notNull().default('processing'), // 'processing', 'completed', 'failed'
  url: text("url"),
  thumbnailUrl: text("thumbnail_url"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const dailyPoints = pgTable("daily_points", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  points: integer("points").notNull(),
  date: timestamp("date").defaultNow().notNull()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  points: true,
  plan: true
});

export const insertVideoSchema = createInsertSchema(videos).pick({
  userId: true,
  title: true, 
  text: true,
  duration: true,
  format: true,
  aspectRatio: true,
  style: true,
  withVoice: true, 
  withMusic: true,
  pointsCost: true,
  status: true
});

export const insertDailyPointsSchema = createInsertSchema(dailyPoints).pick({
  userId: true,
  points: true
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;

export type InsertDailyPoints = z.infer<typeof insertDailyPointsSchema>;
export type DailyPoints = typeof dailyPoints.$inferSelect;
