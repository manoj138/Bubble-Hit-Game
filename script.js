let boxElement = document.querySelector(".box-section");
let hitElement = document.querySelector(".hitValue");
let timeElement = document.querySelector(".timer");
let scoreElement = document.querySelector(".score");
let highScoreElement = document.querySelector(".highScore");
let randomNumber;

let audioElement = new Audio("./assets/theame.mp3");
let clickElement = new Audio("./assets/click.mp3");
let wrongElement = new Audio("./assets/wrong.mp3");
let celebrateElement = new Audio("./assets/celebrate.mp3"); 
let badLuckElement = new Audio("./assets/badLuck.mp3");

const colors = [
  "#ff8a65",
  "#4db6ac",
  "#ba68c8",
  "#fdd835",
  "#e57373",
  "#64b5f6",
];

let hitValue;
let score = 0;
let gameActive = true;
audioElement.play();
function mainFuction() {
  if (!gameActive) return;
  audioElement.play();
 
  boxElement.innerHTML = "";
  for (let i = 0; i < 90; i++) {
    let circleElement = document.createElement("div");
    circleElement.classList.add("circle");
    randomNumber = Math.floor(Math.random() * 10);
    circleElement.textContent = `${randomNumber}`;
    circleElement.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    boxElement.appendChild(circleElement);
  }
}

function setHitValue() {
  hitValue = Math.floor(Math.random() * 10);
  hitElement.textContent = `Hit Value : ${hitValue}`;
}

function timerFunction() {
  let time = 60;
  let timing = setInterval(() => {
    timeElement.textContent = `Time : ${time}s`;
    time--;
    if (time < 0) {
      clearInterval(timing);
      gameActive = false;
      showFinalScore();
    }
  }, 1000);
}


let highScoreValue = parseInt(localStorage.getItem('highScoreValue')) || 0;


highScoreElement.textContent = `High Score : ${highScoreValue}`;


function scoreFunction() {
  boxElement.addEventListener("click", (event) => {
    if (!gameActive) return;
    
    if (event.target.classList.contains("circle")) {
      let clickedNumber = Number(event.target.textContent);
      clickElement.play();
      
      if (clickedNumber === hitValue) {
        score += 10;
      } else {
        score -= 5;
        wrongElement.play();
      }

      if (score > highScoreValue) {
        highScoreValue = score;
        localStorage.setItem('highScoreValue', highScoreValue);
      }

      scoreElement.textContent = `Score : ${score}`;
      setHitValue();
      mainFuction();
    }
  });
}

function showFinalScore() {
  boxElement.innerHTML = `
    <video class="game-over-video" autoplay muted loop>
        <source src="./assets/celebration.mp4" type="video/mp4">
    </video>
    <div class="game-over">
        <h1>${score > 0 ? "🎉 Congratulations! 🎉" : "😢 Better luck, try again!"}</h1>
        <h2>Your Score: ${score}</h2>
    </div>
  `;

  if (score > 0) {
    celebrateElement.play();
  } else {
    badLuckElement.play();
  }
  audioElement.pause();

  hitElement.textContent = "Hit Value : 0";
  timeElement.textContent = "Time : 0";

  let btnElement = document.createElement("button");
  btnElement.classList.add("btn");
  btnElement.textContent = "Restart";
  boxElement.appendChild(btnElement);

  btnElement.addEventListener("click", () => {
    score = 0;
    gameActive = true;
    scoreElement.textContent = `Score : ${score}`;
    mainFuction();
    setHitValue();
    timerFunction();
  });
}

mainFuction();
setHitValue();
timerFunction();
scoreFunction();
