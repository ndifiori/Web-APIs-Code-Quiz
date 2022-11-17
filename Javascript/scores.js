

function printScoreList() {

  // in the variable highscores either store in an empty array or pull from local storage
  var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

  // will sort the high scores by comparing the second and first score to determine the order
  highscores.sort(function(a,b){
    return b.score - a.score;
  });

  // this will iterate over highscores length by one
  for (var i = 0; i < highscores.length; i += 1){

    // creates the list element under the order listed element
    var liCreate = document.createElement('li');
    liCreate.textContent = highscores[i].initials + '-' + highscores[i].score;

    // this will place this list on the html page
    var ol = document.getElementById('highscores');
    ol.appendChild(liCreate);
  }
}


function clearHighScores() {

  // this will remove the local storage to reset the highscores
  window.localStorage.removeItem('highscores');

  // this reloads the current page
  window.location.reload();
}

// grab the element with id clear and run the function above
document.getElementById('clear').onclick = clearHighScores;

printScoreList();


