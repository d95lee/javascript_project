const c = canvas.getContext('2d')
const playerShoot = document.querySelector('#playerShoot')
const scoreboard = document.querySelector("#scoreboard")
const gameOverScreen = document.querySelector('#gameOver')
const scoreEle = document.querySelector('#scoreEle')
const startScreen = document.querySelector('#startScreen')
const scoreboardContainer = document.querySelector('.scoreboard-container')
const restartButton = document.querySelector('#restart')

// const playerImage = new Image();
// playerImage.src = '/shadow_dog.png'

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

        document.addEventListener("keydown", this.handleKeyDown.bind(this)); // ensures the context of this remains the same
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

    updateEnemyPos() { // note enemies still vibrate back and forth...
        let xDiff = player.x - this.x // player position - enemy position 
        let yDiff = player.y - this.y // negative about this method is the vibrations caused by the sudden shift in the x and y axis
    
        const angle = Math.atan2(player.y - this.y, player.x - this.x) // angular distance from player to the enemy

        this.x += Math.cos(angle)
        this.y += Math.sin(angle)

        this.draw()
        // red, blue, black, green
        // changes/increases direction in the x axis
        if (xDiff > 0) { // if the difference in xposition is > 0 then chase player x, y, and diagonally
            if (this.color === 'red') {
                this.x += 0.2
            } else if (this.color === 'blue') {
                this.x += 1
            } else if (this.color === 'black') {
                this.x += 2
            } else if (this.color === 'green') {
                this.x += 3
            } 
        } else {
            if (xDiff < 0 && this.color === 'red') {
                this.x -= 0.2 
            } else if (this.color === 'blue') {
                this.x -= 1
            } else if (this.color === 'black') {
                this.x -= 2
            } else if (this.color === 'green') {
                this.x -=3
            }    
        }
            // changes/increases direction in the y axis
        if (yDiff > 0) {
            if (this.color === 'red') {
                this.y += 0.2 // if the difference in yposition is > 0 then chase player
            } else if (this.color === 'blue') {
                this.y += 1
            } else if (this.color === 'black') {
                this.y += 2
            } else if (this.color === 'green') {
                this.y += 3
            } 
        } else {
            if (yDiff < 0 && this.color === 'red') {
                this.y -= 0.2 
            } else if (this.color === 'blue') {
                this.y -= 1
            } else if (this.color === 'black') {
                this.y -= 2
            } else if (this.color === 'green') {
                this.y -=3
            }
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

let enemies = []
let projectiles = []
let score = 0
let playerHealth = 100

const spriteWidth = 575
const spriteHeight = 523

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    const animateAll = requestAnimationFrame(animate)
    player.x += player.vx // updating player position based on its velocity
    player.y += player.vy
    player.draw() // player is able to move
    // enemy.draw() // enemy is refreshed over and over
    // projectile()
    // updateEnemyPos()
    eachEnemy()
    if (enemies.length === 0) {
        createEnemies()
    }
  
    // c.drawImage(playerShoot, 100, 100, 100, playerShoot.height/100)
    // c.drawImage(playerImage, 0, 0,1 * spriteWidth, 3 * spriteHeight, 0, 0, spriteWidth, spriteHeight)
    
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

    if (playerHealth <= 0) {
        gameOver()
        scoreboardContainer.style.display = 'none'
    }

    if (startScreen.style.display == 'block') {
        cancelAnimationFrame(animateAll)
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
            if (enemy.color === 'red') {
                score += 10 // adds 10 to the score
                scoreboard.innerHTML = `Score: ${score}` // shows player score on the screen
            } else if (enemy.color === 'blue') {
                score += 20
                scoreboard.innerHTML = `Score: ${score}`
            } else if (enemy.color === 'black') {
                score += 30 
                scoreboard.innerHTML = `Score: ${score}`
            } else if (enemy.color === 'green') {
                score += 50
                scoreboard.innerHTML = `Score: ${score}`
            }
        }
        })// red, blue, black, green

            const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        if (distance - enemy.radius - (player.radius) < 1 ) { //distance between player and enemy
            playerHealth -= 1 // subtracts 0.2 to playerhealth for every millisecond of contact
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
    const randomValue = randomColor[Math.floor(randomColor.length * Math.random())]; // randomly selects color in array

    let x = Math.floor(Math.random() * canvas.width) // random x variable
    let y = Math.floor(Math.random() * canvas.height) // random y variable

    enemies.push(new Enemy(x, y, 20, randomValue, this.velocity)) // pushing newly created enemy into array
    }
}

function newGame() { // reseting all arrays and variables
    projectiles = []
    enemies = []
    score = 0
    playerHealth = 100

    let healthUI = document.querySelector('#health')
    healthUI.innerHTML = `Health: ${playerHealth}`

    let scoreUI = document.querySelector('#scoreboard')
    scoreUI.innerHTML = `Score: ${score}` 
}

addEventListener('click', (e) => {
    const angle = Math.atan2(e.clientY - player.y, e.clientX - player.x) // calculates angular distance from mouse click to player
    const velocity = {
        x: Math.cos(angle) * 10, // increasing x velocity by 10
        y: Math.sin(angle) * 10
    }

    projectiles.push(new Projectile(player.x, player.y, 5, 'red', velocity))
})

restartButton.addEventListener('click', (e) => {
    newGame() // resets everything
    animate() // reanimates the game
    gameOverScreen.style.display = 'none' // hides the gameover display
    scoreboardContainer.style.display = 'block'
})

const startButton = document.querySelector('#start')
startButton.addEventListener('click', (e) => {
    newGame()
    animate()
    startScreen.style.display = 'none'
    scoreboardContainer.style.display = 'block'
})

// SPRITE ANIMATION 

// let column = 1
// let row = 5

// let frameWidth = playerShoot.width / column
// let frameHeight = playerShoot.height / row

// let currentFrame = 0

// setInterval(function() {
//     currentFrame++ 

//     let maxFrame = column * row - 1
//     if (currentFrame > maxFrame) {
//         currentFrame = 0
//     }

//     let column = currentFrame % column
//     let row = currentFrame % row
    
//     c.clearRect(0, 0, canvas.width, canvas.height)
//     c.drawImage(playerShoot, column * frameWidth, row * frameHeight, frameWidth, frameHeight,
//                 10, 30, frameWidth, frameHeight)
// }, 100)


// animate(); // commenting this out makes it so that no players or enemies spawn at the start of the game
createEnemies();
