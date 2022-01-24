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



    init() {
        this.setContext()
        this.setSize()
        this.setEventHandlers()
        this.createPlayer()
        this.createBall()
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
        this.player = new Player(this.ctx, 100, 100, 100, 100)

    },


    createBall() {
        this.balls.push(new Ball(this.ctx, this.player.playerPos.x + this.player.playerSize.w, this.player.playerPos.y + this.player.playerSize.h / 2, 75, 75))
    },

    drawAll() {
        setInterval(() => {
            console.log('fotograma')
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
            })
            this.balls.forEach(elm => {
                elm.draw()
            })
            this.enemyAttacks.forEach(elm => {
                elm.draw()

            })

        }, 10)
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
    createPlatform() {
        const platform = new Platform(this.ctx, 0, 500, 700, 25)
        this.platforms.push(platform)
    },

    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            key === 'ArrowRight' ? this.player.moveRight() : null
            key === 'ArrowLeft' ? this.player.moveLeft() : null
            key === 'ArrowUp' ? this.player.moveUp() : null
            key === 'ArrowDown' ? this.player.moveDown() : null
        })
    },

}