// Sample plushie data - in a real app, this would come from a backend
const plushies = [
    {
        name: "Kawaii Bear",
        trait: "Loves warm hugs",
        image: "./images/Screenshot 2025-03-26 165901.png",
        price: "KSh 2,500"
    },
    {
        name: "Dreamy Bunny",
        trait: "Spreads joy everywhere",
        image: "./images/77e1745d1ce27706b07df55625fa2417.jpg",
        price: "KSh 2,800"
    },
    {
        name: "Cozy Penguin",
        trait: "Expert cuddler",
        image: "./images/202308241100551766.jpg",
        price: "KSh 2,300"
    },
    {
        name: "Sweet Kitty",
        trait: "Purrs with happiness",
        image: "./images/a6ee0522-aa09-429f-be27-6889c2fc90a0.__CR0,0,362,453_PT0_SX362_V1___.jpg",
        price: "KSh 2,600"
    }
];

// Initialize Swiper sliders and other functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize plushies slider
    const plushiesSlider = new Swiper('.plushies-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
        }
    });

    // Initialize testimonials slider
    const testimonialsSlider = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            768: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        }
    });

    // Populate plushie cards
    const plushiesWrapper = document.querySelector('.plushies-slider .swiper-wrapper');
    plushies.forEach(plushie => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="plushie-card">
                <img src="${plushie.image}" alt="${plushie.name}" style="width: 100%; border-radius: 10px;">
                <h3>${plushie.name}</h3>
                <p><i class="fas fa-heart"></i> ${plushie.trait}</p>
                <p class="price"><i class="fas fa-tag"></i> ${plushie.price}</p>
                <button class="glow-button" onclick="openWhatsApp('${plushie.name}')">
                    <i class="fab fa-whatsapp"></i> Order Now
                </button>
            </div>
        `;
        plushiesWrapper.appendChild(slide);
    });

    // Initialize scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('[data-scroll]').forEach(el => observer.observe(el));

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Update active state in navigation
                updateActiveNavigation(this.getAttribute('href'));
            }
        });
    });

    // Initialize active navigation state
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = '#' + section.getAttribute('id');
            }
        });

        updateActiveNavigation(currentSection);
    });
});

// Smooth scroll function
function scrollToProducts() {
    document.getElementById('featured-plushies').scrollIntoView({
        behavior: 'smooth'
    });
    updateActiveNavigation('#featured-plushies');
}

// WhatsApp order function
function openWhatsApp(plushieName) {
    const phoneNumber = '254757608176'; // Kenyan number format
    const message = `Hi! I'm interested in ${plushieName} from Lainika! 🧸`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Quiz modal function
function openQuizModal() {
    // This is a placeholder for the quiz functionality
    alert('Coming soon: Find your perfect plushie match! 🧸✨');
}

// Update active navigation state
function updateActiveNavigation(hash) {
    // Update desktop navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        }
    });

    // Update mobile navigation
    document.querySelectorAll('.mobile-nav .nav-item').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        }
    });
}

// Mobile navigation active state
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
}); 