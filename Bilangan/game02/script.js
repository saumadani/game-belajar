/**
 * ==========================================================================
 * GAME EDUKASI: KERETA ANGKA 11–20
 * Spesifikasi Aksesibilitas: Siswa Tuli Kelas 4 SD (Setara Kelas I–III)
 * Fitur: HTML5 Drag & Drop API + Touch Event Fallback (Support Layar Sentuh HP)
 * ==========================================================================
 */

// 1. DATA GAME
const TARGET_NUMBERS = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

// 2. STATE GAME
let currentNumbers = [];
let attemptCount = 0;
let timerSeconds = 0;
let timerInterval = null;
let draggedElement = null;

// State Tambahan untuk Touch Support (HP/Tablet)
let activeTouchWagon = null;

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

const wagonsContainer = document.getElementById('wagons-container');
const attemptCountEl = document.getElementById('attempt-count');
const timerDisplayEl = document.getElementById('timer-display');

const feedbackOverlay = document.getElementById('feedback-overlay');
const feedbackCard = document.getElementById('feedback-card');
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackText = document.getElementById('feedback-text');
const feedbackSubtext = document.getElementById('feedback-subtext');

// 4. NAVIGASI HALAMAN
function navigateToScreen(screenName) {
    Object.keys(screens).forEach(key => {
        screens[key].classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

// 5. RANDOMISASI / PENGACAKAN URUTAN (Fisher-Yates)
function getShuffledNumbers() {
    let numbers = [...TARGET_NUMBERS];
    let isSame = true;

    // Pastikan angka benar-benar teracak (tidak sama persis dengan urutan benar)
    while (isSame) {
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        isSame = numbers.every((val, idx) => val === TARGET_NUMBERS[idx]);
    }
    return numbers;
}

// 6. TIMER MANAGER
function startTimer() {
    stopTimer();
    timerSeconds = 0;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timerSeconds++;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
}

function updateTimerDisplay() {
    const mins = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
    const secs = (timerSeconds % 60).toString().padStart(2, '0');
    timerDisplayEl.textContent = `${mins}:${secs}`;
}

// 7. INISIALISASI PERMAINAN
function initGame() {
    attemptCount = 0;
    attemptCountEl.textContent = attemptCount;
    currentNumbers = getShuffledNumbers();
    
    renderWagons();
    startTimer();
    navigateToScreen('game');
}

// 8. RENDER GERBONG KERETA KE DOM
function renderWagons() {
    wagonsContainer.innerHTML = '';

    currentNumbers.forEach((num) => {
        const wagon = document.createElement('div');
        wagon.className = 'wagon';
        wagon.setAttribute('draggable', 'true');
        wagon.dataset.value = num;

        wagon.innerHTML = `
            <span class="wagon-number">${num}</span>
            <div class="wagon-wheels">
                <span class="wagon-wheel"></span>
                <span class="wagon-wheel"></span>
            </div>
        `;

        // Event Listener Drag and Drop Desktop
        addDragAndDropListeners(wagon);

        // Event Listener Touch untuk HP/Tablet
        addTouchListeners(wagon);

        wagonsContainer.appendChild(wagon);
    });
}

// 9. LOGIKA HTML5 DRAG & DROP API (Desktop)
function addDragAndDropListeners(wagon) {
    wagon.addEventListener('dragstart', (e) => {
        draggedElement = wagon;
        wagon.classList.add('dragging');
        e.dataTransfer.setData('text/plain', wagon.dataset.value);
    });

    wagon.addEventListener('dragend', () => {
        draggedElement = null;
        wagon.classList.remove('dragging');
        document.querySelectorAll('.wagon').forEach(w => w.classList.remove('drag-over'));
    });

    wagon.addEventListener('dragover', (e) => {
        e.preventDefault(); // Diperlukan agar event 'drop' bisa berjalan
        if (wagon !== draggedElement) {
            wagon.classList.add('drag-over');
        }
    });

    wagon.addEventListener('dragleave', () => {
        wagon.classList.remove('drag-over');
    });

    wagon.addEventListener('drop', (e) => {
        e.preventDefault();
        wagon.classList.remove('drag-over');

        if (draggedElement && draggedElement !== wagon) {
            // Tukar posisi elemen di DOM
            const allWagons = Array.from(wagonsContainer.children);
            const draggedIndex = allWagons.indexOf(draggedElement);
            const targetIndex = allWagons.indexOf(wagon);

            if (draggedIndex < targetIndex) {
                wagonsContainer.insertBefore(draggedElement, wagon.nextSibling);
            } else {
                wagonsContainer.insertBefore(draggedElement, wagon);
            }

            updateNumbersFromDOM();
        }
    });
}

// 10. FALLBACK LAYAR SENTUH / TOUCH EVENTS (Ponsel Android / Tablet)
function addTouchListeners(wagon) {
    wagon.addEventListener('touchstart', (e) => {
        activeTouchWagon = wagon;
        wagon.classList.add('dragging');
    }, { passive: true });

    wagon.addEventListener('touchend', (e) => {
        if (!activeTouchWagon) return;
        
        const touch = e.changedTouches[0];
        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
        const targetWagon = targetElement ? targetElement.closest('.wagon') : null;

        if (targetWagon && targetWagon !== activeTouchWagon) {
            const allWagons = Array.from(wagonsContainer.children);
            const draggedIndex = allWagons.indexOf(activeTouchWagon);
            const targetIndex = allWagons.indexOf(targetWagon);

            if (draggedIndex < targetIndex) {
                wagonsContainer.insertBefore(activeTouchWagon, targetWagon.nextSibling);
            } else {
                wagonsContainer.insertBefore(activeTouchWagon, targetWagon);
            }

            updateNumbersFromDOM();
        }

        activeTouchWagon.classList.remove('dragging');
        activeTouchWagon = null;
    });
}

// Update Array Urutan Berdasarkan Posisi DOM Terkini
function updateNumbersFromDOM() {
    const wagonElements = wagonsContainer.querySelectorAll('.wagon');
    currentNumbers = Array.from(wagonElements).map(el => parseInt(el.dataset.value, 10));
}

// 11. VALIDASI JAWABAN & SKOR
btnCheck.addEventListener('click', () => {
    attemptCount++;
    attemptCountEl.textContent = attemptCount;

    // Cek apakah urutan angka sesuai dengan TARGET_NUMBERS (11 s/d 20)
    const isCorrect = currentNumbers.every((val, idx) => val === TARGET_NUMBERS[idx]);

    if (isCorrect) {
        stopTimer();
        showFeedback(true, "Hebat!", "Urutan angkamu sudah benar!");
    } else {
        showFeedback(false, "Coba Lagi", "Urutan belum tepat. Ayo perbaiki!");
    }
});

// Menampilkan Visual Feedback Dialog
function showFeedback(isCorrect, title, message) {
    feedbackCard.className = 'feedback-card ' + (isCorrect ? 'correct' : 'wrong');
    feedbackIcon.textContent = isCorrect ? '✔️' : '✖️';
    feedbackText.textContent = title;
    feedbackSubtext.textContent = message;

    if (isCorrect) {
        btnFeedbackAction.textContent = "LIHAT HASIL ➔";
        btnFeedbackAction.onclick = showFinalResults;
    } else {
        btnFeedbackAction.textContent = "PERBAIKI 🔄";
        btnFeedbackAction.onclick = () => {
            feedbackOverlay.classList.add('hidden');
        };
    }

    feedbackOverlay.classList.remove('hidden');
}

// 12. HALAMAN HASIL DAN EVALUASI
function showFinalResults() {
    feedbackOverlay.classList.add('hidden');

    // Kalkulasi Skor (Makin sedikit percobaan, skor makin tinggi)
    let baseScore = 100;
    let penalty = (attemptCount - 1) * 15;
    let finalScore = Math.max(40, baseScore - penalty);

    let percentage = Math.round((TARGET_NUMBERS.length / (TARGET_NUMBERS.length + (attemptCount - 1))) * 100);

    document.getElementById('final-score').textContent = finalScore;
    document.getElementById('final-attempts').textContent = `${attemptCount} Kali`;
    document.getElementById('final-time').textContent = timerDisplayEl.textContent;
    document.getElementById('final-percentage').textContent = `${percentage}%`;

    const motivationIcon = document.getElementById('motivation-icon');
    const motivationText = document.getElementById('motivation-text');

    if (attemptCount === 1) {
        motivationIcon.textContent = '🏆';
        motivationText.textContent = 'Sempurna! Kamu Sangat Pintar!';
    } else if (attemptCount <= 3) {
        motivationIcon.textContent = '🌟';
        motivationText.textContent = 'Hebat! Kerja Bagus!';
    } else {
        motivationIcon.textContent = '👍';
        motivationText.textContent = 'Bagus! Pantang Menyerah!';
    }

    navigateToScreen('result');
}

// 13. EVENT LISTENERS UTAMA
btnStart.addEventListener('click', () => navigateToScreen('instructions'));
btnPlay.addEventListener('click', initGame);
btnRestart.addEventListener('click', initGame);
btnHome.addEventListener('click', () => navigateToScreen('start'));