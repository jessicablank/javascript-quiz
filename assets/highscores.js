function displayHighScores() {
    // either get high scores from local storage or set to empty array
    var highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
  
    // sort lowest times by time property in descending order
    highScores.sort(function(a, b) {
      return b.time - a.time;
    });
  
    highScores.forEach(function(score) {
      // create list item tag for each high score
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score + score.time;
  
      // display on page
      var olEl = document.getElementById("high-scores");
      olEl.appendChild(liTag);
    });
  }
  
  function clearHighScores() {
    window.localStorage.removeItem("highScores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighScores;
  
  // run function when page loads
  displayHighScores();