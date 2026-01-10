# Fixing Firebase Storage CORS Error

## The Problem
You're getting CORS errors when uploading images because:
1. Firebase Storage requires authentication
2. Storage security rules need to be configured
3. You must be logged into the admin panel before uploading

## Solution

### Step 1: Set Up Storage Rules

1. Go to Firebase Console → **Storage** → **Rules**
2. Replace with these rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Projects images - allow read for all, write for authenticated users
    match /projects/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Achievements images - allow read for all, write for authenticated users
    match /achievements/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

### Step 2: Make Sure You're Logged In

**IMPORTANT**: You must be logged into the admin panel before uploading images!

1. Go to http://localhost:3000/admin.html
2. Log in with your admin credentials
3. **Then** try to add/edit projects/achievements with images

### Step 3: Verify Authentication

The upload will only work if:
- ✅ You're logged into the admin panel
- ✅ Storage rules are published
- ✅ Your user exists in Firebase Authentication

## Troubleshooting

If you still get CORS errors:

1. **Check if you're logged in**: Look at the admin panel - you should see the dashboard, not the login screen
2. **Check browser console**: Look for authentication errors
3. **Verify Storage rules**: Make sure they're published (not just saved)
4. **Try logging out and back in**: Sometimes auth tokens expire

## Quick Test

1. Log into admin panel
2. Try adding a project without an image first (to test if Firestore works)
3. Then try adding an image
4. Check browser console for specific error messages

