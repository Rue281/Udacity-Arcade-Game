// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

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
    deltax = dt * this.speed;
    this.x += deltax;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-cat-girl.png';
};

// Update the Player's position, required method for game
let score = 0;
let life = 5;
Player.prototype.update = function(){
    if(player.y <= -7){
        score ++;
        //view modal
        modal.style.display = "block";
        //flag to pause the game when the modal open
        pause = true;
        resetPosition();
    }
};

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var pause = false;
//handle user input, required method for the game
Player.prototype.handleInput = function(key){
    var step = 50;
    if(!pause){
        switch(key){
            case 'left' : 
                player.x = player.x - step;
                break;
            case 'right' :
                player.x = player.x + step;
                break;
            case 'up' :
                player.y = player.y - step;
                break;
            case 'down' :
                player.y = player.y + step;
                break;
        }
    }
    
    var xmin=2.5, xmax=402.5, ymin=-17, ymax=433;
    if(player.x < xmin){
        player.x = xmin;
    }else if(player.x > xmax){
        player.x = xmax;
    }

    if(player.y < ymin){
        player.y = ymin;
    }else if(player.y > ymax){
        player.y = ymax;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(202.5,383);
//var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
//var enemy = new Enemy(0, Math.random() * 184 + 50,  Math.random() * 256); //x & y &speed of enemy

//create enemies
// for (let enemy of allEnemies){
//     var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
//     allEnemies.push(enemy);

// }
function resetPosition(){
    player.x = 202.5;
    player.y = 383;
} 
setInterval(function(){ 
    var enemy = new Enemy(0, Math.random() * 184 + 50,  Math.random() * 256 + 50); //x & y &speed of enemy
    allEnemies.push(enemy);
     }, 3000);
//allEnemies.push(enemy);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//check collision between player and enemy, required method for the game
let enemyWidth = 70;
let playerWidth = 80;
let enemyHeight = 60;
let playerHeight = 70;
let offset = 5;
function checkCollisions(){
    for(let enemy of allEnemies){
        let deltaX = enemy.x + enemyWidth - player.x;
        let deltaY = enemy.y + enemyHeight - player.y;
        if (offset<=deltaX && (playerWidth + enemyWidth - offset) >= deltaX && offset <= deltaY 
            && (playerHeight + enemyHeight - offset)>= deltaY) {
            //player.x = 202.5;
            //player.y = 383;
            resetPosition();
            life --;
            if(life <=0)
            {
                resetAll();
            }
        }
    }
}
//playAgain method is used to reset everything (used in case of loose)
function resetAll(){
    resetPosition();
    life = 5;
    score = 0;
}

/********Modal stuff******************/
    // Get the modal {{after checking loose and win conditions}}
    let modal = document.getElementById('myModal');

    //playAgain button
    let playAgainBtn = document.getElementsByClassName("modal-button")[0];
    playAgainBtn.onclick = function(){
        resetAll();
        modal.style.display = "none";
        pause  = false;
    }

    // wherever the user clicks, keep the modal opened!
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "block";
      }
    }