// Polaroid Gallery
document.addEventListener('DOMContentLoaded', () => {
    // Initialize stats animation
    initStatsAnimation();
    
    // Initialize polaroid rotation
    initPolaroidRotation();
    
    // Initialize review carousel
    initReviewCarousel();
    
    // Initialize load more functionality
    initLoadMore();
    
    // Initialize Instagram Feed
    initInstagramFeed();

    // Initialize category filters
    const categoryTabs = document.querySelectorAll('.category-tab');
    let currentCategory = 'all';

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            // Update current category
            currentCategory = tab.dataset.category;
            // Filter stories
            filterStories();
        });
    });

    // Initialize reaction buttons
    const reactionBtns = document.querySelectorAll('.reaction-btn');
    reactionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const count = parseInt(this.textContent.match(/\d+/)[0]);
            const newCount = count + 1;
            const icon = this.querySelector('i').outerHTML;
            this.innerHTML = `${icon} ${newCount}`;
            
            // Add animation class
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });

    // Comment functionality
    const commentForm = document.querySelector('.comment-form');
    const commentInput = document.querySelector('.comment-input');
    const commentsList = document.querySelector('.comments-list');

    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (commentInput.value.trim()) {
                addComment(commentInput.value);
                commentInput.value = '';
            }
        });
    }

    // Auto-resize textarea
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });

    // Community wall message functionality
    const messageForm = document.querySelector('.write-message');
    const messageInput = document.querySelector('.message-input');
    const messageBoard = document.querySelector('.message-board');

    if (messageForm) {
        const postMessageBtn = messageForm.querySelector('.post-message-btn');
        postMessageBtn.addEventListener('click', () => {
            if (messageInput.value.trim()) {
                addMessage(messageInput.value);
                messageInput.value = '';
            }
        });
    }

    // Load more functionality
    const loadMoreBtn = document.querySelector('.load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreStories);
    }

    // Floating memories animation
    initializeFloatingMemories();
});

// Stats Animation
function initStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateNumber(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
    let current = start;
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Polaroid Rotation
function initPolaroidRotation() {
    const polaroids = document.querySelectorAll('.polaroid');
    polaroids.forEach(polaroid => {
        const rotation = Math.random() * 10 - 5; // Random rotation between -5 and 5 degrees
        polaroid.style.setProperty('--rotation', `${rotation}deg`);
        
        // Add click handler for polaroid zoom
        polaroid.addEventListener('click', () => {
            const modal = createPolaroidModal(polaroid);
            document.body.appendChild(modal);
            
            setTimeout(() => {
                modal.style.opacity = '1';
                modal.querySelector('.modal-content').style.transform = 'scale(1)';
            }, 10);
        });
    });
}

function createPolaroidModal(polaroid) {
    const modal = document.createElement('div');
    modal.className = 'polaroid-modal';
    modal.style.opacity = '0';
    
    const content = document.createElement('div');
    content.className = 'modal-content';
    content.style.transform = 'scale(0.8)';
    
    content.innerHTML = polaroid.innerHTML;
    modal.appendChild(content);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    return modal;
}

// Review Carousel
function initReviewCarousel() {
    const carousel = document.querySelector('.reviews-carousel');
    const cards = carousel.querySelectorAll('.review-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    // Show first card
    updateCarousel();

    prevBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    });

    nextBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    });

    function updateCarousel() {
        cards.forEach((card, index) => {
            card.style.display = index === currentIndex ? 'block' : 'none';
            if (index === currentIndex) {
                card.style.opacity = '0';
                card.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateX(0)';
                }, 50);
            }
        });
    }
}

// Load More Functionality
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more');
    const polaroidContainer = document.querySelector('.polaroid-container');
    let page = 1;

    loadMoreBtn?.addEventListener('click', () => {
        // Simulate loading more items
        loadMoreBtn.textContent = 'Loading...';
        loadMoreBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            // Add new polaroids
            for (let i = 0; i < 3; i++) {
                const polaroid = createPolaroid();
                polaroidContainer.appendChild(polaroid);
                
                // Animate new polaroid
                setTimeout(() => {
                    polaroid.style.opacity = '1';
                    polaroid.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
                }, i * 100);
            }

            loadMoreBtn.textContent = 'Load More Stories';
            loadMoreBtn.disabled = false;
            page++;

            // Hide button after loading all content
            if (page >= 3) {
                loadMoreBtn.style.display = 'none';
            }
        }, 1500);
    });
}

function createPolaroid() {
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    polaroid.style.opacity = '0';
    polaroid.style.transform = 'translateY(20px)';
    
    // Sample data - in real implementation, this would come from your backend
    const stories = [
        {
            image: 'images/customer-moment2.jpg',
            caption: 'My daily companion! 💕',
            name: 'Lisa, with Cozy Cat'
        },
        {
            image: 'images/customer-moment3.jpg',
            caption: 'Perfect study buddy! 📚',
            name: 'Tom, with Smart Owl'
        },
        {
            image: 'images/customer-moment4.jpg',
            caption: 'Movie night with my plushie! 🎬',
            name: 'Alex, with Sleepy Bear'
        }
    ];
    
    const randomStory = stories[Math.floor(Math.random() * stories.length)];
    
    polaroid.innerHTML = `
        <div class="polaroid-content">
            <img src="${randomStory.image}" alt="Customer moment">
            <div class="caption">
                <p>${randomStory.caption}</p>
                <span class="customer-name">- ${randomStory.name}</span>
            </div>
        </div>
    `;
    
    return polaroid;
}

// Instagram Feed
function initInstagramFeed() {
    const instagramGrid = document.querySelector('.instagram-grid');
    
    // Sample Instagram posts - in real implementation, these would come from Instagram API
    const posts = [
        { image: 'images/insta1.jpg', likes: 234, comments: 12 },
        { image: 'images/insta2.jpg', likes: 187, comments: 8 },
        { image: 'images/insta3.jpg', likes: 342, comments: 15 },
        { image: 'images/insta4.jpg', likes: 156, comments: 6 },
        { image: 'images/insta5.jpg', likes: 289, comments: 11 },
        { image: 'images/insta6.jpg', likes: 198, comments: 9 }
    ];
    
    posts.forEach(post => {
        const postElement = createInstagramPost(post);
        instagramGrid.appendChild(postElement);
    });
}

function createInstagramPost(post) {
    const postElement = document.createElement('div');
    postElement.className = 'instagram-post';
    
    postElement.innerHTML = `
        <div class="post-overlay">
            <div class="post-stats">
                <span><i class="fas fa-heart"></i> ${post.likes}</span>
                <span><i class="fas fa-comment"></i> ${post.comments}</span>
            </div>
        </div>
        <img src="${post.image}" alt="Instagram post">
    `;
    
    return postElement;
}

// Share Story Modal
document.querySelector('.share-btn')?.addEventListener('click', () => {
    const modal = createShareModal();
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
});

function createShareModal() {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.style.opacity = '0';
    
    modal.innerHTML = `
        <div class="modal-content" style="transform: scale(0.8)">
            <button class="close-modal"><i class="fas fa-times"></i></button>
            <h2>Share Your Story</h2>
            <form class="share-form">
                <div class="form-group">
                    <label for="name">Your Name</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="plushie">Your Plushie's Name</label>
                    <input type="text" id="plushie" required>
                </div>
                <div class="form-group">
                    <label for="story">Your Story</label>
                    <textarea id="story" required></textarea>
                </div>
                <div class="form-group">
                    <label for="photo">Upload Photo</label>
                    <input type="file" id="photo" accept="image/*">
                </div>
                <button type="submit" class="submit-btn">Submit Story</button>
            </form>
        </div>
    `;
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle form submission here
        alert('Thank you for sharing your story! We will review it and post it soon.');
        modal.click(); // Close the modal
    });
    
    return modal;
}

// Helper Functions
function filterStories() {
    const stories = document.querySelectorAll('.polaroid');
    stories.forEach(story => {
        if (currentCategory === 'all' || story.dataset.category === currentCategory) {
            story.style.display = 'block';
            story.classList.add('fade-in');
        } else {
            story.style.display = 'none';
            story.classList.remove('fade-in');
        }
    });
}

function addComment(text) {
    const comment = document.createElement('div');
    comment.classList.add('comment', 'fade-in');
    comment.innerHTML = `
        <div class="comment-header">
            <img src="images/default-avatar.png" alt="User" class="comment-avatar">
            <div class="comment-info">
                <h4>Guest User</h4>
                <span>Just now</span>
            </div>
        </div>
        <p>${text}</p>
        <div class="comment-actions">
            <button class="reaction-btn"><i class="fas fa-heart"></i> 0</button>
            <button class="reaction-btn"><i class="fas fa-reply"></i> Reply</button>
        </div>
    `;
    commentsList.prepend(comment);
}

function addMessage(text) {
    const message = document.createElement('div');
    message.classList.add('message-card', 'fade-in');
    message.innerHTML = `
        <div class="message-header">
            <img src="images/default-avatar.png" alt="User" class="message-avatar">
            <div class="message-info">
                <h4>Guest User</h4>
                <span>Just now</span>
            </div>
        </div>
        <p>${text}</p>
        <div class="message-actions">
            <button class="reaction-btn"><i class="fas fa-heart"></i> 0</button>
            <button class="reaction-btn"><i class="fas fa-share"></i> Share</button>
        </div>
    `;
    messageBoard.prepend(message);
}

function loadMoreStories() {
    // Simulate loading more stories
    const polaroidContainer = document.querySelector('.polaroid-container');
    const loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('loading-indicator');
    loadMoreBtn.insertAdjacentElement('beforebegin', loadingIndicator);

    // Simulate API call delay
    setTimeout(() => {
        loadingIndicator.remove();
        // Add new stories here
        const newStories = createNewStories();
        polaroidContainer.append(...newStories);
        filterStories();
    }, 1000);
}

function createNewStories() {
    // Sample data - replace with actual API data
    const stories = [
        {
            image: 'images/story1.jpg',
            caption: 'My first plushie friend!',
            author: 'Emma',
            category: 'adoption'
        },
        {
            image: 'images/story2.jpg',
            caption: 'Best birthday gift ever!',
            author: 'James',
            category: 'gift'
        }
    ];

    return stories.map(story => {
        const polaroid = document.createElement('div');
        polaroid.classList.add('polaroid', 'fade-in');
        polaroid.dataset.category = story.category;
        polaroid.style.setProperty('--rotation', `${Math.random() * 6 - 3}deg`);
        
        polaroid.innerHTML = `
            <div class="polaroid-content">
                <img src="${story.image}" alt="${story.caption}">
                <div class="caption">
                    <p>${story.caption}</p>
                    <span class="customer-name">- ${story.author}</span>
                </div>
            </div>
        `;
        return polaroid;
    });
}

function initializeFloatingMemories() {
    const memories = document.querySelector('.floating-memories');
    if (!memories) return;

    // Create floating polaroids
    for (let i = 0; i < 15; i++) {
        const polaroid = document.createElement('div');
        polaroid.classList.add('memory-polaroid');
        polaroid.style.setProperty('--delay', `${Math.random() * 5}s`);
        polaroid.style.setProperty('--duration', `${Math.random() * 10 + 10}s`);
        polaroid.style.setProperty('--scale', `${Math.random() * 0.5 + 0.5}`);
        polaroid.style.setProperty('--rotation', `${Math.random() * 360}deg`);
        memories.appendChild(polaroid);
    }
} 