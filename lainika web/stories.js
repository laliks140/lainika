document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    // Rose Petals Animation
    function createRosePetals() {
        const container = document.querySelector('.rose-petals-container');
        const petalCount = 15; // Number of petals

        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.className = 'rose-petal';
            
            // Random starting position
            const startX = Math.random() * window.innerWidth;
            petal.style.setProperty('--start-x', `${startX}px`);
            
            // Random ending position (within a range of the start position)
            const endX = startX + (Math.random() * 200 - 100);
            petal.style.setProperty('--end-x', `${endX}px`);
            
            // Random delay
            petal.style.animationDelay = `${Math.random() * 10}s`;
            
            // Random size
            const size = 10 + Math.random() * 10;
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            
            container.appendChild(petal);
        }
    }

    // Story Categories
    const categoryBubbles = document.querySelectorAll('.category-bubble');
    categoryBubbles.forEach(bubble => {
        bubble.addEventListener('click', () => {
            categoryBubbles.forEach(b => b.classList.remove('active'));
            bubble.classList.add('active');
            filterStories(bubble.dataset.category);
        });
    });

    function filterStories(category) {
        const stories = document.querySelectorAll('.featured-story');
        stories.forEach(story => {
            if (category === 'all' || story.dataset.category === category) {
                story.style.display = 'block';
                story.style.animation = 'fadeIn 0.5s ease';
            } else {
                story.style.display = 'none';
            }
        });
    }

    // Comments Section
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const commentText = this.querySelector('textarea').value;
            if (commentText.trim()) {
                addComment(commentText);
                this.reset();
            }
        });
    }

    function addComment(text) {
        const commentsContainer = document.querySelector('.comments-container');
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.innerHTML = `
            <div class="comment-header">
                <img src="assets/default-avatar.png" alt="User" class="comment-avatar">
                <div class="comment-meta">
                    <h4>Guest User</h4>
                    <span>Just now</span>
                </div>
            </div>
            <p>${text}</p>
        `;
        commentsContainer.insertBefore(newComment, commentsContainer.firstChild);
        newComment.style.animation = 'fadeIn 0.5s ease';
    }

    // Story Reactions
    const reactionButtons = document.querySelectorAll('.reaction-btn');
    reactionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const count = this.querySelector('.reaction-count');
            const currentCount = parseInt(count.textContent);
            count.textContent = currentCount + 1;
            
            // Add animation
            this.classList.add('bounce-animation');
            setTimeout(() => this.classList.remove('bounce-animation'), 1000);
        });
    });

    // Floating WhatsApp Button
    const whatsappButton = document.querySelector('.floating-button');
    if (whatsappButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                whatsappButton.style.display = 'flex';
            } else {
                whatsappButton.style.display = 'none';
            }
        });
    }

    // Gallery Image Modal
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const modal = document.querySelector('.image-modal');
    
    if (galleryItems.length && modal) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const modalImg = modal.querySelector('img');
                modalImg.src = this.src;
                modal.style.display = 'flex';
            });
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Story Filter Functionality
    function initStoryFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const storyCards = document.querySelectorAll('.story-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.dataset.filter;
                
                // Filter stories
                storyCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => card.style.opacity = '1', 10);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    // Reaction Button Functionality
    function initReactionButtons() {
        const reactionButtons = document.querySelectorAll('.reaction-btn');
        
        reactionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const countElement = button.querySelector('.count');
                if (countElement) {
                    let count = parseInt(countElement.textContent);
                    countElement.textContent = count + 1;
                    
                    // Add animation class
                    button.classList.add('clicked');
                    setTimeout(() => button.classList.remove('clicked'), 300);
                }
            });
        });
    }

    // Load More Stories Functionality
    function initLoadMore() {
        const loadMoreBtn = document.querySelector('.load-more-btn');
        const storiesContainer = document.querySelector('.stories-container');
        let page = 1;
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                page++;
                // Here you would typically fetch more stories from your backend
                // For now, we'll just disable the button after one click
                loadMoreBtn.disabled = true;
                loadMoreBtn.textContent = 'No More Stories';
            });
        }
    }

    // Share Story Modal
    function initShareStory() {
        const shareButton = document.querySelector('.share-story-btn');
        
        if (shareButton) {
            shareButton.addEventListener('click', () => {
                // Here you would typically open a modal or redirect to a form
                alert('Share Story feature coming soon!');
            });
        }
    }

    // Initialize everything when the DOM is loaded
    createRosePetals();
    initStoryFilter();
    initReactionButtons();
    initLoadMore();
    initShareStory();

    // Recreate petals periodically to maintain the effect
    setInterval(() => {
        const container = document.querySelector('.rose-petals-container');
        container.innerHTML = '';
        createRosePetals();
    }, 10000); // Every 10 seconds
}); 