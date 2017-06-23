// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // keep x at constant start
    this.x = -50;
    // y should appear randomly between river and grass space
    this.y = Math.floor(Math.random() * (400 - 100) + 100);
    this.speed = Math.random() * (500 - 100) + 100;
    this.width = 30;
    this.height = 20;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // moves bugs across the stage
    this.x += Math.floor((this.speed * ((Math.random() * (2 - 1) + 1))) * dt);

    if (this.x > ctx.canvas.width) {
        this.x = -50;
        this.y = Math.floor(Math.random() * (400 - 100) + 100);
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 300;
    this.y = 500;
    this.width = 30;
    this.height = 50;
    this.lives = 5;
    this.total = 0;
    this.gamePaused = false;
    this.sprite = 'images/char-cat-girl.png';
};

// Update player's position
Player.prototype.update = function(dt) {

    // set bounds so that player doesn't go over edges
    document.getElementById('lives').innerHTML = this.lives;
    document.getElementById('total').innerHTML = this.total;
   
    // keeps player from falling off of bottom canvas
    if (this.y > 500) {
        this.y = 500;
    }
    // keep player from falling off of width
    if (this.x < 10) {
        this.x = 10;
    } else if (this.x > 595) {
        this.x = 595;
    }

    // reach the river
    if (this.y === 45) {
        this.total++;
        document.getElementById('winner-message').style.display = "block";
        this.reset();
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handleinput
Player.prototype.handleInput = function(keycode) {
    switch (keycode) {
        case 'left':
            this.x -= 65;
            break;
        case 'right':
            this.x += 65;
            break;
        case 'up':
            this.y -= 65;
            break;
        case 'down':
            this.y += 65;
            break;
        case 'spacebar':
            !this.gamePaused ? this.gamePaused = true : this.gamePaused = false;
            break;
    }
};


/** GEMS **/

var Gem = function() {
    this.x = Math.floor(Math.random() * (400 - 100) + 100);;
    this.y = Math.floor(Math.random() * (400 - 100) + 100);
    this.width = 30;
    this.height = 20;
    this.sprite = 'images/GemBlue.png';
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// random size for enemies
var enemySize = Math.random() * (4 - 2) + 2;
for (var i = 0; i < enemySize; i++) {
    allEnemies.push(new Enemy());
}


// create gems:
var allGems = [];

// a function to create gems;
function createGems(size) {
    for (var i = 0; i < size; i++) {
        allGems.push(new Gem());
    }
}

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'spacebar'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


Player.prototype.reset = function() {
    setTimeout(function() { document.getElementById('winner-message').style.display = "none" }, 1000);
    this.x = 300;
    this.y = 500;
};

// handles restarting the game after player loses
function restart() {
    player.reset();
    player.gamePaused = false;
    document.querySelector('#gameover').style.display = 'none';
     // turn all scores back to original
    player.lives = 5;
    player.total = 0;
}
