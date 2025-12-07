import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadDir = 'public/uploads/events';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'poster-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (_req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static('public/uploads'));
app.use(express.static('public'));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Event Routes
app.get('/api/events', async (_req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' }
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

//POST /api/events - Create event with file upload
app.post('/api/events', upload.single('poster'), async (req, res) => {
  try {
    const { title, date, time, location, type, participants, description, registrationLink } = req.body;
    const posterPath = req.file ? `/uploads/events/${req.file.filename}` : null;
    
    const event = await prisma.event.create({
      data: {
        title,
        date: new Date(date),
        time: time || '00:00',
        location,
        type: type || 'Webinar',
        participants: participants || '-',
        description,
        poster: posterPath,
        registrationLink,
      },
    });
    res.json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// PUT /api/events/:id - Update event with optional file upload
app.put('/api/events/:id', upload.single('poster'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, time, location, type, participants, description, registrationLink } = req.body;
    
    // Get existing event to check for old poster
    const existingEvent = await prisma.event.findUnique({ where: { id: Number(id) } });
    
    let posterPath = existingEvent?.poster;
    
    // If new file uploaded, delete old file and use new path
    if (req.file) {
      if (existingEvent?.poster && existingEvent.poster.startsWith('/uploads/')) {
        const oldPath = 'public' + existingEvent.poster;
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      posterPath = `/uploads/events/${req.file.filename}`;
    }
    
    const event = await prisma.event.update({
      where: { id: Number(id) },
      data: {
        title,
        date: new Date(date),
        time: time || '00:00',
        location,
        type: type || 'Webinar',
        participants: participants || '-',
        description,
        poster: posterPath,
        registrationLink,
      },
    });
    res.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({ where: { id: Number(id) } });
    
    // Delete associated poster file
    if (event?.poster && event.poster.startsWith('/uploads/')) {
      const filePath = 'public' + event.poster;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    await prisma.event.delete({
      where: { id: Number(id) },
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// News Routes
app.get('/api/news', async (_req, res) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.get('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const newsItem = await prisma.news.findUnique({
      where: { id: Number(id) },
    });
    if (!newsItem) return res.status(404).json({ error: 'News not found' });
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news item' });
  }
});

app.post('/api/news', async (req, res) => {
  try {
    const { title, content, image, author } = req.body;
    const news = await prisma.news.create({
      data: {
        title,
        content,
        image,
        author,
      },
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create news' });
  }
});

app.put('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image, author } = req.body;
    const news = await prisma.news.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        image,
        author,
      },
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update news' });
  }
});

app.delete('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.news.delete({
      where: { id: Number(id) },
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete news' });
  }
});

// GET /api/dashboard/stats
app.get('/api/dashboard/stats', async (_req, res) => {
  try {
    const eventsCount = await prisma.event.count();
    const upcomingEventsCount = await prisma.event.count({
      where: {
        date: {
          gte: new Date(),
        },
      },
    });
    const newsCount = await prisma.news.count();
    const recentNewsCount = await prisma.news.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)), // Last 7 days
        },
      },
    });

    res.json({
      eventsCount,
      upcomingEventsCount,
      newsCount,
      recentNewsCount,
      systemStatus: "Active",
      version: "1.0.0"
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
