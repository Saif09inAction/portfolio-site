// ============================================
// localStorage-based Data Storage (No API needed)
// ============================================

// ============================================
// Theme Management
// ============================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const html = document.documentElement;

// Load saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ============================================
// Language Management
// ============================================
let translations = {};
let currentLanguage = localStorage.getItem('language') || 'en';

// Load translations
async function loadTranslations() {
    try {
        const response = await fetch('translations.json');
        translations = await response.json();
        applyTranslations(currentLanguage);
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Apply translations to the page
function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const keys = key.split('.');
        let value = translations[lang];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                value = null;
                break;
            }
        }
        
        if (value) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update star ratings after translation
    setTimeout(updateStarRatings, 100);
}

// Language selector change handler
const languageSelect = document.getElementById('languageSelect');
languageSelect.value = currentLanguage;
languageSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    localStorage.setItem('language', currentLanguage);
    applyTranslations(currentLanguage);
});

// Initialize translations
loadTranslations();

// ============================================
// Smooth Scrolling
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Skip nav-link as it's handled separately
        if (href !== '#' && href !== '' && !this.classList.contains('nav-link')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const isMobile = window.innerWidth <= 768;
                const offsetTop = target.offsetTop - (isMobile ? 60 : 80);
                window.scrollTo({
                    top: Math.max(0, offsetTop),
                    behavior: 'smooth'
                });
            }
        }
    });
});

// CTA buttons smooth scroll
document.querySelectorAll('[data-scroll]').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-scroll');
        const target = document.getElementById(targetId);
        if (target) {
            const isMobile = window.innerWidth <= 768;
            const offsetTop = target.offsetTop - (isMobile ? 60 : 80);
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Mobile Menu Toggle
// ============================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link and handle smooth scroll
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);
            
            // Close mobile menu first
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            
            // Then scroll to target with proper offset for mobile
            if (target) {
                const isMobile = window.innerWidth <= 768;
                const offsetTop = target.offsetTop - (isMobile ? 60 : 80);
                
                // Small delay to ensure menu closes smoothly
                setTimeout(() => {
                    window.scrollTo({
                        top: Math.max(0, offsetTop),
                        behavior: 'smooth'
                    });
                }, 100);
            }
        } else {
            // For external links, just close menu
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// ============================================
// Navbar Scroll Effect
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Star Rating Display
// ============================================
function updateStarRatings() {
    document.querySelectorAll('.stars').forEach(starsElement => {
        const rating = parseFloat(starsElement.getAttribute('data-rating'));
        const starElements = starsElement.querySelectorAll('.star');
        
        starElements.forEach((star, index) => {
            const starValue = index + 1;
            star.style.opacity = '1'; // Reset opacity
            
            if (starValue <= Math.floor(rating)) {
                // Full star
                star.style.color = '#ffc107';
            } else if (starValue - 0.5 <= rating && rating < starValue) {
                // Half star
                star.style.color = '#ffc107';
                star.style.opacity = '0.5';
            } else {
                // Empty star
                star.style.color = '';
                star.style.opacity = '1';
            }
        });
    });
}

// Initialize star ratings on load
document.addEventListener('DOMContentLoaded', () => {
    updateStarRatings();
});

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.achievement-card, .project-card, .idea-card, .skill-category, .detail-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ============================================
// Form Handling (for future backend integration)
// ============================================
// Placeholder for future comment/rating submission
function handleCommentSubmit(projectId, comment) {
    // Future: Send to backend API
    console.log(`Comment for project ${projectId}:`, comment);
}

function handleRatingSubmit(projectId, rating) {
    // Future: Send to backend API
    console.log(`Rating for project ${projectId}:`, rating);
}

// ============================================
// Utility Functions
// ============================================
// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimized scroll handler
const optimizedScrollHandler = throttle(() => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// ============================================
// Initialize on DOM Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Ensure all initializations are complete
    updateStarRatings();
    
    // Set initial scroll position
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

// ============================================
// Accessibility Enhancements
// ============================================
// Keyboard navigation for theme toggle
themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
    }
});

// Focus management for mobile menu
mobileMenuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        mobileMenuToggle.click();
    }
});

// Skip to main content link (accessibility)
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--accent-color);
    color: var(--bg-primary);
    padding: 8px;
    text-decoration: none;
    z-index: 10000;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ============================================
// Modal & Detail View Management
// ============================================
const detailModal = document.getElementById('detailModal');
const modalClose = document.getElementById('modalClose');
let currentItemId = null;
let currentItemType = null; // 'project' or 'achievement'

// Storage keys
const STORAGE_COMMENTS = 'portfolio_comments';
const STORAGE_RATINGS = 'portfolio_ratings';

// Initialize storage
function initStorage() {
    if (!localStorage.getItem(STORAGE_COMMENTS)) {
        localStorage.setItem(STORAGE_COMMENTS, JSON.stringify({}));
    }
    if (!localStorage.getItem(STORAGE_RATINGS)) {
        localStorage.setItem(STORAGE_RATINGS, JSON.stringify({}));
    }
}

// Old localStorage functions removed - now using Firebase
// These functions are replaced by Firebase service functions

// Old openDetailModal removed - replaced by Firebase version below

// Close modal
function closeDetailModal() {
    const modal = document.getElementById('detailModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentItemId = null;
    currentItemType = null;
    
    // Reset form
    const commentAuthor = document.getElementById('commentAuthor');
    const commentText = document.getElementById('commentText');
    if (commentAuthor) commentAuthor.value = '';
    if (commentText) commentText.value = '';
    
    // Reset rating input
    document.querySelectorAll('.rating-star').forEach(star => {
        star.classList.remove('active');
    });
    const ratingText = document.getElementById('ratingText');
    if (ratingText) ratingText.textContent = 'Click to rate';
}

// Format date
function formatDate(dateString) {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Old localStorage-based functions removed - replaced by Firebase versions below

// Edit comment
async function editComment(index) {
    const comments = getCommentsFromAPI(currentItemId, currentItemType);
    const comment = comments[index];
    
    if (!comment) return;
    
    const commentId = comment.id || comment._id || index;
    const commentItem = document.querySelector(`[data-comment-id="${commentId}"]`);
    if (!commentItem) return;
    
    commentItem.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${escapeHtml(comment.author)}</span>
            <span class="comment-date">Editing...</span>
        </div>
        <div class="comment-edit-form">
            <textarea class="comment-edit-textarea" id="editCommentText">${escapeHtml(comment.text)}</textarea>
            <div class="comment-edit-actions">
                <button class="comment-save-btn" onclick="saveCommentEdit('${commentId}')">Save</button>
                <button class="comment-cancel-btn" onclick="cancelCommentEdit()">Cancel</button>
            </div>
        </div>
    `;
}

// Save comment edit
async function saveCommentEdit(commentId) {
    const newText = document.getElementById('editCommentText').value.trim();
    
    if (!newText) {
        alert('Comment cannot be empty.');
        return;
    }
    
    try {
        updateCommentInAPI(currentItemId, currentItemType, commentId, {
            text: newText
        });
        loadComments();
    } catch (error) {
        console.error('Error updating comment:', error);
        alert('Error updating comment. Please try again.');
    }
}

// Cancel comment edit
async function cancelCommentEdit() {
    loadComments();
}

// Delete comment
function deleteCommentHandler(commentId) {
    if (!confirm('Are you sure you want to delete this comment?')) {
        return;
    }
    
    try {
        deleteCommentFromAPI(currentItemId, currentItemType, commentId);
        loadComments();
    } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Error deleting comment. Please try again.');
    }
}

function deleteCommentFromAPI(itemId, itemType, commentId) {
    try {
        const storage = JSON.parse(localStorage.getItem(STORAGE_COMMENTS) || '{}');
        const key = `${itemType}_${itemId}`;
        if (storage[key]) {
            storage[key] = storage[key].filter(c => (c._id || c.id) !== commentId);
            localStorage.setItem(STORAGE_COMMENTS, JSON.stringify(storage));
        }
        return true;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
}

function updateCommentInAPI(itemId, itemType, commentId, commentData) {
    try {
        const storage = JSON.parse(localStorage.getItem(STORAGE_COMMENTS) || '{}');
        const key = `${itemType}_${itemId}`;
        if (storage[key]) {
            const index = storage[key].findIndex(c => (c._id || c.id) === commentId);
            if (index !== -1) {
                storage[key][index] = { ...storage[key][index], ...commentData };
                localStorage.setItem(STORAGE_COMMENTS, JSON.stringify(storage));
            }
        }
        return true;
    } catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
}

// Rating input handlers (now handled in setupRatingInput above)

function setRatingInput(rating) {
    const stars = document.querySelectorAll('.rating-star');
    stars.forEach((star, index) => {
        star.classList.remove('active');
        if (index < rating) {
            star.classList.add('active');
        }
    });
    document.getElementById('ratingText').textContent = `${rating} ${rating === 1 ? 'star' : 'stars'}`;
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('.rating-star');
    stars.forEach((star, index) => {
        star.classList.remove('active');
        if (index < rating) {
            star.classList.add('active');
        }
    });
}

function clearRatingInput() {
    document.querySelectorAll('.rating-star').forEach(star => {
        star.classList.remove('active');
    });
    document.getElementById('ratingText').textContent = 'Click to rate';
}

function getCurrentRating() {
    const ratings = getRatingsFromAPI(currentItemId, currentItemType);
    const userId = localStorage.getItem('userId') || '';
    const userRating = ratings.find(r => r.userId === userId);
    return userRating ? userRating.rating : null;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event listeners
// Removed duplicate - using consolidated DOMContentLoaded below

// Make functions globally available for onclick handlers
window.editComment = editComment;
window.deleteCommentHandler = deleteCommentHandler;
window.saveCommentEdit = saveCommentEdit;
window.cancelCommentEdit = cancelCommentEdit;

// ============================================
// localStorage-based Data Storage (No API needed)
// ============================================
function getCommentsFromAPI(itemId, itemType) {
    try {
        const storage = JSON.parse(localStorage.getItem(STORAGE_COMMENTS) || '{}');
        const key = `${itemType}_${itemId}`;
        const comments = storage[key] || [];
        return comments.map(comment => ({
            id: comment._id || comment.id || `comment_${Date.now()}_${Math.random()}`,
            userId: comment.userId || '',
            author: comment.author || '',
            text: comment.text || '',
            timestamp: comment.timestamp ? new Date(comment.timestamp).getTime() : Date.now()
        }));
    } catch (error) {
        console.error('Error getting comments:', error);
        return [];
    }
}

function saveCommentToAPI(itemId, itemType, commentData) {
    try {
        const storage = JSON.parse(localStorage.getItem(STORAGE_COMMENTS) || '{}');
        const key = `${itemType}_${itemId}`;
        if (!storage[key]) storage[key] = [];
        const newComment = {
            ...commentData,
            _id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString()
        };
        storage[key].push(newComment);
        localStorage.setItem(STORAGE_COMMENTS, JSON.stringify(storage));
        return true;
    } catch (error) {
        console.error('Error saving comment:', error);
        return false;
    }
}

function getRatingsFromAPI(itemId, itemType) {
    try {
        const storage = JSON.parse(localStorage.getItem(STORAGE_RATINGS) || '{}');
        const key = `${itemType}_${itemId}`;
        const ratings = storage[key] || [];
        return ratings.map(rating => ({
            id: rating._id || rating.id || `rating_${Date.now()}_${Math.random()}`,
            userId: rating.userId || '',
            rating: rating.rating || 0,
            timestamp: rating.timestamp ? new Date(rating.timestamp).getTime() : Date.now()
        }));
    } catch (error) {
        console.error('Error getting ratings:', error);
        return [];
    }
}

function saveRatingToAPI(itemId, itemType, rating) {
    try {
        const userId = localStorage.getItem('userId') || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('userId', userId);
        
        const storage = JSON.parse(localStorage.getItem(STORAGE_RATINGS) || '{}');
        const key = `${itemType}_${itemId}`;
        if (!storage[key]) storage[key] = [];
        
        // Remove existing rating from this user
        storage[key] = storage[key].filter(r => r.userId !== userId);
        
        // Add new rating
        storage[key].push({
            userId,
            rating,
            _id: `rating_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString()
        });
        
        localStorage.setItem(STORAGE_RATINGS, JSON.stringify(storage));
        return true;
    } catch (error) {
        console.error('Error saving rating:', error);
        return false;
    }
}

// Load and display comments (localStorage version)
async function loadComments() {
    const comments = getCommentsFromAPI(currentItemId, currentItemType);
    const commentsList = document.getElementById('commentsList');
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<p class="no-comments" data-translate="modal.comments.none">No comments yet. Be the first to comment!</p>';
        return;
    }
    
    commentsList.innerHTML = comments.map((comment, index) => {
        const userId = localStorage.getItem('userId') || '';
        const isOwner = comment.userId === userId;
        const commentDate = new Date(comment.timestamp).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        const commentId = comment.id || comment._id || `comment_${index}_${Date.now()}`;
        
        return `
            <div class="comment-item" data-comment-id="${commentId}">
                <div class="comment-header">
                    <span class="comment-author">${escapeHtml(comment.author)}</span>
                    <span class="comment-date">${commentDate}</span>
                </div>
                <div class="comment-content">${escapeHtml(comment.text)}</div>
                ${isOwner ? `
                    <div class="comment-actions">
                        <button class="comment-edit-btn" onclick="editComment(${index})">Edit</button>
                        <button class="comment-delete-btn" onclick="deleteCommentHandler('${commentId}')">Delete</button>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Load ratings from localStorage
async function loadRatings() {
    if (!currentItemId || !currentItemType) return;
    
    try {
        const ratings = getRatingsFromAPI(currentItemId, currentItemType);
        const avgRating = calculateAverageRatingFromRatings(ratings);
        
        // Update average rating display
        const avgStars = document.querySelectorAll('#modalAverageRating .star');
        const avgValue = parseFloat(avgRating);
        
        avgStars.forEach((star, index) => {
            star.classList.remove('active');
            star.style.opacity = '1';
            if (index < Math.floor(avgValue)) {
                star.classList.add('active');
            } else if (index < avgValue) {
                star.classList.add('active');
                star.style.opacity = '0.5';
            }
        });
        
        const modalAverageValue = document.getElementById('modalAverageValue');
        const modalRatingCount = document.getElementById('modalRatingCount');
        if (modalAverageValue) modalAverageValue.textContent = avgRating;
        if (modalRatingCount) modalRatingCount.textContent = `(${ratings.length} ${ratings.length === 1 ? 'rating' : 'ratings'})`;
    } catch (error) {
        console.error('Error loading ratings:', error);
    }
}

function calculateAverageRatingFromRatings(ratings) {
    if (ratings.length === 0) return '0.0';
    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    return (sum / ratings.length).toFixed(1);
}

// Add comment handler - uses localStorage
function addCommentHandler() {
    if (!currentItemId || !currentItemType) {
        alert('Error: No item selected.');
        return;
    }
    
    const authorInput = document.getElementById('commentAuthor');
    const textInput = document.getElementById('commentText');
    
    if (!authorInput || !textInput) {
        alert('Error: Comment form not found.');
        return;
    }
    
    const author = authorInput.value.trim();
    const text = textInput.value.trim();
    
    if (!author || !text) {
        alert('Please fill in both name and comment fields.');
        return;
    }
    
    try {
        const userId = localStorage.getItem('userId') || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('userId', userId);
        
        saveCommentToAPI(currentItemId, currentItemType, {
            userId,
            author,
            text
        });
        
        // Clear inputs and reload comments
        authorInput.value = '';
        textInput.value = '';
        loadComments();
    } catch (error) {
        console.error('Error posting comment:', error);
        alert('Error posting comment. Please try again.');
    }
}

// Save rating (localStorage version)
function saveRatingToAPIWrapper(rating) {
    saveRatingToAPI(currentItemId, currentItemType, rating);
    loadRatings();
}

// Setup rating input (called when modal opens)
function setupRatingInput() {
    const ratingStars = document.querySelectorAll('.rating-star');
    const ratingText = document.getElementById('ratingText');
    
    // Remove old listeners
    ratingStars.forEach(star => {
        const newStar = star.cloneNode(true);
        star.parentNode.replaceChild(newStar, star);
    });
    
    // Re-query after clone
    const newRatingStars = document.querySelectorAll('.rating-star');
    
    newRatingStars.forEach((star, index) => {
        star.addEventListener('click', () => {
            const rating = index + 1;
            setRatingInput(rating);
            saveRatingToAPIWrapper(rating);
        });
        
        star.addEventListener('mouseenter', () => {
            highlightStars(index + 1);
            ratingText.textContent = `${index + 1} ${index === 0 ? 'star' : 'stars'}`;
        });
    });
    
    const ratingInput = document.getElementById('ratingInput');
    if (ratingInput) {
        ratingInput.addEventListener('mouseleave', () => {
            if (currentItemId && currentItemType) {
                const ratings = getRatingsFromAPI(currentItemId, currentItemType);
                const userId = localStorage.getItem('userId') || '';
                const userRating = ratings.find(r => r.userId === userId);
                if (userRating) {
                    setRatingInput(userRating.rating);
                } else {
                    clearRatingInput();
                }
            }
        });
    }
}

// Open detail modal for projects/achievements
function openDetailModal(itemId, itemType) {
    currentItemId = itemId;
    currentItemType = itemType;
    const detailModal = document.getElementById('detailModal');
    
    if (!detailModal) {
        console.error('Detail modal not found');
        return;
    }
    
    try {
        // Get from hardcoded data or API
        let item = null;
        if (itemType === 'project') {
            // Check hardcoded projects first
            item = HARDCODED_PROJECTS.find(p => p.id === itemId || p._id === itemId);
        } else {
            // Check hardcoded achievements first
            item = HARDCODED_ACHIEVEMENTS.find(a => a.id === itemId || a._id === itemId);
        }
        
        if (!item) {
            console.error('Item not found:', itemId, itemType);
            return;
        }
        
        // Populate modal with item data
        document.getElementById('modalTitle').textContent = item.title || item.name || '';
        document.getElementById('modalDescription').textContent = item.description || '';
        
        // Format date based on type
        let dateText = '';
        if (itemType === 'achievement') {
            const parts = [];
            if (item.year) parts.push(`Year: ${item.year}`);
            if (item.date && !item.year) parts.push(`Date: ${formatDate(item.date)}`);
            if (item.platform) parts.push(`Platform: ${item.platform}`);
            if (item.position) parts.push(`Position: ${item.position}`);
            if (item.skill) parts.push(`Skill: ${item.skill}`);
            dateText = parts.join(' • ');
        } else {
            dateText = `Date: ${formatDate(item.date || '')}`;
        }
        document.getElementById('modalDate').textContent = dateText || '';
        document.getElementById('modalType').textContent = itemType === 'project' ? 'Project' : 'Achievement';
        
        // Set thumbnail
        const modalThumbnail = document.getElementById('modalThumbnail');
        if (item.thumbnail) {
            const thumbnailUrl = item.thumbnail.startsWith('http') ? item.thumbnail : item.thumbnail;
            modalThumbnail.innerHTML = `<img src="${thumbnailUrl}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">`;
        } else {
            modalThumbnail.innerHTML = '<div class="thumbnail-placeholder">Image</div>';
        }
        
        // Display technologies/languages used
        const modalTechnologies = document.getElementById('modalTechnologies');
        const technologiesTags = document.getElementById('technologiesTags');
        if (item.technologies && item.technologies.length > 0) {
            modalTechnologies.style.display = 'block';
            technologiesTags.innerHTML = item.technologies.map(tech => 
                `<span class="tech-tag">${escapeHtml(tech)}</span>`
            ).join('');
        } else {
            modalTechnologies.style.display = 'none';
        }
        
        // Show/hide View Project button (GitHub)
        const viewProjectBtn = document.getElementById('viewProjectBtn');
        if (itemType === 'project' && item.githubUrl) {
            viewProjectBtn.style.display = 'inline-block';
            viewProjectBtn.onclick = () => window.open(item.githubUrl, '_blank');
        } else {
            viewProjectBtn.style.display = 'none';
        }
        
        // Show/hide Visit Site button (Deployed Site)
        const visitSiteBtn = document.getElementById('visitSiteBtn');
        if (itemType === 'project' && item.siteUrl) {
            visitSiteBtn.style.display = 'inline-block';
            visitSiteBtn.onclick = () => window.open(item.siteUrl, '_blank');
        } else {
            visitSiteBtn.style.display = 'none';
        }
        
        // Show/hide LinkedIn button (for Achievements)
        const linkedinBtn = document.getElementById('linkedinBtn');
        if (itemType === 'achievement' && item.linkedinUrl) {
            linkedinBtn.style.display = 'inline-block';
            linkedinBtn.onclick = () => window.open(item.linkedinUrl, '_blank');
        } else if (itemType === 'achievement') {
            // Fallback to profile if no specific post URL
            linkedinBtn.style.display = 'inline-block';
            linkedinBtn.onclick = () => window.open('https://www.linkedin.com/in/saif-salmani-38b63a30b/', '_blank');
        } else {
            linkedinBtn.style.display = 'none';
        }
        
        // Hide additional images gallery (not used with hardcoded data)
        const imagesGallery = document.getElementById('modalImagesGallery');
        if (imagesGallery) {
            imagesGallery.style.display = 'none';
        }
        
        // Setup Feedback button to redirect to email
        const feedbackBtn = document.getElementById('feedbackBtn');
        if (feedbackBtn) {
            feedbackBtn.onclick = () => {
                window.location.href = `mailto:saifsalmani224@gmail.com?subject=Feedback: ${encodeURIComponent(item.title || item.name || '')}`;
            };
        }
        
        // Setup Contact Developer button
        const contactDeveloperBtn = document.getElementById('contactDeveloperBtn');
        if (contactDeveloperBtn) {
            contactDeveloperBtn.onclick = () => {
                const contactPopup = document.getElementById('contactPopup');
                if (contactPopup) {
                    contactPopup.classList.add('active');
                }
            };
        }
        
        // Load comments and ratings
        loadComments();
        loadRatings();
        
        // Show modal
        detailModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Setup rating input after modal is shown
        setTimeout(() => {
            setupRatingInput();
            
            // Load user's existing rating
            setTimeout(() => {
                if (currentItemId && currentItemType) {
                    const ratings = getRatingsFromAPI(currentItemId, currentItemType);
                    const userId = localStorage.getItem('userId') || '';
                    const userRating = ratings.find(r => r.userId === userId);
                    if (userRating) {
                        setRatingInput(userRating.rating);
                    } else {
                        clearRatingInput();
                    }
                }
            }, 100);
        }, 100);
    } catch (error) {
        console.error('Error opening modal:', error);
    }
}

// ============================================
// Popup Management - Handlers moved to DOMContentLoaded
// ============================================

// ============================================
// Load Projects and Achievements from Firebase
// ============================================
// Hardcoded Projects and Achievements Data
// ============================================
const HARDCODED_PROJECTS = [
    {
        id: 'dev-1',
        type: 'developer',
        title: 'PrismHold',
        description: 'PrismHold is a luxury handmade brand co-founded with my brother. We have sold 100+ units and expanded sales via Amazon & Flipkart. Currently working together on growing the business and developing the brand further.',
        date: '2023-11-30',
        githubUrl: 'https://github.com/Saif09inAction/Prismhold',
        siteUrl: 'https://prismhold.netlify.app/',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        thumbnail: 'images/projects/prismhold.png'
    },
    {
        id: 'dev-2',
        type: 'developer',
        title: 'LinguaSync',
        description: 'LinguaSync is a real-time multilingual chat application built using the MERN stack. It enables users to communicate across different languages using instant translation while chatting. The app supports real-time messaging through Socket.IO, secure authentication using JWT, and persistent message storage in MongoDB. Designed to reduce language barriers in global communication.',
        date: '2024-01-15',
        githubUrl: 'https://github.com/Saif09inAction/linguasync',
        siteUrl: '',
        technologies: ['React.js (Vite)', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'JWT', 'Axios'],
        thumbnail: 'images/projects/lyguasync.png'
    },
    {
        id: 'dev-3',
        type: 'developer',
        title: 'PlagiaCheck',
        description: 'PlagiaCheck is a web-based plagiarism detection tool designed for academic use. Users can upload documents (PDF, DOCX, TXT), and the system analyzes content similarity using text-comparison techniques like cosine similarity and term frequency. Firebase is used for authentication and data handling, making the platform secure and scalable.',
        date: '2024-02-20',
        githubUrl: 'https://github.com/Saif09inAction/PlagiaCheck',
        siteUrl: 'https://saif09inaction.github.io/PlagiaCheck/',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'Firebase'],
        thumbnail: 'images/projects/plagiacheck.png'
    },
    {
        id: 'dev-4',
        type: 'developer',
        title: 'FundFlow – Finance Learning Platform',
        description: 'Finance learning platform built for hackathon and demo day events. Features include AI-powered stock price prediction model, paper trading (dummy trading) for risk-free real-time practice, live finance news updates, and community chat for learning and discussion. The platform focuses on educating users about finance through interactive elements and community-based learning.',
        date: '2024-01-25',
        githubUrl: 'https://github.com/Saif09inAction/Fund-Flow-mumbai-hacks',
        siteUrl: '',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'AI/ML'],
        thumbnail: 'images/projects/fundflow.png'
    },
    {
        id: 'dev-5',
        type: 'developer',
        title: 'Revora',
        description: 'Revora is an early-stage web project focused on experimenting with UI/UX concepts and application structure. The repository suggests exploration of layout design and interactive components, serving as a foundation for future feature expansion.',
        date: '2023-09-15',
        githubUrl: 'https://github.com/Saif09inAction/Revora',
        siteUrl: 'https://revorabysaif.netlify.app/',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        thumbnail: 'images/projects/revora.png'
    },
    {
        id: 'dev-6',
        type: 'developer',
        title: 'Family Info App',
        description: 'A family management web application that allows users to add and manage family member details such as names, birthdays, and basic information. The app also highlights upcoming birthdays and important dates, acting as a digital family dashboard.',
        date: '2024-03-10',
        githubUrl: 'https://github.com/Saif09inAction/family-info-app',
        siteUrl: 'https://familyboard.netlify.app',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
        thumbnail: 'images/projects/familyinfo.png'
    },
    {
        id: 'dev-7',
        type: 'developer',
        title: 'Country Info',
        description: 'Country Info is a web application that displays information about different countries using external APIs. Users can view details such as country name, flag, region, and other metadata. This project demonstrates API handling, dynamic UI updates, and data rendering.',
        date: '2023-12-15',
        githubUrl: 'https://github.com/Saif09inAction/Country-Info',
        siteUrl: 'https://country-info-app-by-saifsalmani.netlify.app/',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        thumbnail: 'images/projects/countryinfo.png'
    },
    {
        id: 'dev-8',
        type: 'developer',
        title: 'YouTube Clone',
        description: 'A front-end clone of YouTube created to practice layout structuring, responsive design, and visual replication of a real-world platform. The project focuses on understanding complex UI components like video grids, navigation bars, and content cards.',
        date: '2023-10-20',
        githubUrl: 'https://github.com/Saif09inAction/youtube-clone',
        siteUrl: 'https://youtubeclone-by-saif.netlify.app/',
        technologies: ['HTML', 'CSS'],
        thumbnail: 'images/projects/youtubeclone.png'
    },
    {
        id: 'edit-1',
        type: 'editor',
        title: 'College Club Instagram Reel',
        description: 'Created engaging Instagram reels for college external club page. Edited dynamic short-form content with smooth transitions, trending effects, and engaging storytelling. Managed content creation workflow and maintained consistent brand identity across multiple reels.',
        date: '2024-12-15',
        githubUrl: '',
        siteUrl: 'https://www.instagram.com/reel/DS-RH0Uj74Q/?igsh=cDl4MG9nY2RmdnJq',
        technologies: ['CapCut', 'Final Cut Pro', 'Premiere Pro'],
        thumbnail: 'images/projects/externalclub.png'
    },
    {
        id: 'edit-2',
        type: 'editor',
        title: 'College Club Social Media Content',
        description: 'Produced and edited social media reels for college club Instagram page. Focused on creating visually appealing content with rhythm-based editing, color grading, and seamless cuts. Contributed to content strategy and engagement growth.',
        date: '2024-11-20',
        githubUrl: '',
        siteUrl: 'https://www.instagram.com/reel/DO89iq-EtjS/?igsh=NGtoMDFqczJ3NjI5',
        technologies: ['CapCut', 'Final Cut Pro', 'Premiere Pro'],
        thumbnail: 'images/projects/externalclub.png'
    },
    {
        id: 'edit-3',
        type: 'editor',
        title: 'College Club Instagram Reel Series',
        description: 'Edited multiple Instagram reels for college external club. Specialized in creating engaging short-form content with trending transitions, visual effects, and compelling narratives. Handled end-to-end editing process from raw footage to final delivery.',
        date: '2024-10-18',
        githubUrl: '',
        siteUrl: 'https://www.instagram.com/reel/DOiwm8bCGe_/?igsh=MThxODBhaWoyYWZx',
        technologies: ['CapCut', 'Final Cut Pro', 'Premiere Pro'],
        thumbnail: 'images/projects/externalclub.png'
    },
    {
        id: 'edit-4',
        type: 'editor',
        title: 'Social Media Video Editing',
        description: 'Created professional video content for college club social media presence. Edited reels with attention to pacing, visual flow, and audience engagement. Worked on both short-form and long-form video content creation.',
        date: '2024-09-22',
        githubUrl: '',
        siteUrl: 'https://www.instagram.com/reel/DGa2H8bN9Bv/?igsh=MXVlb2E5NTBkMXd1eQ==',
        technologies: ['CapCut', 'Final Cut Pro', 'Premiere Pro'],
        thumbnail: 'images/projects/externalclub.png'
    },
    {
        id: 'edit-5',
        type: 'editor',
        title: 'College Club Content Creation',
        description: 'Managed and edited video content for college external club Instagram page. Created engaging reels with modern editing techniques, color correction, and creative transitions. Contributed to planning shoots, capturing content, and editing videos aligned with the club\'s theme and brand identity.',
        date: '2024-08-30',
        githubUrl: '',
        siteUrl: 'https://www.instagram.com/reel/DGzlWrQS1-m/?igsh=MW14cGo0Zmcxams3Mg==',
        technologies: ['CapCut', 'Final Cut Pro', 'Premiere Pro'],
        thumbnail: 'images/projects/externalclub.png'
    }
];

const HARDCODED_ACHIEVEMENTS = [
    {
        id: 'ach-dev-1',
        type: 'developer',
        name: '🥈 1st Runner-Up – DemoDay 2025',
        platform: 'ITM Skills University & LetsUpgrade',
        position: '1st Runner-Up (Team: Code Blooded Brothers)',
        year: '2025',
        description: 'Secured 1st Runner-Up position at Demo Day organized by ITM Skills University. Built a finance learning app featuring AI-powered stock price prediction, paper trading for real-time practice, live finance news updates, and community chat functionality.',
        thumbnail: 'images/achievements/DemoDay 2025 (1st Runner-Up).png',
        linkedinUrl: 'https://www.linkedin.com/posts/saif-salmani-38b63a30b_financeapp-ai-demoday-activity-7358619143362736130-Ix3e?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE7wMJsBpGf8OfntguvZE7ddl_5AIEmDzOk'
    },
    {
        id: 'ach-dev-2',
        type: 'developer',
        name: 'Marketing Intern – LetsUpgrade',
        platform: 'LetsUpgrade',
        position: 'Marketing Intern (Dec 2024 & Feb 2025)',
        year: '2024-2025',
        description: 'Successfully completed two internships with LetsUpgrade as a Marketing Intern. Worked on business analysis, product improvement ideas, quality checking (QC) of projects, data collection and research, while learning corporate workflows, team collaboration, and product development cycles.',
        thumbnail: 'images/achievements/ Quality Control Leadership.png',
        linkedinUrl: 'https://www.linkedin.com/posts/saif-salmani-38b63a30b_internshipexperience-letsupgrade-marketinginternship-activity-7311539032281272320-IE5q?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE7wMJsBpGf8OfntguvZE7ddl_5AIEmDzOk'
    },
    {
        id: 'ach-dev-3',
        type: 'developer',
        name: 'Entrepreneurial Achievement – PrismHold',
        platform: 'Co-Founder',
        position: 'Co-Founder & Entrepreneur',
        year: '2024',
        description: 'Co-founded a luxury handmade brand with my brother, sold 100+ units, and expanded sales via Amazon & Flipkart. Currently working together on growing the business.',
        thumbnail: 'images/achievements/Entrepreneurial.PNG'
    },
    {
        id: 'ach-dev-4',
        type: 'developer',
        name: 'Mumbai Hacks 2024 – Guinness World Records',
        platform: 'Mumbai Hacks',
        position: 'Participant',
        year: '2024',
        description: 'Honored to be part of history at Mumbai Hacks 2024, officially recognized as the world\'s largest hackathon by Guinness World Records! An unforgettable experience of innovation, teamwork, and boundary-pushing ideas.',
        thumbnail: 'images/achievements/Mumbai Hacks 2024.png',
        linkedinUrl: 'https://www.linkedin.com/posts/saif-salmani-38b63a30b_mumbaihacks2k24-worldrecord-guinnessworldrecords-activity-7256566133988769793-6MQe?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE7wMJsBpGf8OfntguvZE7ddl_5AIEmDzOk'
    },
    {
        id: 'ach-dev-5',
        type: 'developer',
        name: 'PIWOT Imagine Hackathon 2025',
        platform: 'PIWOT',
        position: 'Participant (Reached Demo Round)',
        year: '2025',
        description: 'Attended PIWOT Imagine Hackathon 2025 at Jio Convention Centre. Team worked tirelessly and successfully made it to the demo round, showcasing innovative ideas. Gained valuable experience in teamwork, learning, and connecting with like-minded innovators.',
        thumbnail: 'images/achievements/PIWOT Hackathon.png',
        linkedinUrl: 'https://www.linkedin.com/posts/saif-salmani-38b63a30b_hackathonexperience-innovation-teamwork-activity-7289224601560072192-JZDF?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE7wMJsBpGf8OfntguvZE7ddl_5AIEmDzOk'
    },
    {
        id: 'ach-dev-6',
        type: 'developer',
        name: 'Avalanche Hackathon – Mumbai Edition',
        platform: 'Avalanche',
        position: 'Participant',
        year: '2024',
        description: 'Participated in Avalanche Hackathon – Mumbai Edition. Connected with passionate Web3 builders, explored innovative projects built on Avalanche, and continued learning and growing in the blockchain ecosystem.',
        thumbnail: 'images/achievements/Avalanche Hackathon.png',
        linkedinUrl: 'https://www.linkedin.com/posts/saif-salmani-38b63a30b_avalanche-hackathon-web3-activity-7364003970584911875-3MZF?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE7wMJsBpGf8OfntguvZE7ddl_5AIEmDzOk'
    },
    {
        id: 'ach-dev-7',
        type: 'developer',
        name: 'Stellar Hackathon – Pune',
        platform: 'Stellar Hackathon',
        position: 'Participant',
        year: '2024',
        description: 'Participated in a multi-team hackathon environment. Exposure to diverse ideas, competitive problem-solving, and real-world use cases.',
        thumbnail: 'images/achievements/stellar.png'
    },
    {
        id: 'ach-dev-8',
        type: 'developer',
        name: 'ITM DemoDay',
        platform: 'ITM Skills University',
        position: 'Participant',
        year: '2024',
        description: 'Presented a project to judges and peers. Evaluated on innovation, execution, and business potential.',
        thumbnail: 'images/achievements/demoday .png'
    },
    {
        id: 'ach-dev-9',
        type: 'developer',
        name: 'Mumbai Hacks 2025',
        platform: 'Mumbai Hacks',
        position: 'Participant',
        year: '2025',
        description: 'Returned as a participant with improved technical and presentation skills. Demonstrated growth through better project structuring and pitching.',
        thumbnail: 'images/achievements/mumbai hacks 2025.png'
    },
    {
        id: 'ach-edit-1',
        type: 'editor',
        name: '🥈 1st Runner-Up – DemoDay 2025',
        platform: 'ITM Skills University & LetsUpgrade',
        skill: 'Innovation & Business',
        year: '2025',
        description: 'Secured 1st Runner-Up position at Demo Day. Built a finance learning app with AI stock prediction, paper trading, live finance news, and community chat as part of Code Blooded Brothers team.',
        thumbnail: 'images/achievements/DemoDay 2025 (1st Runner-Up).png',
        linkedinUrl: 'https://www.linkedin.com/posts/saif-salmani-38b63a30b_financeapp-ai-demoday-activity-7358619143362736130-Ix3e?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE7wMJsBpGf8OfntguvZE7ddl_5AIEmDzOk'
    },
    {
        id: 'ach-edit-2',
        type: 'editor',
        name: 'PrismHold – Co-Founder',
        platform: 'Entrepreneurship',
        skill: 'E-commerce & Marketing',
        year: '2024',
        description: 'Co-founded luxury handmade brand with my brother, sold 100+ units via Amazon & Flipkart. Currently working together on growing the business.',
        thumbnail: 'images/achievements/Entrepreneurial.PNG'
    },
    {
        id: 'ach-edit-3',
        type: 'editor',
        name: 'Marketing Intern – LetsUpgrade',
        platform: 'LetsUpgrade',
        skill: 'Business Analysis & Quality Control',
        year: '2024-2025',
        description: 'Completed two internships (Dec 2024 & Feb 2025) as Marketing Intern. Worked on business analysis, product improvement, quality checking of projects, and learned corporate workflows and product development cycles.',
        thumbnail: 'images/achievements/ Quality Control Leadership.png'
    }
];

// ============================================
// Load Hardcoded Projects and Achievements
// ============================================
function loadProjectsFromAPI() {
    try {
        // Use hardcoded projects
        const projects = HARDCODED_PROJECTS;
        
        // Update developer projects
        const devProjects = projects.filter(p => p.type === 'developer');
        const devGrid = document.querySelector('#developer .projects-grid');
        if (devGrid) {
            if (devProjects.length > 0) {
                const cards = devProjects.map(project => createProjectCard(project, 'developer'));
                devGrid.innerHTML = cards.join('');
            } else {
                devGrid.innerHTML = '<p>No developer projects yet.</p>';
            }
        }
        
        // Update editor projects
        const editProjects = projects.filter(p => p.type === 'editor');
        const editGrid = document.querySelector('#editor .projects-grid.carousel-wrapper');
        if (editGrid) {
            if (editProjects.length > 0) {
                const cards = editProjects.map(project => createProjectCard(project, 'editor'));
                editGrid.innerHTML = cards.join('');
            } else {
                editGrid.innerHTML = '<p>No editor projects yet.</p>';
            }
        }
        
        // Re-attach event listeners
        attachProjectListeners();
        
        // Re-initialize carousels after content loads
        setTimeout(() => {
            const devProjectsCarousel = document.querySelector('#developer .projects-grid.carousel-wrapper');
            if (devProjectsCarousel) {
                setupCarousel(devProjectsCarousel, 'projects');
            }
            const editorProjectsCarousel = document.querySelector('#editor .projects-grid.carousel-wrapper');
            if (editorProjectsCarousel) {
                setupCarousel(editorProjectsCarousel, 'projects');
            }
        }, 100);
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function loadAchievementsFromAPI() {
    try {
        // Use hardcoded achievements
        const achievements = HARDCODED_ACHIEVEMENTS;
        
        // Update developer achievements
        const devAchievements = achievements.filter(a => a.type === 'developer');
        const devGrid = document.querySelector('#developer .achievements-grid');
        if (devGrid) {
            if (devAchievements.length > 0) {
                const cards = devAchievements.map(achievement => createAchievementCard(achievement, 'developer'));
                devGrid.innerHTML = cards.join('');
            } else {
                devGrid.innerHTML = '<p>No developer achievements yet.</p>';
            }
        }
        
        // Update editor achievements
        const editAchievements = achievements.filter(a => a.type === 'editor');
        const editGrid = document.querySelector('#editor .achievements-grid.carousel-wrapper');
        if (editGrid) {
            if (editAchievements.length > 0) {
                const cards = editAchievements.map(achievement => createAchievementCard(achievement, 'editor'));
                editGrid.innerHTML = cards.join('');
            } else {
                editGrid.innerHTML = '<p>No editor achievements yet.</p>';
            }
        }
        
        // Re-attach event listeners
        attachAchievementListeners();
        
        // Update star ratings for newly loaded achievement cards
        updateStarRatings();
        
        // Re-initialize carousels after content loads
        setTimeout(() => {
            const devAchievementsCarousel = document.querySelector('#developer .achievements-grid.carousel-wrapper');
            if (devAchievementsCarousel) {
                setupCarousel(devAchievementsCarousel, 'achievements');
            }
            const editorAchievementsCarousel = document.querySelector('#editor .achievements-grid.carousel-wrapper');
            if (editorAchievementsCarousel) {
                setupCarousel(editorAchievementsCarousel, 'achievements');
            }
        }, 100);
    } catch (error) {
        console.error('Error loading achievements:', error);
    }
}

function createProjectCard(project, type) {
    const projectId = project.id || project._id;
    // Get ratings from localStorage - handle errors gracefully
    let avgRating = '0.0';
    try {
        const ratings = getRatingsFromAPI(projectId, 'project');
        avgRating = ratings.length > 0 
            ? (ratings.reduce((acc, r) => acc + (r.rating || 0), 0) / ratings.length).toFixed(1)
            : '0.0';
    } catch (error) {
        console.warn('Could not load ratings for project:', projectId, error);
        avgRating = '0.0';
    }
    
    const thumbnailUrl = project.thumbnail ? (project.thumbnail.startsWith('http') ? project.thumbnail : project.thumbnail) : '';
    
    return `
        <div class="project-card" data-project-id="${projectId}" data-project-type="${type}" data-project-date="${project.date || ''}">
            <div class="project-thumbnail">
                ${thumbnailUrl ? `<img src="${thumbnailUrl}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">` : '<div class="thumbnail-placeholder">Project Image</div>'}
            </div>
            <div class="project-content">
                <h4 class="project-title">${escapeHtml(project.title)}</h4>
                <p class="project-desc-short">${escapeHtml((project.description || '').substring(0, 100))}${(project.description || '').length > 100 ? '...' : ''}</p>
                <div class="project-bottom-section">
                    <div class="project-rating">
                        <div class="stars" data-rating="${avgRating}">
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                        </div>
                        <span class="rating-value">${avgRating}</span>
                    </div>
                    <button class="project-link project-toggle-btn">View Details</button>
                </div>
            </div>
        </div>
    `;
}

function createAchievementCard(achievement, type) {
    const achievementId = achievement.id || achievement._id;
    const thumbnailUrl = achievement.thumbnail ? (achievement.thumbnail.startsWith('http') ? achievement.thumbnail : achievement.thumbnail) : '';
    
    // Get ratings from localStorage - handle errors gracefully
    let avgRating = '0.0';
    try {
        const ratings = getRatingsFromAPI(achievementId, 'achievement');
        avgRating = ratings.length > 0 
            ? (ratings.reduce((acc, r) => acc + (r.rating || 0), 0) / ratings.length).toFixed(1)
            : '0.0';
    } catch (error) {
        console.warn('Could not load ratings for achievement:', achievementId, error);
        avgRating = '0.0';
    }
    
    // Show minimal data - just the core description, truncated to 50 characters for better alignment
    let descriptionText = (achievement.description || '').trim();
    const truncatedDescription = descriptionText.length > 50 
        ? descriptionText.substring(0, 50) + '...' 
        : descriptionText;
    
    return `
        <div class="achievement-card" data-achievement-id="${achievementId}" data-achievement-type="${type}" data-achievement-date="${achievement.date || achievement.year || ''}">
            <div class="achievement-thumbnail">
                ${thumbnailUrl ? `<img src="${thumbnailUrl}" alt="${escapeHtml(achievement.name || achievement.title || 'Achievement')}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="thumbnail-placeholder" style="display: none;">Achievement Image</div>` : '<div class="thumbnail-placeholder">Achievement Image</div>'}
            </div>
            <div class="achievement-content">
                <h4 class="achievement-name">${escapeHtml(achievement.name || achievement.title || 'Untitled')}</h4>
                <p class="achievement-desc">${escapeHtml(truncatedDescription)}</p>
                <div class="achievement-bottom-section">
                    <div class="achievement-rating">
                        <div class="stars" data-rating="${avgRating}">
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                        </div>
                        <span class="rating-value">${avgRating}</span>
                    </div>
                    <button class="project-link">View Details</button>
                </div>
            </div>
        </div>
    `;
}

function attachProjectListeners() {
    document.querySelectorAll('.project-card').forEach(card => {
        const toggleBtn = card.querySelector('.project-toggle-btn');
        const projectId = card.getAttribute('data-project-id');
        
        if (!projectId) return;
        
        // Open modal on button click
        if (toggleBtn) {
            toggleBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                await openDetailModal(projectId, 'project');
            });
        }
    });
}

// Load comments for expanded project card
function loadProjectComments(projectId) {
    const commentsList = document.getElementById(`commentsList-${projectId}`);
    if (!commentsList) return;
    
    try {
        const comments = getCommentsFromAPI(projectId, 'project');
        
        if (comments.length === 0) {
            commentsList.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
            return;
        }
        
        commentsList.innerHTML = comments.map(comment => {
            const userId = localStorage.getItem('userId') || '';
            const isOwner = comment.userId === userId;
            const commentDate = new Date(comment.timestamp).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            const commentId = comment.id || comment._id || `comment_${Date.now()}`;
            
            // Get user's rating for this comment if available
            const userRating = null; // You can add this if needed
            
            return `
                <div class="comment-item-expanded" data-comment-id="${commentId}">
                    <div class="comment-header-expanded">
                        <span class="comment-author-expanded">${escapeHtml(comment.author)}</span>
                        <span class="comment-date-expanded">${commentDate}</span>
                    </div>
                    <div class="comment-content-expanded">${escapeHtml(comment.text)}</div>
                    ${isOwner ? `
                        <div class="comment-actions-expanded">
                            <button class="comment-edit-btn-expanded" onclick="editProjectComment('${projectId}', '${commentId}')">Edit</button>
                            <button class="comment-delete-btn-expanded" onclick="deleteProjectComment('${projectId}', '${commentId}')">Delete</button>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading comments:', error);
        commentsList.innerHTML = '<p class="error">Error loading comments. Please try again.</p>';
    }
}

// Load ratings for expanded project card
function loadProjectRatings(projectId) {
    try {
        const ratings = getRatingsFromAPI(projectId, 'project');
        const avgRating = ratings.length > 0 
            ? (ratings.reduce((acc, r) => acc + (r.rating || 0), 0) / ratings.length).toFixed(1)
            : '0.0';
        
        // Update overall rating display in expanded section
        const card = document.querySelector(`[data-project-id="${projectId}"]`);
        if (!card) return;
        
        const ratingDisplay = card.querySelector('.overall-rating-value');
        if (ratingDisplay) {
            ratingDisplay.textContent = avgRating;
        }
        
        // Update stars display in card header
        const starsContainer = card.querySelector('.stars[data-rating]');
        if (starsContainer) {
            const stars = starsContainer.querySelectorAll('.star');
            const avg = parseFloat(avgRating);
            stars.forEach((star, index) => {
                star.classList.remove('active');
                star.style.opacity = '';
                if (index < Math.floor(avg)) {
                    star.classList.add('active');
                } else if (index < avg) {
                    star.classList.add('active');
                    star.style.opacity = '0.6';
                }
            });
            starsContainer.setAttribute('data-rating', avgRating);
        }
        
        // Update rating value in card header
        const ratingValue = card.querySelector('.rating-value');
        if (ratingValue) {
            ratingValue.textContent = avgRating;
        }
        
        // Update user's current rating if exists
        const userId = localStorage.getItem('userId') || '';
        const userRating = ratings.find(r => r.userId === userId);
        const ratingInput = document.getElementById(`ratingInput-${projectId}`);
        if (ratingInput) {
            const stars = ratingInput.querySelectorAll('.rating-star-expanded');
            stars.forEach((star, index) => {
                star.classList.remove('active');
                if (userRating && index < userRating.rating) {
                    star.classList.add('active');
                }
            });
        }
    } catch (error) {
        console.error('Error loading ratings:', error);
    }
}

// Setup rating input for project card
function setupProjectRatingInput(projectId) {
    const ratingInput = document.getElementById(`ratingInput-${projectId}`);
    if (!ratingInput) return;
    
    // Check if already initialized
    if (ratingInput.dataset.initialized === 'true') return;
    ratingInput.dataset.initialized = 'true';
    
    const stars = ratingInput.querySelectorAll('.rating-star-expanded');
    
    // Add hover effects
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', () => {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.style.opacity = '1';
                    s.style.transform = 'scale(1.1)';
                } else {
                    s.style.opacity = '0.3';
                }
            });
        });
    });
    
    ratingInput.addEventListener('mouseleave', () => {
        stars.forEach((s) => {
            const isActive = s.classList.contains('active');
            s.style.opacity = isActive ? '1' : '0.5';
            s.style.transform = isActive ? 'scale(1.2)' : 'scale(1)';
        });
    });
    
    // Add click handlers
    stars.forEach((star, index) => {
        star.addEventListener('click', async (e) => {
            e.stopPropagation();
            const rating = index + 1;
            
            // Highlight stars
            stars.forEach((s, i) => {
                s.classList.remove('active');
                s.style.opacity = '';
                s.style.transform = '';
                if (i <= index) {
                    s.classList.add('active');
                    s.style.opacity = '1';
                    s.style.transform = 'scale(1.2)';
                } else {
                    s.style.opacity = '0.5';
                }
            });
            
            // Save rating
            try {
                saveRatingToAPI(projectId, 'project', rating);
                
                // Reload ratings to update average
                loadProjectRatings(projectId);
            } catch (error) {
                console.error('Error saving rating:', error);
                alert('Error saving rating. Please try again.');
            }
        });
    });
}

// Add comment to project
function addCommentToProject(projectId) {
    const authorInput = document.getElementById(`commentAuthor-${projectId}`);
    const textInput = document.getElementById(`commentText-${projectId}`);
    
    if (!authorInput || !textInput) return;
    
    const author = authorInput.value.trim();
    const text = textInput.value.trim();
    
    if (!author || !text) {
        alert('Please fill in both name and comment fields.');
        return;
    }
    
    try {
        const userId = localStorage.getItem('userId') || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('userId', userId);
        
        saveCommentToAPI(projectId, 'project', { userId, author, text });
        
        // Clear inputs
        authorInput.value = '';
        textInput.value = '';
        
        // Reload comments
        loadProjectComments(projectId);
    } catch (error) {
        console.error('Error adding comment:', error);
        alert('Error posting comment. Please try again.');
    }
}

// Make functions globally available
window.addCommentToProject = addCommentToProject;
window.editProjectComment = function(projectId, commentId) {
    // Similar to editComment but for project cards
    const comments = getCommentsFromAPI(projectId, 'project');
    const comment = comments.find(c => (c.id || c._id) === commentId);
    if (!comment) return;
    
    const commentItem = document.querySelector(`[data-comment-id="${commentId}"]`);
    if (!commentItem) return;
    
    commentItem.innerHTML = `
        <div class="comment-edit-form-expanded">
            <textarea class="comment-edit-textarea-expanded" id="editCommentText-${commentId}">${escapeHtml(comment.text)}</textarea>
            <div class="comment-edit-actions-expanded">
                <button class="comment-save-btn-expanded" onclick="saveProjectCommentEdit('${projectId}', '${commentId}')">Save</button>
                <button class="comment-cancel-btn-expanded" onclick="cancelProjectCommentEdit('${projectId}', '${commentId}')">Cancel</button>
            </div>
        </div>
    `;
};

window.saveProjectCommentEdit = function(projectId, commentId) {
    const textInput = document.getElementById(`editCommentText-${commentId}`);
    if (!textInput) return;
    
    const newText = textInput.value.trim();
    if (!newText) {
        alert('Comment cannot be empty.');
        return;
    }
    
    try {
        updateCommentInAPI(projectId, 'project', commentId, { text: newText });
        loadProjectComments(projectId);
    } catch (error) {
        console.error('Error updating comment:', error);
        alert('Error updating comment. Please try again.');
    }
};

window.cancelProjectCommentEdit = function(projectId, commentId) {
    loadProjectComments(projectId);
};

window.deleteProjectComment = function(projectId, commentId) {
    if (!confirm('Are you sure you want to delete this comment?')) {
        return;
    }
    
    try {
        deleteCommentFromAPI(projectId, 'project', commentId);
        loadProjectComments(projectId);
    } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Error deleting comment. Please try again.');
    }
};

function attachAchievementListeners() {
    document.querySelectorAll('.achievement-card').forEach(card => {
        card.addEventListener('click', () => {
            const achievementId = card.getAttribute('data-achievement-id');
            if (achievementId) {
                openDetailModal(achievementId, 'achievement');
            }
        });
    });
}

// ============================================
// Carousel Navigation
// ============================================
function setupCarousel(carouselWrapper, type) {
    const viewport = carouselWrapper.closest('.carousel-viewport') || carouselWrapper.parentElement;
    const container = carouselWrapper.closest('.carousel-container');
    if (!container || !viewport) return;
    
    const leftArrow = container.querySelector('.carousel-arrow-left');
    const rightArrow = container.querySelector('.carousel-arrow-right');
    // Handle different item types: achievements, projects, or skill categories
    const items = carouselWrapper.querySelectorAll('.achievement-card, .project-card, .skill-category');
    
    if (items.length === 0) return;
    
    // Remove old listeners if they exist
    if (carouselWrapper.carouselNav) {
        if (leftArrow && carouselWrapper.carouselNav.prevHandler) {
            leftArrow.removeEventListener('click', carouselWrapper.carouselNav.prevHandler);
        }
        if (rightArrow && carouselWrapper.carouselNav.nextHandler) {
            rightArrow.removeEventListener('click', carouselWrapper.carouselNav.nextHandler);
        }
    }
    
    // Configuration: show 4-5 cards at a time
    const cardsPerView = 4; // Number of cards visible at once
    const cardsPerScroll = 4; // Number of cards to scroll at a time
    let currentIndex = 0;
    const totalItems = items.length;
    
    // Wait for cards to render to get accurate widths
    function waitForCards() {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (items.length > 0 && items[0].offsetWidth > 0) {
                    resolve();
                } else {
                    setTimeout(resolve, 100);
                }
            }, 100);
        });
    }
    
    // Calculate card width including gap
    function getCardWidth() {
        if (items.length === 0) return 300;
        const firstCard = items[0];
        const cardWidth = firstCard.offsetWidth || firstCard.getBoundingClientRect().width || 300;
        const gap = parseInt(window.getComputedStyle(carouselWrapper).gap) || 16;
        return cardWidth + gap;
    }
    
    // Calculate how many cards are visible in viewport
    function getVisibleCardsCount() {
        const viewportWidth = viewport.offsetWidth || viewport.clientWidth;
        const cardWidth = getCardWidth();
        const visible = Math.floor(viewportWidth / cardWidth);
        return Math.max(4, Math.min(5, visible)); // Between 4-5 cards
    }
    
    // Calculate max scroll index
    function getMaxIndex() {
        const visibleCount = getVisibleCardsCount();
        const maxScroll = Math.max(0, totalItems - visibleCount);
        return maxScroll;
    }
    
    // Update carousel position (horizontal scrolling)
    function updateCarousel() {
        const cardWidth = getCardWidth();
        const scrollAmount = currentIndex * cardWidth;
        carouselWrapper.style.transform = `translateX(-${scrollAmount}px)`;
        
        const maxIndex = getMaxIndex();
        
        // Update arrow states
        if (leftArrow) {
            leftArrow.disabled = currentIndex === 0;
        }
        if (rightArrow) {
            rightArrow.disabled = currentIndex >= maxIndex || totalItems <= getVisibleCardsCount();
        }
    }
    
    // Navigate functions - scroll by cardsPerScroll (4 cards)
    function goToNext() {
        const maxIndex = getMaxIndex();
        if (currentIndex < maxIndex) {
            currentIndex = Math.min(currentIndex + cardsPerScroll, maxIndex);
            updateCarousel();
        }
    }
    
    function goToPrev() {
        if (currentIndex > 0) {
            currentIndex = Math.max(currentIndex - cardsPerScroll, 0);
            updateCarousel();
        }
    }
    
    // Initialize after cards are rendered
    waitForCards().then(() => {
        updateCarousel();
    });
    
    // Store handlers for cleanup
    carouselWrapper.carouselNav = { 
        goToNext, 
        goToPrev, 
        nextHandler: goToNext,
        prevHandler: goToPrev,
        currentIndex: () => currentIndex 
    };
    
    // Attach event listeners
    if (leftArrow) {
        leftArrow.addEventListener('click', goToPrev);
    }
    if (rightArrow) {
        rightArrow.addEventListener('click', goToNext);
    }
    
    // Recalculate on window resize
    let resizeTimeout;
    const resizeHandler = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            waitForCards().then(() => {
                updateCarousel();
            });
        }, 250);
    };
    window.addEventListener('resize', resizeHandler);
    
    // Store resize handler for cleanup if needed
    carouselWrapper.resizeHandler = resizeHandler;
}

function initCarousels() {
    // Initialize developer section carousels
    const devAchievementsCarousel = document.querySelector('#developer .achievements-grid.carousel-wrapper');
    if (devAchievementsCarousel) {
        setupCarousel(devAchievementsCarousel, 'achievements');
    }
    
    const devProjectsCarousel = document.querySelector('#developer .projects-grid.carousel-wrapper');
    if (devProjectsCarousel) {
        setupCarousel(devProjectsCarousel, 'projects');
    }
    
    const devSkillsCarousel = document.querySelector('#developer .skills-container.carousel-wrapper');
    if (devSkillsCarousel) {
        setupCarousel(devSkillsCarousel, 'skills');
    }
    
    // Initialize editor section carousels
    const editorAchievementsCarousel = document.querySelector('#editor .achievements-grid.carousel-wrapper');
    if (editorAchievementsCarousel) {
        setupCarousel(editorAchievementsCarousel, 'achievements');
    }
    
    const editorProjectsCarousel = document.querySelector('#editor .projects-grid.carousel-wrapper');
    if (editorProjectsCarousel) {
        setupCarousel(editorProjectsCarousel, 'projects');
    }
    
    const editorSkillsCarousel = document.querySelector('#editor .skills-container.carousel-wrapper');
    if (editorSkillsCarousel) {
        setupCarousel(editorSkillsCarousel, 'skills');
    }
}

// Initialize on page load - Main consolidated DOMContentLoaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        initStorage();
        updateStarRatings();
        
        // Load data from hardcoded arrays
        console.log('Loading projects and achievements...');
        try {
            loadProjectsFromAPI();
            loadAchievementsFromAPI();
            console.log('Data loaded successfully');
        } catch (error) {
            console.error('Error loading data:', error);
        }
        
        // Attach listeners after data loads
        attachProjectListeners();
        attachAchievementListeners();
        
        // Initialize carousels after content is loaded
        setTimeout(() => {
            initCarousels();
        }, 100);
        
        // Modal handlers
        const modalClose = document.getElementById('modalClose');
        const detailModal = document.getElementById('detailModal');
        
        if (modalClose && detailModal) {
            modalClose.addEventListener('click', closeDetailModal);
            detailModal.addEventListener('click', (e) => {
                if (e.target === detailModal) {
                    closeDetailModal();
                }
            });
        }
        
        // Comment handlers
        const commentSubmit = document.getElementById('commentSubmit');
        const commentText = document.getElementById('commentText');
        
        if (commentSubmit) {
            commentSubmit.addEventListener('click', addCommentHandler);
        }
        
        if (commentText) {
            commentText.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                    addCommentHandler();
                }
            });
        }
        
        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && detailModal && detailModal.classList.contains('active')) {
                closeDetailModal();
            }
        });
        
        // Popup handlers - Contact Developer
        const contactDeveloperBtn = document.getElementById('contactDeveloperBtn');
        const contactPopup = document.getElementById('contactPopup');
        const contactPopupClose = document.getElementById('contactPopupClose');
        
        if (contactDeveloperBtn && contactPopup) {
            contactDeveloperBtn.addEventListener('click', () => {
                contactPopup.classList.add('active');
            });
        }
        
        if (contactPopupClose && contactPopup) {
            contactPopupClose.addEventListener('click', () => {
                contactPopup.classList.remove('active');
            });
            
            contactPopup.addEventListener('click', (e) => {
                if (e.target === contactPopup) {
                    contactPopup.classList.remove('active');
                }
            });
        }
        
        // Popup handlers - Feedback
        const feedbackBtn = document.getElementById('feedbackBtn');
        const feedbackPopup = document.getElementById('feedbackPopup');
        const feedbackPopupClose = document.getElementById('feedbackPopupClose');
        const feedbackForm = document.getElementById('feedbackForm');
        
        if (feedbackBtn && feedbackPopup) {
            feedbackBtn.addEventListener('click', () => {
                feedbackPopup.classList.add('active');
            });
        }
        
        if (feedbackPopupClose && feedbackPopup && feedbackForm) {
            feedbackPopupClose.addEventListener('click', () => {
                feedbackPopup.classList.remove('active');
                feedbackForm.reset();
            });
            
            feedbackPopup.addEventListener('click', (e) => {
                if (e.target === feedbackPopup) {
                    feedbackPopup.classList.remove('active');
                    feedbackForm.reset();
                }
            });
        }
        
        if (feedbackForm) {
            feedbackForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const userName = document.getElementById('feedbackName')?.value.trim();
                const feedback = document.getElementById('feedbackText')?.value.trim();
                
                if (!userName || !feedback) {
                    alert('Please fill in all fields.');
                    return;
                }
                
                try {
                    const projectName = document.getElementById('modalTitle')?.textContent || 'General';
                    await submitFeedback({
                        userName,
                        feedback,
                        projectName,
                        projectId: currentItemId || ''
                    });
                    
                    alert('Feedback submitted successfully! Thank you!');
                    if (feedbackPopup) feedbackPopup.classList.remove('active');
                    if (feedbackForm) feedbackForm.reset();
                } catch (error) {
                    console.error('Error submitting feedback:', error);
                    alert('Error submitting feedback. Please try again.');
                }
            });
        }
        
        // Set initial scroll position
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                setTimeout(() => {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
        
    } catch (error) {
        console.error('Error initializing:', error);
    }
});

