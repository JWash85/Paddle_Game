const canvas = document.getElementById("gameBoard");
const context = canvas.getContext("2d");
//const leftPaddle = document.getElementById("left-paddle")
//setting variables for my images

/*Context is apart of Canvas API 
    Canvas API used for drawing graphics via JavaScript & HTML
    Can be used for animaiton, game graphics, data visualization,
    photo manipulation, and real-time video processing*/
let scoreOne = 0
let scoreTwo = 0

let ball = new Image()
let playerOne = new Image()
let computer = new Image()

ball.src = 'assets/Red Chip.png'
playerOne.src = 'assets/Yellow Chip.png'
computer.src = 'assets/Yellow Chip.png'

//setting Ball Variables
var bx = canvas.width/2;
var by = canvas.height/2;
var bWidth = 50;
var bHeight = 50;
var bSpeed = 2;
var bGravity = 2;

//Player 1 Paddle Variables
var px = 10;
var py = canvas.height/2 - 100/2;
var pWidth = 10;
var pHeight = 100;


//Computer Paddle Variables
var cx = canvas.width - 20;
var cy = canvas.height/2 - 100/2;
var cWidth = 10;
var cHeight = 100;

//use image for ball
function draw(i, x, y, w, h) {
    context.drawImage(i, x, y,  w, h)
}


//draw the net
const net = {
    x: canvas.width/2 - 2/2,
    y: 0,
    width: 4,
    height: 10,
    color: "#fff"
}



function drawRect(x,y,w,h, color){
    context.fillStyle = color;
    context.fillRect(x,y,w,h,color);
}
function drawNet(){
    for (let i = 0; i <= canvas.height; i+=20){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}
        
    





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
/*class Element{
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

});*/



//use image as paddle


function drawElement(element) {
    context.fillStyle = element.color;
    context.fillRect(element.x, element.y, element.width, element.height)
}


//Player scores text
function displayScoreOne() {
    context.font = "50px Arial";
    context.fillStyle = "#fff";
    context.fillText(scoreOne, canvas.width / 2 - 65, 50);
}
function displayScoreTwo() {
    context.font = "50px Arial";
    context.fillStyle = "#fff";
    context.fillText(scoreTwo, canvas.width / 2 + 40, 50);
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


/*function ballWallCollision(){
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
}*/
function ballWallCollision(){
    if(
        (by + bGravity <= cy + cHeight &&
        bx + bWidth + bSpeed >= cx &&
        by + bGravity > cy) ||
        (by + bGravity > py &&
        bx + bSpeed <= px + pWidth)
    ){
        bSpeed = bSpeed * -1;
    } else if (bx+bSpeed < px ){
        scoreTwo +=1;
        bSpeed = bSpeed * -1;
        bx = 100 + bSpeed;
        by += bGravity;
    }else if (bx+bSpeed > cx + cWidth){
        scoreOne +=1;
        bSpeed = bSpeed * -1;
        bx = 100 + bSpeed;
        by += bGravity;
    }
    drawElements();
}

function drawElements(){
    context.clearRect(0,0,canvas.width, canvas.height);
    //drawElement(playerOne);
    //drawElement(playerTwo);
    //drawElement(ball);
    displayScoreOne();
    displayScoreTwo();
    setWinner();
    draw(ball,bx, by, bWidth, bHeight);
    draw(playerOne, px, py, pWidth, pHeight);
    draw(computer, cx, cy, cWidth, cHeight );
    drawNet();
    drawRect();
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
