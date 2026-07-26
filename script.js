/**
 * Game Edukasi Matematika - Homepage Script
 * Fokus: Visual Feedback, Interaksi Inklusif (ABK/Tuli), dan Navigasi Modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi Seluruh Fungsi
  initMaterialCardInteractions();
  initBottomNavigation();
  initAccessibilityEnhancements();
});

/* ==========================================================================
   1. INTERAKSI KARTU MATERI & TOMBOL MULAI
   ========================================================================== */
function initMaterialCardInteractions() {
  const cards = document.querySelectorAll('.material-card');

  cards.forEach((card) => {
    const btnStart = card.querySelector('.btn-start');
    const materialTitle = card.querySelector('.material-title')?.textContent || 'Materi';

    // Klik pada Seluruh Area Kartu
    card.addEventListener('click', (e) => {
      // Mencegah double event jika tombol 'Mulai' di dalam kartu yang diklik langsung
      if (e.target.closest('.btn-start')) return;

      triggerVisualClickEffect(card);
      handleMaterialSelection(materialTitle);
    });

    // Klik khusus pada Tombol 'Mulai'
    if (btnStart) {
      btnStart.addEventListener('click', (e) => {
        e.stopPropagation(); // Mencegah bubbling ke card
        triggerVisualClickEffect(btnStart);
        handleMaterialSelection(materialTitle);
      });
    }
  });
}

/**
 * Memproses Pemilihan Materi
 * @param {string} title - Nama materi yang dipilih
 */
function handleMaterialSelection(title) {
  // Efek Notifikasi Visual Sederhana (Pop-up Toast)
  showVisualToast(`Membuka permainan: ${title} 🚀`);

  /* 
   * INTEGRASI MENDATANG:
   * Tempatkan logika navigasi ke halaman game di sini.*/
   const halaman = {
    "Bilangan 1–1000": "Bilangan/index.html",
    "Penjumlahan & Pengurangan": "Penjumlahan-pengurangan/index.html",
    "Geometri": "geometri/index.html",
    "Pengukuran": "pengukuran-panjang/index.html",
    "Pecahan": "pecahan/index.html",
    "Waktu & Berat": "waktu-dan-berat/index.html",
    "Diagram": "diagram/index.html"
};

window.location.href = halaman[title];
   
}

/* ==========================================================================
   2. BOTTOM NAVIGATION & MODAL SYSTEM
   ========================================================================== */
function initBottomNavigation() {
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      triggerVisualClickEffect(item);

      const navId = item.id;
      switch (navId) {
        case 'nav-prestasi':
          openInfoModal('🏆 Prestasi Saya', 'Kamu telah mengumpulkan bintang dan menyelesaikan game. Terus tingkatkan prestasimu!');
          break;
        case 'nav-petunjuk':
          openInfoModal('📖 Petunjuk Permainan', '1. Pilih salah satu materi matematika.\n2. Tekan tombol MULAI.\n3. Selesaikan permainan dan kumpulkan bintang!');
          break;
        case 'nav-pengaturan':
          openInfoModal('⚙ Pengaturan', 'Pengaturan tampilan dan reset progres permainan.');
          break;
        case 'nav-tentang':
          openInfoModal('ℹ Tentang Aplikasi', 'Game Edukasi Matematika v1.0\nDirancang ramah anak dan inklusif untuk siswa SDLB.');
          break;
        default:
          break;
      }
    });
  });
}

/* ==========================================================================
   3. VISUAL FEEDBACK & ACCESSIBILITY HELPERS (Khusus UX ABK / Tuli)
   ========================================================================== */

/**
 * Memberikan animasi efek tekan/membal (Bounce/Scale) saat elemen diklik
 * @param {HTMLElement} element - Elemen UI yang diklik
 */
function triggerVisualClickEffect(element) {
  element.style.transition = 'transform 0.1s ease';
  element.style.transform = 'scale(0.93)';

  setTimeout(() => {
    element.style.transform = '';
  }, 120);
}

/**
 * Menampilkan pesan visual singkat (Toast) tanpa bergantung pada efek suara
 * @param {string} message - Pesan yang ingin ditampilkan
 */
function showVisualToast(message) {
  // Hapus toast lama jika masih ada
  const existingToast = document.querySelector('.visual-toast');
  if (existingToast) existingToast.remove();

  // Buat elemen Toast baru
  const toast = document.createElement('div');
  toast.className = 'visual-toast';
  toast.textContent = message;

  // Styling Dinamis Toast
  Object.assign(toast.style, {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%) translateY(-20px)',
    backgroundColor: '#0C61C9',
    color: '#FFFFFF',
    padding: '12px 24px',
    borderRadius: '30px',
    fontWeight: '800',
    fontFamily: 'Fredoka, Nunito, sans-serif',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    zIndex: '1000',
    opacity: '0',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    pointerEvents: 'none',
  });

  document.body.appendChild(toast);

  // Trigger Animasi Masuk
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  // Hilangkan Toast otomatis setelah 2.5 detik
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(-20px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/**
 * Menampilkan Modal Pop-up Visual untuk Menu Bawah
 * @param {string} title - Judul Modal
 * @param {string} content - Isi Teks Modal
 */
function openInfoModal(title, content) {
  // Hapus modal lama jika ada
  const existingModal = document.querySelector('.custom-modal-backdrop');
  if (existingModal) existingModal.remove();

  // Template HTML Modal
  const modalHTML = `
    <div class="custom-modal-backdrop" style="
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000; opacity: 0; transition: opacity 0.2s ease; padding: 20px;
    ">
      <div class="custom-modal-content" style="
        background: #FFFFFF; border-radius: 24px; padding: 24px;
        max-width: 400px; width: 100%; text-align: center;
        border: 4px solid #0C61C9; box-shadow: 0 20px 40px rgba(0,0,0,0.25);
        transform: scale(0.8); transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      ">
        <h2 style="font-family: Fredoka, sans-serif; color: #0C61C9; margin-bottom: 12px; font-size: 1.5rem;">${title}</h2>
        <p style="font-family: Fredoka, sans-serif; color: #475569; font-size: 1rem; line-height: 1.5; white-space: pre-line; margin-bottom: 20px;">${content}</p>
        <button id="close-modal-btn" style="
          background: #52B81F; color: #FFFFFF; border: none; padding: 10px 28px;
          border-radius: 50px; font-family: Fredoka, sans-serif; font-weight: 800;
          font-size: 1rem; cursor: pointer; box-shadow: 0 4px 0 #388E3C;
        ">TUTUP OK 👍</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const backdrop = document.querySelector('.custom-modal-backdrop');
  const modalContent = backdrop.querySelector('.custom-modal-content');
  const btnClose = backdrop.querySelector('#close-modal-btn');

  // Animasi Masuk Modal
  requestAnimationFrame(() => {
    backdrop.style.opacity = '1';
    modalContent.style.transform = 'scale(1)';
  });

  // Fungsi Tutup Modal
  const closeModal = () => {
    backdrop.style.opacity = '0';
    modalContent.style.transform = 'scale(0.8)';
    setTimeout(() => backdrop.remove(), 200);
  };

  btnClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
}

function initAccessibilityEnhancements() {
  // Mengaktifkan navigasi keyboard (Enter / Space) yang memberikan respons visual sama
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement) {
      if (document.activeElement.classList.contains('material-card') || 
          document.activeElement.classList.contains('btn-start') ||
          document.activeElement.classList.contains('nav-item')) {
        triggerVisualClickEffect(document.activeElement);
      }
    }
  });
}