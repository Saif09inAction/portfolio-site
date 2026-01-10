// API Service - Replaces Firebase Service
// Use localStorage when API is not available (production/deployed sites)
const isLocalhost = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.') ||
    window.location.hostname.startsWith('10.0.')
);

const API_BASE_URL = isLocalhost ? 'http://localhost:3001/api' : null;

// Storage keys for localStorage fallback
const STORAGE_RATINGS = 'portfolio_ratings';
const STORAGE_COMMENTS = 'portfolio_comments';

// Helper function for API calls with localStorage fallback
async function apiCall(endpoint, options = {}) {
    // If API is not available (not localhost), use localStorage immediately
    if (!API_BASE_URL) {
        return handleLocalStorageFallback(endpoint, options);
    }
    
    // Only try to fetch if we're on localhost and API is available
    try {
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });
        
        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Request failed' }));
            throw new Error(error.error || 'Request failed');
        }
        
        return response.json();
    } catch (error) {
        // Fallback to localStorage if API call fails (e.g., server not running, network error, CORS)
        console.warn('API call failed, using localStorage fallback:', error.message);
        return handleLocalStorageFallback(endpoint, options);
    }
}

// Handle localStorage fallback for API calls
function handleLocalStorageFallback(endpoint, options = {}) {
    // Parse endpoint to determine action
    if (endpoint.includes('/ratings')) {
        // Parse query parameters from endpoint string
        const queryMatch = endpoint.match(/\?([^#]+)/);
        const params = {};
        if (queryMatch) {
            queryMatch[1].split('&').forEach(param => {
                const [key, value] = param.split('=');
                params[key] = decodeURIComponent(value);
            });
        }
        
        const itemId = params.itemId;
        const itemType = params.itemType;
        const key = `${itemType}_${itemId}`;
        
        if (options.method === 'GET' || !options.method) {
            // Get ratings from localStorage
            const storage = JSON.parse(localStorage.getItem(STORAGE_RATINGS) || '{}');
            return Promise.resolve(storage[key] || []);
        } else if (options.method === 'POST') {
            // Save rating to localStorage
            const storage = JSON.parse(localStorage.getItem(STORAGE_RATINGS) || '{}');
            const data = JSON.parse(options.body || '{}');
            if (!storage[key]) storage[key] = [];
            const newRating = { ...data, _id: Date.now().toString(), createdAt: new Date().toISOString() };
            storage[key].push(newRating);
            localStorage.setItem(STORAGE_RATINGS, JSON.stringify(storage));
            return Promise.resolve(newRating);
        }
    } else if (endpoint.includes('/comments')) {
        // Parse query parameters from endpoint string
        const queryMatch = endpoint.match(/\?([^#]+)/);
        const params = {};
        if (queryMatch) {
            queryMatch[1].split('&').forEach(param => {
                const [key, value] = param.split('=');
                params[key] = decodeURIComponent(value);
            });
        }
        
        const itemId = params.itemId;
        const itemType = params.itemType;
        const key = `${itemType}_${itemId}`;
        
        if (options.method === 'GET' || !options.method) {
            // Get comments from localStorage
            const storage = JSON.parse(localStorage.getItem(STORAGE_COMMENTS) || '{}');
            return Promise.resolve(storage[key] || []);
        } else if (options.method === 'POST') {
            // Save comment to localStorage
            const storage = JSON.parse(localStorage.getItem(STORAGE_COMMENTS) || '{}');
            const data = JSON.parse(options.body || '{}');
            if (!storage[key]) storage[key] = [];
            const newComment = { ...data, _id: Date.now().toString(), createdAt: new Date().toISOString() };
            storage[key].push(newComment);
            localStorage.setItem(STORAGE_COMMENTS, JSON.stringify(storage));
            return Promise.resolve(newComment);
        } else if (options.method === 'DELETE') {
            // Delete comment from localStorage
            const storage = JSON.parse(localStorage.getItem(STORAGE_COMMENTS) || '{}');
            const commentId = endpoint.split('/').pop();
            if (storage[key]) {
                storage[key] = storage[key].filter(c => c._id !== commentId);
                localStorage.setItem(STORAGE_COMMENTS, JSON.stringify(storage));
            }
            return Promise.resolve({ success: true });
        }
    } else if (endpoint.includes('/feedback')) {
        // Store feedback in localStorage
        const data = JSON.parse(options.body || '{}');
        const feedbacks = JSON.parse(localStorage.getItem('portfolio_feedback') || '[]');
        feedbacks.push({ ...data, _id: Date.now().toString(), createdAt: new Date().toISOString() });
        localStorage.setItem('portfolio_feedback', JSON.stringify(feedbacks));
        return Promise.resolve({ success: true, message: 'Feedback saved locally' });
    }
    
    // Default fallback - return empty array for GET requests
    if (options.method === 'GET' || !options.method) {
        return Promise.resolve([]);
    }
    return Promise.resolve({ success: true });
}

// Helper for file uploads
async function uploadFiles(endpoint, formData) {
    if (!API_BASE_URL) {
        // File uploads not supported with localStorage fallback
        throw new Error('File uploads are not available. API server required.');
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Upload failed' }));
            throw new Error(error.error || 'Upload failed');
        }
        
        return response.json();
    } catch (error) {
        throw new Error('Upload failed: ' + error.message);
    }
}

// ============================================
// Projects
// ============================================
export async function getProjects(type = null) {
    const query = type ? `?type=${type}` : '';
    return apiCall(`/projects${query}`);
}

export async function getProjectById(projectId) {
    return apiCall(`/projects/${projectId}`);
}

export async function addProject(projectData, files = {}) {
    const formData = new FormData();
    
    Object.keys(projectData).forEach(key => {
        if (projectData[key] !== undefined && projectData[key] !== null) {
            formData.append(key, projectData[key]);
        }
    });
    
    if (files.thumbnail) {
        formData.append('thumbnail', files.thumbnail);
    }
    
    if (files.images && files.images.length > 0) {
        files.images.forEach(file => {
            formData.append('images', file);
        });
    }
    
    return uploadFiles('/projects', formData);
}

export async function updateProject(projectId, projectData, files = {}) {
    if (!API_BASE_URL) {
        throw new Error('Project updates are not available. API server required.');
    }
    
    const formData = new FormData();
    
    Object.keys(projectData).forEach(key => {
        if (projectData[key] !== undefined && projectData[key] !== null) {
            formData.append(key, projectData[key]);
        }
    });
    
    if (files.thumbnail) {
        formData.append('thumbnail', files.thumbnail);
    }
    
    if (files.images && files.images.length > 0) {
        files.images.forEach(file => {
            formData.append('images', file);
        });
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
            method: 'PUT',
            body: formData
        });
        
        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Update failed' }));
            throw new Error(error.error || 'Update failed');
        }
        
        return response.json();
    } catch (error) {
        throw new Error('Update failed: ' + error.message);
    }
}

export async function deleteProject(projectId) {
    return apiCall(`/projects/${projectId}`, { method: 'DELETE' });
}

// ============================================
// Achievements
// ============================================
export async function getAchievements(type = null) {
    const query = type ? `?type=${type}` : '';
    return apiCall(`/achievements${query}`);
}

export async function addAchievement(achievementData) {
    return apiCall('/achievements', {
        method: 'POST',
        body: JSON.stringify(achievementData)
    });
}

export async function updateAchievement(achievementId, achievementData) {
    return apiCall(`/achievements/${achievementId}`, {
        method: 'PUT',
        body: JSON.stringify(achievementData)
    });
}

export async function deleteAchievement(achievementId) {
    return apiCall(`/achievements/${achievementId}`, { method: 'DELETE' });
}

// ============================================
// Comments
// ============================================
export async function getComments(itemId, itemType) {
    return apiCall(`/comments?itemId=${itemId}&itemType=${itemType}`);
}

export async function addComment(itemId, itemType, commentData) {
    return apiCall('/comments', {
        method: 'POST',
        body: JSON.stringify({
            ...commentData,
            itemId,
            itemType
        })
    });
}

export async function updateComment(itemId, itemType, commentId, commentData) {
    return apiCall(`/comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify(commentData)
    });
}

export async function deleteComment(itemId, itemType, commentId) {
    return apiCall(`/comments/${commentId}`, { method: 'DELETE' });
}

// ============================================
// Ratings
// ============================================
export async function getRatings(itemId, itemType) {
    return apiCall(`/ratings?itemId=${itemId}&itemType=${itemType}`);
}

export async function submitRating(itemId, itemType, ratingData) {
    return apiCall('/ratings', {
        method: 'POST',
        body: JSON.stringify({
            ...ratingData,
            itemId,
            itemType
        })
    });
}

// ============================================
// Messages
// ============================================
export async function sendMessage(messageData) {
    return apiCall('/messages', {
        method: 'POST',
        body: JSON.stringify(messageData)
    });
}

export async function getMessages() {
    return apiCall('/messages');
}

export async function markMessageAsRead(messageId) {
    return apiCall(`/messages/${messageId}/read`, { method: 'PUT' });
}

export async function deleteMessage(messageId) {
    return apiCall(`/messages/${messageId}`, { method: 'DELETE' });
}

// ============================================
// Feedback
// ============================================
export async function submitFeedback(feedbackData) {
    return apiCall('/feedback', {
        method: 'POST',
        body: JSON.stringify(feedbackData)
    });
}

export async function getFeedback() {
    return apiCall('/feedback');
}

export async function markFeedbackAsRead(feedbackId) {
    return apiCall(`/feedback/${feedbackId}/read`, { method: 'PUT' });
}

export async function deleteFeedback(feedbackId) {
    return apiCall(`/feedback/${feedbackId}`, { method: 'DELETE' });
}

