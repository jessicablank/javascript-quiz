// Declare game logic variables

let currentQuestionIndex = 0;
let time = questions.length * 10;
console.log(questions.length)
let timerInterval;
// let score = 0; Saving for future functionality


let answerEl = document.getElementById("answers");
let endScreenEl = document.getElementById("end-screen")
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

function timerCountdown(){
  timerInterval = setInterval(function(){
    timeLeft--;
    timerEl.textContent = time;

    if(timeLeft <=0){
      timeLeft = 0;
      timerEl.textContent = timeLeft;
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
     time -=10;

     if (time < 0){
       time = 0;
     }

     timerEl.textContent = time;

     responseEl.textContent = "Nope"
    
  } else {
  
    responseEl.textContent = "Heck Yeah!";
  }

  //Tell the user how they did for 1 sec
  responseEl.setAttribute("class", "response");
  setTimeout(function () {
    responseEl.setAttribute("class", "response hide");
  }, 1000);

// Move to the next question as long as there are questions
currentQuestionIndex++;

if (currentQuestionIndex === questions.length){
    stopQuiz();
} else {
    getQuestion();
}

}

//Show End Screen and Hide Questions
function stopQuiz(){
    clearInterval(time);
endScreenEl.removeAttribute("class");

questionEl.setAttribute("class", "hide");
}


// Button Actions

startBtn.onclick = startQuiz;
