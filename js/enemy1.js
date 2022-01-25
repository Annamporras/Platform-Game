class Enemy1 {
    constructor(ctx, posX, posY, width, height) {
        this.ctx = ctx
        this.enemy1Pos = { x: posX, y: posY }
        this.enemy1Size = { w: width, h: height }
        this.enemy1Baseline = undefined
        this.enemy1Speed = 1
        this.imageInstance = undefined
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/rat.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.enemy1Pos.x, this.enemy1Pos.y, this.enemy1Size.w, this.enemy1Size.h)
        this.move()
    }


    move() {
        this.enemy1Pos.x -= this.enemy1Speed
    }

    enemy1Erase() {
        game.enemies1 = game.enemies1.filter(elm => elm.enemy1Pos.x >= 0 - elm.enemy1Size.w)
        // game.balls = game.balls.filter(elm => elm.bounc !== 3)


    }
}