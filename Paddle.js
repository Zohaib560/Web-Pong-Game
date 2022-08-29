const SPEED = 0.02

export default class Paddle {
    constructor(paddleElem) {
        this.paddleElem = paddleElem;
        this.reset();
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"));
    }

    set position(value) {
        this.paddleElem.style.setProperty("--position", value);
    }

    //returns the rectangle in which the paddle is housed (its dimensions)
    rect() {
        return this.paddleElem.getBoundingClientRect();
    }

    //resets paddle to default values
    reset() {
        this.position = 50;
    }

    //computer paddle tracker ing the ball
    //the computer tracks the ball but its movement is limited by the SPEED
    //so if the ball goes fast enough the computer can't keep up, otherwise if there was no
    //speed limiter the computer would just teleport its paddle in the perfect position to hit the ball
    update(delta, ballHeight) {
        this.position += SPEED * delta * (ballHeight - this.position);
    }
}