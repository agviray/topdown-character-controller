const gameWrapper = document.querySelector('.game-wrapper');

window.addEventListener('DOMContentLoaded', startGame);

let character;

function startGame() {
  gameArea.start();
  const gameAreaWidth = gameArea.canvas.width;
  const gameAreaHeight = gameArea.canvas.height;
  character = new Character(
    gameAreaWidth / 2 - 15,
    gameAreaHeight / 2 - 15,
    30,
    30,
    '#754c99'
  );
}

// - Ojbect that contains the main game area functionality.
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
    // - Set an array (gameArea.keys) which accounts for pressed keys, by giving a boolean
    //   true status for each key that is pressed.
    // - The gameArea.keys array will be referenced to determine if the
    //   character is to be moved diagonally (if multiple keys are pressed).

    // - For example, the status of a key or keys pressed will remain true for
    //   every redraw, until the keyup event runs on that pressed key.
    // - This results in the character continuously moving the intended direction,
    //   whether it be straight or diagonal, until otherwise halted by the keyup
    //   event firing on a given key.
    window.addEventListener('keydown', function (e) {
      gameArea.keys = gameArea.keys || [];
      gameArea.keys[e.keyCode] = true;
    });
    // - Detect when a key out of many keys is no longer being pressed.
    // - This enables the character to shift movement types smoothly--ie
    //   from moving straight to diagonal.
    window.addEventListener('keyup', function (e) {
      gameArea.keys[e.keyCode] = false;
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
  // - Set  character's speedX and speedY to 0 on
  //   every redraw.
  character.speedX = 0;
  character.speedY = 0;
  // - Move character left.
  if (gameArea.keys && gameArea.keys[37]) {
    character.speedX = -1;
  }
  // - Move character up.
  if (gameArea.keys && gameArea.keys[38]) {
    character.speedY = -1;
  }
  // - Move character right.
  if (gameArea.keys && gameArea.keys[39]) {
    character.speedX = 1;
  }
  // - Move character down.
  if (gameArea.keys && gameArea.keys[40]) {
    character.speedY = 1;
  }
  // - Calling newPosition here update the character's position (if any
  //   arrow keys were pressed) on the next redraw of the gameArea.
  character.newPosition();
  character.update();
}
