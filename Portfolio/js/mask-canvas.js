const canvas = document.getElementById('maskCanvas');
const ctx = canvas.getContext('2d');

function setupContext() {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 80;
  ctx.strokeStyle = 'rgba(0,0,0,1)';
}

function resizeCanvas() {
  // 保存するために一時画像データを取得
  const savedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  // 初期化（白塗り）
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 設定を再適用
  setupContext();

  // 描画内容の復元（必要な場合のみ）
  // ctx.putImageData(savedImage, 0, 0); // サイズ変わってたらズレるので注意
}

window.addEventListener('resize', resizeCanvas);

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
setupContext();

let drawing = false;
let lastX = null;
let lastY = null;

document.addEventListener('mousedown', (e) => {
  drawing = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

document.addEventListener('mouseup', () => {
  drawing = false;
  lastX = null;
  lastY = null;
});

document.addEventListener('mousemove', (e) => {
  if (!drawing) return;
  const x = e.clientX;
  const y = e.clientY;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastX = x;
  lastY = y;
});