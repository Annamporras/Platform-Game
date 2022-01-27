class Player {
    constructor(ctx, posX, posY, width, height) {
        this.ctx = ctx
        this.playerPos = { x: posX, y: posY }
        this.playerSize = { w: width, h: height }
        this.playerBaseline = 600
        this.playerSpeed = { x: 10, y: 1 }
        this.playerGravity = 0.5
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
        // NO CAMBIA
    }


    moveLeft() {
        if (this.playerPos.y !== this.playerBaseline) {
            this.playerPos.x -= this.playerSpeed.x * this.playerGravity
        } else { this.playerPos.x -= this.playerSpeed.x * this.playerGravity }

        // this.playerPos.x -= this.playerSpeed.x
    }

    moveRight() {
        if (this.playerPos.x <= 700) {
            if (this.playerPos.y !== this.playerBaseline) {
                this.playerPos.x += this.playerSpeed.x * this.playerGravity
            } else { this.playerPos.x += this.playerSpeed.x * this.playerGravity }
        }

        // this.playerPos.x += this.playerSpeed.x
    }

    // jump() {
    //     if (this.playerPos.y + this.playerSize.h >= this.playerBaseline) {
    //         // this.playerPos.y -= 100
    //         this.playerSpeed.y -= 20
    //         console.log('saltandooo')

    //     }
    // }
    jump() {
        if (this.playerPos.y + this.playerSize.h >= this.playerBaseline) {
            this.playerPos.y -= 100
            this.playerSpeed.y -= 20
            console.log('saltandooo')

        }
    }

    moveDown() {
        // está en el aire
        if (this.playerPos.y < this.playerBaseline) {
            //le suma su velocidad en y para que baje
            this.playerSpeed.y += this.playerGravity
            this.playerPos.y += this.playerSpeed.y
            this.playerSpeed.x -= this.playerGravity
        } else {
            this.playerPos.y = this.playerBaseline
            this.playerSpeed.y = 1
            this.playerSpeed.x = 50
        }
    }

    // moveDown() {
    //     // if (this.playerPos.y < this.playerBaseline) 
    //     this.playerPos.y += this.playerSpeed.y

    //     if (this.playerPos.y + this.playerSize.h + this.playerSpeed.y <= this.playerBaseline) {
    //         this.playerSpeed.y += this.playerGravity
    //     }
    //     else { this.playerSpeed.y = 0 }

    // }

    lifeBar() {
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(50, 50, 1000, 25)
        this.ctx.fillStyle = "green"
        this.ctx.fillRect(50, 50, this.playerLifeCounter, 25)
    }
}

