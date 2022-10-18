const gameWrapper = document.querySelector('.wrapper');

window.addEventListener('DOMContentLoaded', startGame);

function startGame() {
  gameArea.start();
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
};
