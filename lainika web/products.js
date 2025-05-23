// Loading Handler
document.addEventListener('DOMContentLoaded', function() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    // Function to hide loading overlay
    function hideLoading() {
        loadingOverlay.classList.add('hidden');
        // Remove the overlay from DOM after animation
        setTimeout(() => {
            loadingOverlay.remove();
        }, 500);
    }

    // Check if all images are loaded
    function checkAllImagesLoaded() {
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        const totalImages = images.length;

        // If no images, hide loading immediately
        if (totalImages === 0) {
            hideLoading();
            return;
        }

        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
                if (loadedImages === totalImages) {
                    hideLoading();
                }
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        hideLoading();
                    }
                });
                img.addEventListener('error', () => {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        hideLoading();
                    }
                });
            }
        });

        // Fallback: hide loading after 5 seconds
        setTimeout(hideLoading, 5000);
    }

    // Initialize loading check
    checkAllImagesLoaded();
});

// Function to animate counting - Simplified for mobile
function animateNumber(element, start, end, duration) {
    // On mobile, just set the final value immediately
    if (window.innerWidth <= 768) {
        element.textContent = end;
        return;
    }
    
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

// Intersection Observer for stats animation - Optimized for mobile
function initStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    const targetValues = [50, 100, 100];
    
    // On mobile, set values immediately
    if (window.innerWidth <= 768) {
        stats.forEach((stat, index) => {
            stat.textContent = targetValues[index];
        });
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach((stat, index) => {
                    animateNumber(stat, 0, targetValues[index], 2000);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.mega-hero-stats');
    if (statsContainer) {
        observer.observe(statsContainer);
    }
}

// Product data for quick view
const products = [
    {
        name: "Lainika Bunny",
        trait: "Loves warm hugs",
        image: "images/lainika plush.png",
        price: "KSh 1,500",
        category: "plushies",
        moods: ["kawaii", "cute"],
        description: "Our signature bunny, crafted with extra soft materials and endless love!",
        featured: true,
        tagline: "Your New Cuddly Best Friend",
        measurements: {
            height: "30 cm",
            width: "25 cm",
            weight: "300g"
        }
    },
    {
        name: "Hello Kitty Bag",
        trait: "Stylish and kawaii",
        image: "images/hello kitty bag.png",
        price: "KSh 2,800",
        category: "bags",
        moods: ["kawaii", "stylish"],
        description: "A fluffy and fashionable bag that's perfect for any occasion!",
        featured: true,
        tagline: "Fashion Meets Kawaii"
    },
    {
        name: "Cinnamon Bag",
        trait: "Sweet and stylish",
        image: "images/cinammon bag.png",
        price: "KSh 1,800",
        category: "bags",
        moods: ["cute", "stylish"],
        description: "A sweet and stylish bag that adds charm to any outfit!",
        featured: true,
        tagline: "Sweet Style"
    },
    {
        name: "Kuromi Side Bag",
        trait: "Trendy and unique",
        image: "images/kuromi side.png",
        price: "KSh 2,900",
        category: "bags",
        moods: ["kawaii", "stylish"],
        description: "A trendy side bag that combines style with kawaii charm!",
        featured: true,
        tagline: "Trendy & Kawaii"
    },
    {
        name: "Kawaii Panda",
        trait: "Adorable and playful",
        image: "images/cute panda.png",
        price: "KSh 1,600",
        category: "plushies",
        moods: ["kawaii", "cute"],
        description: "An adorable panda plushie that brings joy and comfort!",
        featured: true,
        tagline: "Panda Power",
        measurements: {
            height: "28 cm",
            width: "22 cm",
            weight: "280g"
        }
    },
    {
        name: "Kuromi Bag",
        trait: "Stylish and kawaii",
        image: "images/kuromi bag big.png",
        price: "KSh 2,700",
        category: "bags",
        moods: ["kawaii", "stylish"],
        description: "A stylish bag that's perfect for any kawaii fashion enthusiast!",
        featured: true,
        tagline: "Kawaii Style"
    },
    {
        name: "Hello Kitty Dress Plushie",
        trait: "Elegant and cute",
        image: "images/hello kitty dress.png",
        price: "KSh 1,700",
        category: "plushies",
        moods: ["kawaii", "cute"],
        description: "A beautiful Hello Kitty plushie wearing a lovely dress!",
        featured: true,
        tagline: "Elegant Kitty",
        measurements: {
            height: "32 cm",
            width: "24 cm",
            weight: "320g"
        }
    },
    {
        name: "Hugging Cat Plushie",
        trait: "Super cuddly",
        image: "images/huggable kitty.png",
        price: "KSh 1,400",
        category: "plushies",
        moods: ["cute", "kawaii"],
        description: "A super soft cat plushie that's perfect for hugs and cuddles!",
        featured: true,
        tagline: "Hugs & Cuddles",
        measurements: {
            height: "25 cm",
            width: "20 cm",
            weight: "250g"
        }
    },
    {
        name: "Fluffy Elephant Plushie",
        trait: "Gentle and soft",
        image: "images/elephant.png",
        price: "KSh 1,600",
        category: "plushies",
        moods: ["cute", "kawaii"],
        description: "A super soft elephant plushie that's perfect for snuggles!",
        featured: true,
        tagline: "Gentle Giant",
        measurements: {
            height: "30 cm",
            width: "25 cm",
            weight: "300g"
        }
    },
    {
        name: "Bunny Bouquet",
        trait: "Special and unique",
        image: "images/B7E2563B8D2E2B5442A0E7EFA0958F2C.jpg",
        price: "KSh 2,499",
        category: "plushies",
        moods: ["kawaii", "cute"],
        description: "A delightful bouquet of bunnies, perfect for gifting and decoration!",
        featured: true,
        tagline: "Bunny Collection",
        measurements: {
            height: "35 cm",
            width: "30 cm",
            weight: "400g"
        }
    },
    {
        name: "Cute Stitch Bear",
        trait: "Playful and unique",
        image: "images/bear stitch.jpg",
        price: "KSh 1,800",
        category: "plushies",
        moods: ["cute", "kawaii"],
        description: "A unique fusion of Stitch and bear, perfect for cuddles and adventures!",
        featured: true,
        tagline: "Stitch & Bear",
        measurements: {
            height: "28 cm",
            width: "22 cm",
            weight: "280g"
        }
    },
    {
        name: "Normal Hello Kitty",
        trait: "Classic and cute",
        image: "images/hello kitty normal.png",
        price: "KSh 1,600",
        category: "plushies",
        moods: ["kawaii", "cute"],
        description: "The classic Hello Kitty plushie that everyone loves!",
        featured: true,
        tagline: "Classic Kitty",
        measurements: {
            height: "26 cm",
            width: "20 cm",
            weight: "260g"
        }
    },
    {
        name: "Side Cinnamon Bag",
        trait: "Practical and cute",
        image: "images/cinnamon side.png",
        price: "KSh 2,200",
        category: "bags",
        moods: ["cute", "stylish"],
        description: "A practical and stylish side bag with a sweet cinnamon design!",
        featured: true,
        tagline: "Sweet & Practical"
    },
    {
        name: "Fluffy Kitten",
        trait: "Super soft and playful",
        image: "images/fluffy kitten.jpg",
        price: "KSh 1,600",
        category: "plushies",
        moods: ["cute", "kawaii"],
        description: "An irresistibly soft kitten plushie that's perfect for endless cuddles!",
        featured: true,
        tagline: "Purr-fect Companion",
        measurements: {
            height: "28 cm",
            width: "22 cm",
            weight: "280g"
        }
    },
    {
        name: "Stitch with Ukulele",
        trait: "Musical and tropical",
        image: "images/stitch ocean.png",
        price: "KSh 2,000",
        category: "plushies",
        moods: ["kawaii", "cute"],
        description: "A tropical-themed Stitch plushie playing the ukulele, bringing island vibes to your home!",
        featured: true,
        tagline: "Island Harmony",
        measurements: {
            height: "32 cm",
            width: "25 cm",
            weight: "320g"
        }
    },
    {
        name: "Normal Stitch",
        trait: "Mischievous and lovable",
        image: "images/stitch.png",
        price: "KSh 1,800",
        category: "plushies",
        moods: ["kawaii", "cute"],
        description: "The classic Stitch plushie that captures his playful and mischievous personality!",
        featured: true,
        tagline: "Classic Mischief",
        measurements: {
            height: "30 cm",
            width: "24 cm",
            weight: "300g"
        }
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize stats animation
    initStatsAnimation();

    const categoryFilters = document.querySelectorAll('.filter-bubble');
    const moodButtons = document.querySelectorAll('.mood-btn');
    const modal = document.getElementById('quickViewModal');
    const closeModal = document.querySelector('.close-modal');
    const productCards = document.querySelectorAll('.product-card');
    const sizeGuidePopup = document.getElementById('sizeGuidePopup');
    const closeSizeGuide = document.querySelector('.close-size-guide');

    let currentCategory = 'all';
    let currentMood = 'all';  // Initialize with 'all'

    // Filter products based on current category and mood
    function filterProducts() {
        productCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardMoods = card.dataset.moods ? card.dataset.moods.split(',') : [];
            
            const categoryMatch = currentCategory === 'all' || cardCategory === currentCategory;
            const moodMatch = currentMood === 'all' || cardMoods.includes(currentMood);
            
            if (categoryMatch && moodMatch) {
                card.style.display = 'block';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });

        // Update counter for visible products
        updateProductCount();
    }

    // Update the count of visible products
    function updateProductCount() {
        const visibleProducts = document.querySelectorAll('.product-card[style*="display: block"]').length;
        document.querySelectorAll('.filter-bubble').forEach(bubble => {
            const category = bubble.dataset.category;
            const count = bubble.querySelector('.count');
            if (category === 'all') {
                count.textContent = visibleProducts;
            } else {
                const categoryProducts = Array.from(productCards).filter(card => {
                    const cardCategory = card.dataset.category;
                    const cardMoods = card.dataset.moods ? card.dataset.moods.split(',') : [];
                    return cardCategory === category && (currentMood === 'all' || cardMoods.includes(currentMood));
                }).length;
                count.textContent = categoryProducts;
            }
        });
    }

    // Category filter handlers
    categoryFilters.forEach(button => {
        button.addEventListener('click', () => {
            categoryFilters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            filterProducts();
        });
    });

    // Mood filter handlers
    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mood = button.dataset.mood;
            moodButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentMood = mood;
            filterProducts();
        });
    });

    // Size Guide handlers
    function openSizeGuide(productName) {
        const popup = document.getElementById('sizeGuidePopup');
        const sections = popup.querySelectorAll('.size-guide-sections');
        
        // Hide all sections first
        sections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show the section for the selected product
        const selectedSection = popup.querySelector(`[data-product="${productName}"]`);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }
        
        popup.style.display = 'flex';
    }

    // Make openSizeGuide available globally
    window.openSizeGuide = openSizeGuide;

    // Close Size Guide
    document.querySelector('.close-size-guide').addEventListener('click', () => {
        document.getElementById('sizeGuidePopup').style.display = 'none';
    });

    // Close Size Guide when clicking outside
    document.getElementById('sizeGuidePopup').addEventListener('click', (e) => {
        if (e.target.id === 'sizeGuidePopup') {
            e.target.style.display = 'none';
        }
    });

    // Quick View Modal handlers
    closeModal.addEventListener('click', () => {
        closeQuickView();
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeQuickView();
        }
    });

    // Handle escape key for both modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal.style.display === 'block') {
                closeQuickView();
            }
            if (sizeGuidePopup.style.display === 'flex') {
                closeSizeGuideModal();
            }
        }
    });

    // Prevent modal close when clicking inside modal content
    modal.querySelector('.modal-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Handle mobile back button
    window.addEventListener('popstate', () => {
        if (modal.style.display === 'block') {
            closeQuickView();
        }
        if (sizeGuidePopup.style.display === 'flex') {
            closeSizeGuideModal();
        }
    });

    // Initialize rotating plushies
    initRotatingPlushies();

    // Add scroll handlers for mobile indicators
    const categoryFilterScroll = document.querySelector('.category-filter');
    const moodButtonsScroll = document.querySelector('.mood-buttons');

    // Add initial unscrolled class
    categoryFilterScroll.classList.add('unscrolled');
    moodButtonsScroll.classList.add('unscrolled');

    // Handle category filter scroll
    categoryFilterScroll.addEventListener('scroll', function() {
        if (this.scrollLeft > 0) {
            this.classList.remove('unscrolled');
            this.classList.add('scrolled');
        }
    });

    // Handle mood buttons scroll
    moodButtonsScroll.addEventListener('scroll', function() {
        if (this.scrollLeft > 0) {
            this.classList.remove('unscrolled');
            this.classList.add('scrolled');
        }
    });
});

// Initialize rotating plushies functionality - Optimized for mobile
function initRotatingPlushies() {
    const plushies = document.querySelectorAll('.plushie-item');
    const dots = document.querySelectorAll('.control-dot');
    let currentIndex = 0;
    let interval;

    function showPlushie(index) {
        plushies.forEach(plushie => {
            plushie.classList.remove('active');
            // Simplified transitions for mobile
            if (window.innerWidth <= 768) {
                plushie.style.opacity = '0';
                plushie.style.visibility = 'hidden';
            } else {
                plushie.style.opacity = '0';
                plushie.style.visibility = 'hidden';
                plushie.style.transform = 'scale(0.8) translateY(20px)';
            }
        });
        dots.forEach(dot => dot.classList.remove('active'));
        
        plushies[index].classList.add('active');
        plushies[index].style.opacity = '1';
        plushies[index].style.visibility = 'visible';
        if (window.innerWidth > 768) {
            plushies[index].style.transform = 'scale(1) translateY(0)';
        }
        dots[index].classList.add('active');
    }

    function nextPlushie() {
        currentIndex = (currentIndex + 1) % plushies.length;
        showPlushie(currentIndex);
    }

    function startRotation() {
        if (interval) {
            clearInterval(interval);
        }
        // Longer interval on mobile to reduce CPU usage
        interval = setInterval(nextPlushie, window.innerWidth <= 768 ? 8000 : 5000);
    }

    // Initial setup
    showPlushie(currentIndex);
    startRotation();

    // Add event listeners
    const showcase = document.querySelector('.mega-hero-showcase');
    if (showcase) {
        showcase.addEventListener('mouseenter', () => {
            if (interval) {
                clearInterval(interval);
            }
        });

        showcase.addEventListener('mouseleave', () => {
            startRotation();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showPlushie(currentIndex);
                startRotation();
            });
        });
    }
}

// Open Quick View Modal
function openQuickView(productName) {
    const product = products.find(p => p.name === productName);
    const modal = document.getElementById('quickViewModal');
    const modalBody = modal.querySelector('.modal-body');
    
    if (!product) return;
    
    modalBody.innerHTML = `
        <div class="quick-view-content">
            <div class="quick-view-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="quick-view-details">
                <h2>${product.name}</h2>
                <p class="trait"><i class="fas fa-heart"></i> ${product.trait}</p>
                <div class="personality-traits">
                    ${product.moods.map(mood => `
                        <span class="trait">
                            <i class="fas fa-${getMoodIcon(mood)}"></i> ${mood.charAt(0).toUpperCase() + mood.slice(1)}
                        </span>
                    `).join('')}
                </div>
                <p class="description">${product.description}</p>
                <p class="price"><i class="fas fa-tag"></i> ${product.price}</p>
                <div class="quick-view-actions">
                    <button class="order-btn primary" onclick="openWhatsApp('${product.name}')">
                        <i class="fab fa-whatsapp"></i> Order Now
                    </button>
                    <button class="size-guide-btn" onclick="handleSizeGuideClick('${product.name}')">
                        <i class="fas fa-ruler"></i> Size Guide
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    history.pushState({ modal: 'quickView' }, '');
}

// Handle size guide click from quick view
function handleSizeGuideClick(productName) {
    closeQuickView();
    openSizeGuide(productName);
}

// Helper function to get mood icons
function getMoodIcon(mood) {
    const icons = {
        cheerful: 'smile',
        cuddly: 'cloud',
        romantic: 'heart',
        playful: 'star'
    };
    return icons[mood] || 'star';
}

// Close Quick View Modal
function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    modal.style.display = 'none';
    if (history.state && history.state.modal) {
        history.back();
    }
}

// Open WhatsApp
function openWhatsApp(productName) {
    const message = `Hi! I'm interested in the ${productName}. Can you tell me more about it?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/254757608176?text=${encodedMessage}`, '_blank');
}

// Initialize AOS with reduced animations on mobile
AOS.init({
    duration: window.innerWidth <= 768 ? 400 : 800,
    easing: 'ease-out',
    once: true,
    disable: window.innerWidth <= 768 // Disable AOS on mobile
});

// Close size guide when clicking the close button
document.querySelector('.close-size-guide').addEventListener('click', () => {
    document.getElementById('sizeGuidePopup').style.display = 'none';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    const sizeGuidePopup = document.getElementById('sizeGuidePopup');
    const quickViewModal = document.getElementById('quickViewModal');
    
    if (e.target === sizeGuidePopup) {
        sizeGuidePopup.style.display = 'none';
    }
    if (e.target === quickViewModal) {
        quickViewModal.style.display = 'none';
    }
});

// WhatsApp functionality
function openWhatsApp(productName) {
    const message = `Hi! I'm interested in the ${productName}. Can you tell me more about it?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/254757608176?text=${encodedMessage}`, '_blank');
} 