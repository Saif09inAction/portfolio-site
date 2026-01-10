// Express Server with MongoDB
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3001;

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware - CORS Configuration
const corsOptions = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/saif-portfolio';
// Using local MongoDB instance

mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// MongoDB Schemas
const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: { type: String, enum: ['developer', 'editor'] },
    date: String,
    url: String,
    thumbnail: String,
    images: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const achievementSchema = new mongoose.Schema({
    name: String,
    title: String,
    description: String,
    type: { type: String, enum: ['developer', 'editor'] },
    date: String,
    platform: String,
    position: String,
    year: String,
    skill: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
    itemId: String,
    itemType: String,
    userId: String,
    author: String,
    text: String,
    timestamp: { type: Date, default: Date.now }
});

const ratingSchema = new mongoose.Schema({
    itemId: String,
    itemType: String,
    userId: String,
    rating: Number,
    timestamp: { type: Date, default: Date.now }
});

const messageSchema = new mongoose.Schema({
    name: String,
    message: String,
    projectName: String,
    projectId: String,
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
});

const feedbackSchema = new mongoose.Schema({
    userName: String,
    feedback: String,
    projectName: String,
    projectId: String,
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
});

const Project = mongoose.model('Project', projectSchema);
const Achievement = mongoose.model('Achievement', achievementSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Rating = mongoose.model('Rating', ratingSchema);
const Message = mongoose.model('Message', messageSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);

// File Upload Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed'));
    }
});

// ============================================
// Projects Routes
// ============================================
app.get('/api/projects', async (req, res) => {
    try {
        const { type } = req.query;
        const query = type ? { type } : {};
        const projects = await Project.find(query).sort({ date: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/projects', upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]), async (req, res) => {
    try {
        const { title, description, type, date, url } = req.body;
        const projectData = {
            title,
            description,
            type,
            date,
            url: url || undefined
        };
        
        if (req.files.thumbnail) {
            projectData.thumbnail = `/uploads/${req.files.thumbnail[0].filename}`;
        }
        
        if (req.files.images) {
            projectData.images = req.files.images.map(file => `/uploads/${file.filename}`);
        }
        
        const project = new Project(projectData);
        await project.save();
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/projects/:id', upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]), async (req, res) => {
    try {
        const { title, description, type, date, url } = req.body;
        const projectData = {
            title,
            description,
            type,
            date,
            url: url || undefined,
            updatedAt: Date.now()
        };
        
        if (req.files.thumbnail) {
            projectData.thumbnail = `/uploads/${req.files.thumbnail[0].filename}`;
        }
        
        if (req.files.images) {
            projectData.images = req.files.images.map(file => `/uploads/${file.filename}`);
        }
        
        const project = await Project.findByIdAndUpdate(req.params.id, projectData, { new: true });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============================================
// Achievements Routes
// ============================================
app.get('/api/achievements', async (req, res) => {
    try {
        const { type } = req.query;
        const query = type ? { type } : {};
        const achievements = await Achievement.find(query).sort({ date: -1 });
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/achievements', async (req, res) => {
    try {
        const achievement = new Achievement(req.body);
        await achievement.save();
        res.json(achievement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/achievements/:id', async (req, res) => {
    try {
        req.body.updatedAt = Date.now();
        const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!achievement) {
            return res.status(404).json({ error: 'Achievement not found' });
        }
        res.json(achievement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/achievements/:id', async (req, res) => {
    try {
        const achievement = await Achievement.findByIdAndDelete(req.params.id);
        if (!achievement) {
            return res.status(404).json({ error: 'Achievement not found' });
        }
        res.json({ message: 'Achievement deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============================================
// Comments Routes
// ============================================
app.get('/api/comments', async (req, res) => {
    try {
        const { itemId, itemType } = req.query;
        const comments = await Comment.find({ itemId, itemType }).sort({ timestamp: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/comments', async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============================================
// Ratings Routes
// ============================================
app.get('/api/ratings', async (req, res) => {
    try {
        const { itemId, itemType } = req.query;
        const ratings = await Rating.find({ itemId, itemType });
        res.json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/ratings', async (req, res) => {
    try {
        const { itemId, itemType, userId, rating } = req.body;
        
        // Check if user already rated
        const existingRating = await Rating.findOne({ itemId, itemType, userId });
        
        if (existingRating) {
            existingRating.rating = rating;
            existingRating.timestamp = Date.now();
            await existingRating.save();
            return res.json(existingRating);
        }
        
        const newRating = new Rating({ itemId, itemType, userId, rating });
        await newRating.save();
        res.json(newRating);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============================================
// Messages Routes
// ============================================
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/messages', async (req, res) => {
    try {
        const message = new Message(req.body);
        await message.save();
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/messages/:id/read', async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/messages/:id', async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============================================
// Feedback Routes
// ============================================
app.get('/api/feedback', async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ timestamp: -1 });
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/feedback', async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/feedback/:id/read', async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/feedback/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
});

