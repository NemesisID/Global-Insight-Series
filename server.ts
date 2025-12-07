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
  destination: (_req, file, cb) => {
    let folder = 'others';
    if (file.fieldname === 'poster') folder = 'events';
    else if (file.fieldname === 'image') folder = 'news';
    
    const uploadDir = `public/uploads/${folder}`;
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024, fieldSize: 50 * 1024 * 1024 }, // 50MB limit for file and fields
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

app.post('/api/news', upload.single('image'), async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const imagePath = req.file ? `/uploads/news/${req.file.filename}` : null;

    const news = await prisma.news.create({
      data: {
        title,
        content,
        image: imagePath || '', // Fallback or handle optional
        author,
      },
    });
    res.json(news);
  } catch (error) {
      console.error('Error creating news:', error);
    res.status(500).json({ error: 'Failed to create news' });
  }
});

app.put('/api/news/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;
    
    const existingNews = await prisma.news.findUnique({ where: { id: Number(id) } });
    let imagePath = existingNews?.image;

    if (req.file) {
      if (existingNews?.image && existingNews.image.startsWith('/uploads/')) {
        const oldPath = 'public' + existingNews.image;
        if (fs.existsSync(oldPath)) {
            try { fs.unlinkSync(oldPath); } catch(e) {}
        }
      }
      imagePath = `/uploads/news/${req.file.filename}`;
    }

    const news = await prisma.news.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        image: imagePath,
        author,
      },
    });
    res.json(news);
  } catch (error) {
      console.error('Error updating news:', error);
    res.status(500).json({ error: 'Failed to update news' });
  }
});

app.delete('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const newsItem = await prisma.news.findUnique({ where: { id: Number(id) } });

    if (newsItem?.image && newsItem.image.startsWith('/uploads/')) {
        const filePath = 'public' + newsItem.image;
        if (fs.existsSync(filePath)) {
            try { fs.unlinkSync(filePath); } catch(e) {}
        }
    }

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

// Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled Error:', err);
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        return res.status(413).json({ error: 'File too large (Max 50MB)' });
      case 'LIMIT_FIELD_VALUE':
        return res.status(413).json({ error: 'Article content too long (Max 50MB)' });
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(400).json({ error: `Unexpected file field: ${err.field}` });
      default:
        return res.status(400).json({ error: `Upload error: ${err.message} (${err.code})` });
    }
  }
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
