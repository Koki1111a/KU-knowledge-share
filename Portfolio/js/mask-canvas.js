document.addEventListener("DOMContentLoaded", function () {
  // ローディング開始時に body に 'loading' クラスを付けて固定
  document.body.classList.add('loading');

  Pace.start({
    ajax: {
      trackMethods: ["GET", "POST"],
    },
    startOnPageLoad: true,
    restartOnPushState: true,
    minTime: 3000
  });

  // ローディング完了後の処理
  Pace.on('done', function () {
    // スクロールロック解除
    

    // メインコンテンツをフェードイン
    const mainContent = document.querySelector(".main-content");
    if (mainContent) {
      mainContent.style.opacity = "1";
      document.body.classList.remove('loading');
    }

    // 背景画像切り替えロジック
    const images = [
      './images/hero-autumn.jpg',
      'https://kyoto-sakura.net/img/ujigawa-haryu15.jpg',
      './images/hero-winter.jpg'
    ];
    let current = 0;
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.style.backgroundImage = `url(${images[current]})`;

      setInterval(() => {
        current = (current + 1) % images.length;
        heroSection.style.backgroundImage = `url(${images[current]})`;
      }, 4000);
    }
  });
});


/*About section*/
document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.querySelector('.about-section');

  window.addEventListener('scroll', () => {
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top <= windowHeight * 0.8) {
      aboutSection.classList.add('visible');
    }
  });
});

/*About section underline */
document.addEventListener("DOMContentLoaded", function () {
  const target = document.querySelector('.underline');

  window.addEventListener('scroll', () => {
    const rect = target.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top <= windowHeight * 0.8) {
      target.classList.add('visible');
    }
  });
});


/* card-section */
window.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('track');
  const slider = document.querySelector('.slider');

  if (!track || !slider) return;

  // 内容複製でループ風
  track.innerHTML += track.innerHTML;

  let scrollAmount = 0;
  let animationId = null;
  let isPaused = false;

  function autoScroll() {
    if (!isPaused) {
      scrollAmount += 1;
      slider.scrollLeft = scrollAmount;

      if (scrollAmount >= track.scrollWidth / 2) {
        scrollAmount = 0;
      }
    }
    animationId = requestAnimationFrame(autoScroll);
  }

  // 初回実行
  autoScroll();

  // ホバー時に一時停止／再開
  track.addEventListener('mouseover', () => {
    isPaused = true;
  });

  track.addEventListener('mouseout', () => {
    isPaused = false;
  });
});

