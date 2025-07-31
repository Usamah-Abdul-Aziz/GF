const flowerContainer = document.getElementById("flower-container");
const heartContainer = document.getElementById("heart-container");
const bloomContainer = document.getElementById("bloom-container");

// Kelopak bunga jatuh
function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("flower");
  petal.style.left = Math.random() * window.innerWidth + "px";
  petal.style.animationDuration = 3 + Math.random() * 5 + "s";
  flowerContainer.appendChild(petal);

  setTimeout(() => petal.remove(), 8000);
}

// Hati terbang
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.animationDuration = 5 + Math.random() * 5 + "s";
  heartContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 10000);
}

// Helper: random dari array
function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Bunga mekar acak, lebih hidup & variatif
function createBloomFlower(x = null, y = null) {
  const colorSets = [
    [["#fff0f5", "#f27ba1"], ["#ffe4e1", "#e05588"]],
    [["#e0c3fc", "#8ec5fc"], ["#fbc2eb", "#a6c1ee"]],
    [["#f9d29d", "#ffd6e0"], ["#f6e6b4", "#ffd700"]],
    [["#c1f7d3", "#7ed6a7"], ["#fbc2eb", "#a6c1ee"]],
    [["#f6e6b4", "#ffd700"], ["#ffe4e1", "#e05588"]],
  ];
  const colorSet = randomFrom(colorSets);
  const [color1, color2] = randomFrom(colorSet);

  // Kelopak 5-8, sudut acak, bentuk kelopak acak
  const kelopak = 5 + Math.floor(Math.random() * 4); // 5-8 kelopak
  const angleStep = 360 / kelopak;
  const petalLength = 28 + Math.random() * 18;
  const petalWidth = 14 + Math.random() * 12;

  const bloom = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  bloom.setAttribute("viewBox", "0 0 100 100");
  bloom.classList.add("bloom-flower");

  // Defs gradasi unik tiap bunga
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const gradId = "petalGradient" + Math.random();
  const gradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
  gradient.setAttribute("id", gradId);
  gradient.setAttribute("cx", "50%");
  gradient.setAttribute("cy", "50%");
  gradient.setAttribute("r", "70%");
  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", color1);
  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", color2);
  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);
  bloom.appendChild(defs);

  // Kelopak bunga dengan bentuk elips dan rotasi
  for (let i = 0; i < kelopak; i++) {
    const angle = i * angleStep + (Math.random() * 10 - 5); // sedikit variasi sudut
    const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    ellipse.setAttribute("cx", "50");
    ellipse.setAttribute("cy", String(50 - petalLength / 2 + Math.random() * 4 - 2)); // sedikit variasi posisi
    ellipse.setAttribute("rx", String(petalWidth));
    ellipse.setAttribute("ry", String(petalLength));
    ellipse.setAttribute("fill", `url(#${gradId})`);
    ellipse.setAttribute("opacity", "0.93");
    ellipse.setAttribute("filter", "drop-shadow(0 0 10px #fff8)");
    ellipse.setAttribute("transform", `rotate(${angle} 50 50)`);
    bloom.appendChild(ellipse);
  }

  // Tengah bunga dengan efek glowing
  const center = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  center.setAttribute("cx", "50");
  center.setAttribute("cy", "50");
  center.setAttribute("r", 12 + Math.random() * 5);
  center.setAttribute("fill", randomFrom(["#ffe066", "#fffbe0", "#fff0a0", "#fff7c2", "#fff9e3"]));
  center.setAttribute("stroke", color2);
  center.setAttribute("stroke-width", "2.2");
  center.setAttribute("filter", "drop-shadow(0 0 12px #fff8)");
  bloom.appendChild(center);

  // Posisi random atau klik
  if (x === null || y === null) {
    x = Math.random() * (window.innerWidth - 80);
    y = Math.random() * (window.innerHeight - 80);
  } else {
    x = x - 40; y = y - 40;
  }
  bloom.style.left = `${x}px`;
  bloom.style.top = `${y}px`;

  bloomContainer.appendChild(bloom);

  // Efek suara lembut (aktifkan jika ingin)
  // let audio = new Audio("https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa6c8e.mp3");
  // audio.volume = 0.08;
  // audio.play();

  setTimeout(() => bloom.remove(), 4000);
}

// Bunga mekar saat klik background
document.body.addEventListener("click", function(e) {
  // Hanya jika klik di area kosong, bukan tombol/popup
  if (
    e.target.classList.contains("content") ||
    e.target.classList.contains("flower-container") ||
    e.target.classList.contains("heart-container") ||
    e.target.id === "bloom-container" ||
    e.target === document.body
  ) {
    createBloomFlower(e.clientX, e.clientY);
  }
});

// Kutipan cinta acak
const quotes = [
  "“Kamu adalah alasan aku tersenyum setiap hari.”",
  "“Cinta kita seperti bunga, selalu tumbuh dan mekar.”",
  "“Bersamamu, dunia terasa lebih indah.”",
  "“Hatiku selalu pulang padamu.”",
  "“Kamu adalah rumah bagi segala bahagiaku.”",
  "“Terima kasih sudah menjadi cahaya di hidupku.”",
  "“Cinta ini sederhana: aku dan kamu, selamanya.”"
];
function showRandomQuote() {
  const el = document.getElementById('random-quote');
  el.style.opacity = 0;
  setTimeout(() => {
    el.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    el.style.opacity = 1;
  }, 300);
}
setInterval(showRandomQuote, 5000);
showRandomQuote();

// Popup motivasi/cinta acak
const miniQuotes = [
  "Jangan lupa bahagia hari ini, sayang 🌸",
  "Kamu selalu spesial di hatiku 💖",
  "Semoga harimu seindah senyummu!",
  "Semoga cepet sembuh yaaa babyy.",
  "Teruslah mekar seperti bunga favoritmu!",
  "Keep be yourself apapun kata orang, I love the way you are.",
  "Setiap detik bersamamu adalah hadiah."
];
function showMiniPopup() {
  const miniPopup = document.getElementById('mini-popup');
  const miniText = document.getElementById('mini-popup-text');
  miniText.textContent = miniQuotes[Math.floor(Math.random() * miniQuotes.length)];
  miniPopup.classList.add('show');
  miniPopup.classList.remove('hidden');
  setTimeout(closeMiniPopup, 2500);
}
function closeMiniPopup() {
  const miniPopup = document.getElementById('mini-popup');
  miniPopup.classList.remove('show');
  setTimeout(() => miniPopup.classList.add('hidden'), 400);
}

// Bunga mekar saat klik background + popup motivasi acak
document.body.addEventListener("click", function(e) {
  if (
    e.target.classList.contains("content") ||
    e.target.classList.contains("flower-container") ||
    e.target.classList.contains("heart-container") ||
    e.target.id === "bloom-container" ||
    e.target === document.body
  ) {
    createBloomFlower(e.clientX, e.clientY);
    if (Math.random() < 0.33) showMiniPopup();
  }
});

// Tutup popup jika klik di luar konten
document.getElementById("letter-popup").addEventListener("click", function(e) {
  if (e.target === this) closeLoveLetter();
});
document.getElementById("mini-popup").addEventListener("click", function(e) {
  if (e.target === this) closeMiniPopup();
});

// Popup surat cinta otomatis saat scroll ke bawah (sekali saja)
let popupOpened = false;
window.addEventListener('scroll', () => {
  if (!popupOpened && window.scrollY > window.innerHeight / 3) {
    showLoveLetter();
    popupOpened = true;
  }
});

// Popup surat cinta: buka/tutup
function showLoveLetter() {
  document.getElementById("letter-popup").classList.remove("hidden");
  setTimeout(() => {
    document.getElementById("letter-popup").classList.add("animated-popup");
    // Efek bunga mekar di sekitar popup
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createBloomFlower(
        window.innerWidth / 2 + (Math.random() * 120 - 60),
        window.innerHeight / 2 + (Math.random() * 120 - 60)
      ), i * 200);
    }
  }, 50);
}
function closeLoveLetter() {
  document.getElementById("letter-popup").classList.add("hidden");
  document.getElementById("letter-popup").classList.remove("animated-popup");
}

// Jalankan animasi
setInterval(createPetal, 300);
setInterval(createHeart, 800);
setInterval(createBloomFlower, 1500);

// Hilangkan pesan fade-in setelah animasi selesai
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const msg = document.getElementById('fade-in-message');
    if (msg) msg.style.display = 'none';
  }, 3200);
});
