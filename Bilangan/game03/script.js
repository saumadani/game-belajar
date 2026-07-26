/**
 * ==========================================================================
 * GAME EDUKASI: PASANGAN ANGKA CERIA (21–100)
 * Spesifikasi Khusus: Siswa Tuli Kelas 4 SD (Setara Kelas I)
 * Alur: Memory Card (21<->21) -> Mengenali -> Mengurutkan -> Menulis (Salin)
 * ==========================================================================
 */

// 1. DATA ANGKA DAN RENTANG (21 - 100)
const ALLOWED_NUMBERS = [
    21, 24, 27, 30, 35, 41, 45, 52, 57, 63, 
    68, 72, 75, 81, 86, 90, 94, 99, 100
];

// 2. STATE GAME
let memoryCardsData = [];
let flippedCards = [];
let matchedPairsCount = 0;
let memoryAttempts = 0;

let recognizeTargetNumber = 0;

let sortNumbers = [];
let isSortCorrect = false;
let draggedSortCard = null;
let activeTouchSortCard = null;

let writeTargetNumber = 0;
let isWriteCorrect = false;

// 3. SELEKSI ELEMEN DOM
const screens = {
    start: document.getElementById('screen-start'),
    instructions: document.getElementById('screen-instructions'),
    memory: document.getElementById('screen-memory'),
    recognize: document.getElementById('screen-recognize'),
    sort: document.getElementById('screen-sort'),
    write: document.getElementById('screen-write'),
    result: document.getElementById('screen-result')
};

const btnStart = document.getElementById('btn-start');
const btnPlay = document.getElementById('btn-play');
const btnConfirmRecognize = document.getElementById('btn-confirm-recognize');
const btnSubmitSort = document.getElementById('btn-submit-sort');
const btnSubmitWrite = document.getElementById('btn-submit-write');
const btnFeedbackAction = document.getElementById('btn-feedback-action');
const btnRestart = document.getElementById('btn-restart');
const btnHome = document.getElementById('btn-home');

const memoryGrid = document.getElementById('memory-grid');
const memoryPairsProgress = document.getElementById('memory-pairs-progress');
const memoryAttemptsEl = document.getElementById('memory-attempts');

const recognizeNumberEl = document.getElementById('recognize-number');
const sortCardsContainer = document.getElementById('sort-cards-container');

const writeTargetNumberEl = document.getElementById('write-target-number');
const writeInput = document.getElementById('write-input');

const feedbackOverlay = document.getElementById('feedback-overlay');
const feedbackCard = document.getElementById('feedback-card');
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackText = document.getElementById('feedback-text');
const feedbackSubtext = document.getElementById('feedback-subtext');

// 4. UTILS & NAVIGASI
function navigateToScreen(screenName) {
    Object.keys(screens).forEach(key => {
        screens[key].classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

function getRandomElements(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// 5. INISIALISASI GAME
function initGame() {
    matchedPairsCount = 0;
    memoryAttempts = 0;
    isSortCorrect = false;
    isWriteCorrect = false;

    memoryPairsProgress.textContent = `0 / 8`;
    memoryAttemptsEl.textContent = `0`;

    // A. Generate 8 Pasangan Kartu (21 - 100) -> 16 Kartu
    const selectedNumbers = getRandomElements(ALLOWED_NUMBERS, 8);
    memoryCardsData = [];

    selectedNumbers.forEach((num, index) => {
        memoryCardsData.push({ id: index, val: num });
        memoryCardsData.push({ id: index, val: num });
    });

    memoryCardsData = shuffleArray(memoryCardsData);
    renderMemoryGrid();

    // B. Siapkan Latihan 1: Mengenali
    recognizeTargetNumber = getRandomElements(ALLOWED_NUMBERS, 1)[0];
    recognizeNumberEl.textContent = recognizeTargetNumber;

    // C. Siapkan Latihan 2: Mengurutkan (5 Angka Acak)
    sortNumbers = getRandomElements(ALLOWED_NUMBERS, 5);
    renderSortCards();

    // D. Siapkan Latihan 3: Menulis (Salin Angka)
    writeTargetNumber = getRandomElements(ALLOWED_NUMBERS, 1)[0];
    writeTargetNumberEl.textContent = writeTargetNumber;
    writeInput.value = '';

    navigateToScreen('memory');
}

/* ==========================================================================
   LOGIKA MEMORY CARD (21 <-> 21)
   ========================================================================== */
function renderMemoryGrid() {
    memoryGrid.innerHTML = '';
    memoryCardsData.forEach((cardData, idx) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = idx;

        card.innerHTML = `
            <div class="card-face card-front">❓</div>
            <div class="card-face card-back">
                <span>${cardData.val}</span>
            </div>
        `;

        card.addEventListener('click', () => handleCardClick(card, cardData));
        memoryGrid.appendChild(card);
    });
}

function handleCardClick(cardElement, cardData) {
    if (flippedCards.length >= 2 || cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) {
        return;
    }

    cardElement.classList.add('flipped');
    flippedCards.push({ element: cardElement, data: cardData });

    if (flippedCards.length === 2) {
        memoryAttempts++;
        memoryAttemptsEl.textContent = memoryAttempts;
        checkMemoryMatch();
    }
}

function checkMemoryMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = (card1.data.id === card2.data.id);

    if (isMatch) {
        card1.element.classList.add('matched');
        card2.element.classList.add('matched');
        flippedCards = [];
        matchedPairsCount++;
        memoryPairsProgress.textContent = `${matchedPairsCount} / 8`;

        if (matchedPairsCount === 8) {
            setTimeout(() => {
                showFeedback(true, "Hebat!", "Semua pasangan angka telah ditemukan!", () => {
                    feedbackOverlay.classList.add('hidden');
                    navigateToScreen('recognize');
                });
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.element.classList.remove('flipped');
            card2.element.classList.remove('flipped');
            flippedCards = [];
        }, 900);
    }
}

/* ==========================================================================
   LOGIKA LATIHAN 1: MENGENALI
   ========================================================================== */
btnConfirmRecognize.addEventListener('click', () => {
    navigateToScreen('sort');
});

/* ==========================================================================
   LOGIKA LATIHAN 2: MENGURUTKAN (DRAG & DROP)
   ========================================================================== */
function renderSortCards() {
    sortCardsContainer.innerHTML = '';
    sortNumbers.forEach((num) => {
        const card = document.createElement('div');
        card.className = 'sort-card';
        card.setAttribute('draggable', 'true');
        card.dataset.value = num;
        card.textContent = num;

        addSortDragAndDropListeners(card);
        addSortTouchListeners(card);

        sortCardsContainer.appendChild(card);
    });
}

function addSortDragAndDropListeners(card) {
    card.addEventListener('dragstart', (e) => {
        draggedSortCard = card;
        card.classList.add('dragging');
        e.dataTransfer.setData('text/plain', card.dataset.value);
    });

    card.addEventListener('dragend', () => {
        draggedSortCard = null;
        card.classList.remove('dragging');
        document.querySelectorAll('.sort-card').forEach(c => c.classList.remove('drag-over'));
    });

    card.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (card !== draggedSortCard) {
            card.classList.add('drag-over');
        }
    });

    card.addEventListener('dragleave', () => {
        card.classList.remove('drag-over');
    });

    card.addEventListener('drop', (e) => {
        e.preventDefault();
        card.classList.remove('drag-over');

        if (draggedSortCard && draggedSortCard !== card) {
            const allCards = Array.from(sortCardsContainer.children);
            const draggedIdx = allCards.indexOf(draggedSortCard);
            const targetIdx = allCards.indexOf(card);

            if (draggedIdx < targetIdx) {
                sortCardsContainer.insertBefore(draggedSortCard, card.nextSibling);
            } else {
                sortCardsContainer.insertBefore(draggedSortCard, card);
            }
            updateSortNumbersFromDOM();
        }
    });
}

function addSortTouchListeners(card) {
    card.addEventListener('touchstart', () => {
        activeTouchSortCard = card;
        card.classList.add('dragging');
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
        if (!activeTouchSortCard) return;

        const touch = e.changedTouches[0];
        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
        const targetCard = targetElement ? targetElement.closest('.sort-card') : null;

        if (targetCard && targetCard !== activeTouchSortCard) {
            const allCards = Array.from(sortCardsContainer.children);
            const draggedIdx = allCards.indexOf(activeTouchSortCard);
            const targetIdx = allCards.indexOf(targetCard);

            if (draggedIdx < targetIdx) {
                sortCardsContainer.insertBefore(activeTouchSortCard, targetCard.nextSibling);
            } else {
                sortCardsContainer.insertBefore(activeTouchSortCard, targetCard);
            }
            updateSortNumbersFromDOM();
        }

        activeTouchSortCard.classList.remove('dragging');
        activeTouchSortCard = null;
    });
}

function updateSortNumbersFromDOM() {
    const cardElements = sortCardsContainer.querySelectorAll('.sort-card');
    sortNumbers = Array.from(cardElements).map(el => parseInt(el.dataset.value, 10));
}

btnSubmitSort.addEventListener('click', () => {
    const sortedCorrectly = [...sortNumbers].sort((a, b) => a - b);
    isSortCorrect = sortNumbers.every((val, idx) => val === sortedCorrectly[idx]);

    if (isSortCorrect) {
        showFeedback(true, "Hebat!", "Urutan angkamu sudah benar!", () => {
            feedbackOverlay.classList.add('hidden');
            navigateToScreen('write');
        });
    } else {
        showFeedback(false, "Kurang Tepat", "Urutan belum dari terkecil ke terbesar.", () => {
            feedbackOverlay.classList.add('hidden');
            navigateToScreen('write');
        });
    }
});

/* ==========================================================================
   LOGIKA LATIHAN 3: MENULIS (SALIN ANGKA)
   ========================================================================== */
btnSubmitWrite.addEventListener('click', () => {
    const userValue = parseInt(writeInput.value.trim(), 10);

    if (userValue === writeTargetNumber) {
        isWriteCorrect = true;
        showFeedback(true, "Benar!", "Kamu menyalin angka dengan tepat!", showFinalResults);
    } else {
        isWriteCorrect = false;
        showFeedback(false, "Kurang Tepat", `Angka yang tepat adalah ${writeTargetNumber}`, showFinalResults);
    }
});

/* ==========================================================================
   FEEDBACK OVERLAY & HASIL EVALUASI
   ========================================================================== */
function showFeedback(isCorrect, title, message, actionCallback) {
    feedbackCard.className = 'feedback-card ' + (isCorrect ? 'correct' : 'wrong');
    feedbackIcon.textContent = isCorrect ? '✔️' : '✖️';
    feedbackText.textContent = title;
    feedbackSubtext.textContent = message;

    btnFeedbackAction.onclick = actionCallback;
    feedbackOverlay.classList.remove('hidden');
}

function showFinalResults() {
    feedbackOverlay.classList.add('hidden');

    let memoryScore = Math.max(20, 50 - (memoryAttempts - 8) * 3);
    let sortScore = isSortCorrect ? 25 : 0;
    let writeScore = isWriteCorrect ? 25 : 0;

    let totalScore = memoryScore + sortScore + writeScore;

    document.getElementById('final-score').textContent = totalScore;
    document.getElementById('final-memory-info').textContent = `8/8 (${memoryAttempts}x coba)`;
    document.getElementById('final-sort-info').textContent = isSortCorrect ? "✔️ Benar (+25)" : "✖️ Salah (+0)";
    document.getElementById('final-write-info').textContent = isWriteCorrect ? "✔️ Benar (+25)" : "✖️ Salah (+0)";

    const motivationIcon = document.getElementById('motivation-icon');
    const motivationText = document.getElementById('motivation-text');

    if (totalScore >= 85) {
        motivationIcon.textContent = '🏆';
        motivationText.textContent = 'Sempurna! Kamu Sangat Pintar!';
    } else if (totalScore >= 65) {
        motivationIcon.textContent = '🌟';
        motivationText.textContent = 'Luar Biasa! Kerja Bagus!';
    } else {
        motivationIcon.textContent = '👍';
        motivationText.textContent = 'Bagus! Teruskan Berlatih Ya!';
    }

    navigateToScreen('result');
}

// 6. EVENT LISTENERS UTAMA
btnStart.addEventListener('click', () => navigateToScreen('instructions'));
btnPlay.addEventListener('click', initGame);
btnRestart.addEventListener('click', initGame);
btnHome.addEventListener('click', () => navigateToScreen('start'));