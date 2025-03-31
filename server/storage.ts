import { 
  users, 
  videos, 
  dailyPoints, 
  type User, 
  type InsertUser,
  type Video,
  type InsertVideo,
  type DailyPoints,
  type InsertDailyPoints 
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPoints(userId: number, points: number): Promise<User>;
  
  // Video operations
  getVideo(id: number): Promise<Video | undefined>;
  getUserVideos(userId: number): Promise<Video[]>;
  saveVideo(video: InsertVideo): Promise<Video>;
  updateVideoStatus(videoId: number, status: string): Promise<Video>;
  
  // Daily points operations
  addDailyPoints(dailyPoints: InsertDailyPoints): Promise<DailyPoints>;
  getUserDailyPoints(userId: number, date: Date): Promise<DailyPoints | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private videos: Map<number, Video>;
  private dailyPoints: Map<number, DailyPoints>;
  private currentUserId: number;
  private currentVideoId: number;
  private currentDailyPointsId: number;

  constructor() {
    this.users = new Map();
    this.videos = new Map();
    this.dailyPoints = new Map();
    this.currentUserId = 1;
    this.currentVideoId = 1;
    this.currentDailyPointsId = 1;
    
    // Add sample admin user
    this.createUser({
      username: "admin",
      email: "admin@videoyap.com",
      password: "admin123", // In a real app, use proper password hashing
      points: 999999,
      plan: "premium"
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }
  
  async updateUserPoints(userId: number, points: number): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    const updatedUser = { ...user, points };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  
  // Video operations
  async getVideo(id: number): Promise<Video | undefined> {
    return this.videos.get(id);
  }
  
  async getUserVideos(userId: number): Promise<Video[]> {
    return Array.from(this.videos.values()).filter(
      (video) => video.userId === userId,
    );
  }
  
  async saveVideo(videoData: InsertVideo): Promise<Video> {
    const id = this.currentVideoId++;
    const createdAt = new Date();
    const video: Video = { 
      ...videoData, 
      id, 
      createdAt,
      url: undefined,
      thumbnailUrl: undefined
    };
    this.videos.set(id, video);
    return video;
  }
  
  async updateVideoStatus(videoId: number, status: string): Promise<Video> {
    const video = await this.getVideo(videoId);
    if (!video) {
      throw new Error(`Video with ID ${videoId} not found`);
    }
    
    let url;
    let thumbnailUrl;
    
    if (status === 'completed') {
      // In a real app, these would be actual URLs to the generated content
      url = `https://api.videoyap.com/videos/${videoId}.mp4`;
      thumbnailUrl = `https://api.videoyap.com/thumbnails/${videoId}.jpg`;
    }
    
    const updatedVideo = { 
      ...video, 
      status,
      url,
      thumbnailUrl
    };
    
    this.videos.set(videoId, updatedVideo);
    return updatedVideo;
  }
  
  // Daily points operations
  async addDailyPoints(dailyPointsData: InsertDailyPoints): Promise<DailyPoints> {
    const id = this.currentDailyPointsId++;
    const date = new Date();
    const dailyPointsEntry: DailyPoints = { ...dailyPointsData, id, date };
    this.dailyPoints.set(id, dailyPointsEntry);
    return dailyPointsEntry;
  }
  
  async getUserDailyPoints(userId: number, date: Date): Promise<DailyPoints | undefined> {
    const dateString = date.toISOString().split('T')[0];
    
    return Array.from(this.dailyPoints.values()).find(
      (points) => {
        const pointsDate = points.date.toISOString().split('T')[0];
        return points.userId === userId && pointsDate === dateString;
      }
    );
  }
}

export const storage = new MemStorage();
