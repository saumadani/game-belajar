/* ==========================================================================
   1. DATA STRUKTUR SOAL (BANK SOAL)
   ========================================================================== */
const QUESTION_BANK = [
    // LEVEL 1 (Pengurangan 1-5, Objek Dasar)
    { id: 1, level: 1, pertanyaan: "Apel", gambar: "🍎", jumlahAwal: 5, jumlahDibuang: 2, opsiJawaban: [2, 3, 4] },
    { id: 2, level: 1, pertanyaan: "Pisang", gambar: "🍌", jumlahAwal: 4, jumlahDibuang: 1, opsiJawaban: [2, 3, 4] },
    { id: 3, level: 1, pertanyaan: "Jeruk", gambar: "🍊", jumlahAwal: 3, jumlahDibuang: 2, opsiJawaban: [1, 2, 3] },
    { id: 4, level: 1, pertanyaan: "Semangka", gambar: "🍉", jumlahAwal: 5, jumlahDibuang: 4, opsiJawaban: [1, 2, 3] },
    { id: 5, level: 1, pertanyaan: "Stroberi", gambar: "🍓", jumlahAwal: 4, jumlahDibuang: 3, opsiJawaban: [1, 2, 3] },

    // LEVEL 2 (Pengurangan 1-8, Kendaraan)
    { id: 6, level: 2, pertanyaan: "Mobil", gambar: "🚗", jumlahAwal: 6, jumlahDibuang: 3, opsiJawaban: [2, 3, 4] },
    { id: 7, level: 2, pertanyaan: "Bus", gambar: "🚌", jumlahAwal: 8, jumlahDibuang: 4, opsiJawaban: [3, 4, 5] },
    { id: 8, level: 2, pertanyaan: "Polisi", gambar: "🚓", jumlahAwal: 7, jumlahDibuang: 2, opsiJawaban: [4, 5, 6] },
    { id: 9, level: 2, pertanyaan: "Taksi", gambar: "🚕", jumlahAwal: 6, jumlahDibuang: 1, opsiJawaban: [4, 5, 6] },
    { id: 10, level: 2, pertanyaan: "Traktor", gambar: "🚜", jumlahAwal: 8, jumlahDibuang: 5, opsiJawaban: [2, 3, 4] },

    // LEVEL 3 (Pengurangan 1-10, Hewan)
    { id: 11, level: 3, pertanyaan: "Kucing", gambar: "🐱", jumlahAwal: 10, jumlahDibuang: 5, opsiJawaban: [4, 5, 6] },
    { id: 12, level: 3, pertanyaan: "Anjing", gambar: "🐶", jumlahAwal: 9, jumlahDibuang: 3, opsiJawaban: [5, 6, 7] },
    { id: 13, level: 3, pertanyaan: "Kelinci", gambar: "🐰", jumlahAwal: 10, jumlahDibuang: 7, opsiJawaban: [2, 3, 4] },
    { id: 14, level: 3, pertanyaan: "Beruang", gambar: "🐻", jumlahAwal: 9, jumlahDibuang: 6, opsiJawaban: [2, 3, 4] },
    { id: 15, level: 3, pertanyaan: "Panda", gambar: "🐼", jumlahAwal: 8, jumlahDibuang: 6, opsiJawaban: [1, 2, 3] },

    // LEVEL 4 (Pengurangan 1-15, Mainan/Campuran)
    { id: 16, level: 4, pertanyaan: "Bintang", gambar: "⭐", jumlahAwal: 12, jumlahDibuang: 4, opsiJawaban: [7, 8, 9] },
    { id: 17, level: 4, pertanyaan: "Balon", gambar: "🎈", jumlahAwal: 15, jumlahDibuang: 5, opsiJawaban: [9, 10, 11] },
    { id: 18, level: 4, pertanyaan: "Hadiah", gambar: "🎁", jumlahAwal: 14, jumlahDibuang: 6, opsiJawaban: [7, 8, 9] },
    { id: 19, level: 4, pertanyaan: "Cat", gambar: "🎨", jumlahAwal: 13, jumlahDibuang: 7, opsiJawaban: [5, 6, 7] },
    { id: 20, level: 4, pertanyaan: "Bola", gambar: "⚽", jumlahAwal: 15, jumlahDibuang: 8, opsiJawaban: [6, 7, 8] }
];

/* ==========================================================================
   2. MODULE: UIManager (Menangani perpindahan layar & DOM)
   ========================================================================== */
class UIManager {
    static showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    }

    static updateHUD(level, index, total, score) {
        document.getElementById('hud-level').innerText = level;
        document.getElementById('hud-progress').innerText = `${index + 1}/${total}`;
        document.getElementById('hud-score').innerText = score;
    }

    static setOptionsState(isEnabled) {
        const optionsArea = document.getElementById('options-area');
        if (isEnabled) {
            optionsArea.classList.remove('disabled');
        } else {
            optionsArea.classList.add('disabled');
        }
    }
}

/* ==========================================================================
   3. MODULE: AnimationManager (Menangani feedback visual/tanpa suara)
   ========================================================================== */
class AnimationManager {
    static playWrongAnimation(element) {
        element.classList.remove('anim-shake');
        void element.offsetWidth; // Trigger reflow
        element.classList.add('anim-shake');
    }

    static showFeedbackModal(isCorrect, correctAnswer, callback) {
        const overlay = document.getElementById('feedback-overlay');
        const fbBox = document.getElementById('feedback-box');
        const icon = document.getElementById('feedback-icon');
        const text = document.getElementById('feedback-text');
        const btn = document.getElementById('btn-feedback-next');

        overlay.classList.add('active');
        fbBox.classList.add('anim-pop');

        if (isCorrect) {
            icon.innerText = "⭐";
            text.innerText = "HEBAT! BENAR!";
            text.style.color = "#2E7D32";
            btn.className = "btn btn-primary";
        } else {
            icon.innerText = "💡";
            text.innerText = `KURANG TEPAT!\nSisa benda adalah ${correctAnswer}`;
            text.style.color = "#C62828";
            btn.className = "btn btn-info";
        }

        btn.onclick = () => {
            overlay.classList.remove('active');
            fbBox.classList.remove('anim-pop');
            callback();
        };
    }
}

/* ==========================================================================
   4. MODULE: QuestionManager & Core Logic
   ========================================================================== */
class GameManager {
    constructor() {
        this.currentLevel = 1;
        this.unlockedLevels = 1;
        this.questions = [];
        this.currentIndex = 0;
        
        // Stats
        this.totalScore = 0;
        this.levelScore = 0;
        this.levelCorrect = 0;
        this.levelWrong = 0;

        // Interactive State
        this.removedCount = 0;
        this.targetRemove = 0;

        this.initEvents();
    }

    initEvents() {
        // Navigation Menus
        document.getElementById('btn-start').addEventListener('click', () => this.renderLevelSelect());
        document.getElementById('btn-instructions').addEventListener('click', () => UIManager.showScreen('screen-instructions'));
        document.getElementById('btn-about').addEventListener('click', () => UIManager.showScreen('screen-about'));
        
        document.querySelectorAll('.btn-home').forEach(btn => {
            btn.addEventListener('click', () => UIManager.showScreen('screen-menu'));
        });

        document.getElementById('btn-play-again').addEventListener('click', () => {
            this.totalScore = 0;
            this.unlockedLevels = 1;
            UIManager.showScreen('screen-menu');
        });
    }

    renderLevelSelect() {
        const container = document.getElementById('level-container');
        container.innerHTML = '';

        for (let i = 1; i <= 4; i++) {
            const btn = document.createElement('button');
            const isUnlocked = i <= this.unlockedLevels;
            btn.className = `btn-level ${isUnlocked ? '' : 'locked'}`;
            btn.innerHTML = `<span>Level ${i}</span><span>${isUnlocked ? '🔓' : '🔒'}</span>`;
            
            if (isUnlocked) {
                btn.onclick = () => this.startLevel(i);
            }
            container.appendChild(btn);
        }
        UIManager.showScreen('screen-level-select');
    }

    startLevel(level) {
        this.currentLevel = level;
        this.questions = QUESTION_BANK.filter(q => q.level === level);
        this.currentIndex = 0;
        
        this.levelScore = 0;
        this.levelCorrect = 0;
        this.levelWrong = 0;
        
        this.loadQuestion();
        UIManager.showScreen('screen-game');
    }

    loadQuestion() {
        const q = this.questions[this.currentIndex];
        this.targetRemove = q.jumlahDibuang;
        this.removedCount = 0;

        UIManager.updateHUD(this.currentLevel, this.currentIndex, this.questions.length, this.totalScore);
        
        // Update instruction
        document.getElementById('target-remove').innerText = q.jumlahDibuang;

        // Render Objects (Konkret)
        const playArea = document.getElementById('play-area');
        playArea.innerHTML = '';
        for (let i = 0; i < q.jumlahAwal; i++) {
            const obj = document.createElement('div');
            obj.className = 'object-item';
            obj.innerText = q.gambar;
            obj.onclick = () => this.handleObjectClick(obj);
            playArea.appendChild(obj);
        }

        // Render Options (Simbolik)
        const optionsArea = document.getElementById('options-area');
        optionsArea.innerHTML = '';
        q.opsiJawaban.forEach(num => {
            const btn = document.createElement('button');
            btn.className = 'btn-option';
            btn.innerText = num;
            btn.onclick = () => this.checkAnswer(num);
            optionsArea.appendChild(btn);
        });

        // Kunci tombol jawaban sampai anak membuang benda sesuai instruksi
        UIManager.setOptionsState(false);
    }

    handleObjectClick(element) {
        // Cegah membuang lebih dari instruksi
        if (this.removedCount < this.targetRemove && !element.classList.contains('removed')) {
            element.classList.add('removed');
            this.removedCount++;

            // Jika sudah pas membuang sesuai instruksi, buka kunci opsi jawaban
            if (this.removedCount === this.targetRemove) {
                UIManager.setOptionsState(true);
            }
        } else if (this.removedCount >= this.targetRemove && !element.classList.contains('removed')) {
            // Animasi feedback jika anak mencoba menghapus terlalu banyak
            AnimationManager.playWrongAnimation(document.querySelector('.instruction-banner'));
        }
    }

    checkAnswer(selectedNumber) {
        const q = this.questions[this.currentIndex];
        const correctAnswer = q.jumlahAwal - q.jumlahDibuang;
        const isCorrect = (selectedNumber === correctAnswer);

        if (isCorrect) {
            this.levelCorrect++;
            this.levelScore += 20; // 20 Poin per soal
            this.totalScore += 20;
        } else {
            this.levelWrong++;
        }

        // Tampilkan visual feedback
        AnimationManager.showFeedbackModal(isCorrect, correctAnswer, () => {
            this.nextQuestion();
        });
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
        document.getElementById('level-correct').innerText = this.levelCorrect;
        document.getElementById('level-wrong').innerText = this.levelWrong;
        document.getElementById('level-score').innerText = this.levelScore;

        let stars = "⭐";
        if (this.levelCorrect >= 4) stars = "⭐⭐⭐";
        else if (this.levelCorrect >= 2) stars = "⭐⭐";
        document.getElementById('level-stars').innerText = stars;

        const btnNext = document.getElementById('btn-next-action');
        
        if (this.currentLevel < 4) {
            btnNext.innerText = "LANJUT LEVEL ➔";
            btnNext.onclick = () => {
                if (this.unlockedLevels === this.currentLevel) {
                    this.unlockedLevels++; // Buka level berikutnya
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
        const totalBenar = (this.totalScore / 20); // max 400 point / 20 = 20 soal
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
    const game = new GameManager();
};