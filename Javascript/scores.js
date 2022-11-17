

function printScoreList() {

  var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

  highscores.sort(function(a,b){
    return b.score - a.score;
  });


  for (var i = 0; i < highscores.length; i += 1){

    var liCreate = document.createElement(<li>);
    liCreate.textContent = highscores[i].initials + '-' + highscores[i].score;

    var ol = document.getElementById('highscores');
    ol.appendChild(liCreate);
  }
}

function clearHighScores() {
  window.localStorage.removeItem('highscores');
  window.location.reload();
}

document.getElementById('clear').onclick = clearHighScores;

printScoreList();


