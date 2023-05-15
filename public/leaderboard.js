const orderedListTag = document.getElementById("leaderboard");
document.getElementById("clear").onclick = clearLeaderboard;

let scores = JSON.parse(localStorage.getItem("scores")) || [];

function clearLeaderboard() {
  localStorage.removeItem("scores");

  while (orderedListTag.firstChild) {
    orderedListTag.removeChild(orderedListTag.firstChild);
  }
}

function printScores() {
  scores.forEach((score) => {
    const newListTag = document.createElement("li");

    if (score.name.length > 0) {
      newListTag.textContent = `${score.name}: ${score.score}`;
    } else {
      newListTag.textContent = `Anonymous: ${score.score}`;
    }

    orderedListTag.appendChild(newListTag);
  });
}

printScores();
