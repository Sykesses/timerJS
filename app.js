let startTime;
let elapsedTime = 0;
let timerInterval;
let countdownDuration = 0;
let isCountdownMode = false;
const alarmSound = new Audio("./sounds/end.mp3");

function updateTime() {
  if (isCountdownMode) {
    countdownDuration -= 1000;
    if (countdownDuration <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      countdownDuration = 0;
      alarmSound.play();
      alert("Таймер завершен!");
    }
  } else {
    const timeNow = Date.now() - startTime + elapsedTime;
    displayTime(timeNow);
  }
}

function displayTime(time) {
  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  document.querySelector(".timer").textContent = `${String(hours).padStart(
    2,
    "0"
  )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

document.getElementById("start").addEventListener("click", function () {
  if (isCountdownMode) {
    const hours = parseInt(document.getElementById("hours").value || 0);
    const minutes = parseInt(document.getElementById("minutes").value || 0);
    const seconds = parseInt(document.getElementById("seconds").value || 0);
    countdownDuration = (hours * 3600 + minutes * 60 + seconds) * 1000;
    if (countdownDuration > 0 && !timerInterval) {
      timerInterval = setInterval(updateTime, 1000);
    }
  } else if (!timerInterval) {
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
  countdownDuration = 0;
  document.querySelector(".timer").textContent = "00:00:00";
});

document
  .getElementById("stopwatch-mode")
  .addEventListener("click", function () {
    isCountdownMode = false;
    document.querySelector(".countdown-input").style.display = "none";
  });

document.getElementById("timer-mode").addEventListener("click", function () {
  isCountdownMode = true;
  document.querySelector(".countdown-input").style.display = "block";
});
