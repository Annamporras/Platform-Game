class Player {
    constructor(ctx, posX, posY, width, height) {
        this.ctx = ctx
        this.playerPos = { x: posX, y: posY }
        this.playerSize = { w: width, h: height }
        this.playerBaseline = undefined
        this.playerSpeed = undefined
        this.playerLifeCounter = 100
        this.imageInstance = undefined

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/block.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
    }


    moveLeft() { this.playerPos.x > 0 ? this.playerPos.x -= 25 : null }
    moveRight() { this.playerPos.x < game.gameSize.w ? this.playerPos.x += 25 : null }
    moveUp() { this.playerPos.y > 0 ? this.playerPos.y -= 25 : null }
    moveDown() { this.playerPos.y < game.gameSize.h ? this.playerPos.y += 25 : null }

}

