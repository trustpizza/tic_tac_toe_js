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
    boardArray[location] = symbol;
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

const HumanPlayer = (symbol) => {
  const isCPU = false;  
  return { symbol, isCPU };
}

const EasyComputerPlayer = (symbol) => {
  // If Game.currentPlayer == self, then take a random entry from GameBoard.availableMoves();
  const isCPU = true;

  const checkIfTurn = () => {
    if (Game.currentPlayer === Game.player2) {
      return true
    };
  };

  const takeTurn = () => {
    const availableMoves = GameBoard.availablePositions();
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const move = availableMoves[randomIndex];
    const cell = DisplayController.cells[move];

    Game.takeTurn(cell);
  };

  return {
    symbol,
    checkIfTurn,
    takeTurn,
    isCPU
  }
};

const HardComputerPlayer = (symbol) => {
  const availableMoves = GameBoard.availablePositions();
  
  function makeBestMove() {
    let bestScore = Number.NEGATIVE_INFINITY
  }

  function minimax(game, depth, maximizingPlayer) {

    // Make the depth be equal to the ammount of available moves left
    // Return the score if the game is over
    // Increase the depth by 1
    // Create an empty array of scores for that will accumulate a score at each depth;
    // Create an array of possible moves
    // if maximizing player(i.e. player2) then 
      // value = score(game, depth)
        // Look at each child of the node (i.e. each next possible gamestate) and minimax(game, depth - 1, FALSE)
      // add Value to scores array

    // else (i.e minimizing player/ it is player1's turn) then
      // value = score(game, depth)
        // Look at each of the child nodes and minimax(game, depth -1, TRUE)
      // add the value to the scores array


  }

  return {
    symbol
  }
}

const DisplayController = (() => {  // This only deals with the state of the board's look
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => Game.takeTurn(cell)) // Add some function which changes the inner html which will exist in the Game 
  });

  const announcementContainer = document.getElementById("announcement-container")
  const announcementDiv = document.getElementById("announcement");

  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", () => {
    Game.play() 
  });

  const opponentSelectionSection = document.getElementsByName('player-selection');
  opponentSelectionSection.forEach((selection) => {
      selection.addEventListener("click", () => {
          Game.setPlayer2(selection.value);
      });
  });

  const declareWinner = (player) => {
    announcementContainer.classList.add("visible")
    announcementDiv.textContent = `${player.symbol} Wins!`
    announcementContainer.addEventListener("click", () => {
    announcementContainer.classList.remove("visible")

    });
  };

  const declareTie = () => {
    announcementContainer.classList.add("visible");
    announcementDiv.textContent = `Its a tie!`;

    announcementContainer.addEventListener("click", () => {
      announcementContainer.classList.remove("visible")
    });
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
    reset,
    opponentSelectionSection,
    cells
  };
})();

const Game = (() => {
  const player1 = HumanPlayer('X');
  let player2;

  let currentPlayer = player1;
  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Cols
    [0,4,8], [2,4,6] // Diagonals
  ];

  let playing = false;
  
  const setPlayer2 = (value) => {   
    if (value === "human") {
      Game.player2 = HumanPlayer('O');
    } else if (value === 'easy-computer') {
      Game.player2 = EasyComputerPlayer('O');
    } else if (value === 'hard-computer') {
      console.log(value)
      Game.player2 = HardComputerPlayer('O')
    }
  }

  function play() {
    playing = true;
    Game.currentPlayer = player1;
    resetGame();
  };

  function takeTurn(cell) {
    if (!playing) return;
    id = parseInt(cell.id);

    if (GameBoard.availablePositions().includes(id)) {

      GameBoard.placePiece(Game.currentPlayer.symbol, id);
      DisplayController.updateCell(Game.currentPlayer.symbol, id) // Update the inner HTML of the cell in question

      if (gameOver()) {
        return
      };

      Game.currentPlayer = switchPlayers();

      if (Game.player2.isCPU && Game.player2.checkIfTurn()) {
          Game.player2.takeTurn();
      };

    };
  };

  function resetGame() {
    GameBoard.clear();
    DisplayController.reset();
  }

  const switchPlayers = () => (Game.currentPlayer === player1 ? Game.player2 : player1);

  const gameWon = () => winningCombos.some((combo) => threeInARow(combo));

  function threeInARow(combo) {
    return combo.every((i) => GameBoard.symbolAt(i) == Game.currentPlayer.symbol );
  };

  function gameOver() {
    if (gameWon()) {
      DisplayController.declareWinner(Game.currentPlayer)
      playing = false;
      return true;
    } else if (GameBoard.isFull()) {
      DisplayController.declareTie();
      playing = false;
      return true;
    };
  };

  const winner = (player) => {
    if (gameOver() && Game.currentPlayer == player) {
      return true
    } else {
      return false
    }
  }

  return {
    player1,
    player2,
    currentPlayer,
    winningCombos,
    playing,
    setPlayer2,
    play,
    takeTurn,
    gameOver,
    resetGame,
    gameWon,
    winner
  }

})();
