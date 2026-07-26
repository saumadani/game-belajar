/* ==========================================================================
   1. QUESTION BANK DATA (FACT FAMILIES PAIRS)
   ========================================================================== */
const QUESTION_BANK = [
    // LEVEL 1: Angka Kecil (Rentang Hasil 1 - 5)
    { id: 1, level: 1, pairId: "p_1_1", textAdd: "2 + 3 = 5", textSub: "5 - 3 = 2" },
    { id: 2, level: 1, pairId: "p_1_2", textAdd: "1 + 4 = 5", textSub: "5 - 4 = 1" },
    { id: 3, level: 1, pairId: "p_1_3", textAdd: "2 + 2 = 4", textSub: "4 - 2 = 2" },
    { id: 4, level: 1, pairId: "p_1_4", textAdd: "1 + 2 = 3", textSub: "3 - 2 = 1" },

    // LEVEL 2: Angka Sedang (Rentang Hasil 1 - 10)
    { id: 5, level: 2, pairId: "p_2_1", textAdd: "6 + 4 = 10", textSub: "10 - 4 = 6" },
    { id: 6, level: 2, pairId: "p_2_2", textAdd: "5 + 3 = 8",  textSub: "8 - 3 = 5" },
    { id: 7, level: 2, pairId: "p_2_3", textAdd: "4 + 3 = 7",  textSub: "7 - 3 = 4" },
    { id: 8, level: 2, pairId: "p_2_4", textAdd: "7 + 2 = 9",  textSub: "9 - 2 = 7" },

    // LEVEL 3: Angka Belasan (Rentang Hasil 1 - 15)
    { id: 9,  level: 3, pairId: "p_3_1", textAdd: "8 + 7 = 15", textSub: "15 - 7 = 8" },
    { id: 10, level: 3, pairId: "p_3_2", textAdd: "9 + 3 = 12", textSub: "12 - 3 = 9" },
    { id: 11, level: 3, pairId: "p_3_3", textAdd: "6 + 8 = 14", textSub: "14 - 8 = 6" },
    { id: 12, level: 3, pairId: "p_3_4", textAdd: "7 + 4 = 11", textSub: "11 - 4 = 7" },
    { id: 13, level: 3, pairId: "p_3_5", textAdd: "9 + 4 = 13", textSub: "13 - 4 = 9" },

    // LEVEL 4: Angka Campuran/Tantangan (Rentang Hasil 1 - 20)
    { id: 14, level: 4, pairId: "p_4_1", textAdd: "12 + 8 = 20", textSub: "20 - 8 = 12" },
    { id: 15, level: 4, pairId: "p_4_2", textAdd: "11 + 6 = 17", textSub: "17 - 6 = 11" },
    { id: 16, level: 4, pairId: "p_4_3", textAdd: "9 + 9 = 18",  textSub: "18 - 9 = 9" },
    { id: 17, level: 4, pairId: "p_4_4", textAdd: "13 + 3 = 16", textSub: "16 - 3 = 13" },
    { id: 18, level: 4, pairId: "p_4_5", textAdd: "10 + 5 = 15", textSub: "15 - 5 = 10" },
    { id: 19, level: 4, pairId: "p_4_6", textAdd: "14 + 5 = 19", textSub: "19 - 5 = 14" }
];

/* ==========================================================================
   2. MODULE: UIManager (Navigasi Screen & DOM Handling)
   ========================================================================== */
class UIManager {
    static showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    }

    static updateHUD(level, matchedPairs, totalPairs, score) {
        document.getElementById('hud-level').innerText = level;
        document.getElementById('hud-progress').innerText = `${matchedPairs}/${totalPairs}`;
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
        this.levelPairs = [];
        this.deck = [];

        // Matching States
        this.flippedCards = [];
        this.matchedCount = 0;
        this.isBoardLocked = false;

        // Scores
        this.totalScore = 0;
        this.levelScore = 0;
        this.levelWrongGuesses = 0;

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
        this.levelPairs = QUESTION_BANK.filter(q => q.level === levelNum);
        
        this.matchedCount = 0;
        this.levelScore = 0;
        this.levelWrongGuesses = 0;
        this.flippedCards = [];
        this.isBoardLocked = false;

        this.buildDeck();
        this.renderCardGrid();

        UIManager.updateHUD(this.currentLevel, 0, this.levelPairs.length, this.totalScore);

        // Timer Toggle
        const timerContainer = document.getElementById('timer-container');
        if (this.isChallengeMode) {
            timerContainer.classList.remove('hidden');
            this.startTimer();
        } else {
            timerContainer.classList.add('hidden');
            this.stopTimer();
        }

        UIManager.showScreen('screen-game');
    }

    buildDeck() {
        this.deck = [];
        this.levelPairs.forEach(pair => {
            // Push Add Card
            this.deck.push({
                pairId: pair.pairId,
                type: 'add',
                text: pair.textAdd
            });
            // Push Sub Card
            this.deck.push({
                pairId: pair.pairId,
                type: 'sub',
                text: pair.textSub
            });
        });

        // Fisher-Yates Shuffle
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    renderCardGrid() {
        const grid = document.getElementById('card-grid');
        grid.innerHTML = '';

        // Dynamically Adjust Columns based on card count
        if (this.deck.length >= 12) {
            grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
        } else {
            grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
        }

        this.deck.forEach((cardData, idx) => {
            const cardEl = document.createElement('div');
            cardEl.className = 'game-card';
            cardEl.dataset.idx = idx;
            cardEl.dataset.pairId = cardData.pairId;

            const cardBack = document.createElement('div');
            cardBack.className = 'card-face card-back';
            cardBack.innerText = '🔑';

            const cardFront = document.createElement('div');
            cardFront.className = `card-face card-front type-${cardData.type}`;
            cardFront.innerText = cardData.text;

            cardEl.appendChild(cardBack);
            cardEl.appendChild(cardFront);

            cardEl.onclick = () => this.handleCardClick(cardEl, cardData);
            grid.appendChild(cardEl);
        });
    }

    handleCardClick(cardEl, cardData) {
        if (this.isBoardLocked) return;
        if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

        // Flip Card
        cardEl.classList.add('flipped');
        this.flippedCards.push({ cardEl, cardData });

        if (this.flippedCards.length === 2) {
            this.checkMatch();
        }
    }

    checkMatch() {
        this.isBoardLocked = true;
        const [first, second] = this.flippedCards;

        const isMatch = (first.cardData.pairId === second.cardData.pairId);

        if (isMatch) {
            // Match Found
            setTimeout(() => {
                first.cardEl.classList.add('matched');
                second.cardEl.classList.add('matched');

                this.matchedCount++;
                this.levelScore += 25;
                this.totalScore += 25;

                UIManager.updateHUD(this.currentLevel, this.matchedCount, this.levelPairs.length, this.totalScore);

                this.flippedCards = [];
                this.isBoardLocked = false;

                // Check Level Completion
                if (this.matchedCount === this.levelPairs.length) {
                    this.stopTimer();
                    setTimeout(() => this.finishLevel(), 600);
                }
            }, 400);

        } else {
            // Mismatch
            this.levelWrongGuesses++;
            setTimeout(() => {
                AnimationManager.playShake(first.cardEl);
                AnimationManager.playShake(second.cardEl);

                setTimeout(() => {
                    first.cardEl.classList.remove('flipped');
                    second.cardEl.classList.remove('flipped');
                    this.flippedCards = [];
                    this.isBoardLocked = false;
                }, 600);
            }, 400);
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
                AnimationManager.showFeedbackModal(false, "WAKTU HABIS! ⏰", () => this.finishLevel());
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    finishLevel() {
        document.getElementById('lvl-correct').innerText = this.matchedCount;
        document.getElementById('lvl-wrong').innerText = this.levelWrongGuesses;
        document.getElementById('lvl-score').innerText = this.levelScore;

        let stars = "⭐";
        if (this.levelWrongGuesses <= 2) stars = "⭐⭐⭐";
        else if (this.levelWrongGuesses <= 5) stars = "⭐⭐";
        document.getElementById('level-stars').innerText = stars;

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
        const maxScore = 19 * 25; // 19 Pairs total across 4 levels * 25 pts
        const accuracy = Math.round((this.totalScore / maxScore) * 100);

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