import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball") as HTMLElement);
const playerPaddle = new Paddle(
  document.getElementById("player-paddle") as HTMLElement
);
const computerPaddle = new Paddle(
  document.getElementById("computer-paddle") as HTMLElement
);
const playerScore = document.getElementById("player-score") as HTMLElement;
const computerScore = document.getElementById("computer-score") as HTMLElement;

let lastRunTime: number;

function updateScreen(time: number) {
  if (lastRunTime !== null) {
    const timeMatch: number = time - lastRunTime;
    ball.update(timeMatch, [playerPaddle.getRect(), computerPaddle.getRect()]);
    computerPaddle.update(timeMatch, ball.y);

    if (lostScoreUpdate()) handleLoser();
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
  } else if (playerScore.textContent) {
    playerScore.textContent = `${parseInt(playerScore.textContent) + 1}`;
  }
  ball.reset();
  computerPaddle.reset();
}

document.addEventListener("mousemove", (ev: MouseEvent): void => {
  playerPaddle.position = (ev.y / window.innerHeight) * 100;
});

window.requestAnimationFrame(updateScreen);
