const canvas = document.getElementById("gameBoard");
const context = canvas.getContext("2d");


var scoreOne = 0
var scoreTwo = 0

//key movement for paddles
window.addEventListener("keypress", pOneControls, false);

function pOneControls(e){
    const key = e.key;
    if(key == "w" && pOne.y-pOne.gravity > 0)
        pOne.y -= pOne.gravity * 4;
    else if (key == "s" && pOne.y + pOne.height + pOne.gravity < canvas.height)
    pOne.y += pOne.gravity * 4;
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
const pOne = new Element({
    x: 1,
    y: canvas.height/2 - 100/2,
    width: 15,
    height: 80,
    color: "#fff",
    gravity: 10

});

const comp = new Element({
    x: canvas.width - 16,
    y: canvas.height/2 - 100/2,
    width: 15,
    height: 80,
    color: "#fff",
    gravity: 2

});
//ball element



// Used to draw paddles/ball
/*function drawElement(element) {
    context.fillStyle = element.color;
    context.fillRect(element.x, element.y, element.width, element.height)
}*/
//animate the ball
/*let lastTime;
function callback(millis){
    if (lastTime){
        update((millis - lastTime)/1000);
    }
    lastTime = millis;
    requestAnimationFrame(callback)
}*/
/*function ballBounce(){
    if(ball.y + ball.gravity <= -15 || ball.y + ball.gravity >= canvas.height -20) {
        ball.gravity = ball.gravity* -1;
        ball.y += ball.gravity;
        ball.x += ball.speed;
    } else {
        ball.y += ball.gravity;
        ball.x += ball.speed;
    }  
}*/
    // Used to draw paddles
function drawElement(element) {
        context.fillStyle = element.color;
        context.fillRect(element.x, element.y, element.width, element.height)
}

    ball = {
        x : canvas.width/2,
        y : canvas.height/2,
        width: 20,
        height: 20,
        size : 15,
        velx : 3,
        vely : 3,
        speed : 5,
        color : "#fff",
        gravity: 2,
    }
function update() {
    score();
    ballBounce();
      
    paddleCollision(pOne);
    paddleCollision(comp);
}
function render() {
    movePaddle(comp);
    drawNet();
    gameBall(ball.x, ball.y, ball.size, ball.color);
}
//draw game ball
function gameBall(x,y,size,color){
    context.beginPath();
    context.fillStyle = color;
    context.arc(x,y,size,0, Math.PI*2)
    context.fill();
}
//draw game net
function drawNet() {
    context.strokeStyle = "#fff";
    context.lineWidth = 5;
    context.setLineDash([20,10]);
    context.beginPath();
    context.moveTo(canvas.width/2, 0);
    context.lineTo(canvas.width/2, canvas.height);
    context.stroke();
}


function drawElements(){
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawElement(pOne);
    drawElement(comp);
    displayScoreOne();
    
}
function displayScoreOne(){
    context.font = "50px Arial"
    context.fillStyle = '#fff'
    context.fillText(scoreOne, canvas.width/2 - 65, 50)
        function displayScoreTwo(){
            context.font = "50px Arial"
            context.fillStyle = '#fff'
            context.fillText(scoreTwo, canvas.width/2 + 40, 50)
    }
    displayScoreTwo();
}
//increment score
function score(){
    if(ball.x >= canvas.width){
        scoreOne += 1
    }else if (ball.x < 0) {
        scoreTwo += 1
    }
}
function setWinner(){
    let winner = document.getElementsByTagName("h2");
    if(scoreOne >= '5'){
        winner.innerText = "Player One Wins!"
        
    }else if(scoreTwo >= '5')
        winner.innerText = "Player Two Wins!"
}
setWinner()



function ballBounce(){
    ball.x = ball.x + ball.velx;
    ball.y = ball.y + ball.vely;
    if(ball.x >= canvas.width || ball.x <= 0){
        ball.velx = -ball.velx;
    }
    if(ball.y < 0 || ball.y > canvas.height){
        ball.vely = -ball.vely;
    }
}
//Attempt at Ai for player 2

function movePaddle(element){
    let centerY = element.y + element.height/2;
    if (centerY < ball.y - element.offset) {
        element.y += 10;
    }
    else if (centerY > ball.y + element.offset){
        element.y -=10;
    }
}
function deltaY(element){ //makes rebound from paddle a harder to predict
    return ball.y - (element.y + element.height/2);
}

//checks to see where the ball collides with the paddle
function paddleCollision(element){
    let leftOfB = (element.x + element.width) < (ball.x);
    let rightOfB = (element.x) > (ball.x + ball.size);
    let topOfB = (element.y) > (ball.y + ball.size);
    let bottomOfB = (element.y + element.height) < (ball.y);

    let collided = !(leftOfB || rightOfB || topOfB || bottomOfB);

    if (collided) {
        ball.velx = -ball.velx;
        ball.vely = deltaY(element) * .25;
    }
}

loop = setInterval(() =>{
    movePaddle(comp);
    drawElements();
    update();
    render();
},1000/60);




//})




