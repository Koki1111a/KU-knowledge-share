const images = [
  'https://kyoto-sakura.net/img/ujigawa-haryu15.jpg',
  './images/hero-autumn.jpg'
];

let current = 0;
const heroSection = document.getElementById('hero-section');

function changeBackground() {
  heroSection.style.backgroundImage = `url(${images[current]})`;
  current = (current + 1) % images.length;
}

// 初期表示
changeBackground();

// 5秒ごとに変更
setInterval(changeBackground, 5000);
