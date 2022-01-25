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
            this.framesCounter++
            this.clearAll()
            this.player.draw()
            this.enemies1.forEach(elm => {
                elm.draw()
                elm.move()
                elm.enemy1Erase()

            })
            this.enemies2.forEach(elm => {
                elm.draw()
                elm.move()
            })
            this.platforms.forEach(elm => {
                elm.draw()
            })
            this.checkCollision()
            this.balls.forEach(elm => {
                elm.draw()
                elm.ballMove()
                elm.ballErase()
            })
            if (this.framesCounter % 120 === 0) {
                this.enemies2.forEach(elm => { elm.createEnemyAttack() })
            }
            this.enemyAttacks.forEach(elm => {

                elm.enemyAttackErase()
                elm.draw()
                elm.enemyAttackCollision()
            })
            this.platforms.forEach(elm => {

            })
            console.log(this.player.playerLifeCounter)


        }, 1000 / this.FPS)
    },

    checkCollision(elm) {
        let platformCollided = undefined

        this.platforms.forEach(elm => {
            if (
                elm.platformPos.x < this.player.playerPos.x + this.player.playerSize.w &&
                elm.platformPos.x + elm.platformSize.w > this.player.playerPos.x &&
                elm.platformPos.y < this.player.playerPos.y + this.player.playerSize.h &&
                elm.platformSize.h + elm.platformPos.y > this.player.playerPos.y
            )
                platformCollided = elm
        })
        if (platformCollided) {
            this.player.playerBaseline = platformCollided.platformPos.y - platformCollided.platformSize.h

        } else {
            this.player.playerBaseline = 600
        }
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },

    createEnemy1() {
        this.enemies1.push(
            new Enemy1(this.ctx, this.gameSize.w, 600, 50, 100),
            new Enemy1(this.ctx, 700, 600, 50, 100)
        )
    },


    createEnemy2() {
        this.enemies2.push(
            new Enemy2(this.ctx, 500, 100, 500, 300, 100, 50),
            new Enemy2(this.ctx, 700, 200, 500, 300, 100, 50)
        )
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