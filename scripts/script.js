const  gameBoard = (() => {
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
    boardArray,
    availablePositions,
    placePiece,
    symbolAt,
    isFull,
    clear,
  };

})();

const humanPlayer = (symbol) => {
  const isCPU = false;  
  return { symbol, isCPU };
}

const easyComputerPlayer = (symbol) => {
  // If game.currentPlayer == self, then take a random entry from gameBoard.availableMoves();
  const isCPU = true;

  const checkIfTurn = () => {
    if (game.currentPlayer === game.player2) {
      return true
    };
  };

  const takeTurn = () => {
    const availableMoves = gameBoard.availablePositions();
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const move = availableMoves[randomIndex];
    const cell = displayController.cells[move];

    console.log(cell)
    game.takeTurn(cell);
  };

  return {
    symbol,
    checkIfTurn,
    takeTurn,
    isCPU
  }
};

const hardComputerPlayer = (symbol) => {
    const winningCombos = game.winningCombos;
    const isWinningState = (gameBoard) => {
      winningCombos.some((combo) => threeInARow(combo));

      function threeInARow(combo) {
        if (combo.every((i) => gameBoard.symbolAt(i) == "X")) {
          return "humanWin";
        } else if (combo.every((i) => gameBoard.symbolAt(i) == "O")) {
          return "computerWin";
        }
      };
      return false;
    };

    const minimax = (newBoard, maximizingPlayer) => {
      availablePositions = [];

      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === null) availablePositions.push(i);
      };

      if (isWinningState(newBoard) === "humanWin") {
        return {score: 10};
      } else if (isWinningState(newBoard) === "computerWin") {
        return {score: -10};
      } else if (newBoard.includes(null)) {
        return {score: 0};
      };

      let moves = [];
      for (let i = 0; i < availablePositions.length; i++) {
        let move = {};
        move.index = availablePositions[i];
        
        if (maximizingPlayer) {
          newBoard[availablePositions][i] = "X";
          let result = minimax(newBoard, !maximizingPlayer);
          move.score = result.score;
        } else {
          newBoard[availablePositions][i] = "Y";
          let result = minimax(newBoard, !maximizingPlayer);
          move.score = result.score;
        };

        let bestMove;
        if (maximizingPlayer) {
          let bestScore = -100000000;

          for (let i = 0; i < moves.length; i++) {
            if (moves[i] > bestScore) {
              bestScore = moves[i].score;
              bestMove = i
            } 
          };
        } else {
          let bestScore = 1000000000;

          for (let i = 0; i < moves.length; i++) {
            if (moves[i] < bestScore) {
              bestScore = moves[i].score;
              bestMove = i
            }
          }
        };

        return moves[bestMove];
      };
    };
    
  const takeTurn = () => {
    const index = minimax(gameBoard.boardArray, false).index;
    const cell = displayController.cells[index];
    game.takeTurn(cell);
  }

  return {
    symbol,
    takeTurn
  }
}

const displayController = (() => {  // This only deals with the state of the board's look
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => game.takeTurn(cell)) // Add some function which changes the inner html which will exist in the Game 
  });

  const announcementContainer = document.getElementById("announcement-container")
  const announcementDiv = document.getElementById("announcement");

  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", () => {
    game.play() 
  });

  const opponentSelectionSection = document.getElementsByName('player-selection');
  opponentSelectionSection.forEach((selection) => {
      selection.addEventListener("click", () => {
          game.setPlayer2(selection.value);
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

const game = ((board) => {
  const player1 = humanPlayer('X');
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
      game.player2 = humanPlayer('O');
    } else if (value === 'easy-computer') {
      game.player2 = easyComputerPlayer('O');
    } else if (value === 'hard-computer') {
      console.log(value)
      game.player2 = hardComputerPlayer('O')
    }
  }

  function play() {
    playing = true;
    game.currentPlayer = player1;
    resetGame();
  };

  function takeTurn(cell) {
    if (!playing) return;
    id = parseInt(cell.id);

    if (gameBoard.availablePositions().includes(id)) {

      gameBoard.placePiece(game.currentPlayer.symbol, id);
      displayController.updateCell(game.currentPlayer.symbol, id) // Update the inner HTML of the cell in question

      if (gameOver()) {
        return
      };

      game.currentPlayer = switchPlayers();

      if (game.player2.isCPU && game.player2.checkIfTurn()) {
          game.player2.takeTurn();
      };

    };
  };

  function resetGame() {
    gameBoard.clear();
    displayController.reset();
  }

  const switchPlayers = () => (game.currentPlayer === player1 ? game.player2 : player1);

  const gameWon = () => winningCombos.some((combo) => threeInARow(combo));

  function threeInARow(combo) {
    return combo.every((i) => gameBoard.symbolAt(i) == game.currentPlayer.symbol );
  };

  function gameOver() {
    if (gameWon()) {
      displayController.declareWinner(game.currentPlayer)
      playing = false;
      return true;
    } else if (gameBoard.isFull()) {
      displayController.declareTie();
      playing = false;
      return true;
    };
  };

  const winner = (player) => {
    if (gameOver() && game.currentPlayer == player) {
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