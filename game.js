let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];

function nextSequence() {
    // generate random number between 0 and 3
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // use jQuery to select the button with the same id
    // as the randomChosenColor
    // animate a flash to the selected button
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100)
        .fadeOut(100).fadeIn(100);

    // play a sound
    var sound = new Audio('sounds/' + randomChosenColor + '.mp3');
    sound.play();
}

// to test
$(document).keydown(function() {
    nextSequence();
});

