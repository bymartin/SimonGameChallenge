let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
userClickedPattern = [];

function nextSequence() {
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

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  // remove pressed class after 100 milliseconds
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");

  }, 100);
}

// to test
$(document).keydown(function () {
  nextSequence();
});

// detect when any buttons are clicked and trigger handler function
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
});
