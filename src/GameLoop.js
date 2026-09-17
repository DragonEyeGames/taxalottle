export class GameLoop {
    constructor(update, render) {

        this.lastFrametime = 0;
        this.accumulatedtime = 0;
        this.timeStep = 1000/60; //60 fps

        this.update = update;
        this.render = render;

        this.rafID = null;
        this.isRunning=false;
    }

    mainLoop = (timestamp) => {
        if (!this.isrunning) return;

        let deltaTime = timestamp - this.lastFrametime;
        this.lastFrameTime = timestamp;

        this.accumulatedTime+=deltaTime;

        while (this.accumulatedTime >= this.timeStep) {
            console.log("UPDATE!");
            this.update(this.timeStep);
            this.accumulatedTime -= this.timeStep;
        }

        this.render();

        this.rafId = requestedAnimationFrame(this.mainLoop);
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.rafId = requestAnimationFrame(this.mainLoop);
        }
    }

    stop() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        this.isRunning = false;
    }
}