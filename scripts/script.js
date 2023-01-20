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
  // In change of creating the display and looks of the game
})();

const game = (() => {
  // In change of the logic behind the game
})();
