class Enemy2 {
    constructor(ctx, posX, posY, posOr, moveDist, width, height,) {
        this.ctx = ctx
        this.enemy2Pos = { x: posX, y: posY }
        this.enemyOrigin = posOr
        this.moveDistance = moveDist

        this.enemy2Size = { w: width, h: height }
        this.enemy2Baseline = undefined
        this.enemy2Speed = 2
        this.imageInstance = undefined

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/bird.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.enemy2Pos.x, this.enemy2Pos.y, this.enemy2Size.w, this.enemy2Size.h)
        this.move()
    }

    createEnemyAttack() {
        game.enemyAttacks.push(new EnemyAttack(this.ctx, this.enemy2Pos.x + this.enemy2Size.w / 2, this.enemy2Pos.y + this.enemy2Size.h, 25, 25))
    }

    move() {

        this.enemy2Pos.x += this.enemy2Speed
        if (this.enemy2Pos.x > this.enemyOrigin + this.moveDistance || this.enemy2Pos.x < this.enemyOrigin - this.moveDistance) {
            this.enemy2Speed *= -1

        }

    }
}