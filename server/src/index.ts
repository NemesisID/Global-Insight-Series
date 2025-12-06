import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from './middleware/auth';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
// Ensure the directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes

// --- Auth ---
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  // Hardcoded credentials as requested
  if (username === 'admin' && password === 'gisjaya') {
    res.json({ success: true, token: 'mock-jwt-token-for-admin' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// --- Uploads ---
app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (req.file) {
    // Return the URL to access the file
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

// --- Events ---
app.get('/api/events', async (req, res) => {
  const { type } = req.query;
  const now = new Date();

  try {
    let where = {};
    if (type === 'upcoming') {
      where = { date: { gte: now } };
    } else if (type === 'previous') {
      where = { date: { lt: now } };
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { date: type === 'upcoming' ? 'asc' : 'desc' },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.post('/api/events', authenticateToken, async (req, res) => {
  try {
    const { title, description, date, location, imageUrl } = req.body;
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        imageUrl,
      },
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

app.put('/api/events/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const { title, description, date, location, imageUrl } = req.body;
    const event = await prisma.event.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        date: new Date(date),
        location,
        imageUrl,
      },
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

app.delete('/api/events/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.event.delete({
      where: { id: Number(id) },
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// --- News ---
app.get('/api/news', async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.get('/api/news/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const newsItem = await prisma.news.findUnique({
      where: { id: Number(id) },
    });
    if (newsItem) {
      res.json(newsItem);
    } else {
      res.status(404).json({ error: 'News not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news item' });
  }
});

app.post('/api/news', authenticateToken, async (req, res) => {
  try {
    const { title, content, author, thumbnailUrl } = req.body;
    const news = await prisma.news.create({
      data: {
        title,
        content,
        author,
        thumbnailUrl,
      },
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create news' });
  }
});

app.put('/api/news/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const { title, content, author, thumbnailUrl } = req.body;
    const news = await prisma.news.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        author,
        thumbnailUrl,
      },
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update news' });
  }
});

app.delete('/api/news/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.news.delete({
      where: { id: Number(id) },
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
