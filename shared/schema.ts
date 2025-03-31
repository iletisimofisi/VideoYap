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
  text: text("text").notNull(),
  duration: integer("duration").notNull(), // in minutes (1, 3, 5)
  format: text("format").notNull(), // '16:9', '9:16', '4:5', etc.
  style: text("style").notNull(), // 'Modern', 'Kurumsal', 'Eğlenceli', etc.
  status: text("status").notNull().default('processing'), // 'processing', 'completed', 'failed'
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
  text: true,
  duration: true,
  format: true,
  style: true,
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
