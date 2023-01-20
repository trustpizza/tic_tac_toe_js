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
  }

  function placePiece(symbol, location) {
    boardArray[location] = symbol
    DisplayController.cells[location].textContent = symbol
  }
  

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
  const cells = document.querySelectorAll(".cell")
  cells.forEach((cell) => {
    cell.addEventListener("click", () => Game.takeTurn(cell)) // Add some function which changes the inner html which will exist in the Game 
  })

  
  return {
    cells
  }
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
    GameBoard.placePiece(currentPlayer.symbol, cell.id)
    switch_players()
  };

  function 

  function gameOver() {
    return false // Later put in logic for checking game state
  }

  return {
    player1,
    player2,
    takeTurn
  }

})();
