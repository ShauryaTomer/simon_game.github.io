let buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let click = 0;
let h1 = document.getElementById("level-title")
function nextSequence() {
    userClickedPattern = []
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    animateSequence(randomChosenColour);
    playSound(randomChosenColour)
    h1.innerText = `Level ${gamePattern.length}`
}

let userClickedPattern = [];
for (let i = 0; i<4; i++) {
document.getElementById(buttonColours[i]).addEventListener("click" , function buttonClicked() {
    userClickedPattern.push(this.id)
        playSound(this.id)
        animatePress(this.id)
        checkUserInput(userClickedPattern.length - 1)
    })
}

function playSound(colour) {
        let tile = new Audio("sounds/" + colour + ".mp3");
    tile.play();
}

function animatePress(currentColour) {
    let activeTile = document.getElementById(currentColour)
    activeTile.classList.add("pressed")

    setTimeout(function() {
        activeTile.classList.remove("pressed")}, 500
    )
}

let gameStart = false;
function start(gameStart) {
document.addEventListener("keydown", function(event) {
    if (event.key === "a" && gameStart === false) {
        gameStart = true;
        nextSequence(1);
        }
    })
}

function checkUserInput(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence()
            }, 1000)
        }
    } else {
        console.log("Wrong")
        h1.innerText = "Game Over, Press A to restart";
        start(false);
        gamePattern = []
        document.querySelector("body").classList.add("game-over")
        setTimeout(function() {
            document.querySelector("body").classList.remove("game-over")
            let wrong = new Audio("sounds/wrong.mp3")
            wrong.play()
        }, 300)
        
    }
}

start(gameStart)

function animateSequence(randomChosenColour) {
    let activeTile = document.getElementById(randomChosenColour)
     activeTile.classList.add("toUser")
    setTimeout(function() {
        activeTile.classList.remove("toUser")
    }, 300)
}