export default class Game {
  constructor(field, goblin) {
    this.field = field;
    this.fieldSize = 4;
    this.goblin = goblin;
    this.activeGoblin = null;
    this.position = null;
    this.score = 0;
    this.missed = 0;
    this.maxMissed = 5;
    this.intervalId = null;
  }

  newField() {
    const field = this.field.getField(this.fieldSize);
    const body = document.querySelector("body");
    let container = document.querySelector(".container");
    if (container) {
      container.remove();
    }

    container = document.createElement("div");
    container.classList.add("container");
    container.append(field);
    body.prepend(container);
    this.cells = [...field.children];
    this.cells.forEach((cell) =>
      cell.addEventListener("click", this.handleCellClick.bind(this))
    );
  }

  handleCellClick(event) {
    const cell = event.currentTarget;
    if (cell.contains(this.activeGoblin)) {
      this.score++;
      this.activeGoblin.remove();
      this.activeGoblin = null;
    } else {
      this.missed++;
    }
    this.checkGameOver();
  }

  randomPosition() {
    const position = Math.floor(Math.random() * this.fieldSize * 4);
    if (position === this.position) {
      this.randomPosition();
      return;
    }
    this.deleteGoblin();
    this.position = position;
    this.adventGoblin();
  }

  deleteGoblin() {
    if (this.activeGoblin === null) {
      return;
    }
    this.cells[this.position].firstChild.remove();
    this.activeGoblin = null;
  }

  adventGoblin() {
    this.activeGoblin = this.goblin.getGoblin();
    this.cells[this.position].append(this.activeGoblin);
  }

  checkGameOver() {
    if (this.missed >= this.maxMissed) {
      this.stop();
      alert(`Game Over! Your score is ${this.score}`);
    }
  }

  play() {
    const gameLoop = () => {
      this.randomPosition();
    };

    this.intervalId = setInterval(gameLoop.bind(this), 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  start() {
    this.score = 0;
    this.missed = 0;
    this.newField();
    this.play();
  }
}
