// Game Configuration
const config = {
    width: 800,
    height: 600,
    plushieSize: 50,
    gravity: 0.5,
    jumpForce: -10,
    maxPower: 100,
    powerDecay: 0.5,
    powerGain: 2
};

// Game State
let gameState = {
    score: 0,
    time: 60,
    power: 100,
    isPlaying: false,
    player: {
        x: config.width / 4,
        y: config.height / 2,
        vy: 0,
        isJumping: false,
        hasShield: false
    },
    obstacles: [],
    powerups: [],
    plushies: [],
    particles: []
};

// Initialize Canvas
let canvas, ctx;

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing game...');
    
    // Initialize canvas
    canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    
    ctx = canvas.getContext('2d');
    canvas.width = config.width;
    canvas.height = config.height;

    // Set canvas size
    canvas.style.width = config.width + 'px';
    canvas.style.height = config.height + 'px';

    // Initialize start button
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', function() {
            console.log('Start button clicked');
            startGame();
        });
    } else {
        console.error('Start button not found');
    }

    // Add keyboard controls
    document.addEventListener('keydown', handleKeyDown);

    // Draw initial background
    drawBackground();
    drawPlayer(); // Draw initial player position
});

// Game Loop
function gameLoop() {
    if (!gameState.isPlaying || !ctx) {
        console.log('Game loop stopped');
        return;
    }

    console.log('Game loop running');

    // Clear canvas
    ctx.clearRect(0, 0, config.width, config.height);

    // Draw everything
    drawBackground();
    drawPlayer();
    drawObstacles();
    drawPowerups();
    drawPlushies();
    drawParticles();

    // Update game state
    updatePlayer();
    updateObstacles();
    updatePowerups();
    updatePlushies();
    updateParticles();

    // Update UI
    updateUI();

    // Next frame
    requestAnimationFrame(gameLoop);
}

// Game Control Functions
function startGame() {
    console.log('Starting game...');
    
    // Reset game state
    gameState = {
        score: 0,
        time: 60,
        power: 100,
        isPlaying: true,
        player: {
            x: config.width / 4,
            y: config.height / 2,
            vy: 0,
            isJumping: false,
            hasShield: false
        },
        obstacles: [],
        powerups: [],
        plushies: [],
        particles: []
    };

    // Remove overlay
    const overlay = document.getElementById('gameOverlay');
    if (overlay) {
        console.log('Removing overlay');
        overlay.style.display = 'none';
        overlay.classList.remove('active');
    } else {
        console.error('Overlay element not found');
    }

    // Ensure canvas is visible
    if (canvas) {
        canvas.style.display = 'block';
    }

    // Start game loop
    console.log('Starting game loop');
    gameLoop();

    // Start countdown
    const timer = setInterval(() => {
        if (!gameState.isPlaying) {
            clearInterval(timer);
            return;
        }

        gameState.time--;
        if (gameState.time <= 0) {
            endGame();
            clearInterval(timer);
        }
    }, 1000);
}

// Drawing Functions
function drawBackground() {
    if (!ctx) {
        console.error('Context not available');
        return;
    }
    
    // Fill background with gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, config.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#E0F7FA');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, config.width, config.height);

    // Draw clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < 5; i++) {
        const x = (Date.now() / 50 + i * 200) % (config.width + 200) - 100;
        drawCloud(x, 50 + i * 30);
    }
}

function drawCloud(x, y) {
    if (!ctx) return;
    
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.arc(x - 25, y + 10, 25, 0, Math.PI * 2);
    ctx.arc(x + 25, y + 10, 25, 0, Math.PI * 2);
    ctx.fill();
}

function drawPlayer() {
    if (!ctx) return;
    
    ctx.save();
    ctx.translate(gameState.player.x, gameState.player.y);

    // Draw player body
    ctx.fillStyle = '#ff69b4';
    ctx.beginPath();
    ctx.arc(0, 0, config.plushieSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw shield if active
    if (gameState.player.hasShield) {
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, config.plushieSize / 2 + 10, 0, Math.PI * 2);
        ctx.stroke();
    }

    ctx.restore();
}

// Update Functions
function updatePlayer() {
    // Apply gravity
    gameState.player.vy += config.gravity;
    gameState.player.y += gameState.player.vy;

    // Ground collision
    if (gameState.player.y > config.height - config.plushieSize) {
        gameState.player.y = config.height - config.plushieSize;
        gameState.player.vy = 0;
        gameState.player.isJumping = false;
    }

    // Power decay
    if (gameState.power > 0) {
        gameState.power -= config.powerDecay;
    }
}

// Event Handlers
function handleKeyDown(e) {
    if (!gameState.isPlaying) return;

    switch(e.key) {
        case ' ':
            if (gameState.power >= 20) {
                activateSpecialPower();
            }
            break;
        case 'ArrowUp':
        case 'w':
            if (!gameState.player.isJumping) {
                gameState.player.vy = config.jumpForce;
                gameState.player.isJumping = true;
                createParticles(gameState.player.x, gameState.player.y + config.plushieSize);
            }
            break;
        case 'ArrowLeft':
        case 'a':
            gameState.player.x = Math.max(50, gameState.player.x - 10);
            break;
        case 'ArrowRight':
        case 'd':
            gameState.player.x = Math.min(config.width - 50, gameState.player.x + 10);
            break;
    }
}

// Game Objects
function createObstacle() {
    return {
        x: config.width + 50,
        y: Math.random() * (config.height - 100),
        width: 30,
        height: 100,
        speed: 3 + Math.random() * 2,
        type: Math.random() > 0.7 ? 'spiky' : 'normal'
    };
}

function createPowerup() {
    const types = ['shield', 'time', 'magnet'];
    return {
        x: config.width + 50,
        y: Math.random() * (config.height - 50),
        type: types[Math.floor(Math.random() * types.length)],
        collected: false,
        angle: 0
    };
}

function createPlushie() {
    return {
        x: config.width + 50,
        y: Math.random() * (config.height - 50),
        collected: false,
        type: Math.floor(Math.random() * 4), // Different plushie types
        floatOffset: 0,
        floatSpeed: 0.05 + Math.random() * 0.03
    };
}

// Update Functions
function updateObstacles() {
    // Add new obstacles
    if (Math.random() < 0.02) {
        gameState.obstacles.push(createObstacle());
    }

    // Update existing obstacles
    gameState.obstacles = gameState.obstacles.filter(obstacle => {
        obstacle.x -= obstacle.speed;

        // Check collision with player
        if (!gameState.player.hasShield && checkCollision(gameState.player, obstacle)) {
            gameState.score = Math.max(0, gameState.score - 10);
            createParticles(gameState.player.x, gameState.player.y, 20, '#ff0000');
            return false;
        }

        return obstacle.x > -50;
    });
}

function updatePowerups() {
    // Add new powerups
    if (Math.random() < 0.01) {
        gameState.powerups.push(createPowerup());
    }

    // Update existing powerups
    gameState.powerups = gameState.powerups.filter(powerup => {
        powerup.x -= 2;
        powerup.angle += 0.02;

        // Check collection
        if (!powerup.collected && checkCollision(gameState.player, powerup)) {
            applyPowerup(powerup.type);
            createParticles(powerup.x, powerup.y, 15, '#ffff00');
            return false;
        }

        return powerup.x > -50;
    });
}

function updatePlushies() {
    // Add new plushies
    if (Math.random() < 0.03) {
        gameState.plushies.push(createPlushie());
    }

    // Update existing plushies
    gameState.plushies = gameState.plushies.filter(plushie => {
        plushie.x -= 3;
        plushie.floatOffset = Math.sin(plushie.floatSpeed * Date.now()) * 10;

        // Check collection
        if (!plushie.collected && checkCollision(gameState.player, plushie)) {
            plushie.collected = true;
            gameState.score += 10;
            createParticles(plushie.x, plushie.y, 20, '#ff69b4');
            return false;
        }

        return plushie.x > -50;
    });
}

// Drawing Functions
function drawObstacles() {
    gameState.obstacles.forEach(obstacle => {
        ctx.fillStyle = obstacle.type === 'spiky' ? '#ff4444' : '#666666';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        if (obstacle.type === 'spiky') {
            drawSpikes(obstacle);
        }
    });
}

function drawSpikes(obstacle) {
    ctx.fillStyle = '#ff0000';
    const spikeCount = 5;
    const spikeHeight = 10;

    for (let i = 0; i < spikeCount; i++) {
        const x = obstacle.x + obstacle.width;
        const y = obstacle.y + (obstacle.height / spikeCount) * i;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + spikeHeight, y + (obstacle.height / spikeCount) / 2);
        ctx.lineTo(x, y + (obstacle.height / spikeCount));
        ctx.fill();
    }
}

function drawPowerups() {
    gameState.powerups.forEach(powerup => {
        ctx.save();
        ctx.translate(powerup.x, powerup.y);
        ctx.rotate(powerup.angle);

        ctx.fillStyle = getPowerupColor(powerup.type);
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.fill();

        // Draw icon
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '12px FontAwesome';
        ctx.fillText(getPowerupIcon(powerup.type), 0, 0);

        ctx.restore();
    });
}

function drawPlushies() {
    gameState.plushies.forEach(plushie => {
        ctx.save();
        ctx.translate(plushie.x, plushie.y + plushie.floatOffset);

        // Draw plushie body
        const colors = ['#ff69b4', '#87ceeb', '#98fb98', '#dda0dd'];
        ctx.fillStyle = colors[plushie.type];
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, Math.PI * 2);
        ctx.fill();

        // Draw face
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(-5, -5, 3, 0, Math.PI * 2); // Left eye
        ctx.arc(5, -5, 3, 0, Math.PI * 2); // Right eye
        ctx.fill();

        // Draw smile
        ctx.beginPath();
        ctx.arc(0, 2, 8, 0, Math.PI);
        ctx.stroke();

        ctx.restore();
    });
}

// Utility Functions
function checkCollision(a, b) {
    const aRadius = config.plushieSize / 2;
    const bRadius = 20;
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy) < aRadius + bRadius;
}

function applyPowerup(type) {
    switch(type) {
        case 'shield':
            gameState.player.hasShield = true;
            setTimeout(() => gameState.player.hasShield = false, 5000);
            break;
        case 'time':
            gameState.time += 10;
            break;
        case 'magnet':
            // Attract nearby plushies
            gameState.plushies.forEach(plushie => {
                if (!plushie.collected) {
                    const dx = gameState.player.x - plushie.x;
                    const dy = gameState.player.y - plushie.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 200) {
                        plushie.x += dx * 0.1;
                        plushie.y += dy * 0.1;
                    }
                }
            });
            break;
    }
}

function getPowerupColor(type) {
    switch(type) {
        case 'shield': return '#4CAF50';
        case 'time': return '#2196F3';
        case 'magnet': return '#9C27B0';
        default: return '#ffffff';
    }
}

function getPowerupIcon(type) {
    switch(type) {
        case 'shield': return '';
        case 'time': return '';
        case 'magnet': return '';
        default: return '';
    }
}

// Additional controls for mobile
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);

let touchStartX = null;
let touchStartY = null;

function handleTouchStart(event) {
    if (!gameState.isPlaying) return;
    
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    if (!gameState.isPlaying || !touchStartX || !touchStartY) return;

    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    
    const deltaX = touchX - touchStartX;
    const deltaY = touchY - touchStartY;

    // Update player position based on touch movement
    gameState.player.x = Math.max(50, Math.min(config.width - 50, 
        gameState.player.x + deltaX * 0.5));
    
    if (deltaY < -50 && !gameState.player.isJumping) {
        gameState.player.vy = config.jumpForce;
        gameState.player.isJumping = true;
        createParticles(gameState.player.x, gameState.player.y + config.plushieSize);
    }

    touchStartX = touchX;
    touchStartY = touchY;
}

// Make startGame function globally available
window.startGame = startGame; 