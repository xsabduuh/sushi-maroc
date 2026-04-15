// ======================== CONFIGURATION (edit here) ========================
const CONFIG = {
    // Music settings
    music: {
        enabled: true,
        autoplay: false,   // browsers block autoplay, so better false
        volume: 0.5,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // change to your own
    },
    // Love meter crazy messages
    loveMessages: {
        normal: "🤔 Hmm... are you sure?",
        high: "💕 Wow! That's a lot of love! 💕",
        extreme: "🔥 INSANE LOVE! You're crazy about me! 🔥"
    },
    // Celebration message
    celebrationMessage: "You said YES! I love you so much! 💖"
};

// ======================== DOM Elements ========================
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

// ======================== Floating hearts background ========================
function createFloatingHearts() {
    const hearts = ['❤️', '💖', '💗', '💘', '💝', '💕', '💓'];
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animation = `floatUp ${8 + Math.random() * 12}s linear infinite`;
        heart.style.animationDelay = Math.random() * 10 + 's';
        heart.style.fontSize = 18 + Math.random() * 40 + 'px';
        heart.style.opacity = 0.3 + Math.random() * 0.5;
        heart.style.bottom = '-60px';
        floatingContainer.appendChild(heart);
    }
}
createFloatingHearts();

// ======================== Music setup ========================
function setupMusic() {
    if (!CONFIG.music.enabled) {
        musicToggle.style.display = 'none';
        return;
    }
    bgMusic.src = CONFIG.music.url;
    bgMusic.volume = CONFIG.music.volume;
    bgMusic.load();
    if (CONFIG.music.autoplay) {
        bgMusic.play().catch(e => console.log("Autoplay blocked"));
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

// ======================== Helper: Move button randomly ========================
function moveButtonRandomly(btn) {
    const maxX = window.innerWidth - btn.offsetWidth - 20;
    const maxY = window.innerHeight - btn.offsetHeight - 20;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    btn.style.position = 'fixed';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    btn.style.zIndex = '1000';
    // also add a little shake effect
    btn.style.transform = 'scale(1.1)';
    setTimeout(() => { btn.style.transform = ''; }, 200);
}

// ======================== Question 1: No button moves ========================
noBtn1.addEventListener('click', (e) => {
    moveButtonRandomly(noBtn1);
    // Also change text for fun
    noBtn1.textContent = "🤪 Can't catch me!";
    setTimeout(() => { noBtn1.textContent = "No 😜"; }, 800);
});

yesBtn1.addEventListener('click', () => {
    // Move to question 2
    q1.classList.add('hidden');
    q2.classList.remove('hidden');
});

// Secret button - jumps to question 2 directly
secretBtn.addEventListener('click', () => {
    q1.classList.add('hidden');
    q2.classList.remove('hidden');
});

// ======================== Love Meter (crazy) ========================
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

// ======================== Question 3: No button moves, Yes button celebrates ========================
noBtn3.addEventListener('click', (e) => {
    moveButtonRandomly(noBtn3);
    noBtn3.textContent = "😈 Nope!";
    setTimeout(() => { noBtn3.textContent = "No way 😈"; }, 800);
});

yesBtn3.addEventListener('click', () => {
    q3.classList.add('hidden');
    celebrationDiv.classList.remove('hidden');
    // Show custom message
    document.querySelector('.celebration-text').innerText = CONFIG.celebrationMessage;
    // Create heart explosion
    for (let i = 0; i < 60; i++) {
        const heart = document.createElement('div');
        heart.innerText = ['❤️','💖','💗','💘'][Math.floor(Math.random()*4)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = Math.random() * window.innerHeight + 'px';
        heart.style.fontSize = (20 + Math.random() * 50) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = 'floatUp 1s ease-out forwards';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
});