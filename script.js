class Player {
    constructor() {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.width = 100;
        this.height = 120;
        this.gravity = 0.95;
        this.directionRight = true;
        this.position = {
            x: (this.canvas.width - this.width) / 2,
            y: (this.canvas.height - this.height) / 2,
        };
        this.velocity = {
            x: 0,
            y: 0
        };
        this.Pose = new Image();
        this.Pose.src = 'src/Player/Idle__000.png';
    }

    create() {
        let context = this.context;
        context.drawImage(this.Pose, this.position.x, this.position.y, this.width, this.height);
    }


    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y <= this.canvas.height)
            this.velocity.y += this.gravity;
        else
            this.velocity.y = 0;
        this.create();
    }
}

class Heart {
    constructor(num) {
        this.context = canvas.getContext('2d');
        this.isFilled = true;
        this.width = 15 * 1.5;
        this.height = 13 * 1.5;
        this.position = {
            x: (this.width * num) + 20,
            y: 20
        }
    }

    create() {
        let context = this.context;
        let image = new Image();
        if (this.isFilled) {
            image.src = 'src/Objects/filled-heart.png';
        } else {
            image.src = 'src/Objects/blank-heart.png';
        }
        context.drawImage(image, this.position.x, this.position.y, this.width, this.height);
    }
}

class Zombie {
    constructor() {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.width = 100;
        this.height = 120;
        this.gravity = 0.95;
        this.doAlive = true;
        this.position = {
            x: (Math.random() * (canvas.width - this.width)),
            y: (Math.random() * canvas.height) / 2,
        };
        this.velocity = {
            x: 0,
            y: 0
        };
        this.Pose = new Image();
        this.Pose.src = 'src/Zombie/Idle (1).png';
    }

    create() {
        let context = this.context;
        context.drawImage(this.Pose, this.position.x, this.position.y, this.width, this.height);
    }


    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y <= this.canvas.height)
            this.velocity.y += this.gravity;
        else
            this.velocity.y = 0;
        this.create();
    }

    kill() {
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.doAlive = false;
        this.width = 0;
        this.height = 0;
    }

    respawn() {
        this.position = {
            x: (Math.random() * (canvas.width - this.width)),
            y: (Math.random() * canvas.height) / 2,
        };
        this.doAlive = true;
        this.width = 100;
        this.height = 120;
    }
}

class Ground {
    constructor(x, num, src) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.ground = new Image();
        this.ground.src = src;
        this.width = this.ground.width;
        this.height = this.ground.height;
        this.position = {
            x: (x + this.width) * num,
            y: this.canvas.height - this.width,
        };
    }

    create() {
        let context = this.context;
        context.drawImage(this.ground, this.position.x, this.position.y, this.width, this.height);
    }
}

class Weapon {
    constructor() {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.width = 0;
        this.height = 2;
        this.position = {
            x: player.position.x,
            y: player.position.y
        }
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    create() {
        let context = this.context;
        context.fillStyle = '#ffff00';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.create();
    }
}

const canvas = document.querySelector('#canvas');
canvas.style.background = "#f9f9f9";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let doJump = false;
let numZombie = 1;

const player = new Player();
const weapon = new Weapon();

const zombies = [];
for (let i = 1; i <= numZombie; i++) {
    zombies[i] = new Zombie();
}

const ground = [];
for (let i = 0; i < 100; i++) {
    let src = 'src/Tiles/Tile (2).png';
    ground[i] = new Ground(0, i, src);
}

const RunPoses = [];
for (let i = 0; i < 10; i++) {
    RunPoses[i] = new Image();
    RunPoses[i].src = 'src/Player/Run__00' + i + '.png';
}

const RunPosesCopy = [];
for (let i = 0; i < 10; i++) {
    RunPosesCopy[i] = new Image();
    RunPosesCopy[i].src = 'src/Player/Run__00' + i + ' - Copy.png';
}

const StillPoses = [];
for (let i = 0; i < 10; i++) {
    StillPoses[i] = new Image();
    StillPoses[i].src = 'src/Player/Idle__00' + i + '.png';
}

const StillPosesCopy = [];
for (let i = 0; i < 10; i++) {
    StillPosesCopy[i] = new Image();
    StillPosesCopy[i].src = 'src/Player/Idle__00' + i + ' - Copy.png';
}

const ZombieStillPoses = [];
for (let i = 0; i < 15; i++) {
    ZombieStillPoses[i] = new Image();
    ZombieStillPoses[i].src = 'src/Zombie/Idle (' + (i + 1) + ').png';
}

const ZombieRunPoses = [];
for (let i = 0; i < 10; i++) {
    ZombieRunPoses[i] = new Image();
    ZombieRunPoses[i].src = 'src/Zombie/Walk (' + (i + 1) + ').png';
}

const ZombieRunPosesCopy = [];
for (let i = 0; i < 10; i++) {
    ZombieRunPosesCopy[i] = new Image();
    ZombieRunPosesCopy[i].src = 'src/Zombie/Walk (' + (i + 1) + ') - Copy.png';
}

let currentPose = {
    left: 0,
    right: 0,
    still: 0,
    dead: 0
};

let ZombieCurrentPose = {
    left: 0,
    right: 0,
    still: 0,
    dead: 0
};

let keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

const hearts = [];
for (let i = 0; i <= 10; i++) {
    hearts[i] = new Heart(i);
}

let showBackground = () => {
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    let background = new Image();
    background.src = 'src/Backgrounds/background.png';
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
}

let start = () => {
    requestAnimationFrame(start);

    showBackground();

    hearts.forEach(heart => {
        heart.create();
    });

    zombies.forEach(zombie => {
        zombie.update();
    });

    weapon.update();
    player.update();

    ground.forEach(ground => {
        ground.create();
        if (player.position.y + player.height <= ground.position.y && player.position.y + player.height + player.velocity.y >= ground.position.y && player.position.x + player.width >= ground.position.x && player.position.x <= ground.position.x + ground.width) {
            player.velocity.y = 0;
            doJump = true;
        }
        zombies.forEach(zombie => {
            if (zombie.position.y + zombie.height <= ground.position.y && zombie.position.y + zombie.height + zombie.velocity.y >= ground.position.y && zombie.position.x + zombie.width >= ground.position.x && zombie.position.x <= ground.position.x + ground.width) {
                zombie.velocity.y = 0;
            }
        });
    });

    if (keys.right.pressed) {
        if (currentPose.right >= 10) {
            currentPose.right = 0;
        }
        player.Pose = RunPoses[parseInt(currentPose.right)];
        currentPose.right += 0.35;
    }

    else if (keys.left.pressed) {
        if (currentPose.left >= 10) {
            currentPose.left = 0;
        }
        player.Pose = RunPosesCopy[parseInt(currentPose.left)];
        currentPose.left += 0.35;
    }

    if (keys.right.pressed && player.position.x <= canvas.width - player.width) {
        player.velocity.x = 5;
        if (weapon.velocity.x == 0) {
            weapon.velocity.x = 5;
        }
        player.directionRight = true;
    }

    else if (keys.left.pressed && player.position.x >= 0) {
        player.velocity.x = -5;
        if (weapon.velocity.x == 0) {
            weapon.velocity.x = -5;
        }
        player.directionRight = false;
    }

    else {
        player.velocity.x = 0;
        player.height = 110;
        player.width = 90;
        if (player.directionRight) {
            if (currentPose.still >= 10) {
                currentPose.still = 0;
            }
            player.Pose = StillPoses[parseInt(currentPose.still)];
            currentPose.still += 0.09;
        } else {
            if (currentPose.still >= 10) {
                currentPose.still = 0;
            }
            player.Pose = StillPosesCopy[parseInt(currentPose.still)];
            currentPose.still += 0.09;

        }
    }

    zombies.forEach(zombie => {
        if (parseInt(player.position.x) == parseInt(zombie.position.x) && player.velocity.y == 0 && zombie.doAlive) {
            player.height = 110;
            player.width = 100;
            zombie.velocity.x = 0;
            currentPose.dead += 0.2;
            if (currentPose.dead >= 10) {
                location.reload();
            } else {
                hearts[parseInt(hearts.length - currentPose.dead)].isFilled = false;
            }
        } else if (player.position.x < zombie.position.x && zombie.doAlive) {
            zombie.velocity.x = -1;
        } else {
            zombie.velocity.x = 1;
        }

        if (zombie.velocity.x == 0 && zombie.doAlive) {
            if (ZombieCurrentPose.still >= 15) {
                ZombieCurrentPose.still = 0;
            }
            zombie.Pose = ZombieStillPoses[parseInt(ZombieCurrentPose.still)];
            ZombieCurrentPose.still += 0.09;
        } else if (zombie.velocity.x > 0 && zombie.doAlive) {
            if (ZombieCurrentPose.right >= 10) {
                ZombieCurrentPose.right = 0;
            }
            zombie.Pose = ZombieRunPoses[parseInt(ZombieCurrentPose.right)];
            ZombieCurrentPose.right += 0.1;
        } else if (zombie.velocity.x < 0 && zombie.doAlive) {
            if (ZombieCurrentPose.left >= 10) {
                ZombieCurrentPose.left = 0;
            }
            zombie.Pose = ZombieRunPosesCopy[parseInt(ZombieCurrentPose.left)];
            ZombieCurrentPose.left += 0.1;
        }

        if (parseInt(weapon.position.x) <= parseInt(zombie.position.x) + zombie.width && parseInt(weapon.position.x) >= parseInt(zombie.position.x) && parseInt(weapon.position.y) <= parseInt(zombie.position.y) + zombie.height && parseInt(weapon.position.y) >= parseInt(zombie.position.y) && zombie.doAlive) {
            weapon.velocity.x = 0;
            weapon.position.x = player.position.x;
            weapon.position.y = -player.position.y * 2;
            weapon.width = 0;
            zombie.kill();
            zombie.respawn();
            numZombie++;
        }
    });
}

start();

let moveUp = () => {
    if (doJump) {
        player.velocity.y -= 20;
    }
    doJump = false;
}

let moveLeft = () => {
    keys.left.pressed = true;
}

let moveRight = () => {
    keys.right.pressed = true;
}

let moveLeftRel = () => {
    keys.left.pressed = false;
}

let moveRightRel = () => {
    keys.right.pressed = false;
}

let shoot = () => {
    weapon.update();
    weapon.width = 15;
    weapon.position.x = player.position.x + player.width / 10;
    weapon.position.y = player.position.y + player.height / 2;
    if (player.directionRight) {
        weapon.velocity.x = 20;
    } else {
        weapon.velocity.x = -20;
    }
}

addEventListener('keydown', keyboard => {
    switch (keyboard.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'a':
            shoot();
            break;
        default:
            break;
    }
});

addEventListener('keyup', keyboard => {
    switch (keyboard.key) {
        case 'ArrowLeft':
            moveLeftRel();
            break;
        case 'ArrowRight':
            moveRightRel();
            break;
        default:
            break;
    }
});

var startY;
var endY;

addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
});

addEventListener('touchend', (event) => {
    endY = event.changedTouches[0].clientY;
    if ((startY - endY) > 50) {
        moveUp();
    }
});