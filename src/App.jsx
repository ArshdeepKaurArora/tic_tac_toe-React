import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

function gameActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

let winner;

function App() {
  const [playersName, setPlayersName] = useState({
    X: "Player-1",
    O: "Player-2",
  });
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = gameActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playersName[firstSquareSymbol];
    }
  }

  let hasDraw = gameTurns.length === 9 && !winner;

  function switchActivePlayer(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = gameActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function gameRestart() {
    setGameTurns([]);
    winner = null;
  }

  function changePlayerName(symbol, newName) {
    setPlayersName((prevPlayerName) => {
      return {
        ...prevPlayerName,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player-1"
            playerSymbol="X"
            activePlayer={activePlayer === "X"}
            changePlayerName={changePlayerName}
          />
          <Player
            initialName="Player-2"
            playerSymbol="O"
            activePlayer={activePlayer === "O"}
            changePlayerName={changePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} gameRestart={gameRestart} />
        )}
        <GameBoard switchActivePlayer={switchActivePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
