class Platform {
    constructor(ctx, posX, posY, width, height) {
        this.ctx = ctx
        this.platformPos = { x: posX, y: posY }
        this.platformSize = { w: width, h: height }
        this.imageInstance = undefined
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/platform.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.platformPos.x, this.platformPos.y, this.platformSize.w, this.platformSize.h)
    }

}
