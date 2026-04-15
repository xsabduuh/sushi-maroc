// ========== CONFIGURATION (EASY TO CUSTOMIZE) ==========
const CONFIG = {
    // Music settings
    music: {
        enabled: true,
        autoplay: false,   // browsers block autoplay, keep false
        volume: 0.4,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Replace with your own MP3 URL
    },
    // Love meter funny messages
    loveMessages: {
        normal: "🤔 Hmm... just 'normal'? I'm kidding! 😜",
        high: "💕 Woah! That's a lot of love! I'm blushing 💕",
        extreme: "🔥 INSANE LEVEL! You're crazy about me! I love it! 🔥"
    },
    // Celebration text
    celebrationMessage: "You said YES! I'm the luckiest person ever! 💖"
};

// ========== DOM ELEMENTS ==========
const floatingContainer = document.querySelector('.floating-hearts');
const q1 = document.getElementById('question1');
const q2 = document.getElementById('question2');
const q3 = document.getElementById('question3');
const celebrationDiv = document.getElementById('celebration');
const yesBtn1 = document.getElementById('yesBtn1');
const noBtn1 = document.getElementById('noBtn1');
const secretBtn = document.getElementById('secretBtn');
const nextBtn = document.getElementById('nextBtn');
const yesBtn3 = document.getElementById('yesBtn3');
const noBtn3 = document.getElementById('noBtn3');
const loveSlider = document.getElementById('loveSlider');
const loveValueSpan = document.getElementById('loveValue');
const extraLoveMsg = document.getElementById('extraLoveMsg');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const resetBtn = document.getElementById('resetBtn');

// ========== FLOATING HEARTS BACKGROUND ==========
function createFloatingHearts() {
    const hearts = ['❤️', '💖', '💗', '💘', '💝', '💕', '💓'];
    for (let i = 0; i < 45; i++) {
        const heart = document.createElement('div');
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        const duration = 8 + Math.random() * 14;
        heart.style.animationDuration = duration + 's';
        heart.style.animationDelay = Math.random() * 12 + 's';
        heart.style.fontSize = 18 + Math.random() * 42 + 'px';
        heart.style.opacity = 0.3 + Math.random() * 0.5;
        floatingContainer.appendChild(heart);
    }
}
createFloatingHearts();

// ========== MUSIC SETUP ==========
function setupMusic() {
    if (!CONFIG.music.enabled) {
        musicToggle.style.display = 'none';
        return;
    }
    bgMusic.src = CONFIG.music.url;
    bgMusic.volume = CONFIG.music.volume;
    bgMusic.load();
    if (CONFIG.music.autoplay) {
        bgMusic.play().catch(e => console.log("Autoplay blocked by browser"));
    }
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = '🔊 Pause Music';
        } else {
            bgMusic.pause();
            musicToggle.textContent = '🎵 Play Music';
        }
    });
}
setupMusic();

// ========== MOVE BUTTON SAFELY (FIXED: stays inside viewport) ==========
function moveButtonSafely(btn) {
    // Get button dimensions
    const btnRect = btn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;
    
    // Safe margins
    const margin = 20;
    const maxX = window.innerWidth - btnWidth - margin;
    const maxY = window.innerHeight - btnHeight - margin;
    
    // Ensure positive bounds
    const randomX = Math.max(margin, Math.random() * maxX);
    const randomY = Math.max(margin, Math.random() * maxY);
    
    btn.style.position = 'fixed';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    btn.style.zIndex = '1000';
    btn.style.transition = '0.1s ease';
    
    // Add a little shake effect
    btn.style.transform = 'scale(1.05)';
    setTimeout(() => { btn.style.transform = ''; }, 200);
}

// ========== QUESTION 1: NO button moves ==========
noBtn1.addEventListener('click', (e) => {
    e.preventDefault();
    moveButtonSafely(noBtn1);
    // Change text temporarily for fun
    const originalText = noBtn1.textContent;
    noBtn1.textContent = "🤪 Can't catch me!";
    setTimeout(() => { noBtn1.textContent = originalText; }, 800);
});

yesBtn1.addEventListener('click', () => {
    q1.classList.add('hidden');
    q2.classList.remove('hidden');
    // Reset love slider to default
    loveSlider.value = 100;
    loveValueSpan.textContent = 100;
    extraLoveMsg.classList.add('hidden');
});

secretBtn.addEventListener('click', () => {
    q1.classList.add('hidden');
    q2.classList.remove('hidden');
});

// ========== LOVE METER LOGIC (with funny messages) ==========
loveSlider.addEventListener('input', () => {
    let val = parseInt(loveSlider.value);
    loveValueSpan.textContent = val;
    
    if (val > 100) {
        extraLoveMsg.classList.remove('hidden');
        if (val >= 5000) {
            extraLoveMsg.innerHTML = CONFIG.loveMessages.extreme;
            extraLoveMsg.classList.add('super-love');
        } else if (val > 1000) {
            extraLoveMsg.innerHTML = CONFIG.loveMessages.high;
            extraLoveMsg.classList.remove('super-love');
        } else {
            extraLoveMsg.innerHTML = CONFIG.loveMessages.normal;
            extraLoveMsg.classList.remove('super-love');
        }
    } else {
        extraLoveMsg.classList.add('hidden');
    }
});

nextBtn.addEventListener('click', () => {
    q2.classList.add('hidden');
    q3.classList.remove('hidden');
});

// ========== QUESTION 3: NO button moves, YES button celebrates ==========
noBtn3.addEventListener('click', (e) => {
    e.preventDefault();
    moveButtonSafely(noBtn3);
    const originalText = noBtn3.textContent;
    noBtn3.textContent = "😈 Nice try!";
    setTimeout(() => { noBtn3.textContent = originalText; }, 800);
});

yesBtn3.addEventListener('click', () => {
    q3.classList.add('hidden');
    celebrationDiv.classList.remove('hidden');
    // Update celebration message from config
    const celebrationText = document.querySelector('.celebration-text');
    if (celebrationText) celebrationText.innerText = CONFIG.celebrationMessage;
    
    // HEART EXPLOSION EFFECT
    for (let i = 0; i < 80; i++) {
        const heart = document.createElement('div');
        heart.innerText = ['❤️', '💖', '💗', '💘', '💝'][Math.floor(Math.random() * 5)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = Math.random() * window.innerHeight + 'px';
        heart.style.fontSize = (20 + Math.random() * 50) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.opacity = '0.9';
        heart.style.transition = 'all 0.8s ease-out';
        heart.style.animation = 'floatUp 1s ease-out forwards';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1200);
    }
});

// ========== RESET FUNCTION (play again) ==========
function resetGame() {
    // Hide celebration and all questions
    celebrationDiv.classList.add('hidden');
    q3.classList.add('hidden');
    q2.classList.add('hidden');
    q1.classList.remove('hidden');
    // Reset any moved buttons positions (remove fixed positioning)
    const allNoBtns = document.querySelectorAll('.no-btn');
    allNoBtns.forEach(btn => {
        btn.style.position = '';
        btn.style.left = '';
        btn.style.top = '';
        btn.style.transform = '';
    });
    // Reset love meter
    loveSlider.value = 100;
    loveValueSpan.textContent = 100;
    extraLoveMsg.classList.add('hidden');
    // Ensure buttons have original text
    noBtn1.textContent = "No 😜";
    noBtn3.textContent = "No way 😈";
}

resetBtn.addEventListener('click', resetGame);

// Optional: also reset when page reloads? No need.
// Handle window resize to avoid buttons going out of bounds (reposition if needed)
window.addEventListener('resize', () => {
    // optional: reset any floating no-buttons to original position
    // but it's fine to leave them; user can refresh or reset.
});