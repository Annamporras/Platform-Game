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
    },

    setSize() {
        this.gameSize = { w: 1280, h: 720 }
        document.querySelector('#canvas').setAttribute('width', this.gameSize.w)
        document.querySelector('#canvas').setAttribute('height', this.gameSize.h)
    },

    createPlayer() {
        this.player = new Player(this.ctx, 250, 100, 100, 100)
    },


    createBall() {

        this.balls.push(new Ball(this.ctx, this.player.playerPos.x + this.player.playerSize.w, this.player.playerPos.y + this.player.playerSize.h / 2, 20, 20))
    },

    createPlatform() {
        this.platforms.push(
            new Platform(this.ctx, 100, 500, 200, 70),
            new Platform(this.ctx, 500, 500, 200, 70),
            new Platform(this.ctx, 900, 300, 200, 70),
            new Platform(this.ctx, 1400, 500, 200, 70)
        )
    },


    screenScrollAll() {
        if (this.player.playerPos.x >= 700) {
            this.platforms.forEach(elm => {
                elm.platformPos.x -= this.player.playerSpeed.x / 2
            })
            this.enemies1.forEach(elm => {
                elm.enemy1Pos.x -= this.player.playerSpeed.x / 2
            })
            this.enemies2.forEach(elm => {
                elm.enemy2Pos.x -= this.player.playerSpeed.x / 2
                elm.enemy2S -= this.player.playerSpeed.x / 2
                elm.enemy2F -= this.player.playerSpeed.x / 2

            })
            this.enemyAttacks.forEach(elm => {
                elm.enemyAttackPos.x -= this.player.playerSpeed.x / 2

            })
        }

    },

    drawAll() {
        setInterval(() => {
            this.framesCounter++
            this.framesCounter === 240 ? this.framesCounter = 0 : null
            this.clearAll()
            this.player.draw()
            this.enemies1.forEach(elm => {


                elm.draw()
                elm.move()
                elm.ballCollision()
                // elm.enemy1Collision()
                elm.enemy1Erase()
            })
            this.enemy1Collision()
            this.enemies2.forEach(elm => {


                elm.draw()
                elm.move()
                elm.ballCollision()
            })
            this.enemy2Collision()
            this.platforms.forEach(elm => {
                elm.draw()
            })
            this.platformCheckCollision()
            // this.platformCollision()
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
                elm.ballCollision()
            })



        }, 1000 / this.FPS)
    },


    platformCheckCollision(elm) {
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

    // platformCollision() {

    //     this.platforms.forEach(elm => {
    //         if (this.player.playerPos.y + this.player.playerSize.h <= elm.platformPos.y &&
    //             this.player.playerPos.y +this.player.playerSize.h + this.player.playerSpeed.y >= elm.platformPos.y &&
    //             ) {
    //             this.player.playerSpeed.y = 0
    //         }
    //     })
    // },

    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },

    createEnemy1() {
        this.enemies1.push(
            new Enemy1(this.ctx, 400, 600, 100, 50),
            new Enemy1(this.ctx, 500, 600, 100, 100),
            new Enemy1(this.ctx, 700, 600, 100, 100),
            new Enemy1(this.ctx, 1400, 600, 100, 100),
            new Enemy1(this.ctx, 3000, 600, 100, 100),
            new Enemy1(this.ctx, 2500, 600, 100, 100)
        )
    },



    enemy1Collision() {
        game.enemies1.forEach((elm, idx) => {
            if (game.player.playerPos.x + game.player.playerSize.w >= elm.enemy1Pos.x &&
                game.player.playerPos.x < elm.enemy1Pos.x + elm.enemy1Size.w &&
                game.player.playerPos.y + game.player.playerSize.h > elm.enemy1Pos.y &&
                game.player.playerPos.y < elm.enemy1Pos.y + elm.enemy1Size.h) {
                console.log('me mataaaaan')
                game.player.playerLifeCounter -= 100
            }
            else if (game.player.playerPos.x + game.player.playerSize.w >= elm.enemy1Pos.x &&
                game.player.playerPos.x < elm.enemy1Pos.x + elm.enemy1Size.w &&
                game.player.playerPos.y + game.player.playerSize.h === elm.enemy1Pos.y) {

                console.log('POR ARRIBA')
                game.enemies1.splice(idx, 1)
            }
        })
    },

    enemy2Collision(elm) {
        let enemy2Collided = undefined


        this.enemies2.forEach((elm, idx) => {
            if (this.player.playerPos.x < this.player.playerSize.w >= elm.enemy2Pos.x &&
                this.player.playerPos.x < elm.enemy2Pos.x + elm.enemy2Size.w &&
                this.player.playerPos.y + this.player.playerSize.h > elm.enemy2Pos.y &&
                this.player.playerPos.y < elm.enemy2Pos.y + elm.enemy2Size.h) {
                enemy2Collided = elm
            } if (this.player.playerPos.x + this.player.playerSize.w >= elm.enemy2Pos.x &&
                this.player.playerPos.x < elm.enemy2Pos.x + elm.enemy2Size.w &&
                this.player.playerPos.y < elm.enemy2Pos.y + elm.enemy2Size.h &&
                this.player.playerPos.y + this.player.playerSize.h > elm.enemy2Pos.y) {

                console.log('POR ARRIBA gaviota')
                this.enemies2.splice(idx, 1)
            }

        })
        if (enemy2Collided) {
            console.log('memataaaaaaaaaaaaaaaaaaaaaaaan')
            this.player.playerLifeCounter -= 1
        }

    },


    createEnemy2() {
        this.enemies2.push(
            new Enemy2(this.ctx, 400, 200, 350, 650, 50, 50),
            new Enemy2(this.ctx, 800, 200, 700, 900, 50, 50),
            new Enemy2(this.ctx, 1200, 200, 1000, 1400, 50, 50)

            // new Enemy2(this.ctx, 600, 200, 500, 300, 50, 50),
            // new Enemy2(this.ctx, 700, 300, 500, 300, 50, 25),
            // new Enemy2(this.ctx, 1600, 300, 1600, 300, 50, 50),
        )
    },


    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            if (key === 'ArrowRight') {
                this.player.moveRight()
                this.screenScrollAll()
            }

            // key === 'ArrowRight' ? this.player.moveRight() : null
            key === 'ArrowLeft' ? this.player.moveLeft() : null
            key === 'ArrowUp' ? this.player.jump() : null
            key === 'e' ? this.createBall() : null
        })
    },

}