const  GameBoard = (() => {
  "use strict";
  
  const boardArray = Array(9).fill(null);
  
  const availablePositions = () => {
    let out = []
    for (let i = 0; i < boardArray.length; i++) {
      let element = boardArray[i];

      if (element === null) out.push(i);
    }

    return out;
  };

  function placePiece(symbol, location) {
    boardArray[location] = symbol
    // Method for updating cell at location
    DisplayController.updateCell(location, symbol) // Update the inner HTML of the cell in question
  };
  

  return {
    availablePositions,
    placePiece
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

  const updateCell = (location, symbol) => {
    cell = cells[location];
    cell.textContent = symbol;
  };

  return {
    cells,
    updateCell
  };
})();

const Game = (() => {
  const player1 = Player('X');
  const player2 = Player('O');
  let currentPlayer = player1;
  // All game logic
  // In change of the logic behind the game
  
  function play() {
    // Until game over, take turn
   
  };

  function takeTurn(cell) {
    // Let users select a piece until they select one that corresponds to a piece in the available moves
    // Then GameBoard.placePiece there
    // Check if the game is over
    // Switch Players
    id = parseInt(cell.id)

    if (GameBoard.availablePositions().includes(id)) {

      GameBoard.placePiece(currentPlayer.symbol, id);

      currentPlayer = switchPlayers();
    };
     // I want to first check if the move is valid!
    // Check Win Condition
  };



  const switchPlayers = () => (currentPlayer === player1 ? player2 : player1)

  function gameOver() {
    return false // Later put in logic for checking game state
  }

  return {
    player1,
    player2,
    takeTurn,
    currentPlayer
  }

})();
