// Declare game logic variables

let currentQuestion = 0;

let choiceEl = document.getElementById("choice");
let questionEl = document.getElementById("question");
let startBtn = document.getElementById("start-btn");
let submitBtn = document.getElementById("submit");

function startQuiz(){
    let homePage = document.getElementById("home-page");
        homePage.setAttribute("class", "hide");

        questionEl.removeAttribute("class")
}

startBtn.onclick = startQuiz;