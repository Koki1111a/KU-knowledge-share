const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let waitingPlayer = null;

io.on('connection', (socket) => {
  console.log('ユーザー接続: ' + socket.id);

  if (waitingPlayer) {
    const opponent = waitingPlayer;
    waitingPlayer = null;

    // お互いの相手IDを保存
    socket.opponent = opponent;
    opponent.opponent = socket;

    // クイズ開始メッセージ送信
    const question = "日本の首都は？";
    socket.emit("quizStart", question);
    opponent.emit("quizStart", question);
  } else {
    waitingPlayer = socket;
    socket.emit("waiting", "マッチング中です…");
  }

  socket.on("answer", (ans) => {
    const result = ans === "東京" ? "正解" : "不正解";
    socket.emit("result", result);
    if (socket.opponent) {
      socket.opponent.emit("opponentResult", result);
    }
  });

  socket.on("disconnect", () => {
    if (waitingPlayer === socket) {
      waitingPlayer = null;
    }
  });
});

server.listen(3000, () => {
  console.log('サーバー起動 http://localhost:3000');
});
