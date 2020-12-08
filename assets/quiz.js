// Declare game logic variables

let currentQuestionIndex = 0;
let time = questions.length * 11;

let timerInterval;
let score = questions.length;
console.log(score);


let answerEl = document.getElementById("answers");
let responseEl = document.getElementById("response");
let homePage = document.getElementById("home-page");
let questionEl = document.getElementById("questions");
let startBtn = document.getElementById("start-btn");
let submitBtn = document.getElementById("submit");
let timerEl = document.getElementById("time");

//hide home-page, show questions, start timer
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

  let questionText = document.getElementById("question-text");
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

  // Move to the next question as long as there are questions
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
  clearInterval(timerInterval)

  localStorage.setItem("quiz-time", time)

  //Show to Quiz-End Page
  setTimeout(function () {
    let endScreenEl = document.getElementById("end-screen")
    endScreenEl.removeAttribute("class");
    questionEl.setAttribute("class", "hide");
  }, 1000);

 
  

  let quizTimeResultEl = document.getElementById("quiz-time");
  quizTimeResultEl.textContent = time;
  console.log(time)

}

// Button Actions

startBtn.onclick = startQuiz;
