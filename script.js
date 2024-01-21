// Video setup
const vids = [
  document.getElementById("video-0"),
  document.getElementById("video-1"),
  document.getElementById("video-2"),
  document.getElementById("video-3"),
  document.getElementById("video-4"),
  document.getElementById("video-5"),
];

for (let vidElem of vids) {
  vidElem.volume = 0.1;
}

let randomIndex = Math.floor(Math.random() * vids.length);
let randomVid = vids[randomIndex];
randomVid.style.width = "100%";

// Score setup
let score = 0;
let currentRound = 1;
const rounds = 10;

const currentRoundElem = document.getElementById("current-round");
currentRoundElem.innerHTML = currentRound;

const totalRoundsElem = document.getElementById("total-rounds");
totalRoundsElem.innerHTML = rounds;

const scoreElem = document.getElementById("score");

// other
const submitButton = document.getElementById("submit-btn");
let isBetweenRounds = false;

// Functions
function resetGame() {
  score = 0;
  currentRound = 1;
  scoreElem.innerHTML = "";
  currentRoundElem.innerHTML = currentRound;
  isBetweenRounds = false;
}

function nextSlide() {
  randomVid.currentTime = 0;
  randomVid.style.width = "0";
  randomIndex = Math.floor(Math.random() * vids.length);
  randomVid = vids[randomIndex];
  randomVid.style.width = "100%";
  currentRound++;
  if (currentRound > rounds) {
    alert(`You scored ${score} out of ${rounds}!`);
    resetGame();
    return;
  }
  currentRoundElem.innerHTML = currentRound;
}

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const radioButtons = form.querySelectorAll('input[type="radio"]');
  const labels = form.querySelectorAll(".answer-label");

  if (isBetweenRounds) {
    isBetweenRounds = false;
    submitButton.innerHTML = "Check your answer";
    submitButton.classList.remove("next-slide");
    submitButton.classList.add("check-answer");
    radioButtons.forEach((radioButton) => {
      radioButton.disabled = false;
      radioButton.style.opacity = "1";
    });
    labels.forEach((label) => {
      label.style.color = "white";
    });
    nextSlide();
    form.reset();
    return;
  }

  const formData = new FormData(form);
  const answer = parseInt(formData.get("frame"));

  if (!isNaN(answer)) {
    if (answer === randomIndex) {
      score++;
      scoreElem.innerHTML = `Answered correctly ${score} ${
        score > 1 ? "times" : "time"
      }!`;
    } else {
      document.getElementById(`answer-${answer}`).style.color = "red";
    }
    document.getElementById(`answer-${randomIndex}`).style.color = "green";
    isBetweenRounds = true;
    submitButton.innerHTML = "Next slide";
    submitButton.classList.remove("check-answer");
    submitButton.classList.add("next-slide");
    radioButtons.forEach((radioButton) => {
      radioButton.disabled = true;
      radioButton.style.opacity = "0.3";
    });
    form.reset();
  }
}
