// Declare game logic variables

let currentQuestionIndex = 0;

let choiceEl = document.getElementById("choices");
let questionEl = document.getElementById("questions");
let startBtn = document.getElementById("start-btn");
let submitBtn = document.getElementById("submit");

function startQuiz() {
  let homePage = document.getElementById("home-page");
  homePage.setAttribute("class", "hide");

  questionEl.removeAttribute("class");

  getQuestion();
}

function getQuestion() {
  let currentQuestion = quizQuestions[currentQuestionIndex];

  let questionText = document.getElementById("question-text");
  questionText.textContent = currentQuestion.question;

//   // Clear out old question choices
//   choiceEl.innerHTML = "";

  // Add a button to select each choice
  currentQuestion.choices.forEach(listChoices);

  function listChoices(choice, index) {
    let choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.setAttribute("value", choice)

    // increase index so it starts at 1 and not zero
    choiceBtn.innerHTML += index + 1 + ") " + choice;

    // display on the page
    choiceEl.appendChild(choiceBtn);
}
}

// Button Actions

startBtn.onclick = startQuiz;
