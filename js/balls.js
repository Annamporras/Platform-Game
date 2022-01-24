class Ball {

    constructor(ctx, posX, posY, width, height) {


        this.ctx = ctx
        this.ballPos = { x: posX, y: posY }
        this.ballSize = { w: width, h: height }
        this.ballSpeed = { x: 10, y: 1 }
        this.ballGravity = 1

        this.init()
    }




    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/ball.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.ballPos.x, this.ballPos.y, this.ballSize.w, this.ballSize.h)
    }

}