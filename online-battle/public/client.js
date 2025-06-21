const socket = io();

socket.on("waiting", (msg) => {
  document.getElementById("status").innerText = msg;
});

socket.on("quizStart", (question) => {
  document.getElementById("status").innerText = "対戦開始！";
  document.getElementById("question").innerText = question;
  document.getElementById("question").style.display = "block";
  document.getElementById("answerInput").style.display = "inline";
  document.querySelector("button").style.display = "inline";
});

function sendAnswer() {
  const ans = document.getElementById("answerInput").value;
  socket.emit("answer", ans);
}

socket.on("result", (res) => {
  alert("あなたの答え: " + res);
});

socket.on("opponentResult", (res) => {
  console.log("相手の答え: " + res);
});
