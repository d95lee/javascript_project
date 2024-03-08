document.addEventListener("keydown", (e) => {
    if (e.code === "KeyS") vy = 5;
    if (e.code === "KeyW") vy = -5;
    if (e.code === "KeyA") vx = -5;
    if (e.code === "KeyD") vx = 5;
});

document.addEventListener("keyup", (e) => {
    if (e.code === "KeyS") vy = 0;
    if (e.code === "KeyW") vy = 0;
    if (e.code === "KeyA") vx = 0;
    if (e.code === "KeyD") vx = 0;
});

