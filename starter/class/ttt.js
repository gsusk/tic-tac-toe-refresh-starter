const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('up', 'moves cursor up', this.cursor.up);
    Screen.addCommand('down', 'moves cursor down', this.cursor.down);
    Screen.addCommand('left', 'moves cursor left', this.cursor.left);
    Screen.addCommand('right', 'moves cursor right', this.cursor.right);
    Screen.addCommand('return', "do a move in the cursors position", this.setMove)
    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  setPlayerTurn(turn) {
    this.playerTurn = turn;
    Screen.setMessage(`Player ${this.playerTurn}'s move.`);
  }

  static placeMove() {
    // What is bind doing exactly in addCommand above?
    Screen.render();
    // Why couldn't I  do below this.grid
    if (Screen.grid[this.cursor.row][this.cursor.col] === " ") {
      this.cursor.return(this.playerTurn);
      if (this.playerTurn === "O") {
        this.playerTurn = "X";
      } else {
        this.playerTurn = "O";
      }

      Screen.render();
      let winner = TTT.checkWin(Screen.grid);
      if (winner) {
        TTT.endGame(winner);
      }
    } else {
      Screen.setMessage(
        "That space is already occupied. Choose another space."
      );
      Screen.render();
    }
  }

  static checkWin(grid) {
    // Return 'X' if player X wins
    // Return 'O' if player O wins

    // Return false if the game has not ended
    const emptyGrid = grid.every((row) => row.every((space) => space === " "));
    const fullGrid = grid.every((row) => row.every((space) => space !== " "));

    if (emptyGrid) {
      // Return false if the game has not ended
      return false;
    }
    if (fullGrid) {
      //tie game
      return "T";
    }

    //horizontal win:
    let hor = [];
    grid.some((val, index) => {
      if (val.every((pos) => pos === val[index] && val[index] !== ' ')) {
        hor.push(val[index])
        return true;
      }
    })

    if (hor.length > 0) {
      return hor[0]
    }

    //vertical win
    for (let i = 0; i < grid.length; i++) {
      let ver = [];
      for (let j = 0; j < grid.length; j++) {
        if (grid[0][i] === ' ') {
          break;
        }
        if (grid[j][i] === grid[0][i]) {
          ver.push(grid[j][i])
        }
      }
      if (ver.length === grid.length) {
        return ver[0]
      }
    }

    //diagonal win
    let leftDiagonal = [];
    let rightDiagonal = [];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid.length; col++) {
        if (row === col) {
          leftDiagonal.push(grid[row][col])
        }
        if (row + col === grid.length - 1) {
          rightDiagonal.push(grid[row][col])
        }
      }
    }
    if (leftDiagonal.every((val) => val === leftDiagonal[0] && leftDiagonal[0] !== ' ')) {
      return leftDiagonal[0];
    }

    if (rightDiagonal.every((val) => val === rightDiagonal[0] && rightDiagonal[0] !== ' ')) {
      return rightDiagonal[0];
    }
    return false;
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

  setMove = () => {
    Screen.setTextColor(this.cursor.row, this.cursor.col, "cyan");
    Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
    if (TTT.checkWin(Screen.grid)) {
      TTT.endGame(TTT.checkWin(Screen.grid));
    };
    if (this.playerTurn === 'O') {
      this.playerTurn = 'X';
    } else {
      this.playerTurn = 'O'
    }
    Screen.render();
  }
}

module.exports = TTT;
