# Firebase Security Rules Setup Guide

## Step-by-Step Instructions

### 1. Open Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **saif-s-portfolio-c7d5d**

### 2. Set Up Firestore Security Rules

1. In Firebase Console, click on **Firestore Database** in the left sidebar
2. Click on the **Rules** tab
3. Replace the existing rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Projects - read for all, write for authenticated admin
    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null;
      
      // Comments subcollection
      match /comments/{commentId} {
        allow read: if true;
        allow create: if true;
        allow update, delete: if request.auth != null || 
          resource.data.userId == request.auth.uid;
      }
      
      // Ratings subcollection
      match /ratings/{ratingId} {
        allow read: if true;
        allow create, update: if true;
      }
    }
    
    // Achievements - same as projects
    match /achievements/{achievementId} {
      allow read: if true;
      allow write: if request.auth != null;
      
      // Comments subcollection
      match /comments/{commentId} {
        allow read: if true;
        allow create: if true;
        allow update, delete: if request.auth != null || 
          resource.data.userId == request.auth.uid;
      }
      
      // Ratings subcollection
      match /ratings/{ratingId} {
        allow read: if true;
        allow create, update: if true;
      }
    }
    
    // Messages - read/write for authenticated admin only
    match /messages/{messageId} {
      allow read, write: if request.auth != null;
      allow create: if true; // Allow anyone to create messages
    }
    
    // Feedback - read/write for authenticated admin, create for all
    match /feedback/{feedbackId} {
      allow read, write: if request.auth != null;
      allow create: if true; // Allow anyone to create feedback
    }
  }
}
```

4. Click **Publish** to save the rules

### 3. Set Up Firebase Storage Security Rules

1. In Firebase Console, click on **Storage** in the left sidebar
2. Click on the **Rules** tab
3. Replace the existing rules with the following:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Projects images
    match /projects/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Achievements images
    match /achievements/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

4. Click **Publish** to save the rules

### 4. Enable Authentication (Email/Password)

1. In Firebase Console, click on **Authentication** in the left sidebar
2. Click on **Get Started** if you haven't enabled it yet
3. Click on the **Sign-in method** tab
4. Click on **Email/Password**
5. Enable **Email/Password** (toggle it on)
6. Click **Save**

### 5. Create Admin User

1. In Firebase Console, go to **Authentication** > **Users** tab
2. Click **Add user**
3. Enter your admin email: **saifsalmani224@gmail.com**
4. Enter password: **123456** (or your preferred password)
5. Click **Add user**
6. **Note**: The `ADMIN_EMAIL` in `admin-script.js` is already set to `saifsalmani224@gmail.com`

### 6. Update Admin Email in Code

1. Open `admin-script.js`
2. Find this line (around line 12):
   ```javascript
   const ADMIN_EMAIL = "admin@saifportfolio.com";
   ```
3. Change it to your actual admin email:
   ```javascript
   const ADMIN_EMAIL = "your-actual-email@example.com";
   ```

## Important Notes

### Security Considerations

- **For Production**: Consider making the rules more restrictive
- **Comments/Ratings**: Currently anyone can create, but only admins or comment owners can edit/delete
- **Messages/Feedback**: Anyone can create, but only admins can read
- **Images**: Anyone can view, but only authenticated admins can upload

### Testing Rules

After setting up rules, test:
1. Try viewing projects (should work for everyone)
2. Try adding a comment (should work)
3. Try rating a project (should work)
4. Try sending a message (should work)
5. Try logging into admin panel (should work with your admin email)

### Troubleshooting

If you get permission errors:
1. Check that rules are published (not just saved)
2. Verify your admin email matches in `admin-script.js`
3. Check browser console for specific error messages
4. Make sure Authentication is enabled

## Quick Reference

- **Firestore Rules**: Firestore Database > Rules tab
- **Storage Rules**: Storage > Rules tab
- **Authentication**: Authentication > Sign-in method
- **Admin User**: Authentication > Users > Add user

