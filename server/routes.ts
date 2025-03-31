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

      const { text, duration, format, style } = req.body;
      
      // Validation
      const schema = z.object({
        text: z.string().min(1, 'Text is required'),
        duration: z.string().regex(/^[135]$/, 'Duration must be 1, 3, or 5'),
        format: z.string(),
        style: z.string()
      });
      
      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: 'Invalid input', errors: result.error.flatten() });
      }

      // Calculate points needed
      const pointsNeeded = Number(duration) === 1 ? 5 : Number(duration) === 3 ? 15 : 30;
      
      // Check if user has enough points
      const user = req.user as any;
      if (user.points < pointsNeeded) {
        return res.status(400).json({ message: 'Not enough points' });
      }
      
      // Deduct points
      await storage.updateUserPoints(user.id, user.points - pointsNeeded);
      
      // In a real app, this would integrate with an AI service
      // For now, just simulate video creation
      const videoId = Math.floor(Math.random() * 1000000);
      const video = {
        id: videoId,
        userId: user.id,
        text,
        duration: Number(duration),
        format,
        style,
        status: 'processing',
        createdAt: new Date().toISOString()
      };
      
      await storage.saveVideo(video);
      
      // In a real app, this would trigger an async job
      // For now, simulate processing time
      setTimeout(async () => {
        await storage.updateVideoStatus(videoId, 'completed');
      }, 5000);
      
      res.json({ 
        message: 'Video creation started', 
        video,
        remainingPoints: user.points - pointsNeeded
      });
    } catch (error) {
      console.error('Video creation error:', error);
      res.status(500).json({ message: 'Server error' });
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
