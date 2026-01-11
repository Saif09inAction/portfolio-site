# Firestore Security Rules for Portfolio

Copy and paste these rules into Firebase Console > Firestore Database > Rules

## Rules for Anonymous Users (No Authentication Required)

Since the portfolio uses localStorage-based userId (not Firebase Auth), use these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Comments collection - allow everyone to read and create
    // Users can only update their own comments (check userId matches)
    match /comments/{commentId} {
      allow read: if true;
      allow create: if true;
      // Users can only update if the userId in the request matches the existing comment's userId
      // The updateCommentInAPI function includes userId in the update request
      allow update: if resource.data.userId == request.resource.data.userId;
      // Note: Delete operations can't verify userId in rules (deleteDoc doesn't send data)
      // Application code handles delete authorization by only showing delete button for owner
      allow delete: if true;
    }
    
    // Ratings collection - allow everyone to read, create, update
    match /ratings/{ratingId} {
      allow read: if true;
      allow create: if true;
      allow update: if true;
      allow delete: if false; // Prevent deletion of ratings
    }
    
    // Messages - read/write for authenticated admin only (if you use auth later)
    match /messages/{messageId} {
      allow read, write: if request.auth != null;
    }
    
    // Feedback - read/write for authenticated admin, create for all
    match /feedback/{feedbackId} {
      allow read, write: if request.auth != null;
      allow create: if true;
    }
  }
}
```

## Steps to Apply:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **saif-s-portfolio-c7d5d**
3. Click on **Firestore Database** in the left sidebar
4. Click on the **Rules** tab
5. Replace all the existing rules with the rules above
6. Click **Publish**

## Create Required Indexes:

After setting up rules, create these indexes:

### Index 1: Comments Query
1. Go to **Firestore Database** > **Indexes** tab
2. Click **Create Index**
3. Set:
   - Collection ID: `comments`
   - Fields to index:
     - `itemId` (Ascending)
     - `itemType` (Ascending)
     - `timestamp` (Descending)
4. Click **Create**

### Index 2: Ratings Query (for getting user's rating)
1. Click **Create Index** again
2. Set:
   - Collection ID: `ratings`
   - Fields to index:
     - `itemId` (Ascending)
     - `itemType` (Ascending)
     - `userId` (Ascending)
3. Click **Create**

### Index 3: Ratings Query (for getting all ratings)
1. Click **Create Index** again
2. Set:
   - Collection ID: `ratings`
   - Fields to index:
     - `itemId` (Ascending)
     - `itemType` (Ascending)
3. Click **Create**

**Note:** Index creation may take a few minutes. You'll get a notification when they're ready.
