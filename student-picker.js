/**
 * Student Picker System
 * سیستم انتخاب دانش‌آموز پاسخ‌دهنده برای کلاس 28 نفره
 */

// Global variables
let selectedStudent = null;
let isPickingRandom = false;
let studentPickerAudioContext = null;

// Initialize Audio Context
function initStudentPickerAudio() {
    if (!studentPickerAudioContext) {
        studentPickerAudioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (studentPickerAudioContext.state === 'suspended') {
            studentPickerAudioContext.resume();
        }
    }
    return studentPickerAudioContext;
}

// Convert number to Persian digits
function toPersianDigits(num) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().split('').map(d => persianDigits[parseInt(d)]).join('');
}

// Play hint sound (for opening modal)
function playPickerHintSound() {
    const ctx = initStudentPickerAudio();
    const now = ctx.currentTime;
    
    const notes = [
        { freq: 523.25, start: 0, duration: 0.1 },
        { freq: 659.25, start: 0.1, duration: 0.1 },
        { freq: 783.99, start: 0.2, duration: 0.15 }
    ];
    
    notes.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = note.freq;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0, now + note.start);
        gain.gain.linearRampToValueAtTime(0.1, now + note.start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, now + note.start + note.duration);
        osc.start(now + note.start);
        osc.stop(now + note.start + note.duration);
    });
}

// Play drum roll sound
function playDrumRoll() {
    const ctx = initStudentPickerAudio();
    const now = ctx.currentTime;
    
    for (let i = 0; i < 20; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 100;
        osc.type = 'triangle';
        const startTime = now + (i * 0.05);
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.05);
        osc.start(startTime);
        osc.stop(startTime + 0.05);
    }
}

// Play countdown beep
function playCountdownBeep(isLast = false) {
    const ctx = initStudentPickerAudio();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = isLast ? 880 : 440;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
}

// Play success sound
function playPickerSuccessSound() {
    const ctx = initStudentPickerAudio();
    const now = ctx.currentTime;
    
    const melody = [
        { freq: 523.25, start: 0, duration: 0.15 },
        { freq: 659.25, start: 0.15, duration: 0.15 },
        { freq: 783.99, start: 0.3, duration: 0.15 },
        { freq: 1046.50, start: 0.45, duration: 0.3 }
    ];

    melody.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = note.freq;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0, now + note.start);
        gain.gain.linearRampToValueAtTime(0.15, now + note.start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, now + note.start + note.duration);
        osc.start(now + note.start);
        osc.stop(now + note.start + note.duration);
    });
}

// Launch confetti (requires confetti canvas)
function launchPickerConfetti() {
    const canvas = document.getElementById('confetti');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e'];

    for (let i = 0; i < 100; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5,
            vx: Math.random() * 4 - 2,
            vy: Math.random() * 3 + 2
        });
    }

    const startTime = Date.now();
    const duration = 3000;

    function animate() {
        const elapsed = Date.now() - startTime;
        if (elapsed >= duration) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            ctx.save();
            ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;
            p.vy += 0.1;
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Open student picker modal
function openStudentPicker() {
    initStudentPickerAudio();
    document.getElementById('studentModal').classList.add('show');
    playPickerHintSound();
}

// Close student picker modal
function closeStudentPicker() {
    document.getElementById('studentModal').classList.remove('show');
    resetBalls();
}

// Generate balls (28 students)
function generateBalls() {
    const container = document.getElementById('ballsContainer');
    container.innerHTML = '';
    
    for (let i = 1; i <= 28; i++) {
        const ball = document.createElement('div');
        ball.className = 'ball';
        ball.textContent = toPersianDigits(i);
        ball.onclick = () => selectStudent(i);
        ball.id = 'ball_' + i;
        container.appendChild(ball);
    }
}

// Select a student (manual selection)
function selectStudent(num) {
    if (isPickingRandom) return;
    
    initStudentPickerAudio();
    selectedStudent = num;
    
    // Remove previous selection
    document.querySelectorAll('.ball').forEach(b => {
        b.classList.remove('selected');
    });
    
    // Select new ball
    const ball = document.getElementById('ball_' + num);
    ball.classList.add('selected');
    
    // Play sound and show result
    playPickerSuccessSound();
    launchPickerConfetti();
    showResult(num);
}

// Pick random student (exciting lottery)
function pickRandomStudent() {
    if (isPickingRandom) return;
    
    initStudentPickerAudio();
    isPickingRandom = true;
    
    const btn = document.getElementById('pickRandomBtn');
    btn.disabled = true;
    btn.textContent = 'شروع قرعه‌کشی...';
    
    // Reset all balls
    document.querySelectorAll('.ball').forEach(b => {
        b.classList.remove('selected', 'highlight');
    });
    
    // Play drum roll
    playDrumRoll();
    
    // Fast highlight animation
    let count = 0;
    const maxCount = 30;
    const highlightInterval = setInterval(() => {
        const randomNum = Math.floor(Math.random() * 28) + 1;
        
        // Remove previous highlights
        document.querySelectorAll('.ball').forEach(b => {
            b.classList.remove('highlight');
        });
        
        // Add highlight to random ball
        document.getElementById('ball_' + randomNum).classList.add('highlight');
        
        count++;
        if (count >= maxCount) {
            clearInterval(highlightInterval);
            
            // Show countdown
            setTimeout(() => {
                showCountdownAndReveal();
            }, 300);
        }
    }, 50);
}

// Show countdown and reveal winner
function showCountdownAndReveal() {
    const countdownOverlay = document.getElementById('countdownOverlay');
    const countdownNumber = document.getElementById('countdownNumber');
    
    // Close modal first
    closeStudentPicker();
    
    // Show countdown overlay
    countdownOverlay.classList.add('show');
    
    // Countdown 3, 2, 1
    let countdown = 3;
    
    function showNumber() {
        if (countdown > 0) {
            countdownNumber.textContent = toPersianDigits(countdown);
            countdownNumber.style.animation = 'none';
            setTimeout(() => {
                countdownNumber.style.animation = 'countdown-pulse 1s ease';
            }, 10);
            
            playCountdownBeep(countdown === 1);
            countdown--;
            setTimeout(showNumber, 1000);
        } else {
            // Hide countdown
            countdownOverlay.classList.remove('show');
            
            // Select winner
            const finalNum = Math.floor(Math.random() * 28) + 1;
            revealWinner(finalNum);
        }
    }
    
    showNumber();
}

// Reveal winner with big animation
function revealWinner(num) {
    selectedStudent = num;
    
    // Show winner banner
    const winnerBanner = document.getElementById('winnerBanner');
    const winnerNumber = document.getElementById('winnerNumber');
    
    winnerNumber.textContent = toPersianDigits(num);
    winnerBanner.classList.add('show');
    
    // Play success sound and confetti
    playPickerSuccessSound();
    launchPickerConfetti();
    
    // More confetti for extra excitement
    setTimeout(() => {
        launchPickerConfetti();
    }, 500);
    
    setTimeout(() => {
        launchPickerConfetti();
    }, 1000);
    
    // Reset state
    isPickingRandom = false;
    const btn = document.getElementById('pickRandomBtn');
    btn.disabled = false;
    btn.textContent = '🎲 قرعه‌کشی تصادفی!';
}

// Close winner banner
function closeWinnerBanner() {
    const winnerBanner = document.getElementById('winnerBanner');
    winnerBanner.classList.remove('show');
}

// Show result in modal
function showResult(num) {
    const resultDiv = document.getElementById('resultDisplay');
    resultDiv.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 10px;">🎉</div>
        <div>دانش‌آموز شماره <span style="color: #f5576c; font-size: 2rem;">${toPersianDigits(num)}</span></div>
        <div style="font-size: 1.2rem; margin-top: 10px;">نوبت پاسخ دهی توست! 🎯</div>
    `;
    resultDiv.classList.add('show');
}

// Reset balls
function resetBalls() {
    document.querySelectorAll('.ball').forEach(b => {
        b.classList.remove('selected', 'highlight');
    });
    
    const resultDiv = document.getElementById('resultDisplay');
    resultDiv.classList.remove('show');
    resultDiv.innerHTML = '';
    
    const btn = document.getElementById('pickRandomBtn');
    btn.disabled = false;
    btn.textContent = '🎲 قرعه‌کشی تصادفی!';
    
    selectedStudent = null;
    isPickingRandom = false;
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('studentModal');
    if (event.target === modal) {
        closeStudentPicker();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    generateBalls();
});

