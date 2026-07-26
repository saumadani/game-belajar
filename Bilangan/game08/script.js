/**
 * ==========================================================================
 * GAME EDUKASI: BALAPAN URUTAN ANGKA (NAIK & TURUN)
 * Spesifikasi Khusus: Siswa Tuli Kelas 4 SD (Setara Kelas I)
 * Aksesibilitas: Sortable Drag & Drop (HTML5 API + Touch Event Fallback)
 * ==========================================================================
 */

// 1. KONFIGURASI GAME (MUDAH DIMODIFIKASI GURU)
const GAME_CONFIG = {
    TOTAL_QUESTIONS: 10,
    CARDS_PER_QUESTION: 5, // Jumlah kartu angka per soal (5 atau 6)
    MIN_NUMBER: 10,        // Rentang minimal angka
    MAX_NUMBER: 100        // Rentang maksimal angka (Bisa diubah ke 20, 100, 1000)
};

// 2. STATE PERMAINAN
let activeQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let correctFirstTryCount = 0;
let wrongAttemptsTotal = 0;
let isCurrentQuestionTriedWrong = false;

// State Sortable Drag & Drop
let draggedCarCard = null;
let activeTouchCard = null;

// 3. SELEKSI ELEMEN DOM
const screens = {
    start: document.getElementById('screen-start'),
    instructions: document.getElementById('screen-instructions'),
    game: document.getElementById('screen-game'),
    result: document.getElementById('screen-result')
};

const btnStart = document.getElementById('btn-start');
const btnPlay = document.getElementById('btn-play');
const btnCheck = document.getElementById('btn-check');
const btnFeedbackAction = document.getElementById('btn-feedback-action');
const btnRestart = document.getElementById('btn-restart');
const btnHome = document.getElementById('btn-home');

const questionProgressText = document.getElementById('question-progress-text');
const currentScoreEl = document.getElementById('current-score');
const progressBarFill = document.getElementById('progress-bar-fill');

const directionBanner = document.getElementById('direction-banner');
const directionIcon = document.getElementById('direction-icon');
const directionTypeText = document.getElementById('direction-type-text');
const directionSubtext = document.getElementById('direction-subtext');

const sortableTrack = document.getElementById('sortable-track');

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

// Generasi Array Angka Acak Unik
function generateUniqueNumbers(count, min, max) {
    const set = new Set();
    while (set.size < count) {
        set.add(getRandomInt(min, max));
    }
    return Array.from(set);
}

// 5. GENERASI 10 SOAL RONDE (BERGANTIAN / ACAK NAIK & TURUN)
function prepareQuestions() {
    const questions = [];
    for (let i = 0; i < GAME_CONFIG.TOTAL_QUESTIONS; i++) {
        // Mode Bergantian: Genap = Naik (Ascending), Ganjil = Turun (Descending)
        const mode = (i % 2 === 0) ? 'asc' : 'desc';
        const numbers = generateUniqueNumbers(GAME_CONFIG.CARDS_PER_QUESTION, GAME_CONFIG.MIN_NUMBER, GAME_CONFIG.MAX_NUMBER);

        // Hitung Kunci Jawaban Benar
        const sortedTarget = [...numbers].sort((a, b) => (mode === 'asc') ? a - b : b - a);

        // Pastikan posisi awal kartu teracak (tidak sengaja langsung benar)
        let initialShuffle = [...numbers];
        while (JSON.stringify(initialShuffle) === JSON.stringify(sortedTarget)) {
            initialShuffle.sort(() => 0.5 - Math.random());
        }

        questions.push({
            mode: mode,
            initialNumbers: initialShuffle,
            targetOrder: sortedTarget
        });
    }
    return questions;
}

// 6. INISIALISASI GAME
function initGame() {
    currentQuestionIndex = 0;
    score = 0;
    correctFirstTryCount = 0;
    wrongAttemptsTotal = 0;

    activeQuestions = prepareQuestions();
    currentScoreEl.textContent = score;

    loadQuestion();
    navigateToScreen('game');
}

// 7. MEMUAT SOAL RONDE
function loadQuestion() {
    isCurrentQuestionTriedWrong = false;
    const q = activeQuestions[currentQuestionIndex];

    // Update Progress & Score UI
    questionProgressText.textContent = `${currentQuestionIndex + 1} / ${GAME_CONFIG.TOTAL_QUESTIONS}`;
    progressBarFill.style.width = `${((currentQuestionIndex + 1) / GAME_CONFIG.TOTAL_QUESTIONS) * 100}%`;

    // Render Banner Instruksi Naik / Turun
    if (q.mode === 'asc') {
        directionBanner.className = "direction-banner mode-ascending";
        directionIcon.textContent = "📈";
        directionTypeText.textContent = "Soal Naik";
        directionSubtext.textContent = "Susun dari yang TERKECIL ke TERBESAR";
    } else {
        directionBanner.className = "direction-banner mode-descending";
        directionIcon.textContent = "📉";
        directionTypeText.textContent = "Soal Turun";
        directionSubtext.textContent = "Susun dari yang TERBESAR ke TERKECIL";
    }

    // Render Mobil Balap Sortable
    renderCarCards(q.initialNumbers);
}

// Render Mobil Angka
function renderCarCards(numbersArray) {
    sortableTrack.innerHTML = '';

    numbersArray.forEach((num) => {
        const car = document.createElement('div');
        car.className = 'car-card';
        car.setAttribute('draggable', 'true');
        car.dataset.value = num;

        car.innerHTML = `
            <span class="car-number">${num}</span>
            <div class="car-wheels">
                <span class="car-wheel"></span>
                <span class="car-wheel"></span>
            </div>
        `;

        // Attach Event Listeners Drag & Drop + Touch
        addDragAndDropListeners(car);
        addTouchListeners(car);

        sortableTrack.appendChild(car);
    });
}

// 8. MEKANISME SORTABLE DRAG & DROP (HTML5 API Desktop)
function addDragAndDropListeners(car) {
    car.addEventListener('dragstart', (e) => {
        draggedCarCard = car;
        car.classList.add('dragging');
        e.dataTransfer.setData('text/plain', car.dataset.value);
    });

    car.addEventListener('dragend', () => {
        draggedCarCard = null;
        car.classList.remove('dragging');
        document.querySelectorAll('.car-card').forEach(c => c.classList.remove('drag-over'));
    });

    car.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (car !== draggedCarCard) {
            car.classList.add('drag-over');
        }
    });

    car.addEventListener('dragleave', () => {
        card.classList.remove('drag-over');
    });

    car.addEventListener('drop', (e) => {
        e.preventDefault();
        car.classList.remove('drag-over');

        if (draggedCarCard && draggedCarCard !== car) {
            swapCarElements(draggedCarCard, car);
        }
    });
}

// Menukar Posisi Urutan 2 Elemen Mobil
function swapCarElements(dragged, target) {
    const allCars = Array.from(sortableTrack.children);
    const draggedIdx = allCars.indexOf(dragged);
    const targetIdx = allCars.indexOf(target);

    if (draggedIdx < targetIdx) {
        sortableTrack.insertBefore(dragged, target.nextSibling);
    } else {
        sortableTrack.insertBefore(dragged, target);
    }
}

// 9. FALLBACK TOUCH EVENTS (HP / Tablet Screen)
function addTouchListeners(car) {
    car.addEventListener('touchstart', () => {
        activeTouchCard = car;
        car.classList.add('dragging');
    }, { passive: true });

    car.addEventListener('touchend', (e) => {
        if (!activeTouchCard) return;

        const touch = e.changedTouches[0];
        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
        const targetCar = targetElement ? targetElement.closest('.car-card') : null;

        if (targetCar && targetCar !== activeTouchCard) {
            swapCarElements(activeTouchCard, targetCar);
        }

        activeTouchCard.classList.remove('dragging');
        activeTouchCard = null;
    });
}

// 10. VALIDASI JAWABAN & ANIMASI KENDARAAN
btnCheck.addEventListener('click', () => {
    const q = activeQuestions[currentQuestionIndex];
    const carElements = Array.from(sortableTrack.querySelectorAll('.car-card'));
    const currentNumbersOrder = carElements.map(el => parseInt(el.dataset.value, 10));

    // Validasi Per Elemen
    let isAllCorrect = true;
    carElements.forEach((carEl, idx) => {
        const val = parseInt(carEl.dataset.value, 10);
        const expectedVal = q.targetOrder[idx];

        carEl.classList.remove('eval-correct', 'eval-wrong');

        if (val === expectedVal) {
            carEl.classList.add('eval-correct');
        } else {
            carEl.classList.add('eval-wrong');
            isAllCorrect = false;
        }
    });

    if (isAllCorrect) {
        // --- JAWABAN BENAR ---
        if (!isCurrentQuestionTriedWrong) {
            score += 10;
            correctFirstTryCount++;
            currentScoreEl.textContent = score;
        }

        // Animasi Kendaraan Melaju ke Garis Finis
        carElements.forEach(carEl => carEl.classList.add('drive-finish'));

        setTimeout(() => {
            showFeedback(true, "Hebat!", "Urutannya benar.", () => {
                feedbackOverlay.classList.add('hidden');
                currentQuestionIndex++;
                if (currentQuestionIndex < GAME_CONFIG.TOTAL_QUESTIONS) {
                    loadQuestion();
                } else {
                    showFinalResults();
                }
            });
        }, 1000);

    } else {
        // --- JAWABAN SALAH ---
        if (!isCurrentQuestionTriedWrong) {
            wrongAttemptsTotal++;
            isCurrentQuestionTriedWrong = true;
        }

        showFeedback(false, "Coba Lagi", "Periksa kembali urutan angkanya.", () => {
            feedbackOverlay.classList.add('hidden');
        }, "PERBAIKI 🔄");
    }
});

// 11. FEEDBACK OVERLAY & HALAMAN HASIL
function showFeedback(isCorrect, title, message, actionCallback, btnLabel = "SOAL BERIKUTNYA ➔") {
    feedbackCard.className = 'feedback-card ' + (isCorrect ? 'correct' : 'wrong');
    feedbackIcon.textContent = isCorrect ? '✔️' : '✖️';
    feedbackText.textContent = title;
    feedbackSubtext.textContent = message;

    btnFeedbackAction.textContent = btnLabel;
    btnFeedbackAction.onclick = actionCallback;
    feedbackOverlay.classList.remove('hidden');
}

function showFinalResults() {
    feedbackOverlay.classList.add('hidden');
    const percentage = Math.round((correctFirstTryCount / GAME_CONFIG.TOTAL_QUESTIONS) * 100);

    document.getElementById('final-score').textContent = score;
    document.getElementById('final-correct').textContent = `${correctFirstTryCount} / ${GAME_CONFIG.TOTAL_QUESTIONS}`;
    document.getElementById('final-wrong').textContent = `${wrongAttemptsTotal} Kali`;
    document.getElementById('final-percentage').textContent = `${percentage}%`;

    const motivationIcon = document.getElementById('motivation-icon');
    const motivationText = document.getElementById('motivation-text');

    if (percentage === 100) {
        motivationIcon.textContent = '🏆';
        motivationText.textContent = 'Hebat! Kamu Juara Balapan!';
    } else if (percentage >= 70) {
        motivationIcon.textContent = '🌟';
        motivationText.textContent = 'Bagus! Kerja Sangat Baik!';
    } else {
        motivationIcon.textContent = '💪';
        motivationText.textContent = 'Ayo Coba Lagi!';
    }

    navigateToScreen('result');
}

// 12. EVENT LISTENERS UTAMA
btnStart.addEventListener('click', () => navigateToScreen('instructions'));
btnPlay.addEventListener('click', initGame);
btnRestart.addEventListener('click', initGame);
btnHome.addEventListener('click', () => navigateToScreen('start'));