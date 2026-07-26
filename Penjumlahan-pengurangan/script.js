function keluarAplikasi() {
  // Mencoba menutup tab/jendela (berfungsi jika dibuka melalui window.open atau browser pendukung)
  if (confirm("Apakah Anda yakin ingin keluar dari permainan?")) {
    window.close();
    // Fallback jika window.close() diblokir oleh kebijakan keamanan browser
    alert("Silakan tutup tab atau aplikasi browser Anda untuk keluar.");
  }
}

document.getElementById("btn-home").addEventListener("click", () => {
    window.location.href = "../index.html";
});