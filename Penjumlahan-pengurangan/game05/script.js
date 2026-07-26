/* ==========================================================================
   1. QUESTION BANK DATA (20 SOAL, 4 LEVEL GARIS BILANGAN)
   ========================================================================== */
const QUESTION_BANK = [
    // LEVEL 1: Hitung Maju (0 - 10)
    { id: 1, level: 1, tipe: "maju", titikAwal: 2, langkah: 3, titikAkhir: 5, opsiJawaban: [4, 5, 6], minMax: [0, 10] },
    { id: 2, level: 1, tipe: "maju", titikAwal: 4, langkah: 2, titikAkhir: 6, opsiJawaban: [5, 6, 7], minMax: [0, 10] },
    { id: 3, level: 1, tipe: "maju", titikAwal: 1, langkah: 5, titikAkhir: 6, opsiJawaban: [5, 6, 8], minMax: [0, 10] },
    { id: 4, level: 1, tipe: "maju", titikAwal: 5, langkah: 4, titikAkhir: 9, opsiJawaban: [8, 9, 10], minMax: [0, 10] },
    { id: 5, level: 1, tipe: "maju", titikAwal: 3, langkah: 4, titikAkhir: 7, opsiJawaban: [6, 7, 8], minMax: [0, 10] },

    // LEVEL 2: Hitung Mundur (0 - 10)
    { id: 6, level: 2, tipe: "mundur", titikAwal: 7, langkah: 3, titikAkhir: 4, opsiJawaban: [3, 4, 5], minMax: [0, 10] },
    { id: 7, level: 2, tipe: "mundur", titikAwal: 9, langkah: 4, titikAkhir: 5, opsiJawaban: [4, 5, 6], minMax: [0, 10] },
    { id: 8, level: 2, tipe: "mundur", titikAwal: 6, langkah: 2, titikAkhir: 4, opsiJawaban: [3, 4, 5], minMax: [0, 10] },
    { id: 9, level: 2, tipe: "mundur", titikAwal: 8, langkah: 5, titikAkhir: 3, opsiJawaban: [2, 3, 4], minMax: [0, 10] },
    { id: 10, level: 2, tipe: "mundur", titikAwal: 10, langkah: 6, titikAkhir: 4, opsiJawaban: [3, 4, 5], minMax: [0, 10] },

    // LEVEL 3: Hitung Maju & Mundur Campuran (0 - 15)
    { id: 11, level: 3, tipe: "maju", titikAwal: 6, langkah: 5, titikAkhir: 11, opsiJawaban: [10, 11, 12], minMax: [0, 15] },
    { id: 12, level: 3, tipe: "mundur", titikAwal: 13, langkah: 4, titikAkhir: 9, opsiJawaban: [8, 9, 10], minMax: [0, 15] },
    { id: 13, level: 3, tipe: "maju", titikAwal: 7, langkah: 6, titikAkhir: 13, opsiJawaban: [12, 13, 14], minMax: [0, 15] },
    { id: 14, level: 3, tipe: "mundur", titikAwal: 14, langkah: 5, titikAkhir: 9, opsiJawaban: [8, 9, 10], minMax: [0, 15] },
    { id: 15, level: 3, tipe: "maju", titikAwal: 8, langkah: 4, titikAkhir: 12, opsiJawaban: [11, 12, 13], minMax: [0, 15] },

    // LEVEL 4: Hitung Maju & Mundur Tingkat Lanjut (0 - 20)
    { id: 16, level: 4, tipe: "mundur", titikAwal: 18, langkah: 6, titikAkhir: 12, opsiJawaban: [11, 12, 13], minMax: [0, 20] },
    { id: 17, level: 4, tipe: "maju", titikAwal: 11, langkah: 7, titikAkhir: 18, opsiJawaban: [17, 18, 19], minMax: [0, 20] },
    { id: 18, level: 4, tipe: "mundur", titikAwal: 16, langkah: 8, titikAkhir: 8, opsiJawaban: [7, 8, 9], minMax: [0, 20] },
    { id: 19, level: 4, tipe: "maju", titikAwal: 9, langkah: 9, titikAkhir: 18, opsiJawaban: [17, 18, 19], minMax: [0, 20] },
    { id: 20, level: 4, tipe: "mundur", titikAwal: 20, langkah: 7, titikAkhir: 13, opsiJawaban: [12, 13, 14], minMax: [0, 20] }
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
        this.currentPos = 0;
        this.stepsExecuted = 0;

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

        // Jump Controls
        document.getElementById('btn-jump-forward').onclick = () => this.executeJump(1);
        document.getElementById('btn-jump-backward').onclick = () => this.executeJump(-1);

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
        
        // Reset Interactive State
        this.currentPos = q.titikAwal;
        this.stepsExecuted = 0;

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

        // Set Hint Banner Text
        const actionStr = q.tipe === 'maju' ? 'MAJU' : 'MUNDUR';
        document.getElementById('hint-text').innerText = `Mulai dari ${q.titikAwal}, lompat ${actionStr} ${q.langkah} langkah!`;

        // Render Number Line & Track
        this.renderNumberLine(q.minMax[0], q.minMax[1], q.titikAwal);

        // Set Action Buttons
        const btnFwd = document.getElementById('btn-jump-forward');
        const btnBwd = document.getElementById('btn-jump-backward');

        if (q.tipe === 'maju') {
            btnFwd.classList.remove('hidden');
            btnBwd.classList.add('hidden');
        } else {
            btnBwd.classList.remove('hidden');
            btnFwd.classList.add('hidden');
        }

        // Render Options Buttons
        const optionsGroup = document.getElementById('options-group');
        optionsGroup.innerHTML = '';
        q.opsiJawaban.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-opt';
            btn.innerText = opt;
            btn.onclick = () => this.checkAnswer(opt);
            optionsGroup.appendChild(btn);
        });
    }

    renderNumberLine(min, max, startPos) {
        const line = document.getElementById('number-line');
        const track = document.getElementById('jump-track');
        line.innerHTML = '';
        track.innerHTML = '';

        for (let i = min; i <= max; i++) {
            const node = document.createElement('div');
            node.className = `number-node ${i === startPos ? 'start-node current-node' : ''}`;
            node.id = `node-${i}`;
            node.innerText = i;
            line.appendChild(node);
        }

        // Create Avatar
        const avatar = document.createElement('div');
        avatar.className = 'avatar-character';
        avatar.id = 'avatar-rabbit';
        avatar.innerText = '🐇';
        track.appendChild(avatar);

        // Initial Position Update
        setTimeout(() => this.updateAvatarPosition(startPos), 50);
    }

    updateAvatarPosition(pos) {
        const node = document.getElementById(`node-${pos}`);
        const track = document.getElementById('jump-track');
        const avatar = document.getElementById('avatar-rabbit');

        if (node && track && avatar) {
            const nodeRect = node.getBoundingClientRect();
            const trackRect = track.getBoundingClientRect();
            const leftOffset = (nodeRect.left + nodeRect.width / 2) - trackRect.left;
            avatar.style.left = `${leftOffset}px`;

            // Highlight Node
            document.querySelectorAll('.number-node').forEach(n => n.classList.remove('current-node'));
            node.classList.add('current-node');
        }
    }

    executeJump(direction) {
        const q = this.questions[this.currentIndex];

        if (this.stepsExecuted < q.langkah) {
            const prevPos = this.currentPos;
            this.currentPos += direction;
            this.stepsExecuted++;

            // Draw Jump Arc
            this.drawJumpArc(prevPos, this.currentPos, direction < 0);

            // Update Avatar Location
            this.updateAvatarPosition(this.currentPos);
        } else {
            // Player attempts extra jumps
            const btn = direction > 0 ? document.getElementById('btn-jump-forward') : document.getElementById('btn-jump-backward');
            AnimationManager.playShake(btn);
        }
    }

    drawJumpArc(fromPos, toPos, isBackward) {
        const track = document.getElementById('jump-track');
        const fromNode = document.getElementById(`node-${fromPos}`);
        const toNode = document.getElementById(`node-${toPos}`);

        if (fromNode && toNode && track) {
            const fromRect = fromNode.getBoundingClientRect();
            const toRect = toNode.getBoundingClientRect();
            const trackRect = track.getBoundingClientRect();

            const left = Math.min(fromRect.left, toRect.left) - trackRect.left + fromRect.width / 2;
            const width = Math.abs(toRect.left - fromRect.left);

            const arc = document.createElement('div');
            arc.className = `jump-arc ${isBackward ? 'backward' : ''}`;
            arc.style.left = `${left}px`;
            arc.style.width = `${width}px`;
            track.appendChild(arc);
        }
    }

    checkAnswer(selectedOpt) {
        this.stopTimer();
        const q = this.questions[this.currentIndex];
        const isCorrect = (selectedOpt === q.titikAkhir);

        if (isCorrect) {
            this.levelCorrect++;
            this.levelScore += 20;
            this.totalScore += 20;
            AnimationManager.showFeedbackModal(true, "HEBAT! BENAR! 🎉", () => this.nextQuestion());
        } else {
            this.levelWrong++;
            AnimationManager.showFeedbackModal(false, `KURANG TEPAT!\nKelinci hinggap di angka ${q.titikAkhir}`, () => this.nextQuestion());
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