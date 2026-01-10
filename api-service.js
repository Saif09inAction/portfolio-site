// API Service - Replaces Firebase Service
const API_BASE_URL = 'http://localhost:3001/api';

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
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
}

// Helper for file uploads
async function uploadFiles(endpoint, formData) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        body: formData
    });
    
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Upload failed' }));
        throw new Error(error.error || 'Upload failed');
    }
    
    return response.json();
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
    
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
        method: 'PUT',
        body: formData
    });
    
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Update failed' }));
        throw new Error(error.error || 'Update failed');
    }
    
    return response.json();
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

