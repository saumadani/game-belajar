/**
 * ==========================================================================
 * GAME EDUKASI: DUEL BILANGAN (> < =)
 * Spesifikasi Khusus: Siswa Tuli Kelas 4 SD (Setara Kelas I)
 * Fitur: Duel 2 Angka Acak (Konfigurasi Rentang Mudah Diatur Guru)
 * ==========================================================================
 */

// 1. KONFIGURASI GAME (MUDAH DIMODIFIKASI GURU)
const GAME_CONFIG = {
    TOTAL_QUESTIONS: 10,
    MIN_NUMBER: 100,      // Rentang angka minimal
    MAX_NUMBER: 500,      // Rentang angka maksimal
    EQUAL_PROBABILITY: 0.25 // 25% peluang muncul angka yang sama (=)
};

// 2. STATE PERMAINAN
let activeQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let correctFirstTryCount = 0;
let wrongAttemptsTotal = 0;
let isCurrentQuestionTriedWrong = false;

// 3. SELEKSI ELEMEN DOM
const screens = {
    start: document.getElementById('screen-start'),
    instructions: document.getElementById('screen-instructions'),
    game: document.getElementById('screen-game'),
    result: document.getElementById('screen-result')
};

const btnStart = document.getElementById('btn-start');
const btnPlay = document.getElementById('btn-play');
const btnRestart = document.getElementById('btn-restart');
const btnHome = document.getElementById('btn-home');

const questionProgressText = document.getElementById('question-progress-text');
const currentScoreEl = document.getElementById('current-score');
const progressBarFill = document.getElementById('progress-bar-fill');

const cardLeft = document.getElementById('card-left');
const cardRight = document.getElementById('card-right');
const numLeftEl = document.getElementById('num-left');
const numRightEl = document.getElementById('num-right');

const symbolVsBadge = document.getElementById('symbol-vs-badge');
const vsSymbolText = document.getElementById('vs-symbol-text');

const feedbackInline = document.getElementById('feedback-inline');
const feedbackInlineIcon = document.getElementById('feedback-inline-icon');
const feedbackInlineText = document.getElementById('feedback-inline-text');

const symbolButtonsContainer = document.getElementById('symbol-buttons-container');
const symbolButtons = document.querySelectorAll('.btn-symbol');

const feedbackOverlay = document.getElementById('feedback-overlay');
const feedbackCard = document.getElementById('feedback-card');
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackText = document.getElementById('feedback-text');
const feedbackSubtext = document.getElementById('feedback-subtext');

// 4. UTILS & NAVIGASI HALAMAN
function navigateToScreen(screenName) {
    Object.keys(screens).forEach(key => {
        screens[key].classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 5. GENERASI 10 SOAL ACAK PERBANDINGAN
function generateQuestions() {
    const questions = [];
    for (let i = 0; i < GAME_CONFIG.TOTAL_QUESTIONS; i++) {
        let left, right, correctSymbol;

        // Tentukan apakah ronde ini angka sama (=) atau berbeda (> / <)
        const isEqualRound = Math.random() < GAME_CONFIG.EQUAL_PROBABILITY;

        if (isEqualRound) {
            left = getRandomInt(GAME_CONFIG.MIN_NUMBER, GAME_CONFIG.MAX_NUMBER);
            right = left;
            correctSymbol = "=";
        } else {
            left = getRandomInt(GAME_CONFIG.MIN_NUMBER, GAME_CONFIG.MAX_NUMBER);
            do {
                right = getRandomInt(GAME_CONFIG.MIN_NUMBER, GAME_CONFIG.MAX_NUMBER);
            } while (right === left);

            correctSymbol = (left > right) ? ">" : "<";
        }

        questions.push({ left, right, correctSymbol });
    }
    return questions;
}

// 6. INISIALISASI PERMAINAN
function initGame() {
    currentQuestionIndex = 0;
    score = 0;
    correctFirstTryCount = 0;
    wrongAttemptsTotal = 0;

    activeQuestions = generateQuestions();
    currentScoreEl.textContent = score;

    loadQuestion();
    navigateToScreen('game');
}

// 7. MEMUAT SOAL RONDE
function loadQuestion() {
    isCurrentQuestionTriedWrong = false;
    hideInlineFeedback();
    resetDuelArenaUI();

    const q = activeQuestions[currentQuestionIndex];

    // Progress Bar & Info Bar
    questionProgressText.textContent = `${currentQuestionIndex + 1} / ${GAME_CONFIG.TOTAL_QUESTIONS}`;
    progressBarFill.style.width = `${((currentQuestionIndex + 1) / GAME_CONFIG.TOTAL_QUESTIONS) * 100}%`;

    // Render Angka Kiri & Kanan
    numLeftEl.textContent = q.left;
    numRightEl.textContent = q.right;

    // Reset Simbol VS
    vsSymbolText.textContent = "VS";
    symbolVsBadge.style.backgroundColor = "#FF9800";

    // Enable semua tombol simbol
    symbolButtons.forEach(btn => {
        btn.className = "btn-symbol";
        btn.style.pointerEvents = "auto";
    });
}

function resetDuelArenaUI() {
    cardLeft.className = "duel-card card-left";
    cardRight.className = "duel-card card-right";
}

// 8. LOGIKA VALIDASI JAWABAN SISWA
symbolButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedSymbol = button.dataset.symbol;
        const q = activeQuestions[currentQuestionIndex];

        if (selectedSymbol === q.correctSymbol) {
            // --- JAWABAN BENAR ---
            button.classList.add('correct-symbol');
            vsSymbolText.textContent = q.correctSymbol;
            symbolVsBadge.style.backgroundColor = "#2E7D32";

            // Visual Highlight Kartu Pemenang
            if (q.correctSymbol === ">") {
                cardLeft.classList.add('winner');
            } else if (q.correctSymbol === "<") {
                cardRight.classList.add('winner');
            } else {
                cardLeft.classList.add('equal-winner');
                cardRight.classList.add('equal-winner');
            }

            if (!isCurrentQuestionTriedWrong) {
                score += 10;
                correctFirstTryCount++;
                currentScoreEl.textContent = score;
            }

            showInlineFeedback(true, "Benar!");
            disableSymbolButtons();

            // Lanjut otomatis ke soal berikutnya setelah 1.1 detik
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < activeQuestions.length) {
                    loadQuestion();
                } else {
                    showFinalResults();
                }
            }, 1100);

        } else {
            // --- JAWABAN SALAH ---
            button.classList.add('wrong-symbol');

            if (!isCurrentQuestionTriedWrong) {
                wrongAttemptsTotal++;
                isCurrentQuestionTriedWrong = true;
            }

            showInlineFeedback(false, "Coba Lagi");
        }
    });
});

function disableSymbolButtons() {
    symbolButtons.forEach(btn => {
        btn.style.pointerEvents = "none";
    });
}

// 9. FEEDBACK VISUAL INLINE
function showInlineFeedback(isCorrect, message) {
    feedbackInline.className = "feedback-inline " + (isCorrect ? "correct" : "wrong");
    feedbackInlineIcon.textContent = isCorrect ? "✅" : "❌";
    feedbackInlineText.textContent = message;
    feedbackInline.classList.remove('hidden');
}

function hideInlineFeedback() {
    feedbackInline.classList.add('hidden');
}

// 10. HALAMAN HASIL & MOTIVASI
function showFinalResults() {
    const percentage = Math.round((correctFirstTryCount / GAME_CONFIG.TOTAL_QUESTIONS) * 100);

    document.getElementById('final-score').textContent = score;
    document.getElementById('final-correct').textContent = `${correctFirstTryCount} / ${GAME_CONFIG.TOTAL_QUESTIONS}`;
    document.getElementById('final-wrong').textContent = `${wrongAttemptsTotal} Kali`;
    document.getElementById('final-percentage').textContent = `${percentage}%`;

    const motivationIcon = document.getElementById('motivation-icon');
    const motivationText = document.getElementById('motivation-text');

    if (percentage === 100) {
        motivationIcon.textContent = "🏆";
        motivationText.textContent = "Hebat! Kamu Juara Duel!";
    } else if (percentage >= 70) {
        motivationIcon.textContent = "🌟";
        motivationText.textContent = "Bagus! Kerja Sangat Baik!";
    } else {
        motivationIcon.textContent = "💪";
        motivationText.textContent = "Ayo Coba Lagi!";
    }

    navigateToScreen('result');
}

// 11. EVENT LISTENERS UTAMA
btnStart.addEventListener('click', () => navigateToScreen('instructions'));
btnPlay.addEventListener('click', initGame);
btnRestart.addEventListener('click', initGame);
btnHome.addEventListener('click', () => navigateToScreen('start'));