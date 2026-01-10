// Firebase Service Functions
import { 
    collection, 
    doc, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    orderBy,
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { db, storage } from "./firebase-config.js";

// ============================================
// Projects Management
// ============================================
export async function getProjects(type = null) {
    try {
        const projectsRef = collection(db, "projects");
        let q = query(projectsRef, orderBy("date", "desc"));
        
        if (type) {
            q = query(projectsRef, orderBy("type"), orderBy("date", "desc"));
        }
        
        const snapshot = await getDocs(q);
        const projects = [];
        snapshot.forEach((doc) => {
            projects.push({ id: doc.id, ...doc.data() });
        });
        return projects;
    } catch (error) {
        console.error("Error getting projects:", error);
        return [];
    }
}

export async function getProjectById(projectId) {
    try {
        const docRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    } catch (error) {
        console.error("Error getting project:", error);
        return null;
    }
}

export async function addProject(projectData) {
    try {
        const projectsRef = collection(db, "projects");
        const docRef = await addDoc(projectsRef, {
            ...projectData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding project:", error);
        throw error;
    }
}

export async function updateProject(projectId, projectData) {
    try {
        const docRef = doc(db, "projects", projectId);
        await updateDoc(docRef, {
            ...projectData,
            updatedAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error("Error updating project:", error);
        throw error;
    }
}

export async function deleteProject(projectId) {
    try {
        const docRef = doc(db, "projects", projectId);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error("Error deleting project:", error);
        throw error;
    }
}

// ============================================
// Achievements Management
// ============================================
export async function getAchievements(type = null) {
    try {
        const achievementsRef = collection(db, "achievements");
        let q = query(achievementsRef, orderBy("date", "desc"));
        
        if (type) {
            q = query(achievementsRef, orderBy("type"), orderBy("date", "desc"));
        }
        
        const snapshot = await getDocs(q);
        const achievements = [];
        snapshot.forEach((doc) => {
            achievements.push({ id: doc.id, ...doc.data() });
        });
        return achievements;
    } catch (error) {
        console.error("Error getting achievements:", error);
        return [];
    }
}

export async function addAchievement(achievementData) {
    try {
        const achievementsRef = collection(db, "achievements");
        const docRef = await addDoc(achievementsRef, {
            ...achievementData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding achievement:", error);
        throw error;
    }
}

export async function updateAchievement(achievementId, achievementData) {
    try {
        const docRef = doc(db, "achievements", achievementId);
        await updateDoc(docRef, {
            ...achievementData,
            updatedAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error("Error updating achievement:", error);
        throw error;
    }
}

export async function deleteAchievement(achievementId) {
    try {
        const docRef = doc(db, "achievements", achievementId);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error("Error deleting achievement:", error);
        throw error;
    }
}

// ============================================
// Image Upload
// ============================================
export async function uploadImage(file, path) {
    try {
        const storageRef = ref(storage, path);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading image:", error);
        // Provide more helpful error message
        if (error.code === 'storage/unauthorized') {
            throw new Error("You must be logged in to upload images. Please log in to the admin panel first.");
        }
        throw error;
    }
}

// ============================================
// Messages Management
// ============================================
export async function sendMessage(messageData) {
    try {
        const messagesRef = collection(db, "messages");
        const docRef = await addDoc(messagesRef, {
            ...messageData,
            timestamp: serverTimestamp(),
            read: false
        });
        return docRef.id;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
}

export async function getMessages() {
    try {
        const messagesRef = collection(db, "messages");
        const q = query(messagesRef, orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        const messages = [];
        snapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() });
        });
        return messages;
    } catch (error) {
        console.error("Error getting messages:", error);
        return [];
    }
}

export async function markMessageAsRead(messageId) {
    try {
        const docRef = doc(db, "messages", messageId);
        await updateDoc(docRef, { read: true });
        return true;
    } catch (error) {
        console.error("Error marking message as read:", error);
        throw error;
    }
}

export async function deleteMessage(messageId) {
    try {
        const docRef = doc(db, "messages", messageId);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error("Error deleting message:", error);
        throw error;
    }
}

// ============================================
// Feedback Management
// ============================================
export async function submitFeedback(feedbackData) {
    try {
        const feedbackRef = collection(db, "feedback");
        const docRef = await addDoc(feedbackRef, {
            ...feedbackData,
            timestamp: serverTimestamp(),
            read: false
        });
        return docRef.id;
    } catch (error) {
        console.error("Error submitting feedback:", error);
        throw error;
    }
}

export async function getFeedback() {
    try {
        const feedbackRef = collection(db, "feedback");
        const q = query(feedbackRef, orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        const feedback = [];
        snapshot.forEach((doc) => {
            feedback.push({ id: doc.id, ...doc.data() });
        });
        return feedback;
    } catch (error) {
        console.error("Error getting feedback:", error);
        return [];
    }
}

export async function markFeedbackAsRead(feedbackId) {
    try {
        const docRef = doc(db, "feedback", feedbackId);
        await updateDoc(docRef, { read: true });
        return true;
    } catch (error) {
        console.error("Error marking feedback as read:", error);
        throw error;
    }
}

export async function deleteFeedback(feedbackId) {
    try {
        const docRef = doc(db, "feedback", feedbackId);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error("Error deleting feedback:", error);
        throw error;
    }
}

// ============================================
// Comments Management (for projects/achievements)
// ============================================
export async function addComment(itemId, itemType, commentData) {
    try {
        const commentsRef = collection(db, `${itemType}s`, itemId, "comments");
        const docRef = await addDoc(commentsRef, {
            ...commentData,
            timestamp: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
}

export async function getComments(itemId, itemType) {
    try {
        const commentsRef = collection(db, `${itemType}s`, itemId, "comments");
        const q = query(commentsRef, orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        const comments = [];
        snapshot.forEach((doc) => {
            comments.push({ id: doc.id, ...doc.data() });
        });
        return comments;
    } catch (error) {
        console.error("Error getting comments:", error);
        return [];
    }
}

export async function updateComment(itemId, itemType, commentId, commentData) {
    try {
        const commentRef = doc(db, `${itemType}s`, itemId, "comments", commentId);
        await updateDoc(commentRef, {
            ...commentData,
            updatedAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error("Error updating comment:", error);
        throw error;
    }
}

export async function deleteComment(itemId, itemType, commentId) {
    try {
        const commentRef = doc(db, `${itemType}s`, itemId, "comments", commentId);
        await deleteDoc(commentRef);
        return true;
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
}

// ============================================
// Ratings Management
// ============================================
export async function submitRating(itemId, itemType, ratingData) {
    try {
        const ratingsRef = collection(db, `${itemType}s`, itemId, "ratings");
        // Check if user already rated
        const existingRatings = await getRatings(itemId, itemType);
        const existingRating = existingRatings.find(r => r.userId === ratingData.userId);
        
        if (existingRating) {
            // Update existing rating
            const ratingRef = doc(db, `${itemType}s`, itemId, "ratings", existingRating.id);
            await updateDoc(ratingRef, {
                rating: ratingData.rating,
                updatedAt: serverTimestamp()
            });
            return existingRating.id;
        } else {
            // Add new rating
            const docRef = await addDoc(ratingsRef, {
                ...ratingData,
                timestamp: serverTimestamp()
            });
            return docRef.id;
        }
    } catch (error) {
        console.error("Error submitting rating:", error);
        throw error;
    }
}

export async function getRatings(itemId, itemType) {
    try {
        const ratingsRef = collection(db, `${itemType}s`, itemId, "ratings");
        const snapshot = await getDocs(ratingsRef);
        const ratings = [];
        snapshot.forEach((doc) => {
            ratings.push({ id: doc.id, ...doc.data() });
        });
        return ratings;
    } catch (error) {
        console.error("Error getting ratings:", error);
        return [];
    }
}

