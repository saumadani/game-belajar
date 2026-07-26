/**
 * ==========================================================================
 * GAME EDUKASI: PETUALANGAN ANGKA 1–10 (Termasuk Modul Urutkan Angka)
 * Spesifikasi Khusus: Siswa Tuli Kelas 4 SD (Setara Kelas I)
 * ==========================================================================
 */

// 1. DATA SOAL
const bankSoalQuiz = [
    { target: 1, object: '🍎', namaBenda: 'Apel', baca: 'Satu' },
    { target: 2, object: '🐱', namaBenda: 'Kucing', baca: 'Dua' },
    { target: 3, object: '⚽', namaBenda: 'Bola', baca: 'Tiga' },
    { target: 4, object: '🚗', namaBenda: 'Mobil', baca: 'Empat' },
    { target: 5, object: '⭐', namaBenda: 'Bintang', baca: 'Lima' },
    { target: 6, object: '🎈', namaBenda: 'Balon', baca: 'Enam' },
    { target: 7, object: '🐟', namaBenda: 'Ikan', baca: 'Tujuh' },
    { target: 8, object: '✏️', namaBenda: 'Pensil', baca: 'Delapan' },
    { target: 9, object: '🌼', namaBenda: 'Bunga', baca: 'Sembilan' },
    { target: 10, object: '🍬', namaBenda: 'Permen', baca: 'Sepuluh' }
];

// Soal Khusus Modul Urutan Angka (Rumpang / Melengkapi)
const bankSoalSort = [
    { pattern: [1, 2, null, 4, 5, 6, 7, 8, 9, 10], missing: [3] },
    { pattern: [1, 2, 3, 4, null, 6, 7, null, 9, 10], missing: [5, 8] },
    { pattern: [null, 2, 3, 4, 5, 6, 7, 8, null, 10], missing: [1, 9] },
    { pattern: [1, null, 3, null, 5, null, 7, 8, 9, 10], missing: [2, 4, 6] },
    { pattern: [1, 2, 3, 4, 5, 6, 7, null, null, 10], missing: [8, 9] }
];

// 2. STATE GAME
let currentGameMode = 'count'; // 'count' atau 'sort'
let currentQuestionIndex = 0;
let score = 0;
let correctAnswersCount = 0;
let wrongAnswersCount = 0;
let shuffledQuestions = [];

// State Tambahan Khusus Modul Sort
let currentSortState = []; // Menyimpan kondisi urutan sementara
let selectedSlotIndex = null;

// 3. DOM ELEMENTS
const screens = {
    start: document.getElementById('screen-start'),
    instructions: document.getElementById('screen-instructions'),
    quiz: document.getElementById('screen-quiz'),
    sort: document.getElementById('screen-sort'),
    result: document.getElementById('screen-result')
};

const btnSelectCount = document.getElementById('btn-select-count');
const btnSelectSort = document.getElementById('btn-select-sort');
const btnPlay = document.getElementById('btn-play');
const btnRestart = document.getElementById('btn-restart');
const btnHome = document.getElementById('btn-home');
const btnNext = document.getElementById('btn-next');
const btnCheckSort = document.getElementById('btn-check-sort');

// Quiz Elements
const questionProgressEl = document.getElementById('question-progress');
const currentScoreEl = document.getElementById('current-score');
const progressBarFill = document.getElementById('progress-bar-fill');
const objectContainer = document.getElementById('object-container');
const numberReadingEl = document.getElementById('reading-text-indonesian');
const optionsGrid = document.getElementById('options-grid');

// Sort Elements
const sortProgressEl = document.getElementById('sort-progress');
const sortScoreEl = document.getElementById('sort-score');
const sortProgressFill = document.getElementById('sort-progress-fill');
const sortTargetContainer = document.getElementById('sort-target-container');
const sortBankContainer = document.getElementById('sort-bank-container');

// Feedback Elements
const feedbackOverlay = document.getElementById('feedback-overlay');
const feedbackCard = document.getElementById('feedback-card');
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackText = document.getElementById('feedback-text');

// 4. NAVIGASI DAN UTILS
function navigateToScreen(screenName) {
    Object.keys(screens).forEach(key => {
        screens[key].classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// 5. PENYIAPAN PETUNJUK SESUAI MODE
function showInstructions(mode) {
    currentGameMode = mode;
    const titleEl = document.getElementById('instruction-title');
    const listEl = document.getElementById('instruction-list');

    if (mode === 'count') {
        titleEl.textContent = "📜 Petunjuk: Tebak Jumlah";
        listEl.innerHTML = `
            <div class="instruction-item"><span class="step-num">1</span><p>Lihat dan hitung gambar di layar. 👁️</p></div>
            <div class="instruction-item"><span class="step-num">2</span><p>Pilih angka 1–10 yang sesuai. 🔢</p></div>
            <div class="instruction-item"><span class="step-num">3</span><p>Lihat tanda centang (✔️) atau silang (✖️).</p></div>
        `;
    } else {
        titleEl.textContent = "📜 Petunjuk: Urutkan Angka";
        listEl.innerHTML = `
            <div class="instruction-item"><span class="step-num">1</span><p>Lihat kotak angka yang kosong (❓). 👁️</p></div>
            <div class="instruction-item"><span class="step-num">2</span><p>Pilih angka di bawah untuk mengisi kotak kosong. 🔢</p></div>
            <div class="instruction-item"><span class="step-num">3</span><p>Tekan tombol "PERIKSA JAWABAN". ✔️</p></div>
        `;
    }
    navigateToScreen('instructions');
}

// 6. INISIALISASI GAME
function initGame() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswersCount = 0;
    wrongAnswersCount = 0;

    if (currentGameMode === 'count') {
        shuffledQuestions = shuffleArray(bankSoalQuiz);
        currentScoreEl.textContent = score;
        generateOptionButtons();
        loadQuizQuestion();
        navigateToScreen('quiz');
    } else {
        shuffledQuestions = shuffleArray(bankSoalSort);
        sortScoreEl.textContent = score;
        loadSortQuestion();
        navigateToScreen('sort');
    }
}

/* ==========================================================================
   LOGIKA MODE 1: TEBAK JUMLAH
   ========================================================================== */
function generateOptionButtons() {
    optionsGrid.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const button = document.createElement('button');
        button.className = 'btn-option';
        button.textContent = i;
        button.addEventListener('click', () => handleQuizAnswer(i));
        optionsGrid.appendChild(button);
    }
}

function loadQuizQuestion() {
    feedbackOverlay.classList.add('hidden');
    const currentData = shuffledQuestions[currentQuestionIndex];
    
    questionProgressEl.textContent = `${currentQuestionIndex + 1} / ${shuffledQuestions.length}`;
    progressBarFill.style.width = `${((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}%`;

    objectContainer.innerHTML = '';
    for (let i = 0; i < currentData.target; i++) {
        const span = document.createElement('span');
        span.className = 'object-item';
        span.textContent = currentData.object;
        objectContainer.appendChild(span);
    }

    numberReadingEl.textContent = `${currentData.baca} Buah ${currentData.namaBenda}`;

    const optionButtons = optionsGrid.querySelectorAll('.btn-option');
    optionButtons.forEach(btn => btn.disabled = false);
}

function handleQuizAnswer(selectedNumber) {
    const currentData = shuffledQuestions[currentQuestionIndex];
    const isCorrect = (selectedNumber === currentData.target);

    const optionButtons = optionsGrid.querySelectorAll('.btn-option');
    optionButtons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        score += 10;
        correctAnswersCount++;
        currentScoreEl.textContent = score;
        showFeedback(true, "Benar!");
    } else {
        wrongAnswersCount++;
        showFeedback(false, "Coba Lagi");
    }
}

/* ==========================================================================
   LOGIKA MODE 2: MODUL URUTKAN ANGKA (PEMBAHARUAN UDAH DISERTAKAN)
   ========================================================================== */
function loadSortQuestion() {
    feedbackOverlay.classList.add('hidden');
    const currentData = shuffledQuestions[currentQuestionIndex];

    sortProgressEl.textContent = `${currentQuestionIndex + 1} / ${shuffledQuestions.length}`;
    sortProgressFill.style.width = `${((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}%`;

    currentSortState = [...currentData.pattern];
    selectedSlotIndex = null;

    renderSortBoard();
}

function renderSortBoard() {
    const currentData = shuffledQuestions[currentQuestionIndex];
    sortTargetContainer.innerHTML = '';
    sortBankContainer.innerHTML = '';

    // 1. Render Target Slots (1-10)
    currentSortState.forEach((val, idx) => {
        const slot = document.createElement('div');
        slot.className = 'sort-slot';

        if (val !== null) {
            slot.textContent = val;
            // Jika slot ini adalah slot rumpang yang telah diisi siswa, beri tanda bisa diklik untuk mengosongkan kembali
            if (currentData.pattern[idx] === null) {
                slot.classList.add('empty');
                slot.addEventListener('click', () => {
                    currentSortState[idx] = null;
                    renderSortBoard();
                });
            }
        } else {
            slot.textContent = '?';
            slot.classList.add('empty');
            if (selectedSlotIndex === idx) slot.classList.add('selected');
            slot.addEventListener('click', () => {
                selectedSlotIndex = idx;
                renderSortBoard();
            });
        }
        sortTargetContainer.appendChild(slot);
    });

    // 2. Render Bank Angka yang Tersedia
    // Hitung angka mana saja dari `missing` yang belum digunakan
    let usedValues = currentSortState.filter((v, idx) => currentData.pattern[idx] === null && v !== null);
    let availableBank = currentData.missing.filter(v => !usedValues.includes(v));

    // Acak tampilan tombol di bank
    availableBank = shuffleArray(availableBank);

    availableBank.forEach(num => {
        const card = document.createElement('div');
        card.className = 'sort-card';
        card.textContent = num;
        card.addEventListener('click', () => fillSortSlot(num));
        sortBankContainer.appendChild(card);
    });
}

function fillSortSlot(num) {
    const currentData = shuffledQuestions[currentQuestionIndex];

    // Jika belum memilih slot secara spesifik, pilih slot rumpang pertama yang kosong
    if (selectedSlotIndex === null || currentSortState[selectedSlotIndex] !== null) {
        selectedSlotIndex = currentSortState.findIndex((v, idx) => currentData.pattern[idx] === null && v === null);
    }

    if (selectedSlotIndex !== -1 && selectedSlotIndex !== null) {
        currentSortState[selectedSlotIndex] = num;
        selectedSlotIndex = null;
        renderSortBoard();
    }
}

// Memeriksa Urutan Angka
btnCheckSort.addEventListener('click', () => {
    const isComplete = !currentSortState.includes(null);
    if (!isComplete) {
        showFeedback(false, "Isi Semua Kotak!");
        return;
    }

    // Cek apakah urutan 1 s/d 10 sudah tepat
    const isCorrect = currentSortState.every((val, idx) => val === (idx + 1));

    if (isCorrect) {
        score += 20;
        correctAnswersCount++;
        sortScoreEl.textContent = score;
        showFeedback(true, "Hebat! Urutan Benar!");
    } else {
        wrongAnswersCount++;
        showFeedback(false, "Urutan Belum Tepat!");
    }
});

/* ==========================================================================
   FEEDBACK & RESULT MANAGER
   ========================================================================== */
function showFeedback(isCorrect, message) {
    feedbackCard.className = 'feedback-card ' + (isCorrect ? 'correct' : 'wrong');
    feedbackIcon.textContent = isCorrect ? '✔️' : '✖️';
    feedbackText.textContent = message;
    feedbackOverlay.classList.remove('hidden');
}

function handleNextQuestion() {
    feedbackOverlay.classList.add('hidden');
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        if (currentGameMode === 'count') {
            loadQuizQuestion();
        } else {
            loadSortQuestion();
        }
    } else {
        showFinalResults();
    }
}

function showFinalResults() {
    const totalSoal = shuffledQuestions.length;
    const percentage = Math.round((correctAnswersCount / totalSoal) * 100);

    document.getElementById('final-score').textContent = score;
    document.getElementById('final-correct').textContent = correctAnswersCount;
    document.getElementById('final-wrong').textContent = wrongAnswersCount;
    document.getElementById('final-percentage').textContent = `${percentage}%`;

    const motivationIcon = document.getElementById('motivation-icon');
    const motivationText = document.getElementById('motivation-text');

    if (percentage === 100) {
        motivationIcon.textContent = '🏆';
        motivationText.textContent = 'Sempurna! Kamu Sangat Pintar!';
    } else if (percentage >= 70) {
        motivationIcon.textContent = '🌟';
        motivationText.textContent = 'Luar Biasa! Kamu Hebat Sekali!';
    } else {
        motivationIcon.textContent = '👍';
        motivationText.textContent = 'Bagus! Ayo Berlatih Lagi!';
    }

    navigateToScreen('result');
}

// 7. EVENT LISTENERS
btnSelectCount.addEventListener('click', () => showInstructions('count'));
btnSelectSort.addEventListener('click', () => showInstructions('sort'));
btnPlay.addEventListener('click', initGame);
btnNext.addEventListener('click', handleNextQuestion);
btnRestart.addEventListener('click', initGame);
btnHome.addEventListener('click', () => navigateToScreen('start'));