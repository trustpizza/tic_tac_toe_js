const  gameBoard = (() => {
  "use strict";
  
  const boardArray = Array(9).fill(null);
  
  const available_positions = () => {
    out = []
    for (let i = 0; i < boardArray.length; i++) {
      let element = boardArray[i];

      if (element === null) out.push(i);
    }

    return out;
  }

  function place_piece(symbol, location) {
    boardArray[location] = symbol
  }
  

  return {
    available_positions,
    place_piece
  };

})();

const player = (symbol) => {
  return { symbol };
}

const displayController = (() => {

  const cells = document.querySelectorAll(".cell")
  cells.forEach((cell) => {
    cell.addEventListener("click", () => board) // Add some function which changes the inner html which will exist in the Game 
  })

  
  return {
    cells
  }
})();

const game = (() => {
  // In change of the logic behind the game
  


})();
