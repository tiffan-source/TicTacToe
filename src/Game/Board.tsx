import { Button, Progress } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { GameType } from "./Game";
import axios from "axios";

function Board({ game }: { game: GameType }) {
  const [turn, setTurn] = useState(0);
  const [timer, setTimer] = useState(9);
  const [gameDuration, setGameDuration] = useState(0);
  const [gameStatus, setGameStatus] = useState<number | null>(null);
  const [board, setBoard] = useState<Array<Array<string>>>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const intervalRef = useRef<number | null>(null);

  // Start and manage the game timer
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setTimer((prev) => prev - 1);
      setGameDuration((prev) => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handle timer expiration and turn change
  useEffect(() => {
    if (timer === -1) {
      setTimer(9); // Reset the timer
      setTurn((prev) => (prev === 0 ? 1 : 0)); // Switch turns
    }
  }, [timer]);

  // Check for a winner or draw
  const checkGameStatus = (board: Array<Array<string>>) => {
    const winningCombinations = [
      // Rows
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      // Columns
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      // Diagonals
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        board[a[0]][a[1]] &&
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[a[0]][a[1]] === board[c[0]][c[1]]
      ) {
        return board[a[0]][a[1]] === "X" ? 1 : 2; // Player 1 or Player 2 wins
      }
    }

    // Check for a draw
    const isDraw = board.every((row) => row.every((cell) => cell));
    return isDraw ? 0 : null; // 0 for draw, null if the game is ongoing
  };

  // Handle player actions
  const play = async (line: number, column: number) => {
    if (board[line][column] === "") {
      const updatedBoard = board.map((row, i) =>
        row.map((cell, j) => (i === line && j === column ? (turn === 0 ? "X" : "O") : cell))
      );

      setBoard(updatedBoard);

      const gameStatusResult = checkGameStatus(updatedBoard);
      if (gameStatusResult !== null) {
        console.log("Game over", gameStatusResult);
        await stopGameAndSaveInHistory(gameStatusResult);
      }

      setGameStatus(gameStatusResult);
      setTimer(9); // Reset the timer
      setTurn((prev) => (prev === 0 ? 1 : 0)); // Switch turns
    }
  };

  // Stop the game and save results
  const stopGameAndSaveInHistory = async (gameStatusResult: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    console.log(`Game finished with result: ${gameStatusResult}`);
    await axios.post("http://localhost:5000/tictactoe", {
        player1: game.joueur1,
        player2: game.joueur2,
        board: board.flat(),
        status: gameStatusResult,
        turn: turn,
    });
  };

  // Render the winner or draw message
  const renderWinner = (winner: number) => {
    if (winner === 0) return "Draw";
    return winner === 1 ? `${game.joueur1} wins` : `${game.joueur2} wins`;
  };

  const save = async () => {
    const result = await axios.post("http://localhost:5000/tictactoe", {
      player1: game.joueur1,
      player2: game.joueur2,
      board: board.flat(),
      status: 3,
      turn: turn,
    });

    if (result)        
        reload();
  }

  const reload =  () => {
    window.location.reload();
  }

  return (
    <div>
      <div className="flex justify-between text-2xl">
        <div className={turn === 0 ? "font-bold text-red-700" : "text-gray-500"}>
          {game.joueur1}
        </div>
        <div className={turn === 1 ? "font-bold text-blue-700" : "text-gray-500"}>
          {game.joueur2}
        </div>
      </div>

      {gameStatus === null && (
        <div className="grid grid-rows-3 grid-cols-3">
          {board.map((row, line) =>
            row.map((cell, column) => (
              <div
                key={line * 3 + column}
                className="inline-flex h-[10rem] justify-center items-center"
                onClick={async() => await play(line, column)}
              >
                <div className="inline-flex justify-center items-center w-[8rem] h-[8rem] border border-gray-200 text-5xl cursor-pointer">
                  <span className={cell === "X" ? "text-red-700" : "text-blue-700"}>
                    {cell}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {gameStatus === null && (
        <div>
          <Progress
            percent={(timer / 9) * 100}
            showInfo={false}
            strokeColor={turn === 0 ? "red" : "blue"}
          />
        </div>
      )}

      {gameStatus !== null && (
        <div className="my-8 text-2xl text-center text-green-600">{renderWinner(gameStatus)}</div>
      )}

      {gameStatus === null && (
        <div>
          <Button className="w-full" onClick={async()=>{await save()}}>Sauvegarder</Button>
        </div>
      )}

      {gameStatus !== null && (
        <div>
            <Button className="w-full" type="primary" onClick={()=>{reload()}}>Menue pincipale</Button>
        </div>
      )}
    </div>
  );
}

export default Board;
