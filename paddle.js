const canvas = document.getElementById("gameBoard");
const context = canvas.getContext("2d");
//const leftPaddle = document.getElementById("left-paddle")
//setting variables for my images
let ballB = new Image()
let leftP = new Image()
let rightP = new Image()

ballB.src = 'assets/Red Chip.png'
leftP.src = 'assets/Yellow Chip.png'
rightP.src = 'assets/Yellow Chip.png'

//img.src = 'assets/Yellow Chip.png'
/*Context is apart of Canvas API 
    Canvas API used for drawing graphics via JavaScript & HTML
    Can be used for animaiton, game graphics, data visualization,
    photo manipulation, and real-time video processing*/

let scoreOne = 0
let scoreTwo = 0

//Key movement
window.addEventListener("keypress", doKeyDown, false);

function doKeyDown(e) {
    const key = e.key;
    if (key == "w" && playerOne.y - playerOne.gravity > 0)
        playerOne.y -= playerOne.gravity * 15;
    else if (key == "s" && playerOne.y + playerOne.height + playerOne.gravity < canvas.height)
        playerOne.y += playerOne.gravity * 15;
    if (key == "i" && playerTwo.y - playerTwo.gravity > 0)
        playerTwo.y -= playerTwo.gravity * 15;
    else if (key == "k" && playerTwo.y + playerTwo.height + playerTwo.gravity < canvas.height)
        playerTwo.y += playerTwo.gravity * 15;
}
class Element{
    constructor(options){
        this.i = options.i;
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.height = options.height;
        this.color = options.color;
        this.speed = options.speed || 2;
        this.gravity = options.gravity;
        this.arc = options.arc;
    }
}

//Creating paddles for each player
const playerOne = new Element({
    x: 10,
    y: 200,
    width: 15,
    height: 80,
    color: "#fff",
    gravity: 2

});

const playerTwo = new Element({
    x: 675,
    y: 200,
    width: 15,
    height: 80,
    color: "#fff",
    gravity: 2

});
//Created puck
const ball = new Element({
    x: 675/2,
    y: 400/2,
    width: 15,
    height: 15,
    color: "#fff",
    speed: 2,
    gravity: 2

});


//use image for ball
function draw(i, x, y, w, h) {
    context.drawImage(i, x, y,  w, h)
}
//use image as paddle


function drawElement(element) {
    context.fillStyle = element.color;
    context.fillRect(element.x, element.y, element.width, element.height)
}


//Player one score text
function displayScoreOne() {
    context.font = "18px Arial";
    context.fillStyle = "#fff";
    context.fillText(scoreOne, canvas.width / 2 - 60, 30);
}
function displayScoreTwo() {
    context.font = "18px Arial";
    context.fillStyle = "#fff";
    context.fillText(scoreTwo, canvas.width / 2 + 60, 30);
}
//ball bounce
/*function ballBounce(){
    if(ball.y + ball.gravity <= 0 || ball.y + ball.gravity >= canvas.height) {
        ball.gravity = ball.gravity * -1;
        ball.y += ball.gravity;
        ball.x += ball.speed;
    } else {
        ball.y += ball.gravity;
        ball.x += ball.speed;
    }
    ballWallCollision();
}*/
function ballBounce(){
    if(by + bGravity <= 0 || by + bGravity >= canvas.height) {
        bGravity = bGravity * -1;
        by += bGravity;
        bx += bSpeed;
    } else {
        by += bGravity;
        bx += bSpeed;
    }
    ballWallCollision();
}
var bx = 400;
var by = 400/2;
var bWidth = 50;
var bHeight = 50;
var bSpeed = 2;
var bGravity = 2;

function ballWallCollision(){
    if(
        (ball.y + ball.gravity <= playerTwo.y + playerTwo.height &&
        ball.x + ball.width + ball.speed >= playerTwo.x &&
        ball.y + ball.gravity > playerTwo.y) ||
        (ball.y + ball.gravity > playerOne.y &&
        ball.x + ball.speed <= playerOne.x + playerOne.width)
    ){
        ball.speed = ball.speed * -1;
    } else if (ball.x+ball.speed < playerOne.x ){
        scoreTwo +=1;
        ball.speed = ball.speed * -1;
        ball.x = 100 + ball.speed;
        ball.y += ball.gravity;
    }else if (ball.x+ball.speed > playerTwo.x + playerTwo.width){
        scoreOne +=1;
        ball.speed = ball.speed * -1;
        ball.x = 100 + ball.speed;
        ball.y += ball.gravity;
    }
    drawElements();
}

function drawElements(){
    context.clearRect(0,0,canvas.width, canvas.height);
    drawElement(playerOne);
    drawElement(playerTwo);
    drawElement(ball);
    displayScoreOne();
    displayScoreTwo();
    setWinner();
    draw(ballB,bx, by, bWidth, bHeight)
    //draw(leftP, 10, 200, 50, 50 )
    //draw(rightP, 675, 200, 50, 50 )
}
function loop() {
    ballBounce()
    window.requestAnimationFrame(loop);
}
loop()
function setWinner(){
    let winner = document.getElementById("winner");
    if(scoreOne == '5'){
        winner.innerText = "Player One Wins!"
        
    }else if(scoreTwo == '5')
        winner.innerText = "Player Two Wins!"
}
var bx = 400;
var by = 400/2;
var bWidth = 50;
var bHeight = 50;
var bSpeed = 2;
var bGravity = 2;