let startTime;
let elapsedTime = 0;
let timerInterval;

function updateTime() {
  const timeNow = Date.now() - startTime + elapsedTime;
  const hours = Math.floor(timeNow / (1000 * 60 * 60));
  const minutes = Math.floor((timeNow % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeNow % (1000 * 60)) / 1000);

  document.querySelector(".timer").textContent = `${String(hours).padStart(
    2,
    "0"
  )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

document.getElementById("start").addEventListener("click", function () {
  if (!timerInterval) {
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 1000);
  }
});

document.getElementById("stop").addEventListener("click", function () {
  if (timerInterval) {
    elapsedTime += Date.now() - startTime;
    clearInterval(timerInterval);
    timerInterval = null;
  }
});

document.getElementById("reset").addEventListener("click", function () {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  document.querySelector(".timer").textContent = "00:00:00";
});
