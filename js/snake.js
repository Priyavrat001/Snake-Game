let inputDir = { x: 0, y: 0 }
const foodSound = new Audio('food_G1U6tlb.mp3')
const gameOverSound = new Audio('sound_ErK79lZ.mp3')
const moveSound = new Audio('sound_ErK79lZ.mp3')
const gameSound = new Audio('Snake Game - Theme Song.mp3')
const speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 }
const board = document.getElementById("board")





// game function

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime
    gameEngine();
}

const isColide = (snake) => {
    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if you bum into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

const gameEngine = () => {
    // updating the food arrays
    if (isColide(snakeArr)) {
        gameOverSound.play()
        gameSound.pause()
        inputDir = { x: 0, y: 0 }
        alert("Game over. Press any key to play again!")
        snakeArr = [{ x: 13, y: 15 }]
        gameSound.play()
        score = 0;
    }
    // if you have eaten the food . increment the score and regenrate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play()
        score += 1;
        score.innerHTML = "Score", score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // moving the sanke

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // dispalying the sanke in this logic
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.className = 'head';

        }
        else {
            snakeElement.className = 'body';
        }
        board.appendChild(snakeElement);
    });
    // displaying the food element in this logic
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.className = 'food'
    board.appendChild(foodElement);
}








// main logic
window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }//start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log('ArrowUp');
            inputDir.x = 0;
            inputDir.y = -1;

            break;
        case "ArrowDown":
            // console.log('ArrowDown');
            inputDir.x = 0;
            inputDir.y = 1;

            break;
        case "ArrowLeft":
            console.log('ArrowLeft');
            inputDir.x = -1;
            inputDir.y = 0;

            break;
        case "ArrowRight":
            // console.log('ArrowRight');
            inputDir.x = 1;
            inputDir.y = 0;

            break;

        default:
            break;
    }
})