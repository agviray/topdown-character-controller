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
    // - The 'keydown' event handler will set the pressed key code
    //    as the 'key' property value of the gameArea object.
    window.addEventListener('keydown', function (e) {
      gameArea.key = e.keyCode;
    });
    // - The 'keyup' event handler will update the gameArea's 'key'
    //   property, giving it a value of false.
    // - This means that a key is not being pressed.
    window.addEventListener('keyup', function (e) {
      gameArea.key = false;
    });
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
  // - Move character left.
  if (gameArea.key && gameArea.key === 37) {
    character.speedX = -1;
  }
  // - Move character up.
  if (gameArea.key && gameArea.key === 38) {
    character.speedY = -1;
  }
  // - Move character right.
  if (gameArea.key && gameArea.key === 39) {
    character.speedX = 1;
  }
  // - Move character down.
  if (gameArea.key && gameArea.key === 40) {
    character.speedY = 1;
  }
  // - Calling newPosition here update the character's position (if any
  //   arrow keys were pressed) on the next redraw of the gameArea.
  character.newPosition();
  character.update();
}
