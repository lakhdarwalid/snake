let canvas  = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

let up = document.getElementById('up');
let left = document.getElementById('left');
let right = document.getElementById('right');
let down = document.getElementById('down');

let size = 20;
let rows = canvas.height/size;
let cols = canvas.width/size;
let directionX  = 0;
let directionY  = 0;
let time = 350;
let candy;
let score = 0;
let snake;

class Part{
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;
    }
    render(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x+2, this.y+2, size-2, size-2);
    }
    move(){
        this.x = this.x + size * directionX;
        this.y = this.y + size * directionY;
    }
    clear(){
        ctx.fillStyle = '#000000';
        ctx.fillRect(this.x, this.y, size, size);
    }

    update(x, y){
        this.x = x;
        this.y = y;
    }

}

class Snake{
    constructor(){
        this.taile = [];
    }
    eat(part){
        this.taile.push(part);
    }
    render(){
        this.taile.forEach(part=>part.render());
    }
    clear(){
        ctx.fillStyle = '#000000';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }   
}

class Score {
    constructor(text){
        this.text = text;
    }

    writeScore(text){
        ctx.fillStyle = 'white';
        ctx.font = "11px arial";
        ctx.fillText("Score : " + score, 320, 20);
    }
}
 

let color;
function createSnake(){
        snake = new Snake();
        for (let i=0; i<3; i++){
            if (i==0) color = 'green';
            else color = 'yellow';
            snake.eat(new Part((canvas.width/2)+i*size, canvas.height/2, color));
        }
        snake.render();
}
createSnake();
let candyColor = 'red';

let _score = new Score(0);
_score.writeScore(0);


function clear(){
    ctx.fillStyle = '#000000';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.body.addEventListener("keydown", MyKeyPressed);

function MyKeyPressed(event){
    event.preventDefault();
    switch (event.keyCode) {
        case 37: if (directionX != 1){
                        directionX = -1; 
                        directionY = 0;
                 }
            break;
        case 38: if (directionY != 1){
                        directionY = -1; 
                        directionX = 0;
                 }
            break;
        case 39: if (directionX != -1){
                        directionX = 1; 
                        directionY = 0;
                 }
            break;
        case 40: if (directionY != -1){
                        directionY = 1; 
                        directionX =0;
                 }
            break;
    
        default: directionY = 0; directionX =0; 
            break;
    }
}

function placeCandy(){
    candy = new Part(Math.floor(Math.random()*size)*size, Math.floor(Math.random()*size)*size, candyColor);
    candy.render();
}
function Game(){
const loop = setInterval(()=>{
    moveSnake();
   _score.writeScore(score);
   if (collide(snake.taile[0], candy)) {
        candy.color = 'yellow';
        snake.eat(candy);
        moveSnake();
        score ++;
        _score.writeScore(score);
        if (score%15 ==0) {
            clear();
            createSnake();
            time = time - 50;
            clearInterval(loop);
            Game();
        }
        placeCandy();
   }
   if (gameOver()) {
        ctx.fillStyle = 'white';
        ctx.font = "50px arial";
        ctx.fillText("Game Over !! ", 50, canvas.height/2);
        clearInterval(loop);
    }
}, time);
}
Game();
function collide (head, candy){
    if ((head.x == candy.x && head.y == candy.y))
        return true;
    else return false;
}

function gameOver(){
    let head = snake.taile[0];
    for (let i=3; i<snake.taile.length; i++){
        if (head.x == snake.taile[i].x && head.y == snake.taile[i].y) return true;
    }
    if (snake.taile[0].x<0 || snake.taile[0].y<0 ||
        snake.taile[0].x>canvas.width || 
        snake.taile[0].y>canvas.height) return true;
    
        return false;
}


function moveSnake(){ 
    let tempTailX = [];
    let tempTailY = []
    snake.taile.forEach(item=> tempTailX.push(item.x));   
    snake.taile.forEach(item=> tempTailY.push(item.y));
    for (let g=1; g<snake.taile.length; g++){
     snake.taile[g].update(tempTailX[(g-1)], tempTailY[(g-1)]);
    }
    snake.taile[0].move();
    snake.clear();
    snake.render();
    if (candy == null)placeCandy();
    else candy.render();
}


up.addEventListener('click', ()=>{
    if (directionY != 1){
        directionY = -1; 
        directionX = 0;
 }
});
right.addEventListener('click', ()=>{
    if (directionX != -1){
        directionX = 1; 
        directionY = 0;
 }
});
left.addEventListener('click', ()=>{
    if (directionX != 1){
        directionX = -1; 
        directionY = 0;
 }
});
down.addEventListener('click', ()=>{
    if (directionY != -1){
        directionY = 1; 
        directionX =0;
 }
});

