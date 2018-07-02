var numColors = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var message = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    setModeButtons();
    setSquares();
    reset();
}

function setModeButtons(){
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener('click', function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            numColors = this.textContent === "Easy" ? 3 : 6;
            reset();
        });
    }
}

function reset(){
    colors = generateRandomColors(numColors);
    console.log(colors);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < squares.length; i++){
        //add initial colors to squares
        squares[i].style.display = "block";
        if(colors[i])
            squares[i].style.backgroundColor = colors[i];
        else
            squares[i].style.display = "none";
    }
    message.textContent = "";
    resetButton.textContent = "New Colors";
    document.querySelector("h1").style.backgroundColor = "steelblue";
}

function setSquares(){
    for(var i = 0; i < squares.length; i++){
        //add initial colors to squares
        squares[i].style.backgroundColor = colors[i];
    
        //add clicl listeners to squares
        squares[i].addEventListener("click", function(){
            var clickedColor = this.style.backgroundColor;
            if(clickedColor === pickedColor){
                message.textContent = "Correct!";
                changeColors(pickedColor);
                document.querySelector("h1").style.backgroundColor = pickedColor;
                resetButton.textContent = "Play Again?"
            }
            else{
                this.style.backgroundColor = "#232323";
                message.textContent = "Try Again";
            }
        });
    }
}

resetButton.addEventListener('click', function(){
    reset();
});


function changeColors(color){
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomColors(num){
    var arr = [];
    for(var i = 0; i < num; i++){
        arr.push(randomColor());
    }
    return arr;
}

function randomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}