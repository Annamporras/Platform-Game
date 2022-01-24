class Enemy2 {
    constructor(ctx, posX, posY, width, height) {
        this.ctx = ctx
        this.enemy2Pos = { x: posX, y: posY }
        this.enemy2Size = { w: width, h: height }
        this.enemy2Baseline = undefined
        this.enemy2Speed = undefined
        this.imageInstance = undefined

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/bird.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.enemy2Pos.x, this.enemy2Pos.y, this.enemy2Size.w, this.enemy2Size.h)
    }

    createEnemyAttack() {
        game.enemyAttacks.push(new EnemyAttack(this.ctx, this.enemy2Pos.x + this.enemy2Size.w / 2, this.enemy2Pos.y + this.enemy2Size.h, 75, 75))
    }
}