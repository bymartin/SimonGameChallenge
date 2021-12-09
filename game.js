let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
userClickedPattern = [];
let gameStarted = false;
let level = 0;

function nextSequence() {
  // every time we call this, reset the userClickedPattern
  // to an empty array
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  // generate random number between 0 and 3
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // use jQuery to select the button with the same id
  // as the randomChosenColor
  // animate a flash to the selected button
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  // play a sound
  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // is the sequence finished?
    if (userClickedPattern.length === gamePattern.length) {
      // call nextSequence after 1000 ms
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // play wrong.mp3
    playSound("wrong");
    // apply class game-over to the body and remove after 200ms
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // show game over and startOver() to reset values for a new game
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  // remove pressed class after 100 milliseconds
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Press a key to start the game
$(document).keydown(function () {
  if (!gameStarted) {
    gameStarted = true;
    $("#level-title").text("Level 0");
    nextSequence();
  }
});

// detect when any buttons are clicked and trigger handler function
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
