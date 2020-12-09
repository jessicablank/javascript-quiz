clearBtn = document.getElementById("clear-btn")


function displayHighScores() {
    // either get high scores from local storage or set to empty array
    var highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
  
    // sort lowest times by time property in descending order
    highScores.sort(function(a, b) {
      return b.time - a.time;
    });
  
    highScores.forEach(function(element) {
      // create list item tag for each high score
      var liTag = document.createElement("li");
      liTag.textContent = `${element.initials} - Time: ${element.time} | Score: ${element.score}`
  
      // display on page
      var olEl = document.getElementById("high-scores");
      olEl.appendChild(liTag);
    });
  }
  
  function clearHighScores() {
    window.localStorage.removeItem("highScores");
    window.location.reload();
  }
  
 clearBtn.onclick = clearHighScores;
  
  // run function when page loads
  displayHighScores();