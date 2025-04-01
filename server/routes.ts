import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from 'express';
import session from 'express-session';
import memorystore from 'memorystore';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { z } from 'zod';

const MemoryStore = memorystore(session);

const registerAuthEndpoints = (app: Express) => {
  // Configure passport
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await storage.getUserByEmail(email);
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (user.password !== password) { // Note: In a real app, use proper password hashing
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // Auth routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { email, password, username } = req.body;
      
      // Validation
      if (!email || !password || !username) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      // Create user
      const newUser = await storage.createUser({
        email,
        password, // In a real app, hash this password!
        username,
        points: 10, // Starting points for new users
        plan: 'free'
      });
      
      // Log the user in
      req.login(newUser, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error logging in after registration' });
        }
        return res.status(201).json(newUser);
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/api/auth/login', passport.authenticate('local'), (req, res) => {
    res.json(req.user);
  });

  app.post('/api/auth/logout', (req, res) => {
    req.logout(() => {
      res.json({ message: 'Logged out successfully' });
    });
  });

  app.get('/api/auth/me', (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    res.json(req.user);
  });
};

const registerVideoEndpoints = (app: Express) => {
  // Endpoint to create a video from text
  app.post('/api/videos/create', async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      // Validation schema for video creation
      const schema = z.object({
        text: z.string().min(10, 'Metin en az 10 karakter olmalıdır.'),
        title: z.string().optional(),
        duration: z.number().int().min(30, 'Süre en az 30 saniye olmalıdır.'),
        format: z.enum(['landscape', 'vertical', 'square', 'wide'], {
          errorMap: () => ({ message: 'Geçersiz video formatı.' })
        }),
        aspectRatio: z.enum(['16:9', '9:16', '1:1', '21:9'], {
          errorMap: () => ({ message: 'Geçersiz en-boy oranı.' })
        }),
        style: z.string().min(1, 'Stil seçimi zorunludur.'),
        withVoice: z.boolean().default(true),
        withMusic: z.boolean().default(true),
        pointsCost: z.number().int().min(1, 'Puan maliyeti geçersiz.')
      });
      
      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Geçersiz girdi', 
          errors: result.error.flatten() 
        });
      }
      
      const { 
        text, title, duration, format, aspectRatio, 
        style, withVoice, withMusic, pointsCost 
      } = result.data;
      
      // Check if user has enough points
      const user = req.user as any;
      if (user.points < pointsCost) {
        return res.status(400).json({ 
          message: 'Yetersiz puan', 
          required: pointsCost, 
          available: user.points 
        });
      }
      
      // Deduct points
      await storage.updateUserPoints(user.id, user.points - pointsCost);
      
      // Create the video in storage
      const video = await storage.saveVideo({
        userId: user.id,
        title: title || `Video ${new Date().toLocaleDateString('tr-TR')}`,
        text,
        duration,
        format,
        aspectRatio,
        style,
        withVoice,
        withMusic,
        pointsCost,
        status: 'processing'
      });
      
      // In a real app, this would trigger an async job to an AI service
      // For now, simulate processing time
      setTimeout(async () => {
        await storage.updateVideoStatus(video.id, 'completed');
      }, 5000);
      
      // Return response
      res.json({ 
        message: 'Video oluşturma başlatıldı', 
        video,
        remainingPoints: user.points - pointsCost
      });
    } catch (error) {
      console.error('Video creation error:', error);
      res.status(500).json({ message: 'Sunucu hatası' });
    }
  });

  // Get user's videos
  app.get('/api/videos', (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const userId = (req.user as any).id;
    const videos = storage.getUserVideos(userId);
    res.json(videos);
  });

  // Get a specific video
  app.get('/api/videos/:id', async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const videoId = parseInt(req.params.id);
    const video = await storage.getVideo(videoId);
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    if (video.userId !== (req.user as any).id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(video);
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure session
  app.use(session({
    cookie: { maxAge: 86400000 }, // 1 day
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: process.env.SESSION_SECRET || 'videoyap-secret',
    resave: false,
    saveUninitialized: false
  }));
  
  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Register API endpoints
  registerAuthEndpoints(app);
  registerVideoEndpoints(app);
  
  // Admin routes would go here

  const httpServer = createServer(app);

  return httpServer;
}
