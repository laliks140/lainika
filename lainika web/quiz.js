// Quiz Questions
const quizQuestions = [
    {
        question: "Who is this plushie for?",
        options: [
            { text: "For myself", icon: "fa-heart", traits: ["self-love", "comfort"] },
            { text: "For a child", icon: "fa-child", traits: ["playful", "durable"] },
            { text: "For a friend/partner", icon: "fa-gift", traits: ["thoughtful", "special"] },
            { text: "For home decoration", icon: "fa-home", traits: ["aesthetic", "decorative"] }
        ]
    },
    {
        question: "What's the primary purpose?",
        options: [
            { text: "Cuddles and comfort", icon: "fa-cloud", traits: ["soft", "huggable"] },
            { text: "Play and imagination", icon: "fa-star", traits: ["interactive", "fun"] },
            { text: "Collection and display", icon: "fa-trophy", traits: ["collectible", "unique"] },
            { text: "Emotional support", icon: "fa-hand-holding-heart", traits: ["therapeutic", "calming"] }
        ]
    },
    {
        question: "What size would you prefer?",
        options: [
            { text: "Small (portable)", icon: "fa-compress", traits: ["portable", "travel-friendly"] },
            { text: "Medium (lap-sized)", icon: "fa-arrows-alt", traits: ["versatile", "balanced"] },
            { text: "Large (huggable)", icon: "fa-expand", traits: ["huggable", "statement"] },
            { text: "Any size is fine", icon: "fa-check-circle", traits: ["flexible", "adaptable"] }
        ]
    },
    {
        question: "What's your preferred style?",
        options: [
            { text: "Cute and kawaii", icon: "fa-smile-beam", traits: ["kawaii", "adorable"] },
            { text: "Classic and traditional", icon: "fa-teddy-bear", traits: ["classic", "timeless"] },
            { text: "Unique and quirky", icon: "fa-hat-wizard", traits: ["unique", "creative"] },
            { text: "Elegant and sophisticated", icon: "fa-crown", traits: ["elegant", "refined"] }
        ]
    }
];

// Plushie Results
const plushieResults = {
    "kawaii-comfort": {
        image: "./images/Screenshot 2025-03-26 165901.png",
        name: "Kawaii Bear",
        description: "A super soft and adorable companion perfect for cuddles and comfort. This kawaii-style bear brings both cuteness and emotional support to your daily life.",
        price: "KSh 2,500"
    },
    "playful-friend": {
        image: "./images/77e1745d1ce27706b07df55625fa2417.jpg",
        name: "Dreamy Bunny",
        description: "An imaginative and playful bunny that's perfect for children. Durable, soft, and full of personality to inspire countless adventures.",
        price: "KSh 2,800"
    },
    "elegant-display": {
        image: "./images/202308241100551766.jpg",
        name: "Cozy Penguin",
        description: "A sophisticated and elegant penguin that makes a perfect decorative piece while still being huggable and soft.",
        price: "KSh 2,300"
    },
    "therapeutic-companion": {
        image: "./images/a6ee0522-aa09-429f-be27-6889c2fc90a0.__CR0,0,362,453_PT0_SX362_V1___.jpg",
        name: "Sweet Kitty",
        description: "A calming and therapeutic companion designed for emotional support and comfort. Perfect for anyone seeking a soothing presence.",
        price: "KSh 2,600"
    }
};

let currentQuestion = 0;
let userTraits = [];

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Close modal when clicking outside
    document.getElementById('quizModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeQuizModal();
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('quizModal').classList.contains('active')) {
            closeQuizModal();
        }
    });
});

function openQuizModal() {
    const modal = document.getElementById('quizModal');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
        modal.querySelector('.quiz-content').style.opacity = '1';
        modal.querySelector('.quiz-content').style.transform = 'translateY(0)';
    }, 100);
}

function closeQuizModal() {
    const modal = document.getElementById('quizModal');
    document.body.style.overflow = ''; // Restore scrolling
    modal.querySelector('.quiz-content').style.opacity = '0';
    modal.querySelector('.quiz-content').style.transform = 'translateY(20px)';
    modal.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
        modal.classList.remove('active');
        resetQuiz();
    }, 300);
}

function startQuiz() {
    const startScreen = document.getElementById('quizStart');
    const questionScreen = document.getElementById('quizQuestions');
    
    startScreen.style.opacity = '0';
    setTimeout(() => {
        startScreen.style.display = 'none';
        questionScreen.style.display = 'block';
        setTimeout(() => {
            questionScreen.style.opacity = '1';
            showQuestion();
        }, 50);
    }, 300);
}

function showQuestion() {
    try {
        const questionData = quizQuestions[currentQuestion];
        const container = document.querySelector('.question-container');
        const progress = (currentQuestion / quizQuestions.length) * 100;
        
        document.querySelector('.progress').style.width = `${progress}%`;
        
        // Fade out current question
        container.style.opacity = '0';
        container.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            container.innerHTML = `
                <h3 class="neon-text" role="heading" aria-level="3">${questionData.question}</h3>
                <div class="options-container" role="radiogroup" aria-label="Question ${currentQuestion + 1} options">
                    ${questionData.options.map((option, index) => `
                        <button 
                            class="quiz-option" 
                            onclick="selectOption(${index})"
                            role="radio"
                            aria-checked="false"
                            tabindex="0">
                            <i class="fas ${option.icon}" aria-hidden="true"></i>
                            <span>${option.text}</span>
                        </button>
                    `).join('')}
                </div>
            `;
            
            // Fade in new question
            container.style.opacity = '1';
            container.style.transform = 'translateX(0)';
        }, 300);
    } catch (error) {
        console.error('Error showing question:', error);
        // Show a user-friendly error message
        const container = document.querySelector('.question-container');
        container.innerHTML = `
            <div class="error-message">
                <p>Oops! Something went wrong. Please try again.</p>
                <button onclick="resetQuiz()" class="retry-btn">Retry Quiz</button>
            </div>
        `;
    }
}

function selectOption(optionIndex) {
    const selectedTraits = quizQuestions[currentQuestion].options[optionIndex].traits;
    userTraits = [...userTraits, ...selectedTraits];
    
    // Add visual feedback for selection
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => option.classList.remove('selected'));
    options[optionIndex].classList.add('selected');
    
    setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showResult();
        }
    }, 500);
}

function showResult() {
    const questionScreen = document.getElementById('quizQuestions');
    const resultScreen = document.getElementById('quizResult');
    
    questionScreen.style.opacity = '0';
    setTimeout(() => {
        questionScreen.style.display = 'none';
        resultScreen.style.display = 'block';
        setTimeout(() => {
            resultScreen.style.opacity = '1';
            
            try {
                // Simple matching algorithm
                const traitCount = {};
                userTraits.forEach(trait => {
                    traitCount[trait] = (traitCount[trait] || 0) + 1;
                });
                
                const primaryTraits = Object.entries(traitCount)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3)
                    .map(([trait]) => trait);
                
                // Match with a plushie based on primary traits
                let result;
                if (primaryTraits.includes('kawaii') || primaryTraits.includes('comfort')) {
                    result = plushieResults['kawaii-comfort'];
                } else if (primaryTraits.includes('playful') || primaryTraits.includes('fun')) {
                    result = plushieResults['playful-friend'];
                } else if (primaryTraits.includes('elegant') || primaryTraits.includes('decorative')) {
                    result = plushieResults['elegant-display'];
                } else {
                    result = plushieResults['therapeutic-companion'];
                }
                
                // Display result with animation
                const resultContainer = document.querySelector('.result-container');
                const resultImage = resultContainer.querySelector('img');
                const resultTitle = resultContainer.querySelector('h2');
                const resultDesc = resultContainer.querySelector('.result-description');
                const resultTraits = resultContainer.querySelector('.result-traits');
                
                resultImage.src = result.image;
                resultImage.alt = `${result.name} plushie`;
                resultTitle.textContent = result.name;
                resultDesc.textContent = result.description;
                
                // Animate traits appearance
                const traitsHtml = primaryTraits.map((trait, index) => 
                    `<span class="trait-tag" style="animation-delay: ${index * 0.2}s">
                        <i class="fas fa-check" aria-hidden="true"></i> ${trait}
                    </span>`
                ).join('');
                resultTraits.innerHTML = traitsHtml;
                
                // Add price display
                const priceElement = document.createElement('div');
                priceElement.className = 'result-price';
                priceElement.innerHTML = `<strong>Price:</strong> ${result.price}`;
                resultContainer.appendChild(priceElement);
                
            } catch (error) {
                console.error('Error showing result:', error);
                resultScreen.innerHTML = `
                    <div class="error-message">
                        <p>Oops! Something went wrong with your results. Please try again.</p>
                        <button onclick="resetQuiz()" class="retry-btn">Retry Quiz</button>
                    </div>
                `;
            }
        }, 50);
    }, 300);
}

function resetQuiz() {
    currentQuestion = 0;
    userTraits = [];
    
    const screens = ['quizResult', 'quizQuestions'];
    screens.forEach(screenId => {
        const screen = document.getElementById(screenId);
        screen.style.opacity = '0';
        setTimeout(() => {
            screen.style.display = 'none';
            if (screenId === 'quizResult') {
                const startScreen = document.getElementById('quizStart');
                startScreen.style.display = 'block';
                setTimeout(() => {
                    startScreen.style.opacity = '1';
                }, 50);
            }
        }, 300);
    });
    
    document.querySelector('.progress').style.width = '0%';
} 