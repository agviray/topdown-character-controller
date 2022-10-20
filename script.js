const gameWrapper = document.querySelector('.game-wrapper');

window.addEventListener('DOMContentLoaded', startGame);

let character;

function startGame() {
  gameArea.start();
  character = new Character(20, 20, 50, 50, '#754c99');
}

// - Ojbect that contains game functionality.
const gameArea = {
  canvas: document.createElement('canvas'),
  start: function () {
    this.canvas.width = 600;
    this.canvas.height = 600;
    this.context = this.canvas.getContext('2d');
    gameWrapper.appendChild(this.canvas);
    // - this.interval calls the redrawGameArea function,
    //   which results in the the "re-drawing" of the gameArea
    //   50 times per second.
    this.interval = setInterval(redrawGameArea, 20);
  },
  // - Clears entire game area (the <canvas>).
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

// - Constructor for creating an instance of a
//   character--ie, you, the user/player.
function Character(charXOrigin, charYOrigin, charWidth, charHeight, charColor) {
  this.charXOrigin = charXOrigin;
  this.charYOrigin = charYOrigin;
  // - The 2 properties, speedX and speedY, represent the
  //   character's speed along the horizontal and vertical axises.
  this.speedX = 0;
  this.speedY = 0;
  this.charWidth = charWidth;
  this.charHeight = charHeight;

  // - Displays character at provided position, and also determines
  //   character appearance.
  ctx = gameArea.context;
  ctx.fillStyle = charColor;
  ctx.fillRect(
    this.charXOrigin,
    this.charYOrigin,
    this.charWidth,
    this.charHeight
  );

  // - Updates "re-drawing" of character--similar to
  //   frames per second (fps) in a video game.
  this.update = function () {
    ctx = gameArea.context;
    ctx.fillStyle = charColor;
    ctx.fillRect(
      this.charXOrigin,
      this.charYOrigin,
      this.charWidth,
      this.charHeight
    );
  };

  // - newPosition changes the character's position by
  //   using its own speedX and speedY properties.
  this.newPosition = function () {
    this.charXOrigin += this.speedX;
    this.charYOrigin += this.speedY;
  };
}

// - Main function to call in order to clear gameArea
//   and "re-draw" character.
function redrawGameArea() {
  gameArea.clear();
  // **********************************************************
  // - Call newPosition() to change character's position here!
  // **********************************************************
  character.update();
}
