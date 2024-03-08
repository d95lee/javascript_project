const p = canvas.getContext('2d');
const r = canvas.getContext('2d');

class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    
    draw() {
        p.beginPath();
        p.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        p.fillStyle = this.color;
        p.fill();
        p.closePath()
    }
}

// -------------------------------
// Rectangle that moves test
class Player2 {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.vx = 0
        this.vy = 0

        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this));
    }
    
    draw() {
        r.fillRect(this.x, this.y, this.width, this.height);
        r.fillStyle = this.color;
        r.strokeRect(this.x, this.y, this.width, this.height);
    }

    handleKeyDown(e) {
        if (e.code === "KeyS") this.vy = 5;
        if (e.code === "KeyW") this.vy = -5;
        if (e.code === "KeyA") this.vx = -5;
        if (e.code === "KeyD") this.vx = 5;
    };
    
    handleKeyUp(e) {
        if (e.code === "KeyS") this.vy = 0;
        if (e.code === "KeyW") this.vy = 0;
        if (e.code === "KeyA") this.vx = 0;
        if (e.code === "KeyD") this.vx = 0;
    };
}

// -------------------------------

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius 
        this.color = color
        this.velocity = velocity
        this.vx = 0 // p2 bullet
        this.vy = 0 // p2 bullet
    }

    draw() {
        p.beginPath();
        p.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        p.fillStyle = this.color;
        p.fill();
        p.closePath()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
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
        p.beginPath();
        p.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        p.fillStyle = this.color;
        p.fill();
        p.closePath()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x 
        this.y = this.y + this.velocity.y
    }
}


const player = new Player(canvas.width / 2, canvas.width / 2, 25, 'grey')
const player2 = new Player2(200, 200, 50, 50, 'grey')


const projectiles = []
const enemies = []

function spawnEnemies() {
    setInterval(() => {
        const x = Math.floor(Math.random() *1000)
        const y = Math.floor(Math.random() *1000)
        const radius = 30
        const color = 'black'
        const velocity = {
            x: 1,
            y: 1
        }
        enemies.push(new Enemy(x, y, radius, color, velocity))
    }, 1000)
}


function animate() {
    requestAnimationFrame(animate)
    r.clearRect(0, 0, canvas.width, canvas.height)
    player2.x += player2.vx;
    player2.y += player2.vy;
    // projectiles.x += projectiles.vx; // attempt to get bullets to originate from p2
    // projectiles.y += projectiles.vy;
    player.draw()
    player2.draw() //Have to call the rectangle in the animation function to be drawn
    projectiles.forEach((projectile) => {
    projectile.update()
    })

    enemies.forEach((enemy) => {
        enemy.update()
    })
}

addEventListener('click', (e) => {
    const angle = Math.atan2(e.clientY - canvas.height/2, e.clientX - canvas.width/2)
    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }
    
    projectiles.push(new Projectile(
        player2.x + player2.width/2, player2.y + player2.height/2, 5, 'red', velocity)
    )
})


animate();
spawnEnemies();
// rectangleUpdate();
