/* ==========================================================================
   1. QUESTION BANK DATA (20 SOAL, 4 LEVEL REGROUPING)
   ========================================================================== */
const QUESTION_BANK = [
    // LEVEL 1: Penjumlahan Bersusun Menyimpan (10 - 50)
    { id: 1, level: 1, tipe: "penjumlahan", puluhan1: 1, satuan1: 7, puluhan2: 1, satuan2: 5, butuhRegroup: true }, // 17 + 15 = 32
    { id: 2, level: 1, tipe: "penjumlahan", puluhan1: 2, satuan1: 8, puluhan2: 1, satuan2: 4, butuhRegroup: true }, // 28 + 14 = 42
    { id: 3, level: 1, tipe: "penjumlahan", puluhan1: 1, satuan1: 6, puluhan2: 1, satuan2: 6, butuhRegroup: true }, // 16 + 16 = 32
    { id: 4, level: 1, tipe: "penjumlahan", puluhan1: 2, satuan1: 5, puluhan2: 1, satuan2: 7, butuhRegroup: true }, // 25 + 17 = 42
    { id: 5, level: 1, tipe: "penjumlahan", puluhan1: 1, satuan1: 9, puluhan2: 2, satuan2: 3, butuhRegroup: true }, // 19 + 23 = 42

    // LEVEL 2: Pengurangan Bersusun Meminjam (10 - 50)
    { id: 6, level: 2, tipe: "pengurangan", puluhan1: 3, satuan1: 2, puluhan2: 1, satuan2: 5, butuhRegroup: true }, // 32 - 15 = 17
    { id: 7, level: 2, tipe: "pengurangan", puluhan1: 4, satuan1: 1, puluhan2: 1, satuan2: 4, butuhRegroup: true }, // 41 - 14 = 27
    { id: 8, level: 2, tipe: "pengurangan", puluhan1: 3, satuan1: 4, puluhan2: 1, satuan2: 8, butuhRegroup: true }, // 34 - 18 = 16
    { id: 9, level: 2, tipe: "pengurangan", puluhan1: 4, satuan1: 3, puluhan2: 2, satuan2: 6, butuhRegroup: true }, // 43 - 26 = 17
    { id: 10, level: 2, tipe: "pengurangan", puluhan1: 5, satuan1: 0, puluhan2: 2, satuan2: 3, butuhRegroup: true }, // 50 - 23 = 27

    // LEVEL 3: Penjumlahan Bersusun Menyimpan (50 - 99)
    { id: 11, level: 3, tipe: "penjumlahan", puluhan1: 4, satuan1: 6, puluhan2: 3, satuan2: 7, butuhRegroup: true }, // 46 + 37 = 83
    { id: 12, level: 3, tipe: "penjumlahan", puluhan1: 5, satuan1: 8, puluhan2: 2, satuan2: 5, butuhRegroup: true }, // 58 + 25 = 83
    { id: 13, level: 3, tipe: "penjumlahan", puluhan1: 3, satuan1: 9, puluhan2: 4, satuan2: 4, butuhRegroup: true }, // 39 + 44 = 83
    { id: 14, level: 3, tipe: "penjumlahan", puluhan1: 6, satuan1: 7, puluhan2: 2, satuan2: 5, butuhRegroup: true }, // 67 + 25 = 92
    { id: 15, level: 3, tipe: "penjumlahan", puluhan1: 5, satuan1: 4, puluhan2: 3, satuan2: 8, butuhRegroup: true }, // 54 + 38 = 92

    // LEVEL 4: Pengurangan & Campuran Bersusun (50 - 99)
    { id: 16, level: 4, tipe: "pengurangan", puluhan1: 7, satuan1: 2, puluhan2: 3, satuan2: 5, butuhRegroup: true }, // 72 - 35 = 37
    { id: 17, level: 4, tipe: "pengurangan", puluhan1: 8, satuan1: 3, puluhan2: 4, satuan2: 6, butuhRegroup: true }, // 83 - 46 = 37
    { id: 18, level: 4, tipe: "penjumlahan", puluhan1: 4, satuan1: 7, puluhan2: 3, satuan2: 8, butuhRegroup: true }, // 47 + 38 = 85
    { id: 19, level: 4, tipe: "pengurangan", puluhan1: 9, satuan1: 1, puluhan2: 5, satuan2: 4, butuhRegroup: true }, // 91 - 54 = 37
    { id: 20, level: 4, tipe: "penjumlahan", puluhan1: 6, satuan1: 8, puluhan2: 2, satuan2: 7, butuhRegroup: true }  // 68 + 27 = 95
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

        // Regroup & Step States
        this.hasRegrouped = false;
        this.currentStep = 'satuan'; // 'satuan' atau 'puluhan'
        this.inputSatuan = null;
        this.inputPuluhan = null;

        // Timer State
        this.timerInterval = null;
        this.timeLeft = 60;

        this.initEvents();
        this.renderPalette();
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

        // Regroup Action Buttons
        document.getElementById('btn-regroup').onclick = () => this.executeRegroup();
        document.getElementById('btn-borrow').onclick = () => this.executeBorrow();

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

    renderPalette() {
        const palette = document.getElementById('number-palette');
        palette.innerHTML = '';
        for (let i = 0; i <= 9; i++) {
            const btn = document.createElement('button');
            btn.className = 'btn-num';
            btn.innerText = i;
            btn.onclick = () => this.handleNumberInput(i);
            palette.appendChild(btn);
        }
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
        this.hasRegrouped = false;
        this.currentStep = 'satuan';
        this.inputSatuan = null;
        this.inputPuluhan = null;

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

        // Populate Numbers
        document.getElementById('digit-p1').innerText = q.puluhan1;
        document.getElementById('digit-s1').innerText = q.satuan1;
        document.getElementById('digit-p2').innerText = q.puluhan2;
        document.getElementById('digit-s2').innerText = q.satuan2;
        document.getElementById('operator-sign').innerText = q.tipe === 'penjumlahan' ? '+' : '-';

        // Clear Strikethrough & Regroup Indicators
        document.getElementById('digit-p1').classList.remove('strikethrough');
        document.getElementById('slot-regroup-p').innerText = '';
        document.getElementById('slot-regroup-p').className = 'slot-regroup';
        document.getElementById('slot-regroup-s').innerText = '';
        document.getElementById('slot-regroup-s').className = 'slot-regroup';

        // Reset Answer Slots
        const slotSatuan = document.getElementById('slot-satuan');
        const slotPuluhan = document.getElementById('slot-puluhan');
        slotSatuan.innerText = '?';
        slotPuluhan.innerText = '?';
        slotSatuan.className = 'slot-box slot-satuan active';
        slotPuluhan.className = 'slot-box slot-puluhan';

        // Set Action Buttons Visibilities
        const btnRegroup = document.getElementById('btn-regroup');
        const btnBorrow = document.getElementById('btn-borrow');

        if (q.tipe === 'penjumlahan' && (q.satuan1 + q.satuan2 >= 10)) {
            btnRegroup.classList.remove('hidden');
            btnBorrow.classList.add('hidden');
            document.getElementById('hint-text').innerText = '💡 Ketuk [ 🔄 TUKAR 10 ] untuk Menyimpan (+1)';
        } else if (q.tipe === 'pengurangan' && (q.satuan1 < q.satuan2)) {
            btnBorrow.classList.remove('hidden');
            btnRegroup.classList.add('hidden');
            document.getElementById('hint-text').innerText = '💡 Ketuk [ 🔓 PINJAM 1 ] dari Puluhan (+10)';
        } else {
            btnRegroup.classList.add('hidden');
            btnBorrow.classList.add('hidden');
            document.getElementById('hint-text').innerText = '🟨 Hitung Kolom SATUAN Dulu!';
        }
    }

    executeRegroup() {
        this.hasRegrouped = true;
        document.getElementById('btn-regroup').classList.add('hidden');

        // Visual Simpan (+1) di atas puluhan
        const slotRegP = document.getElementById('slot-regroup-p');
        slotRegP.innerText = '+1';
        slotRegP.className = 'slot-regroup active-simpan';

        document.getElementById('hint-text').innerText = '✨ Berhasil Menyimpan (+1)! Sekarang Hitung Satuan.';
    }

    executeBorrow() {
        this.hasRegrouped = true;
        document.getElementById('btn-borrow').classList.add('hidden');

        // Visual Pinjam (-1 di puluhan, +10 di satuan)
        document.getElementById('digit-p1').classList.add('strikethrough');
        
        const slotRegS = document.getElementById('slot-regroup-s');
        slotRegS.innerText = '+10';
        slotRegS.className = 'slot-regroup active-pinjam';

        document.getElementById('hint-text').innerText = '✨ Berhasil Meminjam (+10)! Sekarang Hitung Satuan.';
    }

    handleNumberInput(num) {
        const q = this.questions[this.currentIndex];

        // Mencegah mengisi jika belum melakukankan Regrouping wajib
        if (q.tipe === 'penjumlahan' && (q.satuan1 + q.satuan2 >= 10) && !this.hasRegrouped) {
            AnimationManager.playShake(document.getElementById('btn-regroup'));
            return;
        }
        if (q.tipe === 'pengurangan' && (q.satuan1 < q.satuan2) && !this.hasRegrouped) {
            AnimationManager.playShake(document.getElementById('btn-borrow'));
            return;
        }

        if (this.currentStep === 'satuan') {
            this.inputSatuan = num;
            document.getElementById('slot-satuan').innerText = num;

            // Transisi ke Puluhan
            this.currentStep = 'puluhan';
            document.getElementById('slot-satuan').classList.remove('active');
            document.getElementById('slot-puluhan').classList.add('active');
            document.getElementById('hint-text').innerText = '🟦 Sekarang Hitung Kolom PULUHAN!';

        } else if (this.currentStep === 'puluhan') {
            this.inputPuluhan = num;
            document.getElementById('slot-puluhan').innerText = num;

            // Selesai -> Validasi
            this.validateAnswer();
        }
    }

    validateAnswer() {
        this.stopTimer();
        const q = this.questions[this.currentIndex];
        
        let targetSatuan = 0;
        let targetPuluhan = 0;

        if (q.tipe === 'penjumlahan') {
            const sumSatuan = q.satuan1 + q.satuan2;
            targetSatuan = sumSatuan % 10;
            const simpan = Math.floor(sumSatuan / 10);
            targetPuluhan = q.puluhan1 + q.puluhan2 + simpan;
        } else {
            let sat1 = q.satuan1;
            let pul1 = q.puluhan1;
            if (sat1 < q.satuan2) {
                sat1 += 10;
                pul1 -= 1;
            }
            targetSatuan = sat1 - q.satuan2;
            targetPuluhan = pul1 - q.puluhan2;
        }

        const isCorrect = (this.inputSatuan === targetSatuan) && (this.inputPuluhan === targetPuluhan);

        if (isCorrect) {
            this.levelCorrect++;
            this.levelScore += 20;
            this.totalScore += 20;
            AnimationManager.showFeedbackModal(true, "HEBAT! BENAR! 🎉", () => this.nextQuestion());
        } else {
            this.levelWrong++;
            const kunciStr = `${targetPuluhan}${targetSatuan}`;
            AnimationManager.showFeedbackModal(false, `KURANG TEPAT!\nJawaban Benar: ${kunciStr}`, () => this.nextQuestion());
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