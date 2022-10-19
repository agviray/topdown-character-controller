const gameWrapper = document.querySelector('.wrapper');

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
    document.querySelector('.wrapper').appendChild(this.canvas);
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
}
