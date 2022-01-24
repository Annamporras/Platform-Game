const game = {
    appName: 'proyecto1',
    authors: 'Judit Angulo, Arseni Chirkov, Anna Ma Porras',
    version: '1.0.0',
    license: undefined,
    gameSize: { w: undefined, h: undefined },
    ctx: undefined,
    FPS: 60,
    framesCounter: 0,

    enemies1: [],
    enemies2: [],
    platforms: [],
    enemyAttacks: [],
    balls: [],
    player: undefined,



    init() {
        this.setContext()
        this.setSize()
        this.setEventHandlers()
        this.createPlayer()

        this.createEnemy1()
        this.createEnemy2()
        this.createPlatform()


        this.enemies2.forEach(elm => { elm.createEnemyAttack() })
        this.drawAll()


    },


    setContext() {
        this.ctx = document.querySelector('#canvas').getContext('2d')
        console.log(this.ctx)
    },

    setSize() {
        this.gameSize = { w: window.innerWidth, h: window.innerHeight }
        document.querySelector('#canvas').setAttribute('width', this.gameSize.w)
        document.querySelector('#canvas').setAttribute('height', this.gameSize.h)

    },

    createPlayer() {
        this.player = new Player(this.ctx, 100, 600, 100, 100)

    },


    createBall() {
        console.log('bola creada')
        this.balls.push(new Ball(this.ctx, this.player.playerPos.x + this.player.playerSize.w, this.player.playerPos.y + this.player.playerSize.h / 2, 20, 20))
    },

    createPlatform() {
        this.platforms.push(
            new Platform(this.ctx, 100, 500, 200, 70),
            new Platform(this.ctx, 500, 500, 200, 70),
            new Platform(this.ctx, 900, 300, 200, 70)
        )

    },

    drawAll() {
        setInterval(() => {
            this.clearAll()
            this.player.draw()
            this.enemies1.forEach(elm => {
                elm.draw()
            })
            this.enemies2.forEach(elm => {
                elm.draw()
            })
            this.platforms.forEach(elm => {
                elm.draw()
                this.checkCollision(elm)
            })
            this.balls.forEach(elm => {
                elm.draw()
                elm.ballMove()
                elm.ballErase()
            })
            this.enemyAttacks.forEach(elm => {
                elm.draw()
            })
            this.platforms.forEach(elm => {

            })


        }, 1000 / 60)
    },

    checkCollision(elm) {
        console.log(this.player.playerBaseline)   // SÍ CAMBIA

        if (elm.platformPos.x < this.player.playerPos.x + this.player.playerSize.w &&
            elm.platformPos.x + elm.platformSize.w > this.player.playerPos.x &&
            elm.platformPos.y < this.player.playerPos.y + this.player.playerSize.h &&
            elm.platformSize.h + elm.platformPos.y > this.player.playerPos.y) {

            this.player.playerBaseline = elm.platformPos.y - elm.platformSize.h
        } else {
            this.player.playerBaseline = 600
        }
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },

    createEnemy1() {
        const enemy1 = new Enemy1(this.ctx, 300, 300, 50, 100)
        this.enemies1.push(enemy1)
    },


    createEnemy2() {
        const enemy2 = new Enemy2(this.ctx, 500, 100, 100, 50)
        this.enemies2.push(enemy2)
    },


    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            key === 'ArrowRight' ? this.player.moveRight() : null
            key === 'ArrowLeft' ? this.player.moveLeft() : null
            key === 'ArrowUp' ? this.player.jump() : null
            key === 'e' ? this.createBall() : null

        })
    },

}