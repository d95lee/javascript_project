const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d')
const playerShoot = document.querySelector('#playerShoot')
const scoreboard = document.querySelector("#scoreboard")
const gameOverScreen = document.querySelector('#gameOver')
const scoreEle = document.querySelector('#scoreEle')
const startScreen = document.querySelector('#startScreen')
const scoreboardContainer = document.querySelector('.scoreboard-container')
const restartButton = document.querySelector('#restart')
const music = document.querySelector('#music')
const gunshot = document.querySelector('#gunshot')
const gunshotButton = document.querySelector('#gunshotButton')
const musicButton = document.querySelector('#musicButton')
const levelEle = document.querySelector('#levelEle')
const gameOverLevel = document.querySelector('#gameOverLevel')
const social = document.querySelector('.socials:nth-child(1)')
const social2 = document.querySelector('.socials:nth-child(2)')
const hardModeButton = document.querySelector('#hard-mode')
const easyModeButton = document.querySelector('#easy-mode')

canvas.width = 1820;
canvas.height = 800;

const playerImage = new Image();
playerImage.src = './assets/player/player.png'

const enemyImage = new Image();
enemyImage.src = './assets/enemy/red_zombie.png'

const enemyImage2 = new Image();
enemyImage2.src = './assets/enemy/blue_zombie.png'

const enemyImage3 = new Image();
enemyImage3.src = './assets/enemy/black_zombie.png'

const enemyImage4 = new Image();
enemyImage4.src = './assets/enemy/green_zombie.png'


hardModeButton.addEventListener('click', () => {

class Player {
    constructor(x, y, playerSprite) {
        this.x = x
        this.y = y
        this.playerSprite = playerSprite 
        this.width = 30
        this.height = 30
        this.vx = 0 //velocity in the x direction
        this.vy = 0 //velocity in the y direction

        document.addEventListener("keydown", this.handleKeyDown.bind(this)); // ensures the context of this remains the same
        document.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    handleKeyDown(e) { // Every time a key is pressed down, in moves in the x, y direction respectively
        if (e.code === "KeyA") this.vx = -3;
        if (e.code === "KeyD") this.vx = 3;
        if (e.code === "KeyW") this.vy = -3;
        if (e.code === "KeyS") this.vy = 3;
    }

    handleKeyUp(e) { // Every time a key is released, all movement in the respective x, y direction stop
        if (e.code === "KeyA") this.vx = 0;
        if (e.code === "KeyD") this.vx = 0;
        if (e.code === "KeyW") this.vy = 0;
        if (e.code === "KeyS") this.vy = 0;
    }

    draw() { //creates the image for the small dog that will now replace the circle 
        c.drawImage(this.playerSprite, 205, 240, spriteWidth, spriteHeight, this.x, this.y,
                    this.width * 2, this.height * 2)
    }
    
    update() {
        this.x += this.vx; // Updates player position based on velocity
        this.y += this.vy;

        if (this.x < 0) {
            this.x = 0
        } else if (this.y < 0) {
            this.y = 0
        } else if (this.x > canvas.width - this.width) { // if player xpos is > the width of the canvas - the width of the player 
            this.x = canvas.width - this.width // then set player xpos to the width of the canvas - the height of the player 
        } else if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height
        }
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

    draw() {  // draws red zombie
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false)
        c.save()
        c.clip()
        c.drawImage(enemyImage, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2)
        c.restore()
        c.closePath()
    }

    draw2() { // draws blue zombie
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false)
        c.save()
        c.clip()
        c.drawImage(enemyImage2, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2)
        c.restore()
        c.closePath()
    }

    draw3() { // draws black zombie
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false)
        c.save()
        c.clip()
        c.drawImage(enemyImage3, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2)
        c.restore()
        c.closePath()
    }

    draw4() { // draws green zombie
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false)
        c.save()
        c.clip()
        c.drawImage(enemyImage4, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2)
        c.restore()
        c.closePath()
    }

    updateEnemyPos() { 
        let xDiffOffset = player.width/2 // So the enemy follows the middle of the player instead of outside the player
        let yDiffOffset = player.height/2
        
        let xDiff = (player.x + xDiffOffset) - this.x // player position - enemy position 
        let yDiff = (player.y + yDiffOffset) - this.y // negative about this method is the vibrations caused by the sudden shift in the x and y axis

        const angle = Math.atan2((player.y + yDiffOffset + 20) - this.y, (player.x + xDiffOffset) - this.x) // angular distance from player to the enemy

        this.x += Math.cos(angle)
        this.y += Math.sin(angle)

        this.draw()
        // changes/increases direction in the x axis
         
        if (xDiff > 0) { // if the difference in xposition is > 0 then chase player x, y, and diagonally
            if (this.color === 'red') {
                this.x += 0.2 + (level * 0.05) // as levels increase, speed of enemies increase
            } else if (this.color === 'blue') {
                this.x += 0.4 + (level * 0.05)
            } else if (this.color === 'black') {
                this.x += 0.6 + (level * 0.05)
            } else if (this.color === 'green') {
                this.x += 1 + (level * 0.05)
            } 
        } else {
            if (xDiff < 0 && this.color === 'red') {
                this.x -= 0.2 + (level * 0.05)
            } else if (this.color === 'blue') {
                this.x -= 0.4 + (level * 0.05)
            } else if (this.color === 'black') {
                this.x -= 0.6 + (level * 0.05)
            } else if (this.color === 'green') {
                this.x -= 1 + (level * 0.05)
            }    
        }
            // changes/increases direction in the y axis
            if (yDiff > 0) {
                if (this.color === 'red') {
                    this.y += 0.2 + (level * 0.05) // if the difference in yposition is > 0 then chase player
                } else if (this.color === 'blue') {
                    this.y += 0.4 + (level * 0.05)
                } else if (this.color === 'black') {
                    this.y += 0.6 + (level * 0.05) 
                } else if (this.color === 'green') {
                    this.y += 1 + (level * 0.05)
                } 
        } else {
            if (yDiff < 0 && this.color === 'red') {
                this.y -= 0.2 + (level * 0.05) 
            } else if (this.color === 'blue') {
                this.y -= 0.4 + (level * 0.05)
            } else if (this.color === 'black') {
                this.y -= 0.6 + (level * 0.05)
            } else if (this.color === 'green') {
                this.y -= 1 + (level * 0.05)
            }
        }
    }

        speedIncrease () {
            if (xDiff > 0) {
                this.x += 1
            } else if (xDiff < 0) {
                this.x -= 1
            } else if (yDiff > 0) {
                this.y += 1
            } else if (yDiff < 0) {
                this.y -= 1
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
        c.shadowColor = '#899'
        c.shadowBlur = 9
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

let enemies = []
let projectiles = []
let enemyProjectiles = []
let score = 0
let playerHealth = 100
let level = 0


const spriteWidth = 34 // specific coordinates to select character from sprite sheet
const spriteHeight = 42
const player = new Player(100, 100, playerImage);


function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height) // clears the canvas 
    const animateAll = requestAnimationFrame(animate)
    player.x += player.vx // updating player position based on its velocity
    player.y += player.vy
    
    player.update(); // updates the player x and y axis 
    player.draw(); // draws the player in the updated location

    eachEnemy() // calls on the function to draw zombies and handles most of the collision logic as we iteration through each enemy
    if (enemies.length === 0) {
        level += 1
        createEnemies() // creates more enemies as the levels increase
        levelEle.innerHTML = `Level: ${level}`
    }

    projectiles.forEach((projectile, idx) => {
        projectile.update()

        // Removes the projectiles
        if (projectile.x - projectile.radius < 0 || 
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height) {
                projectiles.splice(idx, 1) //removes 1 projectile from the array
            }
        })


    function gameOver() {
        cancelAnimationFrame(animateAll) // cancels all animations
        const endScreen = document.querySelector('#gameOver')
        endScreen.style.display
        gameOverScreen.style.display = 'block' // allows our hidden gameover screen to be displayed once our health hits 0
        scoreEle.innerHTML = `${score} Points` // allows score to be displayed
        gameOverLevel.innerHTML = `Survived until level ${level}` // allows level to be displayed
    }

    if (playerHealth <= 0) {
        gameOver()
        scoreboardContainer.style.display = 'none' // hides the scoreboard once it's gameover
        levelEle.style.display = 'none' // hides the level display once it's gameover
    }

    if (startScreen.style.display == 'block') {
        cancelAnimationFrame(animateAll)
    }

    enemyProjectiles.forEach((projectile) => {
        projectile.update()
        projectile.draw()
    })

}


function eachEnemy() {
    enemies.forEach((enemy, idx) => {
        
        enemy.updateEnemyPos()

        if (enemy.color === "red") { // drawing the different types/colors of zombies
            enemy.draw()
        } else if (enemy.color === "blue") {
            enemy.draw2()
        } else if (enemy.color === "black") {
            enemy.draw3()
        } else {
            enemy.draw4()
        }
    
        // iterating through projectiles array 
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
        })

        // Collision logic below nested in an enemy loop
        let xDiffOffset = player.width/2 // So the enemy follows the middle of the player instead of outside the player
        let yDiffOffset = player.height/2

        enemyProjectiles.forEach((projectile, pidx) => {
            const distance = Math.hypot(projectile.x - (player.x + xDiffOffset), projectile.y - (player.y + yDiffOffset)) // measures the distance from projectile to the player
            if (distance - player.width - projectile.radius < 1) { // we need to check the enemy radius and the projectile radius
                enemyProjectiles.splice(pidx, 1)
                playerHealth -= 5
                health.innerHTML = `Health: ${playerHealth}` // shows player health on screen
            }
        })

            // measures distance from player to the enemy and subtracts 1 if player hitbox overlaps with enemy
            const distance = Math.hypot((player.x + xDiffOffset) - enemy.x, (player.y + yDiffOffset) - enemy.y) - enemy.radius // measures distance from player to the enemy
            
        if (distance - (enemy.radius/2) - (player.width/6) - (player.height/6) < 1 ) { //distance between player and enemy
            playerHealth -= 1 // subtracts 0.2 to playerhealth for every millisecond of contact
            health.innerHTML = `Health: ${playerHealth}` // displays changing health
        }
    })
}


function createEnemies() {
    let maxEnemy = 1
    
    maxEnemy = (level * 2) - 1
    if (level >= 1) {
        enemies.forEach((enemy) => {
            enemy.speedIncrease() // increases speed of enemies for every level increase
        })
        enemyProjectiles = []
    }

    for (let i = 0; i < maxEnemy; i++) {
    const randomColor = ['red', 'blue', 'green', 'black']
    const randomValue = randomColor[Math.floor(randomColor.length * Math.random())]; // randomly selects color in array

    let x = Math.floor(Math.random() * canvas.width) // random x variable
    let y = Math.floor(Math.random() * canvas.height) // random y variable

    enemies.push(new Enemy(x, y, 30, randomValue, this.velocity)) // pushing newly created enemy into array
        
    enemies.forEach((enemy) => {
        enemy.updateEnemyPos();
            if (enemy.color === 'red') {
                const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x)
                const velocity = {
                    x: Math.cos(angle) * 2, // increasing x velocity by 10
                    y: Math.sin(angle) * 2
                }
                enemyProjectiles.push(new Projectile(enemy.x, enemy.y, 3, 'blue', velocity))
            }
        })
    }
}

function newGame() { // reseting all arrays and variables
    projectiles = []
    enemyProjectiles = []
    enemies = []
    score = 0
    playerHealth = 100
    level = 0

    let healthUI = document.querySelector('#health')
    healthUI.innerHTML = `Health: ${playerHealth}`

    let scoreUI = document.querySelector('#scoreboard')
    scoreUI.innerHTML = `Score: ${score}` 
}
 
let shoot = true 
addEventListener('click', (e) => {
    if (shoot) {
    const offsetX = 55 // offsets the x so that bullet comes out of gun
    const offsetY = 30  // In angle variable subtracting player by offset to fix the angle difference caused by offset
    const angle = Math.atan2(e.clientY - player.y - offsetY, e.clientX - player.x - offsetX) // calculates angular distance from mouse click to player
    
    const velocity = {
        x: Math.cos(angle) * 10, // increasing x velocity by 10
        y: Math.sin(angle) * 10
    }

    if (projectiles.push(new Projectile(player.x + offsetX, player.y + offsetY, 3, 'red', velocity))) {
        addEventListener('click', () => {
            gunshot.play();
            gunshot.volume = 0.2
        })
    }
        shoot = false    
        setTimeout(() => {
            shoot = true
        }, 500)
    }
})


restartButton.addEventListener('click', () => {
    newGame() // resets everything
    animate() // reanimates the game
    music.play()
    music.volume = 0.2
    gameOverScreen.style.display = 'none' // hides the gameover display
    scoreboardContainer.style.display = 'block'
    levelEle.style.display = 'block'
})


musicButton.addEventListener('click', () => {
    if (music.paused) { //music.paused returns a boolean value
        music.play()
        music.volume = 0.2
    } else {
        music.pause()
        music.currentTime = 0;
    }
})

hardModeButton.addEventListener('click', () => {
    newGame()
    animate()
    music.play()
    music.volume = 0.2
    startScreen.style.display = 'none'
    scoreboardContainer.style.display = 'block'
    levelEle.style.display = 'block'
    social.style.display = 'block'
    social2.style.display = 'block'
    })
})


musicButton.addEventListener('click', () => {
    if (music.paused) { //music.paused returns a boolean value
        music.play()
        music.volume = 0.2
    } else {
        music.pause()
        music.currentTime = 0;
    }
})

easyModeButton.addEventListener('click', () => {

class Player {
    constructor(x, y, playerSprite) {
        this.x = x
        this.y = y
        this.playerSprite = playerSprite 
        this.width = 30
        this.height = 30
        this.vx = 0 //velocity in the x direction
        this.vy = 0 //velocity in the y direction

        document.addEventListener("keydown", this.handleKeyDown.bind(this)); // ensures the context of this remains the same
        document.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    handleKeyDown(e) { // Every time a key is pressed down, in moves in the x, y direction respectively
        if (e.code === "KeyA") this.vx = -3;
        if (e.code === "KeyD") this.vx = 3;
        if (e.code === "KeyW") this.vy = -3;
        if (e.code === "KeyS") this.vy = 3;
    }

    handleKeyUp(e) { // Every time a key is released, all movement in the respective x, y direction stop
        if (e.code === "KeyA") this.vx = 0;
        if (e.code === "KeyD") this.vx = 0;
        if (e.code === "KeyW") this.vy = 0;
        if (e.code === "KeyS") this.vy = 0;
    }

    draw() { //creates the image for the small dog that will now replace the circle 
        c.drawImage(this.playerSprite, 205, 240, spriteWidth, spriteHeight, this.x, this.y,
                    this.width * 2, this.height * 2)
    }
    
    update() {
        this.x += this.vx; // Updates player position based on velocity
        this.y += this.vy;

        if (this.x < 0) {
            this.x = 0
        } else if (this.y < 0) {
            this.y = 0
        } else if (this.x > canvas.width - this.width) { // if player xpos is > the width of the canvas - the width of the player 
            this.x = canvas.width - this.width // then set player xpos to the width of the canvas - the height of the player 
        } else if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.width
        }
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

    draw() {  // draws red zombie
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false)
        c.save()
        c.clip()
        c.drawImage(enemyImage, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2)
        c.restore()
        c.closePath()
    }

    draw2() { // draws blue zombie
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false)
        c.save()
        c.clip()
        c.drawImage(enemyImage2, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2)
        c.restore()
        c.closePath()
    }

    draw3() { // draws black zombie
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false)
        c.save()
        c.clip()
        c.drawImage(enemyImage3, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2)
        c.restore()
        c.closePath()
    }

    draw4() { // draws green zombie
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false)
        c.save()
        c.clip()
        c.drawImage(enemyImage4, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2)
        c.restore()
        c.closePath()
    }

    updateEnemyPos() { // note enemies still vibrate back and forth...
        let xDiffOffset = player.width/2 // So the enemy follows the middle of the player instead of outside the player
        let yDiffOffset = player.height/2
        
        let xDiff = (player.x + xDiffOffset) - this.x // player position - enemy position 
        let yDiff = (player.y + yDiffOffset) - this.y // negative about this method is the vibrations caused by the sudden shift in the x and y axis

        const angle = Math.atan2((player.y + yDiffOffset + 20) - this.y, (player.x + xDiffOffset) - this.x) // angular distance from player to the enemy

        this.x += Math.cos(angle)
        this.y += Math.sin(angle)

        this.draw()
        // changes/increases direction in the x axis
         
        if (xDiff > 0) { // if the difference in xposition is > 0 then chase player x, y, and diagonally
            if (this.color === 'red') {
                this.x += 0.2 + (level * 0.03) // as levels increase, speed of enemies increase
            } else if (this.color === 'blue') {
                this.x += 0.4 + (level * 0.03)
            } else if (this.color === 'black') {
                this.x += 0.6 + (level * 0.03)
            } else if (this.color === 'green') {
                this.x += 1 + (level * 0.03)
            } 
        } else {
            if (xDiff < 0 && this.color === 'red') {
                this.x -= 0.2 + (level * 0.03)
            } else if (this.color === 'blue') {
                this.x -= 0.4 + (level * 0.03)
            } else if (this.color === 'black') {
                this.x -= 0.6 + (level * 0.03)
            } else if (this.color === 'green') {
                this.x -= 1 + (level * 0.03)
            }    
        }
            // changes/increases direction in the y axis
            if (yDiff > 0) {
                if (this.color === 'red') {
                    this.y += 0.2 + (level * 0.03) // if the difference in yposition is > 0 then chase player
                } else if (this.color === 'blue') {
                    this.y += 0.4 + (level * 0.03)
                } else if (this.color === 'black') {
                    this.y += 0.6 + (level * 0.03) 
                } else if (this.color === 'green') {
                    this.y += 1 + (level * 0.03)
                } 
        } else {
            if (yDiff < 0 && this.color === 'red') {
                this.y -= 0.2 + (level * 0.03) 
            } else if (this.color === 'blue') {
                this.y -= 0.4 + (level * 0.03)
            } else if (this.color === 'black') {
                this.y -= 0.6 + (level * 0.03)
            } else if (this.color === 'green') {
                this.y -= 1 + (level * 0.03)
            }
        }
    }

        speedIncrease () {
            if (xDiff > 0) {
                this.x += 1
            } else if (xDiff < 0) {
                this.x -= 1
            } else if (yDiff > 0) {
                this.y += 1
            } else if (yDiff < 0) {
                this.y -= 1
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
        c.shadowColor = '#899'
        c.shadowBlur = 9
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

let enemies = []
let projectiles = []
let score = 0
let playerHealth = 100
let level = 0


const spriteWidth = 34 // specific coordinates to select character from sprite sheet
const spriteHeight = 42
const player = new Player(100, 100, playerImage);


function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height) // clears the canvas 
    const animateAll = requestAnimationFrame(animate)
    player.x += player.vx // updating player position based on its velocity
    player.y += player.vy
    
    player.update(); // updates the player x and y axis 
    player.draw(); // draws the player in the updated location

    eachEnemy() // calls on the function to draw zombies and handles most of the collision logic as we iteration through each enemy
    if (enemies.length === 0) {
        level += 1
        createEnemies() // creates more enemies as the levels increase
        levelEle.innerHTML = `Level: ${level}`
    }

    projectiles.forEach((projectile, idx) => {
        projectile.update()

        // Removes the projectiles
        if (projectile.x - projectile.radius < 0 || 
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height) {
                projectiles.splice(idx, 1) //removes 1 projectile from the array
            }
        })


    function gameOver() {
        cancelAnimationFrame(animateAll) // cancels all animations
        const endScreen = document.querySelector('#gameOver')
        endScreen.style.display
        gameOverScreen.style.display = 'block' // allows our hidden gameover screen to be displayed once our health hits 0
        scoreEle.innerHTML = `${score} Points` // allows score to be displayed
        gameOverLevel.innerHTML = `Survived until level ${level}` // allows level to be displayed
    }

    if (playerHealth <= 0) {
        gameOver()
        scoreboardContainer.style.display = 'none' // hides the scoreboard once it's gameover
        levelEle.style.display = 'none' // hides the level display once it's gameover
    }

    if (startScreen.style.display == 'block') {
        cancelAnimationFrame(animateAll)
    }

}


function eachEnemy() {
    enemies.forEach((enemy, idx) => {
        
        enemy.updateEnemyPos()

        if (enemy.color === "red") { // drawing the different types/colors of zombies
            enemy.draw()
        } else if (enemy.color === "blue") {
            enemy.draw2()
        } else if (enemy.color === "black") {
            enemy.draw3()
        } else {
            enemy.draw4()
        }
    
        // iterating through projectiles array 
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
        })

        // Collision logic below nested in an enemy loop
        let xDiffOffset = player.width/2 // So the enemy follows the middle of the player instead of outside the player
        let yDiffOffset = player.height/2

        // measures distance from player to the enemy and subtracts 1 if player hitbox overlaps with enemy
        const distance = Math.hypot((player.x + xDiffOffset) - enemy.x, (player.y + yDiffOffset) - enemy.y) - enemy.radius // measures distance from player to the enemy
            
        if (distance - (enemy.radius/2) - (player.width/6) - (player.height/6) < 1 ) { //distance between player and enemy
            playerHealth -= 0.5 // subtracts 0.5 to playerhealth for every millisecond of contact
            health.innerHTML = `Health: ${playerHealth}` // displays changing health
        }
    })
}


function createEnemies() {
    let maxEnemy = 1
    
    maxEnemy = (level * 2) - 1
    if (level >= 1) {
        enemies.forEach((enemy) => {
            enemy.speedIncrease() // increases speed of enemies for every level increase
        })
    }

    for (let i = 0; i < maxEnemy; i++) {
    const randomColor = ['red', 'blue', 'green', 'black']
    const randomValue = randomColor[Math.floor(randomColor.length * Math.random())]; // randomly selects color in array

    let x = Math.floor(Math.random() * canvas.width) // random x variable
    let y = Math.floor(Math.random() * canvas.height) // random y variable

    enemies.push(new Enemy(x, y, 30, randomValue, this.velocity)) // pushing newly created enemy into array
        
    }
}

function newGame() { // reseting all arrays and variables
    projectiles = []
    enemies = []
    score = 0
    playerHealth = 100
    level = 0

    let healthUI = document.querySelector('#health')
    healthUI.innerHTML = `Health: ${playerHealth}`

    let scoreUI = document.querySelector('#scoreboard')
    scoreUI.innerHTML = `Score: ${score}` 
}
 
addEventListener('click', (e) => {

    const offsetX = 55 // offsets the x so that bullet comes out of gun
    const offsetY = 30  // In angle variable subtracting player by offset to fix the angle difference caused by offset
    const angle = Math.atan2(e.clientY - player.y - offsetY, e.clientX - player.x - offsetX) // calculates angular distance from mouse click to player
    
    const velocity = {
        x: Math.cos(angle) * 15, // increasing x velocity by 10
        y: Math.sin(angle) * 15
    }

    projectiles.push(new Projectile(player.x + offsetX, player.y + offsetY, 3, 'red', velocity))
})

restartButton.addEventListener('click', () => {
    newGame() // resets everything
    animate() // reanimates the game
    music.play()
    music.volume = 0.2
    gameOverScreen.style.display = 'none' // hides the gameover display
    scoreboardContainer.style.display = 'block'
    levelEle.style.display = 'block'
})


window.addEventListener('click', () => {
    gunshot.play();
    gunshot.volume = 0.2
})

musicButton.addEventListener('click', () => {
    if (music.paused) { //music.paused returns a boolean value
        music.play()
        music.volume = 0.2
    } else {
        music.pause()
        music.currentTime = 0;
    }
})
easyModeButton.addEventListener('click', () => {
    newGame()
    animate()
    music.play()
    music.volume = 0.2
    startScreen.style.display = 'none'
    scoreboardContainer.style.display = 'block'
    levelEle.style.display = 'block'
    social.style.display = 'block'
    social2.style.display = 'block'
    })
})

