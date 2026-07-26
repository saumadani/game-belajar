/* ==========================================================================
   1. QUESTION BANK DATA (20 SOAL, 4 LEVEL BERSUSUN)
   ========================================================================== */
const QUESTION_BANK = [
    // LEVEL 1: Penjumlahan Bersusun Sederhana (Rentang 10-30)
    { id: 1, level: 1, tipe: "+", puluhan1: 1, satuan1: 2, puluhan2: 1, satuan2: 3 }, // 12 + 13 = 25
    { id: 2, level: 1, tipe: "+", puluhan1: 2, satuan1: 1, puluhan2: 1, satuan2: 4 }, // 21 + 14 = 35
    { id: 3, level: 1, tipe: "+", puluhan1: 1, satuan1: 5, puluhan2: 1, satuan2: 2 }, // 15 + 12 = 27
    { id: 4, level: 1, tipe: "+", puluhan1: 2, satuan1: 3, puluhan2: 1, satuan2: 1 }, // 23 + 11 = 34
    { id: 5, level: 1, tipe: "+", puluhan1: 1, satuan1: 4, puluhan2: 2, satuan2: 3 }, // 14 + 23 = 37

    // LEVEL 2: Pengurangan Bersusun Sederhana (Tanpa Meminjam)
    { id: 6, level: 2, tipe: "-", puluhan1: 2, satuan1: 5, puluhan2: 1, satuan2: 2 }, // 25 - 12 = 13
    { id: 7, level: 2, tipe: "-", puluhan1: 3, satuan1: 7, puluhan2: 1, satuan2: 4 }, // 37 - 14 = 23
    { id: 8, level: 2, tipe: "-", puluhan1: 2, satuan1: 9, puluhan2: 1, satuan2: 6 }, // 29 - 16 = 13
    { id: 9, level: 2, tipe: "-", puluhan1: 3, satuan1: 8, puluhan2: 2, satuan2: 5 }, // 38 - 25 = 13
    { id: 10, level: 2, tipe: "-", puluhan1: 4, satuan1: 6, puluhan2: 2, satuan2: 3 }, // 46 - 23 = 23

    // LEVEL 3: Penjumlahan Bersusun Tingkat Lanjut (Rentang 20-90)
    { id: 11, level: 3, tipe: "+", puluhan1: 4, satuan1: 2, puluhan2: 3, satuan2: 5 }, // 42 + 35 = 77
    { id: 12, level: 3, tipe: "+", puluhan1: 5, satuan1: 1, puluhan2: 2, satuan2: 7 }, // 51 + 27 = 78
    { id: 13, level: 3, tipe: "+", puluhan1: 3, satuan1: 4, puluhan2: 4, satuan2: 4 }, // 34 + 44 = 78
    { id: 14, level: 3, tipe: "+", puluhan1: 6, satuan1: 3, puluhan2: 2, satuan2: 5 }, // 63 + 25 = 88
    { id: 15, level: 3, tipe: "+", puluhan1: 5, satuan1: 2, puluhan2: 3, satuan2: 6 }, // 52 + 36 = 88

    // LEVEL 4: Pengurangan & Campuran Bersusun (Rentang 30-90)
    { id: 16, level: 4, tipe: "-", puluhan1: 7, satuan1: 8, puluhan2: 3, satuan2: 5 }, // 78 - 35 = 43
    { id: 17, level: 4, tipe: "-", puluhan1: 8, satuan1: 9, puluhan2: 4, satuan2: 6 }, // 89 - 46 = 43
    { id: 18, level: 4, tipe: "+", puluhan1: 4, satuan1: 5, puluhan2: 3, satuan2: 3 }, // 45 + 33 = 78
    { id: 19, level: 4, tipe: "-", puluhan1: 9, satuan1: 6, puluhan2: 5, satuan2: 2 }, // 96 - 52 = 44
    { id: 20, level: 4, tipe: "+", puluhan1: 6, satuan1: 1, puluhan2: 2, satuan2: 7 }  // 61 + 27 = 88
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
        this.questions = [];
        this.currentIndex = 0;

        // Scores
        this.totalScore = 0;
        this.levelScore = 0;
        this.levelCorrect = 0;
        this.levelWrong = 0;

        // Step State: 'satuan' atau 'puluhan'
        this.currentStep = 'satuan';
        this.inputSatuan = null;
        this.inputPuluhan = null;

        this.initEvents();
        this.renderPalette();
    }

    initEvents() {
        document.getElementById('btn-start').onclick = () => this.renderLevelSelect();
        document.getElementById('btn-instructions').onclick = () => UIManager.showScreen('screen-instructions');
        document.getElementById('btn-about').onclick = () => UIManager.showScreen('screen-about');

        document.querySelectorAll('.btn-home').forEach(btn => {
            btn.onclick = () => UIManager.showScreen('screen-menu');
        });

        document.getElementById('btn-restart').onclick = () => {
            this.totalScore = 0;
            this.unlockedLevels = 1;
            UIManager.showScreen('screen-menu');
        };
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
        
        // Reset Steps
        this.currentStep = 'satuan';
        this.inputSatuan = null;
        this.inputPuluhan = null;

        UIManager.updateHUD(this.currentLevel, this.currentIndex, this.questions.length, this.totalScore);

        // Populate Board Numbers
        document.getElementById('digit-p1').innerText = q.puluhan1;
        document.getElementById('digit-s1').innerText = q.satuan1;
        document.getElementById('digit-p2').innerText = q.puluhan2;
        document.getElementById('digit-s2').innerText = q.satuan2;
        document.getElementById('operator-sign').innerText = q.tipe;

        // Reset Slots UI
        const slotSatuan = document.getElementById('slot-satuan');
        const slotPuluhan = document.getElementById('slot-puluhan');
        
        slotSatuan.innerText = '?';
        slotPuluhan.innerText = '?';
        
        slotSatuan.className = 'slot-box slot-satuan active';
        slotPuluhan.className = 'slot-box slot-puluhan';

        // Update Hint Banner
        document.getElementById('hint-text').innerText = '🟨 Hitung Kolom SATUAN Dulu!';
    }

    handleNumberInput(num) {
        const q = this.questions[this.currentIndex];

        if (this.currentStep === 'satuan') {
            this.inputSatuan = num;
            document.getElementById('slot-satuan').innerText = num;

            // Pindah ke step Puluhan
            this.currentStep = 'puluhan';
            document.getElementById('slot-satuan').classList.remove('active');
            document.getElementById('slot-puluhan').classList.add('active');
            document.getElementById('hint-text').innerText = '🟦 Sekarang Hitung Kolom PULUHAN!';

        } else if (this.currentStep === 'puluhan') {
            this.inputPuluhan = num;
            document.getElementById('slot-puluhan').innerText = num;

            // Keduanya sudah terisi -> Validasi Jawaban
            this.validateAnswer();
        }
    }

    validateAnswer() {
        const q = this.questions[this.currentIndex];
        
        // Kalkulasi Kunci Jawaban
        let targetSatuan = 0;
        let targetPuluhan = 0;

        if (q.tipe === '+') {
            targetSatuan = q.satuan1 + q.satuan2;
            targetPuluhan = q.puluhan1 + q.puluhan2;
        } else {
            targetSatuan = q.satuan1 - q.satuan2;
            targetPuluhan = q.puluhan1 - q.puluhan2;
        }

        const isSatuanCorrect = (this.inputSatuan === targetSatuan);
        const isPuluhanCorrect = (this.inputPuluhan === targetPuluhan);
        const isAllCorrect = isSatuanCorrect && isPuluhanCorrect;

        if (isAllCorrect) {
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

// Initialize Application
window.onload = () => {
    window.gameApp = new GameManager();
};