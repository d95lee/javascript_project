const p = canvas.getContext('2d');

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

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius 
        this.color = color
        this.velocity = velocity
    }
}


const player = new Player(canvas.width / 2, canvas.width / 2, 25, 'grey')
player.draw()

console.log(player)