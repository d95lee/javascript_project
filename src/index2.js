const c = canvas.getContext('2d')
// const playerShoot = document.querySelector('#playerShoot')
const gameOverScreen = document.querySelector('#gameOver')
const scoreEle = document.querySelector('#scoreEle')

c.imageSmoothingEnabled = true
c.imageSmoothingQuality = 'high'

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

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

const player = new Player(300, 100, 30, "grey")

const enemies = []
const projectiles = []
let score = 0
let playerHealth = 100

function animate() {
    const animateAll = requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.x += player.vx // updating player position based on its velocity
    player.y += player.vy
    player.draw() // player is able to move
    // enemy.draw() // enemy is refreshed over and over
    // projectile()
    // updateEnemyPos()
    eachEnemy()
    if (enemies.length === 0) {
        console.log("hit 0")
        createEnemies()
    }
  
    // c.drawImage(playerShoot, 100, 100, img.width/50, img.height/50)
    // playerAnimation()
    
    projectiles.forEach((projectile, idx) => {
    projectile.update()
        
    // Removes the projectiles
    if (projectile.x - projectile.radius < 0 || 
        projectile.x - projectile.radius > canvas.width ||
        projectile.y + projectile.radius < 0 ||
        projectile.y - projectile.radius > canvas.height) {
        setTimeout(() => {
            projectiles.splice(idx, 1) //removes 1 projectile from the array
        }, 0)
        }
    })

    function gameOver() {
        cancelAnimationFrame(animateAll)
        const endScreen = document.querySelector('#gameOver')
        endScreen.style.display
        gameOverScreen.style.display = 'block' // allows our hidden gameover screen to be displayed once our health hits 0
        scoreEle.innerHTML = score // allows score to be displayed
        console.log("Game Over")
    }

    if (playerHealth === 0) {
        gameOver()
    }
}


function eachEnemy() {
    enemies.forEach((enemy, idx) => {
        // enemy.draw()
        enemy.updateEnemyPos()

        projectiles.forEach((projectile, pidx) => {
            const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y) // measures the distance from projectile to the enemy

        if (distance - enemy.radius - projectile.radius < 1) { // we need to check the enemy radius and the projectile radius
            enemies.splice(idx, 1) // removing a single enemy at the specific index
            projectiles.splice(pidx, 1) // removing a single projectile at the specific index
        
            score += 10 // adds 10 to the score
            scoreboard.innerHTML = `Score: ${score}` // shows player score on the screen
        }
        })

            const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        if (distance - enemy.radius - (player.radius) < 1 ) { //distance between player and enemy
            playerHealth -= 5 // subtracts 0.2 to playerhealth for every millisecond of contact
            health.innerHTML = `Health: ${playerHealth}` // displays changing health
        }
    })
}


function createEnemies() {
    let maxEnemy = 3
    
    // if (enemies.length === 0) {
    //     maxEnemy += 3
    //  }

    for (let i = 0; i < maxEnemy; i++) {
    const randomColor = ['red', 'blue', 'green', 'black']
    const randomValue = randomColor[Math.floor(randomColor.length * Math.random())];

    let x = Math.floor(Math.random() * canvas.width)
    let y = Math.floor(Math.random() * canvas.height)
    let velocity = { 
        x: 1,
        y: 1
    }

    enemies.push(new Enemy(x, y, 20, randomValue, velocity)) // pushing newly created enemy into array
    }
}


addEventListener('click', (e) => {
    const angle = Math.atan2(e.clientY - (player.y + player.radius), e.clientX - (player.x + player.radius))   // - 75 for y    - 30 for x seems to be the best for accuracy
    const velocity = {
        x: Math.cos(angle) * 10,
        y: Math.sin(angle) * 10
    }
    
    projectiles.push(new Projectile(player.x - player.radius, player.y - player.radius, 5, 'red', velocity))
})

// SPRITE ANIMATION 

// let columnIdx = 5
// let rowIdx = 5

// let frameWidth = playerShoot.width / columnIdx
// let frameHeight = playerShoot.height / rowIdx

// let currentFrame = 0

// setInterval(function() {
//     currentFrame++ 

//     let maxFrame = columnIdx * rowIdx - 1
//     if (currentFrame > maxFrame) {
//         currentFrame = 0
//     }

//     let column = currentFrame % columnIdx
//     let row = currentFrame % rowIdx
    
//     c.clearRect(0, 0, canvas.width, canvas.height)
//     c.drawImage(playerShoot, column * frameWidth, row * frameHeight, frameWidth, frameHeight,
//                 10, 30, frameWidth, frameHeight)
// }, 100)


animate();
createEnemies();
