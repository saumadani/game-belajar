/**
 * ==========================================================================
 * GAME EDUKASI: TANTANGAN BILANGAN (101–500)
 * Spesifikasi Khusus: Siswa Tuli Kelas 4 SD (Setara Kelas I)
 * Fitur: Quiz 10 Soal Pilihan Ganda (Mengenali, Membaca, Menulis, Mengurutkan)
 * ==========================================================================
 */

// 1. BANK SOAL LENGKAP (Rentang 101–500)
const bankSoal = [
    // --- KATEGORI 1: MENGENALI BILANGAN ---
    {
        category: "Mengenali Bilangan",
        question: "Pilih angka 328",
        highlight: null,
        options: ["238", "382", "328", "283"],
        answer: "328"
    },
    {
        category: "Mengenali Bilangan",
        question: "Pilih angka 105",
        highlight: null,
        options: ["150", "105", "501", "510"],
        answer: "105"
    },
    {
        category: "Mengenali Bilangan",
        question: "Pilih angka 492",
        highlight: null,
        options: ["429", "294", "492", "942"],
        answer: "492"
    },

    // --- KATEGORI 2: MEMBACA BILANGAN ---
    {
        category: "Membaca Bilangan",
        question: "Berapa angka berikut?",
        highlight: "417",
        options: ["471", "417", "174", "147"],
        answer: "417"
    },
    {
        category: "Membaca Bilangan",
        question: "Berapa angka berikut?",
        highlight: "230",
        options: ["203", "320", "230", "302"],
        answer: "230"
    },
    {
        category: "Membaca Bilangan",
        question: "Berapa angka berikut?",
        highlight: "389",
        options: ["389", "398", "893", "983"],
        answer: "389"
    },

    // --- KATEGORI 3: MENULIS BILANGAN (MENYALIN) ---
    {
        category: "Menulis Bilangan",
        question: "Pilih angka yang sama dengan:",
        highlight: "245",
        options: ["254", "245", "425", "524"],
        answer: "245"
    },
    {
        category: "Menulis Bilangan",
        question: "Pilih angka yang sama dengan:",
        highlight: "186",
        options: ["186", "168", "816", "681"],
        answer: "186"
    },
    {
        category: "Menulis Bilangan",
        question: "Pilih angka yang sama dengan:",
        highlight: "500",
        options: ["500", "005", "050", "550"],
        answer: "500"
    },

    // --- KATEGORI 4: MENGURUTKAN BILANGAN ---
    {
        category: "Mengurutkan Bilangan",
        question: "Manakah urutan dari yang TERKECIL?",
        highlight: null,
        options: [
            "104 – 198 – 276",
            "276 – 104 – 198",
            "198 – 104 – 276",
            "198 – 276 – 104"
        ],
        answer: "104 – 198 – 276"
    },
    {
        category: "Mengurutkan Bilangan",
        question: "Manakah urutan dari yang TERKECIL?",
        highlight: null,
        options: [
            "310 – 325 – 340",
            "340 – 310 – 325",
            "325 – 340 – 310",
            "340 – 325 – 310"
        ],
        answer: "310 – 325 – 340"
    },
    {
        category: "Mengurutkan Bilangan",
        question: "Manakah urutan dari yang TERKECIL?",
        highlight: null,
        options: [
            "215 – 350 – 480",
            "480 – 350 – 215",
            "350 – 215 – 480",
            "215 – 480 – 350"
        ],
        answer: "215 – 350 – 480"
    }
];

// 2. STATE PERMAINAN
let activeQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let isAnsweredCurrent = false;

// 3. SELEKSI ELEMEN DOM
const screens = {
    start: document.getElementById('screen-start'),
    instructions: document.getElementById('screen-instructions'),
    quiz: document.getElementById('screen-quiz'),
    result: document.getElementById('screen-result')
};

const btnStart = document.getElementById('btn-start');
const btnPlay = document.getElementById('btn-play');
const btnRestart = document.getElementById('btn-restart');
const btnHome = document.getElementById('btn-home');

const questionProgressEl = document.getElementById('question-progress');
const currentScoreEl = document.getElementById('current-score');
const progressBarFill = document.getElementById('progress-bar-fill');

const categoryBadge = document.getElementById('category-badge');
const questionText = document.getElementById('question-text');
const questionHighlight = document.getElementById('question-highlight');
const optionsGrid = document.getElementById('options-grid');

const quizFeedback = document.getElementById('quiz-feedback');
const feedbackStatusIcon = document.getElementById('feedback-status-icon');
const feedbackStatusText = document.getElementById('feedback-status-text');

// 4. UTILS & NAVIGASI HALAMAN
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

// 5. INISIALISASI PERMAINAN
function initGame() {
    currentQuestionIndex = 0;
    score = 0;
    correctCount = 0;
    wrongCount = 0;

    // Acak seluruh bank soal dan ambil 10 soal terbaik
    activeQuestions = shuffleArray(bankSoal).slice(0, 10);

    currentScoreEl.textContent = score;
    loadQuestion();
    navigateToScreen('quiz');
}

// 6. MEMUAT SOAL KE LAYAR
function loadQuestion() {
    isAnsweredCurrent = false;
    hideFeedback();

    const q = activeQuestions[currentQuestionIndex];

    // Update Progress Bar & Info Bar
    questionProgressEl.textContent = `${currentQuestionIndex + 1} / 10`;
    progressBarFill.style.width = `${((currentQuestionIndex + 1) / 10) * 100}%`;

    // Render Teks Soal & Kategori
    categoryBadge.textContent = q.category;
    questionText.textContent = q.question;

    if (q.highlight) {
        questionHighlight.textContent = q.highlight;
        questionHighlight.classList.remove('hidden');
    } else {
        questionHighlight.classList.add('hidden');
    }

    // Acak Pilihan Jawaban
    const shuffledOptions = shuffleArray(q.options);

    // Render Opsi Tombol
    optionsGrid.innerHTML = '';
    shuffledOptions.forEach((optText) => {
        const btn = document.createElement('button');
        btn.className = 'btn-option';
        btn.textContent = optText;

        btn.addEventListener('click', () => handleOptionClick(btn, optText, q.answer));
        optionsGrid.appendChild(btn);
    });
}

// 7. MEMPROSES JAWABAN SISWA
function handleOptionClick(selectedButton, selectedValue, correctAnswer) {
    if (selectedButton.classList.contains('wrong-choice') || selectedButton.classList.contains('correct-choice')) {
        return; // Mencegah klik ganda pada tombol yang sudah ditandai
    }

    if (selectedValue === correctAnswer) {
        // --- JAWABAN BENAR ---
        selectedButton.classList.add('correct-choice');
        selectedButton.innerHTML += ` <span>✅</span>`;

        if (!isAnsweredCurrent) {
            score += 10;
            correctCount++;
            currentScoreEl.textContent = score;
        }

        showFeedback(true, "Benar!");
        disableAllOptions();

        // Pindah otomatis ke soal berikutnya setelah 1 detik
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < activeQuestions.length) {
                loadQuestion();
            } else {
                showFinalResults();
            }
        }, 1100);

    } else {
        // --- JAWABAN SALAH ---
        selectedButton.classList.add('wrong-choice');
        selectedButton.innerHTML += ` <span>❌</span>`;

        if (!isAnsweredCurrent) {
            wrongCount++;
            isAnsweredCurrent = true; // Menandai bahwa untuk soal ini pernah terjadi percobaan salah
        }

        showFeedback(false, "Coba Lagi!");
    }
}

function disableAllOptions() {
    const buttons = optionsGrid.querySelectorAll('.btn-option');
    buttons.forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
}

// 8. TAMPILKAN STATUS FEEDBACK VISUAL
function showFeedback(isCorrect, message) {
    quizFeedback.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'wrong');
    feedbackStatusIcon.textContent = isCorrect ? '✅' : '❌';
    feedbackStatusText.textContent = message;
    quizFeedback.classList.remove('hidden');
}

function hideFeedback() {
    quizFeedback.classList.add('hidden');
}

// 9. HALAMAN HASIL EVALUASI
function showFinalResults() {
    const percentage = Math.round((correctCount / 10) * 100);

    document.getElementById('final-score').textContent = score;
    document.getElementById('final-correct').textContent = correctCount;
    document.getElementById('final-wrong').textContent = wrongCount;
    document.getElementById('final-percentage').textContent = `${percentage}%`;

    const motivationIcon = document.getElementById('motivation-icon');
    const motivationText = document.getElementById('motivation-text');

    if (percentage === 100) {
        motivationIcon.textContent = '🏆';
        motivationText.textContent = 'Hebat!';
    } else if (percentage >= 70) {
        motivationIcon.textContent = '🌟';
        motivationText.textContent = 'Bagus!';
    } else {
        motivationIcon.textContent = '💪';
        motivationText.textContent = 'Terus Semangat!';
    }

    navigateToScreen('result');
}

// 10. EVENT LISTENERS UTAMA
btnStart.addEventListener('click', () => navigateToScreen('instructions'));
btnPlay.addEventListener('click', initGame);
btnRestart.addEventListener('click', initGame);
btnHome.addEventListener('click', () => navigateToScreen('start'));