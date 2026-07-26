/* ==========================================================================
   1. QUESTION BANK DATA (20 SOAL, EVALUASI CAMPURAN KAHOOT-STYLE)
   ========================================================================== */
const QUESTION_BANK = [
    // LEVEL 1: Penjumlahan Campuran Sederhana (Rentang 1 - 10)
    {
        id: 1, level: 1, pertanyaan: "4 + 3 = ?", visual: "🍎🍎🍎🍎 + 🍎🍎🍎",
        kunciJawaban: "7",
        opsi: [
            { teks: "7", warna: "red", simbol: "▲" },
            { teks: "6", warna: "blue", simbol: "◆" },
            { teks: "8", warna: "yellow", simbol: "●" },
            { teks: "5", warna: "green", simbol: "■" }
        ]
    },
    {
        id: 2, level: 1, pertanyaan: "5 + 2 = ?", visual: "🍊🍊🍊🍊🍊 + 🍊🍊",
        kunciJawaban: "7",
        opsi: [
            { teks: "8", warna: "red", simbol: "▲" },
            { teks: "7", warna: "blue", simbol: "◆" },
            { teks: "6", warna: "yellow", simbol: "●" }
        ]
    },
    {
        id: 3, level: 1, pertanyaan: "6 + 3 = ?", visual: "🍌🍌🍌🍌🍌🍌 + 🍌🍌🍌",
        kunciJawaban: "9",
        opsi: [
            { teks: "9", warna: "red", simbol: "▲" },
            { teks: "8", warna: "blue", simbol: "◆" },
            { teks: "10", warna: "yellow", simbol: "●" }
        ]
    },
    {
        id: 4, level: 1, pertanyaan: "2 + 6 = ?", visual: "⚽⚽ + ⚽⚽⚽⚽⚽⚽",
        kunciJawaban: "8",
        opsi: [
            { teks: "7", warna: "red", simbol: "▲" },
            { teks: "8", warna: "blue", simbol: "◆" },
            { teks: "9", warna: "yellow", simbol: "●" },
            { teks: "6", warna: "green", simbol: "■" }
        ]
    },
    {
        id: 5, level: 1, pertanyaan: "7 + 3 = ?", visual: "⭐🌟⭐🌟⭐🌟⭐ + ⭐🌟⭐",
        kunciJawaban: "10",
        opsi: [
            { teks: "9", warna: "red", simbol: "▲" },
            { teks: "10", warna: "blue", simbol: "◆" },
            { teks: "8", warna: "yellow", simbol: "●" }
        ]
    },

    // LEVEL 2: Pengurangan Campuran Sederhana (Rentang 1 - 10)
    {
        id: 6, level: 2, pertanyaan: "7 - 3 = ?", visual: "🎈🎈🎈🎈🎈🎈🎈 ❌3",
        kunciJawaban: "4",
        opsi: [
            { teks: "4", warna: "red", simbol: "▲" },
            { teks: "3", warna: "blue", simbol: "◆" },
            { teks: "5", warna: "yellow", simbol: "●" },
            { teks: "2", warna: "green", simbol: "■" }
        ]
    },
    {
        id: 7, level: 2, pertanyaan: "8 - 4 = ?", visual: "🚗🚗🚗🚗🚗🚗🚗🚗 ❌4",
        kunciJawaban: "4",
        opsi: [
            { teks: "5", warna: "red", simbol: "▲" },
            { teks: "4", warna: "blue", simbol: "◆" },
            { teks: "3", warna: "yellow", simbol: "●" }
        ]
    },
    {
        id: 8, level: 2, pertanyaan: "9 - 5 = ?", visual: "🍬🍬🍬🍬🍬🍬🍬🍬🍬 ❌5",
        kunciJawaban: "4",
        opsi: [
            { teks: "3", warna: "red", simbol: "▲" },
            { teks: "4", warna: "blue", simbol: "◆" },
            { teks: "5", warna: "yellow", simbol: "●" },
            { teks: "6", warna: "green", simbol: "■" }
        ]
    },
    {
        id: 9, level: 2, pertanyaan: "6 - 2 = ?", visual: "🐱🐱🐱🐱🐱🐱 ❌2",
        kunciJawaban: "4",
        opsi: [
            { teks: "4", warna: "red", simbol: "▲" },
            { teks: "5", warna: "blue", simbol: "◆" },
            { teks: "3", warna: "yellow", simbol: "●" }
        ]
    },
    {
        id: 10, level: 2, pertanyaan: "10 - 4 = ?", visual: "🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩 ❌4",
        kunciJawaban: "6",
        opsi: [
            { teks: "5", warna: "red", simbol: "▲" },
            { teks: "6", warna: "blue", simbol: "◆" },
            { teks: "7", warna: "yellow", simbol: "●" },
            { teks: "4", warna: "green", simbol: "■" }
        ]
    },

    // LEVEL 3: Evaluasi Campuran Penjumlahan & Pengurangan (Rentang 1 - 15)
    {
        id: 11, level: 3, pertanyaan: "8 + 5 = ?", visual: "🌸🌸🌸🌸🌸🌸🌸🌸 + 🌸🌸🌸🌸🌸",
        kunciJawaban: "13",
        opsi: [
            { teks: "12", warna: "red", simbol: "▲" },
            { teks: "13", warna: "blue", simbol: "◆" },
            { teks: "14", warna: "yellow", simbol: "●" }
        ]
    },
    {
        id: 12, level: 3, pertanyaan: "12 - 4 = ?", visual: "✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ ❌4",
        kunciJawaban: "8",
        opsi: [
            { teks: "8", warna: "red", simbol: "▲" },
            { teks: "7", warna: "blue", simbol: "◆" },
            { teks: "9", warna: "yellow", simbol: "●" },
            { teks: "6", warna: "green", simbol: "■" }
        ]
    },
    {
        id: 13, level: 3, pertanyaan: "9 + 4 = ?", visual: "🐟🐟🐟🐟🐟🐟🐟🐟🐟 + 🐟🐟🐟🐟",
        kunciJawaban: "13",
        opsi: [
            { teks: "12", warna: "red", simbol: "▲" },
            { teks: "13", warna: "blue", simbol: "◆" },
            { teks: "14", warna: "yellow", simbol: "●" }
        ]
    },
    {
        id: 14, level: 3, pertanyaan: "15 - 6 = ?", visual: "🍞🍞🍞🍞🍞🍞🍞🍞🍞🍞🍞🍞🍞🍞🍞 ❌6",
        kunciJawaban: "9",
        opsi: [
            { teks: "8", warna: "red", simbol: "▲" },
            { teks: "9", warna: "blue", simbol: "◆" },
            { teks: "10", warna: "yellow", simbol: "●" },
            { teks: "7", warna: "green", simbol: "■" }
        ]
    },
    {
        id: 15, level: 3, pertanyaan: "7 + 7 = ?", visual: "🐥🐥🐥🐥🐥🐥🐥 + 🐥🐥🐥🐥🐥🐥🐥",
        kunciJawaban: "14",
        opsi: [
            { teks: "13", warna: "red", simbol: "▲" },
            { teks: "14", warna: "blue", simbol: "◆" },
            { teks: "15", warna: "yellow", simbol: "●" }
        ]
    },

    // LEVEL 4: Evaluasi Campuran Tingkat Lanjut (Rentang 1 - 20)
    {
        id: 16, level: 4, pertanyaan: "11 + 6 = ?", visual: "🍦🍦🍦🍦🍦🍦🍦🍦🍦🍦🍦 + 🍦🍦🍦🍦🍦🍦",
        kunciJawaban: "17",
        opsi: [
            { teks: "16", warna: "red", simbol: "▲" },
            { teks: "17", warna: "blue", simbol: "◆" },
            { teks: "18", warna: "yellow", simbol: "●" },
            { teks: "15", warna: "green", simbol: "■" }
        ]
    },
    {
        id: 17, level: 4, pertanyaan: "18 - 7 = ?", visual: "🧢🧢🧢🧢🧢🧢🧢🧢🧢🧢🧢🧢🧢🧢🧢🧢🧢🧢 ❌7",
        kunciJawaban: "11",
        opsi: [
            { teks: "10", warna: "red", simbol: "▲" },
            { teks: "11", warna: "blue", simbol: "◆" },
            { teks: "12", warna: "yellow", simbol: "●" }
        ]
    },
    {
        id: 18, level: 4, pertanyaan: "13 + 5 = ?", visual: "🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁 + 🎁🎁🎁🎁🎁",
        kunciJawaban: "18",
        opsi: [
            { teks: "17", warna: "red", simbol: "▲" },
            { teks: "18", warna: "blue", simbol: "◆" },
            { teks: "19", warna: "yellow", simbol: "●" },
            { teks: "16", warna: "green", simbol: "■" }
        ]
    },
    {
        id: 19, level: 4, pertanyaan: "20 - 8 = ?", visual: "🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟 ❌8",
        kunciJawaban: "12",
        opsi: [
            { teks: "11", warna: "red", simbol: "▲" },
            { teks: "12", warna: "blue", simbol: "◆" },
            { teks: "13", warna: "yellow", simbol: "●" }
        ]
    },
    {
        id: 20, level: 4, pertanyaan: "14 + 5 = ?", visual: "🧁🧁🧁🧁🧁🧁🧁🧁🧁🧁🧁🧁🧁🧁 + 🧁🧁🧁🧁🧁",
        kunciJawaban: "19",
        opsi: [
            { teks: "18", warna: "red", simbol: "▲" },
            { teks: "19", warna: "blue", simbol: "◆" },
            { teks: "20", warna: "yellow", simbol: "●" },
            { teks: "17", warna: "green", simbol: "■" }
        ]
    }
];

/* ==========================================================================
   2. MODULE: UIManager (Navigasi Screen & DOM Handling)
   ========================================================================== */
class UIManager {
    static showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    }

    static updateHUD(level, index, total, score) {
        document.getElementById('hud-level').innerText = level;
        document.getElementById('hud-progress').innerText = `${index + 1}/${total}`;
        document.getElementById('hud-score').innerText = score;
    }
}

/* ==========================================================================
   3. MODULE: AnimationManager (Visual-First Feedback untuk Anak Tuli)
   ========================================================================== */
class AnimationManager {
    static playShake(element) {
        element.classList.remove('anim-shake');
        void element.offsetWidth; // Force reflow
        element.classList.add('anim-shake');
    }

    static showFeedbackModal(isCorrect, message, callback) {
        const overlay = document.getElementById('feedback-overlay');
        const box = document.getElementById('feedback-box');
        const icon = document.getElementById('feedback-icon');
        const text = document.getElementById('feedback-text');
        const btn = document.getElementById('btn-feedback-next');

        overlay.classList.add('active');
        box.classList.add('anim-pop');

        if (isCorrect) {
            icon.innerText = "⭐";
            text.innerText = message;
            text.style.color = "#2E7D32";
            btn.className = "btn btn-primary";
        } else {
            icon.innerText = "💡";
            text.innerText = message;
            text.style.color = "#C62828";
            btn.className = "btn btn-info";
        }

        btn.onclick = () => {
            overlay.classList.remove('active');
            box.classList.remove('anim-pop');
            callback();
        };
    }
}

/* ==========================================================================
   4. MODULE: GameManager (Core Controller ES6)
   ========================================================================== */
class GameManager {
    constructor() {
        this.currentLevel = 1;
        this.unlockedLevels = 1;
        this.isChallengeMode = false;
        this.questions = [];
        this.currentIndex = 0;

        // Scores
        this.totalScore = 0;
        this.levelScore = 0;
        this.levelCorrect = 0;
        this.levelWrong = 0;

        // Timer State
        this.timerInterval = null;
        this.timeLeft = 60;

        this.initEvents();
    }

    initEvents() {
        document.getElementById('btn-start').onclick = () => this.renderLevelSelect();
        document.getElementById('btn-instructions').onclick = () => UIManager.showScreen('screen-instructions');
        document.getElementById('btn-about').onclick = () => UIManager.showScreen('screen-about');

        document.querySelectorAll('.btn-home').forEach(btn => {
            btn.onclick = () => {
                this.stopTimer();
                UIManager.showScreen('screen-menu');
            };
        });

        // Mode Toggles
        document.getElementById('mode-learn').onclick = () => this.setMode(false);
        document.getElementById('mode-challenge').onclick = () => this.setMode(true);

        document.getElementById('btn-restart').onclick = () => {
            this.totalScore = 0;
            this.unlockedLevels = 1;
            UIManager.showScreen('screen-menu');
        };
    }

    setMode(isChallenge) {
        this.isChallengeMode = isChallenge;
        document.getElementById('mode-learn').className = `btn-mode ${!isChallenge ? 'active' : ''}`;
        document.getElementById('mode-challenge').className = `btn-mode ${isChallenge ? 'active' : ''}`;
    }

    renderLevelSelect() {
        const grid = document.getElementById('level-grid');
        grid.innerHTML = '';

        for (let i = 1; i <= 4; i++) {
            const btn = document.createElement('button');
            const isUnlocked = i <= this.unlockedLevels;
            btn.className = `btn-level ${isUnlocked ? '' : 'locked'}`;
            btn.innerHTML = `<span>Level ${i}</span><span>${isUnlocked ? '🔓' : '🔒'}</span>`;

            if (isUnlocked) {
                btn.onclick = () => this.startLevel(i);
            }
            grid.appendChild(btn);
        }
        UIManager.showScreen('screen-level-select');
    }

    startLevel(levelNum) {
        this.currentLevel = levelNum;
        this.questions = QUESTION_BANK.filter(q => q.level === levelNum);
        this.currentIndex = 0;

        this.levelScore = 0;
        this.levelCorrect = 0;
        this.levelWrong = 0;

        this.loadQuestion();
        UIManager.showScreen('screen-game');
    }

    loadQuestion() {
        const q = this.questions[this.currentIndex];

        UIManager.updateHUD(this.currentLevel, this.currentIndex, this.questions.length, this.totalScore);

        // Timer Toggle
        const timerContainer = document.getElementById('timer-container');
        if (this.isChallengeMode) {
            timerContainer.classList.remove('hidden');
            this.startTimer();
        } else {
            timerContainer.classList.add('hidden');
            this.stopTimer();
        }

        // Set Question & Visual Objects
        document.getElementById('question-text').innerText = q.pertanyaan;
        document.getElementById('visual-objects').innerText = q.visual;

        // Render Kahoot Options Grid
        const grid = document.getElementById('kahoot-options-grid');
        grid.innerHTML = '';

        q.opsi.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = `kahoot-btn kahoot-${opt.warna}`;
            btn.innerHTML = `
                <span class="shape-icon">${opt.simbol}</span>
                <span class="opt-text">${opt.teks}</span>
            `;
            btn.onclick = () => this.handleOptionSelect(btn, opt.teks, q.kunciJawaban);
            grid.appendChild(btn);
        });
    }

    handleOptionSelect(btnElement, selectedTeks, kunciTeks) {
        this.stopTimer();
        const isCorrect = (selectedTeks === kunciTeks);

        if (isCorrect) {
            btnElement.classList.add('correct-highlight');
            this.levelCorrect++;
            this.levelScore += 20;
            this.totalScore += 20;

            setTimeout(() => {
                AnimationManager.showFeedbackModal(true, "HEBAT! JAWABAN BENAR! 🎉", () => this.nextQuestion());
            }, 400);

        } else {
            this.levelWrong++;
            AnimationManager.playShake(btnElement);

            setTimeout(() => {
                AnimationManager.showFeedbackModal(false, `KURANG TEPAT!\nJawaban Benar Adalah ${kunciTeks}`, () => this.nextQuestion());
            }, 500);
        }
    }

    startTimer() {
        this.stopTimer();
        this.timeLeft = 60;
        const timerBar = document.getElementById('timer-bar');
        timerBar.style.width = '100%';
        timerBar.style.backgroundColor = '#4CAF50';

        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            const pct = (this.timeLeft / 60) * 100;
            timerBar.style.width = `${pct}%`;

            if (this.timeLeft <= 20) {
                timerBar.style.backgroundColor = '#E53935';
            }

            if (this.timeLeft <= 0) {
                this.stopTimer();
                this.levelWrong++;
                AnimationManager.showFeedbackModal(false, "WAKTU HABIS! ⏰", () => this.nextQuestion());
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    nextQuestion() {
        this.currentIndex++;
        if (this.currentIndex < this.questions.length) {
            this.loadQuestion();
        } else {
            this.finishLevel();
        }
    }

    finishLevel() {
        document.getElementById('lvl-correct').innerText = this.levelCorrect;
        document.getElementById('lvl-wrong').innerText = this.levelWrong;
        document.getElementById('lvl-score').innerText = this.levelScore;

        let stars = "⭐";
        let badge = "Penghitung Bintang";

        if (this.levelCorrect >= 4) {
            stars = "⭐⭐⭐";
            badge = "Master Hitung Sejati 👑";
        } else if (this.levelCorrect >= 2) {
            stars = "⭐⭐";
            badge = "Penghitung Handal 🏅";
        }

        document.getElementById('level-stars').innerText = stars;
        document.getElementById('lvl-badge').innerText = badge;

        const btnNext = document.getElementById('btn-next-level');

        if (this.currentLevel < 4) {
            btnNext.innerText = "LANJUT LEVEL ➔";
            btnNext.onclick = () => {
                if (this.unlockedLevels === this.currentLevel) {
                    this.unlockedLevels++;
                }
                this.renderLevelSelect();
            };
        } else {
            btnNext.innerText = "LIHAT HASIL AKHIR 🏆";
            btnNext.onclick = () => this.showFinalResult();
        }

        UIManager.showScreen('screen-level-result');
    }

    showFinalResult() {
        const totalSoal = 20;
        const totalBenar = (this.totalScore / 20);
        const accuracy = Math.round((totalBenar / totalSoal) * 100);

        document.getElementById('final-score').innerText = this.totalScore;
        document.getElementById('final-accuracy').innerText = `${accuracy}%`;

        let stars = "⭐⭐";
        if (accuracy >= 80) stars = "⭐⭐⭐⭐⭐";
        else if (accuracy >= 60) stars = "⭐⭐⭐⭐";
        else if (accuracy >= 40) stars = "⭐⭐⭐";
        document.getElementById('final-stars').innerText = stars;

        UIManager.showScreen('screen-final-result');
    }
}

// Inisialisasi Game
window.onload = () => {
    window.gameApp = new GameManager();
};