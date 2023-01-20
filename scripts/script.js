const  GameBoard = (() => {
  // "use strict";
  
  const boardArray = Array(9).fill(null);
  // Needs and Purposes of the GameBoard:
  // House an array of 9 items CHECK
  // Check if a spot is empty / Check which spots are available CHECK
  // Place a piece (pieces are going to have:
  // 1. An Icon (x or o)
  // 2. A player? (maybe not needed as we can later check in the win condition)

  const available_positions = () => {
    out = []
    for (let i = 0; i < boardArray.length; i++) {
      let element = boardArray[i];

      if (element === null) out.push(i);
    }

    return out;
  }

  function place_piece(symbol, location) {
    // First take a location in the boardArray and set it to the symbol
    boardArray[location] = symbol
  }
  

  return {
    available_positions,
    place_piece
  };

})();