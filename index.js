var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level=0;


function nextSequence() {
    userPattern=[];
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// FUNCTUION TO START THE GAME BY CLICK
var start = false;
$(document).keypress(function () {
    if (!start) {
        nextSequence();
    }
    start = true;
})


$(".btn").click(function () {
    var btnId = $(this).attr("id");
    userPattern.push(btnId);
    playSound(btnId);
    animatePress(btnId)
    confirmAnswer(userPattern.length - 1);
})


//FUNCTION TO CHECK THE ANSWER OR GAME KA LOGIC
function confirmAnswer(num) {
    if (gamePattern[num] === userPattern[num]) {
        if (gamePattern.length === userPattern.length)
            {  
                ++level;
               setTimeout(function(){
                nextSequence()
               },1000)
            }
    }
    else{

        $("#level-title").text("GAME OVER,PRESS A KEY TO RESTART") 
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        startOver();
    }
}

//GAME TO RESTART AFTER LOST
function startOver(){
level=0;
    gamePattern=[];
    start=false;
    // nextSequence();
}


//FUNCTION TO PLAY SOUNDS
function playSound(play) {
    var sound = new Audio("sounds/" + play + ".mp3")
    sound.play();
}

//FUNCTION TO ANIMATE THE BUTTON CLICKED BY NTHE USER
function animatePress(animated) {
    $("#" + animated).addClass("pressed");

    setTimeout(function () {
        $("#" + animated).removeClass("pressed");
    }, 100)
}
