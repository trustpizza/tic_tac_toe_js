const  GameBoard = (() => {
  // "use strict";
  
  let boardArray = Array(9).fill(null);
  // Needs and Purposes of the GmaeBoard:
  // House an array of 9 items
  // Check if a spot is empty / Check which spots are available
  // Place a piece 
  // Check if

  let available_positions = () => {
    out = []
    for (let i = 0; i < boardArray.length; i++) {
      let element = boardArray[i];

      if (element === null) out.push(i);
    }

    return out;
  }

  return {
    boardArray,
    available_positions
  };

})();