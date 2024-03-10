const c = canvas.getContext('2d')

class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius 
        this.color = color
        this.vx = 0 //velocity in the x direction
        this.vy = 0 //velocity in the y direction

        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    handleKeyDown(e) { // Every time a key is pressed down, in moves in the x, y direction respectively
        if (e.code === "KeyA") this.vx = -5;
        if (e.code === "KeyD") this.vx = 5;
        if (e.code === "KeyW") this.vy = -5;
        if (e.code === "KeyS") this.vy = 5;
    }

    handleKeyUp(e) { // Every time a key is released, all movement in the respective x, y direction stop
        if (e.code === "KeyA") this.vx = 0;
        if (e.code === "KeyD") this.vx = 0;
        if (e.code === "KeyW") this.vy = 0;
        if (e.code === "KeyS") this.vy = 0;
    }

    draw() {
        c.beginPath()
        c.fillStyle = this.color // setting the fill color before filling in the shape
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false)
        c.fill()
        c.stroke()
        c.closePath()
    }
}


class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false)
        c.fill()
        c.stroke()
        c.closePath()
    }

    updateEnemyPos() {
        let xDiff = player.x - this.x // player position - enemy position 
        let yDiff = player.y - this.y 
    
        this.draw()

        if (xDiff > 0) {
            this.x += 0.2 // if the difference in xposition is > 0 then chase player
        } else {
            this.x -= 0.2
        }
    
        if (yDiff > 0) {
            this.y += 0.2
        } else {
            this.y -= 0.2
        }
    }


}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.vx = 0
        this.vy = 0
    }

    draw() {
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false)
        c.fill()
        c.stroke()
        c.closePath()
    }
}

const player = new Player(300, 100, 30, "grey")
const bullet = new Projectile(400, 400, 5, "red")

const enemies = []
const projectiles = []

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.x += player.vx // updating player position based on its velocity
    player.y += player.vy
    player.draw() // player is able to move
    // enemy.draw() // enemy is refreshed over and over
    bullet.draw()
    projectile()
    // updateEnemyPos()
    eachEnemy()
    
}

function eachEnemy() {
    enemies.forEach((e) => {
        e.draw()
        e.updateEnemyPos()
    })
}


function projectile() {
    let xdir = bullet.x 
    let ydir = bullet.y

    if (xdir > 0) {
        xdir += 3
    } else {
        xdir -= 3
    }

    if (ydir > 0) {
        ydir += 3
    } else {
        ydir -= 3
    }
}

function createEnemies() {
    for (let i = 0; i < 3; i++) {
    const randomColor = ['red', 'blue', 'green', 'black']
    const randomValue = randomColor[Math.floor(randomColor.length * Math.random())];

    let x = Math.floor(Math.random() * canvas.width)
    let y = Math.floor(Math.random() * canvas.height)
    let velocity = { 
        x: 1,
        y: 1
    }

    enemies.push(new Enemy(x, y, 20, randomValue, velocity))
    }
}

addEventListener('click', (e) => {
    const angle = Math.atan2(e.clientY - (player2.y + player2.height/2) - 75, e.clientX - (player2.x + player2.width/2)- 30)   // - 75 for y    - 30 for x seems to be the best for accuracy
})

animate();
createEnemies();
// animateSpawnEnemies()