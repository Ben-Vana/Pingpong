const speedAI = 0.02;
export default class Paddle {
    gamePaddle;
    constructor(gamePaddle) {
        this.gamePaddle = gamePaddle;
        this.reset();
    }
    get position() {
        return parseFloat(getComputedStyle(this.gamePaddle).getPropertyValue("--position"));
    }
    set position(value) {
        this.gamePaddle.style.setProperty("--position", value);
    }
    getRect() {
        return this.gamePaddle.getBoundingClientRect();
    }
    reset() {
        this.position = 50;
    }
    update(timeMatch, ballY) {
        if (isNaN(speedAI * timeMatch * (ballY - this.position))) {
            this.position = 50;
        }
        else {
            this.position += speedAI * timeMatch * (ballY - this.position);
        }
    }
}
