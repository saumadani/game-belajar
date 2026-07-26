/**
 * PETUALANGAN TAMBAH CERIA - GAME ENGINE
 * Kepatuhan Flow Wajib:
 * Menu Utama -> Petunjuk -> Level 1 -> Hasil Lvl 1 -> Level 2 -> Hasil Lvl 2 -> Level 3 -> Hasil Lvl 3 -> Level 4 -> Hasil Lvl 4 -> Hasil Akhir
 */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================================
    // STATE PERMAINAN
    // ==========================================================
    const state = {
        currentLevel: 1,            // Level 1 sampai 4
        questionInLevel: 0,         // Soal 0 sampai 4 (5 Soal/Level)
        totalStars: 0,              // Akumulasi Bintang
        
        // Statistik Level Saat Ini
        levelCorrect: 0,
        levelWrong: 0,

        // Akumulasi Seluruh Game (20 Soal)
        finalCorrect: 0,
        finalWrong: 0,

        // Parameter Soal Aktif
        numA: 0,
        numB: 0,
        correctAnswer: 0,
        isCombined: false,
        currentIcon: '🍎',
        itemsList: ['🍎', '⚽', '✏️', '🍬', '📚', '🚗', '🎈', '⭐']
    };

    // Konfigurasi Rentang Hasil Soal per Level
    const levelConfigs = {
        1: { max: 10,  label: "Level 1 (Hasil s.d 10)" },
        2: { max: 20,  label: "Level 2 (Hasil s.d 20)" },
        3: { max: 50,  label: "Level 3 (Hasil s.d 50)" },
        4: { max: 100, label: "Level 4 (Hasil s.d 100)" }
    };

    // ==========================================================
    // DOM ELEMEN
    // ==========================================================
    // Screens
    const screenMainMenu = document.getElementById('screen-main-menu');
    const screenInstructions = document.getElementById('screen-instructions');
    const screenGameplay = document.getElementById('screen-gameplay');
    const screenLevelResult = document.getElementById('screen-level-result');
    const screenFinalResult = document.getElementById('screen-final-result');
    const modalAbout = document.getElementById('modal-about');

    // Navigation Buttons
    const btnStartGame = document.getElementById('btn-start-game');
    const btnShowInstructions = document.getElementById('btn-show-instructions');
    const btnShowAbout = document.getElementById('btn-show-about');
    const btnCloseAbout = document.getElementById('btn-close-about');
    const btnPlayFromGuide = document.getElementById('btn-play-from-guide');
    const btnBackToMenuFromGuide = document.getElementById('btn-back-to-menu-from-guide');

    // Gameplay HUD & Board
    const hudLevel = document.getElementById('hud-level');
    const hudQuestion = document.getElementById('hud-question');
    const hudStars = document.getElementById('hud-stars');
    const basketTarget = document.getElementById('basket-target');
    const basketSource = document.getElementById('basket-source');
    const itemsGroupA = document.getElementById('items-group-a');
    const itemsGroupB = document.getElementById('items-group-b');
    const plusOperator = document.getElementById('plus-operator');
    const combinedNotice = document.getElementById('combined-notice');
    const equationContainer = document.getElementById('equation-container');
    const numADisplay = document.getElementById('num-a');
    const numBDisplay = document.getElementById('num-b');
    const numResultDisplay = document.getElementById('num-result');
    const answersGrid = document.getElementById('answers-grid');

    // Modals & Results
    const feedbackOverlay = document.getElementById('feedback-overlay');
    const feedbackCard = document.getElementById('feedback-card');
    const feedbackSymbol = document.getElementById('feedback-symbol');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackSub = document.getElementById('feedback-sub');
    const btnNextQuestion = document.getElementById('btn-next-question');

    // Level Result Screen Elements
    const levelResultTitle = document.getElementById('level-result-title');
    const levelStarsDisplay = document.getElementById('level-stars-display');
    const lvlResCorrect = document.getElementById('lvl-res-correct');
    const lvlResWrong = document.getElementById('lvl-res-wrong');
    const lvlResScore = document.getElementById('lvl-res-score');
    const btnNextLevel = document.getElementById('btn-next-level');
    const btnMenuFromLevel = document.getElementById('btn-menu-from-level');

    // Final Result Screen Elements
    const finalStarsDisplay = document.getElementById('final-stars-display');
    const finalScore = document.getElementById('final-score');
    const finalCorrect = document.getElementById('final-correct');
    const finalWrong = document.getElementById('final-wrong');
    const finalPercent = document.getElementById('final-percent');
    const btnRestartGame = document.getElementById('btn-restart-game');
    const btnMenuFromFinal = document.getElementById('btn-menu-from-final');

    // ==========================================================
    // INITIALIZATION & ROUTING FLOW
    // ==========================================================
    setupEventListeners();
    setupDragAndDrop();

    // Fungsi Navigasi Halaman
    function showScreen(screenToShow) {
        [screenMainMenu, screenInstructions, screenGameplay, screenLevelResult, screenFinalResult].forEach(s => s.classList.add('hidden'));
        screenToShow.classList.remove('hidden');
    }

    // Reset Total Seluruh Game
    function resetFullGame() {
        state.currentLevel = 1;
        state.questionInLevel = 0;
        state.totalStars = 0;
        state.finalCorrect = 0;
        state.finalWrong = 0;
        resetLevelStats();
    }

    function resetLevelStats() {
        state.levelCorrect = 0;
        state.levelWrong = 0;
    }

    // ==========================================================
    // EVENT LISTENERS & NAVIGATION
    // ==========================================================
    function setupEventListeners() {
        // Main Menu Actions
        btnStartGame.addEventListener('click', () => {
            showScreen(screenInstructions); // Flow: Menu -> Petunjuk
        });

        btnShowInstructions.addEventListener('click', () => {
            showScreen(screenInstructions);
        });

        btnShowAbout.addEventListener('click', () => {
            modalAbout.classList.remove('hidden');
        });

        btnCloseAbout.addEventListener('click', () => {
            modalAbout.classList.add('hidden');
        });

        // Instructions Actions
        btnPlayFromGuide.addEventListener('click', () => {
            resetFullGame();
            showScreen(screenGameplay);
            startCurrentLevel();
        });

        btnBackToMenuFromGuide.addEventListener('click', () => {
            showScreen(screenMainMenu);
        });

        // Next Level Button (Halaman Hasil Level)
        btnNextLevel.addEventListener('click', () => {
            state.currentLevel++;
            state.questionInLevel = 0;
            resetLevelStats();
            showScreen(screenGameplay);
            startCurrentLevel();
        });

        btnMenuFromLevel.addEventListener('click', () => showScreen(screenMainMenu));
        btnMenuFromFinal.addEventListener('click', () => showScreen(screenMainMenu));

        // Restart Game
        btnRestartGame.addEventListener('click', () => {
            resetFullGame();
            showScreen(screenGameplay);
            startCurrentLevel();
        });

        // Modal Feedback Next
        btnNextQuestion.addEventListener('click', () => {
            feedbackOverlay.classList.add('hidden');

            if (feedbackTitle.textContent === 'Hebat!') {
                state.questionInLevel++;

                // Selesai 5 soal dalam level saat ini
                if (state.questionInLevel >= 5) {
                    showLevelResultScreen();
                } else {
                    loadQuestion();
                }
            } else {
                numResultDisplay.textContent = "?";
            }
        });
    }

    // ==========================================================
    // LOGIKA PERMAINAN & LEVEL
    // ==========================================================
    function startCurrentLevel() {
        loadQuestion();
    }

    function loadQuestion() {
        state.isCombined = false;
        state.currentIcon = state.itemsList[Math.floor(Math.random() * state.itemsList.length)];

        // Tentukan batas hasil penjumlahan berdasarkan level aktif
        const maxResult = levelConfigs[state.currentLevel].max;
        const minResult = state.currentLevel === 1 ? 2 : Math.floor(maxResult / 2);

        state.correctAnswer = Math.floor(Math.random() * (maxResult - minResult + 1)) + minResult;
        state.numA = Math.floor(Math.random() * (state.correctAnswer - 1)) + 1;
        state.numB = state.correctAnswer - state.numA;

        // Update HUD
        hudLevel.textContent = `Level ${state.currentLevel} dari 4`;
        hudQuestion.textContent = `Soal ${state.questionInLevel + 1} dari 5`;
        hudStars.textContent = state.totalStars;

        // Reset Board UI
        plusOperator.classList.remove('hidden');
        basketSource.classList.remove('hidden');
        combinedNotice.classList.add('hidden');
        equationContainer.classList.add('locked');
        numADisplay.textContent = state.numA;
        numBDisplay.textContent = state.numB;
        numResultDisplay.textContent = "?";

        renderVisualItems();
        renderAnswers();
    }

    function renderVisualItems() {
        itemsGroupA.innerHTML = '';
        itemsGroupB.innerHTML = '';

        appendItems(itemsGroupA, state.numA, state.currentIcon);
        appendItems(itemsGroupB, state.numB, state.currentIcon);
    }

    function appendItems(container, count, icon) {
        if (count > 20) {
            const box = document.createElement('div');
            box.className = 'game-item';
            box.innerHTML = `${icon} <div class="counter-badge">${count} Benda</div>`;
            container.appendChild(box);
            return;
        }

        for (let i = 0; i < count; i++) {
            const span = document.createElement('span');
            span.className = 'game-item';
            span.textContent = icon;
            container.appendChild(span);
        }
    }

    // ==========================================================
    // DRAG & DROP LOGIC
    // ==========================================================
    function setupDragAndDrop() {
        basketSource.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', 'combine');
            basketSource.style.opacity = '0.5';
        });

        basketSource.addEventListener('dragend', () => {
            basketSource.style.opacity = '1';
        });

        basketTarget.addEventListener('dragover', (e) => {
            e.preventDefault();
            basketTarget.classList.add('drag-over');
        });

        basketTarget.addEventListener('dragleave', () => {
            basketTarget.classList.remove('drag-over');
        });

        basketTarget.addEventListener('drop', (e) => {
            e.preventDefault();
            basketTarget.classList.remove('drag-over');
            combineItems();
        });

        // Alternatif klik untuk layar sentuh
        basketSource.addEventListener('click', () => {
            if (!state.isCombined) combineItems();
        });
    }

    function combineItems() {
        if (state.isCombined) return;
        state.isCombined = true;

        itemsGroupA.innerHTML = '';
        appendItems(itemsGroupA, state.correctAnswer, state.currentIcon);

        plusOperator.classList.add('hidden');
        basketSource.classList.add('hidden');
        combinedNotice.classList.remove('hidden');
        equationContainer.classList.remove('locked');
    }

    // ==========================================================
    // PILIHAN JAWABAN & VALIDASI
    // ==========================================================
    function renderAnswers() {
        answersGrid.innerHTML = '';
        const options = generateOptions(state.correctAnswer);

        options.forEach(val => {
            const btn = document.createElement('button');
            btn.className = 'btn-answer';
            btn.textContent = val;

            btn.addEventListener('click', () => {
                if (!state.isCombined) return;
                checkAnswer(val);
            });

            answersGrid.appendChild(btn);
        });
    }

    function generateOptions(correct) {
        const optionsSet = new Set([correct]);
        while (optionsSet.size < 3) {
            let offset = (Math.floor(Math.random() * 4) + 1) * (Math.random() < 0.5 ? 1 : -1);
            let wrong = correct + offset;
            if (wrong > 0 && wrong <= 100) optionsSet.add(wrong);
        }
        return Array.from(optionsSet).sort((a, b) => a - b);
    }

    function checkAnswer(selected) {
        numResultDisplay.textContent = selected;

        if (selected === state.correctAnswer) {
            state.levelCorrect++;
            state.finalCorrect++;
            state.totalStars++;
            showFeedback(true);
        } else {
            state.levelWrong++;
            state.finalWrong++;
            showFeedback(false);
        }
    }

    function showFeedback(isCorrect) {
        feedbackOverlay.classList.remove('hidden');

        if (isCorrect) {
            feedbackCard.classList.remove('wrong-card');
            feedbackSymbol.textContent = '⭐';
            feedbackTitle.textContent = 'Hebat!';
            feedbackSub.textContent = 'Jawaban kamu tepat!';
            btnNextQuestion.style.backgroundColor = '#22c55e';
        } else {
            feedbackCard.classList.add('wrong-card');
            feedbackSymbol.textContent = '🔄';
            feedbackTitle.textContent = 'Coba Lagi';
            feedbackSub.textContent = 'Hitung kembali seluruh benda dalam keranjang.';
            btnNextQuestion.style.backgroundColor = '#ef4444';
        }
    }

    // ==========================================================
    // HALAMAN HASIL LEVEL (HASIL LEVEL 1 - 3)
    // ==========================================================
    function showLevelResultScreen() {
        // Jika telah menyelesaikan Level 4 -> Lanjut ke Hasil Akhir
        if (state.currentLevel === 4) {
            showFinalResultScreen();
            return;
        }

        showScreen(screenLevelResult);

        const score = Math.round((state.levelCorrect / 5) * 100);
        levelResultTitle.textContent = `LEVEL ${state.currentLevel} SELESAI`;
        lvlResCorrect.textContent = state.levelCorrect;
        lvlResWrong.textContent = state.levelWrong;
        lvlResScore.textContent = score;

        // Visual Bintang Level
        let stars = '⭐⭐⭐';
        if (score === 100) stars = '⭐⭐⭐⭐⭐';
        else if (score >= 60) stars = '⭐⭐⭐⭐';
        levelStarsDisplay.textContent = stars;
    }

    // ==========================================================
    // HALAMAN HASIL AKHIR GAME (SETELAH LEVEL 4)
    // ==========================================================
    function showFinalResultScreen() {
        showScreen(screenFinalResult);

        const totalAttempts = state.finalCorrect + state.finalWrong;
        const percent = Math.round((state.finalCorrect / (totalAttempts || 1)) * 100);
        const finalTotalScore = state.finalCorrect * 5; // Maksimal 100

        finalScore.textContent = finalTotalScore;
        finalCorrect.textContent = state.finalCorrect;
        finalWrong.textContent = state.finalWrong;
        finalPercent.textContent = `${percent}%`;

        let stars = '⭐⭐⭐⭐⭐';
        if (percent >= 90) stars = '⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐';
        else if (percent >= 70) stars = '⭐⭐⭐⭐⭐⭐⭐';

        finalStarsDisplay.textContent = stars;
    }

});