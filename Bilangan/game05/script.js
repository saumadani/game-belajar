/**
 * ==========================================================================
 * GAME EDUKASI: EKSPEDISI ANGKA BESAR (501–1000)
 * Spesifikasi Khusus: Siswa Tuli Kelas 4 SD (Setara Kelas I)
 * Alur: 4 Pos Level (Mengenali, Membaca, Menulis/Salin, Mengurutkan Drag&Drop)
 * ==========================================================================
 */

// 1. DATA MASTER BANK ANGKA (501–1000)
const MASTER_NUMBERS = [
    512, 538, 576, 604, 632, 653, 689, 701, 728, 750,
    784, 815, 845, 870, 914, 935, 962, 978, 999, 1000
];

// 2. STATE GAME
let currentLevel = 1; // 1 s/d 4
let score = 0;
let correctFirstTryCount = 0;
let wrongAttemptsTotal = 0;
let isCurrentLevelTriedWrong = false;

// State Data Per Level
let levelData = {};
let draggedSortCard = null;
let activeTouchSortCard = null;

// 3. SELEKSI ELEMEN DOM
const screens = {
    start: document.getElementById('screen-start'),
    instructions: document.getElementById('screen-instructions'),
    game: document.getElementById('screen-game'),
    result: document.getElementById('screen-result')
};

const btnStart = document.getElementById('btn-start');
const btnPlay = document.getElementById('btn-play');
const btnSubmitAction = document.getElementById('btn-submit-action');
const btnFeedbackAction = document.getElementById('btn-feedback-action');
const btnRestart = document.getElementById('btn-restart');
const btnHome = document.getElementById('btn-home');

const posProgressText = document.getElementById('pos-progress-text');
const currentScoreEl = document.getElementById('current-score');
const progressBarFill = document.getElementById('progress-bar-fill');

const levelTitleBadge = document.getElementById('level-title-badge');
const levelInstruction = document.getElementById('level-instruction');
const targetDisplay = document.getElementById('target-display');
const targetNumberText = document.getElementById('target-number-text');

const level3InputBox = document.getElementById('level3-input-box');
const writeInput = document.getElementById('write-input');

const level4SortContainer = document.getElementById('level4-sort-container');
const optionsGrid = document.getElementById('options-grid');
const actionContainer = document.getElementById('action-container');

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

// 5. INISIALISASI PERMAINAN
function initGame() {
    currentLevel = 1;
    score = 0;
    correctFirstTryCount = 0;
    wrongAttemptsTotal = 0;

    currentScoreEl.textContent = score;
    prepareAllLevelsData();
    loadLevel(currentLevel);
    navigateToScreen('game');
}

// Generasi Data Soal Acak untuk 4 Pos Level
function prepareAllLevelsData() {
    const chosen = getRandomElements(MASTER_NUMBERS, 8);

    levelData = {
        // Level 1: Mengenali Bilangan (Pilihan Ganda)
        1: {
            target: 728,
            options: ["782", "827", "728", "872"]
        },
        // Level 2: Membaca Bilangan (Pilihan Ganda)
        2: {
            target: 914,
            options: ["941", "914", "491", "419"]
        },
        // Level 3: Menulis / Menyalin Bilangan (Input Text)
        3: {
            target: 653
        },
        // Level 4: Mengurutkan Bilangan (Drag & Drop 5 Kartu)
        4: {
            cards: [845, 632, 978, 701, 589]
        }
    };
}

// 6. LOAD LEVEL GAME
function loadLevel(levelNum) {
    isCurrentLevelTriedWrong = false;
    updateMapTracker(levelNum);

    posProgressText.textContent = `${levelNum} / 4`;
    progressBarFill.style.width = `${(levelNum / 4) * 100}%`;

    // Sembunyikan semua wadah input khusus secara default
    targetDisplay.classList.remove('hidden');
    optionsGrid.classList.remove('hidden');
    level3InputBox.classList.add('hidden');
    level4SortContainer.classList.add('hidden');
    actionContainer.classList.add('hidden');

    if (levelNum === 1) {
        levelTitleBadge.textContent = "Pos 1 – Mengenali Bilangan";
        levelInstruction.textContent = "Pilih angka yang sama!";
        targetNumberText.textContent = levelData[1].target;
        renderOptions(levelData[1].options, levelData[1].target);

    } else if (levelNum === 2) {
        levelTitleBadge.textContent = "Pos 2 – Membaca Bilangan";
        levelInstruction.textContent = "Temukan angka yang sama!";
        targetNumberText.textContent = levelData[2].target;
        renderOptions(levelData[2].options, levelData[2].target);

    } else if (levelNum === 3) {
        levelTitleBadge.textContent = "Pos 3 – Menulis Bilangan";
        levelInstruction.textContent = "Ketik kembali angka yang sama!";
        targetNumberText.textContent = levelData[3].target;
        
        optionsGrid.classList.add('hidden');
        level3InputBox.classList.remove('hidden');
        actionContainer.classList.remove('hidden');
        writeInput.value = '';

    } else if (levelNum === 4) {
        levelTitleBadge.textContent = "Pos 4 – Mengurutkan Bilangan";
        levelInstruction.textContent = "Susun dari yang TERKECIL ke TERBESAR!";
        targetDisplay.classList.add('hidden');
        optionsGrid.classList.add('hidden');
        
        level4SortContainer.classList.remove('hidden');
        actionContainer.classList.remove('hidden');
        renderSortCards(levelData[4].cards);
    }
}

// Update Tracker Peta Visual (Pos 1 - 4)
function updateMapTracker(activeLevel) {
    for (let i = 1; i <= 4; i++) {
        const node = document.getElementById(`node-${i}`);
        node.classList.remove('active', 'completed');
        if (i < activeLevel) {
            node.classList.add('completed');
        } else if (i === activeLevel) {
            node.classList.add('active');
        }
    }
}

// Render Tombol Pilihan Jawaban (Level 1 & 2)
function renderOptions(optionsArray, targetVal) {
    optionsGrid.innerHTML = '';
    const shuffledOptions = shuffleArray(optionsArray);

    shuffledOptions.forEach((optText) => {
        const btn = document.createElement('button');
        btn.className = 'btn-option';
        btn.textContent = optText;

        btn.addEventListener('click', () => {
            const isCorrect = (parseInt(optText, 10) === targetVal);
            if (isCorrect) {
                btn.classList.add('correct-choice');
                handleLevelSuccess();
            } else {
                btn.classList.add('wrong-choice');
                handleLevelWrong();
            }
        });

        optionsGrid.appendChild(btn);
    });
}

// Render Cards Drag & Drop (Level 4)
function renderSortCards(cardsArray) {
    level4SortContainer.innerHTML = '';
    cardsArray.forEach((num) => {
        const card = document.createElement('div');
        card.className = 'sort-card';
        card.setAttribute('draggable', 'true');
        card.dataset.value = num;
        card.textContent = num;

        addSortDragAndDropListeners(card);
        addSortTouchListeners(card);

        level4SortContainer.appendChild(card);
    });
}

// Drag & Drop Listeners (Desktop)
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
            const allCards = Array.from(level4SortContainer.children);
            const draggedIdx = allCards.indexOf(draggedSortCard);
            const targetIdx = allCards.indexOf(card);

            if (draggedIdx < targetIdx) {
                level4SortContainer.insertBefore(draggedSortCard, card.nextSibling);
            } else {
                level4SortContainer.insertBefore(draggedSortCard, card);
            }
        }
    });
}

// Touch Event Fallback (Ponsel Android / Tablet)
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
            const allCards = Array.from(level4SortContainer.children);
            const draggedIdx = allCards.indexOf(activeTouchSortCard);
            const targetIdx = allCards.indexOf(targetCard);

            if (draggedIdx < targetIdx) {
                level4SortContainer.insertBefore(activeTouchSortCard, targetCard.nextSibling);
            } else {
                level4SortContainer.insertBefore(activeTouchSortCard, targetCard);
            }
        }

        activeTouchSortCard.classList.remove('dragging');
        activeTouchSortCard = null;
    });
}

// 7. HANDLE TOMBOL SUBMIT (LEVEL 3 & LEVEL 4)
btnSubmitAction.addEventListener('click', () => {
    if (currentLevel === 3) {
        const userVal = parseInt(writeInput.value.trim(), 10);
        if (userVal === levelData[3].target) {
            handleLevelSuccess();
        } else {
            handleLevelWrong();
        }
    } else if (currentLevel === 4) {
        const cardElements = level4SortContainer.querySelectorAll('.sort-card');
        const currentOrder = Array.from(cardElements).map(el => parseInt(el.dataset.value, 10));
        const sortedCorrectly = [...currentOrder].sort((a, b) => a - b);

        const isCorrect = currentOrder.every((val, idx) => val === sortedCorrectly[idx]);

        if (isCorrect) {
            handleLevelSuccess();
        } else {
            handleLevelWrong();
        }
    }
});

// Logic Saat Jawaban Benar
function handleLevelSuccess() {
    if (!isCurrentLevelTriedWrong) {
        score += 25;
        correctFirstTryCount++;
        currentScoreEl.textContent = score;
    }

    const isFinalLevel = (currentLevel === 4);
    const nextText = isFinalLevel ? "LIHAT HASIL 🏆" : "POS BERIKUTNYA ➔";

    showFeedback(true, "Hebat!", "Jawabanmu tepat sekali!", () => {
        feedbackOverlay.classList.add('hidden');
        if (isFinalLevel) {
            showFinalResults();
        } else {
            currentLevel++;
            loadLevel(currentLevel);
        }
    }, nextText);
}

// Logic Saat Jawaban Salah
function handleLevelWrong() {
    if (!isCurrentLevelTriedWrong) {
        wrongAttemptsTotal++;
        isCurrentLevelTriedWrong = true;
    }

    showFeedback(false, "Coba Lagi!", "Periksa kembali jawabanmu.", () => {
        feedbackOverlay.classList.add('hidden');
    }, "PERBAIKI 🔄");
}

// 8. FEEDBACK OVERLAY & HASIL EVALUASI
function showFeedback(isCorrect, title, message, actionCallback, btnLabel = "LANJUT ➔") {
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
    const percentage = Math.round((correctFirstTryCount / 4) * 100);

    document.getElementById('final-score').textContent = score;
    document.getElementById('final-correct').textContent = `${correctFirstTryCount} / 4`;
    document.getElementById('final-wrong').textContent = `${wrongAttemptsTotal} Kali`;
    document.getElementById('final-percentage').textContent = `${percentage}%`;

    const motivationIcon = document.getElementById('motivation-icon');
    const motivationText = document.getElementById('motivation-text');

    if (percentage === 100) {
        motivationIcon.textContent = '🏆';
        motivationText.textContent = 'Hebat! Penjelajah Handal!';
    } else if (percentage >= 75) {
        motivationIcon.textContent = '🌟';
        motivationText.textContent = 'Bagus! Kerja Sangat Baik!';
    } else {
        motivationIcon.textContent = '💪';
        motivationText.textContent = 'Terus Semangat Belajar!';
    }

    navigateToScreen('result');
}

// 9. EVENT LISTENERS UTAMA
btnStart.addEventListener('click', () => navigateToScreen('instructions'));
btnPlay.addEventListener('click', initGame);
btnRestart.addEventListener('click', initGame);
btnHome.addEventListener('click', () => navigateToScreen('start'));