/**
 * ==========================================================================
 * GAME EDUKASI: RUMAH NILAI TEMPAT (BANTUAN VISUAL WARNA KONSISTEN)
 * Spesifikasi Khusus: Siswa Tuli Kelas 4 SD (Setara Kelas I)
 * Aturan Warna: 🔴 Merah = Ratusan, 🟨 Kuning = Puluhan, 🔵 Biru = Satuan
 * ==========================================================================
 */

// 1. STATE PERMAINAN
const TOTAL_QUESTIONS = 10;
let currentQuestionIndex = 0;
let score = 0;
let correctFirstTryCount = 0;
let wrongAttemptsTotal = 0;
let isCurrentQuestionTriedWrong = false;

// Data Soal & Digit Terkini
let currentNumber = 0;
let correctDigits = {
    hundreds: null,
    tens: null,
    units: null
};

let draggedDigitCard = null;
let activeTouchCard = null;

// 2. SELEKSI ELEMEN DOM
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

const coloredNumberPreview = document.getElementById('colored-number-preview');
const digitSourceContainer = document.getElementById('digit-source-container');
const dropZones = document.querySelectorAll('.drop-zone');
const houseCards = document.querySelectorAll('.house-card');

const feedbackOverlay = document.getElementById('feedback-overlay');
const feedbackCard = document.getElementById('feedback-card');
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackText = document.getElementById('feedback-text');
const feedbackSubtext = document.getElementById('feedback-subtext');

// 3. UTILS & NAVIGASI
function navigateToScreen(screenName) {
    Object.keys(screens).forEach(key => {
        screens[key].classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

function generateRandom3DigitNumber(previousNumber = null) {
    let num;
    do {
        num = Math.floor(Math.random() * 900) + 100;
    } while (num === previousNumber);
    return num;
}

// 4. INISIALISASI GAME
function initGame() {
    currentQuestionIndex = 0;
    score = 0;
    correctFirstTryCount = 0;
    wrongAttemptsTotal = 0;

    currentScoreEl.textContent = score;
    loadQuestion();
    navigateToScreen('game');
}

// 5. MEMUAT SOAL PERMAINAN
function loadQuestion() {
    isCurrentQuestionTriedWrong = false;
    clearHouseEvaluationUI();

    // Reset Drop Zones
    dropZones.forEach(zone => {
        const place = zone.dataset.place;
        let iconPlace = "🔴";
        if (place === "tens") iconPlace = "🟨";
        if (place === "units") iconPlace = "🔵";

        zone.innerHTML = `<span class="placeholder-text">Tarik ${iconPlace} ke sini</span>`;
    });

    // Generate Bilangan 3 Digit Acak
    currentNumber = generateRandom3DigitNumber(currentNumber);
    const numStr = currentNumber.toString();

    correctDigits = {
        hundreds: parseInt(numStr[0], 10),
        tens: parseInt(numStr[1], 10),
        units: parseInt(numStr[2], 10)
    };

    // Update Progress Bar
    questionProgressText.textContent = `${currentQuestionIndex + 1} / ${TOTAL_QUESTIONS}`;
    progressBarFill.style.width = `${((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100}%`;

    // Render Preview Bilangan Berwarna di Atas (🔴4 🟨8 🔵2)
    coloredNumberPreview.innerHTML = `
        <span class="num-digit-preview hundreds">${correctDigits.hundreds}</span>
        <span class="num-digit-preview tens">${correctDigits.tens}</span>
        <span class="num-digit-preview units">${correctDigits.units}</span>
    `;

    // Render 3 Kartu Digit Besar Berwarna
    digitSourceContainer.innerHTML = '';
    const digitsArray = [
        { id: 'd-hundreds', val: correctDigits.hundreds, placeType: 'hundreds' },
        { id: 'd-tens', val: correctDigits.tens, placeType: 'tens' },
        { id: 'd-units', val: correctDigits.units, placeType: 'units' }
    ];

    // Acak posisi kemunculan kartu digit di sumber
    const shuffledDigits = [...digitsArray].sort(() => 0.5 - Math.random());

    shuffledDigits.forEach(digitObj => {
        const card = createDigitCardElement(digitObj);
        digitSourceContainer.appendChild(card);
    });
}

// Membuat Elemen Kartu Digit Berwarna
function createDigitCardElement(digitObj) {
    const card = document.createElement('div');
    card.className = `digit-card ${digitObj.placeType}`;
    card.setAttribute('draggable', 'true');
    card.dataset.id = digitObj.id;
    card.dataset.value = digitObj.val;
    card.dataset.type = digitObj.placeType;
    card.textContent = digitObj.val;

    addDragAndDropListeners(card);
    addTouchListeners(card);

    return card;
}

// 6. LOGIKA HTML5 DRAG & DROP API (Desktop)
function addDragAndDropListeners(card) {
    card.addEventListener('dragstart', (e) => {
        draggedDigitCard = card;
        card.classList.add('dragging');
        e.dataTransfer.setData('text/plain', card.dataset.id);
    });

    card.addEventListener('dragend', () => {
        draggedDigitCard = null;
        card.classList.remove('dragging');
        dropZones.forEach(zone => zone.classList.remove('drag-over'));
    });
}

// Drop Zones Event Handlers
dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');

        if (draggedDigitCard) {
            placeCardInZone(draggedDigitCard, zone);
        }
    });
});

digitSourceContainer.addEventListener('dragover', (e) => e.preventDefault());
digitSourceContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    if (draggedDigitCard) {
        digitSourceContainer.appendChild(draggedDigitCard);
        cleanEmptyZones();
    }
});

// 7. FALLBACK TOUCH EVENTS (HP / Tablet)
function addTouchListeners(card) {
    card.addEventListener('touchstart', (e) => {
        activeTouchCard = card;
        card.classList.add('dragging');
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
        if (!activeTouchCard) return;

        const touch = e.changedTouches[0];
        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
        const targetZone = targetElement ? targetElement.closest('.drop-zone') : null;

        if (targetZone) {
            placeCardInZone(activeTouchCard, targetZone);
        } else {
            digitSourceContainer.appendChild(activeTouchCard);
            cleanEmptyZones();
        }

        activeTouchCard.classList.remove('dragging');
        activeTouchCard = null;
    });
}

// Memindahkan Kartu ke Zone Rumah
function placeCardInZone(card, zone) {
    const existingCard = zone.querySelector('.digit-card');
    if (existingCard) {
        digitSourceContainer.appendChild(existingCard);
    }

    const placeholder = zone.querySelector('.placeholder-text');
    if (placeholder) placeholder.style.display = 'none';

    zone.appendChild(card);
    cleanEmptyZones();
}

function cleanEmptyZones() {
    dropZones.forEach(zone => {
        const hasCard = zone.querySelector('.digit-card');
        const placeholder = zone.querySelector('.placeholder-text');
        if (placeholder) {
            placeholder.style.display = hasCard ? 'none' : 'block';
        }
    });
}

// 8. VALIDASI JAWABAN & TATA CARA ATURAN TERBARU
btnCheck.addEventListener('click', () => {
    const zoneHundreds = document.getElementById('zone-hundreds').querySelector('.digit-card');
    const zoneTens = document.getElementById('zone-tens').querySelector('.digit-card');
    const zoneUnits = document.getElementById('zone-units').querySelector('.digit-card');

    if (!zoneHundreds || !zoneTens || !zoneUnits) {
        showFeedback(false, "Belum Lengkap!", "Tempatkan semua kartu ke dalam 3 rumah!");
        return;
    }

    const isHundredsCorrect = (zoneHundreds.dataset.type === 'hundreds');
    const isTensCorrect = (zoneTens.dataset.type === 'tens');
    const isUnitsCorrect = (zoneUnits.dataset.type === 'units');

    // Evaluasi Tampilan Rumah
    evaluateHouseUI('hundreds', isHundredsCorrect, zoneHundreds);
    evaluateHouseUI('tens', isTensCorrect, zoneTens);
    evaluateHouseUI('units', isUnitsCorrect, zoneUnits);

    const isAllCorrect = isHundredsCorrect && isTensCorrect && isUnitsCorrect;

    if (isAllCorrect) {
        if (!isCurrentQuestionTriedWrong) {
            score += 10;
            correctFirstTryCount++;
            currentScoreEl.textContent = score;
        }

        showFeedback(true, "Hebat!", "Jawaban Benar.", () => {
            feedbackOverlay.classList.add('hidden');
            currentQuestionIndex++;
            if (currentQuestionIndex < TOTAL_QUESTIONS) {
                loadQuestion();
            } else {
                showFinalResults();
            }
        });
    } else {
        if (!isCurrentQuestionTriedWrong) {
            wrongAttemptsTotal++;
            isCurrentQuestionTriedWrong = true;
        }

        // Aturan: Digit yang salah kembali ke posisi awal, yang benar tetap di rumah
        setTimeout(() => {
            if (!isHundredsCorrect && zoneHundreds) digitSourceContainer.appendChild(zoneHundreds);
            if (!isTensCorrect && zoneTens) digitSourceContainer.appendChild(zoneTens);
            if (!isUnitsCorrect && zoneUnits) digitSourceContainer.appendChild(zoneUnits);
            cleanEmptyZones();
        }, 800);

        showFeedback(false, "Coba Lagi.", "Ada digit yang belum tepat di rumahnya.", () => {
            feedbackOverlay.classList.add('hidden');
        }, "PERBAIKI 🔄");
    }
});

// Mengatur Garis/Warna Evaluasi pada Rumah
function evaluateHouseUI(place, isCorrect, cardElement) {
    const houseCard = document.getElementById(`house-${place}`);
    houseCard.classList.remove('eval-correct', 'eval-wrong');

    if (isCorrect) {
        houseCard.classList.add('eval-correct'); // Rumah berubah hijau total & ikon centang
    } else {
        houseCard.classList.add('eval-wrong');   // Rumah diberi garis merah
    }
}

function clearHouseEvaluationUI() {
    houseCards.forEach(card => {
        card.classList.remove('eval-correct', 'eval-wrong');
    });
}

// 9. FEEDBACK OVERLAY & HALAMAN HASIL
function showFeedback(isCorrect, title, message, actionCallback, btnLabel = "SOAL BERIKUTNYA ➔") {
    feedbackCard.className = 'feedback-card ' + (isCorrect ? 'correct' : 'wrong');
    feedbackIcon.textContent = isCorrect ? '✅' : '❌';
    feedbackText.textContent = title;
    feedbackSubtext.textContent = message;

    btnFeedbackAction.textContent = btnLabel;
    btnFeedbackAction.onclick = actionCallback;
    feedbackOverlay.classList.remove('hidden');
}

function showFinalResults() {
    feedbackOverlay.classList.add('hidden');
    const percentage = Math.round((correctFirstTryCount / TOTAL_QUESTIONS) * 100);

    document.getElementById('final-score').textContent = score;
    document.getElementById('final-correct').textContent = `${correctFirstTryCount} / ${TOTAL_QUESTIONS}`;
    document.getElementById('final-wrong').textContent = `${wrongAttemptsTotal} Kali`;
    document.getElementById('final-percentage').textContent = `${percentage}%`;

    const motivationIcon = document.getElementById('motivation-icon');
    const motivationText = document.getElementById('motivation-text');

    if (percentage === 100) {
        motivationIcon.textContent = '🏆';
        motivationText.textContent = 'Hebat! Kamu Sangat Pintar!';
    } else if (percentage >= 70) {
        motivationIcon.textContent = '🌟';
        motivationText.textContent = 'Bagus! Kerja Sangat Baik!';
    } else {
        motivationIcon.textContent = '💪';
        motivationText.textContent = 'Ayo Coba Lagi!';
    }

    navigateToScreen('result');
}

// 10. EVENT LISTENERS UTAMA
btnStart.addEventListener('click', () => navigateToScreen('instructions'));
btnPlay.addEventListener('click', initGame);
btnRestart.addEventListener('click', initGame);
btnHome.addEventListener('click', () => navigateToScreen('start'));