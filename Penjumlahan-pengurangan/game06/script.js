/* ==========================================================================
   1. QUESTION BANK DATA (20 SOAL, 4 LEVEL PICTURE STORY)
   ========================================================================== */
const QUESTION_BANK = [
    // LEVEL 1: Konsep Penjumlahan (Membeli/Menambah Barang)
    { id: 1, level: 1, judul: "Beli Apel Lagi 🍎", visualAwal: "🍎🍎", count1: 2, visualAksi: "🍎🍎🍎", count2: 3, ikonAksi: "🛒➕", operasiBenar: "+", hasilBenar: 5, opsiHasil: [4, 5, 6] },
    { id: 2, level: 1, judul: "Dapat Jeruk 🍊", visualAwal: "🍊", count1: 1, visualAksi: "🍊🍊🍊", count2: 3, ikonAksi: "🎁➕", operasiBenar: "+", hasilBenar: 4, opsiHasil: [3, 4, 5] },
    { id: 3, level: 1, judul: "Beli Roti 🍞", visualAwal: "🍞🍞🍞", count1: 3, visualAksi: "🍞🍞", count2: 2, ikonAksi: "🛍️➕", operasiBenar: "+", hasilBenar: 5, opsiHasil: [4, 5, 6] },
    { id: 4, level: 1, judul: "Beli Permen 🍬", visualAwal: "🍬🍬", count1: 2, visualAksi: "🍬🍬🍬🍬", count2: 4, ikonAksi: "🛒➕", operasiBenar: "+", hasilBenar: 6, opsiHasil: [5, 6, 7] },
    { id: 5, level: 1, judul: "Beli Susu 🥛", visualAwal: "🥛🥛🥛", count1: 3, visualAksi: "🥛🥛🥛", count2: 3, ikonAksi: "🛍️➕", operasiBenar: "+", hasilBenar: 6, opsiHasil: [5, 6, 7] },

    // LEVEL 2: Konsep Pengurangan (Dimakan/Bayar/Berkurang)
    { id: 6, level: 2, judul: "Donut Dimakan 🍩", visualAwal: "🍩🍩🍩🍩", count1: 4, visualAksi: "🍩", count2: 1, ikonAksi: "😋➖", operasiBenar: "-", hasilBenar: 3, opsiHasil: [2, 3, 4] },
    { id: 7, level: 2, judul: "Es Krim Meleleh 🍦", visualAwal: "🍦🍦🍦🍦🍦", count1: 5, visualAksi: "🍦🍦", count2: 2, ikonAksi: "☀️➖", operasiBenar: "-", hasilBenar: 3, opsiHasil: [2, 3, 4] },
    { id: 8, level: 2, judul: "Pisang Dimakan 🍌", visualAwal: "🍌🍌🍌", count1: 3, visualAksi: "🍌🍌", count2: 2, ikonAksi: "🐒➖", operasiBenar: "-", hasilBenar: 1, opsiHasil: [1, 2, 3] },
    { id: 9, level: 2, judul: "Kue Dimakan 🧁", visualAwal: "🧁🧁🧁🧁", count1: 4, visualAksi: "🧁🧁", count2: 2, ikonAksi: "🍽️➖", operasiBenar: "-", hasilBenar: 2, opsiHasil: [1, 2, 3] },
    { id: 10, level: 2, judul: "Balon Meletus 🎈", visualAwal: "🎈🎈🎈🎈🎈", count1: 5, visualAksi: "🎈🎈🎈", count2: 3, ikonAksi: "💥➖", operasiBenar: "-", hasilBenar: 2, opsiHasil: [1, 2, 3] },

    // LEVEL 3: Penentuan Operasi (+ vs -)
    { id: 11, level: 3, judul: "Belanja Semangka 🍉", visualAwal: "🍉🍉🍉", count1: 3, visualAksi: "🍉🍉🍉", count2: 3, ikonAksi: "🛒", operasiBenar: "+", hasilBenar: 6, opsiHasil: [5, 6, 7] },
    { id: 12, level: 3, judul: "Ikan Dijual 🐟", visualAwal: "🐟🐟🐟🐟🐟", count1: 5, visualAksi: "🐟🐟", count2: 2, ikonAksi: "💵", operasiBenar: "-", hasilBenar: 3, opsiHasil: [2, 3, 4] },
    { id: 13, level: 3, judul: "Beli Telur 🥚", visualAwal: "🥚🥚🥚🥚", count1: 4, visualAksi: "🥚🥚🥚", count2: 3, ikonAksi: "🛍️", operasiBenar: "+", hasilBenar: 7, opsiHasil: [6, 7, 8] },
    { id: 14, level: 3, judul: "Cokelat Dimakan 🍫", visualAwal: "🍫🍫🍫🍫🍫🍫", count1: 6, visualAksi: "🍫🍫🍫", count2: 3, ikonAksi: "😋", operasiBenar: "-", hasilBenar: 3, opsiHasil: [2, 3, 4] },
    { id: 15, level: 3, judul: "Beli Wortel 🥕", visualAwal: "🥕🥕🥕🥕", count1: 4, visualAksi: "🥕🥕🥕🥕", count2: 4, ikonAksi: "🛒", operasiBenar: "+", hasilBenar: 8, opsiHasil: [7, 8, 9] },

    // LEVEL 4: Tantangan Belanja Komplit
    { id: 16, level: 4, judul: "Beli Pizza 🍕", visualAwal: "🍕🍕🍕🍕", count1: 4, visualAksi: "🍕🍕🍕🍕", count2: 4, ikonAksi: "🛍️", operasiBenar: "+", hasilBenar: 8, opsiHasil: [7, 8, 9] },
    { id: 17, level: 4, judul: "Bungkus Burger 🍔", visualAwal: "🍔🍔🍔🍔🍔🍔", count1: 6, visualAksi: "🍔🍔", count2: 2, ikonAksi: "🍽️", operasiBenar: "-", hasilBenar: 4, opsiHasil: [3, 4, 5] },
    { id: 18, level: 4, judul: "Panen Stroberi 🍓", visualAwal: "🍓🍓🍓🍓🍓", count1: 5, visualAksi: "🍓🍓🍓🍓", count2: 4, ikonAksi: "🧺", operasiBenar: "+", hasilBenar: 9, opsiHasil: [8, 9, 10] },
    { id: 19, level: 4, judul: "Ayam Dijual 🐔", visualAwal: "🐔🐔🐔🐔🐔🐔🐔", count1: 7, visualAksi: "🐔🐔🐔", count2: 3, ikonAksi: "💵", operasiBenar: "-", hasilBenar: 4, opsiHasil: [3, 4, 5] },
    { id: 20, level: 4, judul: "Beli Kotak Jus 🧃", visualAwal: "🧃🧃🧃🧃", count1: 4, visualAksi: "🧃🧃🧃🧃🧃", count2: 5, ikonAksi: "🛒", operasiBenar: "+", hasilBenar: 9, opsiHasil: [8, 9, 10] }
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

        // Interactive States
        this.selectedOp = null;
        this.selectedResult = null;

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

        // Operator Selection Buttons
        document.getElementById('btn-op-add').onclick = () => this.handleOperatorSelect('+');
        document.getElementById('btn-op-sub').onclick = () => this.handleOperatorSelect('-');

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
        
        // Reset States
        this.selectedOp = null;
        this.selectedResult = null;

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

        // Set Story & Panels
        document.getElementById('story-title').innerText = q.judul;
        document.getElementById('visual-start').innerText = q.visualAwal;
        document.getElementById('count-start').innerText = q.count1;
        document.getElementById('visual-action').innerText = q.visualAksi;
        document.getElementById('count-action').innerText = q.count2;
        document.getElementById('action-icon-display').innerText = q.ikonAksi;

        // Set Sentence Numbers
        document.getElementById('num-1').innerText = q.count1;
        document.getElementById('num-2').innerText = q.count2;

        // Reset Math Sentence Slots UI
        const slotOp = document.getElementById('slot-operator');
        const slotRes = document.getElementById('slot-result');
        slotOp.innerText = '?';
        slotRes.innerText = '?';
        slotOp.className = 'slot-operator active';
        slotRes.className = 'slot-result';

        // Show Symbol Selector, Hide Result Options
        document.getElementById('symbol-selector-area').classList.remove('hidden');
        document.getElementById('result-selector-area').classList.add('hidden');

        // Render Result Options Buttons
        const optionsGroup = document.getElementById('options-group');
        optionsGroup.innerHTML = '';
        q.opsiHasil.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-opt';
            btn.innerText = opt;
            btn.onclick = () => this.handleResultSelect(opt);
            optionsGroup.appendChild(btn);
        });
    }

    handleOperatorSelect(op) {
        this.selectedOp = op;
        const slotOp = document.getElementById('slot-operator');
        slotOp.innerText = op;
        slotOp.classList.remove('active');

        // Check if operator choice is correct
        const q = this.questions[this.currentIndex];
        if (op !== q.operasiBenar) {
            AnimationManager.playShake(document.getElementById('math-sentence-card') || slotOp);
            AnimationManager.showFeedbackModal(false, `OPERASI KURANG TEPAT!\nLihat lagi aksi cerita belanjanya! 😊`, () => {
                slotOp.innerText = '?';
                slotOp.classList.add('active');
            });
            return;
        }

        // Advance to Result Options
        const slotRes = document.getElementById('slot-result');
        slotRes.classList.add('active');
        document.getElementById('symbol-selector-area').classList.add('hidden');
        document.getElementById('result-selector-area').classList.remove('hidden');
    }

    handleResultSelect(resultNum) {
        this.stopTimer();
        this.selectedResult = resultNum;
        document.getElementById('slot-result').innerText = resultNum;

        const q = this.questions[this.currentIndex];
        const isCorrect = (resultNum === q.hasilBenar);

        if (isCorrect) {
            this.levelCorrect++;
            this.levelScore += 20;
            this.totalScore += 20;
            AnimationManager.showFeedbackModal(true, "HEBAT! JAWABAN BENAR! 🎉", () => this.nextQuestion());
        } else {
            this.levelWrong++;
            AnimationManager.showFeedbackModal(false, `KURANG TEPAT!\nHasil akhir belanjaan adalah ${q.hasilBenar}`, () => this.nextQuestion());
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
        if (this.levelCorrect >= 4) stars = "⭐⭐⭐";
        else if (this.levelCorrect >= 2) stars = "⭐⭐";
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