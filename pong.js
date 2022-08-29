import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("playerPaddle"));
const computerPaddle = new Paddle(document.getElementById("computerPaddle"));
const playerScoreElem = document.getElementById("playerScore");
const computerScoreElem = document.getElementById("computerScore");

let lastTime
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime;
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta, ball.y);

        if (isLose()) handleLose();
    }

    lastTime = time;
    window.requestAnimationFrame(update);
}

//checks if the ball hits someones side
function isLose() {
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0;
}

//if someone scores update their score accordingly and reset the game to default values
function handleLose() {
    const rect = ball.rect();
    if (rect.right >= window.innerWidth) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
    }
    ball.reset();
    computerPaddle.reset();
}

//uses mouse to control player paddle
document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
})

//Uses frame data instead of millisecond intervals to be more accurate
//and take into account frame skipping and adjust accordingly
window.requestAnimationFrame(update);
