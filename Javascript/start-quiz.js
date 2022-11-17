

// variable storage
var startScreen = document.getElementById('start-screen');
var questions = document.getElementById('questions');

var currentQuestionHistory = 0;
var questionTitle = document.getElementById('question-title');
var questionChoices = document.getElementById('choices');

// this sets the initial time length
var time = questionsList.length * 15;

// this will create the timer variable where we store the time function
var timer;

// this will allow us to grab the time id from one of the containers
var timerID = document.getElementById('time');

var feedbackID = document.getElementById('feedback');

var endScreenID = document.getElementById('end-screen');
var finalScoreID = document.getElementById('final-score');

var initialsID = document.getElementById('initials');

var startBtn = document.getElementById('start');
var submitBtn = document.getElementById('submit');

// let's start the quiz 
function startQuiz() {

  // this will take the start screen and set the class attribute to hide
  startScreen.setAttribute('class', 'hide');

  // this will remove the class with value hide from the div
  questions.removeAttribute('class');

  // this will set the timer variable equal to an interval with a fxn inside of it
  timer = setInterval(clockTick, 1000);

  // sets the id with time value to the time variable
  timerID.textContent = time;

  // this function will get us another question
  question();
}

// this function will be how we reduce the time from the clock
function clockTick() {

  // this says how to deduct the time second by second
  time--;

  // this will subtract the time from the original time variable
  timerID.textContent = time;

  // now we say if time is zero then end the quiz
  if (time <= 0){
    endQuiz();
  }
}


// let's get the question 
function question() {

  // this stores the current question by setting our array with the var we stored above
  var currentQuestion = questionsList[currentQuestionHistory];

  // this takes our id with question title to the value of current question
  questionTitle.textContent = currentQuestion.title;

  // this clears our choices from the html
  questionChoices.innerHTML = '';

  // we are saying that we will iterate over the choices in key value pair
  for (var i = 0; i<currentQuestion.choices.length; i++) {

    // stores our current choice in the choice variable 
    var choice = currentQuestion.choices[i]; 

    // this choiceelement will store our new button element
    var choiceElement = document.createElement('button');
    
    // matches our choices in our html that will allow us to go to the next question
    choiceElement.setAttribute('class','choices');

    // this creates our value of the button to the choice
    choiceElement.setAttribute('value', choice);

    // this will iterate over the length of the choice
    choiceElement.textContent = i + 1 + '.' + choice;

    // this tells us where to place our new elements
    questionChoices.appendChild(choiceElement);

  }
}


function nextQuestion(event) {
  
  // variable that will return what triggered the event 
  var buttonChoice = event.target;

  // where the user clicks doesn't match the choices
  if(!buttonChoice.matches('.choices')){
  
    // this will end the function
    return;
  }

  // if the button choice value that was clicked does not equal the anwer then deduc time
  if(buttonChoice.value !== questionsList[currentQuestionHistory].answer){
    time -= 15;

    // if time is less than zero set it to zero
    if (time < 0){
      time = 0;
    }

    // will set the time to deduct time from count
    timerID.textContent = time;

    // will display if they are right or wrong
    feedbackID.textContent = 'Wrong!';
  } else {
    feedbackID.textContent = 'Correct!';
  }

    // this will set our feedback id to display right or wrong
    feedbackID.setAttribute('class', 'feedback');

    // this will hide the feedback after a second
    setTimeout(function(){
      feedbackID.setAttribute('class','feedback hide')
    },1000);

  // this will move to the next question 
  currentQuestionHistory++;

  // if time is less than zero or we hit the question length then end quiz otherwise go to the question function to start again
  if(time<=0 || currentQuestionHistory === questionsList.length){
    endQuiz();
  } else {
    question();
  }
}


function endQuiz() {

  // this will clear the timer all together
  clearInterval(timer);

  // this will remove the hide class so it shows
  endScreenID.removeAttribute('class');

  // this will display final score id and set it equal to time
  finalScoreID. textContent = time;

  // this will hide the questions 
  questions.setAttribute('class','hide');

}


function highScore() {

  // stores the initial id after all the questions are done in initial variable and will trim excess spacees
  var initials = initialsID.value.trim();

  // this will make sure that the initials input ins't empty
  if (initials !== '') {

    // if initials isn't empty then check to see if any object was stored otherwise add it to an array
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

  // this will store our new variable as an object
  var newScore = {
    score: time,
    initials: initials,
  };

  // this will push our our new score into the existing array
  highscores.push(newScore);

  // will set our variable to a string and set it to highscores in the local storage
  window.localStorage.setItem('highscores', JSON.stringify(highscores));

  // this moves us to the next html page that we want to go to after the submit button is hit
  window.location.href='highscores.html';
  
  }
}


function enterHighScore(event) {

  // the initial input has a key up stroke then run the high score
  if (event.key === 'Enter') {

    // run the high score function that will take us to the next html page
    highScore();
  }
}

// when the submit button is clicked run the highscore function which will redirect us to the next page
submitBtn.onclick = highScore;

// this will start the quiz 
startBtn.onclick = startQuiz;

// this will run the nextquestion function 
questionChoices.onclick = nextQuestion;

// this ties into the enter high score function
initialsID.onkeyup = enterHighScore;





