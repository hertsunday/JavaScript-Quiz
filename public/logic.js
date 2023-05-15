const startScreenWrap = document.querySelector("#start-screen");
const questionsWrap = document.querySelector("#questions");
const endScreenWrap = document.querySelector("#end-screen");
const timerWrap = document.querySelector(".timer");
const timerNumber = document.querySelector("#time");
const questionTitle = document.querySelector("#question-title");
const choices = document.querySelector("#choices");
const highScores = document.querySelector(".scores");
const initials = document.querySelector("#initials");
const startBtn = document.querySelector("#start");
const submitBtn = document.querySelector("#submit");
const feedback = document.querySelector("#feedback");
const finalScoreSpan = document.querySelector("#final-score");
const questionNumber = document.querySelector("#question-number");
const correctAnswersDisplay = document.querySelector("#correct-answers-total");
const progressBarFull = document.querySelector(".progressBarFull");

let questionCount = 0;
let maxNumberOfQuestions = 5;
let secondsCount = maxNumberOfQuestions * 10;
let time;
let availableQuestions = [];
let displayQuestionNumber;
let correctAnswersTotal = 0;

startTimer = () => {
  secondsCount--;
  timerNumber.innerText = secondsCount;

  if (secondsCount <= 0) {
    endGame();
  }
};

startBtn.onclick = function startGame() {
  questionCount = 0;
  startScreenWrap.classList.add("hide");
  highScores.classList.add("hide");
  questionsWrap.classList.remove("hide");
  timerWrap.classList.remove("hide");

  displayQuestionNumber = `Question: ${questionCount + 1}/${maxNumberOfQuestions}`;
  questionNumber.innerHTML = displayQuestionNumber;

  questionNumber.setAttribute("style", "color: var(--highlight-turqoise);");

  availableQuestions = [...questions];

  time = setInterval(startTimer, 1000);
  timerNumber.innerText = secondsCount;

  getQuestionAndChoices();
};

getQuestionAndChoices = () => {
  questionCount++;
  progressBarFull.style.width = `${(questionCount / maxNumberOfQuestions) * 100}%`;

  this.questionIndex = Math.floor(Math.random() * availableQuestions.length);
  let currentQuestion = availableQuestions[questionIndex];

  questionTitle.innerText = currentQuestion.title;
  choices.innerText = "";

  currentQuestion.choices.forEach((choice) => {
    let choiceButton = document.createElement("button");
    choiceButton.classList.add("button2");
    choiceButton.setAttribute("value", choice);
    choiceButton.innerText = choice;
    choices.appendChild(choiceButton);
    choiceButton.onclick = checkAnswer;
  });
};

function checkAnswer() {
  let timePenalty = 10;

  displayQuestionNumber = `Question: ${questionCount + 1}/${maxNumberOfQuestions}`;
  questionNumber.innerHTML = displayQuestionNumber;

  let incorrectAudio = new Audio("incorrect.wav");
  let correctAudio = new Audio("correct.wav");

  if (this.value === availableQuestions[questionIndex].answer) {
    correctAnswersTotal++;

    feedback.innerText = "Well done, that was correct!";
    feedback.setAttribute("style", "color: --highlight-turqoise; border-top: solid 2px --highlight-turqoise;");
    correctAudio.play();
  } else {
    secondsCount -= timePenalty;
    incorrectAudio.play();
    timerNumber.innerText = secondsCount;

    feedback.innerText = "Unlucky, that was incorrect!";
    feedback.setAttribute("style", "color: red; border-top: solid 2px red;");
  }

  correctAnswersDisplay.innerText = `Total correct answers: ${correctAnswersTotal} out of ${maxNumberOfQuestions} questions`;

  feedback.setAttribute("class", "feedback");
  setTimeout(() => {
    feedback.setAttribute("class", "feedback hide");
  }, 700);

  availableQuestions.splice(questionIndex, 1);

  if (questionCount === maxNumberOfQuestions) {
    endGame();
  } else {
    getQuestionAndChoices();
  }
}

endGame = () => {
  endScreenWrap.classList.remove("hide");
  questionsWrap.classList.add("hide");
  startScreenWrap.classList.add("hide");
  timerWrap.classList.add("hide");
  submitBtn.classList.add("button");

  clearInterval(time);

  if (secondsCount < 0) {
    secondsCount = 0;
  }

  finalScoreSpan.textContent = secondsCount;
};

submitBtn.onclick = function getScores() {
  // Get user score and initials
  let userScore = secondsCount;
  let userInitials = initials.value;
  let scores = JSON.parse(localStorage.getItem("scores")) || [];

  let score = {
    name: userInitials,
    score: userScore,
  };

  scores.push(score);
  scores.sort((a, b) => b.score - a.score);
  scores.splice(5);

  localStorage.setItem("scores", JSON.stringify(scores));
  location.assign("leaderboard.html");
};
