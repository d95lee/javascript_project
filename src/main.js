const c = canvas.getContext('2d');

let x = 100;
let y = 100;
let w = 100;
let h = 100;

let vx = 0;
let vy = 0;

function update() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    x += vx;
    y += vy;

    c.fillRect(x, y, w, h)
    requestAnimationFrame(update)
}
update();

