import Paddle from "./paddle";

const initialVelocity = 0.1;
const increaseVelocity = 0.005;

export default class Ball {
  gameBall;
  ballDirection: { x: number; y: number };
  velocity;

  constructor(gameBall: HTMLElement) {
    this.gameBall = gameBall;
    this.ballDirection = { x: 0, y: 0 };
    this.velocity = initialVelocity;
    this.reset();
  }

  get x() {
    return parseFloat(
      getComputedStyle(this.gameBall).getPropertyValue("--positionX")
    );
  }

  set x(value: any) {
    this.gameBall.style.setProperty("--positionX", value);
  }

  get y() {
    return parseFloat(
      getComputedStyle(this.gameBall).getPropertyValue("--positionY")
    );
  }

  set y(value: any) {
    this.gameBall.style.setProperty("--positionY", value);
  }

  rect() {
    return this.gameBall.getBoundingClientRect();
  }

  reset() {
    this.x = 50;
    this.y = 50;
    this.ballDirection = { x: 0, y: 0 };
    while (
      Math.abs(this.ballDirection.x) <= 0.2 ||
      Math.abs(this.ballDirection.x) >= 0.9
    ) {
      const headTo = randomNumber(0, 2 * Math.PI);
      this.ballDirection = { x: Math.cos(headTo), y: Math.sin(headTo) };
    }
    this.velocity = initialVelocity;
  }

  update(timeMatch: number, paddleRects: Paddle[]) {
    if (isNaN(this.velocity * this.ballDirection.x * timeMatch)) {
      this.x = 50;
      this.y = 50;
    } else {
      this.x += this.velocity * this.ballDirection.x * timeMatch;
      this.y += this.velocity * this.ballDirection.y * timeMatch;
      //this.velocity += increaseVelocity;
    }

    const rect = this.rect();

    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.ballDirection.y *= -1;
    }

    if (paddleRects.some((item) => checkCollision(item, rect))) {
      this.ballDirection.x *= -1;
      this.velocity += increaseVelocity;
    }
  }
}

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function checkCollision(rect1: any, rect2: any) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  );
}
