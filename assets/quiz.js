// Declare game logic variables
let numOfQuestions = questions.length;

let currentQuestionIndex = 0;
let time = numOfQuestions * 11;

let timerInterval;
let score = numOfQuestions;

let scorePercent;

// Assigning variables accessed in DOM id elements

let answerEl = document.getElementById("answers");
let endScreenEl = document.getElementById("end-screen");
let highScoreHelperEl = document.getElementById("highScore-helper")
let homePage = document.getElementById("home-page");
let initialsEl = document.getElementById("user-initials");
let questionEl = document.getElementById("questions");
let questionText = document.getElementById("question-text");
let quizScoreResultEl = document.getElementById("quiz-score");
let quizTimeResultEl = document.getElementById("quiz-time");
let responseEl = document.getElementById("response");
let quizScorePercentageResultEl = document.getElementById(
  "quiz-score-percent");
let startBtn = document.getElementById("start-btn");
let submitBtn = document.getElementById("submit");
let timerEl = document.getElementById("time");




// Upon Start Button click 
// hide home-page, show questions, start timer 
function startQuiz() {
  homePage.setAttribute("class", "hide");
  questionEl.removeAttribute("class");
  timerCountdown();
  getQuestion();
}

function timerCountdown() {
  timerInterval = setInterval(function () {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
      time = 0;
      timerEl.textContent = time;
      stopQuiz();
    }
  }, 1000);
}

function getQuestion() {
  let currentQuestion = questions[currentQuestionIndex];

  
  questionText.textContent = currentQuestion.text;

  // Clear any old question answers
  answerEl.innerHTML = "";

  // Dynamically add a button to select each answer
  currentQuestion.answers.forEach(listAnswers);

  function listAnswers(answer, index) {
    let answerBtn = document.createElement("button");
    answerBtn.setAttribute("class", "answer");
    answerBtn.setAttribute("value", answer);

    // increase index so the display starts at 1 and not zero with a )
    answerBtn.innerHTML += index + 1 + ") " + answer;

    // Make sure the page is listening for a click from the user
    answerBtn.onclick = answerClick;

    // display on the page
    answerEl.appendChild(answerBtn);
  }
}

function answerClick() {
  if (this.value !== questions[currentQuestionIndex].correctAnswer) {
    //penalize time and update timer on page
    time -= 10;
    score -= 1;

    if (time < 0) {
      time = 0;
    }

    timerEl.textContent = time;
    responseEl.setAttribute("class", "response");
    questionEl.setAttribute("class", "hide");
    setTimeout(function () {
      responseEl.setAttribute("class", "response hide");
    }, 1000);

    responseEl.textContent = "Nope";
  } else {
    responseEl.setAttribute("class", "response");
    questionEl.setAttribute("class", "hide");
    setTimeout(function () {
      responseEl.setAttribute("class", "response hide");
      questionEl.removeAttribute("class");
    }, 1000);
    responseEl.textContent = "Heck Yeah!";
  }

  //Tell the user how they did for 1 sec
  responseEl.setAttribute("class", "response");
  setTimeout(function () {
    responseEl.setAttribute("class", "response hide");
    questionEl.removeAttribute("class");
  }, 1000);

  // Check to see if there are questions. If so, continue the quiz. 
  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    stopQuiz();
  } else {
    getQuestion();
  }
}

//Show End Screen and Hide Questions
function stopQuiz() {
  //Stop the Timer
  clearInterval(timerInterval);

  // Add a delay to prevent overlap with question response
  setTimeout(function () {
    
    endScreenEl.removeAttribute("class");
    questionEl.setAttribute("class", "hide");
  }, 1000);

  quizTimeResultEl.textContent = time;

  quizScoreResultEl.textContent = score;

  let scorePercent = Math.round((score / numOfQuestions) * 100);
  quizScorePercentageResultEl.textContent = scorePercent;
}

//Save high scores to local storage

function saveHighScores() {
  let initials = initialsEl.value.trim();

  if (initials === ""){
    
    highScoreHelperEl.textContent = "Please enter your initials"
  } else {
 // set initials to local storage along with time
    let highScores =
      JSON.parse(window.localStorage.getItem("highScores")) || [];

    let newHighScore = {
      time,
      initials,
      score
    };

    highScores.push(newHighScore);
    window.localStorage.setItem("highScores", JSON.stringify(highScores));

    window.location.href = "highscores.html";
  }
}

// Button Actions

startBtn.onclick = startQuiz;
submitBtn.onclick = saveHighScores;
