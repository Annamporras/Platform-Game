class Enemy1 {
    constructor(ctx, posX, posY, width, height) {
        this.ctx = ctx
        this.enemy1Pos = { x: posX, y: posY }
        this.enemy1Size = { w: width, h: height }
        this.enemy1Baseline = undefined
        this.enemy1Speed = undefined
        this.imageInstance = undefined
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/rat.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.enemy1Pos.x, this.enemy1Pos.y, this.enemy1Size.w, this.enemy1Size.h)
    }
}