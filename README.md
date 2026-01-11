# Saif's Portfolio Website

A modern, responsive portfolio website with Firebase integration, admin panel, and interactive features.

## Features

- **Portfolio Display**: Showcase projects and achievements
- **Admin Panel**: Full CRUD operations for managing content
- **Interactive Features**: Comments, ratings, messages, and feedback
- **Firebase Integration**: Real-time data synchronization
- **Dark/Light Mode**: Theme switching with persistence
- **Multi-language Support**: English and French

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

The Firebase configuration is already set up in `firebase-config.js`. Make sure:

1. Firebase project is created
2. Firestore Database is enabled
3. Firebase Storage is enabled
4. Authentication is enabled (Email/Password)

### 3. Firebase Security Rules

**IMPORTANT**: You must set up Firebase security rules for the portfolio to work!

See **FIREBASE_SETUP.md** for detailed step-by-step instructions.

Quick setup:
1. Go to Firebase Console > Firestore Database > Rules
2. Copy and paste the rules from FIREBASE_SETUP.md
3. Go to Storage > Rules and set up storage rules
4. Enable Authentication (Email/Password)
5. Create an admin user
6. Update ADMIN_EMAIL in admin-script.js

Set up Firestore security rules:

**See `FIRESTORE_RULES.md` for the complete rules and step-by-step instructions.**

**Quick setup:**
1. Go to Firebase Console > Firestore Database > Rules
2. Copy the rules from `FIRESTORE_RULES.md`
3. Paste and click "Publish"
4. Go to Indexes tab and create the required indexes (instructions in `FIRESTORE_RULES.md`)

**Important Notes:**
- The portfolio uses localStorage-based userId (not Firebase Auth)
- Rules allow all users to create/update comments and ratings
- Application-level security prevents users from editing others' content via userId matching

### 4. Storage Rules

Set up Firebase Storage rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /achievements/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 5. Admin Setup

1. Create an admin user in Firebase Authentication
2. Update the `ADMIN_EMAIL` in `admin-script.js` to your admin email
3. Access admin panel at `/admin.html`

### 6. Run the Project

For development:
```bash
npm run dev
```

Or use any static file server:
```bash
python -m http.server 8000
# or
npx serve .
```

## File Structure

```
/
├── index.html              # Main portfolio page
├── admin.html              # Admin panel
├── styles.css              # Main styles
├── admin-styles.css        # Admin panel styles
├── script.js               # Main portfolio script
├── admin-script.js         # Admin panel script
├── firebase-config.js      # Firebase configuration
├── firebase-service.js    # Firebase service functions
├── translations.json      # Language translations
└── package.json           # Dependencies
```

## Admin Panel Features

- **Projects Management**: Add, edit, delete projects with images
- **Achievements Management**: Manage achievements
- **Messages**: View and manage user messages
- **Feedback**: View and manage user feedback

## User Features

- **Project Details**: View detailed project information
- **Comments**: Add and manage comments on projects
- **Ratings**: Rate projects (1-5 stars)
- **Contact Developer**: Quick access to social links
- **Chat**: Send messages to the developer
- **Feedback**: Submit feedback about projects

## Customization

### Update Social Links

Edit the contact links in `index.html` (Contact Developer popup):
- LinkedIn
- GitHub
- Instagram
- Email

### Update Admin Email

Edit `ADMIN_EMAIL` in `admin-script.js`

### Add More Languages

Add translations to `translations.json` following the existing structure.

## Notes

- All data is stored in Firebase Firestore
- Images are stored in Firebase Storage
- Comments and ratings are synced in real-time
- Messages and feedback appear in the admin panel

## Accessing the Admin Panel

### Running on Port 3000

To run the server on port 3000:

```bash
# Using Python
python -m http.server 3000

# Or using Node.js serve
npx serve . -p 3000

# Or using npm (update package.json scripts if needed)
npx serve . -p 3000
```

Then access:
- **Main Portfolio**: http://localhost:3000/index.html or http://localhost:3000/
- **Admin Panel**: http://localhost:3000/admin.html

### Running on Port 8000 (default)

```bash
# Using Python
python -m http.server 8000

# Or using Node.js serve
npx serve . -p 8000
```

Then access:
- **Main Portfolio**: http://localhost:8000/index.html or http://localhost:8000/
- **Admin Panel**: http://localhost:8000/admin.html

### Admin Panel Login

1. Open `admin.html` in your browser
2. Enter your admin email (the one you created in Firebase Authentication)
3. Enter your admin password
4. Click Login

**Note**: Make sure you've:
- Created an admin user in Firebase Authentication
- Updated `ADMIN_EMAIL` in `admin-script.js` to match your admin email

## Support

For issues or questions, please contact the developer.

