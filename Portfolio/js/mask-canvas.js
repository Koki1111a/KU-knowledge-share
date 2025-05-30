const images = [
  'https://kyoto-sakura.net/img/ujigawa-haryu15.jpg',
  // '../images/hero-sumemr.jpg',
  './images/hero-autumn.jpg',
  './images/hero-winter.jpg'
];

let current = 0;
const heroSection = document.getElementById('hero-section');

// 初期表示
heroSection.style.backgroundImage = `url(${images[current]})`;

setInterval(() => {
  current = (current + 1) % images.length;
  heroSection.style.backgroundImage = `url(${images[current]})`;
}, 5000); // 5000ms = 5秒ごとに切り替え