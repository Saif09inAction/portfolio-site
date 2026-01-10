# MongoDB Migration Complete!

Your portfolio has been successfully migrated from Firebase to MongoDB.

## What Changed

✅ **Backend Server**: Express.js server with MongoDB
✅ **API Service**: New `api-service.js` replaces Firebase service
✅ **Authentication**: JWT-based authentication instead of Firebase Auth
✅ **File Storage**: Local file system instead of Firebase Storage
✅ **Database**: MongoDB instead of Firestore

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up MongoDB

**Option A: MongoDB Atlas (Cloud)**
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create free cluster
- Get connection string
- Update `MONGODB_URI` in `server.js`

**Option B: Local MongoDB**
- Install MongoDB locally
- Connection string: `mongodb://localhost:27017/saif-portfolio`

### 3. Create Admin User

Start the server first:
```bash
npm run server
```

Then create admin user:
```bash
curl -X POST http://localhost:5000/api/admin/init \
  -H "Content-Type: application/json" \
  -d '{"email":"saifsalmani224@gmail.com","password":"123456"}'
```

### 4. Start Both Servers

**Terminal 1 - Backend (Port 5000):**
```bash
npm run server
```

**Terminal 2 - Frontend (Port 3000):**
```bash
npm run dev
```

### 5. Access

- **Portfolio**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin.html
- **API**: http://localhost:5000/api

## File Structure

```
/
├── server.js              # Express backend server
├── api-service.js         # Frontend API service (replaces Firebase)
├── index.html             # Main portfolio
├── admin.html             # Admin panel
├── script.js              # Portfolio JavaScript (updated)
├── admin-script.js        # Admin JavaScript (updated)
├── uploads/               # Image uploads directory (created automatically)
└── package.json           # Updated dependencies
```

## Removed Files

You can delete these Firebase files (optional):
- `firebase-config.js`
- `firebase-service.js`
- `FIREBASE_SETUP.md`
- `STORAGE_FIX.md`

## Features

✅ All features work the same:
- Projects & Achievements management
- Comments & Ratings
- Feedback system
- Image uploads
- Admin authentication

## API Endpoints

All endpoints are at `http://localhost:5000/api/`

- `POST /api/auth/login` - Admin login
- `GET /api/projects` - Get projects
- `POST /api/projects` - Create project (auth required)
- `PUT /api/projects/:id` - Update project (auth required)
- `DELETE /api/projects/:id` - Delete project (auth required)
- Similar for achievements, comments, ratings, messages, feedback

See `MONGODB_SETUP.md` for full API documentation.

