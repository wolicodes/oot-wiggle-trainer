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

// Functions
function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const answer = parseInt(formData.get("frame"));

  if (answer != null) {
    if (answer === randomIndex) {
      score++;
      scoreElem.innerHTML = `Answered correctly ${score} ${
        score > 1 ? "times" : "time"
      }!`;
    }
    currentRound++;
    if (currentRound > rounds) {
      alert(`You scored ${score} out of ${rounds}!`);
      score = 0;
      currentRound = 1;
      scoreElem.innerHTML = "";
    }
    randomVid.currentTime = 0;
    randomVid.style.width = "0";
    randomIndex = Math.floor(Math.random() * vids.length);
    randomVid = vids[randomIndex];
    randomVid.style.width = "100%";
    form.reset();
    currentRoundElem.innerHTML = currentRound;
  }
}
