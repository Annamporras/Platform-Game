class Player {
    constructor(ctx, posX, posY, width, height) {
        this.ctx = ctx
        this.playerPos = { x: posX, y: posY }
        this.playerSize = { w: width, h: height }
        this.playerBaseline = 600
        this.playerSpeed = { x: 50, y: 1 }
        this.playerGravity = 0.2
        this.playerLifeCounter = 1000
        this.imageInstance = undefined

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/block.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
        this.moveDown()
        this.lifeBar()
        console.error(this.playerBaseline)
        // NO CAMBIA
    }


    moveLeft() {
        if (this.playerPos.y !== this.playerBaseline) {
            this.playerPos.x -= this.playerSpeed.x * this.playerGravity
        }


        else { this.playerPos.x -= this.playerSpeed.x * this.playerGravity }
    }
    moveRight() {

        if (this.playerPos.y !== this.playerBaseline) {
            this.playerPos.x += this.playerSpeed.x * this.playerGravity


        }


        else { this.playerPos.x += this.playerSpeed.x * this.playerGravity }
    }


    jump() {
        if (this.playerPos.y === this.playerBaseline) {

            this.playerPos.y -= 100
            this.playerSpeed.y -= 10


        }
    }
    moveDown() {
        // está en el aire
        if (this.playerPos.y < this.playerBaseline) {
            //le suma su velocidad en y para que baje

            this.playerSpeed.y += this.playerGravity
            this.playerPos.y += this.playerSpeed.y
            this.playerSpeed.x -= this.playerGravity
        }
        else {
            this.playerPos.y = this.playerBaseline
            this.playerSpeed.y = 1
            this.playerSpeed.x = 50
        }
    }

    lifeBar() {
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(50, 50, 100, 25)
        this.ctx.fillStyle = "green"
        this.ctx.fillRect(50, 50, this.playerLifeCounter / 10, 25)

    }
}

