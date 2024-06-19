import Ball from "./ball.js";
import Paddle from "./paddle.js";
const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
let lastRunTime;
function updateScreen(time) {
    if (lastRunTime !== null) {
        const timeMatch = time - lastRunTime;
        ball.update(timeMatch, [playerPaddle.getRect(), computerPaddle.getRect()]);
        computerPaddle.update(timeMatch, ball.y);
        if (lostScoreUpdate())
            handleLoser();
    }
    lastRunTime = time;
    window.requestAnimationFrame(updateScreen);
}
function lostScoreUpdate() {
    const rect = ball.rect();
    return rect.left <= 0 || rect.right >= window.innerWidth;
}
function handleLoser() {
    const rect = ball.rect();
    if (rect.left <= 0 && computerScore.textContent) {
        computerScore.textContent = `${parseInt(computerScore.textContent) + 1}`;
    }
    else if (playerScore.textContent) {
        playerScore.textContent = `${parseInt(playerScore.textContent) + 1}`;
    }
    ball.reset();
    computerPaddle.reset();
}
document.addEventListener("mousemove", (ev) => {
    playerPaddle.position = (ev.y / window.innerHeight) * 100;
});
window.requestAnimationFrame(updateScreen);
