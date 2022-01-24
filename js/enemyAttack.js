class EnemyAttack {

    constructor(ctx, posX, posY, width, height) {


        this.ctx = ctx
        this.enemyAttackPos = { x: posX, y: posY }
        this.enemyAttackSize = { w: width, h: height }
        this.enemyAttackSpeed = { x: 10, y: 1 }
        this.enemyAttackGravity = 1

        this.init()
    }




    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/enemyAttack.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.enemyAttackPos.x, this.enemyAttackPos.y, this.enemyAttackSize.w, this.enemyAttackSize.h)
    }

}