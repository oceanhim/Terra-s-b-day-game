import randoNumber from './classes'

console.log(randoNumber)

let canvas;
let ctx;
let imgplayer; 

function setVars() {
    canvas = document.getElementById("gameCanvas")
    ctx = canvas.getContext("2d")
    imgplayer = document.getElementById("imgplayer")
}

window.onload = setVars

/* Classes
-----------------------------------------*/

class Thing {
    constructor(name, x, y, width, height, size, circle, square, text, color) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.size = size;
        this.circle = circle;
        this.square = square;
        this.text = text;
        this.color = color;
    }

    drawSquare(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    drawCircle(ctx, color, third, fourth) {
        ctx.fillStyle = color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, third, fourth * Math.PI);
        ctx.fill();
    }

    drawText(ctx, color, fontSize, font, extraVar) {
        ctx.fillStyle = color
        ctx.font = `${fontSize} ${font}`
        ctx.fillText("Score: " + extraVar,0,40)
    }
}

// class Archer {
//     constructor() {
//         this.image = document.getElementById("imgplayer")
//     }

//     drawSquare(ctx) {
//         ctx.drawImage(this.image, 10, 10, 16, 16)
//     }
// }

/* Inits
-----------------------------------------------------------------*/

// let archerPlayer = new Archer;

let platformXDecrease = 2;

let platform1 = new Thing("platform1",400,300,400,25,50, false, true, false, "black")
let platform2 = new Thing("platform2",800,200,400,25,50, false, true, false, "black")
let player = new Thing("player",0,0,25,25,50, false, true, false, "red")
player.speed = 4;
player.gravity = 0.10;
player.gravitySpeed = 0;
player.SpeedY = 0;
player.SpeedX = 0;
player.jumpCount = 0;
player.hitBottom = function() {
    let rockBottom = GAME_HEIGHT - player.height;
    if(player.y > rockBottom) {
        player.y = rockBottom
        player.jumpCount = 0;
        player.gravitySpeed = 0;
    }
}
player.newPos = function() {
    player.gravitySpeed += player.gravity;
    player.x += player.SpeedX;
    player.y += player.SpeedY + player.gravitySpeed;
    player.SpeedY + player.gravitySpeed;
    player.hitBottom()
}

let needsTobeDrawn = [player, platform1, platform2]
let platforms = [platform1,platform2]

let GAME_HEIGHT = 400;
let GAME_WIDTH = 1000;

let keys = []
window.addEventListener("keydown",function(e) {
    keys[e.keyCode] = true
    // console.log(e.keyCode)
})
window.addEventListener("keyup",function(e) {
    keys[e.keyCode] = false
})

/* Game loop
------------------------------------------*/

function init() {
    player.x = 200
    player.y = 200
}

function loop() {
    update();
    render();
}

function update() {
    if(keys[37] == true || keys[65] == true) {
        player.x = player.x - player.speed
    }
    if(keys[38] == true || keys[87] == true) {
        player.y = player.y - player.speed
        player.jumpCount += 1
    }
    if(keys[39] == true || keys[68] == true) {
        player.x = player.x + player.speed
    }
    if(keys[40] == true || keys[83] == true) {
        player.y = player.y + player.speed
    }
    if(player.x < 0) {
        player.x = 0
    }
    if(player.x > (GAME_WIDTH - 25)) {
        player.x = (GAME_WIDTH - 25)
    }
    if(player.y > (GAME_HEIGHT - 25)) {
        player.y = (GAME_HEIGHT - 25)
    }
    if(player.y < 0) {
        player.y = 0
    }

    //player.x + player.size > coin.x && player.y + player.size > coin.y && coin.x + coin.size > player.x && coin.y + coin.size > player.y
    platforms.forEach(e => {
        e.x -= 1;
        if(isColliding(player, e)) {
            if(player.y > e.height - player.height) {
                player.y -= e.height - player.height
                player.gravitySpeed = 0
                player.gravity = 0
                console.log(`Touching top`)
            } 
            // if(player.x + player.width > e.x) {
            //     player.x = e.x - e.width;
            // }
            // else {
            //     let bottomOfplatform1 = platform1.height + platform1.y 
            //     if(player.y < platform1.height + platform1.y) {
            //         player.y = bottomOfplatform1
            //         console.log(`Touching bottom`)
            //     }
            // }
        } else {
            player.gravity = 0.10
        }
    })
}
function render() {
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT)
    player.newPos();
    needsTobeDrawn.forEach(thing => {
        if(thing.circle == true) {
            // console.log(thing.name + ` is a circle`)
            thing.drawCircle(ctx)
        }
        if(thing.square == true) {
            // console.log(thing.name + ` is a square`)
            thing.drawSquare(ctx)
        }
        if(thing.text == true) {
            // console.log(thing.name + ` is text`)
            thing.drawText(ctx, thing.color)
        }
    })
}   

//TIME 25:25/1:16:14 for video

/* Other
-----------------------------------*/

// function increaseSpeed() {
//     platformXDecrease += 40
// }

function isColliding(obj1, obj2) {
    return obj1.x + obj1.width > obj2.x && obj1.y + obj1.height > obj2.y && obj2.x + obj2.width > obj1.x && obj2.y + obj2.height > obj1.y
}

loopint = window.setInterval(loop,1000/60)
// let speedIncreaseInt = window.setInterval(increaseSpeed, 3000)
init();