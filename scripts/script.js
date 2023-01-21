const  GameBoard = (() => {
  "use strict";
  
  const boardArray = Array(9).fill(null);
  const symbolAt = (location) => boardArray[location];

  const isFull = () => { 
    if (availablePositions().length == 0) {
      return true;
    };
  };
  
  const availablePositions = () => {
    let out = []
    for (let i = 0; i < boardArray.length; i++) {
      let element = boardArray[i];

      if (element === null) out.push(i);
    };

    return out;
  };

  
  function placePiece(symbol, location) { 
    boardArray[location] = symbol
  };

  const clear = () => {
   for (const element in boardArray) {
     boardArray[element] = null;    
   } 
  }

  return {
    availablePositions,
    placePiece,
    symbolAt,
    isFull,
    clear,
  };

})();

const Player = (symbol) => {
  return { symbol };
}

const DisplayController = (() => {  // This only deals with the state of the board's look
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => Game.takeTurn(cell)) // Add some function which changes the inner html which will exist in the Game 
  });

  const announcementDiv = document.getElementById("announcement");

  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", () => {
    Game.play() 
  });

  const declareWinner = (player) => {
    announcementDiv.textContent = `${player.symbol} Wins!`
  };
  const declareTie = () => {
    announcementDiv.textContent = `Its a tie!`
  };

  const updateCell = (symbol, location) => {
    cell = cells[location];
    cell.textContent = symbol;
  };

  const reset = () => {
    cells.forEach((cell) => {
      cell.innerHTML = ""
    });

    announcementDiv.textContent = ""
  };

  return {
    updateCell,
    declareWinner,
    declareTie,
    reset
  };
})();

const Game = (() => {
  const player1 = Player('X');
  const player2 = Player('O');
  let currentPlayer;
  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Cols
    [0,4,8], [2,4,6] // Diagonals
  ];

  let playing = false;
  
  function play() {
    playing = true;
    currentPlayer = player1;
    resetGame()
  };

  function takeTurn(cell) {
    if (!playing) return;
    id = parseInt(cell.id)

    if (GameBoard.availablePositions().includes(id)) {

      GameBoard.placePiece(currentPlayer.symbol, id);
      DisplayController.updateCell(currentPlayer.symbol, id) // Update the inner HTML of the cell in question

      if (gameOver()) {
        return
      };

      currentPlayer = switchPlayers();
    };
  };

  function resetGame() {
    GameBoard.clear();
    DisplayController.reset();
  }

  const switchPlayers = () => (currentPlayer === player1 ? player2 : player1);

  const gameWon = () => winningCombos.some((combo) => threeInARow(combo));


  function threeInARow(combo) {
    return combo.every((i) => GameBoard.symbolAt(i) == currentPlayer.symbol );
  }

  function gameOver() {
    if (gameWon()) {
      DisplayController.declareWinner(currentPlayer)
      playing = false;
      return true;
    } else if (GameBoard.isFull()) {
      DisplayController.declareTie();
      playing = false;
      return true;
    };
  };

  return {
    play,
    takeTurn,
    playing
  }

})();
