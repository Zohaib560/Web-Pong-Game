const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.0000025; //the amount the velocity increases by

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
        this.reset();
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
    }

    set x(value) {
        this.ballElem.style.setProperty("--x", value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
    }

    set y(value) {
        this.ballElem.style.setProperty("--y", value);
    }

    //returns the rectangle in which the ball is housed (its dimensions)
    rect() {
        return this.ballElem.getBoundingClientRect();
    }

    //resets the ball to default values
    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0, y: 0 };
        //while the ball either has too vertical or horizontal of a trajectory
        while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
            //gives in radians the trjectory of the ball
            const trajectory = Math.random() * ((2 * Math.PI) - (0));
            //using the trajectory seperates it into 2D coordinates
            this.direction = { x: Math.cos(trajectory), y: Math.sin(trajectory) }
        }
        this.velocity = INITIAL_VELOCITY
    }

    //updates the ball values so it stays in bounds and changes direction/speed accordingly
    update(delta, paddleRects) {
        //update ball position based on its current velocity and the time between frames
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta
        //increases ball velocity over time
        this.velocity += VELOCITY_INCREASE * delta

        const rect = this.rect()
        //if ball hit top or bottom of screen flip y val so that is bounces in opposite direction
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1
        }
        //if ball hit paddle flip x val so that is bounces in opposite direction
        if (paddleRects.some(r => isCollision(r, rect))) {
            this.direction.x *= -1
        }
    }
}

//checks if ball is inside a paddle's dimensions
//if this is the case that means the paddle hit the ball
function isCollision(rect1, rect2) {
    return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
    )
}
