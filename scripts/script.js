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
    // Method for updating cell at location
  };

  

  return {
    availablePositions,
    placePiece,
    symbolAt,
    isFull
  };

})();

const Player = (symbol) => {
  return { symbol };
}

const DisplayController = (() => {
  // This only deals with the state of the board's look
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => Game.takeTurn(cell)) // Add some function which changes the inner html which will exist in the Game 
  });

  const announcementDiv = document.getElementById("announcement");

  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", () => {
    // Start Game upon Click
    Game.play() 
  });

  const declareWinner = (player) => announcementDiv.textContent = `${player.symbol} Wins!`;
  const declareTie = () => announcementDiv.textContent = `Its a tie!`;

  const updateCell = (symbol, location) => {
    cell = cells[location];
    cell.textContent = symbol;
  };

  return {
    updateCell,
    declareWinner,
    declareTie
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
  // All game logic
  // In change of the logic behind the game
  
  function play() {
    // Until game over, take turn
    playing = true;
    currentPlayer = player1;
    resetGame()
  };

  function takeTurn(cell) {
    // Let users select a piece until they select one that corresponds to a piece in the available moves
    // Then GameBoard.placePiece there
    // Check if the game is over
    // Switch Players
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
